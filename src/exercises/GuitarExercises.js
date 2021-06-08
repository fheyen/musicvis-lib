import { Guitar } from '../instruments/Guitar';
import MusicPiece from '../types/MusicPiece';

/**
 * @todo allow speedup
 */

/**
 * Takes a baseline pattern and moves it to the correct position on the fretboard
 *
 * @param {string} patternType pattern type
 * @param {string} rootNote root note
 * @param {number} [repeat=1] number of repetitions
 * @param {boolena} [alternate=false] reverse notes every second repetition
 * @returns {number[][]} array of [string, fret] positions
 */
export function generatePattern(patternType, rootNote = 'A', repeat = 1, alternate = false) {
    const pattern = patterns.get(patternType);
    const rootPos = pattern.rootNotePositions.indexOf(rootNote);
    const shiftedToRoot = pattern.positions.map(d => {
        const [string, fret] = d;
        return [string, fret + rootPos];
    });
    if (repeat === 1) {
        return shiftedToRoot;
    }
    // Repeat with or without alternative direction
    let result = shiftedToRoot;
    if (repeat > 1) {
        let reversed = [...shiftedToRoot].reverse();
        for (let repetition = 1; repetition < repeat; repetition++) {
            result = alternate && repetition % 2 === 1 ? [...result, ...reversed] : [...result, ...shiftedToRoot];
        }
    }
    // console.log(pattern);
    return result;
}

// export function generateMusicPiece(
//     name,
//     patternType,
//     tempos = [120],
//     timeSig = [4, 4],
//     rootNote = 'A',
//     repeat = 1,
//     alternate = false,
// ) {

//     return new MusicPiece(name, tempoDefs, timeSigs, keySigs, measureTimes, [track]);
// }

// export function generateMetronomeTrack(
//     name,
//     patternType,
//     tempos = [120],
//     timeSig = [4, 4],
//     rootNote = 'A',
//     repeat = 1,
//     alternate = false,
// ) {
// }

/**
 * Generates MusicXML text from a pattern
 *
 * @param {string} name name
 * @param {number} tempo tempo in bpm
 * @param {string} timeSig time signature e.g. 4/4
 * @param {number[][]} positions the output of generatePattern
 * @returns {string} MusicXML string
 */
export function generateXml(name, tempo, timeSig, positions) {
    const credit = 'github.com/fheyen/musicvis-lib';
    timeSig = timeSig.split('/').map(d => +d);
    const notesPerMeasure = timeSig[0];
    let currentMeasure = 1;
    let currentNoteInMeasure = 1;
    let measuresString = '';
    for (const [string, fret] of positions) {
        if (currentNoteInMeasure > notesPerMeasure) {
            // Start new measure
            currentMeasure++;
            currentNoteInMeasure = 1;
            measuresString = `${measuresString}
            </measure>
            <measure number="${currentMeasure}">`;
        }
        currentNoteInMeasure++;
        // Get note and octave from position
        const tuning = Guitar.stringedTunings.get('Guitar').get(6)[0];
        const note = Guitar.getNoteInfoFromFretboardPos(string, fret, tuning);
        measuresString = `${measuresString}
            <note>
                <pitch>
                    <step>${note.name}</step>
                    <octave>${note.octave}</octave>
                </pitch>
                <notations>
                    <technical>
                        <fret>${fret}</fret>
                        <string>${string}</string>
                    </technical>
                </notations>
                <voice>1</voice>
                <duration>960</duration>
                <type>quarter</type>
            </note>`;
    }
    return `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<score-partwise>
    <work>
        <work-title />
    </work>
    <identification>
        <encoding>
            <software>${credit}</software>
        </encoding>
    </identification>
    <part-list>
        <score-part id="P1">
            <part-name>${name}</part-name>
            <score-instrument id="P1-I1">
                <instrument-name>Steel String Guitar 1</instrument-name>
            </score-instrument>
            <midi-instrument id="P1-I1">
                <midi-channel>1</midi-channel>
                <midi-program>26</midi-program>
            </midi-instrument>
        </score-part>
    </part-list>
    <part id="P1">
        <measure number="1">
            <attributes>
                <divisions>960</divisions>
                <key>
                    <fifths>0</fifths>
                    <mode>major</mode>
                </key>
                <clef>
                    <sign>G</sign>
                    <line>2</line>
                </clef>
                <time>
                    <beats>${timeSig[0]}</beats>
                    <beat-type>${timeSig[1]}</beat-type>
                </time>
                <staff-details>
                    <staff-lines>6</staff-lines>
                    <staff-tuning line="1">
                        <tuning-step>E</tuning-step>
                        <tuning-octave>2</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="2">
                        <tuning-step>A</tuning-step>
                        <tuning-octave>2</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="3">
                        <tuning-step>D</tuning-step>
                        <tuning-octave>3</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="4">
                        <tuning-step>G</tuning-step>
                        <tuning-octave>3</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="5">
                        <tuning-step>B</tuning-step>
                        <tuning-octave>3</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="6">
                        <tuning-step>E</tuning-step>
                        <tuning-octave>4</tuning-octave>
                    </staff-tuning>
                </staff-details>
            </attributes>
            <direction placement="above">
                <sound tempo="${tempo}" />
            </direction>
           ${measuresString}
        </measure>
    </part>
</score-partwise>
`;
}




/**
 * Contains patterns for exercises, such as scales
 * TODO: find way to automatically compute patterns from scales, get scales from tonaljs
 *
 * @type {Map<string,object>}
 */
