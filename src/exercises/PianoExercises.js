import { Scale } from '@tonaljs/tonal';
import { Midi } from '../fileFormats/Midi.js';

/**
 * Takes a baseline pattern and moves it to the correct position on the fretboard
 *
 * @param {string} patternType pattern type
 * @param {string} [rootNote=C] root note
 * @param {string} [scaleType=major] see tonaljs scale types
 * @param {number} [repeat=1] number of repetitions
 * @param {boolean} [alternate=false] reverse notes every second repetition
 * @returns {number[][]} array of [string, fret] positions
 */
export function generatePattern(
    patternType,
    rootNote = 'C',
    scaleType = 'major',
    repeat = 1,
    alternate = false,
) {
    let notes = [];
    if (patternType === 'Scale') {
        const scale = Scale.get(`${rootNote} ${scaleType}`);
        for (let octave = 1; octave < 8; octave++) {
            for (let note of scale.notes) {
                if (Midi.flatToSharp.has(note)) {
                    note = Midi.flatToSharp.get(note);
                }
                notes.push([note, octave]);
            }
        }
    }
    // Repeat with or without alternative direction
    return repeatPattern(repeat, notes, alternate);
}

/**
 * Repeats a pattern with or without alternating direction
 *
 * @param {number} nRepetitions number of repetitions
 * @param {Array} pattern pattern
 * @param {boolean} alternate alternate direction?
 * @returns {Array} repeated pattern
 */
export function repeatPattern(nRepetitions, pattern, alternate) {
    let result = pattern;
    if (nRepetitions > 1) {
        let reversed = [...pattern].reverse();
        for (let repetition = 1; repetition < nRepetitions; repetition++) {
            result = alternate && repetition % 2 === 1 ? [...result, ...reversed] : [...result, ...pattern];
        }
    }
    return result;
}

/**
 * Generates MusicXML text from a pattern
 *
 * @param {string} name name
 * @param {number} tempo tempo in bpm
 * @param {string} timeSig time signature e.g. 4/4
 * @param {{note:string, octave:number}} notes the output of generatePattern
 * @returns {string} MusicXML string
 */
export function generateXml(name, tempo, timeSig, notes) {
    const credit = 'github.com/fheyen/musicvis-lib';
    timeSig = timeSig.split('/').map(d => +d);
    const notesPerMeasure = timeSig[0];
    let currentMeasure = 1;
    let currentNoteInMeasure = 1;
    let measuresString = '';
    for (let [note, octave] of notes) {
        if (currentNoteInMeasure > notesPerMeasure) {
            // Start new measure
            currentMeasure++;
            currentNoteInMeasure = 1;
            measuresString = `${measuresString}
            </measure>
            <measure number="${currentMeasure}">`;
        }
        currentNoteInMeasure++;
        // Handle sharp / flat
        // TODO: this assumes C major as signature, but should be fine
        let alter = 0;
        if (note.endsWith('#')) {
            note = note.slice(0, -1);
            alter = 1;
        }
        measuresString = `${measuresString}
            <note>
                <pitch>
                    <step>${note}</step>${alter === 0 ? '' : `
                    <alter>${alter}</alter>`}
                    <octave>${octave}</octave>
                </pitch>
                <duration>1</duration>
                <voice>1</voice>
                <type>quarter</type>
            </note>`;
    }
    return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <work>
    <work-title>${name}</work-title>
    </work>
  <identification>
    <creator type="composer">${credit}</creator>
    <encoding>
      <software>${credit}</software>
      <encoding-date>2021-02-12</encoding-date>
      <supports element="accidental" type="yes"/>
      <supports element="beam" type="yes"/>
      <supports element="print" attribute="new-page" type="yes" value="yes"/>
      <supports element="print" attribute="new-system" type="yes" value="yes"/>
      <supports element="stem" type="yes"/>
      </encoding>
    </identification>
  <defaults>
    <scaling>
      <millimeters>7.05556</millimeters>
      <tenths>40</tenths>
      </scaling>
    <page-layout>
      <page-height>1683.36</page-height>
      <page-width>1190.88</page-width>
      <page-margins type="even">
        <left-margin>56.6929</left-margin>
        <right-margin>56.6929</right-margin>
        <top-margin>56.6929</top-margin>
        <bottom-margin>113.386</bottom-margin>
        </page-margins>
      <page-margins type="odd">
        <left-margin>56.6929</left-margin>
        <right-margin>56.6929</right-margin>
        <top-margin>56.6929</top-margin>
        <bottom-margin>113.386</bottom-margin>
        </page-margins>
      </page-layout>
    <word-font font-family="FreeSerif" font-size="10"/>
    <lyric-font font-family="FreeSerif" font-size="11"/>
    </defaults>
  <credit page="1">
    <credit-words default-x="595.44" default-y="1626.67" justify="center" valign="top" font-size="24">${name}</credit-words>
    </credit>
  <credit page="1">
    <credit-words default-x="1134.19" default-y="1526.67" justify="right" valign="bottom" font-size="12">${credit}
</credit-words>
    </credit>
  <part-list>
    <score-part id="P1">
      <part-name>Piano</part-name>
      <part-abbreviation>Pno.</part-abbreviation>
      <score-instrument id="P1-I1">
        <instrument-name>Piano</instrument-name>
        </score-instrument>
      <midi-device id="P1-I1" port="1"></midi-device>
      <midi-instrument id="P1-I1">
        <midi-channel>1</midi-channel>
        <midi-program>1</midi-program>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      </score-part>
    </part-list>
  <part id="P1">
    <measure number="1" width="315.37">
      <print>
        <system-layout>
          <system-margins>
            <left-margin>0.00</left-margin>
            <right-margin>-0.00</right-margin>
            </system-margins>
          <top-system-distance>170.00</top-system-distance>
          </system-layout>
        </print>
      <attributes>
        <divisions>1</divisions>
        <key>
          <fifths>0</fifths>
          </key>
        <time>
          <beats>${timeSig[0]}</beats>
          <beat-type>${timeSig[1]}</beat-type>
          </time>
        <clef>
          <sign>G</sign>
          <line>2</line>
          </clef>
        </attributes>
      <direction placement="above">
        <direction-type>
          <metronome parentheses="no" default-x="-35.96" relative-y="20.00">
            <beat-unit>quarter</beat-unit>
            <per-minute>${tempo}</per-minute>
            </metronome>
          </direction-type>
        <sound tempo="${tempo}"/>
        </direction>
        ${measuresString}
      </measure>
    </part>
  </score-partwise>
`;
}
