import Note from '../types/Note';
import { group, max } from 'd3';
import { bpmToSecondsPerBeat } from '../utils/MusicUtils';
import { roundToNDecimals } from '../utils/MathUtils';

/**
 * @module fileFormats/MidiParser
 * @todo parse pitch bends
 */


// Precision in number of digits when rounding seconds
const ROUNDING_PRECISION = 5;

/**
 * Parses a MIDI JSON file to get Note objects with absolute time in seconds.
 *
 * @see https://github.com/colxi/midi-parser-js/wiki/MIDI-File-Format-Specifications
 * @param {object} data MIDI data in JSON format
 * @param {boolean} splitFormat0IntoTracks split MIDI format 0 data into tracks
 *      instead of using channels?
 * @param {boolean} log set to true to log results etc. to the console
 * @returns {object} including an array of note objects and meta information
 */
export function preprocessMidiFileData(data, splitFormat0IntoTracks = true, log = false) {
    if (data === null || data === undefined) {
        // console.warn('[MidiParser] MIDI data is null');
        return;
    }
    if (!data.track) {
        console.warn('[MidiParser] MIDI data has no track');
        return;
    }
    if (log) {
        console.groupCollapsed('[MidiParser] Preprocessing MIDI file data');
    }
    // Parse notes
    let parsedTracks = [];
    const { tempoChanges, beatTypeChanges, keySignatureChanges } = getSignatureChanges(data.track);
    // for (let index = 0; index < data.track.length; index++) {
    //     const track = data.track[index];
    for (const track of data.track) {
        const t = parseMidiTrack(
            track,
            data.timeDivision,
            tempoChanges,
            beatTypeChanges,
            keySignatureChanges,
            log,
        );
        if (t !== null) {
            parsedTracks.push(t);
        }
    }
    // Split MIDI format 0 data into tracks instead of having channels
    if (data.formatType === 0 && splitFormat0IntoTracks && parsedTracks.length === 1) {
        parsedTracks = splitFormat0(parsedTracks);
    }
    // Generate measure lines from tempo and beat type changes
    const totalTime = max(parsedTracks, d => d?.totalTime ?? 0);
    const measureLinePositions = getMeasureLines(tempoChanges, beatTypeChanges, totalTime);
    const result = {
        tracks: parsedTracks,
        totalTime,
        tempoChanges,
        beatTypeChanges,
        keySignatureChanges,
        measureLinePositions,
    };
    if (log) {
        console.log(`Got ${parsedTracks.length} MIDI tracks`, result);
        console.groupEnd();
    }
    return result;
}

/**
 * Parses a single MIDI track and pushes it to parsedTracks if it contains notes
 *
 * @private
 * @param {object} track a MIDI track
 * @param {number} timeDivision MIDI time division
 * @param {object[]} tempoChanges array with tempo change events
 * @param {object[]} beatTypeChanges array with beat type change events
 * @param {object[]} keySignatureChanges array with key signature change events
 * @param {boolean} log if true, debug info will be logged to the console
 * @returns {object} parsed track
 */
