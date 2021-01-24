import Note from '../types/Note';
import { group, max } from 'd3';
import { bpmToSecondsPerBeat } from '../utils/MiscUtils';
import { roundToNDecimals } from '../utils/MathUtils';

/**
 * @module fileFormats/MidiParser
 */

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
    const partNames = [];
    const { tempoChanges, beatTypeChanges, keySignatureChanges } = getSignatureChanges(data.track);
    for (let index = 0; index < data.track.length; index++) {
        const track = data.track[index];
        const t = parseMidiTrack(track, data.timeDivision, tempoChanges, beatTypeChanges, keySignatureChanges);
        if (t !== null) {
            parsedTracks.push(t);
            // Get part name
            const name = getPartName(track.event);
            partNames.push(name ? name : `Track ${index}`);
        }
    }
    // Split MIDI format 0 data into tracks instead of having channels
    if (data.formatType === 0 && splitFormat0IntoTracks && parsedTracks.length > 0) {
        parsedTracks = splitFormat0(parsedTracks);
    }
    // Return similar format as MusicXmlParser
    const result = {
        parts: parsedTracks,
        partNames,
        // TODO: get instruments from MIDI
        instruments: parsedTracks.map(() => 'unknown instrument'),
        totalTime: max(parsedTracks, d => d.totalTime),
        // This is the first tempo etc., changes are stored in each part
        bpm: parsedTracks[0].bpm,
        beats: parsedTracks[0].beats,
        beatType: parsedTracks[0].beatType,
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
 * @returns {object} parsed track
 */
function parseMidiTrack(track, timeDivision, tempoChanges, beatTypeChanges, keySignatureChanges) {
    const notes = [];
    let tempo = tempoChanges.length > 0 ? tempoChanges[0].tempo : 120;
    let currentTick = 0;
    let currentTime;
    let milliSecondsPerTick = getMillisecondsPerTick(tempo, timeDivision);
    let tickOfLastTempoChange = 0;
    let timeOfLastTempoChange = 0;
    for (const event of track.event) {
        currentTick += event.deltaTime;
        // Update beat type change times
        for (const btc of beatTypeChanges) {
            if (btc.time === undefined && btc.tick <= currentTick) {
                const t = (btc.tick - tickOfLastTempoChange) * milliSecondsPerTick / 1000 + timeOfLastTempoChange;
                btc.time = roundToNDecimals(t, 12);
            }
        }
        // Update key signature change times
        for (const ksc of keySignatureChanges) {
            if (ksc.time === undefined && ksc.tick <= currentTick) {
                const t = (ksc.tick - tickOfLastTempoChange) * milliSecondsPerTick / 1000 + timeOfLastTempoChange;
                ksc.time = roundToNDecimals(t, 12);
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
            mostRecentTempoChange.time = roundToNDecimals(timeOfLastTempoChange, 12);
            tempo = mostRecentTempoChange.tempo;
            milliSecondsPerTick = getMillisecondsPerTick(tempo, timeDivision);
        }
        // Update current time in seconds
        currentTime = (currentTick - tickOfLastTempoChange) * milliSecondsPerTick / 1000 + timeOfLastTempoChange;
        // Skip events that are neither note-on nor note-off
        const type = event.type;
        if (type !== 8 && type !== 9) {
            continue;
        }
        const [pitch, velocity] = event.data;
        const channel = event.channel;
        // Avoid numerical precision errors
        currentTime = +(currentTime).toFixed(10);
        if (event.type === 8 || velocity === 0) {
            // This might happen for empty or corrupted files
            if (notes.length === 0) {
                continue;
            }
            // Handle note-off
            // Go back to latest note with the same pitch and add the end time
            // If more than one channel, check also the channel!
            let index = notes.length - 1;
            while (notes[index].pitch !== pitch || notes[index].channel !== channel || notes[index].end !== -1) {
                index--;
                if (index < 0) {
                    console.warn('Did not find note-on event for note-off event!');
                    break;
                }
            }
            if (index >= 0) {
                notes[index].end = currentTime;
            }
        } else {
            // TODO: What about pitch-bend (14) etc?
            // Handle note-on
            notes.push(new Note(
                pitch,
                roundToNDecimals(currentTime, 12),
                velocity,
                channel,
                -1,
            ));
        }
    }
    // Fix missing note ends
    for (const note of notes) {
        if (note.end === -1) {
            note.end = roundToNDecimals(currentTime, 12);
        }
    }
    // Generate measure lines from tempo and beat type changes
    const measureLinePositions = getMeasureLines(tempoChanges, beatTypeChanges, currentTime);
    // Save parsed track with meta information
    if (notes.length > 0) {
        const parsedTrack = {
            noteObjs: notes,
            totalTime: currentTime,
            tempoChanges,
            beatTypeChanges,
            keySignatureChanges,
            measureLinePositions,
            // Initial values
            bpm: tempoChanges[0]?.tempo || 120,
            beats: beatTypeChanges[0]?.beats || 4,
            beatType: beatTypeChanges[0]?.beatType || 4,
        };
        // console.log(`Got part with ${notes.length} notes,\n`, parsedTrack);
        return parsedTrack;
    } else {
        // console.log('Empty track');
        return null;
    }
}

/**
 * Extracts part name strings from MIDI tracks
 *
 * @private
 * @param {object} track MIDI tracks
 * @returns {string} part names
 */
function getPartName(track) {
    for (const event of track) {
        if (event.type === 255 && event.metaType === 3) {
            return event.data;
        }
    }
    return '';
}

/**
 * Caclulates the time positions of measure lines by looking at tempo and beat
 * type change events
 *
 * @todo probably does not handle complex meters correctly
 * @todo does not handle tempo change yet, do this as in parsing notes
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
    let secondsPerBeat = bpmToSecondsPerBeat(tempo);
    // let beatType = 4;
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
            secondsPerBeat = bpmToSecondsPerBeat(tempo);
        }
        for (const b of beatTypeChanges) {
            if (b.time <= currentTime) {
                beats = b.beats;
                // beatType = b.beatType;
            }
        }
        // Update time and beats
        currentBeatsInMeasure++;
        timeSinceLastTempoChange += secondsPerBeat;
        currentTime = timeOfLastTempoChange + timeSinceLastTempoChange;
        if (currentBeatsInMeasure >= beats) {
            // Measure is full
            currentBeatsInMeasure = 0;
            measureLines.push(roundToNDecimals(currentTime, 12));
        }
    }
    return measureLines;
}

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
    for (const [channelId, notes] of grouped.entries()) {
        splittedTracks[channelId] = {
            ...tracks[0],
            noteObjs: notes,
        };
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
    const milliSecondsPerBeat = 1 / tempo * 60000;
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
            if (event.type === 255 && event.metaType === 81) {
                const milliSecondsPerQuarter = event.data / 1000;
                const tempo = Math.round(1 / (milliSecondsPerQuarter / 60000));
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
            if (event.type === 255 && event.metaType === 88) {
                const d = event.data;
                const beats = d[0];
                const beatType = 2 ** d[1];
                beatTypeChanges.push({
                    tick: currentTick,
                    beats,
                    beatType,
                });
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
            if (event.type === 255 && event.metaType === 0x59) {
                // console.log('keychange', event);
                const d = event.data;
                const { key, scale } = keySignatureMap.get(d);
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
 * @todo test
 *  - convert something to MIDI and back with above function to see if result is the same as the original
 *  - and the other way round
 *
 * @private
 * @param {Note[]} notes notes
 * @param {number} bpm tempo in beats per minute
 */
// export function convertNoteArrayToMIDIJSON(notes, bpm) {
//     const timeDivision = 96;
//     const milliSecondsPerBeat = 1 / bpm * 60_000;
//     const ticksPerMillisecond = timeDivision / milliSecondsPerBeat;
//     const track = [];
//     let currentTime = 0;
//     // For each note create a note on and note off event
//     // duplicate each note and set the start of the second copy to the note's end
//     // sort notes by the new start times
//     const noteOns = notes.slice();
//     const noteOffs = notes.map(n => n.clone());
//     noteOffs.forEach(n => n.start = n.end);
//     const notesNew = noteOns.concat(noteOffs).sort((a, b) => a.start - b.start);
//     // Go through all notes, and remember which ones are currently 'on'
//     // If a note appears and is currently 'off': note_on event, and vice versa
//     const currentlyOn = Array(128).fill(false);
//     for (let note of notesNew) {
//         let eventType;
//         if (!currentlyOn[note.pitch]) {
//             // note_on event
//             eventType = 9;
//         } else if (currentlyOn[note.pitch]) {
//             // note_off event
//             eventType = 8;
//         }
//         currentlyOn[note.pitch] = !currentlyOn[note.pitch];
//         // Convert to ticks
//         const deltaTime = (note.start - currentTime) * 1000 * ticksPerMillisecond;
//         currentTime = note.start;
//         track.push({
//             deltaTime,
//             type: eventType,
//             channel: 0,
//             data: [
//                 note.pitch,
//                 note.velocity
//             ]
//         });
//     }
//     const result = {
//         formatType: 0,
//         tracks: 1,
//         timeDivision,
//         bpm: bpm,
//         track: [
//             { event: track }
//         ]
//     };
//     console.log('[MidiParser] Converted note array to MIDI JSON', result);
//     return JSON.stringify(result);
// }

/**
 * Maps needed for key signature detection from number of sharps / flats
 * see https://www.recordingblogs.com/wiki/midi-key-signature-meta-message
 */
const keySignatureMap = new Map([
    // major
    [0xF900, { key: 'Cb', scale: 'major' }],
    [0xFA00, { key: 'Gb', scale: 'major' }],
    [0xFB00, { key: 'Db', scale: 'major' }],
    [0xFC00, { key: 'Ab', scale: 'major' }],
    [0xFD00, { key: 'Eb', scale: 'major' }],
    [0xFE00, { key: 'Bb', scale: 'major' }],
    [0xFF00, { key: 'F', scale: 'major' }],
    [0x0000, { key: 'C', scale: 'major' }],
    [0x0100, { key: 'G', scale: 'major' }],
    [0x0200, { key: 'D', scale: 'major' }],
    [0x0300, { key: 'A', scale: 'major' }],
    [0x0400, { key: 'E', scale: 'major' }],
    [0x0500, { key: 'B', scale: 'major' }],
    [0x0600, { key: 'F#', scale: 'major' }],
    [0x0700, { key: 'C#', scale: 'major' }],
    // minor
    [0xF901, { key: 'Ab', scale: 'minor' }],
    [0xFA01, { key: 'Eb', scale: 'minor' }],
    [0xFB01, { key: 'Bb', scale: 'minor' }],
    [0xFC01, { key: 'F', scale: 'minor' }],
    [0xFD01, { key: 'C', scale: 'minor' }],
    [0xFE01, { key: 'G', scale: 'minor' }],
    [0xFF01, { key: 'D', scale: 'minor' }],
    [0x0001, { key: 'A', scale: 'minor' }],
    [0x0101, { key: 'E', scale: 'minor' }],
    [0x0201, { key: 'B', scale: 'minor' }],
    [0x0301, { key: 'F#', scale: 'minor' }],
    [0x0401, { key: 'C#', scale: 'minor' }],
    [0x0501, { key: 'G#', scale: 'minor' }],
    [0x0601, { key: 'D#', scale: 'minor' }],
    [0x0701, { key: 'A#', scale: 'minor' }],
]);
