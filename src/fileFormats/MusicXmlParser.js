import Note from '../types/Note';
import GuitarNote from '../types/GuitarNote';
import { getMidiNoteByNameAndOctave } from '../Midi';
import { max } from 'd3';


/**
 * Converts a collection of MusicXML measures to JavaScript Objects with timing information in seconds.
 * Also calculates the position of measure lines and the total time in seconds.
 * @param {XMLDocument} xml MusicXML document
 * @returns {Object} parsed document
 * TODO: use https://github.com/jnetterf/musicxml-interfaces ?
 */
export function preprocessMusicXmlData(xml) {
    console.groupCollapsed('[MusicXmlParser] Parsing MusicXML');
    // console.group('[MusicXmlParser] Parsing MusicXML');
    console.log(xml);
    // Get part and instrument names
    const partNameElements = xml.getElementsByTagName('part-name');
    const instruments = xml.getElementsByTagName('score-instrument');
    const partNames = [];
    const instrumentNames = [];
    for (let p of partNameElements) {
        partNames.push(p.innerHTML);
    }
    for (let i of instruments) {
        instrumentNames.push(i.children[0].innerHTML);
    }
    // Preprocess notes
    const parts = xml.getElementsByTagName('part');
    let parsedParts = [];
    for (let p = 0; p < parts.length; p++) {
        const measures = parts[p].children;
        parsedParts.push(preprocessMusicXmlMeasures(measures));
    }
    console.groupEnd();
    return {
        parts: parsedParts,
        partNames,
        instruments: instrumentNames,
        totalTime: max(parsedParts, d => d.totalTime),
        // This is the first tempo etc., changes are stored in each part
        bpm: parsedParts[0].bpm,
        beats: parsedParts[0].beats,
        beatType: parsedParts[0].beatType
    };
}

/**
 * Converts a collection of MusicXML measures to JavaScript Objects with timing information in seconds.
 * Also calculates the position of measure lines and the total time in seconds.
 * @param {HTMLCollection} measures collection of measures with notes
 * @returns {Object} parsed measures
 */
function preprocessMusicXmlMeasures(measures) {
    // Handle repetitions by duplicating measures
    measures = duplicateRepeatedMeasures(measures);

    let currentTime = 0;
    let divisions;
    let tempo = 120;
    let beats = 4;
    let beatType = 4;
    // Handle changing tempo and beat type
    const tempoChanges = [];
    const beatTypeChanges = [];
    const noteObjs = [];
    const measureLinePositions = [];
    // const directions = [];
    for (let measure of measures) {
        // Try to update metrics (if they are not set, keep the old ones)
        try {
            const soundElements = measure.getElementsByTagName('sound');
            for (let el of soundElements) {
                const tempoValue = el.getAttribute('tempo');
                if (tempoValue !== null) {
                    tempo = +tempoValue;
                    tempoChanges.push({
                        time: currentTime,
                        tempo
                    });
                }
                break;
            }
        } catch (e) { }
        try {
            divisions = +measure.getElementsByTagName('divisions')[0].innerHTML;
        } catch (e) { }
        try {
            beats = +measure.getElementsByTagName('beats')[0].innerHTML;
            beatType = +measure.getElementsByTagName('beat-type')[0].innerHTML;
            beatTypeChanges.push({
                time: currentTime,
                beats,
                beatType
            });
        } catch (e) { }
        const secondsPerBeat = 1 / (tempo / 60);

        // Read notes
        const notes = measure.getElementsByTagName('note');
        let lastNoteDuration = 0;
        for (let note of notes) {
            try {
                // TODO: Ignore non-tab staff when there is a tab staff
                // Get note duration in seconds
                const duration = +note.getElementsByTagName('duration')[0].innerHTML;
                const durationInBeats = duration / divisions;
                const durationInSeconds = durationInBeats * secondsPerBeat;
                // Do not create note object for rests, only increase time
                const isRest = note.getElementsByTagName('rest').length !== 0;
                if (isRest) {
                    currentTime += durationInSeconds;
                    continue;
                }
                // Get MIDI pitch
                const no = note.getElementsByTagName('step')[0].innerHTML;
                const octave = +note.getElementsByTagName('octave')[0].innerHTML;
                const pitch = getMidiNoteByNameAndOctave(no, octave).pitch;
                // Is this a chord? (https://www.musicxml.com/tutorial/the-midi-compatible-part/chords/)
                const isChord = note.getElementsByTagName('chord').length > 0;
                if (isChord) {
                    currentTime -= lastNoteDuration;
                }
                // Is this note tied?
                const tieEl = note.getElementsByTagName('tie')[0];
                if (tieEl && tieEl.getAttribute('type') === 'stop') {
                    let noteEnd = currentTime + durationInSeconds;
                    // Find last note with this pitch and update end
                    for (let i = noteObjs.length - 1; i > 0; i--) {
                        const n = noteObjs[i];
                        if (n.pitch === pitch) {
                            n.end = noteEnd;
                            break;
                        }
                    }
                } else {
                    // Try to get guitar specific data
                    let string = null;
                    let fret = null;
                    try {
                        fret = +note.getElementsByTagName('fret')[0].innerHTML;
                        string = +note.getElementsByTagName('string')[0].innerHTML;
                    } catch (e) {/* Do nothing */ }
                    // TODO: use xml note type?
                    // const type = note.getElementsByTagName('type')[0].innerHTML;
                    if (string !== null && fret !== null) {
                        noteObjs.push(new GuitarNote(
                            pitch,
                            currentTime,
                            127,
                            string,
                            currentTime + durationInSeconds,
                            string,
                            fret
                        ));
                    } else {
                        noteObjs.push(new Note(
                            pitch,
                            currentTime,
                            127,
                            string,
                            currentTime + durationInSeconds
                        ));
                    }
                }
                lastNoteDuration = durationInSeconds;
                currentTime += durationInSeconds;
            } catch (e) {
                console.warn('[MusicXmlParser] Cannot parse MusicXML note');
                console.warn(e);
                console.log(note);
            }
        }
        // Add measure line position
        measureLinePositions.push(currentTime);
    }
    // Default tempo and beat type
    if (tempoChanges.length === 0) {
        tempoChanges.push({ tempo: 120, time: 0 });
    }
    if (beatTypeChanges.length === 0) {
        beatTypeChanges.push({ beats: 4, beatType: 4, time: 0 });
    }
    const result = {
        noteObjs: noteObjs,
        totalTime: currentTime,
        measureLinePositions,
        tempoChanges,
        beatTypeChanges,
        // Initial values
        bpm: tempoChanges[0]?.tempo || 120,
        beats: beatTypeChanges[0].beats,
        beatType: beatTypeChanges[0].beatType,
        tuning: getTuningPitches(measures)
    };
    console.log('[MusicXmlParser] Parsed part: ', result);
    return result;
}