function parseMidiTrack(track, timeDivision, tempoChanges, beatTypeChanges, keySignatureChanges, log) {
    const notes = [];
    let tempo = tempoChanges[0]?.tempo ?? 120;
    let currentTick = 0;
    let currentTime;
    let milliSecondsPerTick = getMillisecondsPerTick(tempo, timeDivision);
    let tickOfLastTempoChange = 0;
    let timeOfLastTempoChange = 0;
    // This map stores note-on note that have not yet been finished by a note-off
    const unfinishedNotes = new Map();
    for (const event of track.event) {
        const type = event.type;
        // Ignore delta time if it is a meta event (fixes some parsing issues)
        if (type === EVENT_TYPES.meta) {
            continue;
        }
        currentTick += event.deltaTime;
        // Update beat type change times
        for (const btc of beatTypeChanges) {
            if (btc.time === undefined && btc.tick <= currentTick) {
                const t = (btc.tick - tickOfLastTempoChange) * milliSecondsPerTick / 1000 + timeOfLastTempoChange;
                btc.time = roundToNDecimals(t, ROUNDING_PRECISION);
            }
        }
        // Update key signature change times
        for (const ksc of keySignatureChanges) {
            if (ksc.time === undefined && ksc.tick <= currentTick) {
                const t = (ksc.tick - tickOfLastTempoChange) * milliSecondsPerTick / 1000 + timeOfLastTempoChange;
                ksc.time = roundToNDecimals(t, ROUNDING_PRECISION);
            }
        }
        // Handle last tempo change in track differently
        let mostRecentTempoChange;
        if (tempoChanges.length > 0 && currentTick > tempoChanges[tempoChanges.length - 1].tick) {
            mostRecentTempoChange = tempoChanges[tempoChanges.length - 1];
        }
        // Get current tempo, as soon as we are too far, 1 step back
        for (let index = 1; index < tempoChanges.length; index++) {
            const tick = tempoChanges[index].tick;
            if (tick > currentTick) {
                const change = tempoChanges[index - 1];
                mostRecentTempoChange = change;
                break;
            }
        }
        // React to tempo changes
        if (mostRecentTempoChange && mostRecentTempoChange.tempo !== tempo) {
            const tick = mostRecentTempoChange.tick;
            timeOfLastTempoChange = (tick - tickOfLastTempoChange) * milliSecondsPerTick / 1000 + timeOfLastTempoChange;
            tickOfLastTempoChange = tick;
            mostRecentTempoChange.time = roundToNDecimals(timeOfLastTempoChange, ROUNDING_PRECISION);
            tempo = mostRecentTempoChange.tempo;
            milliSecondsPerTick = getMillisecondsPerTick(tempo, timeDivision);
        }
        // Update current time in seconds
        currentTime = (currentTick - tickOfLastTempoChange) * milliSecondsPerTick / 1000 + timeOfLastTempoChange;
        // Skip events that are neither note-on nor note-off
        if (type !== EVENT_TYPES.noteOn && type !== EVENT_TYPES.noteOff) {
            continue;
        }
        const [pitch, velocity] = event.data;
        const channel = event.channel;
        const key = `${pitch} ${channel}`;
        if (type === EVENT_TYPES.noteOff || (type === EVENT_TYPES.noteOn && velocity === 0)) {
            // Handle note-off
            if (unfinishedNotes.has(key)) {
                unfinishedNotes.get(key).end = currentTime;
                unfinishedNotes.delete(key);
            } else {
                if (log) {
                    console.warn('Did not find an unfinished note for note-off event!');
                    console.log(event);
                }
            }
        } else if (type === EVENT_TYPES.noteOn) {
            // Handle note-on
            const newNote = new Note(
                pitch,
                roundToNDecimals(currentTime, ROUNDING_PRECISION),
                velocity,
                channel,
            );
            notes.push(newNote);
            unfinishedNotes.set(key, newNote);
        } else {
            continue;
        }
    }
    // Fix missing note ends
    const neededToFix = [];
    for (const note of notes) {
        if (note.end === -1) {
            note.end = roundToNDecimals(currentTime, ROUNDING_PRECISION);
            neededToFix.push(note);
        }
    }
    if (neededToFix.length > 0) {
        console.warn(`had to fix ${neededToFix.length} notes`);
        console.log(neededToFix);
    }
    // Save parsed track with meta information
    const { trackName, instrument, instrumentName } = getInstrumentAndTrackName(track);
    if (notes.length > 0) {
        const parsedTrack = {
            noteObjs: notes,
            totalTime: currentTime,
            trackName: trackName ?? 'Track',
            instrument,
            instrumentName: instrumentName ?? 'Unknown instrument',
        };
        // console.log(`Got part with ${notes.length} notes,\n`, parsedTrack);
        return parsedTrack;
    } else {
        // console.log('Empty track');
        return null;
    }
}

/**
 * Finds out the name of the track and the instrument, if this data is available
 *
 * @private
 * @param {object} track MIDI track
 * @returns {{trackName, instrument, instrumentName}} meta data with either
 *      values or null when no information found
 */
function getInstrumentAndTrackName(track) {
    let trackName = null;
    let instrument = null;
    let instrumentName = null;
    for (const event of track.event) {
        if (event.type === EVENT_TYPES.meta && event.metaType === META_TYPES.trackName) {
            trackName = event.data;
        }
        if (event.type === EVENT_TYPES.programChange) {
            instrument = event.data;
        }
        if (event.type === EVENT_TYPES.meta && event.metaType === META_TYPES.instrumentName) {
            instrumentName = event.data;
        }
    }
    return {
        trackName,
        instrument,
        instrumentName,
    };
}

/**
 * Caclulates the time positions of measure lines by looking at tempo and beat
 * type change events
 *
 * @private
 * @param {object[]} tempoChanges tempo change events
 * @param {object[]} beatTypeChanges beat type change events
 * @param {number} totalTime total time
 * @returns {number[]} measure line times in seconds
 */
