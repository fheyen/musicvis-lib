import patterns from './Patterns';

/**
 * Maps internal drum names to MusicXML instrument names and note display
 *
 * @type {Map<string,object>}
 */
export const drumInstrumentMap = new Map([
    [
        'bass', {
            instr: 'P1-I36',
            display: ['F', '4'],
            notehead: '',
            stem: 'down',
        },
    ],
    [
        'snare', {
            instr: 'P1-I39',
            display: ['C', '5'],
            notehead: '',
            stem: 'down',
        },
    ],
    [
        'hihat-closed', {
            instr: 'P1-I43',
            display: ['G', '5'],
            notehead: 'x',
            stem: 'up',
        },
    ],
    [
        'hihat-pedal', {
            instr: 'P1-I45',
            display: ['D', '4'],
            notehead: 'x',
            stem: 'down',
        },
    ],
    [
        'hihat-open', {
            instr: 'P1-I47',
            display: ['E', '5'],
            notehead: 'x',
            stem: 'up',
        },
    ],
    [
        'cymbal-crash', {
            instr: 'P1-I50',
            display: ['A', '5'],
            notehead: 'x',
            stem: 'up',
        },
    ],
    [
        'cymbal-ride', {
            instr: 'P1-I52',
            display: ['F', '5'],
            notehead: 'up',
            stem: 'x',
        },
    ],
    [
        'cymbal-chinese', {
            instr: 'P1-I53',
            display: ['B', '5'],
            notehead: 'x',
            stem: 'up',
        },
    ],
    [
        'cymbal-splash', {
            instr: 'P1-I56',
            display: ['B', '5'],
            notehead: 'x',
            stem: 'up',
        },
    ],
    [
        'tom-hi', {
            instr: 'P1-I51',
            display: ['F', '5'],
            notehead: '',
            stem: 'up',
        },
    ],
    [
        'tom-mid-hi', {
            instr: 'P1-I49',
            display: ['F', '5'],
            notehead: '',
            stem: 'up',
        },
    ],
    [
        'tom-mid-low', {
            instr: 'P1-I48',
            display: ['E', '5'],
            notehead: '',
            stem: 'up',
        },
    ],
    [
        'tom-low', {
            instr: 'P1-I46',
            display: ['D', '5'],
            notehead: '',
            stem: 'up',
        },
    ],
    [
        'tom-floor-hi', {
            instr: 'P1-I44',
            display: ['A', '4'],
            notehead: '',
            stem: 'down',
        },
    ],
    [
        'tom-floor-low', {
            instr: 'P1-I42',
            display: ['A', '4'],
            notehead: '',
            stem: 'up',
        },
    ],
]);


/**
 * Takes a baseline pattern and moves it to the correct position on the fretboard
 *
 * @param {string} patternType pattern type
 * @param {number} [repeat=1] number of repeats
 * @returns {number[][]} array of [string, fret] positions
 */
export function generatePattern(patternType, repeat = 1) {
    const pattern = patterns.get(patternType).hits;
    if (repeat === 1) {
        return pattern;
    }
    // Repeat with or without alternative direction
    let result = pattern;
    if (repeat > 1) {
        for (let repetition = 1; repetition < repeat; repetition++) {
            result = [...result, ...pattern];
        }
    }
    // console.log(pattern);
    return result;
}

/**
 * Generates MusicXML text from a pattern
 *
 * @param {string} name name
 * @param {number} tempo tempo in bpm
 * @param {string} timeSig time signature e.g. 4/4
 * @param {number[][]} drumHits the output of generatePattern
 * @returns {string} MusicXML string
 */