export const patterns = new Map([
    ['pentatonic C type', {
        name: 'Pentatonic scale C type',
        rootNotePositions: ['A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
        // String fret pairs, strings are 0 (E4) to 5 (E2)
        positions: [
            [6, 1],
            [6, 3],
            [5, 1],
            [5, 3],
            [4, 0],
            [4, 2],
            [3, 0],
            [3, 2],
            [2, 1],
            [2, 3],
            [1, 0],
            [1, 3],
        ],
    }],
    ['pentatonic A type', {
        name: 'Pentatonic scale A type',
        rootNotePositions: ['A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
        // String fret pairs, strings are 0 (E4) to 5 (E2)
        positions: [
            [6, 1],
            [6, 3],
            [5, 1],
            [5, 3],
            [4, 0],
            [4, 3],
            [3, 0],
            [3, 3],
            [2, 1],
            [2, 3],
            [1, 1],
            [1, 3],
        ],
    }],
    ['pentatonic G type', {
        name: 'Pentatonic scale G type',
        rootNotePositions: ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#'],
        // String fret pairs, strings are 0 (E4) to 5 (E2)
        positions: [
            [6, 0],
            [6, 3],
            [5, 0],
            [5, 2],
            [4, 0],
            [4, 2],
            [3, 0],
            [3, 2],
            [2, 0],
            [2, 3],
            [1, 0],
            [1, 3],
        ],
    }],
    ['pentatonic E type', {
        name: 'Pentatonic scale E type',
        rootNotePositions: ['F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
        // String fret pairs, strings are 0 (E4) to 5 (E2)
        positions: [
            [6, 1],
            [6, 3],
            [5, 0],
            [5, 3],
            [4, 0],
            [4, 3],
            [3, 0],
            [3, 2],
            [2, 1],
            [2, 3],
            [1, 1],
            [1, 3],
        ],
    }],
    ['pentatonic D type', {
        name: 'Pentatonic scale D type',
        rootNotePositions: ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
        // String fret pairs, strings are 0 (E4) to 5 (E2)
        positions: [
            [6, 1],
            [6, 3],
            [5, 1],
            [5, 3],
            [4, 1],
            [4, 3],
            [3, 0],
            [3, 3],
            [2, 1],
            [2, 4],
            [1, 1],
            [1, 3],
        ],
    }],
    ['pentatonic all', {
        name: 'Pentatonic scale all',
        rootNotePositions: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
        // String fret pairs, strings are 0 (E4) to 5 (E2)
        positions: [
            // C
            [6, 0],
            [6, 3],
            [5, 0],
            [5, 3],
            [4, 0],
            [4, 2],
            [3, 0],
            [3, 2],
            [2, 1],
            [2, 3],
            [1, 0],
            [1, 3],
            // A
            [6, 3],
            [6, 5],
            [5, 3],
            [5, 5],
            [4, 2],
            [4, 5],
            [3, 2],
            [3, 5],
            [2, 3],
            [2, 5],
            [1, 3],
            [1, 5],
            // G
            [6, 5],
            [6, 8],
            [5, 5],
            [5, 7],
            [4, 5],
            [4, 7],
            [3, 5],
            [3, 7],
            [2, 5],
            [2, 8],
            [1, 5],
            [1, 8],
            // E
            [6, 8],
            [6, 10],
            [5, 7],
            [5, 10],
            [4, 7],
            [4, 9],
            [3, 7],
            [3, 9],
            [2, 8],
            [2, 10],
            [1, 8],
            [1, 10],
            // D
            [6, 10],
            [6, 12],
            [5, 10],
            [5, 12],
            [4, 10],
            [4, 12],
            [3, 9],
            [3, 12],
            [2, 10],
            [2, 13],
            [1, 10],
            [1, 12],
            // C
            [6, 12],
            [6, 15],
            [5, 12],
            [5, 15],
            [4, 12],
            [4, 14],
            [3, 12],
            [3, 14],
            [2, 13],
            [2, 15],
            [1, 12],
            [1, 15],
        ],
    }],

    /**
     * Heptatonic scales
     */
    ['haptatonic C type', {
        name: 'Heptatonic scale C type',
        rootNotePositions: ['A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
        // String fret pairs, strings are 0 (E4) to 5 (E2)
        positions: [
            [6, 1],
            [6, 3],
            [5, 1],
            [5, 3],
            [4, 0],
            [4, 2],
            [3, 0],
            [3, 2],
            [2, 1],
            [2, 3],
            [1, 0],
            [1, 3],
        ],
    }],

    // TODO: other heptatonic patterns
    // TODO: all heptatonic patterns in one

    /**
     * Rows
     */
    ['rows of 4, left-right', {
        name: 'Rows left-right',
        rootNotePositions: ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'],
        positions: Array.from({ length: 6 }).flatMap((d, string) =>
            Array.from({ length: 4 }).map((d, fret) => [6 - string, fret]),
        ),
    }],
    ['rows of 4, right-left', {
        name: 'Rows right-left',
        rootNotePositions: ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'],
        positions: Array.from({ length: 6 }).flatMap((d, string) =>
            Array.from({ length: 4 }).map((d, fret) => [6 - string, 3 - fret]),
        ),
    }],
    ['rows of 4, left-right and right-left', {
        name: 'Rows left-right and right-left',
        rootNotePositions: ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'],
        positions: Array.from({ length: 6 }).flatMap((d, string) =>
            Array.from({ length: 4 }).map((d, fret) => [6 - string, string % 2 === 0 ? fret : 3 - fret]),
        ),
    }],
]);