function getMeasureLines(tempoChanges, beatTypeChanges, totalTime) {
    const measureLines = [];
    // Generate measure lines from tempo and beat type changes
    let tempo = 120;
    let beats = 4;
    let beatType = 4;
    let currentTime = 0;
    let currentBeatsInMeasure = 0;
    let timeOfLastTempoChange = 0;
    let timeSinceLastTempoChange = 0;
    while (currentTime < totalTime) {
        // Get current tempo and beat type
        let mostRecentTempoChange;
        for (const t of tempoChanges) {
            if (t.time <= currentTime) {
                mostRecentTempoChange = t.tempo;
            }
        }
        if (mostRecentTempoChange && mostRecentTempoChange !== tempo) {
            timeOfLastTempoChange = currentTime;
            timeSinceLastTempoChange = 0;
            tempo = mostRecentTempoChange;
        }
        for (const b of beatTypeChanges) {
            if (b.time <= currentTime) {
                beats = b.beats;
                beatType = b.beatType;
            }
        }
        // Update time and beats
        currentBeatsInMeasure++;
        const secondsPerBeat = bpmToSecondsPerBeat(tempo) / (beatType / 4);
        timeSinceLastTempoChange += secondsPerBeat;
        currentTime = timeOfLastTempoChange + timeSinceLastTempoChange;
        if (currentBeatsInMeasure >= beats) {
            // Measure is full
            currentBeatsInMeasure = 0;
            measureLines.push(roundToNDecimals(currentTime, ROUNDING_PRECISION));
        }
    }
    return measureLines;
}

/**
 * @todo NYI
 */
// function getMeasureIndices() {

// }

/**
 * Split MIDI format 0 data into tracks instead of having channels,
 * creates one track for each channel
 *
 * @private
 * @param {Note[][]} tracks parsed MIDI tracks
 * @returns {Note[][]} splitted tracks
 */
function splitFormat0(tracks) {
    if (tracks.length > 1) {
        console.warn('Splitting a format 0 file with more than 1 track will result in all but the first beeing lost!');
    }
    // console.log('Splitting format 0 file into tracks based on channel');
    const grouped = group(tracks[0].noteObjs, d => d.channel);
    // All tracks will share the meta infomation of the 0th track
    // Assign the splitted-by-channel notes to their new tracks
    const splittedTracks = [];
    for (const notes of grouped.values()) {
        splittedTracks.push({
            ...tracks[0],
            noteObjs: notes,
        });
    }
    return splittedTracks;
}

/**
 * Given the tempo and time division, returns the number of milliseconds
 * each MIDI time tick corresponds to
 *
 * @private
 * @param {number} tempo tempo
 * @param {number} timeDivision time division
 * @returns {number} milli seconds per tick
 */
function getMillisecondsPerTick(tempo, timeDivision) {
    const milliSecondsPerBeat = 1 / tempo * 60_000;
    const milliSecondsPerTick = milliSecondsPerBeat / timeDivision;
    return milliSecondsPerTick;
}

/**
 * Retrieves all tempo and beat type changes from a MIDI file's tracks.
 *
 * @see https://github.com/colxi/midi-parser-js/wiki/MIDI-File-Format-Specifications
 * @private
 * @param {Array} tracks MIDI JSON file tracks
 * @returns {object} {tempoChanges, beatTypeChanges} as arrays of objects, which
 *      contain the MIDI tick and the new information
 */
function getSignatureChanges(tracks) {
    const tempoChanges = [];
    const beatTypeChanges = [];
    const keySignatureChanges = [];
    let currentTick = 0;
    let lastTempo = null;
    for (const track of tracks) {
        for (const event of track.event) {
            // Get timing of events
            currentTick += event.deltaTime;
            // Tempo change
            if (event.type === EVENT_TYPES.meta && event.metaType === META_TYPES.setTempo) {
                const milliSecondsPerQuarter = event.data / 1000;
                const tempo = Math.round(1 / (milliSecondsPerQuarter / 60_000));
                // Ignore tempo changes that don't change the tempo
                if (tempo !== lastTempo) {
                    tempoChanges.push({
                        tick: currentTick,
                        tempo,
                        time: currentTick === 0 ? 0 : undefined,
                    });
                    lastTempo = tempo;
                }
            }
            // Beat type change
            if (event.type === EVENT_TYPES.meta && event.metaType === META_TYPES.timeSignature) {
                const d = event.data;
                const beats = d[0];
                const beatType = 2 ** d[1];
                const newEntry = {
                    tick: currentTick,
                    beats,
                    beatType,
                };
                if (beatTypeChanges.length === 0) {
                    beatTypeChanges.push(newEntry);
                } else {
                    // If it id not change, do not add
                    const last = beatTypeChanges[beatTypeChanges.length - 1];
                    if (last.beats !== beats || last.beatType !== beatType) {
                        beatTypeChanges.push(newEntry);
                    }
                }
                // console.log(`Metro: ${d[2]}`);
                // console.log(`32nds: ${d[3]}`);
            }
            // Key change
            if (event.type === EVENT_TYPES.meta && event.metaType === META_TYPES.keySignature) {
                // console.log('keychange', event);
                const d = event.data;
                if (!KEY_SIG_MAP.has(d)) {
                    console.warn('[MidiParser] Invalid key signature', d);
                } else {
                    const { key, scale } = KEY_SIG_MAP.get(d);
                    const newEntry = {
                        tick: currentTick,
                        key,
                        scale,
                    };
                    if (keySignatureChanges.length === 0) {
                        keySignatureChanges.push(newEntry);
                    } else {
                        // If it id not change, do not add
                        const last = keySignatureChanges[keySignatureChanges.length - 1];
                        if (last.key !== key || last.scale !== scale) {
                            keySignatureChanges.push(newEntry);
                        }
                    }
                }
            }
        }
    }
    // Default values
    if (tempoChanges.length === 0) {
        tempoChanges.push({ tempo: 120, time: 0 });
    }
    if (beatTypeChanges.length === 0) {
        beatTypeChanges.push({ beats: 4, beatType: 4, time: 0 });
    }
    if (keySignatureChanges.length === 0) {
        keySignatureChanges.push({ key: 'C', scale: 'major', time: 0 });
    }
    return { tempoChanges, beatTypeChanges, keySignatureChanges };
}

