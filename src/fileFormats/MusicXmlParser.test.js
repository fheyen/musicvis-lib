import fs from 'fs'
import path from 'path'
import { preprocessMusicXmlData } from './MusicXmlParser.js'
import Note from '../types/Note.js'

const parser = new DOMParser()

function readXmlFile (fileName) {
  const file = path.join(__dirname, '..', '..', 'test', '_test_assets', fileName)
  const text = fs.readFileSync(file, 'utf8')
  return parser.parseFromString(text, 'text/xml')
}

function readXmlAndProcess (name) {
  const file = readXmlFile(name)
  return preprocessMusicXmlData(file)
}

describe('MusicXmlParser', () => {
  test('empty', () => {
    expect(() => preprocessMusicXmlData()).toThrowError(TypeError)
  })

  test('key signatures', () => {
    const file = readXmlFile('[Test] Key Signatures 2.musicxml')
    const parsed = preprocessMusicXmlData(file)
    expect(parsed.parts[0].keySignatureChanges).toStrictEqual([
      {
        key: 'C',
        scale: 'major',
        time: 0
      },
      {
        key: 'G',
        scale: 'major',
        time: 2
      },
      {
        key: 'D',
        scale: 'major',
        time: 4
      },
      {
        key: 'A',
        scale: 'major',
        time: 6
      },
      {
        key: 'E',
        scale: 'major',
        time: 8
      },
      {
        key: 'B',
        scale: 'major',
        time: 10
      },
      {
        key: 'F#',
        scale: 'major',
        time: 12
      },
      {
        key: 'C#',
        scale: 'major',
        time: 14
      },
      {
        key: 'C',
        scale: 'major',
        time: 16
      },
      {
        key: 'F',
        scale: 'major',
        time: 18
      },
      {
        key: 'Bb',
        scale: 'major',
        time: 20
      },
      {
        key: 'Eb',
        scale: 'major',
        time: 22
      },
      {
        key: 'Ab',
        scale: 'major',
        time: 24
      },
      {
        key: 'Db',
        scale: 'major',
        time: 26
      },
      {
        key: 'Gb',
        scale: 'major',
        time: 28
      },
      {
        key: 'Cb',
        scale: 'major',
        time: 30
      }
    ])
  })

  test('beat types', () => {
    const xml = readXmlFile('[Test] Beat type change.musicxml')
    const parsed = preprocessMusicXmlData(xml)
    expect(parsed.parts[0].beatTypeChanges).toStrictEqual([
      {
        beatType: 4,
        beats: 3,
        time: 0
      },
      {
        beatType: 4,
        beats: 4,
        time: 3
      },
      {
        beatType: 4,
        beats: 3,
        time: 7
      },
      {
        beatType: 4,
        beats: 4,
        time: 10
      }
    ])
  })

  test('tempo change', () => {
    const xml = readXmlFile('[Test] Tempo change.musicxml')
    const parsed = preprocessMusicXmlData(xml)
    expect(parsed.parts[0].tempoChanges).toStrictEqual([
      {
        tempo: 120,
        time: 0
      },
      {
        tempo: 160,
        time: 2
      },
      {
        tempo: 200,
        time: 3.5
      },
      {
        tempo: 240,
        time: 4.7
      }
    ])
  })

  describe('measure positions', () => {
    const xml = readXmlFile('[Test] Tempo change.musicxml')
    const parsed = preprocessMusicXmlData(xml)

    // TODO: more tests
    test('measure times', () => {
      expect(parsed.parts[0].measureLinePositions).toStrictEqual([
        2,
        3.5,
        4.7,
        5.7
      ])
    })

    test('measure indices', () => {
      expect(parsed.parts[0].measureIndices).toStrictEqual([
        4,
        8,
        12,
        16
      ])
    })
  })

  // TODO: multiple tempos whithin a measure do not work
  // TODO: tempos that are not at the start of measures do not work
  test.skip('tempos 2', () => {
    // test('tempos 2', () => {
    const xml = readXmlFile('[Test] Tempo Change 2.musicxml')
    const parsed = preprocessMusicXmlData(xml)
    expect(parsed.parts[0].tempoChanges).toStrictEqual([
      {
        tempo: 110,
        time: 0
      },
      {
        tempo: 120,
        time: 2.181818181818
      },
      {
        tempo: 90,
        time: 4.181818181818
      },
      {
        tempo: 80,
        time: 6.848484848485
      },
      {
        tempo: 85,
        time: 9.848484848485
      },
      {
        tempo: 120,
        time: 11.260249554367
      },
      {
        tempo: 80,
        time: 12.260249554367
      },
      {
        tempo: 120,
        time: 13.760249554367
      },
      {
        tempo: 100,
        time: 14.760249554367
      },
      {
        tempo: 80,
        time: 15.360249554367
      },
      {
        tempo: 100,
        time: 16.110249554367
      },
      {
        tempo: 80,
        time: 16.710249554367
      }
    ])
  })

  describe('tunings', () => {
    test.each([
      ['[Test] Guitar Tuning E-Std.musicxml', [40, 45, 50, 55, 59, 64]],
      ['[Test] Guitar Tuning D-Std.musicxml', [38, 43, 48, 53, 57, 62]],
      ['[Test] Guitar Tuning DropD.musicxml', [38, 45, 50, 55, 59, 64]]
    ])('tuning %s', (file, tuning) => {
      const xml = readXmlFile(file)
      const parsed = preprocessMusicXmlData(xml)
      expect(parsed.parts[0].tuning).toStrictEqual(tuning)
    })
  })

  test('Drum data', () => {
    const xml = readXmlFile('[Test] Simple Drum Pattern 1 120 bpm.musicxml')
    const parsed = preprocessMusicXmlData(xml)
    expect(parsed.parts[0].noteObjs).toStrictEqual([
      {
        channel: 0,
        end: 0.5,
        name: 'G2',
        pitch: 43,
        start: 0,
        velocity: 81
      },
      {
        channel: 0,
        end: 0.5,
        name: 'C2',
        pitch: 36,
        start: 0,
        velocity: 81
      },
      {
        channel: 0,
        end: 1,
        name: 'G2',
        pitch: 43,
        start: 0.5,
        velocity: 81
      },
      {
        channel: 0,
        end: 1.5,
        name: 'G2',
        pitch: 43,
        start: 1,
        velocity: 81
      },
      {
        channel: 0,
        end: 1.5,
        name: 'D#2',
        pitch: 39,
        start: 1,
        velocity: 81
      },
      {
        channel: 0,
        end: 2,
        name: 'G2',
        pitch: 43,
        start: 1.5,
        velocity: 81
      },
      {
        channel: 0,
        end: 2.5,
        name: 'G2',
        pitch: 43,
        start: 2,
        velocity: 81
      },
      {
        channel: 0,
        end: 2.5,
        name: 'C2',
        pitch: 36,
        start: 2,
        velocity: 81
      },
      {
        channel: 0,
        end: 3,
        name: 'G2',
        pitch: 43,
        start: 2.5,
        velocity: 81
      },
      {
        channel: 0,
        end: 3,
        name: 'C2',
        pitch: 36,
        start: 2.5,
        velocity: 81
      },
      {
        channel: 0,
        end: 3.5,
        name: 'G2',
        pitch: 43,
        start: 3,
        velocity: 81
      },
      {
        channel: 0,
        end: 3.5,
        name: 'D#2',
        pitch: 39,
        start: 3,
        velocity: 81
      },
      {
        channel: 0,
        end: 4,
        name: 'G2',
        pitch: 43,
        start: 3.5,
        velocity: 81
      },
      {
        channel: 0,
        end: 4.5,
        name: 'G2',
        pitch: 43,
        start: 4,
        velocity: 81
      },
      {
        channel: 0,
        end: 4.5,
        name: 'C2',
        pitch: 36,
        start: 4,
        velocity: 81
      },
      {
        channel: 0,
        end: 5,
        name: 'G2',
        pitch: 43,
        start: 4.5,
        velocity: 81
      },
      {
        channel: 0,
        end: 5.5,
        name: 'G2',
        pitch: 43,
        start: 5,
        velocity: 81
      },
      {
        channel: 0,
        end: 5.5,
        name: 'D#2',
        pitch: 39,
        start: 5,
        velocity: 81
      },
      {
        channel: 0,
        end: 6,
        name: 'G2',
        pitch: 43,
        start: 5.5,
        velocity: 81
      },
      {
        channel: 0,
        end: 6.5,
        name: 'G2',
        pitch: 43,
        start: 6,
        velocity: 81
      },
      {
        channel: 0,
        end: 6.5,
        name: 'C2',
        pitch: 36,
        start: 6,
        velocity: 81
      },
      {
        channel: 0,
        end: 7,
        name: 'G2',
        pitch: 43,
        start: 6.5,
        velocity: 81
      },
      {
        channel: 0,
        end: 7,
        name: 'C2',
        pitch: 36,
        start: 6.5,
        velocity: 81
      },
      {
        channel: 0,
        end: 7.5,
        name: 'G2',
        pitch: 43,
        start: 7,
        velocity: 81
      },
      {
        channel: 0,
        end: 7.5,
        name: 'D#2',
        pitch: 39,
        start: 7,
        velocity: 81
      },
      {
        channel: 0,
        end: 8,
        name: 'G2',
        pitch: 43,
        start: 7.5,
        velocity: 81
      },
      {
        channel: 0,
        end: 8.5,
        name: 'G2',
        pitch: 43,
        start: 8,
        velocity: 81
      },
      {
        channel: 0,
        end: 8.5,
        name: 'C2',
        pitch: 36,
        start: 8,
        velocity: 81
      },
      {
        channel: 0,
        end: 9,
        name: 'G2',
        pitch: 43,
        start: 8.5,
        velocity: 81
      },
      {
        channel: 0,
        end: 9.5,
        name: 'G2',
        pitch: 43,
        start: 9,
        velocity: 81
      },
      {
        channel: 0,
        end: 9.5,
        name: 'D#2',
        pitch: 39,
        start: 9,
        velocity: 81
      },
      {
        channel: 0,
        end: 10,
        name: 'G2',
        pitch: 43,
        start: 9.5,
        velocity: 81
      },
      {
        channel: 0,
        end: 10.5,
        name: 'G2',
        pitch: 43,
        start: 10,
        velocity: 81
      },
      {
        channel: 0,
        end: 10.5,
        name: 'C2',
        pitch: 36,
        start: 10,
        velocity: 81
      },
      {
        channel: 0,
        end: 11,
        name: 'G2',
        pitch: 43,
        start: 10.5,
        velocity: 81
      },
      {
        channel: 0,
        end: 11,
        name: 'C2',
        pitch: 36,
        start: 10.5,
        velocity: 81
      },
      {
        channel: 0,
        end: 11.5,
        name: 'G2',
        pitch: 43,
        start: 11,
        velocity: 81
      },
      {
        channel: 0,
        end: 11.5,
        name: 'D#2',
        pitch: 39,
        start: 11,
        velocity: 81
      },
      {
        channel: 0,
        end: 12,
        name: 'G2',
        pitch: 43,
        start: 11.5,
        velocity: 81
      },
      {
        channel: 0,
        end: 12.5,
        name: 'G2',
        pitch: 43,
        start: 12,
        velocity: 81
      },
      {
        channel: 0,
        end: 12.5,
        name: 'C2',
        pitch: 36,
        start: 12,
        velocity: 81
      },
      {
        channel: 0,
        end: 13,
        name: 'G2',
        pitch: 43,
        start: 12.5,
        velocity: 81
      },
      {
        channel: 0,
        end: 13.5,
        name: 'G2',
        pitch: 43,
        start: 13,
        velocity: 81
      },
      {
        channel: 0,
        end: 13.5,
        name: 'D#2',
        pitch: 39,
        start: 13,
        velocity: 81
      },
      {
        channel: 0,
        end: 14,
        name: 'G2',
        pitch: 43,
        start: 13.5,
        velocity: 81
      },
      {
        channel: 0,
        end: 14.5,
        name: 'G2',
        pitch: 43,
        start: 14,
        velocity: 81
      },
      {
        channel: 0,
        end: 14.5,
        name: 'C2',
        pitch: 36,
        start: 14,
        velocity: 81
      },
      {
        channel: 0,
        end: 15,
        name: 'G2',
        pitch: 43,
        start: 14.5,
        velocity: 81
      },
      {
        channel: 0,
        end: 15,
        name: 'C2',
        pitch: 36,
        start: 14.5,
        velocity: 81
      },
      {
        channel: 0,
        end: 15.5,
        name: 'G2',
        pitch: 43,
        start: 15,
        velocity: 81
      },
      {
        channel: 0,
        end: 15.5,
        name: 'D#2',
        pitch: 39,
        start: 15,
        velocity: 81
      },
      {
        channel: 0,
        end: 16,
        name: 'G2',
        pitch: 43,
        start: 15.5,
        velocity: 81
      }
    ].map(d => Note.from(d)))
  })

  test('Guitar sheet with stave and tab does not lead to duplicate notes', () => {
    const xml = readXmlFile('[Test] Guitar Stave and Tab.musicxml')
    const parsed = preprocessMusicXmlData(xml)
    expect(parsed.parts[0].noteObjs.length).toBe(256)
  })

  test('Guitar sheet with rests works', () => {
    const xml = readXmlFile('[Test] Guitar tab with rests.musicxml')
    const parsed = preprocessMusicXmlData(xml)
    expect(
      parsed.parts[0].noteObjs.map(d => d.start)
    ).toEqual([
      0,
      0.5,
      1,
      1.5,
      4,
      6,
      9,
      10,
      11
    ])
  })

  test('Piano sheet with two staves leads to Notes with different channels', () => {
    const xml = readXmlFile('[Test] Piano Left and Right Hand Staves.musicxml')
    const parsed = preprocessMusicXmlData(xml)
    expect(parsed.parts[0].noteObjs.map(d => d.channel)).toStrictEqual([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ])
  })

  // TODO: not supported yet since this feature broke detecting tempo change times
  test.skip('Tempo change within measure is detected', () => {
    const xml = readXmlFile('[Test] Tempo Change Within Measure.musicxml')
    const parsed = preprocessMusicXmlData(xml)
    expect(parsed.parts[0].tempoChanges).toStrictEqual([

    ])
  })

  test('Dynamics are parsed from <sound> tags', () => {
    const xml = readXmlFile('[Test] Dynamics.musicxml')
    const parsed = preprocessMusicXmlData(xml)
    expect(parsed.parts[0].noteObjs.map(d => d.velocity)).toStrictEqual([
      1,
      5,
      10,
      16,
      33,
      49,
      64,
      80,
      96,
      112,
      126,
      127,
      127,
      127
    ])
  })

  // TODO:
  test.skip('Repetition with alternate ending is handled correctly', () => {
    const xml = readXmlFile('[Test] Repetition with Alternate Endings.musicxml')
    const parsed = preprocessMusicXmlData(xml)
    // expect(parsed.parts[0].noteObjs.length).toBe(43);
    expect(parsed.parts[0].noteObjs.map(d => d.name)).toStrictEqual([
      'C5',
      'A4',
      'E4',
      'G4',

      'A4',
      'E4',
      'G4',
      'C4',

      'C5',
      'A4',
      'E4',
      'G4',

      'D4',
      'A3',
      'E3',
      'G3',

      'D4',
      'A3',
      'E3',
      'G3',

      'A3',
      'E3',
      'G3',
      'C4',

      'D4',
      'E4',
      'G4',
      'C4',

      'D4',
      'E4',
      'C4'
    ])
  })

  test('empty measures', () => {
    const parsed = readXmlAndProcess('[Test] Empty measures.xml')
    expect(parsed.parts[0].measureLinePositions).toStrictEqual([
      2,
      4,
      6,
      8,
      9.5,
      11,
      12.5,
      15.5,
      18.5,
      21.5,
      24.5,
      27.5
    ])
    expect(parsed.parts[0].noteObjs.map(d => d.start)).toStrictEqual([
      2,
      2.5,
      3,
      3.5,
      6,
      6.5,
      7,
      7.5,
      8,
      8.5,
      9,
      9.5,
      10,
      10.5,
      12.5,
      13.5,
      14.5,
      15.5,
      16.5,
      17.5,
      21.5,
      22.5,
      23.5
    ])
  })

  test('rehearsal marks', () => {
    const parsed = readXmlAndProcess('[Test] Rehearsal Marks.musicxml')
    expect(Array.from(parsed.parts[0].measureRehearsalMap)).toStrictEqual([
      [0, 'A'],
      [1, 'B'],
      [2, 'C'],
      [3, 'D E']
    ])
  })

  test('lyrics', () => {
    const parsed = readXmlAndProcess('[Test] Lyrics.musicxml')
    // expect(parsed.parts[0].noteObjs.length).toBe(24);
    expect(
      Array.from(parsed.parts[0].noteLyricsMap)
    ).toStrictEqual([
      [0, '0'],
      [1, '1'],
      [2, '2'],
      [3, '3'],
      [4, '4'],
      [5, '5'],
      [6, '6'],
      [7, '7 7b'],
      [8, '8'],
      [9, '9 9b'],
      [10, '10'],
      [11, '11'],
      [14, '14'],
      [15, '15'],
      [22, '22']
    ])
  })

  describe('XML note indices', () => {
    test('simple', () => {
      const parsed = readXmlAndProcess('[Test] 3-4 meter.musicxml')
      expect(
        Array.from(parsed.parts[0].xmlNoteIndices)
      ).toStrictEqual([
        [0], [1], [2], [3], [4], [5], [6], [7], [8]
      ])
    })
    test('ties', () => {
      const parsed = readXmlAndProcess('[Test] Ties and Slurs.musicxml')
      expect(
        Array.from(parsed.parts[0].xmlNoteIndices)
      ).toStrictEqual([
        [0], [1], [2, 3], [4], [5], [6], [7], [8], [9], [10], [11], [13, 14], [15], [16], [17]
      ])
    })
    test('tied chords', () => {
      const parsed = readXmlAndProcess('[Test] Ties and Slurs Guitar.musicxml')
      expect(
        Array.from(parsed.parts[0].xmlNoteIndices)
      ).toStrictEqual([
        [0], [1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12], [13], [14], [15], [16], [17], [18], [19], [20], [23], [24], [25], [26], [27], [28], [29], [30], [31], [32], [33], [34], [35], [36], [37], [39], [41], [42, 43], [46], [47], [48], [49], [50], [52, 57], [53, 58], [54, 59], [55, 60], [56, 61], [62], [63], [64], [65]
      ])
    })
  })
})
