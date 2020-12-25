# musicvis-lib &#9835;

![alpha version](https://img.shields.io/badge/-alpha%20version-orange)
&nbsp;
[![npm](https://img.shields.io/npm/v/musicvis-lib)](https://www.npmjs.com/package/musicvis-lib)
[![Dependent repos (via libraries.io)](https://img.shields.io/librariesio/dependent-repos/npm/musicvis-lib)](https://www.npmjs.com/package/musicvis-lib?activeTab=dependents)
&nbsp;
[![GitHub package.json version](https://img.shields.io/github/package-json/v/fheyen/musicvis-lib?label=GitHub)](https://github.com/fheyen/musicvis-lib)
[![GitHub issues](https://img.shields.io/github/issues-raw/fheyen/musicvis-lib)](https://github.com/fheyen/musicvis-lib/issues)


This library is still in early and active development.

**Do not use this for anything yet.**

1. [musicvis-lib &#9835;](#musicvis-lib-)
   1. [Mission](#mission)
   2. [Setup](#setup)
   3. [How to use](#how-to-use)
   4. [Examples](#examples)
   5. [Documentation (unfinished)](#documentation-unfinished)
   6. [Contribution](#contribution)
   7. [Structure and Dependencies](#structure-and-dependencies)
   8. [TODO](#todo)

## Mission

Provide tools for web-based music visualization.

## Setup

`npm install --save musicvis-lib`

## How to use

With modules
```javascript
import Note from 'musicvis-lib';

const note = Note.from({
  pitch: 65,
  start: 2.0,
  end: 3.0,
  velocity: 127,
  channel: 0
});
```

In HTML
```html
<script src="musicvislib.min.js"></script>
<script>
    console.log(musicvislib);
    console.log(musicvislib.Midi);
    console.log(musicvislib.Midi.getMidiNoteByNr(0));
</script>
```

## Examples

- [fheyen.github.io/midi-live-vis](https://fheyen.github.io/midi-live-vis/) ([code](https://github.com/fheyen/midi-live-vis))
- [fheyen.github.io/midi-pianoroll](https://fheyen.github.io/midi-pianoroll/) ([code](https://github.com/fheyen/midi-pianoroll))
- [fheyen.github.io/webmidi-logger](https://fheyen.github.io/webmidi-logger/) ([code](https://github.com/fheyen/webmidi-logger))
- [fheyen.github.io/midi-chords](https://fheyen.github.io/midi-chords/) ([code](https://github.com/fheyen/midi-chords))
- [fheyen.github.io/midi-recorder](https://fheyen.github.io/midi-recorder/) ([code](https://github.com/fheyen/midi-recorder))

## Documentation (unfinished)

- [musicvis-lib/](https://github.com/fheyen/musicvis-lib)
  - [comparison/](./src/comparison/)
  - [fileFormats/](./src/fileFormats/)
  - [input/](./src/input/)
  - [instruments/](./src/instruments/)
  - [stringBased/](./src/stringBased/)
  - [types/](./src/types/)
  - [utils/](./src/utils/)
  - Midi
  - Chords

## Contribution

If you like to contribute, feel free to create pull requests or issues.


## Structure and Dependencies

In VSCode you can generate a dependcy graph via [a plugin](https://marketplace.visualstudio.com/items?itemName=juanallo.vscode-dependency-cruiser).

## TODO

- Documentation
- Create tests
  - 100% unit test coverage
  - Visual tests, e.g. show piano roll with algo results
- Add
  - type/PitchBend.js
  - FOGSAA algorithm for string matching / distance
    - https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3638164/
    - https://github.com/kjenova/fogsaa