/**
 * MIDI event types and meta types and their codes
 *
 * @see https://github.com/colxi/midi-parser-js/wiki/MIDI-File-Format-Specifications
 * Event Type         Value   Value decimal    Parameter 1         Parameter 2
 * Note Off           0x8       8              note number         velocity
 * Note On            0x9       9              note number         velocity
 * Note Aftertouch    0xA      10              note number         aftertouch value
 * Controller         0xB      11              controller number   controller value
 * Program Change     0xC      12              program number      not used
 * Channel Aftertouch 0xD      13              aftertouch value    not used
 * Pitch Bend         0xE      14              pitch value (LSB)   pitch value (MSB)
 * Meta               0xFF    255                 parameters depend on meta type
 * @type {object}
 */
const EVENT_TYPES = {
    noteOff: 0x8,
    noteOn: 0x9,
    noteAftertouch: 0xA,
    controller: 0xB,
    programChange: 0xC,
    channelAftertouch: 0xD,
    pitchBend: 0xE,
    meta: 0xFF,
};
/**
 * @type {object}
 */
const META_TYPES = {
    sequenceNumber: 0x0,
    textEvent: 0x1,
    copyright: 0x2,
    trackName: 0x3,
    instrumentName: 0x4,
    lyrics: 0x5,
    marker: 0x6,
    cuePoint: 0x7,
    channelPrefix: 0x20,
    endOfTrack: 0x2F,
    setTempo: 0x51,
    smpteOffset: 0x54,
    timeSignature: 0x58,
    keySignature: 0x59,
    sequencerSpecific: 0x7F,
};

/**
 * Maps needed for key signature detection from number of sharps / flats
 *
 * @type {Map<number,object>}
 * @see https://www.recordingblogs.com/wiki/midi-key-signature-meta-message
 */
const KEY_SIG_MAP = new Map([
    // major
    [0xF9_00, { key: 'Cb', scale: 'major' }],
    [0xFA_00, { key: 'Gb', scale: 'major' }],
    [0xFB_00, { key: 'Db', scale: 'major' }],
    [0xFC_00, { key: 'Ab', scale: 'major' }],
    [0xFD_00, { key: 'Eb', scale: 'major' }],
    [0xFE_00, { key: 'Bb', scale: 'major' }],
    [0xFF_00, { key: 'F', scale: 'major' }],
    [0x00_00, { key: 'C', scale: 'major' }],
    [0x01_00, { key: 'G', scale: 'major' }],
    [0x02_00, { key: 'D', scale: 'major' }],
    [0x03_00, { key: 'A', scale: 'major' }],
    [0x04_00, { key: 'E', scale: 'major' }],
    [0x05_00, { key: 'B', scale: 'major' }],
    [0x06_00, { key: 'F#', scale: 'major' }],
    [0x07_00, { key: 'C#', scale: 'major' }],
    // minor
    [0xF9_01, { key: 'Ab', scale: 'minor' }],
    [0xFA_01, { key: 'Eb', scale: 'minor' }],
    [0xFB_01, { key: 'Bb', scale: 'minor' }],
    [0xFC_01, { key: 'F', scale: 'minor' }],
    [0xFD_01, { key: 'C', scale: 'minor' }],
    [0xFE_01, { key: 'G', scale: 'minor' }],
    [0xFF_01, { key: 'D', scale: 'minor' }],
    [0x00_01, { key: 'A', scale: 'minor' }],
    [0x01_01, { key: 'E', scale: 'minor' }],
    [0x02_01, { key: 'B', scale: 'minor' }],
    [0x03_01, { key: 'F#', scale: 'minor' }],
    [0x04_01, { key: 'C#', scale: 'minor' }],
    [0x05_01, { key: 'G#', scale: 'minor' }],
    [0x06_01, { key: 'D#', scale: 'minor' }],
    [0x07_01, { key: 'A#', scale: 'minor' }],
]);