/**
 * Resolves repetitions by simply duplicating repeated measures.
 * https://www.musicxml.com/tutorial/the-midi-compatible-part/repeats/
 * TODO: handle 3x etc
 * TODO: handle different endings
 * @param {HTMLCollection} measures measures
 * @returns {*} processed measures
 */
function duplicateRepeatedMeasures(measures) {
    let repeatedMeasures = [];
    let currentRepetition = [];
    for (let i = 0; i < measures.length; i++) {
        const measure = measures[i];
        const rep = measure.getElementsByTagName('repeat');
        if (rep.length === 2) {
            // Only this measure is repeated
            const times = rep[1].getAttribute('times') || 2;
            const repetition = new Array(+times).fill(measure);
            if (currentRepetition.length === 0) {
                repeatedMeasures = repeatedMeasures.concat(repetition);
            } else {
                currentRepetition = currentRepetition.concat(repetition);
            }
        } else if (rep.length === 1) {
            // Repetition either starts or ends here
            const dir = rep[0].getAttribute('direction');
            if (dir === 'forward') {
                // Start new repetition
                currentRepetition.push(measure);
            } else if (dir === 'backward') {
                const times = rep[0].getAttribute('times') || 2;
                if (currentRepetition.length > 0) {
                    // Finish current repetition
                    currentRepetition.push(measure);
                    for (let i = 0; i < times; i++) {
                        repeatedMeasures = repeatedMeasures.concat(currentRepetition);
                    }
                    currentRepetition = [];
                } else {
                    // Repetition started at the start of the piece, repeat all
                    // we have until here
                    repeatedMeasures = repeatedMeasures.concat(repeatedMeasures);
                }
            }
        } else {
            // Measure without repetition marks, but might still be inside a
            // repetition
            if (currentRepetition.length === 0) {
                repeatedMeasures.push(measure);
            } else {
                currentRepetition.push(measure);
            }
        }
    }
    return repeatedMeasures;
}

/**
 * Gets the tuning for a MusicXML part
 * @param {HTMLCollection} measures the measures of the parts
 * @returns {number[]} pitches of the tuning or [] if none is found
 */
function getTuningPitches(measures) {
    for (let measure of measures) {
        try {
            let tuningPitches = [];
            const staffTunings = measure.getElementsByTagName('staff-tuning');
            for (let st of staffTunings) {
                let tuningNote = st.getElementsByTagName('tuning-step')[0].innerHTML;
                let tuningOctave = +st.getElementsByTagName('tuning-octave')[0].innerHTML;
                // let line = +st.getAttribute('line');
                // console.log(`String ${line} is tuned to ${tuningNote}${tuningOctave}`);
                tuningPitches.push(getMidiNoteByNameAndOctave(tuningNote, tuningOctave).pitch);
            }
            return tuningPitches;
        } catch (e) { }
    }
    return [];
}
