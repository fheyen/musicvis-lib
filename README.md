# musicvis-lib

This library is still in early and active development.

**Do not use this for anything yet.**

GitHub: https://github.com/fheyen/musicvis-lib

NPM: https://www.npmjs.com/package/musicvis-lib

1. [musicvis-lib](#musicvis-lib)
   1. [Mission](#mission)
   2. [Setup](#setup)
   3. [How to use](#how-to-use)
   4. [Examples](#examples)
   5. [Contribution](#contribution)
   6. [Structure and Dependencies](#structure-and-dependencies)
   7. [TODO](#todo)

## Mission

Provide tools for web-based music visualization.

## Setup

`npm install --save musicvis-lib`

## How to use

```javascript
// TODO: show an example
import Note from 'musicvis-lib';

const note = Note.from({
  pitch: 65,
  start: 2.0,
  end: 3.0,
  velocity: 127,
  channel: 0
});
```

## Examples

- [fheyen.github.io/midi-live-vis](https://fheyen.github.io/midi-live-vis/)
- [fheyen.github.io/midi-pianoroll](https://fheyen.github.io/midi-pianoroll/)
- [fheyen.github.io/webmidi-logger](https://fheyen.github.io/webmidi-logger/)
- [fheyen.github.io/midi-chords](https://fheyen.github.io/midi-chords/)
- [fheyen.github.io/midi-recorder](https://fheyen.github.io/midi-recorder/)

## Contribution

If you like to contribute, feel free to create pull requests or issues.


## Structure and Dependencies

In VSCode you can generate a dependcy graph via this plugin:

https://marketplace.visualstudio.com/items?itemName=juanallo.vscode-dependency-cruiser

## TODO

- Move all library code here
- Create tests
  - Unit tests
  - Visual tests, e.g. show piano roll with algo results
- Implement type/PitchBend.js