export function generateXml(name, tempo, timeSig, drumHits) {
    const credit = 'github.com/fheyen/musicvis-lib';
    timeSig = timeSig.split('/').map(d => +d);
    const notesPerMeasure = timeSig[0];
    let currentMeasure = 1;
    let currentNoteInMeasure = 1;
    let measuresString = '';
    for (const hit of drumHits) {
        if (currentNoteInMeasure > notesPerMeasure) {
            // Start new measure
            currentMeasure++;
            currentNoteInMeasure = 1;
            measuresString = `${measuresString}
            </measure>
            <measure number="${currentMeasure}">`;
        }
        currentNoteInMeasure++;
        // Get instrument etc.
        if (hit.length === 1) {
            const drum = hit[0];
            if (drum === 'rest') {
                measuresString = `${measuresString}
                <note>
                    <rest/>
                    <duration>1</duration>
                    <voice>1</voice>
                    <type>quarter</type>
                </note>`;
            } else {
                const details = drumInstrumentMap.get(drum);
                measuresString = `${measuresString}
                <note>
                    <unpitched>
                        <display-step>${details.display[0]}</display-step>
                        <display-octave>${details.display[1]}</display-octave>
                    </unpitched>
                    <duration>1</duration>
                    <instrument id="${details.instr}"/>
                    <voice>1</voice>
                    <type>quarter</type>
                    <stem>${details.stem}</stem>${details.notehead === '' ? '' : `
                    <notehead>${details.notehead}</notehead>`}
                </note>`;
            }
        } else {
            // Handle 'chords'
            for (const [i, drum] of hit.entries()) {
                const details = drumInstrumentMap.get(drum);
                measuresString = `${measuresString}
                <note>${i > 0 ? `
                    <chord/>`: ''}
                    <unpitched>
                        <display-step>${details.display[0]}</display-step>
                        <display-octave>${details.display[1]}</display-octave>
                    </unpitched>
                    <duration>1</duration>
                    <instrument id="${details.instr}"/>
                    <voice>1</voice>
                    <type>quarter</type>
                    <stem>${details.stem}</stem>${details.notehead === '' ? '' : `
                    <notehead>${details.notehead}</notehead>`}
                </note>`;
            }
        }
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <work>
    <work-title>Drums</work-title>
    </work>
  <identification>
    <encoding>
      <software>${credit}</software>
      </encoding>
    </identification>
  <credit page="1">
    <credit-words default-x="595.44" default-y="1626.67" justify="center" valign="top" font-size="24">${name}</credit-words>
    </credit>
  <part-list>
    <score-part id="P1">
      <part-name>${name}</part-name>
      <part-abbreviation>Drs.</part-abbreviation>
      <score-instrument id="P1-I36">
        <instrument-name>Acoustic Bass Drum</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I37">
        <instrument-name>Bass Drum 1</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I38">
        <instrument-name>Side Stick</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I39">
        <instrument-name>Acoustic Snare</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I41">
        <instrument-name>Electric Snare</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I42">
        <instrument-name>Low Floor Tom</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I43">
        <instrument-name>Closed Hi-Hat</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I44">
        <instrument-name>High Floor Tom</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I45">
        <instrument-name>Pedal Hi-Hat</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I46">
        <instrument-name>Low Tom</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I47">
        <instrument-name>Open Hi-Hat</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I48">
        <instrument-name>Low-Mid Tom</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I49">
        <instrument-name>Hi-Mid Tom</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I50">
        <instrument-name>Crash Cymbal 1</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I51">
        <instrument-name>High Tom</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I52">
        <instrument-name>Ride Cymbal 1</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I53">
        <instrument-name>Chinese Cymbal</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I54">
        <instrument-name>Ride Bell</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I55">
        <instrument-name>Tambourine</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I56">
        <instrument-name>Splash Cymbal</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I57">
        <instrument-name>Cowbell</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I58">
        <instrument-name>Crash Cymbal 2</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I60">
        <instrument-name>Ride Cymbal 2</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I64">
        <instrument-name>Open Hi Conga</instrument-name>
        </score-instrument>
      <score-instrument id="P1-I65">
        <instrument-name>Low Conga</instrument-name>
        </score-instrument>
      <midi-device port="1"></midi-device>
      <midi-instrument id="P1-I36">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>36</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I37">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>37</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I38">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>38</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I39">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>39</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I41">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>41</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I42">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>42</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I43">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>43</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I44">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>44</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I45">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>45</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I46">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>46</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I47">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>47</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I48">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>48</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I49">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>49</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I50">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>50</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I51">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>51</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I52">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>52</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I53">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>53</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I54">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>54</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I55">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>55</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I56">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>56</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I57">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>57</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I58">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>58</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I60">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>60</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I64">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>64</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      <midi-instrument id="P1-I65">
        <midi-channel>10</midi-channel>
        <midi-program>1</midi-program>
        <midi-unpitched>65</midi-unpitched>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      </score-part>
    </part-list>
  <part id="P1">
    <measure number="1" width="309.39">
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
          <sign>percussion</sign>
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
  </score-partwise>`;
}
