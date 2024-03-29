# musicvis-lib &#9835;

[![alpha version](https://img.shields.io/badge/-alpha%20version-orange)](https://github.com/fheyen/musicvis-lib)
&nbsp;
[![npm](https://img.shields.io/npm/v/musicvis-lib)](https://www.npmjs.com/package/musicvis-lib)
&nbsp;
[![GitHub package.json version](https://img.shields.io/github/package-json/v/fheyen/musicvis-lib?label=GitHub)](https://github.com/fheyen/musicvis-lib)
[![GitHub issues](https://img.shields.io/github/issues-raw/fheyen/musicvis-lib)](https://github.com/fheyen/musicvis-lib/issues)
[![Contributors](https://img.shields.io/github/contributors/fheyen/musicvis-lib?color=%234dc71f)](https://github.com/fheyen/musicvis-lib/graphs/contributors)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


Goal: Provide data structures and algorithms for music analysis and visualization in JavaScript.

This library is still in early and active development.

**Breaking changes might happen.**

1. [musicvis-lib &#9835;](#musicvis-lib-)
   1. [Setup](#setup)
   2. [Documentation](#documentation)
   3. [How to use](#how-to-use)
   4. [Examples](#examples)
   5. [Contributing](#contributing)
   6. [Credits](#credits)

## Setup

`npm install --save musicvis-lib`

Or download [dist/musicvislib.js](https://raw.githubusercontent.com/fheyen/musicvis-lib/main/dist/musicvislib.js) (development) or [dist/musicvislib.min.js](https://raw.githubusercontent.com/fheyen/musicvis-lib/main/dist/musicvislib.min.js) (minified).

## Documentation

See [Observable](https://observablehq.com/collection/@fheyen/musicvis-lib) for examples.

See [api.md](./api.md) and [here](https://fheyen.github.io/musicvis-lib/) for the full documentation.

## How to use

With modules
```javascript
import {Note} from 'musicvis-lib'

const note = Note.from({
  pitch: 65,
  start: 2.0,
  end: 3.0,
  velocity: 127,
  channel: 0
})
```

With require
```javascript
const musicvislib = require('musicvis-lib')
const {Note} = musicvislib

const note = Note.from({
  pitch: 65,
  start: 2.0,
  end: 3.0,
  velocity: 127,
  channel: 0
})
```

In HTML
```html
<!-- With unpkg... -->
<script src="https://unpkg.com/musicvis-lib"></script>
<!-- ... or with a downloaded file -->
<script src="./musicvislib.min.js"></script>
<script>
  console.log(musicvislib)
  console.log(musicvislib.Midi)
  console.log(musicvislib.Midi.getMidiNoteByNr(0))
</script>
```

## Examples

Here are some examples that show for what `musicvis-lib` can be used:

- [fheyen.github.io/midi-live-vis](https://fheyen.github.io/midi-live-vis/) ([code](https://github.com/fheyen/midi-live-vis))
- [fheyen.github.io/midi-pianoroll](https://fheyen.github.io/midi-pianoroll/) ([code](https://github.com/fheyen/midi-pianoroll))
- [fheyen.github.io/webmidi-logger](https://fheyen.github.io/webmidi-logger/) ([code](https://github.com/fheyen/webmidi-logger))
- [fheyen.github.io/midi-chords](https://fheyen.github.io/midi-chords/) ([code](https://github.com/fheyen/midi-chords))
- [fheyen.github.io/midi-recorder](https://fheyen.github.io/midi-recorder/) ([code](https://github.com/fheyen/midi-recorder))
- [fheyen.github.io/kalimba](https://fheyen.github.io/kalimba/) ([code](https://github.com/fheyen/kalimba))

[More dependents](https://github.com/fheyen/musicvis-lib/network/dependents)

## Contributing

If you like to contribute, feel free to create pull requests or [issues](https://github.com/fheyen/musicvis-lib/issues).

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more.

## Credits

See [CREDITS.md](./CREDITS.md).
