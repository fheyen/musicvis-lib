var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __export = (target, all4) => {
  for (var name in all4)
    __defProp(target, name, { get: all4[name], enumerable: true });
};
var __reExport = (target, module, copyDefault, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// node_modules/.pnpm/midi-parser-js@4.0.4/node_modules/midi-parser-js/src/main.js
var require_main = __commonJS({
  "node_modules/.pnpm/midi-parser-js@4.0.4/node_modules/midi-parser-js/src/main.js"(exports, module) {
    (function() {
      "use strict";
      const _atob = function(string) {
        let b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        let b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
        string = string.replace(/^.*?base64,/, "");
        string = String(string).replace(/[\t\n\f\r ]+/g, "");
        if (!b64re.test(string))
          throw new TypeError("Failed to execute _atob() : The string to be decoded is not correctly encoded.");
        string += "==".slice(2 - (string.length & 3));
        let bitmap, result = "";
        let r1, r2, i = 0;
        for (; i < string.length; ) {
          bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12 | (r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)));
          result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
        }
        return result;
      };
      const MidiParser = {
        debug: false,
        parse: function(input, _callback) {
          if (input instanceof Uint8Array)
            return MidiParser.Uint8(input);
          else if (typeof input === "string")
            return MidiParser.Base64(input);
          else if (input instanceof HTMLElement && input.type === "file")
            return MidiParser.addListener(input, _callback);
          else
            throw new Error("MidiParser.parse() : Invalid input provided");
        },
        addListener: function(_fileElement, _callback) {
          if (!File || !FileReader)
            throw new Error("The File|FileReader APIs are not supported in this browser. Use instead MidiParser.Base64() or MidiParser.Uint8()");
          if (_fileElement === void 0 || !(_fileElement instanceof HTMLElement) || _fileElement.tagName !== "INPUT" || _fileElement.type.toLowerCase() !== "file") {
            console.warn("MidiParser.addListener() : Provided element is not a valid FILE INPUT element");
            return false;
          }
          _callback = _callback || function() {
          };
          _fileElement.addEventListener("change", function(InputEvt) {
            if (!InputEvt.target.files.length)
              return false;
            console.log("MidiParser.addListener() : File detected in INPUT ELEMENT processing data..");
            let reader = new FileReader();
            reader.readAsArrayBuffer(InputEvt.target.files[0]);
            reader.onload = function(e) {
              _callback(MidiParser.Uint8(new Uint8Array(e.target.result)));
            };
          });
        },
        Base64: function(b64String) {
          b64String = String(b64String);
          let raw = _atob(b64String);
          let rawLength = raw.length;
          let t_array = new Uint8Array(new ArrayBuffer(rawLength));
          for (let i = 0; i < rawLength; i++)
            t_array[i] = raw.charCodeAt(i);
          return MidiParser.Uint8(t_array);
        },
        Uint8: function(FileAsUint8Array) {
          let file = {
            data: null,
            pointer: 0,
            movePointer: function(_bytes) {
              this.pointer += _bytes;
              return this.pointer;
            },
            readInt: function(_bytes) {
              _bytes = Math.min(_bytes, this.data.byteLength - this.pointer);
              if (_bytes < 1)
                return -1;
              let value = 0;
              if (_bytes > 1) {
                for (let i = 1; i <= _bytes - 1; i++) {
                  value += this.data.getUint8(this.pointer) * Math.pow(256, _bytes - i);
                  this.pointer++;
                }
              }
              value += this.data.getUint8(this.pointer);
              this.pointer++;
              return value;
            },
            readStr: function(_bytes) {
              let text = "";
              for (let char = 1; char <= _bytes; char++)
                text += String.fromCharCode(this.readInt(1));
              return text;
            },
            readIntVLV: function() {
              let value = 0;
              if (this.pointer >= this.data.byteLength) {
                return -1;
              } else if (this.data.getUint8(this.pointer) < 128) {
                value = this.readInt(1);
              } else {
                let FirstBytes = [];
                while (this.data.getUint8(this.pointer) >= 128) {
                  FirstBytes.push(this.readInt(1) - 128);
                }
                let lastByte = this.readInt(1);
                for (let dt = 1; dt <= FirstBytes.length; dt++) {
                  value += FirstBytes[FirstBytes.length - dt] * Math.pow(128, dt);
                }
                value += lastByte;
              }
              return value;
            }
          };
          file.data = new DataView(FileAsUint8Array.buffer, FileAsUint8Array.byteOffset, FileAsUint8Array.byteLength);
          if (file.readInt(4) !== 1297377380) {
            console.warn("Header validation failed (not MIDI standard or file corrupt.)");
            return false;
          }
          let headerSize = file.readInt(4);
          let MIDI = {};
          MIDI.formatType = file.readInt(2);
          MIDI.tracks = file.readInt(2);
          MIDI.track = [];
          let timeDivisionByte1 = file.readInt(1);
          let timeDivisionByte2 = file.readInt(1);
          if (timeDivisionByte1 >= 128) {
            MIDI.timeDivision = [];
            MIDI.timeDivision[0] = timeDivisionByte1 - 128;
            MIDI.timeDivision[1] = timeDivisionByte2;
          } else
            MIDI.timeDivision = timeDivisionByte1 * 256 + timeDivisionByte2;
          for (let t = 1; t <= MIDI.tracks; t++) {
            MIDI.track[t - 1] = { event: [] };
            let headerValidation = file.readInt(4);
            if (headerValidation === -1)
              break;
            if (headerValidation !== 1297379947)
              return false;
            file.readInt(4);
            let e = 0;
            let endOfTrack = false;
            let statusByte;
            let laststatusByte;
            while (!endOfTrack) {
              e++;
              MIDI.track[t - 1].event[e - 1] = {};
              MIDI.track[t - 1].event[e - 1].deltaTime = file.readIntVLV();
              statusByte = file.readInt(1);
              if (statusByte === -1)
                break;
              else if (statusByte >= 128)
                laststatusByte = statusByte;
              else {
                statusByte = laststatusByte;
                file.movePointer(-1);
              }
              if (statusByte === 255) {
                MIDI.track[t - 1].event[e - 1].type = 255;
                MIDI.track[t - 1].event[e - 1].metaType = file.readInt(1);
                let metaEventLength = file.readIntVLV();
                switch (MIDI.track[t - 1].event[e - 1].metaType) {
                  case 47:
                  case -1:
                    endOfTrack = true;
                    break;
                  case 1:
                  case 2:
                  case 3:
                  case 4:
                  case 5:
                  case 7:
                  case 6:
                    MIDI.track[t - 1].event[e - 1].data = file.readStr(metaEventLength);
                    break;
                  case 33:
                  case 89:
                  case 81:
                    MIDI.track[t - 1].event[e - 1].data = file.readInt(metaEventLength);
                    break;
                  case 84:
                    MIDI.track[t - 1].event[e - 1].data = [];
                    MIDI.track[t - 1].event[e - 1].data[0] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[1] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[2] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[3] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[4] = file.readInt(1);
                    break;
                  case 88:
                    MIDI.track[t - 1].event[e - 1].data = [];
                    MIDI.track[t - 1].event[e - 1].data[0] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[1] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[2] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[3] = file.readInt(1);
                    break;
                  default:
                    if (this.customInterpreter !== null) {
                      MIDI.track[t - 1].event[e - 1].data = this.customInterpreter(MIDI.track[t - 1].event[e - 1].metaType, file, metaEventLength);
                    }
                    if (this.customInterpreter === null || MIDI.track[t - 1].event[e - 1].data === false) {
                      file.readInt(metaEventLength);
                      MIDI.track[t - 1].event[e - 1].data = file.readInt(metaEventLength);
                      if (this.debug)
                        console.info("Unimplemented 0xFF meta event! data block readed as Integer");
                    }
                }
              } else {
                statusByte = statusByte.toString(16).split("");
                if (!statusByte[1])
                  statusByte.unshift("0");
                MIDI.track[t - 1].event[e - 1].type = parseInt(statusByte[0], 16);
                MIDI.track[t - 1].event[e - 1].channel = parseInt(statusByte[1], 16);
                switch (MIDI.track[t - 1].event[e - 1].type) {
                  case 15: {
                    if (this.customInterpreter !== null) {
                      MIDI.track[t - 1].event[e - 1].data = this.customInterpreter(MIDI.track[t - 1].event[e - 1].type, file, false);
                    }
                    if (this.customInterpreter === null || MIDI.track[t - 1].event[e - 1].data === false) {
                      let event_length = file.readIntVLV();
                      MIDI.track[t - 1].event[e - 1].data = file.readInt(event_length);
                      if (this.debug)
                        console.info("Unimplemented 0xF exclusive events! data block readed as Integer");
                    }
                    break;
                  }
                  case 10:
                  case 11:
                  case 14:
                  case 8:
                  case 9:
                    MIDI.track[t - 1].event[e - 1].data = [];
                    MIDI.track[t - 1].event[e - 1].data[0] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[1] = file.readInt(1);
                    break;
                  case 12:
                  case 13:
                    MIDI.track[t - 1].event[e - 1].data = file.readInt(1);
                    break;
                  case -1:
                    endOfTrack = true;
                    break;
                  default:
                    if (this.customInterpreter !== null) {
                      MIDI.track[t - 1].event[e - 1].data = this.customInterpreter(MIDI.track[t - 1].event[e - 1].metaType, file, false);
                    }
                    if (this.customInterpreter === null || MIDI.track[t - 1].event[e - 1].data === false) {
                      console.log("Unknown EVENT detected... reading cancelled!");
                      return false;
                    }
                }
              }
            }
          }
          return MIDI;
        },
        customInterpreter: null
      };
      if (typeof module !== "undefined")
        module.exports = MidiParser;
      else {
        let _global = typeof window === "object" && window.self === window && window || typeof self === "object" && self.self === self && self || typeof global === "object" && global.global === global && global;
        _global.MidiParser = MidiParser;
      }
    })();
  }
});

// package.json
var version = "0.54.1";

// src/fileFormats/Midi.js
var Midi_exports = {};
__export(Midi_exports, {
  MIDI_COMMANDS: () => MIDI_COMMANDS,
  MIDI_NOTES: () => MIDI_NOTES,
  MIDI_NOTE_RANGES: () => MIDI_NOTE_RANGES,
  NOTE_NAMES: () => NOTE_NAMES,
  NOTE_NAMES_FLAT: () => NOTE_NAMES_FLAT,
  SHARPS: () => SHARPS,
  flatToSharp: () => flatToSharp,
  getMidiDrumNoteByNr: () => getMidiDrumNoteByNr,
  getMidiInstrumentByNr: () => getMidiInstrumentByNr,
  getMidiInstrumentByNrL2: () => getMidiInstrumentByNrL2,
  getMidiNoteByLabel: () => getMidiNoteByLabel,
  getMidiNoteByNameAndOctave: () => getMidiNoteByNameAndOctave,
  getMidiNoteByNr: () => getMidiNoteByNr,
  getNoteNameFromNoteNr: () => getNoteNameFromNoteNr,
  isSharp: () => isSharp,
  sharpToFlat: () => sharpToFlat
});
var MidiNoteByPitch = /* @__PURE__ */ new Map();
var MidiNoteByLabel = /* @__PURE__ */ new Map();
var MidiInstrumentByNumber = /* @__PURE__ */ new Map();
var MidiInstrumentByNumberLev2 = /* @__PURE__ */ new Map();
function getMidiNoteByNr(nr) {
  return MidiNoteByPitch.get(nr);
}
function getMidiNoteByLabel(label) {
  return MidiNoteByLabel.get(label);
}
function getMidiNoteByNameAndOctave(name, octave) {
  return MidiNoteByLabel.get(`${name}${octave}`);
}
function getMidiInstrumentByNr(nr) {
  return MidiInstrumentByNumber.get(nr);
}
function getMidiInstrumentByNrL2(nr, subNr) {
  const key = `${nr}-${subNr}`;
  return MidiInstrumentByNumberLev2.get(key);
}
function getMidiDrumNoteByNr(nr) {
  return GENERAL_MIDI_DRUM_NOTE_NUMBERS.get(nr);
}
function isSharp(nr) {
  const chroma = nr % 12;
  return chroma === 1 || chroma === 3 || chroma === 6 || chroma === 8 || chroma === 10;
}
function getNoteNameFromNoteNr(nr) {
  return NOTE_NAMES[nr % 12];
}
var flatToSharp = /* @__PURE__ */ new Map([
  ["Cb", "B"],
  ["Db", "C#"],
  ["Eb", "D#"],
  ["Fb", "E"],
  ["Gb", "F#"],
  ["Ab", "G#"],
  ["Bb", "A#"]
]);
var sharpToFlat = /* @__PURE__ */ new Map([
  ["C#", "Db"],
  ["D#", "Eb"],
  ["E#", "F"],
  ["F#", "Gb"],
  ["G#", "Ab"],
  ["A#", "Bb"],
  ["B#", "C"]
]);
var NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B"
];
var NOTE_NAMES_FLAT = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B"
];
var MIDI_NOTES = [
  { pitch: 0, name: "C", octave: -1, label: "C-1", frequency: 8.176 },
  { pitch: 1, name: "C#", octave: -1, label: "C#-1", frequency: 8.662 },
  { pitch: 2, name: "D", octave: -1, label: "D-1", frequency: 9.177 },
  { pitch: 3, name: "D#", octave: -1, label: "D#-1", frequency: 9.723 },
  { pitch: 4, name: "E", octave: -1, label: "E-1", frequency: 10.301 },
  { pitch: 5, name: "F", octave: -1, label: "F-1", frequency: 10.913 },
  { pitch: 6, name: "F#", octave: -1, label: "F#-1", frequency: 11.562 },
  { pitch: 7, name: "G", octave: -1, label: "G-1", frequency: 12.25 },
  { pitch: 8, name: "G#", octave: -1, label: "G#-1", frequency: 12.978 },
  { pitch: 9, name: "A", octave: -1, label: "A-1", frequency: 13.75 },
  { pitch: 10, name: "A#", octave: -1, label: "A#-1", frequency: 14.568 },
  { pitch: 11, name: "B", octave: -1, label: "B-1", frequency: 15.434 },
  { pitch: 12, name: "C", octave: 0, label: "C0", frequency: 16.352 },
  { pitch: 13, name: "C#", octave: 0, label: "C#0", frequency: 17.324 },
  { pitch: 14, name: "D", octave: 0, label: "D0", frequency: 18.354 },
  { pitch: 15, name: "D#", octave: 0, label: "D#0", frequency: 19.445 },
  { pitch: 16, name: "E", octave: 0, label: "E0", frequency: 20.602 },
  { pitch: 17, name: "F", octave: 0, label: "F0", frequency: 21.827 },
  { pitch: 18, name: "F#", octave: 0, label: "F#0", frequency: 23.125 },
  { pitch: 19, name: "G", octave: 0, label: "G0", frequency: 24.5 },
  { pitch: 20, name: "G#", octave: 0, label: "G#0", frequency: 25.957 },
  { pitch: 21, name: "A", octave: 0, label: "A0", frequency: 27.5 },
  { pitch: 22, name: "A#", octave: 0, label: "A#0", frequency: 29.135 },
  { pitch: 23, name: "B", octave: 0, label: "B0", frequency: 30.868 },
  { pitch: 24, name: "C", octave: 1, label: "C1", frequency: 32.703 },
  { pitch: 25, name: "C#", octave: 1, label: "C#1", frequency: 34.648 },
  { pitch: 26, name: "D", octave: 1, label: "D1", frequency: 36.708 },
  { pitch: 27, name: "D#", octave: 1, label: "D#1", frequency: 38.891 },
  { pitch: 28, name: "E", octave: 1, label: "E1", frequency: 41.203 },
  { pitch: 29, name: "F", octave: 1, label: "F1", frequency: 43.654 },
  { pitch: 30, name: "F#", octave: 1, label: "F#1", frequency: 46.249 },
  { pitch: 31, name: "G", octave: 1, label: "G1", frequency: 48.999 },
  { pitch: 32, name: "G#", octave: 1, label: "G#1", frequency: 51.913 },
  { pitch: 33, name: "A", octave: 1, label: "A1", frequency: 55 },
  { pitch: 34, name: "A#", octave: 1, label: "A#1", frequency: 58.27 },
  { pitch: 35, name: "B", octave: 1, label: "B1", frequency: 61.735 },
  { pitch: 36, name: "C", octave: 2, label: "C2", frequency: 65.406 },
  { pitch: 37, name: "C#", octave: 2, label: "C#2", frequency: 69.296 },
  { pitch: 38, name: "D", octave: 2, label: "D2", frequency: 73.416 },
  { pitch: 39, name: "D#", octave: 2, label: "D#2", frequency: 77.782 },
  { pitch: 40, name: "E", octave: 2, label: "E2", frequency: 82.407 },
  { pitch: 41, name: "F", octave: 2, label: "F2", frequency: 87.307 },
  { pitch: 42, name: "F#", octave: 2, label: "F#2", frequency: 92.499 },
  { pitch: 43, name: "G", octave: 2, label: "G2", frequency: 97.999 },
  { pitch: 44, name: "G#", octave: 2, label: "G#2", frequency: 103.826 },
  { pitch: 45, name: "A", octave: 2, label: "A2", frequency: 110 },
  { pitch: 46, name: "A#", octave: 2, label: "A#2", frequency: 116.541 },
  { pitch: 47, name: "B", octave: 2, label: "B2", frequency: 123.471 },
  { pitch: 48, name: "C", octave: 3, label: "C3", frequency: 130.813 },
  { pitch: 49, name: "C#", octave: 3, label: "C#3", frequency: 138.591 },
  { pitch: 50, name: "D", octave: 3, label: "D3", frequency: 146.832 },
  { pitch: 51, name: "D#", octave: 3, label: "D#3", frequency: 155.563 },
  { pitch: 52, name: "E", octave: 3, label: "E3", frequency: 164.814 },
  { pitch: 53, name: "F", octave: 3, label: "F3", frequency: 174.614 },
  { pitch: 54, name: "F#", octave: 3, label: "F#3", frequency: 184.997 },
  { pitch: 55, name: "G", octave: 3, label: "G3", frequency: 195.998 },
  { pitch: 56, name: "G#", octave: 3, label: "G#3", frequency: 207.652 },
  { pitch: 57, name: "A", octave: 3, label: "A3", frequency: 220 },
  { pitch: 58, name: "A#", octave: 3, label: "A#3", frequency: 233.082 },
  { pitch: 59, name: "B", octave: 3, label: "B3", frequency: 246.942 },
  { pitch: 60, name: "C", octave: 4, label: "C4", frequency: 261.626 },
  { pitch: 61, name: "C#", octave: 4, label: "C#4", frequency: 277.183 },
  { pitch: 62, name: "D", octave: 4, label: "D4", frequency: 293.665 },
  { pitch: 63, name: "D#", octave: 4, label: "D#4", frequency: 311.127 },
  { pitch: 64, name: "E", octave: 4, label: "E4", frequency: 329.628 },
  { pitch: 65, name: "F", octave: 4, label: "F4", frequency: 349.228 },
  { pitch: 66, name: "F#", octave: 4, label: "F#4", frequency: 369.994 },
  { pitch: 67, name: "G", octave: 4, label: "G4", frequency: 391.995 },
  { pitch: 68, name: "G#", octave: 4, label: "G#4", frequency: 415.305 },
  { pitch: 69, name: "A", octave: 4, label: "A4", frequency: 440 },
  { pitch: 70, name: "A#", octave: 4, label: "A#4", frequency: 466.164 },
  { pitch: 71, name: "B", octave: 4, label: "B4", frequency: 493.883 },
  { pitch: 72, name: "C", octave: 5, label: "C5", frequency: 523.251 },
  { pitch: 73, name: "C#", octave: 5, label: "C#5", frequency: 554.365 },
  { pitch: 74, name: "D", octave: 5, label: "D5", frequency: 587.33 },
  { pitch: 75, name: "D#", octave: 5, label: "D#5", frequency: 622.254 },
  { pitch: 76, name: "E", octave: 5, label: "E5", frequency: 659.255 },
  { pitch: 77, name: "F", octave: 5, label: "F5", frequency: 698.456 },
  { pitch: 78, name: "F#", octave: 5, label: "F#5", frequency: 739.989 },
  { pitch: 79, name: "G", octave: 5, label: "G5", frequency: 783.991 },
  { pitch: 80, name: "G#", octave: 5, label: "G#5", frequency: 830.609 },
  { pitch: 81, name: "A", octave: 5, label: "A5", frequency: 880 },
  { pitch: 82, name: "A#", octave: 5, label: "A#5", frequency: 932.328 },
  { pitch: 83, name: "B", octave: 5, label: "B5", frequency: 987.767 },
  { pitch: 84, name: "C", octave: 6, label: "C6", frequency: 1046.502 },
  { pitch: 85, name: "C#", octave: 6, label: "C#6", frequency: 1108.731 },
  { pitch: 86, name: "D", octave: 6, label: "D6", frequency: 1174.659 },
  { pitch: 87, name: "D#", octave: 6, label: "D#6", frequency: 1244.508 },
  { pitch: 88, name: "E", octave: 6, label: "E6", frequency: 1318.51 },
  { pitch: 89, name: "F", octave: 6, label: "F6", frequency: 1396.913 },
  { pitch: 90, name: "F#", octave: 6, label: "F#6", frequency: 1479.978 },
  { pitch: 91, name: "G", octave: 6, label: "G6", frequency: 1567.982 },
  { pitch: 92, name: "G#", octave: 6, label: "G#6", frequency: 1661.219 },
  { pitch: 93, name: "A", octave: 6, label: "A6", frequency: 1760 },
  { pitch: 94, name: "A#", octave: 6, label: "A#6", frequency: 1864.655 },
  { pitch: 95, name: "B", octave: 6, label: "B6", frequency: 1975.533 },
  { pitch: 96, name: "C", octave: 7, label: "C7", frequency: 2093.005 },
  { pitch: 97, name: "C#", octave: 7, label: "C#7", frequency: 2217.461 },
  { pitch: 98, name: "D", octave: 7, label: "D7", frequency: 2349.318 },
  { pitch: 99, name: "D#", octave: 7, label: "D#7", frequency: 2489.016 },
  { pitch: 100, name: "E", octave: 7, label: "E7", frequency: 2637.02 },
  { pitch: 101, name: "F", octave: 7, label: "F7", frequency: 2793.826 },
  { pitch: 102, name: "F#", octave: 7, label: "F#7", frequency: 2959.955 },
  { pitch: 103, name: "G", octave: 7, label: "G7", frequency: 3135.963 },
  { pitch: 104, name: "G#", octave: 7, label: "G#7", frequency: 3322.438 },
  { pitch: 105, name: "A", octave: 7, label: "A7", frequency: 3520 },
  { pitch: 106, name: "A#", octave: 7, label: "A#7", frequency: 3729.31 },
  { pitch: 107, name: "B", octave: 7, label: "B7", frequency: 3951.066 },
  { pitch: 108, name: "C", octave: 8, label: "C8", frequency: 4186.009 },
  { pitch: 109, name: "C#", octave: 8, label: "C#8", frequency: 4434.922 },
  { pitch: 110, name: "D", octave: 8, label: "D8", frequency: 4698.636 },
  { pitch: 111, name: "D#", octave: 8, label: "D#8", frequency: 4978.032 },
  { pitch: 112, name: "E", octave: 8, label: "E8", frequency: 5274.041 },
  { pitch: 113, name: "F", octave: 8, label: "F8", frequency: 5587.652 },
  { pitch: 114, name: "F#", octave: 8, label: "F#8", frequency: 5919.911 },
  { pitch: 115, name: "G", octave: 8, label: "G8", frequency: 6271.927 },
  { pitch: 116, name: "G#", octave: 8, label: "G#8", frequency: 6644.875 },
  { pitch: 117, name: "A", octave: 8, label: "A8", frequency: 7040 },
  { pitch: 118, name: "A#", octave: 8, label: "A#8", frequency: 7458.62 },
  { pitch: 119, name: "B", octave: 8, label: "B8", frequency: 7902.133 },
  { pitch: 120, name: "C", octave: 9, label: "C9", frequency: 8372.018 },
  { pitch: 121, name: "C#", octave: 9, label: "C#9", frequency: 8869.844 },
  { pitch: 122, name: "D", octave: 9, label: "D9", frequency: 9397.273 },
  { pitch: 123, name: "D#", octave: 9, label: "D#9", frequency: 9956.063 },
  { pitch: 124, name: "E", octave: 9, label: "E9", frequency: 10548.08 },
  { pitch: 125, name: "F", octave: 9, label: "F9", frequency: 11175.3 },
  { pitch: 126, name: "F#", octave: 9, label: "F#9", frequency: 11839.82 },
  { pitch: 127, name: "G", octave: 9, label: "G9", frequency: 12543.85 }
];
var SHARPS = /* @__PURE__ */ new Set([
  1,
  3,
  6,
  8,
  10,
  13,
  15,
  18,
  20,
  22,
  25,
  27,
  30,
  32,
  34,
  37,
  39,
  42,
  44,
  46,
  49,
  51,
  54,
  56,
  58,
  61,
  63,
  66,
  68,
  70,
  73,
  75,
  78,
  80,
  82,
  85,
  87,
  90,
  92,
  94,
  97,
  99,
  102,
  104,
  106,
  109,
  111,
  114,
  116,
  118,
  121,
  123,
  126
]);
var MIDI_COMMANDS = /* @__PURE__ */ new Map([
  [128, { name: "noteOff", description: "Note-off", params: ["key", "velocity"] }],
  [144, { name: "noteOn", description: "Note-on", params: ["key", "velocity"] }],
  [160, { name: "aftertouch", description: "Aftertouch", params: ["key", "touch"] }],
  [176, { name: "continuousController", description: "Continuous controller", params: ["controller #", "controller value"] }],
  [192, { name: "patchChange", description: "Patch change", params: ["instrument number", "instrument number"] }],
  [208, { name: "channelPressure", description: "Channel Pressure", params: ["pressure"] }],
  [224, { name: "pitchBend", description: "Pitch bend", params: ["lsb (7 bits)", "msb (7 bits)"] }],
  [240, { name: "sysExStart", description: "start of system exclusive message" }],
  [241, { name: "timeCodeQuarter", description: "MIDI Time Code Quarter Frame (Sys Common)" }],
  [242, { name: "posPointer", description: "Song Position Pointer (Sys Common)" }],
  [243, { name: "songSelect", description: "Song Select (Sys Common)" }],
  [244, { name: "unknown1", description: "???" }],
  [245, { name: "unknown2", description: "???" }],
  [246, { name: "tuneRequest", description: "Tune Request (Sys Common)" }],
  [247, { name: "syExEnd", description: "end of system exclusive message 0" }],
  [248, { name: "timingClock", description: "Timing Clock (Sys Realtime)" }],
  [250, { name: "start", description: "Start (Sys Realtime)" }],
  [251, { name: "continue", description: "Continue (Sys Realtime)" }],
  [252, { name: "stop", description: "Stop (Sys Realtime)" }],
  [253, { name: "unknwon3", description: "???" }],
  [254, { name: "activeSensing", description: "Active Sensing (Sys Realtime)" }],
  [255, { name: "systemReset", description: "System Reset (Sys Realtime)" }]
]);
var MIDI_INSTRUMENTS = [
  { number: 0, group: "Piano", label: "Acoustic Grand Piano" },
  { number: 1, group: "Piano", label: "Bright Acoustic Piano" },
  { number: 2, group: "Piano", label: "Electric Grand Piano" },
  { number: 3, group: "Piano", label: "Honky-tonk Piano" },
  { number: 4, group: "Piano", label: "Electric Piano 1" },
  { number: 5, group: "Piano", label: "Electric Piano 2" },
  { number: 6, group: "Piano", label: "Harpsichord" },
  { number: 7, group: "Piano", label: "Clavinet" },
  { number: 8, group: "Chromatic Percussion", label: "Celesta" },
  { number: 9, group: "Chromatic Percussion", label: "Glockenspiel" },
  { number: 10, group: "Chromatic Percussion", label: "Music Box" },
  { number: 11, group: "Chromatic Percussion", label: "Vibraphone" },
  { number: 12, group: "Chromatic Percussion", label: "Marimba" },
  { number: 13, group: "Chromatic Percussion", label: "Xylophone" },
  { number: 14, group: "Chromatic Percussion", label: "Tubular Bells" },
  { number: 15, group: "Chromatic Percussion", label: "Dulcimer" },
  { number: 16, group: "Organ", label: "Drawbar Organ" },
  { number: 17, group: "Organ", label: "Percussive Organ" },
  { number: 18, group: "Organ", label: "Rock Organ" },
  { number: 19, group: "Organ", label: "Church Organ" },
  { number: 20, group: "Organ", label: "Reed Organ" },
  { number: 21, group: "Organ", label: "Accordion" },
  { number: 22, group: "Organ", label: "Harmonica" },
  { number: 23, group: "Organ", label: "Tango Accordion" },
  { number: 24, group: "Guitar", label: "Acoustic Guitar(nylon)" },
  { number: 25, group: "Guitar", label: "Acoustic Guitar(steel)" },
  { number: 26, group: "Guitar", label: "Electric Guitar(jazz)" },
  { number: 27, group: "Guitar", label: "Electric Guitar(clean)" },
  { number: 28, group: "Guitar", label: "Electric Guitar(muted)" },
  { number: 29, group: "Guitar", label: "Overdriven Guitar" },
  { number: 30, group: "Guitar", label: "Distortion Guitar" },
  { number: 31, group: "Guitar", label: "Guitar harmonics" },
  { number: 32, group: "Bass", label: "Acoustic Bass" },
  { number: 33, group: "Bass", label: "Electric Bass(finger)" },
  { number: 34, group: "Bass", label: "Electric Bass(pick)" },
  { number: 35, group: "Bass", label: "Fretless Bass" },
  { number: 36, group: "Bass", label: "Slap Bass 1" },
  { number: 37, group: "Bass", label: "Slap Bass 2" },
  { number: 38, group: "Bass", label: "Synth Bass 1" },
  { number: 39, group: "Bass", label: "Synth Bass 2" },
  { number: 40, group: "Strings", label: "Violin" },
  { number: 41, group: "Strings", label: "Viola" },
  { number: 42, group: "Strings", label: "Cello" },
  { number: 43, group: "Strings", label: "Contrabass" },
  { number: 44, group: "Strings", label: "Tremolo Strings" },
  { number: 45, group: "Strings", label: "Pizzicato Strings" },
  { number: 46, group: "Strings", label: "Orchestral Harp" },
  { number: 47, group: "Strings", label: "Timpani" },
  { number: 48, group: "Strings (continued)", label: "String Ensemble 1" },
  { number: 49, group: "Strings (continued)", label: "String Ensemble 2" },
  { number: 50, group: "Strings (continued)", label: "Synth Strings 1" },
  { number: 51, group: "Strings (continued)", label: "Synth Strings 2" },
  { number: 52, group: "Strings (continued)", label: "Choir Aahs" },
  { number: 53, group: "Strings (continued)", label: "Voice Oohs" },
  { number: 54, group: "Strings (continued)", label: "Synth Voice" },
  { number: 55, group: "Strings (continued)", label: "Orchestra Hit" },
  { number: 56, group: "Brass", label: "Trumpet" },
  { number: 57, group: "Brass", label: "Trombone" },
  { number: 58, group: "Brass", label: "Tuba" },
  { number: 59, group: "Brass", label: "Muted Trumpet" },
  { number: 60, group: "Brass", label: "French Horn" },
  { number: 61, group: "Brass", label: "Brass Section" },
  { number: 62, group: "Brass", label: "Synth Brass 1" },
  { number: 63, group: "Brass", label: "Synth Brass 2" },
  { number: 64, group: "Reed", label: "Soprano Sax" },
  { number: 65, group: "Reed", label: "Alto Sax" },
  { number: 66, group: "Reed", label: "Tenor Sax" },
  { number: 67, group: "Reed", label: "Baritone Sax" },
  { number: 68, group: "Reed", label: "Oboe" },
  { number: 69, group: "Reed", label: "English Horn" },
  { number: 70, group: "Reed", label: "Bassoon" },
  { number: 71, group: "Reed", label: "Clarinet" },
  { number: 72, group: "Pipe", label: "Piccolo" },
  { number: 73, group: "Pipe", label: "Flute" },
  { number: 74, group: "Pipe", label: "Recorder" },
  { number: 75, group: "Pipe", label: "Pan Flute" },
  { number: 76, group: "Pipe", label: "Blown Bottle" },
  { number: 77, group: "Pipe", label: "Shakuhachi" },
  { number: 78, group: "Pipe", label: "Whistle" },
  { number: 79, group: "Pipe", label: "Ocarina" },
  { number: 80, group: "Synth Lead", label: "Lead 1(square)" },
  { number: 81, group: "Synth Lead", label: "Lead 2(sawtooth)" },
  { number: 82, group: "Synth Lead", label: "Lead 3(calliope)" },
  { number: 83, group: "Synth Lead", label: "Lead 4(chiff)" },
  { number: 84, group: "Synth Lead", label: "Lead 5(charang)" },
  { number: 85, group: "Synth Lead", label: "Lead 6(voice)" },
  { number: 86, group: "Synth Lead", label: "Lead 7(fifths)" },
  { number: 87, group: "Synth Lead", label: "Lead 8(bass + lead)" },
  { number: 88, group: "Synth Pad", label: "Pad 1(new age)" },
  { number: 89, group: "Synth Pad", label: "Pad 2(warm)" },
  { number: 90, group: "Synth Pad", label: "Pad 3(polysynth)" },
  { number: 91, group: "Synth Pad", label: "Pad 4(choir)" },
  { number: 92, group: "Synth Pad", label: "Pad 5(bowed)" },
  { number: 93, group: "Synth Pad", label: "Pad 6(metallic)" },
  { number: 94, group: "Synth Pad", label: "Pad 7(halo)" },
  { number: 95, group: "Synth Pad", label: "Pad 8(sweep)" },
  { number: 96, group: "Synth Effects", label: "FX 1(rain)" },
  { number: 97, group: "Synth Effects", label: "FX 2(soundtrack)" },
  { number: 98, group: "Synth Effects", label: "FX 3(crystal)" },
  { number: 99, group: "Synth Effects", label: "FX 4(atmosphere)" },
  { number: 100, group: "Synth Effects", label: "FX 5(brightness)" },
  { number: 101, group: "Synth Effects", label: "FX 6(goblins)" },
  { number: 102, group: "Synth Effects", label: "FX 7(echoes)" },
  { number: 103, group: "Synth Effects", label: "FX 8(sci-fi)" },
  { number: 104, group: "Ethnic", label: "Sitar" },
  { number: 105, group: "Ethnic", label: "Banjo" },
  { number: 106, group: "Ethnic", label: "Shamisen" },
  { number: 107, group: "Ethnic", label: "Koto" },
  { number: 108, group: "Ethnic", label: "Kalimba" },
  { number: 109, group: "Ethnic", label: "Bag pipe" },
  { number: 110, group: "Ethnic", label: "Fiddle" },
  { number: 111, group: "Ethnic", label: "Shanai" },
  { number: 112, group: "Percussive", label: "Tinkle Bell" },
  { number: 113, group: "Percussive", label: "Agogo" },
  { number: 114, group: "Percussive", label: "Steel Drums" },
  { number: 115, group: "Percussive", label: "Woodblock" },
  { number: 116, group: "Percussive", label: "Taiko Drum" },
  { number: 117, group: "Percussive", label: "Melodic Tom" },
  { number: 118, group: "Percussive", label: "Synth Drum" },
  { number: 119, group: "Sound Effects", label: "Reverse Cymbal" },
  { number: 120, group: "Sound Effects", label: "Guitar Fret Noise" },
  { number: 121, group: "Sound Effects", label: "Breath Noise" },
  { number: 122, group: "Sound Effects", label: "Seashore" },
  { number: 123, group: "Sound Effects", label: "Bird Tweet" },
  { number: 124, group: "Sound Effects", label: "Telephone Ring" },
  { number: 125, group: "Sound Effects", label: "Helicopter" },
  { number: 126, group: "Sound Effects", label: "Applause" },
  { number: 127, group: "Sound Effects", label: "Gunshot" }
];
var MIDI_INSTRUMENTS_LEV2 = [
  { number: 1, subnumber: 0, group: "Piano", label: "Acoustic Grand Piano" },
  { number: 1, subnumber: 1, group: "Piano", label: "Wide Acoustic Grand" },
  { number: 1, subnumber: 2, group: "Piano", label: "Dark Acoustic Grand" },
  { number: 2, subnumber: 0, group: "Piano", label: "Bright Acoustic Piano" },
  { number: 2, subnumber: 1, group: "Piano", label: "Wide Bright Acoustic" },
  { number: 3, subnumber: 0, group: "Piano", label: "Electric Grand Piano" },
  { number: 3, subnumber: 1, group: "Piano", label: "Wide Electric Grand" },
  { number: 4, subnumber: 0, group: "Piano", label: "Honky-tonk Piano" },
  { number: 4, subnumber: 1, group: "Piano", label: "Wide Honky-tonk" },
  { number: 5, subnumber: 0, group: "Piano", label: "Rhodes Piano" },
  { number: 5, subnumber: 1, group: "Piano", label: "Detuned Electric Piano 1" },
  { number: 5, subnumber: 2, group: "Piano", label: "Electric Piano 1 Variation" },
  { number: 5, subnumber: 3, group: "Piano", label: "60's Electric Piano" },
  { number: 6, subnumber: 0, group: "Piano", label: "Chorused Electric Piano" },
  { number: 6, subnumber: 1, group: "Piano", label: "Detuned Electric Piano 2" },
  { number: 6, subnumber: 2, group: "Piano", label: "Electric Piano 2 Variation" },
  { number: 6, subnumber: 3, group: "Piano", label: "Electric Piano Legend" },
  { number: 6, subnumber: 4, group: "Piano", label: "Electric Piano Phase" },
  { number: 7, subnumber: 0, group: "Piano", label: "Harpsichord" },
  { number: 7, subnumber: 1, group: "Piano", label: "Coupled Harpsichord" },
  { number: 7, subnumber: 2, group: "Piano", label: "Wide Harpsichord" },
  { number: 7, subnumber: 3, group: "Piano", label: "Open Harpsichord" },
  { number: 8, subnumber: 0, group: "Piano", label: "Clavinet" },
  { number: 8, subnumber: 1, group: "Piano", label: "Pulse Clavinet" },
  { number: 9, subnumber: 0, group: "Chromatic Percussion", label: "Celesta" },
  { number: 10, subnumber: 0, group: "Chromatic Percussion", label: "Glockenspiel" },
  { number: 11, subnumber: 0, group: "Chromatic Percussion", label: "Music Box" },
  { number: 12, subnumber: 0, group: "Chromatic Percussion", label: "Vibraphone" },
  { number: 12, subnumber: 1, group: "Chromatic Percussion", label: "Wet Vibraphone" },
  { number: 13, subnumber: 0, group: "Chromatic Percussion", label: "Marimba" },
  { number: 13, subnumber: 1, group: "Chromatic Percussion", label: "Wide Marimba" },
  { number: 14, subnumber: 0, group: "Chromatic Percussion", label: "Xylophone" },
  { number: 15, subnumber: 0, group: "Chromatic Percussion", label: "Tubular Bells" },
  { number: 15, subnumber: 1, group: "Chromatic Percussion", label: "Church Bells" },
  { number: 15, subnumber: 2, group: "Chromatic Percussion", label: "Carillon" },
  { number: 16, subnumber: 0, group: "Chromatic Percussion", label: "Dulcimer / Santur" },
  { number: 17, subnumber: 0, group: "Organ", label: "Hammond Organ" },
  { number: 17, subnumber: 1, group: "Organ", label: "Detuned Organ 1" },
  { number: 17, subnumber: 2, group: "Organ", label: "60's Organ 1" },
  { number: 17, subnumber: 3, group: "Organ", label: "Organ 4" },
  { number: 18, subnumber: 0, group: "Organ", label: "Percussive Organ" },
  { number: 18, subnumber: 1, group: "Organ", label: "Detuned Organ 2" },
  { number: 18, subnumber: 2, group: "Organ", label: "Organ 5" },
  { number: 19, subnumber: 0, group: "Organ", label: "Rock Organ" },
  { number: 20, subnumber: 0, group: "Organ", label: "Church Organ 1" },
  { number: 20, subnumber: 1, group: "Organ", label: "Church Organ 2" },
  { number: 20, subnumber: 2, group: "Organ", label: "Church Organ 3" },
  { number: 21, subnumber: 0, group: "Organ", label: "Reed Organ" },
  { number: 21, subnumber: 1, group: "Organ", label: "Puff Organ" },
  { number: 22, subnumber: 0, group: "Organ", label: "French Accordion" },
  { number: 22, subnumber: 1, group: "Organ", label: "Italian Accordion" },
  { number: 23, subnumber: 0, group: "Organ", label: "Harmonica" },
  { number: 24, subnumber: 0, group: "Organ", label: "Bandoneon" },
  { number: 25, subnumber: 0, group: "Guitar", label: "Nylon-String Guitar" },
  { number: 25, subnumber: 1, group: "Guitar", label: "Ukelele" },
  { number: 25, subnumber: 2, group: "Guitar", label: "Open Nylon Guitar" },
  { number: 25, subnumber: 3, group: "Guitar", label: "Nylon Guitar 2" },
  { number: 26, subnumber: 0, group: "Guitar", label: "Steel-String Guitar" },
  { number: 26, subnumber: 1, group: "Guitar", label: "12-String Guitar" },
  { number: 26, subnumber: 2, group: "Guitar", label: "Mandolin" },
  { number: 26, subnumber: 3, group: "Guitar", label: "Steel + Body" },
  { number: 27, subnumber: 0, group: "Guitar", label: "Jazz Guitar" },
  { number: 27, subnumber: 1, group: "Guitar", label: "Hawaiian Guitar" },
  { number: 28, subnumber: 0, group: "Guitar", label: "Clean Electric Guitar" },
  { number: 28, subnumber: 1, group: "Guitar", label: "Chorus Guitar" },
  { number: 28, subnumber: 2, group: "Guitar", label: "Mid Tone Guitar" },
  { number: 29, subnumber: 0, group: "Guitar", label: "Muted Electric Guitar" },
  { number: 29, subnumber: 1, group: "Guitar", label: "Funk Guitar" },
  { number: 29, subnumber: 2, group: "Guitar", label: "Funk Guitar 2" },
  { number: 29, subnumber: 3, group: "Guitar", label: "Jazz Man" },
  { number: 30, subnumber: 0, group: "Guitar", label: "Overdriven Guitar" },
  { number: 30, subnumber: 1, group: "Guitar", label: "Guitar Pinch" },
  { number: 31, subnumber: 0, group: "Guitar", label: "Distortion Guitar" },
  { number: 31, subnumber: 1, group: "Guitar", label: "Feedback Guitar" },
  { number: 31, subnumber: 2, group: "Guitar", label: "Distortion Rtm Guitar" },
  { number: 32, subnumber: 0, group: "Guitar", label: "Guitar Harmonics" },
  { number: 32, subnumber: 1, group: "Guitar", label: "Guitar Feedback" },
  { number: 33, subnumber: 0, group: "Bass", label: "Acoustic Bass" },
  { number: 34, subnumber: 0, group: "Bass", label: "Fingered Bass" },
  { number: 34, subnumber: 1, group: "Bass", label: "Finger Slap" },
  { number: 35, subnumber: 0, group: "Bass", label: "Picked Bass" },
  { number: 36, subnumber: 0, group: "Bass", label: "Fretless Bass" },
  { number: 37, subnumber: 0, group: "Bass", label: "Slap Bass 1" },
  { number: 38, subnumber: 0, group: "Bass", label: "Slap Bass 2" },
  { number: 39, subnumber: 0, group: "Bass", label: "Synth Bass 1" },
  { number: 39, subnumber: 1, group: "Bass", label: "Synth Bass 101" },
  { number: 39, subnumber: 2, group: "Bass", label: "Synth Bass 3" },
  { number: 39, subnumber: 3, group: "Bass", label: "Clavi Bass" },
  { number: 39, subnumber: 4, group: "Bass", label: "Hammer" },
  { number: 40, subnumber: 0, group: "Bass", label: "Synth Bass 2" },
  { number: 40, subnumber: 1, group: "Bass", label: "Synth Bass 4" },
  { number: 40, subnumber: 2, group: "Bass", label: "Rubber Bass" },
  { number: 40, subnumber: 3, group: "Bass", label: "Attack Pulse" },
  { number: 41, subnumber: 0, group: "Strings", label: "Violin" },
  { number: 41, subnumber: 1, group: "Strings", label: "Slow Violin" },
  { number: 42, subnumber: 0, group: "Strings", label: "Viola" },
  { number: 43, subnumber: 0, group: "Strings", label: "Cello" },
  { number: 44, subnumber: 0, group: "Strings", label: "Contrabass" },
  { number: 45, subnumber: 0, group: "Strings", label: "Tremolo Strings" },
  { number: 46, subnumber: 0, group: "Strings", label: "Pizzicato Strings" },
  { number: 47, subnumber: 0, group: "Strings", label: "Harp" },
  { number: 47, subnumber: 1, group: "Strings", label: "Yang Qin" },
  { number: 48, subnumber: 0, group: "Strings", label: "Timpani" },
  { number: 49, subnumber: 0, group: "Orchestral Ensemble", label: "String Ensemble" },
  { number: 49, subnumber: 1, group: "Orchestral Ensemble", label: "Orchestra Strings" },
  { number: 49, subnumber: 2, group: "Orchestral Ensemble", label: "60's Strings" },
  { number: 50, subnumber: 0, group: "Orchestral Ensemble", label: "Slow String Ensemble" },
  { number: 51, subnumber: 0, group: "Orchestral Ensemble", label: "Synth Strings 1" },
  { number: 51, subnumber: 1, group: "Orchestral Ensemble", label: "Synth Strings 3" },
  { number: 52, subnumber: 0, group: "Orchestral Ensemble", label: "Synth Strings 2" },
  { number: 53, subnumber: 0, group: "Orchestral Ensemble", label: "Choir Aahs" },
  { number: 53, subnumber: 1, group: "Orchestral Ensemble", label: "Choir Aahs 2" },
  { number: 54, subnumber: 0, group: "Orchestral Ensemble", label: "Voice Oohs" },
  { number: 54, subnumber: 1, group: "Orchestral Ensemble", label: "Humming" },
  { number: 55, subnumber: 0, group: "Orchestral Ensemble", label: "Synth Voice" },
  { number: 55, subnumber: 1, group: "Orchestral Ensemble", label: "Analog Voice" },
  { number: 56, subnumber: 0, group: "Orchestral Ensemble", label: "Orchestra Hit" },
  { number: 56, subnumber: 1, group: "Orchestral Ensemble", label: "Bass Hit" },
  { number: 56, subnumber: 2, group: "Orchestral Ensemble", label: "6th Hit" },
  { number: 56, subnumber: 3, group: "Orchestral Ensemble", label: "Euro Hit" },
  { number: 57, subnumber: 0, group: "Brass", label: "Trumpet" },
  { number: 57, subnumber: 1, group: "Brass", label: "Dark Trumpet" },
  { number: 58, subnumber: 0, group: "Brass", label: "Trombone" },
  { number: 58, subnumber: 1, group: "Brass", label: "Trombone 2" },
  { number: 58, subnumber: 2, group: "Brass", label: "Bright Trombone" },
  { number: 59, subnumber: 0, group: "Brass", label: "Tuba" },
  { number: 60, subnumber: 0, group: "Brass", label: "Muted Trumpet" },
  { number: 60, subnumber: 1, group: "Brass", label: "Muted Trumpet 2" },
  { number: 61, subnumber: 0, group: "Brass", label: "French Horn" },
  { number: 61, subnumber: 1, group: "Brass", label: "French Horn 2" },
  { number: 62, subnumber: 0, group: "Brass", label: "Brass Section" },
  { number: 62, subnumber: 1, group: "Brass", label: "Brass Section" },
  { number: 63, subnumber: 0, group: "Brass", label: "Synth Brass 1" },
  { number: 63, subnumber: 1, group: "Brass", label: "Synth Brass 3" },
  { number: 63, subnumber: 2, group: "Brass", label: "Analog Brass 1" },
  { number: 63, subnumber: 3, group: "Brass", label: "Jump Brass" },
  { number: 64, subnumber: 0, group: "Brass", label: "Synth Brass 2" },
  { number: 64, subnumber: 1, group: "Brass", label: "Synth Brass 4" },
  { number: 64, subnumber: 2, group: "Brass", label: "Analog Brass 2" },
  { number: 65, subnumber: 0, group: "Reed", label: "Soprano Sax" },
  { number: 66, subnumber: 0, group: "Reed", label: "Alto Sax" },
  { number: 67, subnumber: 0, group: "Reed", label: "Tenor Sax" },
  { number: 68, subnumber: 0, group: "Reed", label: "Baritone Sax" },
  { number: 69, subnumber: 0, group: "Reed", label: "Oboe" },
  { number: 70, subnumber: 0, group: "Reed", label: "English Horn" },
  { number: 71, subnumber: 0, group: "Reed", label: "Bassoon" },
  { number: 72, subnumber: 0, group: "Reed", label: "Clarinet" },
  { number: 73, subnumber: 0, group: "Wind", label: "Piccolo" },
  { number: 74, subnumber: 0, group: "Wind", label: "Flute" },
  { number: 75, subnumber: 0, group: "Wind", label: "Recorder" },
  { number: 76, subnumber: 0, group: "Wind", label: "Pan Flute" },
  { number: 77, subnumber: 0, group: "Wind", label: "Blown Bottle" },
  { number: 78, subnumber: 0, group: "Wind", label: "Shakuhachi" },
  { number: 79, subnumber: 0, group: "Wind", label: "Whistle" },
  { number: 80, subnumber: 0, group: "Wind", label: "Ocarina" },
  { number: 81, subnumber: 0, group: "Lead", label: "Square Lead" },
  { number: 81, subnumber: 1, group: "Lead", label: "Square Wave" },
  { number: 81, subnumber: 2, group: "Lead", label: "Sine Wave" },
  { number: 82, subnumber: 0, group: "Lead", label: "Saw Lead" },
  { number: 82, subnumber: 1, group: "Lead", label: "Saw Wave" },
  { number: 82, subnumber: 2, group: "Lead", label: "Doctor Solo" },
  { number: 82, subnumber: 3, group: "Lead", label: "Natural Lead" },
  { number: 82, subnumber: 4, group: "Lead", label: "Sequenced Saw" },
  { number: 83, subnumber: 0, group: "Lead", label: "Synth Calliope" },
  { number: 84, subnumber: 0, group: "Lead", label: "Chiffer Lead" },
  { number: 85, subnumber: 0, group: "Lead", label: "Charang" },
  { number: 85, subnumber: 1, group: "Lead", label: "Wire Lead" },
  { number: 86, subnumber: 0, group: "Lead", label: "Solo Synth Vox" },
  { number: 87, subnumber: 0, group: "Lead", label: "5th Saw Wave" },
  { number: 88, subnumber: 0, group: "Lead", label: "Bass & Lead" },
  { number: 88, subnumber: 1, group: "Lead", label: "Delayed Lead" },
  { number: 89, subnumber: 0, group: "Synth Pad", label: "Fantasia Pad" },
  { number: 90, subnumber: 0, group: "Synth Pad", label: "Warm Pad" },
  { number: 90, subnumber: 1, group: "Synth Pad", label: "Sine Pad" },
  { number: 91, subnumber: 0, group: "Synth Pad", label: "Polysynth Pad" },
  { number: 92, subnumber: 0, group: "Synth Pad", label: "Space Voice Pad" },
  { number: 92, subnumber: 1, group: "Synth Pad", label: "Itopia" },
  { number: 93, subnumber: 0, group: "Synth Pad", label: "Bowed Glass Pad" },
  { number: 94, subnumber: 0, group: "Synth Pad", label: "Metal Pad" },
  { number: 95, subnumber: 0, group: "Synth Pad", label: "Halo Pad" },
  { number: 96, subnumber: 0, group: "Synth Pad", label: "Sweep Pad" },
  { number: 97, subnumber: 0, group: "Synth Effects", label: "Ice Rain" },
  { number: 98, subnumber: 0, group: "Synth Effects", label: "Soundtrack" },
  { number: 99, subnumber: 0, group: "Synth Effects", label: "Crystal" },
  { number: 99, subnumber: 1, group: "Synth Effects", label: "Synth Mallet" },
  { number: 100, subnumber: 0, group: "Synth Effects", label: "Atmosphere" },
  { number: 101, subnumber: 0, group: "Synth Effects", label: "Brightness" },
  { number: 102, subnumber: 0, group: "Synth Effects", label: "Goblin" },
  { number: 103, subnumber: 0, group: "Synth Effects", label: "Echo Drops" },
  { number: 103, subnumber: 1, group: "Synth Effects", label: "Echo Bell" },
  { number: 103, subnumber: 2, group: "Synth Effects", label: "Echo Pan" },
  { number: 104, subnumber: 0, group: "Synth Effects", label: "Star Theme" },
  { number: 105, subnumber: 0, group: "Ethnic", label: "Sitar" },
  { number: 105, subnumber: 1, group: "Ethnic", label: "Sitar 2" },
  { number: 106, subnumber: 0, group: "Ethnic", label: "Banjo" },
  { number: 107, subnumber: 0, group: "Ethnic", label: "Shamisen" },
  { number: 108, subnumber: 0, group: "Ethnic", label: "Koto" },
  { number: 108, subnumber: 1, group: "Ethnic", label: "Taisho Koto" },
  { number: 109, subnumber: 0, group: "Ethnic", label: "Kalimba" },
  { number: 110, subnumber: 0, group: "Ethnic", label: "Bagpipe" },
  { number: 111, subnumber: 0, group: "Ethnic", label: "Fiddle" },
  { number: 112, subnumber: 0, group: "Ethnic", label: "Shanai" },
  { number: 113, subnumber: 0, group: "Percussive", label: "Tinkle Bell" },
  { number: 114, subnumber: 0, group: "Percussive", label: "Agogo" },
  { number: 115, subnumber: 0, group: "Percussive", label: "Steel Drums" },
  { number: 116, subnumber: 0, group: "Percussive", label: "Woodblock" },
  { number: 116, subnumber: 1, group: "Percussive", label: "Castanets" },
  { number: 117, subnumber: 0, group: "Percussive", label: "Taiko Drum" },
  { number: 117, subnumber: 1, group: "Percussive", label: "Concert Bass Drum" },
  { number: 118, subnumber: 0, group: "Percussive", label: "Melodic Tom 1" },
  { number: 118, subnumber: 1, group: "Percussive", label: "Melodic Tom 2" },
  { number: 119, subnumber: 0, group: "Percussive", label: "Synth Drum" },
  { number: 119, subnumber: 1, group: "Percussive", label: "808 Tom" },
  { number: 119, subnumber: 2, group: "Percussive", label: "Electric Percussion" },
  { number: 120, subnumber: 0, group: "Percussive", label: "Reverse Cymbal" },
  { number: 121, subnumber: 0, group: "Sound Effects", label: "Guitar Fret Noise" },
  { number: 121, subnumber: 1, group: "Sound Effects", label: "Guitar Cut Noise" },
  { number: 121, subnumber: 2, group: "Sound Effects", label: "String Slap" },
  { number: 122, subnumber: 0, group: "Sound Effects", label: "Breath Noise" },
  { number: 122, subnumber: 1, group: "Sound Effects", label: "Flute Key Click" },
  { number: 123, subnumber: 0, group: "Sound Effects", label: "Seashore" },
  { number: 123, subnumber: 1, group: "Sound Effects", label: "Rain" },
  { number: 123, subnumber: 2, group: "Sound Effects", label: "Thunder" },
  { number: 123, subnumber: 3, group: "Sound Effects", label: "Wind" },
  { number: 123, subnumber: 4, group: "Sound Effects", label: "Stream" },
  { number: 123, subnumber: 5, group: "Sound Effects", label: "Bubble" },
  { number: 124, subnumber: 0, group: "Sound Effects", label: "Bird Tweet" },
  { number: 124, subnumber: 1, group: "Sound Effects", label: "Dog" },
  { number: 124, subnumber: 2, group: "Sound Effects", label: "Horse Gallop" },
  { number: 124, subnumber: 3, group: "Sound Effects", label: "Bird 2" },
  { number: 125, subnumber: 0, group: "Sound Effects", label: "Telephone 1" },
  { number: 125, subnumber: 1, group: "Sound Effects", label: "Telephone 2" },
  { number: 125, subnumber: 2, group: "Sound Effects", label: "Door Creaking" },
  { number: 125, subnumber: 3, group: "Sound Effects", label: "Door Closing" },
  { number: 125, subnumber: 4, group: "Sound Effects", label: "Scratch" },
  { number: 125, subnumber: 5, group: "Sound Effects", label: "Wind Chimes" },
  { number: 126, subnumber: 0, group: "Sound Effects", label: "Helicopter" },
  { number: 126, subnumber: 1, group: "Sound Effects", label: "Car Engine" },
  { number: 126, subnumber: 2, group: "Sound Effects", label: "Car Stop" },
  { number: 126, subnumber: 3, group: "Sound Effects", label: "Car Pass" },
  { number: 126, subnumber: 4, group: "Sound Effects", label: "Car Crash" },
  { number: 126, subnumber: 5, group: "Sound Effects", label: "Siren" },
  { number: 126, subnumber: 6, group: "Sound Effects", label: "Train" },
  { number: 126, subnumber: 7, group: "Sound Effects", label: "Jetplane" },
  { number: 126, subnumber: 8, group: "Sound Effects", label: "Starship" },
  { number: 126, subnumber: 9, group: "Sound Effects", label: "Burst Noise" },
  { number: 127, subnumber: 0, group: "Sound Effects", label: "Applause" },
  { number: 127, subnumber: 1, group: "Sound Effects", label: "Laughing" },
  { number: 127, subnumber: 2, group: "Sound Effects", label: "Screaming" },
  { number: 127, subnumber: 3, group: "Sound Effects", label: "Punch" },
  { number: 127, subnumber: 4, group: "Sound Effects", label: "Heart Beat" },
  { number: 127, subnumber: 5, group: "Sound Effects", label: "Footsteps" },
  { number: 128, subnumber: 0, group: "Sound Effects", label: "Gun Shot" },
  { number: 128, subnumber: 1, group: "Sound Effects", label: "Machine Gun" },
  { number: 128, subnumber: 2, group: "Sound Effects", label: "Lasergun" },
  { number: 128, subnumber: 3, group: "Sound Effects", label: "Explosion" }
];
var GENERAL_MIDI_DRUM_NOTE_NUMBERS = /* @__PURE__ */ new Map([
  [27, "High Q(GM2)"],
  [28, "Slap(GM2)"],
  [29, "Scratch Push(GM2)"],
  [30, "Scratch Pull(GM2)"],
  [31, "Sticks(GM2)"],
  [32, "Square Click(GM2)"],
  [33, "Metronome Click(GM2)"],
  [34, "Metronome Bell(GM2)"],
  [35, "Bass Drum 2"],
  [36, "Bass Drum 1"],
  [37, "Side Stick"],
  [38, "Snare Drum 1"],
  [39, "Hand Clap"],
  [40, "Snare Drum 2"],
  [41, "Low Tom 2"],
  [42, "Closed Hi-hat"],
  [43, "Low Tom 1"],
  [44, "Pedal Hi-hat"],
  [45, "Mid Tom 2"],
  [46, "Open Hi-hat"],
  [47, "Mid Tom 1"],
  [48, "High Tom 2"],
  [49, "Crash Cymbal 1"],
  [50, "High Tom 1"],
  [51, "Ride Cymbal 1"],
  [52, "Chinese Cymbal"],
  [53, "Ride Bell"],
  [54, "Tambourine"],
  [55, "Splash Cymbal"],
  [56, "Cowbell"],
  [57, "Crash Cymbal 2"],
  [58, "Vibra Slap"],
  [59, "Ride Cymbal 2"],
  [60, "High Bongo"],
  [61, "Low Bongo"],
  [62, "Mute High Conga"],
  [63, "Open High Conga"],
  [64, "Low Conga"],
  [65, "High Timbale"],
  [66, "Low Timbale"],
  [67, "High Agogo"],
  [68, "Low Agogo"],
  [69, "Cabasa"],
  [70, "Maracas"],
  [71, "Short Whistle"],
  [72, "Long Whistle"],
  [73, "Short Guiro"],
  [74, "Long Guiro"],
  [75, "Claves"],
  [76, "High Wood Block"],
  [77, "Low Wood Block"],
  [78, "Mute Cuica"],
  [79, "Open Cuica"],
  [80, "Mute Triangle"],
  [81, "Open Triangle"],
  [82, "Shaker(GM2)"],
  [83, "Jingle Bell(GM2)"],
  [84, "Belltree(GM2)"],
  [85, "Castanets(GM2)"],
  [86, "Mute Surdo(GM2)"],
  [87, "Open Surdo(GM2)"]
]);
var MIDI_NOTE_RANGES = [
  { instrNr: 40, nrL2: -1, subNrL2: -1, label: "Violin", min: 55, max: 103 },
  { instrNr: 41, nrL2: -1, subNrL2: -1, label: "Viola", min: 48, max: 91 },
  { instrNr: 42, nrL2: -1, subNrL2: -1, label: "Cello", min: 36, max: 76 },
  { instrNr: -1, nrL2: -1, subNrL2: -1, label: "Double Bass", min: 28, max: 67 },
  { instrNr: -1, nrL2: -1, subNrL2: -1, label: "Bass Guitar", min: 28, max: 67 },
  { instrNr: -1, nrL2: -1, subNrL2: -1, label: "Acoustic Guitar", min: 40, max: 88 },
  { instrNr: 58, nrL2: 59, subNrL2: 0, label: "Tuba", min: 28, max: 58 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Bass Trombone", min: 34, max: 67 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "French Horn", min: 34, max: 77 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Trombone", min: 40, max: 72 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Trumpet", min: 55, max: 82 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Piccolo", min: 74, max: 102 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Flute", min: 60, max: 96 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Oboe", min: 58, max: 91 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Alto Flute", min: 55, max: 91 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Cor Anglais (English Horn)", min: 52, max: 81 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Clarinet", min: 50, max: 94 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Bass Clarinet", min: 38, max: 77 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Bassoon", min: 34, max: 75 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Contrabassoon", min: 22, max: 53 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Soprano Recorder", min: 72, max: 98 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Alto Recorder", min: 65, max: 91 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Tenor Recorder", min: 60, max: 86 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Bass Recorder", min: 53, max: 79 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Baritone Sax", min: 36, max: 69 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Tenor Sax", min: 44, max: 76 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Alto Sax", min: 49, max: 81 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Soprano Sax", min: 56, max: 88 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Glockenspiel", min: 79, max: 108 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Xylophone", min: 65, max: 108 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Vibraphone", min: 53, max: 89 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Marimba", min: 45, max: 96 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Bass Marimba", min: 33, max: 81 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Celeste", min: 60, max: 108 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Tubular Bells", min: 60, max: 77 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Timpani", min: 40, max: 55 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Harpsichord", min: 29, max: 89 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Kalimba", min: 60, max: 88 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Harp", min: 24, max: 103 }
];
for (const note2 of MIDI_NOTES) {
  MidiNoteByPitch.set(note2.pitch, note2);
  MidiNoteByLabel.set(note2.label, note2);
}
for (const instrument of MIDI_INSTRUMENTS) {
  MidiInstrumentByNumber.set(instrument.number, instrument);
}
for (const instrument of MIDI_INSTRUMENTS_LEV2) {
  const key = `${instrument.number}-${instrument.subnumber}`;
  MidiInstrumentByNumberLev2.set(key, instrument);
}

// src/types/Note.js
var Note = class {
  constructor(pitch = 0, start2 = 0, velocity = 127, channel = 0, end = null) {
    if (pitch < 0 || pitch > 127) {
      throw new Error(`Invalid pitch ${pitch}`);
    }
    try {
      this.name = getMidiNoteByNr(pitch).label;
    } catch {
      throw new Error(`Invalid pitch ${pitch}`);
    }
    this.pitch = pitch;
    this.start = start2;
    this.velocity = velocity;
    this.channel = channel;
    this.end = end;
  }
  static from(object) {
    let {
      pitch = 0,
      start: start2 = 0,
      velocity = 127,
      channel = 0,
      end = null,
      duration = null
    } = object;
    if (typeof pitch === "string" && Number.isNaN(+pitch)) {
      const note2 = getMidiNoteByLabel(pitch);
      if (note2 === null || note2 === void 0) {
        throw new Error("Invalid pitch for Note.from()");
      }
      pitch = note2.pitch;
    }
    if ((end === void 0 || end === null) && duration !== null && !Number.isNaN(duration)) {
      end = start2 + duration;
    }
    return new Note(pitch, start2, velocity, channel, end);
  }
  clone() {
    return new Note(this.pitch, this.start, this.velocity, this.channel, this.end);
  }
  getDuration() {
    if (this.end === null) {
      return 0;
    }
    return this.end - this.start;
  }
  getName() {
    return this.name;
  }
  getLetter() {
    return getMidiNoteByNr(this.pitch).name;
  }
  getOctave() {
    return getMidiNoteByNr(this.pitch).octave;
  }
  shiftTime(addedSeconds) {
    const n = this.clone();
    n.start += addedSeconds;
    n.end = n.end === null ? null : n.end + addedSeconds;
    return n;
  }
  scaleTime(factor) {
    const n = this.clone();
    n.start *= factor;
    n.end = n.end === null ? null : n.end * factor;
    return n;
  }
  overlapsInTime(otherNote) {
    return this.start >= otherNote.start && this.start <= otherNote.end || this.end >= otherNote.start && this.end <= otherNote.end;
  }
  overlapInSeconds(otherNote) {
    if (!this.overlapsInTime(otherNote)) {
      return 0;
    }
    const laterStart = Math.max(this.start, otherNote.start);
    const earlierEnd = Math.min(this.end, otherNote.end);
    return earlierEnd - laterStart;
  }
  equals(otherNote) {
    if (!(otherNote instanceof Note)) {
      return false;
    }
    return this.pitch === otherNote.pitch && this.start === otherNote.start && this.velocity === otherNote.velocity && this.channel === otherNote.channel && this.end === otherNote.end;
  }
  toString(short = false) {
    if (short) {
      return `Note(n: ${this.name}, p: ${this.pitch}, s: ${this.start}, e: ${this.end}, v: ${this.velocity}, c: ${this.channel})`;
    }
    return `Note(name: ${this.name}, pitch: ${this.pitch}, start: ${this.start}, end: ${this.end}, velocity: ${this.velocity}, channel: ${this.channel})`;
  }
};
var Note_default = Note;

// src/types/GuitarNote.js
var GuitarNote = class extends Note_default {
  constructor(pitch = 0, start2 = 0, velocity = 127, channel = 0, end = null, string = null, fret = null) {
    super(pitch, start2, velocity, channel, end);
    this.string = string;
    this.fret = fret;
  }
  static from(object) {
    let {
      pitch = 0,
      start: start2 = 0,
      velocity = 127,
      channel = 0,
      end = null,
      string = null,
      fret = null
    } = object;
    if (typeof pitch === "string" && Number.isNaN(+pitch)) {
      const note2 = getMidiNoteByLabel(pitch);
      if (note2 === null || note2 === void 0) {
        throw new Error("Invalid pitch for GuitarNote.from()");
      }
      pitch = note2.pitch;
    }
    return new GuitarNote(pitch, start2, velocity, channel, end, string, fret);
  }
  static fromNote(note2, string, fret) {
    return new GuitarNote(note2.pitch, note2.start, note2.velocity, note2.channel, note2.end, string, fret);
  }
  toNote() {
    return new Note_default(this.pitch, this.start, this.velocity, this.channel, this.end);
  }
  clone() {
    return new GuitarNote(this.pitch, this.start, this.velocity, this.channel, this.end, this.string, this.fret);
  }
  equals(otherNote) {
    if (!(otherNote instanceof GuitarNote)) {
      return false;
    }
    return this.pitch === otherNote.pitch && this.start === otherNote.start && this.velocity === otherNote.velocity && this.channel === otherNote.channel && this.end === otherNote.end && this.string === otherNote.string && this.fret === otherNote.fret;
  }
  toString(short = false) {
    if (short) {
      return `GuitarNote(n: ${this.name}, p: ${this.pitch}, s: ${this.start}, e: ${this.end}, v: ${this.velocity}, c: ${this.channel}, s: ${this.string}, f: ${this.fret})`;
    }
    return `GuitarNote(name: ${this.name}, pitch: ${this.pitch}, start: ${this.start}, end: ${this.end}, velocity: ${this.velocity}, channel: ${this.channel}, string: ${this.string}, fret: ${this.fret})`;
  }
};
var GuitarNote_default = GuitarNote;

// src/types/HarmonicaNote.js
var HarmonicaNote = class extends Note_default {
  constructor(pitch = 0, start2 = 0, velocity = 127, channel = 0, end = null, hole = null, instruction = null) {
    super(pitch, start2, velocity, channel, end);
    this.hole = hole;
    this.instruction = instruction;
  }
  static from(object) {
    let {
      pitch = 0,
      start: start2 = 0,
      velocity = 127,
      channel = 0,
      end = null,
      hole = null,
      instruction = null
    } = object;
    if (typeof pitch === "string" && Number.isNaN(+pitch)) {
      const note2 = getMidiNoteByLabel(pitch);
      if (note2 === null || note2 === void 0) {
        throw new Error("Invalid pitch for HarmonicaNote.from()");
      }
      pitch = note2.pitch;
    }
    return new HarmonicaNote(pitch, start2, velocity, channel, end, hole, instruction);
  }
  static fromNote(note2, hole, instruction) {
    return new HarmonicaNote(note2.pitch, note2.start, note2.velocity, note2.channel, note2.end, hole, instruction);
  }
  toNote() {
    return new Note_default(this.pitch, this.start, this.velocity, this.channel, this.end);
  }
  clone() {
    return new HarmonicaNote(this.pitch, this.start, this.velocity, this.channel, this.end, this.hole, this.instruction);
  }
  equals(otherNote) {
    if (!(otherNote instanceof HarmonicaNote)) {
      return false;
    }
    return this.pitch === otherNote.pitch && this.start === otherNote.start && this.velocity === otherNote.velocity && this.channel === otherNote.channel && this.end === otherNote.end && this.hole === otherNote.hole && this.instruction === otherNote.instruction;
  }
  toString(short = false) {
    if (short) {
      return `HarmonicaNote(n: ${this.name}, p: ${this.pitch}, s: ${this.start}, e: ${this.end}, v: ${this.velocity}, c: ${this.channel}, h: ${this.hole}, i: ${this.instruction})`;
    }
    return `HarmonicaNote(name: ${this.name}, pitch: ${this.pitch}, start: ${this.start}, end: ${this.end}, velocity: ${this.velocity}, channel: ${this.channel}, hole: ${this.hole}, instruction: ${this.instruction})`;
  }
};
var HarmonicaNote_default = HarmonicaNote;

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/ascending.js
function ascending_default(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/bisector.js
function bisector_default(f) {
  let delta = f;
  let compare = f;
  if (f.length === 1) {
    delta = (d, x) => f(d) - x;
    compare = ascendingComparator(f);
  }
  function left(a, x, lo, hi) {
    if (lo == null)
      lo = 0;
    if (hi == null)
      hi = a.length;
    while (lo < hi) {
      const mid = lo + hi >>> 1;
      if (compare(a[mid], x) < 0)
        lo = mid + 1;
      else
        hi = mid;
    }
    return lo;
  }
  function right(a, x, lo, hi) {
    if (lo == null)
      lo = 0;
    if (hi == null)
      hi = a.length;
    while (lo < hi) {
      const mid = lo + hi >>> 1;
      if (compare(a[mid], x) > 0)
        hi = mid;
      else
        lo = mid + 1;
    }
    return lo;
  }
  function center(a, x, lo, hi) {
    if (lo == null)
      lo = 0;
    if (hi == null)
      hi = a.length;
    const i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }
  return { left, center, right };
}
function ascendingComparator(f) {
  return (d, x) => ascending_default(f(d), x);
}

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/number.js
function number_default(x) {
  return x === null ? NaN : +x;
}
function* numbers(values, valueof) {
  if (valueof === void 0) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        yield value;
      }
    }
  } else {
    let index16 = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index16, values)) != null && (value = +value) >= value) {
        yield value;
      }
    }
  }
}

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/bisect.js
var ascendingBisect = bisector_default(ascending_default);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
var bisectCenter = bisector_default(number_default).center;
var bisect_default = bisectRight;

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/variance.js
function variance(values, valueof) {
  let count = 0;
  let delta;
  let mean2 = 0;
  let sum = 0;
  if (valueof === void 0) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        delta = value - mean2;
        mean2 += delta / ++count;
        sum += delta * (value - mean2);
      }
    }
  } else {
    let index16 = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index16, values)) != null && (value = +value) >= value) {
        delta = value - mean2;
        mean2 += delta / ++count;
        sum += delta * (value - mean2);
      }
    }
  }
  if (count > 1)
    return sum / (count - 1);
}

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/deviation.js
function deviation(values, valueof) {
  const v = variance(values, valueof);
  return v ? Math.sqrt(v) : v;
}

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/extent.js
function extent_default(values, valueof) {
  let min3;
  let max3;
  if (valueof === void 0) {
    for (const value of values) {
      if (value != null) {
        if (min3 === void 0) {
          if (value >= value)
            min3 = max3 = value;
        } else {
          if (min3 > value)
            min3 = value;
          if (max3 < value)
            max3 = value;
        }
      }
    }
  } else {
    let index16 = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index16, values)) != null) {
        if (min3 === void 0) {
          if (value >= value)
            min3 = max3 = value;
        } else {
          if (min3 > value)
            min3 = value;
          if (max3 < value)
            max3 = value;
        }
      }
    }
  }
  return [min3, max3];
}

// node_modules/.pnpm/internmap@1.0.1/node_modules/internmap/src/index.js
var InternMap = class extends Map {
  constructor(entries4, key = keyof) {
    super();
    Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: key } });
    if (entries4 != null)
      for (const [key2, value] of entries4)
        this.set(key2, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
};
function intern_get({ _intern, _key }, value) {
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}
function intern_set({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key))
    return _intern.get(key);
  _intern.set(key, value);
  return value;
}
function intern_delete({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(value);
    _intern.delete(key);
  }
  return value;
}
function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/identity.js
function identity_default(x) {
  return x;
}

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/group.js
function group(values, ...keys) {
  return nest(values, identity_default, identity_default, keys);
}
function nest(values, map2, reduce, keys) {
  return function regroup(values2, i) {
    if (i >= keys.length)
      return reduce(values2);
    const groups2 = new InternMap();
    const keyof2 = keys[i++];
    let index16 = -1;
    for (const value of values2) {
      const key = keyof2(value, ++index16, values2);
      const group2 = groups2.get(key);
      if (group2)
        group2.push(value);
      else
        groups2.set(key, [value]);
    }
    for (const [key, values3] of groups2) {
      groups2.set(key, regroup(values3, i));
    }
    return map2(groups2);
  }(values, 0);
}

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/ticks.js
var e10 = Math.sqrt(50);
var e5 = Math.sqrt(10);
var e2 = Math.sqrt(2);
function ticks_default(start2, stop, count) {
  var reverse, i = -1, n, ticks, step;
  stop = +stop, start2 = +start2, count = +count;
  if (start2 === stop && count > 0)
    return [start2];
  if (reverse = stop < start2)
    n = start2, start2 = stop, stop = n;
  if ((step = tickIncrement(start2, stop, count)) === 0 || !isFinite(step))
    return [];
  if (step > 0) {
    let r0 = Math.round(start2 / step), r1 = Math.round(stop / step);
    if (r0 * step < start2)
      ++r0;
    if (r1 * step > stop)
      --r1;
    ticks = new Array(n = r1 - r0 + 1);
    while (++i < n)
      ticks[i] = (r0 + i) * step;
  } else {
    step = -step;
    let r0 = Math.round(start2 * step), r1 = Math.round(stop * step);
    if (r0 / step < start2)
      ++r0;
    if (r1 / step > stop)
      --r1;
    ticks = new Array(n = r1 - r0 + 1);
    while (++i < n)
      ticks[i] = (r0 + i) / step;
  }
  if (reverse)
    ticks.reverse();
  return ticks;
}
function tickIncrement(start2, stop, count) {
  var step = (stop - start2) / Math.max(0, count), power = Math.floor(Math.log(step) / Math.LN10), error = step / Math.pow(10, power);
  return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}
function tickStep(start2, stop, count) {
  var step0 = Math.abs(stop - start2) / Math.max(0, count), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
  if (error >= e10)
    step1 *= 10;
  else if (error >= e5)
    step1 *= 5;
  else if (error >= e2)
    step1 *= 2;
  return stop < start2 ? -step1 : step1;
}

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/max.js
function max(values, valueof) {
  let max3;
  if (valueof === void 0) {
    for (const value of values) {
      if (value != null && (max3 < value || max3 === void 0 && value >= value)) {
        max3 = value;
      }
    }
  } else {
    let index16 = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index16, values)) != null && (max3 < value || max3 === void 0 && value >= value)) {
        max3 = value;
      }
    }
  }
  return max3;
}

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/min.js
function min(values, valueof) {
  let min3;
  if (valueof === void 0) {
    for (const value of values) {
      if (value != null && (min3 > value || min3 === void 0 && value >= value)) {
        min3 = value;
      }
    }
  } else {
    let index16 = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index16, values)) != null && (min3 > value || min3 === void 0 && value >= value)) {
        min3 = value;
      }
    }
  }
  return min3;
}

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/quickselect.js
function quickselect(array, k, left = 0, right = array.length - 1, compare = ascending_default) {
  while (right > left) {
    if (right - left > 600) {
      const n = right - left + 1;
      const m = k - left + 1;
      const z = Math.log(n);
      const s = 0.5 * Math.exp(2 * z / 3);
      const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
      const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
      const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
      quickselect(array, k, newLeft, newRight, compare);
    }
    const t = array[k];
    let i = left;
    let j = right;
    swap(array, left, k);
    if (compare(array[right], t) > 0)
      swap(array, left, right);
    while (i < j) {
      swap(array, i, j), ++i, --j;
      while (compare(array[i], t) < 0)
        ++i;
      while (compare(array[j], t) > 0)
        --j;
    }
    if (compare(array[left], t) === 0)
      swap(array, left, j);
    else
      ++j, swap(array, j, right);
    if (j <= k)
      left = j + 1;
    if (k <= j)
      right = j - 1;
  }
  return array;
}
function swap(array, i, j) {
  const t = array[i];
  array[i] = array[j];
  array[j] = t;
}

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/quantile.js
function quantile(values, p, valueof) {
  values = Float64Array.from(numbers(values, valueof));
  if (!(n = values.length))
    return;
  if ((p = +p) <= 0 || n < 2)
    return min(values);
  if (p >= 1)
    return max(values);
  var n, i = (n - 1) * p, i0 = Math.floor(i), value0 = max(quickselect(values, i0).subarray(0, i0 + 1)), value1 = min(values.subarray(i0 + 1));
  return value0 + (value1 - value0) * (i - i0);
}

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/mean.js
function mean(values, valueof) {
  let count = 0;
  let sum = 0;
  if (valueof === void 0) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        ++count, sum += value;
      }
    }
  } else {
    let index16 = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index16, values)) != null && (value = +value) >= value) {
        ++count, sum += value;
      }
    }
  }
  if (count)
    return sum / count;
}

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/median.js
function median_default(values, valueof) {
  return quantile(values, 0.5, valueof);
}

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/minIndex.js
function minIndex(values, valueof) {
  let min3;
  let minIndex2 = -1;
  let index16 = -1;
  if (valueof === void 0) {
    for (const value of values) {
      ++index16;
      if (value != null && (min3 > value || min3 === void 0 && value >= value)) {
        min3 = value, minIndex2 = index16;
      }
    }
  } else {
    for (let value of values) {
      if ((value = valueof(value, ++index16, values)) != null && (min3 > value || min3 === void 0 && value >= value)) {
        min3 = value, minIndex2 = index16;
      }
    }
  }
  return minIndex2;
}

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/difference.js
function difference(values, ...others) {
  values = new Set(values);
  for (const other of others) {
    for (const value of other) {
      values.delete(value);
    }
  }
  return values;
}

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/set.js
function set(values) {
  return values instanceof Set ? values : new Set(values);
}

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/intersection.js
function intersection(values, ...others) {
  values = new Set(values);
  others = others.map(set);
  out:
    for (const value of values) {
      for (const other of others) {
        if (!other.has(value)) {
          values.delete(value);
          continue out;
        }
      }
    }
  return values;
}

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/src/union.js
function union(...others) {
  const set4 = /* @__PURE__ */ new Set();
  for (const other of others) {
    for (const o of other) {
      set4.add(o);
    }
  }
  return set4;
}

// node_modules/.pnpm/d3-dispatch@2.0.0/node_modules/d3-dispatch/src/dispatch.js
var noop = { value: () => {
} };
function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t))
      throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}
function Dispatch(_) {
  this._ = _;
}
function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0)
      name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    return { type: t, name };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._, T = parseTypenames(typename + "", _), t, i = -1, n = T.length;
    if (arguments.length < 2) {
      while (++i < n)
        if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name)))
          return t;
      return;
    }
    if (callback != null && typeof callback !== "function")
      throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type)
        _[t] = set2(_[t], typename.name, callback);
      else if (callback == null)
        for (t in _)
          _[t] = set2(_[t], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy2 = {}, _ = this._;
    for (var t in _)
      copy2[t] = _[t].slice();
    return new Dispatch(copy2);
  },
  call: function(type2, that) {
    if ((n = arguments.length - 2) > 0)
      for (var args = new Array(n), i = 0, n, t; i < n; ++i)
        args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type2))
      throw new Error("unknown type: " + type2);
    for (t = this._[type2], i = 0, n = t.length; i < n; ++i)
      t[i].value.apply(that, args);
  },
  apply: function(type2, that, args) {
    if (!this._.hasOwnProperty(type2))
      throw new Error("unknown type: " + type2);
    for (var t = this._[type2], i = 0, n = t.length; i < n; ++i)
      t[i].value.apply(that, args);
  }
};
function get(type2, name) {
  for (var i = 0, n = type2.length, c2; i < n; ++i) {
    if ((c2 = type2[i]).name === name) {
      return c2.value;
    }
  }
}
function set2(type2, name, callback) {
  for (var i = 0, n = type2.length; i < n; ++i) {
    if (type2[i].name === name) {
      type2[i] = noop, type2 = type2.slice(0, i).concat(type2.slice(i + 1));
      break;
    }
  }
  if (callback != null)
    type2.push({ name, value: callback });
  return type2;
}
var dispatch_default = dispatch;

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/namespaces.js
var xhtml = "http://www.w3.org/1999/xhtml";
var namespaces_default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/namespace.js
function namespace_default(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns")
    name = name.slice(i + 1);
  return namespaces_default.hasOwnProperty(prefix) ? { space: namespaces_default[prefix], local: name } : name;
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/creator.js
function creatorInherit(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator_default(name) {
  var fullname = namespace_default(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selector.js
function none() {
}
function selector_default(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/select.js
function select_default(select) {
  if (typeof select !== "function")
    select = selector_default(select);
  for (var groups2 = this._groups, m = groups2.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group2 = groups2[j], n = group2.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group2[i]) && (subnode = select.call(node, node.__data__, i, group2))) {
        if ("__data__" in node)
          subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/array.js
function array_default(x) {
  return typeof x === "object" && "length" in x ? x : Array.from(x);
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selectorAll.js
function empty() {
  return [];
}
function selectorAll_default(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/selectAll.js
function arrayAll(select) {
  return function() {
    var group2 = select.apply(this, arguments);
    return group2 == null ? [] : array_default(group2);
  };
}
function selectAll_default(select) {
  if (typeof select === "function")
    select = arrayAll(select);
  else
    select = selectorAll_default(select);
  for (var groups2 = this._groups, m = groups2.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group2 = groups2[j], n = group2.length, node, i = 0; i < n; ++i) {
      if (node = group2[i]) {
        subgroups.push(select.call(node, node.__data__, i, group2));
        parents.push(node);
      }
    }
  }
  return new Selection(subgroups, parents);
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/matcher.js
function matcher_default(selector) {
  return function() {
    return this.matches(selector);
  };
}
function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/selectChild.js
var find = Array.prototype.find;
function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function selectChild_default(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/selectChildren.js
var filter = Array.prototype.filter;
function children() {
  return this.children;
}
function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}
function selectChildren_default(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/filter.js
function filter_default(match) {
  if (typeof match !== "function")
    match = matcher_default(match);
  for (var groups2 = this._groups, m = groups2.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group2 = groups2[j], n = group2.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group2[i]) && match.call(node, node.__data__, i, group2)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/sparse.js
function sparse_default(update) {
  return new Array(update.length);
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/enter.js
function enter_default() {
  return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
}
function EnterNode(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function(child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function(selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function(selector) {
    return this._parent.querySelectorAll(selector);
  }
};

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/constant.js
function constant_default(x) {
  return function() {
    return x;
  };
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/data.js
function bindIndex(parent, group2, enter, update, exit, data) {
  var i = 0, node, groupLength = group2.length, dataLength = data.length;
  for (; i < dataLength; ++i) {
    if (node = group2[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group2[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group2, enter, update, exit, data, key) {
  var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group2.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group2[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group2) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group2[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function data_default(value, key) {
  if (!arguments.length)
    return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex, parents = this._parents, groups2 = this._groups;
  if (typeof value !== "function")
    value = constant_default(value);
  for (var m = groups2.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j], group2 = groups2[j], groupLength = group2.length, data = array_default(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group2, enterGroup, updateGroup, exitGroup, data, key);
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1)
          i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength)
          ;
        previous._next = next || null;
      }
    }
  }
  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/exit.js
function exit_default() {
  return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/join.js
function join_default(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
  if (onupdate != null)
    update = onupdate(update);
  if (onexit == null)
    exit.remove();
  else
    onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/merge.js
function merge_default(selection2) {
  if (!(selection2 instanceof Selection))
    throw new Error("invalid merge");
  for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection(merges, this._parents);
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/order.js
function order_default() {
  for (var groups2 = this._groups, j = -1, m = groups2.length; ++j < m; ) {
    for (var group2 = groups2[j], i = group2.length - 1, next = group2[i], node; --i >= 0; ) {
      if (node = group2[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4)
          next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/sort.js
function sort_default(compare) {
  if (!compare)
    compare = ascending;
  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }
  for (var groups2 = this._groups, m = groups2.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group2 = groups2[j], n = group2.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group2[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection(sortgroups, this._parents).order();
}
function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/call.js
function call_default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/nodes.js
function nodes_default() {
  return Array.from(this);
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/node.js
function node_default() {
  for (var groups2 = this._groups, j = 0, m = groups2.length; j < m; ++j) {
    for (var group2 = groups2[j], i = 0, n = group2.length; i < n; ++i) {
      var node = group2[i];
      if (node)
        return node;
    }
  }
  return null;
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/size.js
function size_default() {
  let size = 0;
  for (const node of this)
    ++size;
  return size;
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/empty.js
function empty_default() {
  return !this.node();
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/each.js
function each_default(callback) {
  for (var groups2 = this._groups, j = 0, m = groups2.length; j < m; ++j) {
    for (var group2 = groups2[j], i = 0, n = group2.length, node; i < n; ++i) {
      if (node = group2[i])
        callback.call(node, node.__data__, i, group2);
    }
  }
  return this;
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/attr.js
function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}
function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      this.removeAttribute(name);
    else
      this.setAttribute(name, v);
  };
}
function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      this.removeAttributeNS(fullname.space, fullname.local);
    else
      this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function attr_default(name, value) {
  var fullname = namespace_default(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/window.js
function window_default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/style.js
function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      this.style.removeProperty(name);
    else
      this.style.setProperty(name, v, priority);
  };
}
function style_default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/property.js
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      delete this[name];
    else
      this[name] = v;
  };
}
function property_default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/classed.js
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names2) {
  var list = classList(node), i = -1, n = names2.length;
  while (++i < n)
    list.add(names2[i]);
}
function classedRemove(node, names2) {
  var list = classList(node), i = -1, n = names2.length;
  while (++i < n)
    list.remove(names2[i]);
}
function classedTrue(names2) {
  return function() {
    classedAdd(this, names2);
  };
}
function classedFalse(names2) {
  return function() {
    classedRemove(this, names2);
  };
}
function classedFunction(names2, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names2);
  };
}
function classed_default(name, value) {
  var names2 = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names2.length;
    while (++i < n)
      if (!list.contains(names2[i]))
        return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names2, value));
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/text.js
function textRemove() {
  this.textContent = "";
}
function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function text_default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/html.js
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function html_default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling)
    this.parentNode.appendChild(this);
}
function raise_default() {
  return this.each(raise);
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling)
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
  return this.each(lower);
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/append.js
function append_default(name) {
  var create2 = typeof name === "function" ? name : creator_default(name);
  return this.select(function() {
    return this.appendChild(create2.apply(this, arguments));
  });
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/insert.js
function constantNull() {
  return null;
}
function insert_default(name, before) {
  var create2 = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
  return this.select(function() {
    return this.insertBefore(create2.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent)
    parent.removeChild(this);
}
function remove_default() {
  return this.each(remove);
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function clone_default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/datum.js
function datum_default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/on.js
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames2(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0)
      name = t.slice(i + 1), t = t.slice(0, i);
    return { type: t, name };
  });
}
function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on)
      return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i)
      on.length = i;
    else
      delete this.__on;
  };
}
function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on)
      for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, o.listener = listener, o.options = options);
          o.value = value;
          return;
        }
      }
    this.addEventListener(typename.type, listener, options);
    o = { type: typename.type, name: typename.name, value, listener, options };
    if (!on)
      this.__on = [o];
    else
      on.push(o);
  };
}
function on_default(typename, value, options) {
  var typenames = parseTypenames2(typename + ""), i, n = typenames.length, t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on)
      for (var j = 0, m = on.length, o; j < m; ++j) {
        for (i = 0, o = on[j]; i < n; ++i) {
          if ((t = typenames[i]).type === o.type && t.name === o.name) {
            return o.value;
          }
        }
      }
    return;
  }
  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i)
    this.each(on(typenames[i], value, options));
  return this;
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent(node, type2, params) {
  var window2 = window_default(node), event = window2.CustomEvent;
  if (typeof event === "function") {
    event = new event(type2, params);
  } else {
    event = window2.document.createEvent("Event");
    if (params)
      event.initEvent(type2, params.bubbles, params.cancelable), event.detail = params.detail;
    else
      event.initEvent(type2, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params);
  };
}
function dispatchFunction(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params.apply(this, arguments));
  };
}
function dispatch_default2(type2, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type2, params));
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/iterator.js
function* iterator_default() {
  for (var groups2 = this._groups, j = 0, m = groups2.length; j < m; ++j) {
    for (var group2 = groups2[j], i = 0, n = group2.length, node; i < n; ++i) {
      if (node = group2[i])
        yield node;
    }
  }
}

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/src/selection/index.js
var root = [null];
function Selection(groups2, parents) {
  this._groups = groups2;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: select_default,
  selectAll: selectAll_default,
  selectChild: selectChild_default,
  selectChildren: selectChildren_default,
  filter: filter_default,
  data: data_default,
  enter: enter_default,
  exit: exit_default,
  join: join_default,
  merge: merge_default,
  selection: selection_selection,
  order: order_default,
  sort: sort_default,
  call: call_default,
  nodes: nodes_default,
  node: node_default,
  size: size_default,
  empty: empty_default,
  each: each_default,
  attr: attr_default,
  style: style_default,
  property: property_default,
  classed: classed_default,
  text: text_default,
  html: html_default,
  raise: raise_default,
  lower: lower_default,
  append: append_default,
  insert: insert_default,
  remove: remove_default,
  clone: clone_default,
  datum: datum_default,
  on: on_default,
  dispatch: dispatch_default2,
  [Symbol.iterator]: iterator_default
};
var selection_default = selection;

// node_modules/.pnpm/d3-color@2.0.0/node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}

// node_modules/.pnpm/d3-color@2.0.0/node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$");
var reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$");
var reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
var reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$");
var reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$");
var reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy: function(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format2) {
  var m, l;
  format2 = (format2 + "").trim().toLowerCase();
  return (m = reHex.exec(format2)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format2)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format2)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format2)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format2)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0)
    r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}
function rgb_formatRgb() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0)
    h = s = l = NaN;
  else if (l <= 0 || l >= 1)
    h = s = NaN;
  else if (s <= 0)
    h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl)
    return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Hsl();
  if (o instanceof Hsl)
    return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min3 = Math.min(r, g, b), max3 = Math.max(r, g, b), h = NaN, s = max3 - min3, l = (max3 + min3) / 2;
  if (s) {
    if (r === max3)
      h = (g - b) / s + (g < b) * 6;
    else if (g === max3)
      h = (b - r) / s + 2;
    else
      h = (r - g) / s + 4;
    s /= l < 0.5 ? max3 + min3 : 2 - max3 - min3;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
  }
}));
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// node_modules/.pnpm/d3-color@2.0.0/node_modules/d3-color/src/math.js
var radians = Math.PI / 180;
var degrees = 180 / Math.PI;

// node_modules/.pnpm/d3-color@2.0.0/node_modules/d3-color/src/cubehelix.js
var A = -0.14861;
var B = 1.78277;
var C = -0.29227;
var D = -0.90649;
var E = 1.97294;
var ED = E * D;
var EB = E * B;
var BC_DA = B * C - D * A;
function cubehelixConvert(o) {
  if (o instanceof Cubehelix)
    return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb))
    o = rgbConvert(o);
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k = (E * (g - l) - C * bl) / D, s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), h = s ? Math.atan2(k, bl) * degrees - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}
function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Cubehelix, cubehelix, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * radians, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
    return new Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
  }
}));

// node_modules/.pnpm/d3-interpolate@2.0.1/node_modules/d3-interpolate/src/basis.js
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function basis_default(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/.pnpm/d3-interpolate@2.0.1/node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/.pnpm/d3-interpolate@2.0.1/node_modules/d3-interpolate/src/constant.js
var constant_default2 = (x) => () => x;

// node_modules/.pnpm/d3-interpolate@2.0.1/node_modules/d3-interpolate/src/color.js
function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}
function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant_default2(isNaN(a) ? b : a);
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant_default2(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant_default2(isNaN(a) ? b : a);
}

// node_modules/.pnpm/d3-interpolate@2.0.1/node_modules/d3-interpolate/src/rgb.js
var rgb_default = function rgbGamma(y) {
  var color2 = gamma(y);
  function rgb2(start2, end) {
    var r = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.r = r(t);
      start2.g = g(t);
      start2.b = b(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
    for (i = 0; i < n; ++i) {
      color2 = rgb(colors[i]);
      r[i] = color2.r || 0;
      g[i] = color2.g || 0;
      b[i] = color2.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color2.opacity = 1;
    return function(t) {
      color2.r = r(t);
      color2.g = g(t);
      color2.b = b(t);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default);
var rgbBasisClosed = rgbSpline(basisClosed_default);

// node_modules/.pnpm/d3-interpolate@2.0.1/node_modules/d3-interpolate/src/numberArray.js
function numberArray_default(a, b) {
  if (!b)
    b = [];
  var n = a ? Math.min(b.length, a.length) : 0, c2 = b.slice(), i;
  return function(t) {
    for (i = 0; i < n; ++i)
      c2[i] = a[i] * (1 - t) + b[i] * t;
    return c2;
  };
}
function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

// node_modules/.pnpm/d3-interpolate@2.0.1/node_modules/d3-interpolate/src/array.js
function genericArray(a, b) {
  var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c2 = new Array(nb), i;
  for (i = 0; i < na; ++i)
    x[i] = value_default(a[i], b[i]);
  for (; i < nb; ++i)
    c2[i] = b[i];
  return function(t) {
    for (i = 0; i < na; ++i)
      c2[i] = x[i](t);
    return c2;
  };
}

// node_modules/.pnpm/d3-interpolate@2.0.1/node_modules/d3-interpolate/src/date.js
function date_default(a, b) {
  var d = new Date();
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

// node_modules/.pnpm/d3-interpolate@2.0.1/node_modules/d3-interpolate/src/number.js
function number_default2(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

// node_modules/.pnpm/d3-interpolate@2.0.1/node_modules/d3-interpolate/src/object.js
function object_default(a, b) {
  var i = {}, c2 = {}, k;
  if (a === null || typeof a !== "object")
    a = {};
  if (b === null || typeof b !== "object")
    b = {};
  for (k in b) {
    if (k in a) {
      i[k] = value_default(a[k], b[k]);
    } else {
      c2[k] = b[k];
    }
  }
  return function(t) {
    for (k in i)
      c2[k] = i[k](t);
    return c2;
  };
}

// node_modules/.pnpm/d3-interpolate@2.0.1/node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string_default(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i])
        s[i] += bs;
      else
        s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i])
        s[i] += bm;
      else
        s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({ i, x: number_default2(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i])
      s[i] += bs;
    else
      s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2)
      s[(o = q[i2]).i] = o.x(t);
    return s.join("");
  });
}

// node_modules/.pnpm/d3-interpolate@2.0.1/node_modules/d3-interpolate/src/value.js
function value_default(a, b) {
  var t = typeof b, c2;
  return b == null || t === "boolean" ? constant_default2(b) : (t === "number" ? number_default2 : t === "string" ? (c2 = color(b)) ? (b = c2, rgb_default) : string_default : b instanceof color ? rgb_default : b instanceof Date ? date_default : isNumberArray(b) ? numberArray_default : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object_default : number_default2)(a, b);
}

// node_modules/.pnpm/d3-interpolate@2.0.1/node_modules/d3-interpolate/src/round.js
function round_default(a, b) {
  return a = +a, b = +b, function(t) {
    return Math.round(a * (1 - t) + b * t);
  };
}

// node_modules/.pnpm/d3-interpolate@2.0.1/node_modules/d3-interpolate/src/transform/decompose.js
var degrees2 = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default(a, b, c2, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b))
    a /= scaleX, b /= scaleX;
  if (skewX = a * c2 + b * d)
    c2 -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c2 * c2 + d * d))
    c2 /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c2)
    a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees2,
    skewX: Math.atan(skewX) * degrees2,
    scaleX,
    scaleY
  };
}

// node_modules/.pnpm/d3-interpolate@2.0.1/node_modules/d3-interpolate/src/transform/parse.js
var svgNode;
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
  if (value == null)
    return identity;
  if (!svgNode)
    svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate()))
    return identity;
  value = value.matrix;
  return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}

// node_modules/.pnpm/d3-interpolate@2.0.1/node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse4, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i - 4, x: number_default2(xa, xb) }, { i: i - 2, x: number_default2(ya, yb) });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate2(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180)
        b += 360;
      else if (b - a > 180)
        a += 360;
      q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number_default2(a, b) });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number_default2(a, b) });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale2(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({ i: i - 4, x: number_default2(xa, xb) }, { i: i - 2, x: number_default2(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a, b) {
    var s = [], q = [];
    a = parse4(a), b = parse4(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate2(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale2(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n)
        s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

// node_modules/.pnpm/d3-interpolate@2.0.1/node_modules/d3-interpolate/src/cubehelix.js
function cubehelix2(hue2) {
  return function cubehelixGamma(y) {
    y = +y;
    function cubehelix3(start2, end) {
      var h = hue2((start2 = cubehelix(start2)).h, (end = cubehelix(end)).h), s = nogamma(start2.s, end.s), l = nogamma(start2.l, end.l), opacity = nogamma(start2.opacity, end.opacity);
      return function(t) {
        start2.h = h(t);
        start2.s = s(t);
        start2.l = l(Math.pow(t, y));
        start2.opacity = opacity(t);
        return start2 + "";
      };
    }
    cubehelix3.gamma = cubehelixGamma;
    return cubehelix3;
  }(1);
}
var cubehelix_default = cubehelix2(hue);
var cubehelixLong = cubehelix2(nogamma);

// node_modules/.pnpm/d3-timer@2.0.0/node_modules/d3-timer/src/timer.js
var frame = 0;
var timeout = 0;
var interval = 0;
var pokeDelay = 1e3;
var taskHead;
var taskTail;
var clockLast = 0;
var clockNow = 0;
var clockSkew = 0;
var clock = typeof performance === "object" && performance.now ? performance : Date;
var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay2, time) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay2 == null ? 0 : +delay2);
    if (!this._next && taskTail !== this) {
      if (taskTail)
        taskTail._next = this;
      else
        taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay2, time) {
  var t = new Timer();
  t.restart(callback, delay2, time);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0)
      t._call.call(null, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay2 = now2 - clockLast;
  if (delay2 > pokeDelay)
    clockSkew -= delay2, clockLast = now2;
}
function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time)
        time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}
function sleep(time) {
  if (frame)
    return;
  if (timeout)
    timeout = clearTimeout(timeout);
  var delay2 = time - clockNow;
  if (delay2 > 24) {
    if (time < Infinity)
      timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval)
      interval = clearInterval(interval);
  } else {
    if (!interval)
      clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

// node_modules/.pnpm/d3-timer@2.0.0/node_modules/d3-timer/src/timeout.js
function timeout_default(callback, delay2, time) {
  var t = new Timer();
  delay2 = delay2 == null ? 0 : +delay2;
  t.restart((elapsed) => {
    t.stop();
    callback(elapsed + delay2);
  }, delay2, time);
  return t;
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/schedule.js
var emptyOn = dispatch_default("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
function schedule_default(node, name, id2, index16, group2, timing) {
  var schedules = node.__transition;
  if (!schedules)
    node.__transition = {};
  else if (id2 in schedules)
    return;
  create(node, id2, {
    name,
    index: index16,
    group: group2,
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > CREATED)
    throw new Error("too late; already scheduled");
  return schedule;
}
function set3(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > STARTED)
    throw new Error("too late; already running");
  return schedule;
}
function get2(node, id2) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id2]))
    throw new Error("transition not found");
  return schedule;
}
function create(node, id2, self2) {
  var schedules = node.__transition, tween;
  schedules[id2] = self2;
  self2.timer = timer(schedule, 0, self2.time);
  function schedule(elapsed) {
    self2.state = SCHEDULED;
    self2.timer.restart(start2, self2.delay, self2.time);
    if (self2.delay <= elapsed)
      start2(elapsed - self2.delay);
  }
  function start2(elapsed) {
    var i, j, n, o;
    if (self2.state !== SCHEDULED)
      return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self2.name)
        continue;
      if (o.state === STARTED)
        return timeout_default(start2);
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id2) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }
    timeout_default(function() {
      if (self2.state === STARTED) {
        self2.state = RUNNING;
        self2.timer.restart(tick, self2.delay, self2.time);
        tick(elapsed);
      }
    });
    self2.state = STARTING;
    self2.on.call("start", node, node.__data__, self2.index, self2.group);
    if (self2.state !== STARTING)
      return;
    self2.state = STARTED;
    tween = new Array(n = self2.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self2.tween[i].value.call(node, node.__data__, self2.index, self2.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self2.duration ? self2.ease.call(null, elapsed / self2.duration) : (self2.timer.restart(stop), self2.state = ENDING, 1), i = -1, n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }
    if (self2.state === ENDING) {
      self2.on.call("end", node, node.__data__, self2.index, self2.group);
      stop();
    }
  }
  function stop() {
    self2.state = ENDED;
    self2.timer.stop();
    delete schedules[id2];
    for (var i in schedules)
      return;
    delete node.__transition;
  }
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/interrupt.js
function interrupt_default(node, name) {
  var schedules = node.__transition, schedule, active, empty2 = true, i;
  if (!schedules)
    return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) {
      empty2 = false;
      continue;
    }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }
  if (empty2)
    delete node.__transition;
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/selection/interrupt.js
function interrupt_default2(name) {
  return this.each(function() {
    interrupt_default(this, name);
  });
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/tween.js
function tweenRemove(id2, name) {
  var tween0, tween1;
  return function() {
    var schedule = set3(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction(id2, name, value) {
  var tween0, tween1;
  if (typeof value !== "function")
    throw new Error();
  return function() {
    var schedule = set3(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = { name, value }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n)
        tween1.push(t);
    }
    schedule.tween = tween1;
  };
}
function tween_default(name, value) {
  var id2 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get2(this.node(), id2).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
}
function tweenValue(transition2, name, value) {
  var id2 = transition2._id;
  transition2.each(function() {
    var schedule = set3(this, id2);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get2(node, id2).value[name];
  };
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/interpolate.js
function interpolate_default(a, b) {
  var c2;
  return (typeof b === "number" ? number_default2 : b instanceof color ? rgb_default : (c2 = color(b)) ? (b = c2, rgb_default) : string_default)(a, b);
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/attr.js
function attrRemove2(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS2(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS2(fullname, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null)
      return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS2(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null)
      return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attr_default2(name, value) {
  var fullname = namespace_default(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i, value));
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/attrTween.js
function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween_default(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  var fullname = namespace_default(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/delay.js
function delayFunction(id2, value) {
  return function() {
    init(this, id2).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id2, value) {
  return value = +value, function() {
    init(this, id2).delay = value;
  };
}
function delay_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get2(this.node(), id2).delay;
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/duration.js
function durationFunction(id2, value) {
  return function() {
    set3(this, id2).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id2, value) {
  return value = +value, function() {
    set3(this, id2).duration = value;
  };
}
function duration_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get2(this.node(), id2).duration;
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/ease.js
function easeConstant(id2, value) {
  if (typeof value !== "function")
    throw new Error();
  return function() {
    set3(this, id2).ease = value;
  };
}
function ease_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each(easeConstant(id2, value)) : get2(this.node(), id2).ease;
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/easeVarying.js
function easeVarying(id2, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function")
      throw new Error();
    set3(this, id2).ease = v;
  };
}
function easeVarying_default(value) {
  if (typeof value !== "function")
    throw new Error();
  return this.each(easeVarying(this._id, value));
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/filter.js
function filter_default2(match) {
  if (typeof match !== "function")
    match = matcher_default(match);
  for (var groups2 = this._groups, m = groups2.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group2 = groups2[j], n = group2.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group2[i]) && match.call(node, node.__data__, i, group2)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/merge.js
function merge_default2(transition2) {
  if (transition2._id !== this._id)
    throw new Error();
  for (var groups0 = this._groups, groups1 = transition2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/on.js
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0)
      t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction(id2, name, listener) {
  var on0, on1, sit = start(name) ? init : set3;
  return function() {
    var schedule = sit(this, id2), on = schedule.on;
    if (on !== on0)
      (on1 = (on0 = on).copy()).on(name, listener);
    schedule.on = on1;
  };
}
function on_default2(name, listener) {
  var id2 = this._id;
  return arguments.length < 2 ? get2(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/remove.js
function removeFunction(id2) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition)
      if (+i !== id2)
        return;
    if (parent)
      parent.removeChild(this);
  };
}
function remove_default2() {
  return this.on("end.remove", removeFunction(this._id));
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/select.js
function select_default2(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function")
    select = selector_default(select);
  for (var groups2 = this._groups, m = groups2.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group2 = groups2[j], n = group2.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group2[i]) && (subnode = select.call(node, node.__data__, i, group2))) {
        if ("__data__" in node)
          subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule_default(subgroup[i], name, id2, i, subgroup, get2(node, id2));
      }
    }
  }
  return new Transition(subgroups, this._parents, name, id2);
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/selectAll.js
function selectAll_default2(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function")
    select = selectorAll_default(select);
  for (var groups2 = this._groups, m = groups2.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group2 = groups2[j], n = group2.length, node, i = 0; i < n; ++i) {
      if (node = group2[i]) {
        for (var children2 = select.call(node, node.__data__, i, group2), child, inherit2 = get2(node, id2), k = 0, l = children2.length; k < l; ++k) {
          if (child = children2[k]) {
            schedule_default(child, name, id2, k, children2, inherit2);
          }
        }
        subgroups.push(children2);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name, id2);
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/selection.js
var Selection2 = selection_default.prototype.constructor;
function selection_default2() {
  return new Selection2(this._groups, this._parents);
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/style.js
function styleNull(name, interpolate) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove2(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
    if (value1 == null)
      string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove(id2, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
  return function() {
    var schedule = set3(this, id2), on = schedule.on, listener = schedule.value[key] == null ? remove2 || (remove2 = styleRemove2(name)) : void 0;
    if (on !== on0 || listener0 !== listener)
      (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule.on = on1;
  };
}
function style_default2(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
  return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove2(name)) : typeof value === "function" ? this.styleTween(name, styleFunction2(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant2(name, i, value), priority).on("end.style." + name, null);
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
function styleTween_default(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/text.js
function textConstant2(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction2(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function text_default2(value) {
  return this.tween("text", typeof value === "function" ? textFunction2(tweenValue(this, "text", value)) : textConstant2(value == null ? "" : value + ""));
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}
function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function textTween_default(value) {
  var key = "text";
  if (arguments.length < 1)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  return this.tween(key, textTween(value));
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/transition.js
function transition_default() {
  var name = this._name, id0 = this._id, id1 = newId();
  for (var groups2 = this._groups, m = groups2.length, j = 0; j < m; ++j) {
    for (var group2 = groups2[j], n = group2.length, node, i = 0; i < n; ++i) {
      if (node = group2[i]) {
        var inherit2 = get2(node, id0);
        schedule_default(node, name, id1, i, group2, {
          time: inherit2.time + inherit2.delay + inherit2.duration,
          delay: 0,
          duration: inherit2.duration,
          ease: inherit2.ease
        });
      }
    }
  }
  return new Transition(groups2, this._parents, name, id1);
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/end.js
function end_default() {
  var on0, on1, that = this, id2 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = { value: reject }, end = { value: function() {
      if (--size === 0)
        resolve();
    } };
    that.each(function() {
      var schedule = set3(this, id2), on = schedule.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });
    if (size === 0)
      resolve();
  });
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/transition/index.js
var id = 0;
function Transition(groups2, parents, name, id2) {
  this._groups = groups2;
  this._parents = parents;
  this._name = name;
  this._id = id2;
}
function transition(name) {
  return selection_default().transition(name);
}
function newId() {
  return ++id;
}
var selection_prototype = selection_default.prototype;
Transition.prototype = transition.prototype = {
  constructor: Transition,
  select: select_default2,
  selectAll: selectAll_default2,
  filter: filter_default2,
  merge: merge_default2,
  selection: selection_default2,
  transition: transition_default,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: on_default2,
  attr: attr_default2,
  attrTween: attrTween_default,
  style: style_default2,
  styleTween: styleTween_default,
  text: text_default2,
  textTween: textTween_default,
  remove: remove_default2,
  tween: tween_default,
  delay: delay_default,
  duration: duration_default,
  ease: ease_default,
  easeVarying: easeVarying_default,
  end: end_default,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};

// node_modules/.pnpm/d3-ease@2.0.0/node_modules/d3-ease/src/cubic.js
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/selection/transition.js
var defaultTiming = {
  time: null,
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit(node, id2) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id2])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id2} not found`);
    }
  }
  return timing;
}
function transition_default2(name) {
  var id2, timing;
  if (name instanceof Transition) {
    id2 = name._id, name = name._name;
  } else {
    id2 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }
  for (var groups2 = this._groups, m = groups2.length, j = 0; j < m; ++j) {
    for (var group2 = groups2[j], n = group2.length, node, i = 0; i < n; ++i) {
      if (node = group2[i]) {
        schedule_default(node, name, id2, i, group2, timing || inherit(node, id2));
      }
    }
  }
  return new Transition(groups2, this._parents, name, id2);
}

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/src/selection/index.js
selection_default.prototype.interrupt = interrupt_default2;
selection_default.prototype.transition = transition_default2;

// node_modules/.pnpm/d3-brush@2.1.0/node_modules/d3-brush/src/brush.js
var { abs, max: max2, min: min2 } = Math;
function number1(e) {
  return [+e[0], +e[1]];
}
function number2(e) {
  return [number1(e[0]), number1(e[1])];
}
var X = {
  name: "x",
  handles: ["w", "e"].map(type),
  input: function(x, e) {
    return x == null ? null : [[+x[0], e[0][1]], [+x[1], e[1][1]]];
  },
  output: function(xy) {
    return xy && [xy[0][0], xy[1][0]];
  }
};
var Y = {
  name: "y",
  handles: ["n", "s"].map(type),
  input: function(y, e) {
    return y == null ? null : [[e[0][0], +y[0]], [e[1][0], +y[1]]];
  },
  output: function(xy) {
    return xy && [xy[0][1], xy[1][1]];
  }
};
var XY = {
  name: "xy",
  handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(type),
  input: function(xy) {
    return xy == null ? null : number2(xy);
  },
  output: function(xy) {
    return xy;
  }
};
function type(t) {
  return { type: t };
}

// node_modules/.pnpm/d3-format@2.0.0/node_modules/d3-format/src/formatDecimal.js
function formatDecimal_default(x) {
  return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
}
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0)
    return null;
  var i, coefficient = x.slice(0, i);
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}

// node_modules/.pnpm/d3-format@2.0.0/node_modules/d3-format/src/exponent.js
function exponent_default(x) {
  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}

// node_modules/.pnpm/d3-format@2.0.0/node_modules/d3-format/src/formatGroup.js
function formatGroup_default(grouping, thousands) {
  return function(value, width) {
    var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
    while (i > 0 && g > 0) {
      if (length + g + 1 > width)
        g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width)
        break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t.reverse().join(thousands);
  };
}

// node_modules/.pnpm/d3-format@2.0.0/node_modules/d3-format/src/formatNumerals.js
function formatNumerals_default(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// node_modules/.pnpm/d3-format@2.0.0/node_modules/d3-format/src/formatSpecifier.js
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier)))
    throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype;
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};

// node_modules/.pnpm/d3-format@2.0.0/node_modules/d3-format/src/formatTrim.js
function formatTrim_default(s) {
  out:
    for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (s[i]) {
        case ".":
          i0 = i1 = i;
          break;
        case "0":
          if (i0 === 0)
            i0 = i;
          i1 = i;
          break;
        default:
          if (!+s[i])
            break out;
          if (i0 > 0)
            i0 = 0;
          break;
      }
    }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

// node_modules/.pnpm/d3-format@2.0.0/node_modules/d3-format/src/formatPrefixAuto.js
var prefixExponent;
function formatPrefixAuto_default(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d)
    return x + "";
  var coefficient = d[0], exponent = d[1], i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0];
}

// node_modules/.pnpm/d3-format@2.0.0/node_modules/d3-format/src/formatRounded.js
function formatRounded_default(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d)
    return x + "";
  var coefficient = d[0], exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

// node_modules/.pnpm/d3-format@2.0.0/node_modules/d3-format/src/formatTypes.js
var formatTypes_default = {
  "%": (x, p) => (x * 100).toFixed(p),
  "b": (x) => Math.round(x).toString(2),
  "c": (x) => x + "",
  "d": formatDecimal_default,
  "e": (x, p) => x.toExponential(p),
  "f": (x, p) => x.toFixed(p),
  "g": (x, p) => x.toPrecision(p),
  "o": (x) => Math.round(x).toString(8),
  "p": (x, p) => formatRounded_default(x * 100, p),
  "r": formatRounded_default,
  "s": formatPrefixAuto_default,
  "X": (x) => Math.round(x).toString(16).toUpperCase(),
  "x": (x) => Math.round(x).toString(16)
};

// node_modules/.pnpm/d3-format@2.0.0/node_modules/d3-format/src/identity.js
function identity_default2(x) {
  return x;
}

// node_modules/.pnpm/d3-format@2.0.0/node_modules/d3-format/src/locale.js
var map = Array.prototype.map;
var prefixes = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function locale_default(locale2) {
  var group2 = locale2.grouping === void 0 || locale2.thousands === void 0 ? identity_default2 : formatGroup_default(map.call(locale2.grouping, Number), locale2.thousands + ""), currencyPrefix = locale2.currency === void 0 ? "" : locale2.currency[0] + "", currencySuffix = locale2.currency === void 0 ? "" : locale2.currency[1] + "", decimal = locale2.decimal === void 0 ? "." : locale2.decimal + "", numerals = locale2.numerals === void 0 ? identity_default2 : formatNumerals_default(map.call(locale2.numerals, String)), percent = locale2.percent === void 0 ? "%" : locale2.percent + "", minus = locale2.minus === void 0 ? "\u2212" : locale2.minus + "", nan = locale2.nan === void 0 ? "NaN" : locale2.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero2 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type2 = specifier.type;
    if (type2 === "n")
      comma = true, type2 = "g";
    else if (!formatTypes_default[type2])
      precision === void 0 && (precision = 12), trim = true, type2 = "g";
    if (zero2 || fill === "0" && align === "=")
      zero2 = true, fill = "0", align = "=";
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type2) ? "0" + type2.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type2) ? percent : "";
    var formatType = formatTypes_default[type2], maybeSuffix = /[defgprs%]/.test(type2);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type2) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format2(value) {
      var valuePrefix = prefix, valueSuffix = suffix, i, n, c2;
      if (type2 === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim)
          value = formatTrim_default(value);
        if (valueNegative && +value === 0 && sign !== "+")
          valueNegative = false;
        valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type2 === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c2 = value.charCodeAt(i), 48 > c2 || c2 > 57) {
              valueSuffix = (c2 === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }
      if (comma && !zero2)
        value = group2(value, Infinity);
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      if (comma && zero2)
        value = group2(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format2.toString = function() {
      return specifier + "";
    };
    return format2;
  }
  function formatPrefix2(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3, k = Math.pow(10, -e), prefix = prefixes[8 + e / 3];
    return function(value2) {
      return f(k * value2) + prefix;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}

// node_modules/.pnpm/d3-format@2.0.0/node_modules/d3-format/src/defaultLocale.js
var locale;
var format;
var formatPrefix;
defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function defaultLocale(definition) {
  locale = locale_default(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

// node_modules/.pnpm/d3-format@2.0.0/node_modules/d3-format/src/precisionFixed.js
function precisionFixed_default(step) {
  return Math.max(0, -exponent_default(Math.abs(step)));
}

// node_modules/.pnpm/d3-format@2.0.0/node_modules/d3-format/src/precisionPrefix.js
function precisionPrefix_default(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3 - exponent_default(Math.abs(step)));
}

// node_modules/.pnpm/d3-format@2.0.0/node_modules/d3-format/src/precisionRound.js
function precisionRound_default(step, max3) {
  step = Math.abs(step), max3 = Math.abs(max3) - step;
  return Math.max(0, exponent_default(max3) - exponent_default(step)) + 1;
}

// node_modules/.pnpm/d3-random@2.2.2/node_modules/d3-random/src/defaultSource.js
var defaultSource_default = Math.random;

// node_modules/.pnpm/d3-random@2.2.2/node_modules/d3-random/src/uniform.js
var uniform_default = function sourceRandomUniform(source) {
  function randomUniform(min3, max3) {
    min3 = min3 == null ? 0 : +min3;
    max3 = max3 == null ? 1 : +max3;
    if (arguments.length === 1)
      max3 = min3, min3 = 0;
    else
      max3 -= min3;
    return function() {
      return source() * max3 + min3;
    };
  }
  randomUniform.source = sourceRandomUniform;
  return randomUniform;
}(defaultSource_default);

// node_modules/.pnpm/d3-random@2.2.2/node_modules/d3-random/src/int.js
var int_default = function sourceRandomInt(source) {
  function randomInt(min3, max3) {
    if (arguments.length < 2)
      max3 = min3, min3 = 0;
    min3 = Math.floor(min3);
    max3 = Math.floor(max3) - min3;
    return function() {
      return Math.floor(source() * max3 + min3);
    };
  }
  randomInt.source = sourceRandomInt;
  return randomInt;
}(defaultSource_default);

// node_modules/.pnpm/d3-random@2.2.2/node_modules/d3-random/src/normal.js
var normal_default = function sourceRandomNormal(source) {
  function randomNormal(mu, sigma) {
    var x, r;
    mu = mu == null ? 0 : +mu;
    sigma = sigma == null ? 1 : +sigma;
    return function() {
      var y;
      if (x != null)
        y = x, x = null;
      else
        do {
          x = source() * 2 - 1;
          y = source() * 2 - 1;
          r = x * x + y * y;
        } while (!r || r > 1);
      return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
    };
  }
  randomNormal.source = sourceRandomNormal;
  return randomNormal;
}(defaultSource_default);

// node_modules/.pnpm/d3-random@2.2.2/node_modules/d3-random/src/lcg.js
var mul = 1664525;
var inc = 1013904223;
var eps = 1 / 4294967296;
function lcg(seed = Math.random()) {
  let state = (0 <= seed && seed < 1 ? seed / eps : Math.abs(seed)) | 0;
  return () => (state = mul * state + inc | 0, eps * (state >>> 0));
}

// node_modules/.pnpm/d3-scale@3.3.0/node_modules/d3-scale/src/init.js
function initRange(domain, range2) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range2).domain(domain);
      break;
  }
  return this;
}

// node_modules/.pnpm/d3-scale@3.3.0/node_modules/d3-scale/src/constant.js
function constants(x) {
  return function() {
    return x;
  };
}

// node_modules/.pnpm/d3-scale@3.3.0/node_modules/d3-scale/src/number.js
function number(x) {
  return +x;
}

// node_modules/.pnpm/d3-scale@3.3.0/node_modules/d3-scale/src/continuous.js
var unit = [0, 1];
function identity2(x) {
  return x;
}
function normalize(a, b) {
  return (b -= a = +a) ? function(x) {
    return (x - a) / b;
  } : constants(isNaN(b) ? NaN : 0.5);
}
function clamper(a, b) {
  var t;
  if (a > b)
    t = a, a = b, b = t;
  return function(x) {
    return Math.max(a, Math.min(b, x));
  };
}
function bimap(domain, range2, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range2[0], r1 = range2[1];
  if (d1 < d0)
    d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else
    d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x) {
    return r0(d0(x));
  };
}
function polymap(domain, range2, interpolate) {
  var j = Math.min(domain.length, range2.length) - 1, d = new Array(j), r = new Array(j), i = -1;
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range2 = range2.slice().reverse();
  }
  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range2[i], range2[i + 1]);
  }
  return function(x) {
    var i2 = bisect_default(domain, x, 1, j) - 1;
    return r[i2](d[i2](x));
  };
}
function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer() {
  var domain = unit, range2 = unit, interpolate = value_default, transform2, untransform, unknown, clamp = identity2, piecewise, output, input;
  function rescale() {
    var n = Math.min(domain.length, range2.length);
    if (clamp !== identity2)
      clamp = clamper(domain[0], domain[n - 1]);
    piecewise = n > 2 ? polymap : bimap;
    output = input = null;
    return scale2;
  }
  function scale2(x) {
    return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform2), range2, interpolate)))(transform2(clamp(x)));
  }
  scale2.invert = function(y) {
    return clamp(untransform((input || (input = piecewise(range2, domain.map(transform2), number_default2)))(y)));
  };
  scale2.domain = function(_) {
    return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
  };
  scale2.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), rescale()) : range2.slice();
  };
  scale2.rangeRound = function(_) {
    return range2 = Array.from(_), interpolate = round_default, rescale();
  };
  scale2.clamp = function(_) {
    return arguments.length ? (clamp = _ ? true : identity2, rescale()) : clamp !== identity2;
  };
  scale2.interpolate = function(_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };
  scale2.unknown = function(_) {
    return arguments.length ? (unknown = _, scale2) : unknown;
  };
  return function(t, u) {
    transform2 = t, untransform = u;
    return rescale();
  };
}
function continuous() {
  return transformer()(identity2, identity2);
}

// node_modules/.pnpm/d3-scale@3.3.0/node_modules/d3-scale/src/tickFormat.js
function tickFormat(start2, stop, count, specifier) {
  var step = tickStep(start2, stop, count), precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start2), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix_default(step, value)))
        specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound_default(step, Math.max(Math.abs(start2), Math.abs(stop)))))
        specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed_default(step)))
        specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

// node_modules/.pnpm/d3-scale@3.3.0/node_modules/d3-scale/src/linear.js
function linearish(scale2) {
  var domain = scale2.domain;
  scale2.ticks = function(count) {
    var d = domain();
    return ticks_default(d[0], d[d.length - 1], count == null ? 10 : count);
  };
  scale2.tickFormat = function(count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };
  scale2.nice = function(count) {
    if (count == null)
      count = 10;
    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start2 = d[i0];
    var stop = d[i1];
    var prestep;
    var step;
    var maxIter = 10;
    if (stop < start2) {
      step = start2, start2 = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    while (maxIter-- > 0) {
      step = tickIncrement(start2, stop, count);
      if (step === prestep) {
        d[i0] = start2;
        d[i1] = stop;
        return domain(d);
      } else if (step > 0) {
        start2 = Math.floor(start2 / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start2 = Math.ceil(start2 * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }
    return scale2;
  };
  return scale2;
}
function linear2() {
  var scale2 = continuous();
  scale2.copy = function() {
    return copy(scale2, linear2());
  };
  initRange.apply(scale2, arguments);
  return linearish(scale2);
}

// node_modules/.pnpm/d3-scale-chromatic@2.0.0/node_modules/d3-scale-chromatic/src/colors.js
function colors_default(specifier) {
  var n = specifier.length / 6 | 0, colors = new Array(n), i = 0;
  while (i < n)
    colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
  return colors;
}

// node_modules/.pnpm/d3-scale-chromatic@2.0.0/node_modules/d3-scale-chromatic/src/sequential-multi/rainbow.js
var warm = cubehelixLong(cubehelix(-100, 0.75, 0.35), cubehelix(80, 1.5, 0.8));
var cool = cubehelixLong(cubehelix(260, 0.75, 0.35), cubehelix(80, 1.5, 0.8));
var c = cubehelix();
function rainbow_default(t) {
  if (t < 0 || t > 1)
    t -= Math.floor(t);
  var ts = Math.abs(t - 0.5);
  c.h = 360 * t - 100;
  c.s = 1.5 - 1.5 * ts;
  c.l = 0.8 - 0.9 * ts;
  return c + "";
}

// node_modules/.pnpm/d3-scale-chromatic@2.0.0/node_modules/d3-scale-chromatic/src/sequential-multi/viridis.js
function ramp(range2) {
  var n = range2.length;
  return function(t) {
    return range2[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}
var viridis_default = ramp(colors_default("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
var magma = ramp(colors_default("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
var inferno = ramp(colors_default("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
var plasma = ramp(colors_default("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));

// node_modules/.pnpm/d3-zoom@2.0.0/node_modules/d3-zoom/src/transform.js
function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}
Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x) {
    return x * this.k + this.x;
  },
  applyY: function(y) {
    return y * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x) {
    return (x - this.x) / this.k;
  },
  invertY: function(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var identity3 = new Transform(1, 0, 0);
transform.prototype = Transform.prototype;
function transform(node) {
  while (!node.__zoom)
    if (!(node = node.parentNode))
      return identity3;
  return node.__zoom;
}

// src/utils/MathUtils.js
function randFloat(min3 = 0, max3 = 1) {
  return Math.random() * (max3 - min3) + min3;
}
function choose(array) {
  const index16 = int_default(0, array.length)();
  return array[index16];
}
function clipValue(value, minValue, maxValue) {
  return Math.max(minValue, Math.min(maxValue, value));
}
function roundToNDecimals(number3, n) {
  return +number3.toFixed(n);
}
function swapSoSmallerFirst(x, y) {
  if (x <= y) {
    return [x, y];
  }
  return [y, x];
}
function countOnesOfBinary(integer) {
  let count = 0;
  while (integer !== 0) {
    integer = integer & integer - 1;
    count++;
  }
  return count;
}
function findLocalMaxima(array) {
  if (array.length <= 1) {
    return [];
  }
  if (array.length === 2) {
    if (array[0] > array[1]) {
      return [0];
    }
    if (array[1] > array[0]) {
      return [1];
    }
    return [];
  }
  const maximaIndices = [];
  if (array[0] > array[1]) {
    maximaIndices.push(0);
  }
  let last = array[0];
  let current = array[1];
  for (let index16 = 1; index16 < array.length - 1; index16++) {
    const next = array[index16 + 1];
    if (current > last && current > next) {
      maximaIndices.push(index16);
    }
    last = current;
    current = next;
  }
  const lastIndex = array.length - 1;
  if (array[lastIndex] > array[lastIndex - 1]) {
    maximaIndices.push(array.length - 1);
  }
  return maximaIndices;
}

// src/types/NoteArray.js
var NoteArray = class {
  constructor(notes = [], reUseNotes = false) {
    if (reUseNotes) {
      this._notes = notes;
    } else {
      this._notes = notes.map((d) => {
        if (d.string !== void 0 && d.fret !== void 0) {
          return GuitarNote_default.from(d);
        }
        return Note_default.from(d);
      });
    }
  }
  getNotes() {
    return this._notes;
  }
  setNotes(notes) {
    this._notes = notes;
    return this;
  }
  *[Symbol.iterator]() {
    for (const note2 of this._notes) {
      yield note2;
    }
  }
  addNotes(notes, sort = true) {
    this._notes = [...this._notes, ...notes];
    if (sort) {
      this.sortByTime();
    }
    return this;
  }
  concat(noteArray) {
    this._notes = [...this._notes, ...noteArray._notes];
    return this;
  }
  append(noteArray, gap = 0) {
    const duration = this.getDuration();
    const clone = noteArray.clone();
    clone.shiftTime(duration + gap);
    this._notes = [...this._notes, ...clone._notes];
    this.sortByTime();
    return this;
  }
  repeat(times) {
    const result = this.clone();
    if (times < 1) {
      return new NoteArray();
    }
    if (times === 1) {
      return result;
    }
    const copy2 = this.clone();
    const duration = this.getDuration();
    for (let index16 = 1; index16 < times; index16++) {
      copy2.shiftTime(duration);
      result.concat(copy2);
    }
    return result;
  }
  length() {
    return this._notes.length;
  }
  getStartTime() {
    return min(this._notes, (d) => d.start);
  }
  getDuration() {
    let duration = 0;
    for (const note2 of this._notes) {
      const noteEnd = note2.end === null ? note2.start : note2.end;
      if (noteEnd > duration) {
        duration = noteEnd;
      }
    }
    return duration;
  }
  scaleTime(factor) {
    this._notes = this._notes.map((n) => n.scaleTime(factor));
    return this;
  }
  shiftTime(addedSeconds) {
    this._notes = this._notes.map((n) => n.shiftTime(addedSeconds));
    return this;
  }
  shiftToStartAt(startTime) {
    this.sortByTime();
    const firstNoteStart = this._notes[0].start;
    const offset = firstNoteStart - startTime;
    this._notes.forEach((n) => {
      n.start -= offset;
      if (n.end !== null) {
        n.end -= offset;
      }
    });
    return this;
  }
  forEach(func) {
    this._notes.forEach((element, index16, array) => func(element, index16, array));
    return this;
  }
  sort(sortFunction) {
    this._notes = this._notes.sort(sortFunction);
    return this;
  }
  sortByTime() {
    this._notes = this._notes.sort((a, b) => a.start - b.start);
    return this;
  }
  map(mapFunction) {
    this._notes = this._notes.map((element, index16, array) => mapFunction(element, index16, array));
    return this;
  }
  slice(start2, end) {
    this._notes = this._notes.slice(start2, end);
    return this;
  }
  sliceTime(startTime, endTime, mode2 = "contained") {
    const start2 = startTime;
    const end = endTime;
    let filterFunc;
    if (mode2 === "start") {
      filterFunc = (n) => n.start >= start2 && n.start < end;
    } else if (mode2 === "end") {
      filterFunc = (n) => n.end !== null && n.end >= start2 && n.end < end;
    } else if (mode2 === "contained") {
      filterFunc = (n) => n.end !== null && n.start >= start2 && n.end < end;
    } else if (mode2 === "touched") {
      filterFunc = (n) => n.start >= start2 && n.start <= end || n.end !== null && n.end >= start2 && n.end <= end;
    } else if (mode2 === "touched-included") {
      filterFunc = (n) => n.start >= start2 && n.start <= end || n.end !== null && n.end >= start2 && n.end <= end || n.end !== null && n.start <= start2 && n.end >= end;
    } else {
      throw new Error("Invalid slicing mode");
    }
    this._notes = this._notes.filter(filterFunc);
    return this;
  }
  sliceAtTimes(times, mode2, reUseNotes = false) {
    if (times.length === 0) {
      return [this._notes];
    }
    const duration = this.getDuration();
    if (Math.max(...times) <= duration) {
      times.push(duration + 1);
    }
    const slices = [];
    let lastTime = 0;
    for (const time of times) {
      slices.push(new NoteArray(this._notes, reUseNotes).sliceTime(lastTime, time, mode2).getNotes());
      lastTime = time;
    }
    return slices;
  }
  segmentAtGaps(gapDuration, mode2) {
    if (this._notes.length < 2) {
      return [this._notes];
    }
    if (mode2 === "start-start") {
      const notes = this.clone().sortByTime().getNotes();
      const cuts = [];
      for (let index16 = 1; index16 < notes.length; index16++) {
        if (notes[index16].start - notes[index16 - 1].start >= gapDuration) {
          cuts.push(notes[index16].start);
        }
      }
      return this.sliceAtTimes(cuts, "start");
    } else {
      const occupiedTimes = [];
      for (const note2 of this._notes) {
        const { start: start2, end } = note2;
        const collisions = [];
        for (let index16 = 0; index16 < occupiedTimes.length; index16++) {
          const [s, e] = occupiedTimes[index16];
          if (s >= start2 && s <= end || e >= start2 && e <= end) {
            occupiedTimes.splice(index16, 1);
            collisions.push([s, e]);
          }
        }
        if (collisions.length === 0) {
          occupiedTimes.push([start2, end]);
        } else {
          const newStart = Math.min(start2, ...collisions.map((d) => d[0]));
          const newEnd = Math.max(end, ...collisions.map((d) => d[1]));
          occupiedTimes.push([newStart, newEnd]);
        }
      }
      if (occupiedTimes.length === 1) {
        return [this._notes];
      }
      const cuts = [];
      for (let index16 = 1; index16 < occupiedTimes.length; index16++) {
        const currentStart = occupiedTimes[index16][0];
        const lastEnd = occupiedTimes[index16 - 1][1];
        if (currentStart - lastEnd >= gapDuration) {
          cuts.push(currentStart);
        }
      }
      return this.sliceAtTimes(cuts, "start");
    }
  }
  segmentAtIndices(indices) {
    const segments = [];
    let lastIndex = 0;
    for (const index16 of indices) {
      segments.push(this._notes.slice(lastIndex, index16));
      lastIndex = index16;
    }
    return segments;
  }
  filter(filterFunction) {
    this._notes = this._notes.filter((element, index16, array) => filterFunction(element, index16, array));
    return this;
  }
  filterPitches(pitches) {
    if (!(pitches instanceof Set)) {
      pitches = new Set(pitches);
    }
    this._notes = this._notes.filter((n) => pitches.has(n.pitch));
    return this;
  }
  transpose(steps) {
    this._notes = this._notes.map((n) => Note_default.from({
      ...n,
      pitch: clipValue(n.pitch + steps, 0, 127)
    }));
    return this;
  }
  removeOctaves() {
    this._notes = this._notes.map((note2) => Note_default.from({
      ...note2,
      pitch: note2.pitch % 12
    }));
    return this;
  }
  reverse() {
    const duration = this.getDuration();
    this._notes = this._notes.map((n) => {
      const newNote = n.clone();
      newNote.start = duration - n.end;
      newNote.end = newNote.start + n.getDuration();
      return newNote;
    });
    this.sortByTime();
    return this;
  }
  equals(otherNoteArray) {
    if (!(otherNoteArray instanceof NoteArray)) {
      return false;
    }
    const notes = otherNoteArray.getNotes();
    if (this._notes.length !== notes.length) {
      return false;
    }
    for (const [index16, note2] of notes.entries()) {
      if (!this._notes[index16].equals(note2)) {
        return false;
      }
    }
    return true;
  }
  clone() {
    return new NoteArray(this._notes);
  }
};
var NoteArray_default = NoteArray;

// src/utils/ArrayUtils.js
function arrayShallowEquals(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  for (const [index16, element] of a.entries()) {
    if (element !== b[index16]) {
      return false;
    }
  }
  return true;
}
function arrayHasSameElements(a, b, checkLength = true) {
  if (checkLength && a.length !== b.length) {
    return false;
  }
  const setA = new Set(a);
  const setB = new Set(b);
  for (const element of setA) {
    if (!setB.has(element)) {
      return false;
    }
  }
  for (const element of setB) {
    if (!setA.has(element)) {
      return false;
    }
  }
  return true;
}
function jaccardIndex(set1, set22) {
  if (set1.length === 0 && set22.length === 0) {
    return 1;
  }
  return intersection(set1, set22).size / union(set1, set22).size;
}
function kendallTau(ranking1, ranking2, normalize2 = true) {
  if (ranking1.length !== ranking2.length) {
    throw new Error("Ranking length must be equal");
  }
  if (ranking1.length === 0) {
    return 0;
  }
  let inversions = 0;
  const n = ranking1.length;
  for (let a = 0; a < n; a++) {
    for (let b = a + 1; b < n; b++) {
      const r1smaller = ranking1[a] < ranking1[b];
      const r2smaller = ranking2[a] < ranking2[b];
      if (r1smaller !== r2smaller) {
        inversions++;
      }
    }
  }
  if (normalize2) {
    inversions /= n * (n - 1) / 2;
  }
  return inversions;
}
function removeDuplicates(array) {
  return [...new Set(array)];
}
function arrayContainsArray(a, b) {
  if (a.length < b.length) {
    return false;
  }
  for (const [index16, element] of b.entries()) {
    if (a[index16] !== element) {
      return false;
    }
  }
  return true;
}
function arraySlicesEqual(a, b, length, startA = 0, startB = 0) {
  if (length === null || length === void 0) {
    throw new Error("undefined length");
  }
  if (startA < 0 || startB < 0) {
    throw new Error("start < 0");
  }
  if (a.length < startA + length || b.length < startB + length) {
    return false;
  }
  for (let offset = 0; offset < length; offset++) {
    if (a[startA + offset] !== b[startB + offset]) {
      return false;
    }
  }
  return true;
}
function arrayIndexOf(haystack, needle, startIndex = 0) {
  if (needle.length === 0) {
    return -1;
  }
  for (let index16 = startIndex; index16 < haystack.length - needle.length + 1; ++index16) {
    if (haystack[index16] === needle[0]) {
      let found = true;
      for (let offset = 1; offset < needle.length; ++offset) {
        if (haystack[index16 + offset] !== needle[offset]) {
          found = false;
          break;
        }
      }
      if (found) {
        return index16;
      }
    }
  }
  return -1;
}
function getArrayMax(array) {
  return max(array.flat(Number.POSITIVE_INFINITY));
}
function normalizeNdArray(array) {
  const max3 = max(array.flat(Number.POSITIVE_INFINITY));
  const normalize2 = (array_, maxValue) => array_.map((d) => {
    return d.length !== void 0 ? normalize2(d, maxValue) : d / maxValue;
  });
  return normalize2(array, max3);
}
function euclideanDistance(matrixA, matrixB) {
  const valuesA = matrixA.flat();
  const valuesB = matrixB.flat();
  const diffs = valuesA.map((d, i) => d - valuesB[i]);
  return Math.hypot(...diffs);
}
function formatMatrix(matrix, colSeparator = ", ", rowSeparator = "\n", formatter) {
  if (!matrix || matrix.length === 0) {
    return "";
  }
  if (formatter) {
    matrix = matrix.map((row) => row.map((value) => formatter(value)));
  }
  return matrix.map((row) => row.join(colSeparator)).join(rowSeparator);
}
function binarySearch(array, value, accessor = (d) => d) {
  if (array.length <= 3) {
    let closest = null;
    let diff = Number.POSITIVE_INFINITY;
    for (const element of array) {
      const value_ = accessor(element);
      const diff2 = Math.abs(value - value_);
      if (diff2 < diff) {
        closest = element;
        diff = diff2;
      }
    }
    return closest;
  }
  const pivotPosition = Math.floor(array.length / 2);
  const pivotElement = array[pivotPosition];
  const pivotValue = accessor(pivotElement);
  if (value === pivotValue) {
    return pivotElement;
  }
  if (value < pivotValue) {
    return binarySearch(array.slice(0, pivotPosition + 1), value, accessor);
  }
  if (value > pivotValue) {
    return binarySearch(array.slice(pivotPosition - 1), value, accessor);
  }
}
function findStreaks(values, accessor = (d) => d, equality = (a, b) => a === b) {
  let startIndex = 0;
  const result = [];
  let startValue = accessor(values[0]);
  for (const [index16, value] of values.entries()) {
    const v = accessor(value);
    if (!equality(startValue, v)) {
      result.push({
        startIndex,
        endIndex: index16 - 1,
        length: index16 - startIndex
      });
      startIndex = index16;
      startValue = v;
    }
  }
  if (values.length > 0) {
    result.push({
      startIndex,
      endIndex: values.length - 1,
      length: values.length - startIndex
    });
  }
  return result;
}
function findRepeatedIndices(sequence, equals = (a, b) => a === b) {
  return sequence.map((element) => {
    for (const [index22, element2] of sequence.entries()) {
      if (equals(element, element2)) {
        return index22;
      }
    }
    return null;
  });
}

// src/types/Recording.js
var Recording = class extends NoteArray_default {
  constructor(name, date, notes, speed = 1, selectedTrack = 0, timeSelection = null, comment = "") {
    super(notes);
    this.name = name;
    this.date = date;
    this.dateString = date.toISOString().slice(0, 19).replace("T", " ");
    this.speed = +speed;
    this.selectedTrack = +selectedTrack;
    this.timeSelection = timeSelection;
    this.comment = comment;
    this.sortByTime();
  }
  clone() {
    return new Recording(this.name, this.date, this.getNotes().map((d) => d.clone()), this.speed, this.selectedTrack, this.timeSelection === null ? null : [...this.timeSelection], this.comment);
  }
  equals(otherRecording) {
    if (!(otherRecording instanceof Recording)) {
      return false;
    }
    if (this.name !== otherRecording.name) {
      return false;
    }
    if (this.date.getTime() !== otherRecording.date.getTime()) {
      return false;
    }
    if (this.speed !== otherRecording.speed) {
      return false;
    }
    if (this.selectedTrack !== otherRecording.selectedTrack) {
      return false;
    }
    if (this.timeSelection !== otherRecording.timeSelection) {
      if (this.timeSelection === null || otherRecording.timeSelection === null) {
        return false;
      }
      if (!arrayShallowEquals(this.timeSelection, otherRecording.timeSelection)) {
        return false;
      }
    }
    const notes1 = this.getNotes();
    const notes2 = otherRecording.getNotes();
    if (notes1.length !== notes2.length) {
      return false;
    }
    for (const [index16, element] of notes1.entries()) {
      if (!element.equals(notes2[index16])) {
        return false;
      }
    }
    if (this.comment !== otherRecording.comment) {
      return false;
    }
    return true;
  }
  toSimpleObject() {
    return {
      name: this.name,
      date: this.date,
      notes: this.getNotes(),
      speed: this.speed,
      selectedTrack: this.selectedTrack,
      timeSelection: this.timeSelection,
      comment: this.comment
    };
  }
  static from(object) {
    let { name, date, notes } = object;
    const values = [name, date, notes];
    const names2 = ["name", "date", "notes"];
    for (const [index16, value] of values.entries()) {
      if (value === void 0 || value === null) {
        throw new Error(`Cannot create Recording with undefined ${names2[index16]}`);
      }
    }
    if (typeof date === "string") {
      date = new Date(Date.parse(date));
    }
    const { speed, selectedTrack, timeSelection, comment } = object;
    return new Recording(name, date, notes, speed, selectedTrack, timeSelection, comment);
  }
};
var Recording_default = Recording;

// src/types/MusicPiece.js
var midiParser = __toESM(require_main(), 1);

// src/fileFormats/MusicXmlParser.js
var ROUNDING_PRECISION = 5;
function preprocessMusicXmlData(xml, log = false) {
  if (log) {
    console.groupCollapsed("[MusicXmlParser] Parsing MusicXML");
    console.log(xml);
  }
  const partNameElements = xml.querySelectorAll("part-name");
  const instruments = xml.querySelectorAll("score-instrument");
  const partNames = [];
  const instrumentNames = [];
  for (const p of partNameElements) {
    partNames.push(p.innerHTML);
  }
  for (const index16 of instruments) {
    instrumentNames.push(index16.children[0].innerHTML);
  }
  const drumInstrumentMap = getDrumInstrumentMap(xml);
  const parts = xml.querySelectorAll("part");
  const parsedParts = [];
  for (const part of parts) {
    parsedParts.push(preprocessMusicXmlPart(part, drumInstrumentMap));
  }
  const result = {
    parts: parsedParts,
    partNames,
    instruments: instrumentNames,
    totalTime: max(parsedParts, (d) => d.totalTime)
  };
  if (log) {
    console.log(result);
    console.groupEnd();
  }
  return result;
}
function preprocessMusicXmlPart(part, drumInstrumentMap) {
  part = handleStaveAndTab(part);
  let measures = part.children;
  measures = duplicateRepeatedMeasures(measures);
  const xmlNotes = part.querySelectorAll("note");
  const xmlNoteIndexMap = new Map([...xmlNotes].map((d, i) => [d, i]));
  const xmlNoteIndices = [];
  let currentTime = 0;
  let divisions;
  let tempo = 120;
  let beats = 4;
  let beatType = 4;
  const defaultVelocity = 90;
  const velocityFactor = 64 / 71;
  let velocity = Math.round(defaultVelocity * velocityFactor);
  const tempoChanges = [];
  const beatTypeChanges = [];
  const keySignatureChanges = [];
  const noteObjs = [];
  const measureRehearsalMap = /* @__PURE__ */ new Map();
  const noteLyricsMap = /* @__PURE__ */ new Map();
  const measureLinePositions = [];
  const measureIndices = [];
  for (const measure of measures) {
    const currentTimeRounded = roundToNDecimals(currentTime, ROUNDING_PRECISION);
    try {
      const soundElements = measure.querySelectorAll("sound");
      for (const element of soundElements) {
        const tempoValue = element.getAttribute("tempo");
        if (tempoValue !== null) {
          tempo = roundToNDecimals(+tempoValue, 3);
          tempoChanges.push({
            time: currentTimeRounded,
            tempo
          });
        }
        break;
      }
    } catch {
    }
    try {
      divisions = +measure.querySelectorAll("divisions")[0].innerHTML;
    } catch {
    }
    try {
      beats = +measure.querySelectorAll("beats")[0].innerHTML;
      beatType = +measure.querySelectorAll("beat-type")[0].innerHTML;
      beatTypeChanges.push({
        time: currentTimeRounded,
        beats,
        beatType
      });
    } catch {
    }
    const secondsPerBeat = 1 / (tempo / 60);
    try {
      const fifths = +measure.querySelectorAll("fifths")[0].innerHTML;
      const { key, scale: scale2 } = keySignatureMap.get(fifths);
      keySignatureChanges.push({
        time: currentTimeRounded,
        key,
        scale: scale2
      });
    } catch {
    }
    if (measure.querySelectorAll("note").length === 0) {
      const measureDuration = beats * (beatType / 4) * secondsPerBeat;
      currentTime += measureDuration;
    }
    let lastNoteDuration = 0;
    for (const child of measure.children) {
      if (child.nodeName === "backup") {
        const duration = +child.querySelectorAll("duration")[0].innerHTML;
        const durationInSeconds = getDurationInSeconds(duration, divisions, secondsPerBeat);
        currentTime -= durationInSeconds;
      } else if (child.nodeName === "forward") {
        const duration = +child.querySelectorAll("duration")[0].innerHTML;
        const durationInSeconds = getDurationInSeconds(duration, divisions, secondsPerBeat);
        currentTime += durationInSeconds;
      } else if (child.nodeName === "direction") {
        for (const direction of child.children) {
          if (direction.nodeName === "sound" && direction.getAttribute("dynamics")) {
            velocity = Math.round(velocityFactor * +direction.getAttribute("dynamics"));
          }
          if (child.querySelectorAll("rehearsal").length > 0) {
            const rehearsals = child.querySelectorAll("rehearsal");
            const marks = [];
            for (const r of rehearsals) {
              if (r.textContent !== "") {
                marks.push(r.textContent);
              }
            }
            if (marks.length > 0) {
              let text = marks.join(" ");
              const measureIndex = measureIndices.length;
              if (measureRehearsalMap.has(measureIndex)) {
                const oldText = measureRehearsalMap.get(measureIndex);
                text = `${oldText} ${text}`;
              }
              measureRehearsalMap.set(measureIndex, text);
            }
          }
        }
      } else if (child.nodeName === "note") {
        const note2 = child;
        try {
          let durationInSeconds;
          if (note2.querySelectorAll("grace").length > 0) {
            const type2 = note2.querySelectorAll("type").textContent;
            if (type2 === "64th") {
              durationInSeconds = secondsPerBeat / 16;
            } else if (type2 === "32nd") {
              durationInSeconds = secondsPerBeat / 8;
            } else if (type2 === "16th") {
              durationInSeconds = secondsPerBeat / 4;
            } else if (type2 === "eighth") {
              durationInSeconds = secondsPerBeat / 2;
            } else if (type2 === "quarter") {
              durationInSeconds = secondsPerBeat;
            } else if (type2 === "half") {
              durationInSeconds = secondsPerBeat * 2;
            } else {
              durationInSeconds = 0.01;
            }
          } else {
            const duration = +note2.querySelectorAll("duration")[0].innerHTML;
            durationInSeconds = getDurationInSeconds(duration, divisions, secondsPerBeat);
          }
          const isRest = note2.querySelectorAll("rest").length > 0;
          if (isRest) {
            currentTime += durationInSeconds;
            continue;
          }
          const isUnpitched = note2.querySelectorAll("unpitched").length > 0;
          let pitch;
          if (isUnpitched) {
            const instrumentId = note2.querySelectorAll("instrument")[0].id;
            pitch = drumInstrumentMap.get(part.id).get(instrumentId);
          } else {
            const alter = +(note2.querySelectorAll("alter")[0]?.innerHTML ?? 0);
            const step = note2.querySelectorAll("step")[0].innerHTML;
            const octave = +note2.querySelectorAll("octave")[0].innerHTML;
            pitch = getMidiNoteByNameAndOctave(step, octave).pitch + alter;
          }
          const dynamicsTag = note2.querySelectorAll("dynamics")[0]?.children[0];
          if (dynamicsTag) {
            velocity = dynamicsMap.get(dynamicsTag.nodeName);
          }
          const isChord = note2.querySelectorAll("chord").length > 0;
          if (isChord) {
            currentTime -= lastNoteDuration;
          }
          const tieElement = note2.querySelectorAll("tie")[0];
          if (tieElement && tieElement.getAttribute("type") === "stop") {
            const noteEnd = currentTime + durationInSeconds;
            for (let index16 = noteObjs.length - 1; index16 > 0; index16--) {
              const noteObject = noteObjs[index16];
              if (noteObject.pitch === pitch) {
                noteObject.end = noteEnd;
                const lyrics = getLyricsFromNote(note2);
                if (lyrics.length > 0) {
                  const oldLyrics = noteLyricsMap.get(index16) ?? "";
                  const newLyrics = `${oldLyrics} ${lyrics}`;
                  noteLyricsMap.set(index16, newLyrics);
                }
                xmlNoteIndices[index16].push(xmlNoteIndexMap.get(note2));
                break;
              }
            }
          } else {
            xmlNoteIndices.push([xmlNoteIndexMap.get(note2)]);
            const staff = +(note2.querySelectorAll("staff")[0]?.innerHTML ?? 1);
            const startTime = roundToNDecimals(currentTime, ROUNDING_PRECISION);
            const endTime = roundToNDecimals(currentTime + durationInSeconds, ROUNDING_PRECISION);
            let string = null;
            let fret = null;
            try {
              fret = +note2.querySelectorAll("fret")[0].innerHTML;
              string = +note2.querySelectorAll("string")[0].innerHTML;
            } catch {
            }
            if (string !== null && fret !== null) {
              noteObjs.push(new GuitarNote_default(pitch, startTime, velocity, string, endTime, string, fret));
            } else {
              noteObjs.push(new Note_default(pitch, startTime, velocity, staff - 1, endTime));
            }
            const lyrics = getLyricsFromNote(note2);
            if (lyrics.length > 0) {
              noteLyricsMap.set(noteObjs.length - 1, lyrics);
            }
          }
          lastNoteDuration = durationInSeconds;
          currentTime += durationInSeconds;
        } catch (error) {
          console.warn("[MusicXmlParser] Cannot parse MusicXML note", error, note2);
        }
      }
    }
    measureLinePositions.push(roundToNDecimals(currentTime, ROUNDING_PRECISION));
    measureIndices.push(noteObjs.length);
  }
  if (tempoChanges.length === 0 || tempoChanges[0].time > 0) {
    tempoChanges.unshift({ tempo: 120, time: 0 });
  }
  if (beatTypeChanges.length === 0 || beatTypeChanges[0].time > 0) {
    beatTypeChanges.unshift({ beats: 4, beatType: 4, time: 0 });
  }
  if (keySignatureChanges.length === 0 || keySignatureChanges[0].time > 0) {
    keySignatureChanges.unshift({ key: "C", scale: "major", time: 0 });
  }
  const result = {
    noteObjs,
    totalTime: currentTime,
    measureLinePositions,
    measureIndices,
    measureRehearsalMap,
    xmlNoteIndices,
    tempoChanges,
    beatTypeChanges,
    keySignatureChanges,
    tuning: getTuningPitches(measures),
    noteLyricsMap
  };
  return result;
}
function getLyricsFromNote(note2) {
  const lyric = note2.querySelectorAll("lyric");
  const texts = [];
  for (const l of lyric) {
    texts.push(l.querySelectorAll("text")[0].textContent);
  }
  const text = texts.join(" ");
  return text;
}
function getDurationInSeconds(duration, divisions, secondsPerBeat) {
  const durationInBeats = duration / divisions;
  const durationInSeconds = durationInBeats * secondsPerBeat;
  return durationInSeconds;
}
function duplicateRepeatedMeasures(measures) {
  let resultMeasures = [];
  let currentRepeatedSection = [];
  let isAlternativeEndingOne = false;
  for (const measure of measures) {
    const endingMarks = measure.querySelectorAll("ending");
    if (+endingMarks[0]?.getAttribute("number") === 1 && endingMarks[0]?.getAttribute("type") === "start") {
      isAlternativeEndingOne = true;
    }
    const repetitionMarks = measure.querySelectorAll("repeat");
    if (repetitionMarks.length === 2) {
      const times = repetitionMarks[1].getAttribute("times") || 2;
      const repetition = Array.from({ length: +times }).fill(measure);
      if (currentRepeatedSection.length === 0) {
        resultMeasures = [...resultMeasures, ...repetition];
      } else {
        currentRepeatedSection = [...currentRepeatedSection, ...repetition];
      }
    } else if (repetitionMarks.length === 1) {
      const direction = repetitionMarks[0].getAttribute("direction");
      if (direction === "forward") {
        currentRepeatedSection.push(measure);
      } else if (direction === "backward") {
        const times = repetitionMarks[0].getAttribute("times") || 2;
        if (currentRepeatedSection.length > 0) {
          if (!isAlternativeEndingOne) {
            currentRepeatedSection.push(measure);
            for (let index16 = 0; index16 < times; index16++) {
              resultMeasures = [...resultMeasures, ...currentRepeatedSection];
            }
          } else {
            const firstRepetition = [...currentRepeatedSection, measure];
            resultMeasures = [...resultMeasures, ...firstRepetition];
            for (let index16 = 1; index16 < times; index16++) {
              resultMeasures = [...resultMeasures, ...currentRepeatedSection];
            }
          }
          currentRepeatedSection = [];
        } else {
          const allMeasuresUntilHere = [...resultMeasures];
          for (let index16 = 1; index16 < times; index16++) {
            resultMeasures = [...resultMeasures, ...allMeasuresUntilHere];
          }
        }
      }
    } else {
      if (!isAlternativeEndingOne) {
        if (currentRepeatedSection.length === 0) {
          resultMeasures.push(measure);
        } else {
          currentRepeatedSection.push(measure);
        }
      }
    }
    if (isAlternativeEndingOne) {
      for (const endingMark of endingMarks) {
        if (+endingMark.getAttribute("number") === 1 && endingMark.getAttribute("type") === "stop") {
          isAlternativeEndingOne = false;
        }
      }
    }
  }
  return resultMeasures;
}
function handleStaveAndTab(track) {
  const notes = track.querySelectorAll("note");
  let hasStringFretNotes = false;
  for (const note2 of notes) {
    if (note2.querySelectorAll("string").length > 0 && note2.querySelectorAll("fret").length > 0) {
      hasStringFretNotes = true;
      break;
    }
  }
  if (hasStringFretNotes) {
    for (const note2 of notes) {
      const voice = +(note2.querySelectorAll("voice")[0].innerHTML ?? 1);
      const isFirstVoiceRest = note2.querySelectorAll("rest").length > 0 && voice === 1;
      if (!isFirstVoiceRest && note2.querySelectorAll("fret").length === 0) {
        note2.remove();
      }
    }
    const backups = track.querySelectorAll("backup");
    for (const backup of backups) {
      backup.remove();
    }
  }
  return track;
}
function getTuningPitches(measures) {
  for (const measure of measures) {
    try {
      const tuningPitches = [];
      const staffTunings = measure.querySelectorAll("staff-tuning");
      for (const st of staffTunings) {
        const tuningNote = st.querySelectorAll("tuning-step")[0].innerHTML;
        const tuningOctave = +st.querySelectorAll("tuning-octave")[0].innerHTML;
        tuningPitches.push(getMidiNoteByNameAndOctave(tuningNote, tuningOctave).pitch);
      }
      return tuningPitches;
    } catch {
    }
  }
  return [];
}
function getDrumInstrumentMap(xml) {
  const partMap = /* @__PURE__ */ new Map();
  const scoreParts = xml.querySelectorAll("part-list")[0]?.querySelectorAll("score-part");
  if (!scoreParts) {
    return partMap;
  }
  for (const scorePart of scoreParts) {
    const partId = scorePart.id;
    const instruMap = /* @__PURE__ */ new Map();
    const midiInstrs = scorePart.querySelectorAll("midi-instrument");
    for (const midiInstr of midiInstrs) {
      const instrId = midiInstr.id;
      const pitch = midiInstr.querySelectorAll("midi-unpitched")[0]?.innerHTML;
      if (pitch) {
        instruMap.set(instrId, +pitch);
      }
    }
    partMap.set(partId, instruMap);
  }
  return partMap;
}
var keySignatureMap = /* @__PURE__ */ new Map([
  [-7, { key: "Cb", scale: "major" }],
  [-6, { key: "Gb", scale: "major" }],
  [-5, { key: "Db", scale: "major" }],
  [-4, { key: "Ab", scale: "major" }],
  [-3, { key: "Eb", scale: "major" }],
  [-2, { key: "Bb", scale: "major" }],
  [-1, { key: "F", scale: "major" }],
  [0, { key: "C", scale: "major" }],
  [1, { key: "G", scale: "major" }],
  [2, { key: "D", scale: "major" }],
  [3, { key: "A", scale: "major" }],
  [4, { key: "E", scale: "major" }],
  [5, { key: "B", scale: "major" }],
  [6, { key: "F#", scale: "major" }],
  [7, { key: "C#", scale: "major" }]
]);
var dynamicsMap = /* @__PURE__ */ new Map([
  ["ppp", 25],
  ["pp", 38],
  ["p", 51],
  ["mp", 64],
  ["mf", 76],
  ["f", 89],
  ["ff", 102],
  ["fff", 114]
]);

// src/utils/MusicUtils.js
function bpmToSecondsPerBeat(bpm) {
  return 1 / (bpm / 60);
}
function freqToApproxMidiNr(frequency) {
  return 12 * Math.log2(frequency / 440) + 69;
}
function midiToFrequency(midi) {
  return 2 ** ((midi - 69) / 12) * 440;
}
function chordToInteger(notes) {
  let value = 0;
  for (const note2 of notes) {
    const chroma = note2.pitch % 12;
    const noteInteger = 1 << chroma;
    value = value | noteInteger;
  }
  return value;
}
function chordIntegerJaccardIndex(chord1, chord2) {
  if (chord1 === chord2) {
    return 1;
  }
  const intersection2 = chord1 & chord2;
  const union2 = chord1 | chord2;
  const intersectionSize = countOnesOfBinary(intersection2);
  const unionSize = countOnesOfBinary(union2);
  return intersectionSize / unionSize;
}
var noteTypeDurationRatios = [];
var baseDurations = [2, 1, 1 / 2, 1 / 4, 1 / 8, 1 / 16, 1 / 32, 1 / 64];
for (const d of baseDurations) {
  for (let dots = 0; dots < 4; dots++) {
    let duration = d;
    let toAdd = d;
    for (let dot = 0; dot < dots; dot++) {
      toAdd /= 2;
      duration += toAdd;
    }
    noteTypeDurationRatios.push({
      type: d,
      dots,
      duration
    });
  }
}
noteTypeDurationRatios.sort((a, b) => a.duration - b.duration);
function noteDurationToNoteType(duration, bpm) {
  const quarterDuration = bpmToSecondsPerBeat(bpm);
  const ratio = duration / quarterDuration / 4;
  return binarySearch(noteTypeDurationRatios, ratio, (d) => d.duration);
}
var CIRCLE_OF_5THS = [
  [0, "C", "C", 0, 0],
  [7, "G", "G", 1, 0],
  [2, "D", "D", 2, 0],
  [9, "A", "A", 3, 0],
  [4, "E", "E", 4, 0],
  [11, "B", "B", 5, 7],
  [6, "F#", "Gb", 6, 6],
  [1, "C#", "Db", 7, 5],
  [8, "G#", "Ab", 0, 4],
  [3, "D#", "Eb", 0, 3],
  [10, "A#", "Bb", 0, 2],
  [5, "F", "F", 0, 1]
];
var INTERVALS = /* @__PURE__ */ new Map([
  [1, "unison"],
  [1, "m2"],
  [2, "M2"],
  [3, "m3"],
  [4, "M3"],
  [5, "P4"],
  [6, "aug4"],
  [7, "P5"],
  [8, "m6"],
  [9, "M6"],
  [10, "m7"],
  [11, "M7"],
  [12, "P8"]
]);
function metronomeTrackFromTempoAndMeter(tempo = 120, meter = [4, 4], duration = 60) {
  const track = [];
  const secondsPerBeat = bpmToSecondsPerBeat(tempo) / (meter[1] / 4);
  let currentTime = 0;
  while (currentTime <= duration) {
    for (let beat = 0; beat < meter[0]; beat++) {
      track.push({
        time: roundToNDecimals(currentTime, 4),
        accent: beat % meter[0] === 0
      });
      currentTime += secondsPerBeat;
      if (currentTime > duration) {
        return track;
      }
    }
  }
}
function metronomeTrackFromMusicPiece(musicPiece, tempoFactor = 1) {
  const { duration, tempos, timeSignatures } = musicPiece;
  const track = [];
  let currentTime = 0;
  const initialTimeSig = timeSignatures[0].signature ?? [4, 4];
  let [beatCount, beatType] = initialTimeSig;
  const timeSigsTodo = timeSignatures.slice(1);
  const initialTempo = tempos[0].bpm ?? 120;
  let secondsPerBeat = bpmToSecondsPerBeat(initialTempo) / (beatType / 4);
  const temposTodo = tempos.slice(1);
  while (currentTime <= duration) {
    const lookahead = currentTime + secondsPerBeat;
    if (timeSigsTodo.length > 0 && timeSigsTodo[0].time <= lookahead) {
      [beatCount, beatType] = timeSigsTodo[0].signature;
      timeSigsTodo.shift();
    }
    if (temposTodo.length > 0 && temposTodo[0].time <= lookahead) {
      secondsPerBeat = bpmToSecondsPerBeat(temposTodo[0].bpm) / (beatType / 4);
      temposTodo.shift();
    }
    for (let beat = 0; beat < beatCount; beat++) {
      track.push({
        time: roundToNDecimals(currentTime / tempoFactor, 3),
        accent: beat === 0
      });
      currentTime += secondsPerBeat;
      if (currentTime > duration) {
        return track;
      }
    }
  }
  return track;
}

// src/fileFormats/MidiParser.js
var ROUNDING_PRECISION2 = 5;
function preprocessMidiFileData(data, splitFormat0IntoTracks = true, log = false) {
  if (data === null || data === void 0) {
    return;
  }
  if (!data.track) {
    console.warn("[MidiParser] MIDI data has no track");
    return;
  }
  if (log) {
    console.groupCollapsed("[MidiParser] Preprocessing MIDI file data");
  }
  let parsedTracks = [];
  const { tempoChanges, beatTypeChanges, keySignatureChanges } = getSignatureChanges(data.track);
  for (const track of data.track) {
    const t = parseMidiTrack(track, data.timeDivision, tempoChanges, beatTypeChanges, keySignatureChanges, log);
    if (t !== null) {
      parsedTracks.push(t);
    }
  }
  if (data.formatType === 0 && splitFormat0IntoTracks && parsedTracks.length === 1) {
    parsedTracks = splitFormat0(parsedTracks);
  }
  const totalTime = max(parsedTracks, (d) => d?.totalTime ?? 0);
  const measureLinePositions = getMeasureLines(tempoChanges, beatTypeChanges, totalTime);
  for (const track of parsedTracks) {
    track.measureIndices = getMeasureIndices(track.noteObjs, measureLinePositions);
  }
  const result = {
    tracks: parsedTracks,
    totalTime,
    tempoChanges,
    beatTypeChanges,
    keySignatureChanges,
    measureLinePositions
  };
  if (log) {
    console.log(`Got ${parsedTracks.length} MIDI tracks`, result);
    console.groupEnd();
  }
  return result;
}
function parseMidiTrack(track, timeDivision, tempoChanges, beatTypeChanges, keySignatureChanges, log) {
  const notes = [];
  let tempo = tempoChanges[0]?.tempo ?? 120;
  let currentTick = 0;
  let currentTime;
  let milliSecondsPerTick = getMillisecondsPerTick(tempo, timeDivision);
  let tickOfLastTempoChange = 0;
  let timeOfLastTempoChange = 0;
  const unfinishedNotes = /* @__PURE__ */ new Map();
  for (const event of track.event) {
    const type2 = event.type;
    if (type2 === EVENT_TYPES.meta) {
      continue;
    }
    currentTick += event.deltaTime;
    for (const btc of beatTypeChanges) {
      if (btc.time === void 0 && btc.tick <= currentTick) {
        const t = (btc.tick - tickOfLastTempoChange) * milliSecondsPerTick / 1e3 + timeOfLastTempoChange;
        btc.time = roundToNDecimals(t, ROUNDING_PRECISION2);
      }
    }
    for (const ksc of keySignatureChanges) {
      if (ksc.time === void 0 && ksc.tick <= currentTick) {
        const t = (ksc.tick - tickOfLastTempoChange) * milliSecondsPerTick / 1e3 + timeOfLastTempoChange;
        ksc.time = roundToNDecimals(t, ROUNDING_PRECISION2);
      }
    }
    let mostRecentTempoChange;
    if (tempoChanges.length > 0 && currentTick > tempoChanges[tempoChanges.length - 1].tick) {
      mostRecentTempoChange = tempoChanges[tempoChanges.length - 1];
    }
    for (let index16 = 1; index16 < tempoChanges.length; index16++) {
      const tick = tempoChanges[index16].tick;
      if (tick > currentTick) {
        const change = tempoChanges[index16 - 1];
        mostRecentTempoChange = change;
        break;
      }
    }
    if (mostRecentTempoChange && mostRecentTempoChange.tempo !== tempo) {
      const tick = mostRecentTempoChange.tick;
      timeOfLastTempoChange = (tick - tickOfLastTempoChange) * milliSecondsPerTick / 1e3 + timeOfLastTempoChange;
      tickOfLastTempoChange = tick;
      mostRecentTempoChange.time = roundToNDecimals(timeOfLastTempoChange, ROUNDING_PRECISION2);
      tempo = mostRecentTempoChange.tempo;
      milliSecondsPerTick = getMillisecondsPerTick(tempo, timeDivision);
    }
    currentTime = (currentTick - tickOfLastTempoChange) * milliSecondsPerTick / 1e3 + timeOfLastTempoChange;
    if (type2 !== EVENT_TYPES.noteOn && type2 !== EVENT_TYPES.noteOff) {
      continue;
    }
    const [pitch, velocity] = event.data;
    const channel = event.channel;
    const key = `${pitch} ${channel}`;
    if (type2 === EVENT_TYPES.noteOff || type2 === EVENT_TYPES.noteOn && velocity === 0) {
      if (unfinishedNotes.has(key)) {
        unfinishedNotes.get(key).end = roundToNDecimals(currentTime, ROUNDING_PRECISION2);
        unfinishedNotes.delete(key);
      } else {
        if (log) {
          console.warn("Did not find an unfinished note for note-off event!");
          console.log(event);
        }
      }
    } else if (type2 === EVENT_TYPES.noteOn) {
      const newNote = new Note_default(pitch, roundToNDecimals(currentTime, ROUNDING_PRECISION2), velocity, channel);
      notes.push(newNote);
      unfinishedNotes.set(key, newNote);
    } else {
      continue;
    }
  }
  const neededToFix = [];
  for (const note2 of notes) {
    if (note2.end === -1) {
      note2.end = roundToNDecimals(currentTime, ROUNDING_PRECISION2);
      neededToFix.push(note2);
    }
  }
  if (neededToFix.length > 0) {
    console.warn(`had to fix ${neededToFix.length} notes`);
    console.log(neededToFix);
  }
  const { trackName, instrument, instrumentName } = getInstrumentAndTrackName(track);
  if (notes.length > 0) {
    const parsedTrack = {
      noteObjs: notes,
      totalTime: currentTime,
      trackName: trackName ?? "Track",
      instrument,
      instrumentName: instrumentName ?? "Unknown instrument"
    };
    return parsedTrack;
  } else {
    return null;
  }
}
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
    instrumentName
  };
}
function getMeasureLines(tempoChanges, beatTypeChanges, totalTime) {
  const measureLines = [];
  let tempo = 120;
  let beats = 4;
  let beatType = 4;
  let currentTime = 0;
  let currentBeatsInMeasure = 0;
  let timeOfLastTempoChange = 0;
  let timeSinceLastTempoChange = 0;
  while (currentTime < totalTime) {
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
    currentBeatsInMeasure++;
    const secondsPerBeat = bpmToSecondsPerBeat(tempo) / (beatType / 4);
    timeSinceLastTempoChange += secondsPerBeat;
    currentTime = timeOfLastTempoChange + timeSinceLastTempoChange;
    if (currentBeatsInMeasure >= beats) {
      currentBeatsInMeasure = 0;
      measureLines.push(roundToNDecimals(currentTime, ROUNDING_PRECISION2));
    }
  }
  return measureLines;
}
function getMeasureIndices(notes, measureTimes) {
  const measureIndices = [];
  const todo = [...measureTimes];
  for (const [index16, note2] of notes.entries()) {
    if (note2.start >= todo[0]) {
      todo.shift();
      measureIndices.push(index16);
    }
  }
  return measureIndices;
}
function splitFormat0(tracks) {
  if (tracks.length > 1) {
    console.warn("Splitting a format 0 file with more than 1 track will result in all but the first beeing lost!");
  }
  const grouped = group(tracks[0].noteObjs, (d) => d.channel);
  const splittedTracks = [];
  for (const notes of grouped.values()) {
    splittedTracks.push({
      ...tracks[0],
      noteObjs: notes
    });
  }
  return splittedTracks;
}
function getMillisecondsPerTick(tempo, timeDivision) {
  const milliSecondsPerBeat = 1 / tempo * 6e4;
  const milliSecondsPerTick = milliSecondsPerBeat / timeDivision;
  return milliSecondsPerTick;
}
function getSignatureChanges(tracks) {
  const tempoChanges = [];
  const beatTypeChanges = [];
  const keySignatureChanges = [];
  let currentTick = 0;
  let lastTempo = null;
  for (const track of tracks) {
    for (const event of track.event) {
      currentTick += event.deltaTime;
      if (event.type === EVENT_TYPES.meta && event.metaType === META_TYPES.setTempo) {
        const milliSecondsPerQuarter = event.data / 1e3;
        const tempo = Math.round(1 / (milliSecondsPerQuarter / 6e4));
        if (tempo !== lastTempo) {
          tempoChanges.push({
            tick: currentTick,
            tempo,
            time: currentTick === 0 ? 0 : void 0
          });
          lastTempo = tempo;
        }
      }
      if (event.type === EVENT_TYPES.meta && event.metaType === META_TYPES.timeSignature) {
        const d = event.data;
        const beats = d[0];
        const beatType = 2 ** d[1];
        const newEntry = {
          tick: currentTick,
          beats,
          beatType
        };
        if (beatTypeChanges.length === 0) {
          beatTypeChanges.push(newEntry);
        } else {
          const last = beatTypeChanges[beatTypeChanges.length - 1];
          if (last.beats !== beats || last.beatType !== beatType) {
            beatTypeChanges.push(newEntry);
          }
        }
      }
      if (event.type === EVENT_TYPES.meta && event.metaType === META_TYPES.keySignature) {
        const d = event.data;
        if (!KEY_SIG_MAP.has(d)) {
          console.warn("[MidiParser] Invalid key signature", d);
        } else {
          const { key, scale: scale2 } = KEY_SIG_MAP.get(d);
          const newEntry = {
            tick: currentTick,
            key,
            scale: scale2
          };
          if (keySignatureChanges.length === 0) {
            keySignatureChanges.push(newEntry);
          } else {
            const last = keySignatureChanges[keySignatureChanges.length - 1];
            if (last.key !== key || last.scale !== scale2) {
              keySignatureChanges.push(newEntry);
            }
          }
        }
      }
    }
  }
  if (tempoChanges.length === 0 || tempoChanges[0].time > 0) {
    tempoChanges.unshift({ tempo: 120, time: 0 });
  }
  if (beatTypeChanges.length === 0 || beatTypeChanges[0].time > 0) {
    beatTypeChanges.unshift({ beats: 4, beatType: 4, time: 0 });
  }
  if (keySignatureChanges.length === 0 || keySignatureChanges[0].time > 0) {
    keySignatureChanges.unshift({ key: "C", scale: "major", time: 0 });
  }
  return { tempoChanges, beatTypeChanges, keySignatureChanges };
}
var EVENT_TYPES = {
  noteOff: 8,
  noteOn: 9,
  noteAftertouch: 10,
  controller: 11,
  programChange: 12,
  channelAftertouch: 13,
  pitchBend: 14,
  meta: 255
};
var META_TYPES = {
  sequenceNumber: 0,
  textEvent: 1,
  copyright: 2,
  trackName: 3,
  instrumentName: 4,
  lyrics: 5,
  marker: 6,
  cuePoint: 7,
  channelPrefix: 32,
  endOfTrack: 47,
  setTempo: 81,
  smpteOffset: 84,
  timeSignature: 88,
  keySignature: 89,
  sequencerSpecific: 127
};
var KEY_SIG_MAP = /* @__PURE__ */ new Map([
  [63744, { key: "Cb", scale: "major" }],
  [64e3, { key: "Gb", scale: "major" }],
  [64256, { key: "Db", scale: "major" }],
  [64512, { key: "Ab", scale: "major" }],
  [64768, { key: "Eb", scale: "major" }],
  [65024, { key: "Bb", scale: "major" }],
  [65280, { key: "F", scale: "major" }],
  [0, { key: "C", scale: "major" }],
  [256, { key: "G", scale: "major" }],
  [512, { key: "D", scale: "major" }],
  [768, { key: "A", scale: "major" }],
  [1024, { key: "E", scale: "major" }],
  [1280, { key: "B", scale: "major" }],
  [1536, { key: "F#", scale: "major" }],
  [1792, { key: "C#", scale: "major" }],
  [63745, { key: "Ab", scale: "minor" }],
  [64001, { key: "Eb", scale: "minor" }],
  [64257, { key: "Bb", scale: "minor" }],
  [64513, { key: "F", scale: "minor" }],
  [64769, { key: "C", scale: "minor" }],
  [65025, { key: "G", scale: "minor" }],
  [65281, { key: "D", scale: "minor" }],
  [1, { key: "A", scale: "minor" }],
  [257, { key: "E", scale: "minor" }],
  [513, { key: "B", scale: "minor" }],
  [769, { key: "F#", scale: "minor" }],
  [1025, { key: "C#", scale: "minor" }],
  [1281, { key: "G#", scale: "minor" }],
  [1537, { key: "D#", scale: "minor" }],
  [1793, { key: "A#", scale: "minor" }]
]);

// src/types/MusicPiece.js
var MusicPiece = class {
  constructor(name, tempos, timeSignatures, keySignatures, measureTimes, tracks) {
    if (!tracks || tracks.length === 0) {
      throw new Error("No or invalid tracks given! Use .fromMidi or .fromMusicXml?");
    }
    this.name = name;
    this.measureTimes = measureTimes;
    this.tracks = tracks;
    this.duration = Math.max(...this.tracks.map((d) => d.duration));
    this.tempos = tempos.slice(0, 1);
    let currentTempo = tempos[0];
    for (const tempo of tempos) {
      if (tempo.string !== currentTempo.string) {
        currentTempo = tempo;
        this.tempos.push(tempo);
      }
    }
    this.timeSignatures = timeSignatures.slice(0, 1);
    let currentTimeSig = timeSignatures[0];
    for (const timeSignature of timeSignatures) {
      if (timeSignature.string !== currentTimeSig.string) {
        currentTimeSig = timeSignature;
        this.timeSignatures.push(timeSignature);
      }
    }
    this.keySignatures = keySignatures.slice(0, 1);
    let currentKeySig = keySignatures[0];
    for (const keySignature of keySignatures) {
      if (keySignature.string !== currentKeySig.string) {
        currentKeySig = keySignature;
        this.keySignatures.push(keySignature);
      }
    }
  }
  static fromMidi(name, midiFile) {
    if (!midiFile) {
      throw new Error("No MIDI file content given");
    }
    const midi = midiParser.parse(midiFile);
    const parsed = preprocessMidiFileData(midi);
    let tempos = [];
    let timeSignatures = [];
    let keySignatures = [];
    let measureTimes = [];
    if (parsed.tracks.length > 0) {
      tempos = parsed.tempoChanges.map((d) => new TempoDefinition(d.time, d.tempo));
      timeSignatures = parsed.beatTypeChanges.map((d) => new TimeSignature(d.time, [d.beats, d.beatType]));
      keySignatures = parsed.keySignatureChanges.map((d) => new KeySignature(d.time, d.key, d.scale));
      measureTimes = parsed.measureLinePositions;
    }
    const tracks = parsed.tracks.map((track) => new Track(track.trackName, track.instrumentName, track.noteObjs, null, track.measureIndices, /* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()));
    return new MusicPiece(name, tempos, timeSignatures, keySignatures, measureTimes, tracks);
  }
  static fromMusicXml(name, xmlFile) {
    if (!xmlFile) {
      throw new Error("No MusicXML file content given");
    }
    let xmlDocument = xmlFile;
    if (typeof xmlDocument === "string") {
      const parser = new DOMParser();
      xmlDocument = parser.parseFromString(xmlFile, "text/xml");
    }
    const parsed = preprocessMusicXmlData(xmlDocument);
    let tempos = [];
    let timeSignatures = [];
    let keySignatures = [];
    if (parsed.parts.length > 0) {
      tempos = parsed.parts[0].tempoChanges.map((d) => new TempoDefinition(d.time, d.tempo));
      timeSignatures = parsed.parts[0].beatTypeChanges.map((d) => new TimeSignature(d.time, [d.beats, d.beatType]));
      keySignatures = parsed.parts[0].keySignatureChanges.map((d) => new KeySignature(d.time, d.key, d.scale));
    }
    let measureTimes = [];
    if (parsed.parts.length > 0) {
      measureTimes = parsed.parts[0].measureLinePositions;
    }
    const tracks = parsed.parts.map((track, index16) => {
      for (const n of track.noteObjs) {
        n.channel = index16;
      }
      return new Track(parsed.partNames[index16], parsed.instruments[index16], track.noteObjs, track.tuning, track.measureIndices, track.measureRehearsalMap, track.noteLyricsMap, track.xmlNoteIndices);
    });
    return new MusicPiece(name, tempos, timeSignatures, keySignatures, measureTimes, tracks);
  }
  static fromJson(json) {
    json = typeof json === "string" ? JSON.parse(json) : json;
    const name = json.name;
    const tempos = json.tempos.map((d) => new TempoDefinition(d.time, d.bpm));
    const timeSignatures = json.timeSignatures.map((d) => new TimeSignature(d.time, d.signature));
    const keySignatures = json.keySignatures.map((d) => new KeySignature(d.time, d.key, d.scale));
    const measureTimes = json.measureTimes;
    const tracks = json.tracks.map((track) => Track.from(track));
    return new MusicPiece(name, tempos, timeSignatures, keySignatures, measureTimes, tracks);
  }
  toJson(pretty = false) {
    const _this = {
      ...this,
      tracks: this.tracks.map((d) => d.toObject())
    };
    return JSON.stringify(_this, void 0, pretty ? 2 : 0);
  }
  getAllNotes(sortByTime = false) {
    const notes = this.tracks.flatMap((t) => t.notes);
    if (sortByTime) {
      notes.sort((a, b) => a.start - b.start);
    }
    return notes;
  }
  getNotesFromTracks(indices = "all", sortByTime = false) {
    let notes = [];
    if (indices === "all") {
      notes = this.tracks.flatMap((t) => t.notes);
    } else if (Array.isArray(indices)) {
      notes = this.tracks.filter((d, i) => indices.includes(i)).flatMap((t) => t.notes);
    } else {
      notes = this.tracks[indices].notes;
      sortByTime = false;
    }
    if (sortByTime) {
      notes.sort((a, b) => a.start - b.start);
    }
    return notes;
  }
  transpose(steps = 0, tracks = "all") {
    const newTracks = this.tracks.map((track, index16) => {
      const change = tracks === "all" || Array.isArray(tracks) && tracks.includes(index16) || tracks === index16;
      const na = new NoteArray_default(track.notes);
      let tuning = track.tuningPitches;
      if (change) {
        na.transpose(steps);
        tuning = track.tuningPitches.map((d) => d + steps);
      }
      return new Track(track.name, track.instrument, na.getNotes(), tuning, track.measureIndices);
    });
    return new MusicPiece(this.name, [...this.tempos], [...this.timeSignatures], [...this.keySignatures], [...this.measureTimes], newTracks);
  }
};
var Track = class {
  constructor(name, instrument, notes, tuningPitches = null, measureIndices = null, measureRehearsalMap, noteLyricsMap, xmlNoteIndices = null) {
    name = !name?.length ? "unnamed" : name.replace("\0", "");
    this.name = name;
    this.instrument = instrument;
    if (!notes || notes.length === void 0) {
      throw new Error("Notes are undefined or not an array");
    }
    this.notes = notes.sort((a, b) => a.start - b.start);
    this.tuningPitches = tuningPitches;
    this.measureIndices = measureIndices;
    this.measureRehearsalMap = measureRehearsalMap;
    this.noteLyricsMap = noteLyricsMap;
    this.xmlNoteIndices = xmlNoteIndices;
    this.duration = new NoteArray_default(notes).getDuration();
    this.hasStringFret = false;
    for (const note2 of notes) {
      if (note2.string !== void 0 && note2.fret !== void 0) {
        this.hasStringFret = true;
        break;
      }
    }
  }
  toObject() {
    return {
      ...this,
      measureRehearsalMap: [...this.measureRehearsalMap],
      noteLyricsMap: [...this.noteLyricsMap]
    };
  }
  static from(object) {
    const notes = object.notes.map((note2) => {
      return note2.string !== void 0 && note2.fret !== void 0 ? GuitarNote_default.from(note2) : Note_default.from(note2);
    });
    const measureRehearsalMap = new Map(object.measureRehearsalMap);
    const noteLyricsMap = new Map(object.noteLyricsMap);
    return new Track(object.name, object.instrument, notes, object.tuningPitches, object.measureIndices, measureRehearsalMap, noteLyricsMap, object.xmlNoteIndices);
  }
};
var TempoDefinition = class {
  constructor(time, bpm) {
    this.time = time;
    this.bpm = bpm;
    this.string = `${bpm} bpm`;
  }
};
var TimeSignature = class {
  constructor(time, signature) {
    this.time = time;
    this.signature = signature;
    this.string = signature.join("/");
  }
};
var KeySignature = class {
  constructor(time, key, scale2) {
    this.time = time;
    this.key = key;
    this.scale = scale2;
    this.string = `${key} ${scale2}`;
  }
};
var MusicPiece_default = MusicPiece;

// src/types/PitchSequence.js
var PitchSequence = class {
  constructor(pitches = []) {
    this._pitches = pitches;
  }
  static fromNotes(notes = []) {
    const pitches = [...notes].sort((a, b) => {
      if (a.start === b.start) {
        return a.pitch - b.pitch;
      }
      return a.start - b.start;
    }).map((d) => d.pitch);
    return new PitchSequence(pitches);
  }
  static fromCharString(string) {
    if (!string || string.length === 0) {
      return new PitchSequence();
    }
    const pitches = [...string].map((d, index16) => string.charCodeAt(index16));
    return new PitchSequence(pitches);
  }
  getPitches() {
    return this._pitches;
  }
  length() {
    return this._pitches.length;
  }
  toCharString() {
    if (!this._pitches || this._pitches.length === 0) {
      return "";
    }
    return String.fromCharCode(...this._pitches);
  }
  toNoteNameString() {
    return this._pitches.map((p) => getMidiNoteByNr(p).label).join(" ");
  }
  reverse() {
    this._pitches = this._pitches.reverse();
    return this;
  }
  removeOctaves() {
    this._pitches = this._pitches.map((d) => d % 12);
    return this;
  }
  toIntervals() {
    const p = this._pitches;
    if (!p || p.length === 0 || p.length < 2) {
      return [];
    }
    const result = Array.from({ length: p.length - 1 });
    for (let index16 = 1; index16 < p.length; index16++) {
      result[index16 - 1] = p[index16] - p[index16 - 1];
    }
    return result;
  }
  clone() {
    return new PitchSequence(this._pitches);
  }
  equals(otherPitchSequence) {
    if (!(otherPitchSequence instanceof PitchSequence)) {
      return false;
    }
    const p = otherPitchSequence.getPitches();
    if (this._pitches.length !== p.length) {
      return false;
    }
    for (const [index16, element] of p.entries()) {
      if (this._pitches[index16] !== element) {
        return false;
      }
    }
    return true;
  }
};
var PitchSequence_default = PitchSequence;

// src/graphics/Canvas.js
var Canvas_exports = {};
__export(Canvas_exports, {
  drawArc: () => drawArc,
  drawAssymetricArc: () => drawAssymetricArc,
  drawBezierConnectorX: () => drawBezierConnectorX,
  drawBezierConnectorY: () => drawBezierConnectorY,
  drawBowRight: () => drawBowRight,
  drawBracketH: () => drawBracketH,
  drawCircle: () => drawCircle,
  drawColorRamp: () => drawColorRamp,
  drawCornerLine: () => drawCornerLine,
  drawDiamond: () => drawDiamond,
  drawFilledCircle: () => drawFilledCircle,
  drawHLine: () => drawHLine,
  drawHexagon: () => drawHexagon,
  drawLine: () => drawLine,
  drawMatrix: () => drawMatrix,
  drawNoteTrapezoid: () => drawNoteTrapezoid,
  drawNoteTrapezoidUpwards: () => drawNoteTrapezoidUpwards,
  drawRoundedCorner: () => drawRoundedCorner,
  drawRoundedCornerLine: () => drawRoundedCornerLine,
  drawRoundedCornerLineRightLeft: () => drawRoundedCornerLineRightLeft,
  drawRoundedRect: () => drawRoundedRect,
  drawTriangle: () => drawTriangle,
  drawVLine: () => drawVLine,
  drawX: () => drawX,
  setupCanvas: () => setupCanvas
});
function setupCanvas(canvas) {
  if (!window) {
    return;
  }
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const context = canvas.getContext("2d");
  context.scale(dpr, dpr);
  return context;
}
function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}
function drawHLine(context, x1, y, x2) {
  context.beginPath();
  context.moveTo(x1, y);
  context.lineTo(x2, y);
  context.stroke();
}
function drawVLine(context, x, y1, y2) {
  context.beginPath();
  context.moveTo(x, y1);
  context.lineTo(x, y2);
  context.stroke();
}
function drawBowRight(context, x1, y1, x2, y2, strength = 0.5) {
  const middleX = (x1 + x2) / 2;
  const middleY = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const normalX = -dy;
  const normalY = dx;
  const cx = middleX + strength * normalX;
  const cy = middleY + strength * normalY;
  context.beginPath();
  context.moveTo(x1, y1);
  context.bezierCurveTo(cx, cy, cx, cy, x2, y2);
  context.stroke();
}
function drawCircle(context, x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.stroke();
}
function drawFilledCircle(context, x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
}
function drawTriangle(context, x, y, halfSize) {
  context.beginPath();
  context.moveTo(x - halfSize, y + halfSize);
  context.lineTo(x + halfSize, y + halfSize);
  context.lineTo(x, y - halfSize);
  context.closePath();
  context.fill();
}
function drawDiamond(context, x, y, halfSize) {
  context.beginPath();
  context.moveTo(x - halfSize, y);
  context.lineTo(x, y - halfSize);
  context.lineTo(x + halfSize, y);
  context.lineTo(x, y + halfSize);
  context.closePath();
  context.fill();
}
function drawX(context, x, y, halfSize) {
  context.save();
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(x - halfSize, y - halfSize);
  context.lineTo(x + halfSize, y + halfSize);
  context.moveTo(x - halfSize, y + halfSize);
  context.lineTo(x + halfSize, y - halfSize);
  context.stroke();
  context.restore();
}
function drawNoteTrapezoid(context, x, y, width, height, height2) {
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x, y + height);
  context.lineTo(x + width, y + (height / 2 + height2 / 2));
  context.lineTo(x + width, y + (height / 2 - height2 / 2));
  context.closePath();
  context.fill();
}
function drawNoteTrapezoidUpwards(context, x, y, width, height, width2) {
  context.beginPath();
  context.lineTo(x, y + height);
  context.lineTo(x + width, y + height);
  context.lineTo(x + (width / 2 + width2 / 2), y);
  context.lineTo(x + (width / 2 - width2 / 2), y);
  context.closePath();
  context.fill();
}
function drawRoundedRect(context, x, y, width, height, radius) {
  if (width < 0) {
    return;
  }
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}
function drawCornerLine(context, x1, y1, x2, y2, xFirst = true) {
  context.beginPath();
  context.moveTo(x1, y1);
  xFirst ? context.lineTo(x2, y1) : context.lineTo(x1, y2);
  context.lineTo(x2, y2);
  context.stroke();
}
function drawRoundedCornerLine(context, x1, y1, x2, y2, maxRadius = 25) {
  const xDist = Math.abs(x2 - x1);
  const yDist = Math.abs(y2 - y1);
  const radius = Math.min(xDist, yDist, maxRadius);
  const cx = x1 < x2 ? x2 - radius : x2 + radius;
  const cy = y1 < y2 ? y1 + radius : y1 - radius;
  context.beginPath();
  context.moveTo(x1, y1);
  if (x1 < x2) {
    context.arc(cx, cy, radius, 1.5 * Math.PI, 2 * Math.PI);
  } else {
    context.arc(cx, cy, radius, 1.5 * Math.PI, Math.PI, true);
  }
  context.lineTo(x2, y2);
  context.stroke();
}
function drawRoundedCornerLineRightLeft(context, x1, y1, x2, y2, maxRadius = 25) {
  const xDist = Math.abs(x2 - x1);
  const yDist = Math.abs(y2 - y1);
  const radius = Math.min(xDist, yDist, maxRadius);
  const cx = x1 < x2 ? x1 + radius : x1 - radius;
  const cy = y1 < y2 ? y2 - radius : y2 + radius;
  context.beginPath();
  context.moveTo(x1, y1);
  if (y1 < y2) {
    context.arc(cx, cy, radius, 0, 0.5 * Math.PI);
  } else {
    context.arc(cx, cy, radius, 0, 1.5 * Math.PI, true);
  }
  context.lineTo(x2, y2);
  context.stroke();
}
function drawHexagon(context, cx, cy, radius) {
  context.beginPath();
  for (let index16 = 0; index16 < 6; index16++) {
    const angle = (60 * index16 + 30) / 180 * Math.PI;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    if (index16 === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  }
  context.closePath();
}
function drawBezierConnectorX(context, x1, y1, x2, y2) {
  const deltaX = (x2 - x1) / 2;
  context.beginPath();
  context.moveTo(x1, y1);
  context.bezierCurveTo(x1 + deltaX, y1, x1 + deltaX, y2, x2, y2);
  context.stroke();
}
function drawBezierConnectorY(context, x1, y1, x2, y2) {
  const deltaY = (y2 - y1) / 2;
  context.beginPath();
  context.moveTo(x1, y1);
  context.bezierCurveTo(x1, y1 + deltaY, x2, y1 + deltaY, x2, y2);
  context.stroke();
}
function drawRoundedCorner(context, x1, y1, x2, y2, turnLeft = true, roundness = 1) {
  context.beginPath();
  context.moveTo(x1, y1);
  if (x1 === x2 || y1 === y2) {
    context.lineTo(x2, y2);
    context.stroke();
    return;
  }
  const radius = Math.abs(x2 - x1) * roundness;
  let cx;
  let cy;
  if (turnLeft) {
    if (x1 < x2 && y1 < y2) {
      cx = x1 + radius;
      cy = y2 - radius;
      context.arc(cx, cy, radius, 1 * Math.PI, 0.5 * Math.PI, true);
    } else if (x1 > x2 && y1 < y2) {
      cx = x2 + radius;
      cy = y1 + radius;
      context.arc(cx, cy, radius, 1.5 * Math.PI, 1 * Math.PI, true);
    } else if (x1 > x2 && y1 > y2) {
      cx = x1 - radius;
      cy = y2 + radius;
      context.arc(cx, cy, radius, 0, 1.5 * Math.PI, true);
    } else {
      cx = x2 - radius;
      cy = y1 - radius;
      context.arc(cx, cy, radius, 0.5 * Math.PI, 0, true);
    }
  } else {
    if (x1 < x2 && y1 < y2) {
      cx = x2 - radius;
      cy = y1 + radius;
      context.arc(cx, cy, radius, 1.5 * Math.PI, 0);
    } else if (x1 > x2 && y1 < y2) {
      cx = x1 - radius;
      cy = y2 - radius;
      context.arc(cx, cy, radius, 0, 0.5 * Math.PI);
    } else if (x1 > x2 && y1 > y2) {
      cx = x2 + radius;
      cy = y1 - radius;
      context.arc(cx, cy, radius, 0.5 * Math.PI, 1 * Math.PI, false);
    } else {
      cx = x1 + radius;
      cy = y2 + radius;
      context.arc(cx, cy, radius, Math.PI, 1.5 * Math.PI, false);
    }
  }
  context.lineTo(x2, y2);
  context.stroke();
}
function drawArc(context, startX1, startX2, length, yBottom) {
  const radius = (startX2 - startX1) / 2;
  const cx = startX1 + radius + length / 2;
  context.lineWidth = length;
  context.beginPath();
  context.arc(cx, yBottom, radius, Math.PI, 2 * Math.PI);
  context.stroke();
}
function drawAssymetricArc(context, startX1, endX1, startX2, endX2, yBottom) {
  const radiusTop = (endX2 - startX1) / 2;
  if (radiusTop < 0) {
    return;
  }
  let radiusBottom = (startX2 - endX1) / 2;
  if (radiusBottom < 0) {
    radiusBottom = 0;
  }
  const cxTop = startX1 + radiusTop;
  const cxBottom = endX1 + radiusBottom;
  context.beginPath();
  context.moveTo(startX1, yBottom);
  context.arc(cxTop, yBottom, radiusTop, Math.PI, 2 * Math.PI);
  context.lineTo(startX2, yBottom);
  context.arc(cxBottom, yBottom, radiusBottom, 2 * Math.PI, Math.PI, true);
  context.closePath();
  context.fill();
}
function drawBracketH(context, x, y, w, h) {
  context.beginPath();
  context.moveTo(x, y + h);
  context.lineTo(x, y);
  context.lineTo(x + w, y);
  context.lineTo(x + w, y + h);
  context.stroke();
}
function drawMatrix(context, matrix, x = 0, y = 0, size = 400, colorScale, colorMap = viridis_default) {
  const cellSize = size / matrix.length;
  const paddedSize = cellSize * 1.01;
  colorScale = colorScale || linear2().domain(extent_default(matrix.flat())).range([1, 0]);
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix.length; col++) {
      context.fillStyle = colorMap(colorScale(matrix[row][col]));
      context.fillRect(x, y, paddedSize, paddedSize);
      x += cellSize;
    }
    y += cellSize;
  }
}
function drawColorRamp(context, w = 100, h = 10, colorMap = rainbow_default) {
  const scaleColor = linear2().domain([0, w]);
  for (let x = 0; x < w; ++x) {
    context.fillStyle = colorMap(scaleColor(x));
    context.fillRect(x, 0, 1.1, h);
  }
}

// src/input/AudioRecorder.js
var recordAudio = () => {
  return new Promise(async (resolve) => {
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      console.warn("[AudioInput] Cannot access audio", error);
      return;
    }
    const options = {
      audioBitsPerSecond: 128e3
    };
    const mediaRecorder = new MediaRecorder(stream, options);
    let audioChunks = [];
    mediaRecorder.addEventListener("dataavailable", (event) => {
      audioChunks.push(event.data);
    });
    const start2 = () => {
      if (!mediaRecorder) {
        console.warn("[AudioInput] Cannot record audio, no microphone?");
        return;
      }
      if (mediaRecorder.state === "recording") {
        return;
      }
      console.log(`[AudioInput] Recording @ ${mediaRecorder.audioBitsPerSecond} b/s`);
      audioChunks = [];
      mediaRecorder.start();
    };
    const stop = () => new Promise((resolve2) => {
      if (!mediaRecorder) {
        return;
      }
      console.log("[AudioInput] Stopping audio recording");
      mediaRecorder.addEventListener("stop", () => {
        const blobOptions = { type: mediaRecorder.mimeType };
        const audioBlob = new Blob(audioChunks, blobOptions);
        resolve2(audioBlob);
      });
      mediaRecorder.stop();
    });
    resolve({ start: start2, stop });
  });
};

// src/input/MidiRecorder.js
var recordMidi = (onMessage) => {
  return new Promise(async (resolve) => {
    let midiAccess;
    try {
      midiAccess = await navigator.requestMIDIAccess();
    } catch (error) {
      console.warn("[MidiInput] Cannot access MIDI", error);
      return;
    }
    let messages = [];
    const addMessage = (message) => {
      if (onMessage) {
        onMessage(message);
      }
      messages.push(message);
    };
    const start2 = () => {
      if (!midiAccess) {
        console.warn("[MidiInput] Cannot record MIDI");
        return;
      }
      for (const input of midiAccess.inputs.values()) {
        input.onmidimessage = addMessage;
      }
      console.log("[MidiInput] Starting recording");
      messages = [];
    };
    const stop = () => {
      if (!midiAccess) {
        return;
      }
      console.log("[MidiInput] Stopping recording");
      const notes = processMidiMessagesToNotes(messages);
      return notes;
    };
    resolve({ start: start2, stop });
  });
};
function processMidiMessagesToNotes(messages) {
  const currentNotes = /* @__PURE__ */ new Map();
  const notes = [];
  for (const message of messages) {
    const device = message.target.name;
    const time = message.timeStamp;
    const commandAndChannel = message.data[0];
    const channel = commandAndChannel % 16;
    const command = commandAndChannel - channel;
    const pitch = message.data[1];
    const velocity = message.data.length > 2 ? message.data[2] : 0;
    switch (command) {
      case 128:
        noteOff(notes, currentNotes, device, time, pitch, channel);
        break;
      case 144:
        if (velocity > 0) {
          noteOn(currentNotes, device, time, pitch, channel, velocity);
        } else {
          noteOff(notes, currentNotes, device, time, pitch, channel);
        }
        break;
      case 224:
        break;
      default:
    }
  }
  if (currentNotes.size > 0) {
    console.warn(`[MidiInput] Got ${currentNotes.size} unfinished notes`);
  }
  notes.sort((a, b) => a.start - b.start);
  return notes;
}
function noteOn(currentNotes, device, time, pitch, channel, velocity) {
  const note2 = new Note_default(pitch, time / 1e3, velocity, channel);
  const key = `${device}-${channel}-${pitch}`;
  currentNotes.set(key, note2);
}
function noteOff(notes, currentNotes, device, time, pitch, channel) {
  const key = `${device}-${channel}-${pitch}`;
  if (!currentNotes.has(key)) {
    console.warn(`[MidiInput] Missing note-on for note-off with key ${key}`);
    return;
  }
  const note2 = currentNotes.get(key);
  note2.end = time / 1e3;
  notes.push(note2);
  currentNotes.delete(key);
}

// src/input/MidiInputManager.js
var MidiInputManager = class {
  constructor(getMidiLiveData, setMidiLiveData, addCurrentNote = () => {
  }, removeCurrentNote = () => {
  }) {
    this._getMidiLiveData = getMidiLiveData;
    this._setMidiLiveData = setMidiLiveData;
    this._addCurrentNote = addCurrentNote;
    this._removeCurrentNote = removeCurrentNote;
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(this._onMIDISuccess, this._onMIDIFailure);
    } else {
      console.error("[MidiInput] WebMIDI is not supported in this browser.");
      throw new Error("Browser does not support WebMIDI");
    }
  }
  _onMIDISuccess(midiAccess) {
    console.groupCollapsed(`[MidiInput] ${midiAccess.inputs.size} input devices`);
    for (const input of midiAccess.inputs.values()) {
      console.log(` - ${input.name}`);
      input.onmidimessage = this._handleMIDIMessage;
    }
    console.groupEnd();
  }
  _onMIDIFailure(error) {
    console.error("[MidiInput] Cannot access MIDI devices.", error);
  }
  _handleMIDIMessage(message) {
    const device = message.target.name;
    const commandAndChannel = message.data[0];
    const channel = commandAndChannel % 16;
    const command = commandAndChannel - channel;
    const time = message.timeStamp;
    const pitch = message.data[1];
    const velocity = message.data.length > 2 ? message.data[2] : 0;
    switch (command) {
      case 128:
        this._noteOff(device, time, pitch, channel);
        break;
      case 144:
        if (velocity > 0) {
          this._noteOn(device, time, pitch, channel, velocity);
        } else {
          this._noteOff(device, time, pitch, channel);
        }
        break;
      case 224:
        break;
      default:
    }
  }
  _noteOn(device, time, pitch, channel, velocity) {
    const note2 = new Note_default(pitch, time / 1e3, velocity, channel);
    this._addCurrentNote(note2);
    let midiData = this._getMidiLiveData();
    midiData = [...midiData, note2];
    this._setMidiLiveData(midiData);
  }
  _noteOff(device, time, pitch, channel) {
    const midiData = this._getMidiLiveData();
    if (midiData.length === 0) {
      setTimeout(() => this._noteOff(time, pitch), 10);
    }
    let index16 = midiData.length - 1;
    while (midiData[index16].pitch !== pitch || midiData[index16].channel !== channel) {
      index16--;
      if (index16 < 0) {
        console.warn("[MidiInput] Did not find note-on event for note-off event!");
        break;
      }
    }
    if (index16 >= 0) {
      midiData[index16].end = time / 1e3;
      this._setMidiLiveData(midiData);
      this._removeCurrentNote(pitch);
    }
  }
};
var MidiInputManager_default = MidiInputManager;

// src/instruments/Drums.js
var Drums_exports = {};
__export(Drums_exports, {
  DRUM_ACTIONS: () => DRUM_ACTIONS,
  DRUM_PARTS: () => DRUM_PARTS,
  DRUM_PARTS_ACTIONS: () => DRUM_PARTS_ACTIONS,
  drumPitchReplacementMapMPS850: () => drumPitchReplacementMapMPS850,
  generateDrumVariation: () => generateDrumVariation,
  getPitch2PositionMap: () => getPitch2PositionMap,
  simplifyDrumPitches: () => simplifyDrumPitches
});
var DRUM_PARTS = {
  Agogo: "DRUM_PARTS.Agogo",
  Cabasa: "DRUM_PARTS.Cabasa",
  Castanets: "DRUM_PARTS.Castanets",
  China: "DRUM_PARTS.China",
  Claves: "DRUM_PARTS.Claves",
  Conga: "DRUM_PARTS.Conga",
  Cowbell: "DRUM_PARTS.Cowbell",
  Crash: "DRUM_PARTS.Crash",
  Cuica: "DRUM_PARTS.Cuica",
  Cymbal: "DRUM_PARTS.Cymbal",
  Golpe: "DRUM_PARTS.Golpe",
  Grancassa: "DRUM_PARTS.Grancassa",
  Guiro: "DRUM_PARTS.Guiro",
  Hand_Clap: "DRUM_PARTS.Hand Clap",
  Hand: "DRUM_PARTS.Hand",
  Hi_Hat: "DRUM_PARTS.Hi Hat",
  High_Floor_Tom: "DRUM_PARTS.High Floor Tom",
  High_Tom: "DRUM_PARTS.High Tom",
  Kick: "DRUM_PARTS.Kick",
  Low_Floor_Tom: "DRUM_PARTS.Low Floor Tom",
  Low_Tom: "DRUM_PARTS.Low Tom",
  Mid_Tom: "DRUM_PARTS.Mid Tom",
  Pedal_Hi_Hat: "DRUM_PARTS.Pedal Hi Hat",
  Ride: "DRUM_PARTS.Ride",
  Right_Maraca: "DRUM_PARTS.Right Maraca",
  Shaker: "DRUM_PARTS.Shaker",
  Snare: "DRUM_PARTS.Snare",
  Splash: "DRUM_PARTS.Splash",
  Surdo: "DRUM_PARTS.Surdo",
  Timbale: "DRUM_PARTS.Timbale",
  Tinkle_Bell: "DRUM_PARTS.Tinkle Bell",
  Triangle: "DRUM_PARTS.Triangle",
  Vibraslap: "DRUM_PARTS.Vibraslap",
  Whistle_high: "DRUM_PARTS.Whistle high",
  Whistle_low: "DRUM_PARTS.Whistle low",
  Woodblock_high: "DRUM_PARTS.Woodblock high",
  Woodblock_low: "DRUM_PARTS.Woodblock low"
};
var DRUM_ACTIONS = {
  choke: "DRUM_ACTIONS.choke",
  finger: "DRUM_ACTIONS.finger",
  hit: "DRUM_ACTIONS.hit",
  mute: "DRUM_ACTIONS.mute",
  return: "DRUM_ACTIONS.return",
  scrapReturn: "DRUM_ACTIONS.scrapReturn",
  sideStick: "DRUM_ACTIONS.sideStick",
  slap: "DRUM_ACTIONS.slap"
};
var DRUM_PARTS_ACTIONS = {
  Agogo_high_hit: "DRUM_PARTS_ACTIONS.Agogo high (hit)",
  Agogo_low_hit: "DRUM_PARTS_ACTIONS.Agogo low (hit)",
  Cabasa_return: "DRUM_PARTS_ACTIONS.Cabasa (return)",
  Castanets_hit: "DRUM_PARTS_ACTIONS.Castanets (hit)",
  China_choke: "DRUM_PARTS_ACTIONS.China (choke)",
  Claves_hit: "DRUM_PARTS_ACTIONS.Claves (hit)",
  Conga_high_slap: "DRUM_PARTS_ACTIONS.Conga high (slap)",
  Conga_low_mute: "DRUM_PARTS_ACTIONS.Conga low (mute)",
  Cowbell_high_tip: "DRUM_PARTS_ACTIONS.Cowbell high (tip)",
  Crash_medium_choke: "DRUM_PARTS_ACTIONS.Crash medium (choke)",
  Cuica_mute: "DRUM_PARTS_ACTIONS.Cuica (mute)",
  Cuica_open: "DRUM_PARTS_ACTIONS.Cuica (open)",
  Cymbal_hit: "DRUM_PARTS_ACTIONS.Cymbal (hit)",
  Golpe_finger: "DRUM_PARTS_ACTIONS.Golpe (finger)",
  Grancassa_hit: "DRUM_PARTS_ACTIONS.Grancassa (hit)",
  Guiro_hit: "DRUM_PARTS_ACTIONS.Guiro (hit)",
  Guiro_scrap_return: "DRUM_PARTS_ACTIONS.Guiro (scrap-return)",
  Hand_Clap_hit: "DRUM_PARTS_ACTIONS.Hand Clap (hit)",
  Hand_slap: "DRUM_PARTS_ACTIONS.Hand (slap)",
  Hi_Hat_closed: "DRUM_PARTS_ACTIONS.Hi-Hat (closed)",
  Hi_Hat_open: "DRUM_PARTS_ACTIONS.Hi-Hat (open)",
  High_Floor_Tom_hit: "DRUM_PARTS_ACTIONS.High Floor Tom (hit)",
  High_Tom_hit: "DRUM_PARTS_ACTIONS.High Tom (hit)",
  Kick_hit: "DRUM_PARTS_ACTIONS.Kick (hit)",
  Low_Floor_Tom_hit: "DRUM_PARTS_ACTIONS.Low Floor Tom (hit)",
  Low_Tom_hit: "DRUM_PARTS_ACTIONS.Low Tom (hit)",
  Mid_Tom_hit: "DRUM_PARTS_ACTIONS.Mid Tom (hit)",
  Pedal_Hi_Hat_hit: "DRUM_PARTS_ACTIONS.Pedal Hi-Hat (hit)",
  Ride_choke: "DRUM_PARTS_ACTIONS.Ride (choke)",
  Right_Maraca_return: "DRUM_PARTS_ACTIONS.Right Maraca (return)",
  Shaker_return: "DRUM_PARTS_ACTIONS.Shaker (return)",
  Snare_hit: "DRUM_PARTS_ACTIONS.Snare (hit)",
  Snare_side_stick: "DRUM_PARTS_ACTIONS.Snare (side stick)",
  Splash_choke: "DRUM_PARTS_ACTIONS.Splash (choke)",
  Surdo_hit: "DRUM_PARTS_ACTIONS.Surdo (hit)",
  Surdo_mute: "DRUM_PARTS_ACTIONS.Surdo (mute)",
  Timbale_high_hit: "DRUM_PARTS_ACTIONS.Timbale high (hit)",
  Timbale_low_hit: "DRUM_PARTS_ACTIONS.Timbale low (hit)",
  Tinkle_Bell_hit: "DRUM_PARTS_ACTIONS.Tinkle Bell (hit)",
  Triangle_hit: "DRUM_PARTS_ACTIONS.Triangle (hit)",
  Triangle_mute: "DRUM_PARTS_ACTIONS.Triangle (mute)",
  Vibraslap_hit: "DRUM_PARTS_ACTIONS.Vibraslap (hit)",
  Whistle_high_hit: "DRUM_PARTS_ACTIONS.Whistle high (hit)",
  Whistle_low_hit: "DRUM_PARTS_ACTIONS.Whistle low (hit)",
  Woodblock_high_hit: "DRUM_PARTS_ACTIONS.Woodblock high (hit)",
  Woodblock_low_hit: "DRUM_PARTS_ACTIONS.Woodblock low (hit)"
};
var drumPitchReplacementMapMPS850 = /* @__PURE__ */ new Map([
  [49, { repPitch: 49, zone: 1, order: 10, line: -1, shape: "o", label: "CC1", name: "Crash Cymbal 1" }],
  [55, { repPitch: 49, zone: 2, order: 11, line: -1, shape: "o", label: "CC1", name: "Crash Cymbal 1" }],
  [52, { repPitch: 57, zone: 1, order: 20, line: 0, shape: "o", label: "CC2", name: "Crash Cymbal 2" }],
  [57, { repPitch: 57, zone: 2, order: 21, line: 0, shape: "o", label: "CC2", name: "Crash Cymbal 2" }],
  [22, { repPitch: 46, zone: 1, order: 30, line: 0, shape: "<>", label: "HHS", name: "Hi-Hat" }],
  [26, { repPitch: 46, zone: 2, order: 31, line: 0, shape: "<>", label: "HHS", name: "Hi-Hat" }],
  [42, { repPitch: 46, zone: 3, order: 32, line: 0, shape: "<>", label: "HHS", name: "Hi-Hat" }],
  [46, { repPitch: 46, zone: 4, order: 33, line: 0, shape: "<>", label: "HHS", name: "Hi-Hat" }],
  [44, { repPitch: 44, zone: 1, order: 40, line: 9, shape: "o", label: "HHP", name: "Hi-Hat Pedal" }],
  [51, { repPitch: 51, zone: 1, order: 50, line: 1, shape: "x", label: "Rd", name: "Ride Cymbal" }],
  [53, { repPitch: 51, zone: 2, order: 51, line: 1, shape: "x", label: "Rd", name: "Ride Cymbal" }],
  [59, { repPitch: 51, zone: 3, order: 52, line: 1, shape: "x", label: "Rd", name: "Ride Cymbal" }],
  [38, { repPitch: 38, zone: 1, order: 60, line: 4, shape: "o", label: "SN", name: "Snare" }],
  [40, { repPitch: 38, zone: 2, order: 61, line: 4, shape: "o", label: "SN", name: "Snare" }],
  [48, { repPitch: 48, zone: 1, order: 90, line: 2, shape: "o", label: "T1", name: "Tom 1" }],
  [50, { repPitch: 48, zone: 2, order: 91, line: 2, shape: "o", label: "T1", name: "Tom 1" }],
  [45, { repPitch: 45, zone: 1, order: 100, line: 3, shape: "o", label: "T2", name: "Tom 2" }],
  [47, { repPitch: 45, zone: 2, order: 101, line: 3, shape: "o", label: "T2", name: "Tom 2" }],
  [43, { repPitch: 43, zone: 1, order: 70, line: 5, shape: "o", label: "ST1", name: "Stand Tom 1" }],
  [58, { repPitch: 43, zone: 2, order: 71, line: 5, shape: "o", label: "ST1", name: "Stand Tom 1" }],
  [39, { repPitch: 41, zone: 1, order: 80, line: 6, shape: "o", label: "ST2", name: "Stand Tom 2" }],
  [41, { repPitch: 41, zone: 2, order: 81, line: 6, shape: "o", label: "ST2", name: "Stand Tom 2" }],
  [35, { repPitch: 36, zone: 1, order: 110, line: 8, shape: "o", label: "BD", name: "Bass Drum" }],
  [36, { repPitch: 36, zone: 2, order: 111, line: 8, shape: "o", label: "BD", name: "Bass Drum" }]
]);
function generateDrumVariation(data, deviation2 = 1, pAdd = 0.1, pRemove = 0.1) {
  const usedPitches = /* @__PURE__ */ new Set();
  for (const note2 of data) {
    usedPitches.add(note2.pitch);
  }
  const pitches = [...usedPitches];
  const randVelocity = int_default(15, 128);
  const randTime = normal_default(0, deviation2);
  const variation = [];
  for (const note2 of data) {
    if (randFloat(0, 1) < pAdd) {
      const start2 = note2.start + randFloat(0, 1);
      const end = start2 + randFloat(0, 1);
      const velocity = randVelocity();
      const pitch = choose(pitches);
      variation.push(new Note_default(pitch, start2, velocity, 0, end));
    }
    if (randFloat(0, 1) < pRemove) {
    } else {
      const start2 = note2.start + randTime();
      const end = note2.end + randTime();
      const newNote = Note_default.from(note2);
      newNote.start = Math.min(start2, end);
      newNote.end = Math.max(start2, end);
      variation.push(newNote);
    }
  }
  variation.sort((a, b) => a.start - b.start);
  return variation;
}
function simplifyDrumPitches(notes, replacementMap) {
  if (!replacementMap || !(replacementMap instanceof Map)) {
    throw new Error("No replacement map given!");
  }
  const errors = /* @__PURE__ */ new Set();
  const simplified = notes.map((note2) => {
    const oldPitch = note2.pitch;
    let newPitch = oldPitch;
    if (!replacementMap.has(oldPitch)) {
      errors.add(oldPitch);
    } else {
      newPitch = replacementMap.get(oldPitch).repPitch;
    }
    const newNote = Note_default.from({ ...note2, pitch: newPitch });
    return newNote;
  });
  return simplified;
}
function getPitch2PositionMap(replacementMap) {
  const result = /* @__PURE__ */ new Map();
  const uniqeRows = [...group([...replacementMap], (d) => d[1].repPitch)];
  uniqeRows.sort((a, b) => a[1][0][1].order - b[1][0][1].order);
  for (const [index16, d] of uniqeRows.entries()) {
    result.set(d[0], index16);
  }
  return result;
}

// src/instruments/Guitar.js
var Guitar_exports = {};
__export(Guitar_exports, {
  StringedTuning: () => StringedTuning,
  fretboardPositionsFromMidi: () => fretboardPositionsFromMidi,
  generateExampleData: () => generateExampleData,
  getFretboardPositionsFromNoteName: () => getFretboardPositionsFromNoteName,
  getFretboardPositionsFromPitch: () => getFretboardPositionsFromPitch,
  getNoteInfoFromFretboardPos: () => getNoteInfoFromFretboardPos,
  getPitchFromFretboardPos: () => getPitchFromFretboardPos,
  getTuningFromPitches: () => getTuningFromPitches,
  getTuningPitchRange: () => getTuningPitchRange,
  guitarNoteFromNote: () => guitarNoteFromNote,
  stringColors: () => stringColors,
  stringedTunings: () => stringedTunings
});
var StringedTuning = class {
  constructor(name, notes) {
    this.name = name;
    this.notes = notes;
    this.short = notes.join(" ");
    this.pitches = notes.map((note2) => getMidiNoteByLabel(note2).pitch);
    this.stringCount = notes.length;
  }
};
var stringedTunings = /* @__PURE__ */ new Map([
  ["Guitar", /* @__PURE__ */ new Map([
    [6, [
      new StringedTuning("E stand.", ["E2", "A2", "D3", "G3", "B3", "E4"]),
      new StringedTuning("Drop D", ["D2", "A2", "D3", "G3", "B3", "E4"]),
      new StringedTuning("Drop C", ["C2", "G2", "C3", "F3", "A3", "D4"]),
      new StringedTuning("1/2 down", ["D#2", "G#2", "C#3", "F#3", "A#3", "D#4"]),
      new StringedTuning("1 down", ["D2", "G2", "C3", "F3", "A3", "D4"]),
      new StringedTuning("1 1/2 down", ["C#2", "F#2", "B2", "E3", "G#3", "C#4"]),
      new StringedTuning("2 down", ["C2", "F2", "A#2", "D#3", "G3", "C4"]),
      new StringedTuning("DADGAG", ["D2", "A2", "D3", "G3", "A3", "D4"])
    ]],
    [7, [
      new StringedTuning("B stand.", ["B1", "E2", "A2", "D3", "G3", "B3", "E4"]),
      new StringedTuning("Drop A", ["A1", "E2", "A2", "D3", "G3", "B3", "E4"]),
      new StringedTuning("1/2 down", ["A#1", "D#2", "G#2", "C#3", "F#3", "A#3", "D#4"]),
      new StringedTuning("1 down", ["A1", "D2", "G2", "C3", "F3", "A3", "D4"]),
      new StringedTuning("1 1/2 down", ["G#1", "C#2", "F#2", "B2", "E3", "G#3", "C#4"]),
      new StringedTuning("2 down", ["G1", "C2", "F2", "A#2", "D#3", "G3", "C4"])
    ]],
    [8, [
      new StringedTuning("F# stand.", ["F#1", "B1", "E2", "A2", "D3", "G3", "B3", "E4"]),
      new StringedTuning("Drop E", ["E1", "B1", "E2", "A2", "D3", "G3", "B3", "E4"]),
      new StringedTuning("1/2 down", ["F1", "A#1", "D#2", "G#2", "C#3", "F#3", "A#3", "D#4"]),
      new StringedTuning("1 down", ["E1", "A1", "D2", "G2", "C3", "F3", "A3", "D4"]),
      new StringedTuning("1 1/2 down", ["D#1", "G#1", "C#2", "F#2", "B2", "E3", "G#3", "C#4"]),
      new StringedTuning("2 down", ["D1", "G1", "C2", "F2", "A#2", "D#3", "G3", "C4"])
    ]]
  ])],
  ["Bass", /* @__PURE__ */ new Map([
    [4, [
      new StringedTuning("E stand.", ["E1", "A1", "D2", "G2"]),
      new StringedTuning("Drop D", ["D1", "A1", "D2", "G2"]),
      new StringedTuning("1/2 down", ["D#1", "G#1", "C#2", "F#2"]),
      new StringedTuning("1 down", ["D1", "G1", "C2", "F2"]),
      new StringedTuning("1 1/2 down", ["C#1", "F#1", "B1", "E2"]),
      new StringedTuning("2 down", ["C1", "F1", "A#1", "D#2"])
    ]],
    [5, [
      new StringedTuning("B stand.", ["B0", "E1", "A1", "D2", "G2"]),
      new StringedTuning("Drop A", ["A0", "D1", "A1", "D2", "G2"]),
      new StringedTuning("1/2 down", ["A#0", "D#1", "G#1", "C#2", "F#2"]),
      new StringedTuning("1 down", ["A0", "D1", "G1", "C2", "F2"]),
      new StringedTuning("1 1/2 down", ["G#0", "C#1", "F#1", "B1", "E2"]),
      new StringedTuning("2 down", ["G0", "C1", "F1", "A#1", "D#2"])
    ]],
    [6, [
      new StringedTuning("F# stand.", ["F#0", "B0", "E1", "A1", "D2", "G2"]),
      new StringedTuning("Drop E", ["E0", "A0", "D1", "A1", "D2", "G2"]),
      new StringedTuning("1/2 down", ["F0", "A#0", "D#1", "G#1", "C#2", "F#2"]),
      new StringedTuning("1 down", ["E1", "A0", "D1", "G1", "C2", "F2"]),
      new StringedTuning("1 1/2 down", ["D#0", "G#0", "C#1", "F#1", "B1", "E2"]),
      new StringedTuning("2 down", ["D0", "G0", "C1", "F1", "A#1", "D#2"])
    ]]
  ])],
  ["Ukulele", /* @__PURE__ */ new Map([
    [4, [
      new StringedTuning("Hawaii", ["G4", "C4", "E4", "A4"]),
      new StringedTuning("Low G", ["G3", "C4", "E4", "A4"]),
      new StringedTuning("D-tuning", ["A4", "D4", "F#4", "B4"]),
      new StringedTuning("Canadian", ["A3", "D4", "F#4", "B4"]),
      new StringedTuning("Bariton", ["D3", "G3", "B3", "E4"])
    ]]
  ])]
]);
function guitarNoteFromNote(note2, tuning) {
  const string = note2.channel;
  const reversedString = tuning.stringCount - string - 1;
  const fret = note2.pitch - tuning.pitches[reversedString];
  return GuitarNote_default.fromNote(note2, string, fret);
}
function getTuningFromPitches(pitches) {
  const stringCount = pitches.length;
  for (const stringCountMap of stringedTunings.values()) {
    if (stringCountMap.has(stringCount)) {
      const tunings = stringCountMap.get(stringCount);
      for (const t of tunings) {
        if (arrayShallowEquals(t.pitches, pitches)) {
          return t;
        }
      }
    }
  }
  return null;
}
function getTuningPitchRange(tuning, fretCount = 24) {
  const openMax = tuning.pitches[tuning.stringCount - 1];
  const openMin = tuning.pitches[0];
  return [openMin, openMax + fretCount];
}
var stringColors = [
  "#888",
  "#d122e9",
  "#31eb1c",
  "#f37c14",
  "#10edfc",
  "#ffeb09",
  "#ff210d",
  "silver",
  "gold"
];
function getPitchFromFretboardPos(string, fret, tuning) {
  const reversedString = tuning.stringCount - string + 1;
  const openPitch = tuning.pitches[reversedString - 1];
  return openPitch + fret;
}
function getNoteInfoFromFretboardPos(string, fret, tuning) {
  const pitch = getPitchFromFretboardPos(string, fret, tuning);
  return getMidiNoteByNr(pitch);
}
function getFretboardPositionsFromPitch(pitch, tuning, fretCount) {
  const positions = [];
  const stringCount = tuning.stringCount;
  for (let string = 0; string < stringCount; string++) {
    const openPitch = tuning.pitches[string];
    if (pitch < openPitch) {
      continue;
    }
    if (pitch > openPitch + fretCount) {
      continue;
    }
    positions.push({
      string: stringCount - string,
      fret: pitch - openPitch
    });
  }
  return positions;
}
function getFretboardPositionsFromNoteName(name, tuning, fretCount = 24) {
  const n = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  if (!n.includes(name)) {
    return null;
  }
  const positions = [];
  const lowestPitch = n.indexOf(name);
  const stringCount = tuning.stringCount;
  for (let string = 0; string < stringCount; string++) {
    const openPitch = tuning.pitches[string];
    let fret = lowestPitch - openPitch % 12;
    if (fret < 0) {
      fret += 12;
    }
    while (fret <= fretCount) {
      positions.push({
        string: stringCount - string,
        fret
      });
      fret += 12;
    }
  }
  return positions;
}
function generateExampleData(startTime = 0, count = 50, tuning) {
  let currentTime = startTime;
  return Array.from({ length: count }).map(() => {
    const start2 = currentTime + randFloat(0, 1);
    currentTime = start2 + randFloat(0, 1);
    const string = int_default(1, 7)();
    const fret = int_default(0, 25)();
    const pitch = getPitchFromFretboardPos(string, fret, tuning);
    const velocity = int_default(15, 127)();
    return new GuitarNote_default(pitch, start2, velocity, string, currentTime, string, fret);
  });
}
function fretboardPositionsFromMidi(notes, tuning, fretCount = 24) {
  if (!notes || notes.length === 0) {
    return [];
  }
  if (!tuning || !tuning.pitches) {
    console.warn("Invalid tuning parameter!");
    return [];
  }
  const [minPitch, maxPitch] = getTuningPitchRange(tuning, fretCount);
  const possibleNotes = [];
  const errorPitches = [];
  for (const note2 of notes) {
    if (note2.pitch < minPitch || note2.pitch > maxPitch) {
      errorPitches.push(note2.pitch);
    } else {
      possibleNotes.push(note2);
    }
  }
  const result = [];
  for (const note2 of possibleNotes) {
    const positions = getFretboardPositionsFromPitch(note2.pitch, tuning, 24);
    let bestPos = positions[0];
    for (const pos of positions) {
      if (pos.fret < bestPos.fret) {
        bestPos = pos;
      }
    }
    const { string, fret } = bestPos;
    result.push(GuitarNote_default.fromNote(note2, string, fret));
  }
  if (errorPitches.length > 0) {
    const [minDataPitch, maxDataPitch] = extent_default(notes, (d) => d.pitch);
    let advice = "";
    if (minDataPitch < minPitch) {
      advice += `Transpose by ${minPitch - minDataPitch} semitones`;
    }
    if (maxPitch < maxDataPitch) {
      advice += `Transpose by ${maxPitch - maxDataPitch} semitones`;
    }
    console.warn(`Cannot find a fretboard position for ${errorPitches.length} pitches, try another tuning instead:
`, errorPitches, `
Current tuning's pitch range is ${minPitch} - ${maxPitch}`, `
data pitch range is ${minDataPitch} - ${maxDataPitch}
`, advice);
  }
  return result;
}

// src/instruments/Lamellophone.js
var Lamellophone_exports = {};
__export(Lamellophone_exports, {
  LamellophoneTuning: () => LamellophoneTuning,
  bestTransposition: () => bestTransposition,
  convertNotesToHtmlTab: () => convertNotesToHtmlTab,
  convertNotesToTab: () => convertNotesToTab,
  convertNumbersToLetters: () => convertNumbersToLetters,
  convertTabToNotes: () => convertTabToNotes,
  lamellophoneTunings: () => lamellophoneTunings
});

// src/chords/Chords.js
var Chords_exports = {};
__export(Chords_exports, {
  detectChordsByExactStart: () => detectChordsByExactStart,
  detectChordsByOverlap: () => detectChordsByOverlap,
  detectChordsBySimilarStart: () => detectChordsBySimilarStart,
  getChordName: () => getChordName,
  getChordType: () => getChordType
});

// node_modules/.pnpm/@tonaljs+core@4.6.5/node_modules/@tonaljs/core/dist/index.es.js
var fillStr = (s, n) => Array(Math.abs(n) + 1).join(s);
function deprecate(original, alternative, fn) {
  return function(...args) {
    console.warn(`${original} is deprecated. Use ${alternative}.`);
    return fn.apply(this, args);
  };
}
function isNamed(src) {
  return src !== null && typeof src === "object" && typeof src.name === "string" ? true : false;
}
function isPitch(pitch) {
  return pitch !== null && typeof pitch === "object" && typeof pitch.step === "number" && typeof pitch.alt === "number" ? true : false;
}
var FIFTHS = [0, 2, 4, -1, 1, 3, 5];
var STEPS_TO_OCTS = FIFTHS.map((fifths) => Math.floor(fifths * 7 / 12));
function encode(pitch) {
  const { step, alt, oct, dir = 1 } = pitch;
  const f = FIFTHS[step] + 7 * alt;
  if (oct === void 0) {
    return [dir * f];
  }
  const o = oct - STEPS_TO_OCTS[step] - 4 * alt;
  return [dir * f, dir * o];
}
var FIFTHS_TO_STEPS = [3, 0, 4, 1, 5, 2, 6];
function decode(coord) {
  const [f, o, dir] = coord;
  const step = FIFTHS_TO_STEPS[unaltered(f)];
  const alt = Math.floor((f + 1) / 7);
  if (o === void 0) {
    return { step, alt, dir };
  }
  const oct = o + 4 * alt + STEPS_TO_OCTS[step];
  return { step, alt, oct, dir };
}
function unaltered(f) {
  const i = (f + 1) % 7;
  return i < 0 ? 7 + i : i;
}
var NoNote = { empty: true, name: "", pc: "", acc: "" };
var cache$1 = /* @__PURE__ */ new Map();
var stepToLetter = (step) => "CDEFGAB".charAt(step);
var altToAcc = (alt) => alt < 0 ? fillStr("b", -alt) : fillStr("#", alt);
var accToAlt = (acc) => acc[0] === "b" ? -acc.length : acc.length;
function note(src) {
  const cached = cache$1.get(src);
  if (cached) {
    return cached;
  }
  const value = typeof src === "string" ? parse$1(src) : isPitch(src) ? note(pitchName$1(src)) : isNamed(src) ? note(src.name) : NoNote;
  cache$1.set(src, value);
  return value;
}
var REGEX$1 = /^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;
function tokenizeNote(str) {
  const m = REGEX$1.exec(str);
  return [m[1].toUpperCase(), m[2].replace(/x/g, "##"), m[3], m[4]];
}
function coordToNote(noteCoord) {
  return note(decode(noteCoord));
}
var mod = (n, m) => (n % m + m) % m;
var SEMI = [0, 2, 4, 5, 7, 9, 11];
function parse$1(noteName) {
  const tokens = tokenizeNote(noteName);
  if (tokens[0] === "" || tokens[3] !== "") {
    return NoNote;
  }
  const letter = tokens[0];
  const acc = tokens[1];
  const octStr = tokens[2];
  const step = (letter.charCodeAt(0) + 3) % 7;
  const alt = accToAlt(acc);
  const oct = octStr.length ? +octStr : void 0;
  const coord = encode({ step, alt, oct });
  const name = letter + acc + octStr;
  const pc = letter + acc;
  const chroma = (SEMI[step] + alt + 120) % 12;
  const height = oct === void 0 ? mod(SEMI[step] + alt, 12) - 12 * 99 : SEMI[step] + alt + 12 * (oct + 1);
  const midi = height >= 0 && height <= 127 ? height : null;
  const freq = oct === void 0 ? null : Math.pow(2, (height - 69) / 12) * 440;
  return {
    empty: false,
    acc,
    alt,
    chroma,
    coord,
    freq,
    height,
    letter,
    midi,
    name,
    oct,
    pc,
    step
  };
}
function pitchName$1(props) {
  const { step, alt, oct } = props;
  const letter = stepToLetter(step);
  if (!letter) {
    return "";
  }
  const pc = letter + altToAcc(alt);
  return oct || oct === 0 ? pc + oct : pc;
}
var NoInterval = { empty: true, name: "", acc: "" };
var INTERVAL_TONAL_REGEX = "([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})";
var INTERVAL_SHORTHAND_REGEX = "(AA|A|P|M|m|d|dd)([-+]?\\d+)";
var REGEX = new RegExp("^" + INTERVAL_TONAL_REGEX + "|" + INTERVAL_SHORTHAND_REGEX + "$");
function tokenizeInterval(str) {
  const m = REGEX.exec(`${str}`);
  if (m === null) {
    return ["", ""];
  }
  return m[1] ? [m[1], m[2]] : [m[4], m[3]];
}
var cache = {};
function interval2(src) {
  return typeof src === "string" ? cache[src] || (cache[src] = parse2(src)) : isPitch(src) ? interval2(pitchName(src)) : isNamed(src) ? interval2(src.name) : NoInterval;
}
var SIZES = [0, 2, 4, 5, 7, 9, 11];
var TYPES = "PMMPPMM";
function parse2(str) {
  const tokens = tokenizeInterval(str);
  if (tokens[0] === "") {
    return NoInterval;
  }
  const num = +tokens[0];
  const q = tokens[1];
  const step = (Math.abs(num) - 1) % 7;
  const t = TYPES[step];
  if (t === "M" && q === "P") {
    return NoInterval;
  }
  const type2 = t === "M" ? "majorable" : "perfectable";
  const name = "" + num + q;
  const dir = num < 0 ? -1 : 1;
  const simple = num === 8 || num === -8 ? num : dir * (step + 1);
  const alt = qToAlt(type2, q);
  const oct = Math.floor((Math.abs(num) - 1) / 7);
  const semitones = dir * (SIZES[step] + alt + 12 * oct);
  const chroma = (dir * (SIZES[step] + alt) % 12 + 12) % 12;
  const coord = encode({ step, alt, oct, dir });
  return {
    empty: false,
    name,
    num,
    q,
    step,
    alt,
    dir,
    type: type2,
    simple,
    semitones,
    chroma,
    coord,
    oct
  };
}
function coordToInterval(coord, forceDescending) {
  const [f, o = 0] = coord;
  const isDescending = f * 7 + o * 12 < 0;
  const ivl = forceDescending || isDescending ? [-f, -o, -1] : [f, o, 1];
  return interval2(decode(ivl));
}
function qToAlt(type2, q) {
  return q === "M" && type2 === "majorable" || q === "P" && type2 === "perfectable" ? 0 : q === "m" && type2 === "majorable" ? -1 : /^A+$/.test(q) ? q.length : /^d+$/.test(q) ? -1 * (type2 === "perfectable" ? q.length : q.length + 1) : 0;
}
function pitchName(props) {
  const { step, alt, oct = 0, dir } = props;
  if (!dir) {
    return "";
  }
  const calcNum = step + 1 + 7 * oct;
  const num = calcNum === 0 ? step + 1 : calcNum;
  const d = dir < 0 ? "-" : "";
  const type2 = TYPES[step] === "M" ? "majorable" : "perfectable";
  const name = d + num + altToQ(type2, alt);
  return name;
}
function altToQ(type2, alt) {
  if (alt === 0) {
    return type2 === "majorable" ? "M" : "P";
  } else if (alt === -1 && type2 === "majorable") {
    return "m";
  } else if (alt > 0) {
    return fillStr("A", alt);
  } else {
    return fillStr("d", type2 === "perfectable" ? alt : alt + 1);
  }
}
function transpose(noteName, intervalName) {
  const note$1 = note(noteName);
  const interval$1 = interval2(intervalName);
  if (note$1.empty || interval$1.empty) {
    return "";
  }
  const noteCoord = note$1.coord;
  const intervalCoord = interval$1.coord;
  const tr = noteCoord.length === 1 ? [noteCoord[0] + intervalCoord[0]] : [noteCoord[0] + intervalCoord[0], noteCoord[1] + intervalCoord[1]];
  return coordToNote(tr).name;
}
function distance(fromNote, toNote) {
  const from = note(fromNote);
  const to = note(toNote);
  if (from.empty || to.empty) {
    return "";
  }
  const fcoord = from.coord;
  const tcoord = to.coord;
  const fifths = tcoord[0] - fcoord[0];
  const octs = fcoord.length === 2 && tcoord.length === 2 ? tcoord[1] - fcoord[1] : -Math.floor(fifths * 7 / 12);
  const forceDescending = to.height === from.height && to.midi !== null && from.midi !== null && from.step > to.step;
  return coordToInterval([fifths, octs], forceDescending).name;
}

// node_modules/.pnpm/@tonaljs+collection@4.6.2/node_modules/@tonaljs/collection/dist/index.es.js
function rotate(times, arr) {
  const len = arr.length;
  const n = (times % len + len) % len;
  return arr.slice(n, len).concat(arr.slice(0, n));
}
function compact(arr) {
  return arr.filter((n) => n === 0 || n);
}

// node_modules/.pnpm/@tonaljs+pcset@4.6.5/node_modules/@tonaljs/pcset/dist/index.es.js
var EmptyPcset = {
  empty: true,
  name: "",
  setNum: 0,
  chroma: "000000000000",
  normalized: "000000000000",
  intervals: []
};
var setNumToChroma = (num) => Number(num).toString(2);
var chromaToNumber = (chroma) => parseInt(chroma, 2);
var REGEX2 = /^[01]{12}$/;
function isChroma(set4) {
  return REGEX2.test(set4);
}
var isPcsetNum = (set4) => typeof set4 === "number" && set4 >= 0 && set4 <= 4095;
var isPcset = (set4) => set4 && isChroma(set4.chroma);
var cache2 = { [EmptyPcset.chroma]: EmptyPcset };
function get3(src) {
  const chroma = isChroma(src) ? src : isPcsetNum(src) ? setNumToChroma(src) : Array.isArray(src) ? listToChroma(src) : isPcset(src) ? src.chroma : EmptyPcset.chroma;
  return cache2[chroma] = cache2[chroma] || chromaToPcset(chroma);
}
var pcset = deprecate("Pcset.pcset", "Pcset.get", get3);
var IVLS = [
  "1P",
  "2m",
  "2M",
  "3m",
  "3M",
  "4P",
  "5d",
  "5P",
  "6m",
  "6M",
  "7m",
  "7M"
];
function chromaToIntervals(chroma) {
  const intervals = [];
  for (let i = 0; i < 12; i++) {
    if (chroma.charAt(i) === "1")
      intervals.push(IVLS[i]);
  }
  return intervals;
}
function modes(set4, normalize2 = true) {
  const pcs = get3(set4);
  const binary = pcs.chroma.split("");
  return compact(binary.map((_, i) => {
    const r = rotate(i, binary);
    return normalize2 && r[0] === "0" ? null : r.join("");
  }));
}
function isSubsetOf(set4) {
  const s = get3(set4).setNum;
  return (notes) => {
    const o = get3(notes).setNum;
    return s && s !== o && (o & s) === o;
  };
}
function isSupersetOf(set4) {
  const s = get3(set4).setNum;
  return (notes) => {
    const o = get3(notes).setNum;
    return s && s !== o && (o | s) === o;
  };
}
function chromaRotations(chroma) {
  const binary = chroma.split("");
  return binary.map((_, i) => rotate(i, binary).join(""));
}
function chromaToPcset(chroma) {
  const setNum = chromaToNumber(chroma);
  const normalizedNum = chromaRotations(chroma).map(chromaToNumber).filter((n) => n >= 2048).sort()[0];
  const normalized = setNumToChroma(normalizedNum);
  const intervals = chromaToIntervals(chroma);
  return {
    empty: false,
    name: "",
    setNum,
    chroma,
    normalized,
    intervals
  };
}
function listToChroma(set4) {
  if (set4.length === 0) {
    return EmptyPcset.chroma;
  }
  let pitch;
  const binary = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < set4.length; i++) {
    pitch = note(set4[i]);
    if (pitch.empty)
      pitch = interval2(set4[i]);
    if (!pitch.empty)
      binary[pitch.chroma] = 1;
  }
  return binary.join("");
}

// node_modules/.pnpm/@tonaljs+chord-type@4.6.5/node_modules/@tonaljs/chord-type/dist/index.es.js
var CHORDS = [
  ["1P 3M 5P", "major", "M ^ "],
  ["1P 3M 5P 7M", "major seventh", "maj7 \u0394 ma7 M7 Maj7 ^7"],
  ["1P 3M 5P 7M 9M", "major ninth", "maj9 \u03949 ^9"],
  ["1P 3M 5P 7M 9M 13M", "major thirteenth", "maj13 Maj13 ^13"],
  ["1P 3M 5P 6M", "sixth", "6 add6 add13 M6"],
  ["1P 3M 5P 6M 9M", "sixth/ninth", "6/9 69 M69"],
  ["1P 3M 6m 7M", "major seventh flat sixth", "M7b6 ^7b6"],
  [
    "1P 3M 5P 7M 11A",
    "major seventh sharp eleventh",
    "maj#4 \u0394#4 \u0394#11 M7#11 ^7#11 maj7#11"
  ],
  ["1P 3m 5P", "minor", "m min -"],
  ["1P 3m 5P 7m", "minor seventh", "m7 min7 mi7 -7"],
  [
    "1P 3m 5P 7M",
    "minor/major seventh",
    "m/ma7 m/maj7 mM7 mMaj7 m/M7 -\u03947 m\u0394 -^7"
  ],
  ["1P 3m 5P 6M", "minor sixth", "m6 -6"],
  ["1P 3m 5P 7m 9M", "minor ninth", "m9 -9"],
  ["1P 3m 5P 7M 9M", "minor/major ninth", "mM9 mMaj9 -^9"],
  ["1P 3m 5P 7m 9M 11P", "minor eleventh", "m11 -11"],
  ["1P 3m 5P 7m 9M 13M", "minor thirteenth", "m13 -13"],
  ["1P 3m 5d", "diminished", "dim \xB0 o"],
  ["1P 3m 5d 7d", "diminished seventh", "dim7 \xB07 o7"],
  ["1P 3m 5d 7m", "half-diminished", "m7b5 \xF8 -7b5 h7 h"],
  ["1P 3M 5P 7m", "dominant seventh", "7 dom"],
  ["1P 3M 5P 7m 9M", "dominant ninth", "9"],
  ["1P 3M 5P 7m 9M 13M", "dominant thirteenth", "13"],
  ["1P 3M 5P 7m 11A", "lydian dominant seventh", "7#11 7#4"],
  ["1P 3M 5P 7m 9m", "dominant flat ninth", "7b9"],
  ["1P 3M 5P 7m 9A", "dominant sharp ninth", "7#9"],
  ["1P 3M 7m 9m", "altered", "alt7"],
  ["1P 4P 5P", "suspended fourth", "sus4 sus"],
  ["1P 2M 5P", "suspended second", "sus2"],
  ["1P 4P 5P 7m", "suspended fourth seventh", "7sus4 7sus"],
  ["1P 5P 7m 9M 11P", "eleventh", "11"],
  [
    "1P 4P 5P 7m 9m",
    "suspended fourth flat ninth",
    "b9sus phryg 7b9sus 7b9sus4"
  ],
  ["1P 5P", "fifth", "5"],
  ["1P 3M 5A", "augmented", "aug + +5 ^#5"],
  ["1P 3m 5A", "minor augmented", "m#5 -#5 m+"],
  ["1P 3M 5A 7M", "augmented seventh", "maj7#5 maj7+5 +maj7 ^7#5"],
  [
    "1P 3M 5P 7M 9M 11A",
    "major sharp eleventh (lydian)",
    "maj9#11 \u03949#11 ^9#11"
  ],
  ["1P 2M 4P 5P", "", "sus24 sus4add9"],
  ["1P 3M 5A 7M 9M", "", "maj9#5 Maj9#5"],
  ["1P 3M 5A 7m", "", "7#5 +7 7+ 7aug aug7"],
  ["1P 3M 5A 7m 9A", "", "7#5#9 7#9#5 7alt"],
  ["1P 3M 5A 7m 9M", "", "9#5 9+"],
  ["1P 3M 5A 7m 9M 11A", "", "9#5#11"],
  ["1P 3M 5A 7m 9m", "", "7#5b9 7b9#5"],
  ["1P 3M 5A 7m 9m 11A", "", "7#5b9#11"],
  ["1P 3M 5A 9A", "", "+add#9"],
  ["1P 3M 5A 9M", "", "M#5add9 +add9"],
  ["1P 3M 5P 6M 11A", "", "M6#11 M6b5 6#11 6b5"],
  ["1P 3M 5P 6M 7M 9M", "", "M7add13"],
  ["1P 3M 5P 6M 9M 11A", "", "69#11"],
  ["1P 3m 5P 6M 9M", "", "m69 -69"],
  ["1P 3M 5P 6m 7m", "", "7b6"],
  ["1P 3M 5P 7M 9A 11A", "", "maj7#9#11"],
  ["1P 3M 5P 7M 9M 11A 13M", "", "M13#11 maj13#11 M13+4 M13#4"],
  ["1P 3M 5P 7M 9m", "", "M7b9"],
  ["1P 3M 5P 7m 11A 13m", "", "7#11b13 7b5b13"],
  ["1P 3M 5P 7m 13M", "", "7add6 67 7add13"],
  ["1P 3M 5P 7m 9A 11A", "", "7#9#11 7b5#9 7#9b5"],
  ["1P 3M 5P 7m 9A 11A 13M", "", "13#9#11"],
  ["1P 3M 5P 7m 9A 11A 13m", "", "7#9#11b13"],
  ["1P 3M 5P 7m 9A 13M", "", "13#9"],
  ["1P 3M 5P 7m 9A 13m", "", "7#9b13"],
  ["1P 3M 5P 7m 9M 11A", "", "9#11 9+4 9#4"],
  ["1P 3M 5P 7m 9M 11A 13M", "", "13#11 13+4 13#4"],
  ["1P 3M 5P 7m 9M 11A 13m", "", "9#11b13 9b5b13"],
  ["1P 3M 5P 7m 9m 11A", "", "7b9#11 7b5b9 7b9b5"],
  ["1P 3M 5P 7m 9m 11A 13M", "", "13b9#11"],
  ["1P 3M 5P 7m 9m 11A 13m", "", "7b9b13#11 7b9#11b13 7b5b9b13"],
  ["1P 3M 5P 7m 9m 13M", "", "13b9"],
  ["1P 3M 5P 7m 9m 13m", "", "7b9b13"],
  ["1P 3M 5P 7m 9m 9A", "", "7b9#9"],
  ["1P 3M 5P 9M", "", "Madd9 2 add9 add2"],
  ["1P 3M 5P 9m", "", "Maddb9"],
  ["1P 3M 5d", "", "Mb5"],
  ["1P 3M 5d 6M 7m 9M", "", "13b5"],
  ["1P 3M 5d 7M", "", "M7b5"],
  ["1P 3M 5d 7M 9M", "", "M9b5"],
  ["1P 3M 5d 7m", "", "7b5"],
  ["1P 3M 5d 7m 9M", "", "9b5"],
  ["1P 3M 7m", "", "7no5"],
  ["1P 3M 7m 13m", "", "7b13"],
  ["1P 3M 7m 9M", "", "9no5"],
  ["1P 3M 7m 9M 13M", "", "13no5"],
  ["1P 3M 7m 9M 13m", "", "9b13"],
  ["1P 3m 4P 5P", "", "madd4"],
  ["1P 3m 5P 6m 7M", "", "mMaj7b6"],
  ["1P 3m 5P 6m 7M 9M", "", "mMaj9b6"],
  ["1P 3m 5P 7m 11P", "", "m7add11 m7add4"],
  ["1P 3m 5P 9M", "", "madd9"],
  ["1P 3m 5d 6M 7M", "", "o7M7"],
  ["1P 3m 5d 7M", "", "oM7"],
  ["1P 3m 6m 7M", "", "mb6M7"],
  ["1P 3m 6m 7m", "", "m7#5"],
  ["1P 3m 6m 7m 9M", "", "m9#5"],
  ["1P 3m 5A 7m 9M 11P", "", "m11A"],
  ["1P 3m 6m 9m", "", "mb6b9"],
  ["1P 2M 3m 5d 7m", "", "m9b5"],
  ["1P 4P 5A 7M", "", "M7#5sus4"],
  ["1P 4P 5A 7M 9M", "", "M9#5sus4"],
  ["1P 4P 5A 7m", "", "7#5sus4"],
  ["1P 4P 5P 7M", "", "M7sus4"],
  ["1P 4P 5P 7M 9M", "", "M9sus4"],
  ["1P 4P 5P 7m 9M", "", "9sus4 9sus"],
  ["1P 4P 5P 7m 9M 13M", "", "13sus4 13sus"],
  ["1P 4P 5P 7m 9m 13m", "", "7sus4b9b13 7b9b13sus4"],
  ["1P 4P 7m 10m", "", "4 quartal"],
  ["1P 5P 7m 9m 11P", "", "11b9"]
];
var NoChordType = {
  ...EmptyPcset,
  name: "",
  quality: "Unknown",
  intervals: [],
  aliases: []
};
var dictionary = [];
var index2 = {};
function get4(type2) {
  return index2[type2] || NoChordType;
}
var chordType = deprecate("ChordType.chordType", "ChordType.get", get4);
function all() {
  return dictionary.slice();
}
var entries = deprecate("ChordType.entries", "ChordType.all", all);
function add(intervals, aliases, fullName) {
  const quality = getQuality(intervals);
  const chord2 = {
    ...get3(intervals),
    name: fullName || "",
    quality,
    intervals,
    aliases
  };
  dictionary.push(chord2);
  if (chord2.name) {
    index2[chord2.name] = chord2;
  }
  index2[chord2.setNum] = chord2;
  index2[chord2.chroma] = chord2;
  chord2.aliases.forEach((alias) => addAlias(chord2, alias));
}
function addAlias(chord2, alias) {
  index2[alias] = chord2;
}
function getQuality(intervals) {
  const has = (interval3) => intervals.indexOf(interval3) !== -1;
  return has("5A") ? "Augmented" : has("3M") ? "Major" : has("5d") ? "Diminished" : has("3m") ? "Minor" : "Unknown";
}
CHORDS.forEach(([ivls, fullName, names2]) => add(ivls.split(" "), names2.split(" "), fullName));
dictionary.sort((a, b) => a.setNum - b.setNum);

// node_modules/.pnpm/@tonaljs+chord-detect@4.6.5/node_modules/@tonaljs/chord-detect/dist/index.es.js
var namedSet = (notes) => {
  const pcToName = notes.reduce((record, n) => {
    const chroma = note(n).chroma;
    if (chroma !== void 0) {
      record[chroma] = record[chroma] || note(n).name;
    }
    return record;
  }, {});
  return (chroma) => pcToName[chroma];
};
function detect(source) {
  const notes = source.map((n) => note(n).pc).filter((x) => x);
  if (note.length === 0) {
    return [];
  }
  const found = findExactMatches(notes, 1);
  return found.filter((chord2) => chord2.weight).sort((a, b) => b.weight - a.weight).map((chord2) => chord2.name);
}
function findExactMatches(notes, weight) {
  const tonic = notes[0];
  const tonicChroma = note(tonic).chroma;
  const noteName = namedSet(notes);
  const allModes = modes(notes, false);
  const found = [];
  allModes.forEach((mode2, index16) => {
    const chordTypes2 = all().filter((chordType2) => chordType2.chroma === mode2);
    chordTypes2.forEach((chordType2) => {
      const chordName = chordType2.aliases[0];
      const baseNote = noteName(index16);
      const isInversion = index16 !== tonicChroma;
      if (isInversion) {
        found.push({
          weight: 0.5 * weight,
          name: `${baseNote}${chordName}/${tonic}`
        });
      } else {
        found.push({ weight: 1 * weight, name: `${baseNote}${chordName}` });
      }
    });
  });
  return found;
}

// node_modules/.pnpm/@tonaljs+scale-type@4.6.5/node_modules/@tonaljs/scale-type/dist/index.es.js
var SCALES = [
  ["1P 2M 3M 5P 6M", "major pentatonic", "pentatonic"],
  ["1P 3M 4P 5P 7M", "ionian pentatonic"],
  ["1P 3M 4P 5P 7m", "mixolydian pentatonic", "indian"],
  ["1P 2M 4P 5P 6M", "ritusen"],
  ["1P 2M 4P 5P 7m", "egyptian"],
  ["1P 3M 4P 5d 7m", "neopolitan major pentatonic"],
  ["1P 3m 4P 5P 6m", "vietnamese 1"],
  ["1P 2m 3m 5P 6m", "pelog"],
  ["1P 2m 4P 5P 6m", "kumoijoshi"],
  ["1P 2M 3m 5P 6m", "hirajoshi"],
  ["1P 2m 4P 5d 7m", "iwato"],
  ["1P 2m 4P 5P 7m", "in-sen"],
  ["1P 3M 4A 5P 7M", "lydian pentatonic", "chinese"],
  ["1P 3m 4P 6m 7m", "malkos raga"],
  ["1P 3m 4P 5d 7m", "locrian pentatonic", "minor seven flat five pentatonic"],
  ["1P 3m 4P 5P 7m", "minor pentatonic", "vietnamese 2"],
  ["1P 3m 4P 5P 6M", "minor six pentatonic"],
  ["1P 2M 3m 5P 6M", "flat three pentatonic", "kumoi"],
  ["1P 2M 3M 5P 6m", "flat six pentatonic"],
  ["1P 2m 3M 5P 6M", "scriabin"],
  ["1P 3M 5d 6m 7m", "whole tone pentatonic"],
  ["1P 3M 4A 5A 7M", "lydian #5P pentatonic"],
  ["1P 3M 4A 5P 7m", "lydian dominant pentatonic"],
  ["1P 3m 4P 5P 7M", "minor #7M pentatonic"],
  ["1P 3m 4d 5d 7m", "super locrian pentatonic"],
  ["1P 2M 3m 4P 5P 7M", "minor hexatonic"],
  ["1P 2A 3M 5P 5A 7M", "augmented"],
  ["1P 2M 3m 3M 5P 6M", "major blues"],
  ["1P 2M 4P 5P 6M 7m", "piongio"],
  ["1P 2m 3M 4A 6M 7m", "prometheus neopolitan"],
  ["1P 2M 3M 4A 6M 7m", "prometheus"],
  ["1P 2m 3M 5d 6m 7m", "mystery #1"],
  ["1P 2m 3M 4P 5A 6M", "six tone symmetric"],
  ["1P 2M 3M 4A 5A 7m", "whole tone", "messiaen's mode #1"],
  ["1P 2m 4P 4A 5P 7M", "messiaen's mode #5"],
  ["1P 3m 4P 5d 5P 7m", "minor blues", "blues"],
  ["1P 2M 3M 4P 5d 6m 7m", "locrian major", "arabian"],
  ["1P 2m 3M 4A 5P 6m 7M", "double harmonic lydian"],
  ["1P 2M 3m 4P 5P 6m 7M", "harmonic minor"],
  [
    "1P 2m 2A 3M 4A 6m 7m",
    "altered",
    "super locrian",
    "diminished whole tone",
    "pomeroy"
  ],
  ["1P 2M 3m 4P 5d 6m 7m", "locrian #2", "half-diminished", "aeolian b5"],
  [
    "1P 2M 3M 4P 5P 6m 7m",
    "mixolydian b6",
    "melodic minor fifth mode",
    "hindu"
  ],
  ["1P 2M 3M 4A 5P 6M 7m", "lydian dominant", "lydian b7", "overtone"],
  ["1P 2M 3M 4A 5P 6M 7M", "lydian"],
  ["1P 2M 3M 4A 5A 6M 7M", "lydian augmented"],
  [
    "1P 2m 3m 4P 5P 6M 7m",
    "dorian b2",
    "phrygian #6",
    "melodic minor second mode"
  ],
  ["1P 2M 3m 4P 5P 6M 7M", "melodic minor"],
  ["1P 2m 3m 4P 5d 6m 7m", "locrian"],
  [
    "1P 2m 3m 4d 5d 6m 7d",
    "ultralocrian",
    "superlocrian bb7",
    "superlocrian diminished"
  ],
  ["1P 2m 3m 4P 5d 6M 7m", "locrian 6", "locrian natural 6", "locrian sharp 6"],
  ["1P 2A 3M 4P 5P 5A 7M", "augmented heptatonic"],
  [
    "1P 2M 3m 4A 5P 6M 7m",
    "dorian #4",
    "ukrainian dorian",
    "romanian minor",
    "altered dorian"
  ],
  ["1P 2M 3m 4A 5P 6M 7M", "lydian diminished"],
  ["1P 2m 3m 4P 5P 6m 7m", "phrygian"],
  ["1P 2M 3M 4A 5A 7m 7M", "leading whole tone"],
  ["1P 2M 3M 4A 5P 6m 7m", "lydian minor"],
  ["1P 2m 3M 4P 5P 6m 7m", "phrygian dominant", "spanish", "phrygian major"],
  ["1P 2m 3m 4P 5P 6m 7M", "balinese"],
  ["1P 2m 3m 4P 5P 6M 7M", "neopolitan major"],
  ["1P 2M 3m 4P 5P 6m 7m", "aeolian", "minor"],
  ["1P 2M 3M 4P 5P 6m 7M", "harmonic major"],
  ["1P 2m 3M 4P 5P 6m 7M", "double harmonic major", "gypsy"],
  ["1P 2M 3m 4P 5P 6M 7m", "dorian"],
  ["1P 2M 3m 4A 5P 6m 7M", "hungarian minor"],
  ["1P 2A 3M 4A 5P 6M 7m", "hungarian major"],
  ["1P 2m 3M 4P 5d 6M 7m", "oriental"],
  ["1P 2m 3m 3M 4A 5P 7m", "flamenco"],
  ["1P 2m 3m 4A 5P 6m 7M", "todi raga"],
  ["1P 2M 3M 4P 5P 6M 7m", "mixolydian", "dominant"],
  ["1P 2m 3M 4P 5d 6m 7M", "persian"],
  ["1P 2M 3M 4P 5P 6M 7M", "major", "ionian"],
  ["1P 2m 3M 5d 6m 7m 7M", "enigmatic"],
  [
    "1P 2M 3M 4P 5A 6M 7M",
    "major augmented",
    "major #5",
    "ionian augmented",
    "ionian #5"
  ],
  ["1P 2A 3M 4A 5P 6M 7M", "lydian #9"],
  ["1P 2m 2M 4P 4A 5P 6m 7M", "messiaen's mode #4"],
  ["1P 2m 3M 4P 4A 5P 6m 7M", "purvi raga"],
  ["1P 2m 3m 3M 4P 5P 6m 7m", "spanish heptatonic"],
  ["1P 2M 3M 4P 5P 6M 7m 7M", "bebop"],
  ["1P 2M 3m 3M 4P 5P 6M 7m", "bebop minor"],
  ["1P 2M 3M 4P 5P 5A 6M 7M", "bebop major"],
  ["1P 2m 3m 4P 5d 5P 6m 7m", "bebop locrian"],
  ["1P 2M 3m 4P 5P 6m 7m 7M", "minor bebop"],
  ["1P 2M 3m 4P 5d 6m 6M 7M", "diminished", "whole-half diminished"],
  ["1P 2M 3M 4P 5d 5P 6M 7M", "ichikosucho"],
  ["1P 2M 3m 4P 5P 6m 6M 7M", "minor six diminished"],
  [
    "1P 2m 3m 3M 4A 5P 6M 7m",
    "half-whole diminished",
    "dominant diminished",
    "messiaen's mode #2"
  ],
  ["1P 3m 3M 4P 5P 6M 7m 7M", "kafi raga"],
  ["1P 2M 3M 4P 4A 5A 6A 7M", "messiaen's mode #6"],
  ["1P 2M 3m 3M 4P 5d 5P 6M 7m", "composite blues"],
  ["1P 2M 3m 3M 4A 5P 6m 7m 7M", "messiaen's mode #3"],
  ["1P 2m 2M 3m 4P 4A 5P 6m 6M 7M", "messiaen's mode #7"],
  ["1P 2m 2M 3m 3M 4P 5d 5P 6m 6M 7m 7M", "chromatic"]
];
var NoScaleType = {
  ...EmptyPcset,
  intervals: [],
  aliases: []
};
var dictionary2 = [];
var index3 = {};
function get5(type2) {
  return index3[type2] || NoScaleType;
}
var scaleType = deprecate("ScaleDictionary.scaleType", "ScaleType.get", get5);
function all2() {
  return dictionary2.slice();
}
var entries2 = deprecate("ScaleDictionary.entries", "ScaleType.all", all2);
function add2(intervals, name, aliases = []) {
  const scale2 = { ...get3(intervals), name, intervals, aliases };
  dictionary2.push(scale2);
  index3[scale2.name] = scale2;
  index3[scale2.setNum] = scale2;
  index3[scale2.chroma] = scale2;
  scale2.aliases.forEach((alias) => addAlias2(scale2, alias));
  return scale2;
}
function addAlias2(scale2, alias) {
  index3[alias] = scale2;
}
SCALES.forEach(([ivls, name, ...aliases]) => add2(ivls.split(" "), name, aliases));

// node_modules/.pnpm/@tonaljs+chord@4.6.5/node_modules/@tonaljs/chord/dist/index.es.js
var NoChord = {
  empty: true,
  name: "",
  symbol: "",
  root: "",
  rootDegree: 0,
  type: "",
  tonic: null,
  setNum: NaN,
  quality: "Unknown",
  chroma: "",
  normalized: "",
  aliases: [],
  notes: [],
  intervals: []
};
var NUM_TYPES = /^(6|64|7|9|11|13)$/;
function tokenize(name) {
  const [letter, acc, oct, type2] = tokenizeNote(name);
  if (letter === "") {
    return ["", name];
  }
  if (letter === "A" && type2 === "ug") {
    return ["", "aug"];
  }
  if (!type2 && (oct === "4" || oct === "5")) {
    return [letter + acc, oct];
  }
  if (NUM_TYPES.test(oct)) {
    return [letter + acc, oct + type2];
  } else {
    return [letter + acc + oct, type2];
  }
}
function get6(src) {
  if (src === "") {
    return NoChord;
  }
  if (Array.isArray(src) && src.length === 2) {
    return getChord(src[1], src[0]);
  } else {
    const [tonic, type2] = tokenize(src);
    const chord2 = getChord(type2, tonic);
    return chord2.empty ? getChord(src) : chord2;
  }
}
function getChord(typeName, optionalTonic, optionalRoot) {
  const type2 = get4(typeName);
  const tonic = note(optionalTonic || "");
  const root2 = note(optionalRoot || "");
  if (type2.empty || optionalTonic && tonic.empty || optionalRoot && root2.empty) {
    return NoChord;
  }
  const rootInterval = distance(tonic.pc, root2.pc);
  const rootDegree = type2.intervals.indexOf(rootInterval) + 1;
  if (!root2.empty && !rootDegree) {
    return NoChord;
  }
  const intervals = Array.from(type2.intervals);
  for (let i = 1; i < rootDegree; i++) {
    const num = intervals[0][0];
    const quality = intervals[0][1];
    const newNum = parseInt(num, 10) + 7;
    intervals.push(`${newNum}${quality}`);
    intervals.shift();
  }
  const notes = tonic.empty ? [] : intervals.map((i) => transpose(tonic, i));
  typeName = type2.aliases.indexOf(typeName) !== -1 ? typeName : type2.aliases[0];
  const symbol = `${tonic.empty ? "" : tonic.pc}${typeName}${root2.empty || rootDegree <= 1 ? "" : "/" + root2.pc}`;
  const name = `${optionalTonic ? tonic.pc + " " : ""}${type2.name}${rootDegree > 1 && optionalRoot ? " over " + root2.pc : ""}`;
  return {
    ...type2,
    name,
    symbol,
    type: type2.name,
    root: root2.name,
    intervals,
    rootDegree,
    tonic: tonic.name,
    notes
  };
}
var chord = deprecate("Chord.chord", "Chord.get", get6);
function transpose2(chordName, interval3) {
  const [tonic, type2] = tokenize(chordName);
  if (!tonic) {
    return chordName;
  }
  return transpose(tonic, interval3) + type2;
}
function chordScales(name) {
  const s = get6(name);
  const isChordIncluded = isSupersetOf(s.chroma);
  return all2().filter((scale2) => isChordIncluded(scale2.chroma)).map((scale2) => scale2.name);
}
function extended(chordName) {
  const s = get6(chordName);
  const isSuperset = isSupersetOf(s.chroma);
  return all().filter((chord2) => isSuperset(chord2.chroma)).map((chord2) => s.tonic + chord2.aliases[0]);
}
function reduced(chordName) {
  const s = get6(chordName);
  const isSubset = isSubsetOf(s.chroma);
  return all().filter((chord2) => isSubset(chord2.chroma)).map((chord2) => s.tonic + chord2.aliases[0]);
}
var index4 = {
  getChord,
  get: get6,
  detect,
  chordScales,
  extended,
  reduced,
  tokenize,
  transpose: transpose2,
  chord
};

// node_modules/.pnpm/@tonaljs+duration-value@4.6.2/node_modules/@tonaljs/duration-value/dist/index.es.js
var DATA = [
  [
    0.125,
    "dl",
    ["large", "duplex longa", "maxima", "octuple", "octuple whole"]
  ],
  [0.25, "l", ["long", "longa"]],
  [0.5, "d", ["double whole", "double", "breve"]],
  [1, "w", ["whole", "semibreve"]],
  [2, "h", ["half", "minim"]],
  [4, "q", ["quarter", "crotchet"]],
  [8, "e", ["eighth", "quaver"]],
  [16, "s", ["sixteenth", "semiquaver"]],
  [32, "t", ["thirty-second", "demisemiquaver"]],
  [64, "sf", ["sixty-fourth", "hemidemisemiquaver"]],
  [128, "h", ["hundred twenty-eighth"]],
  [256, "th", ["two hundred fifty-sixth"]]
];
var VALUES = [];
DATA.forEach(([denominator, shorthand, names2]) => add3(denominator, shorthand, names2));
function add3(denominator, shorthand, names2) {
  VALUES.push({
    empty: false,
    dots: "",
    name: "",
    value: 1 / denominator,
    fraction: denominator < 1 ? [1 / denominator, 1] : [1, denominator],
    shorthand,
    names: names2
  });
}

// node_modules/.pnpm/@tonaljs+interval@4.6.5/node_modules/@tonaljs/interval/dist/index.es.js
var IQ = "P m M m M P d P m M m M".split(" ");
var add4 = combinator((a, b) => [a[0] + b[0], a[1] + b[1]]);
var substract = combinator((a, b) => [a[0] - b[0], a[1] - b[1]]);
function combinator(fn) {
  return (a, b) => {
    const coordA = interval2(a).coord;
    const coordB = interval2(b).coord;
    if (coordA && coordB) {
      const coord = fn(coordA, coordB);
      return coordToInterval(coord).name;
    }
  };
}

// node_modules/.pnpm/@tonaljs+midi@4.6.5/node_modules/@tonaljs/midi/dist/index.es.js
var L2 = Math.log(2);
var L440 = Math.log(440);
var SHARPS2 = "C C# D D# E F F# G G# A A# B".split(" ");
var FLATS = "C Db D Eb E F Gb G Ab A Bb B".split(" ");

// node_modules/.pnpm/@tonaljs+roman-numeral@4.6.5/node_modules/@tonaljs/roman-numeral/dist/index.es.js
var NoRomanNumeral = { empty: true, name: "", chordType: "" };
var cache3 = {};
function get7(src) {
  return typeof src === "string" ? cache3[src] || (cache3[src] = parse3(src)) : typeof src === "number" ? get7(NAMES[src] || "") : isPitch(src) ? fromPitch(src) : isNamed(src) ? get7(src.name) : NoRomanNumeral;
}
var romanNumeral = deprecate("RomanNumeral.romanNumeral", "RomanNumeral.get", get7);
function fromPitch(pitch) {
  return get7(altToAcc(pitch.alt) + NAMES[pitch.step]);
}
var REGEX3 = /^(#{1,}|b{1,}|x{1,}|)(IV|I{1,3}|VI{0,2}|iv|i{1,3}|vi{0,2})([^IViv]*)$/;
function tokenize2(str) {
  return REGEX3.exec(str) || ["", "", "", ""];
}
var ROMANS = "I II III IV V VI VII";
var NAMES = ROMANS.split(" ");
var NAMES_MINOR = ROMANS.toLowerCase().split(" ");
function parse3(src) {
  const [name, acc, roman, chordType2] = tokenize2(src);
  if (!roman) {
    return NoRomanNumeral;
  }
  const upperRoman = roman.toUpperCase();
  const step = NAMES.indexOf(upperRoman);
  const alt = accToAlt(acc);
  const dir = 1;
  return {
    empty: false,
    name,
    roman,
    interval: interval2({ step, alt, dir }).name,
    acc,
    chordType: chordType2,
    alt,
    step,
    major: roman === upperRoman,
    oct: 0,
    dir
  };
}

// node_modules/.pnpm/@tonaljs+key@4.6.5/node_modules/@tonaljs/key/dist/index.es.js
var Empty = Object.freeze([]);
var NoKey = {
  type: "major",
  tonic: "",
  alteration: 0,
  keySignature: ""
};
var NoKeyScale = {
  tonic: "",
  grades: Empty,
  intervals: Empty,
  scale: Empty,
  chords: Empty,
  chordsHarmonicFunction: Empty,
  chordScales: Empty
};
var NoMajorKey = {
  ...NoKey,
  ...NoKeyScale,
  type: "major",
  minorRelative: "",
  scale: Empty,
  secondaryDominants: Empty,
  secondaryDominantsMinorRelative: Empty,
  substituteDominants: Empty,
  substituteDominantsMinorRelative: Empty
};
var NoMinorKey = {
  ...NoKey,
  type: "minor",
  relativeMajor: "",
  natural: NoKeyScale,
  harmonic: NoKeyScale,
  melodic: NoKeyScale
};
var mapScaleToType = (scale2, list, sep = "") => list.map((type2, i) => `${scale2[i]}${sep}${type2}`);
function keyScale(grades, chords2, harmonicFunctions, chordScales2) {
  return (tonic) => {
    const intervals = grades.map((gr) => get7(gr).interval || "");
    const scale2 = intervals.map((interval3) => transpose(tonic, interval3));
    return {
      tonic,
      grades,
      intervals,
      scale: scale2,
      chords: mapScaleToType(scale2, chords2),
      chordsHarmonicFunction: harmonicFunctions.slice(),
      chordScales: mapScaleToType(scale2, chordScales2, " ")
    };
  };
}
var MajorScale = keyScale("I II III IV V VI VII".split(" "), "maj7 m7 m7 maj7 7 m7 m7b5".split(" "), "T SD T SD D T D".split(" "), "major,dorian,phrygian,lydian,mixolydian,minor,locrian".split(","));
var NaturalScale = keyScale("I II bIII IV V bVI bVII".split(" "), "m7 m7b5 maj7 m7 m7 maj7 7".split(" "), "T SD T SD D SD SD".split(" "), "minor,locrian,major,dorian,phrygian,lydian,mixolydian".split(","));
var HarmonicScale = keyScale("I II bIII IV V bVI VII".split(" "), "mMaj7 m7b5 +maj7 m7 7 maj7 o7".split(" "), "T SD T SD D SD D".split(" "), "harmonic minor,locrian 6,major augmented,lydian diminished,phrygian dominant,lydian #9,ultralocrian".split(","));
var MelodicScale = keyScale("I II bIII IV V VI VII".split(" "), "m6 m7 +maj7 7 7 m7b5 m7b5".split(" "), "T SD T SD D  ".split(" "), "melodic minor,dorian b2,lydian augmented,lydian dominant,mixolydian b6,locrian #2,altered".split(","));

// node_modules/.pnpm/@tonaljs+mode@4.6.5/node_modules/@tonaljs/mode/dist/index.es.js
var MODES = [
  [0, 2773, 0, "ionian", "", "Maj7", "major"],
  [1, 2902, 2, "dorian", "m", "m7"],
  [2, 3418, 4, "phrygian", "m", "m7"],
  [3, 2741, -1, "lydian", "", "Maj7"],
  [4, 2774, 1, "mixolydian", "", "7"],
  [5, 2906, 3, "aeolian", "m", "m7", "minor"],
  [6, 3434, 5, "locrian", "dim", "m7b5"]
];
var NoMode = {
  ...EmptyPcset,
  name: "",
  alt: 0,
  modeNum: NaN,
  triad: "",
  seventh: "",
  aliases: []
};
var modes2 = MODES.map(toMode);
var index5 = {};
modes2.forEach((mode2) => {
  index5[mode2.name] = mode2;
  mode2.aliases.forEach((alias) => {
    index5[alias] = mode2;
  });
});
function get8(name) {
  return typeof name === "string" ? index5[name.toLowerCase()] || NoMode : name && name.name ? get8(name.name) : NoMode;
}
var mode = deprecate("Mode.mode", "Mode.get", get8);
function all3() {
  return modes2.slice();
}
var entries3 = deprecate("Mode.mode", "Mode.all", all3);
function toMode(mode2) {
  const [modeNum, setNum, alt, name, triad, seventh, alias] = mode2;
  const aliases = alias ? [alias] : [];
  const chroma = Number(setNum).toString(2);
  const intervals = get5(name).intervals;
  return {
    empty: false,
    intervals,
    modeNum,
    chroma,
    normalized: chroma,
    name,
    setNum,
    alt,
    triad,
    seventh,
    aliases
  };
}
function chords(chords2) {
  return (modeName, tonic) => {
    const mode2 = get8(modeName);
    if (mode2.empty)
      return [];
    const triads2 = rotate(mode2.modeNum, chords2);
    const tonics = mode2.intervals.map((i) => transpose(tonic, i));
    return triads2.map((triad, i) => tonics[i] + triad);
  };
}
var triads = chords(MODES.map((x) => x[4]));
var seventhChords = chords(MODES.map((x) => x[5]));

// node_modules/.pnpm/@tonaljs+scale@4.6.5/node_modules/@tonaljs/scale/dist/index.es.js
var NoScale = {
  empty: true,
  name: "",
  type: "",
  tonic: null,
  setNum: NaN,
  chroma: "",
  normalized: "",
  aliases: [],
  notes: [],
  intervals: []
};
function tokenize3(name) {
  if (typeof name !== "string") {
    return ["", ""];
  }
  const i = name.indexOf(" ");
  const tonic = note(name.substring(0, i));
  if (tonic.empty) {
    const n = note(name);
    return n.empty ? ["", name] : [n.name, ""];
  }
  const type2 = name.substring(tonic.name.length + 1);
  return [tonic.name, type2.length ? type2 : ""];
}
function get9(src) {
  const tokens = Array.isArray(src) ? src : tokenize3(src);
  const tonic = note(tokens[0]).name;
  const st = get5(tokens[1]);
  if (st.empty) {
    return NoScale;
  }
  const type2 = st.name;
  const notes = tonic ? st.intervals.map((i) => transpose(tonic, i)) : [];
  const name = tonic ? tonic + " " + type2 : type2;
  return { ...st, name, type: type2, tonic, notes };
}
var scale = deprecate("Scale.scale", "Scale.get", get9);

// src/chords/Chords.js
function detectChordsByExactStart(notes) {
  const grouped = group(notes, (d) => d.start);
  const chords2 = [...grouped].map((d) => d[1]).sort((a, b) => a[0].start - b[0].start).map((chord2) => chord2.sort((a, b) => a.pitch - b.pitch));
  return chords2;
}
function detectChordsBySimilarStart(notes, threshold = 0.02) {
  const chords2 = [];
  let currentChord = [];
  let currentChordStartTime = 0;
  let currentChordPitches = /* @__PURE__ */ new Set();
  for (const note2 of notes) {
    if (note2.start - currentChordStartTime <= threshold) {
      if (!currentChordPitches.has(note2.pitch)) {
        currentChord.push(note2);
        currentChordPitches.add(note2.pitch);
      }
    } else {
      if (currentChord.length > 0) {
        chords2.push(currentChord);
      }
      currentChord = [note2];
      currentChordStartTime = note2.start;
      currentChordPitches = /* @__PURE__ */ new Set([note2.pitch]);
    }
  }
  if (currentChord.length > 0) {
    chords2.push(currentChord);
  }
  return chords2;
}
function detectChordsByOverlap(notes, sortByPitch = true) {
  if (!notes || notes.length === 0) {
    return [];
  }
  if (notes.length === 1) {
    return [[notes[0]]];
  }
  const sorted = [...notes].sort((a, b) => a.start !== b.start ? a.start - b.start : a.pitch - b.pitch);
  const notesTodo = new Set(sorted);
  const chords2 = [];
  while (notesTodo.size > 0) {
    const note1 = notesTodo.values().next().value;
    notesTodo.delete(note1);
    let chord2 = [note1];
    for (const note2 of notesTodo.values()) {
      if (note1.overlapInSeconds(note2) >= 0.5 * note1.getDuration()) {
        chord2.push(note2);
        notesTodo.delete(note2);
      }
    }
    if (sortByPitch) {
      chord2 = chord2.sort((a, b) => a.pitch - b.pitch);
    }
    chords2.push(chord2);
  }
  return chords2;
}
var chordTypes = /* @__PURE__ */ new Map([
  [
    1,
    [
      { steps: [5], name: "Inverted power chord", suffix: "?" },
      { steps: [7], name: "Power chord", suffix: "5" }
    ]
  ],
  [
    2,
    [
      { steps: [2, 7], name: "Suspended second", suffix: "sus2" },
      { steps: [3, 6], name: "Diminished", suffix: "dim" },
      { steps: [3, 7], name: "Minor", suffix: "min" },
      { steps: [4, 10], name: "Seventh", suffix: "7" },
      { steps: [4, 7], name: "Major", suffix: "" },
      { steps: [4, 8], name: "Augmented", suffix: "aug" },
      { steps: [4, 9], name: "Sixth", suffix: "6" },
      { steps: [5, 7], name: "Suspended fourth", suffix: "sus4" }
    ]
  ],
  [
    3,
    [
      { steps: [2, 3, 7], name: "Minor, added ninth", suffix: "m(add9)" },
      { steps: [2, 4, 7], name: "Added ninth", suffix: "add9" },
      { steps: [3, 6, 10], name: "Minor seventh, flat fifth", suffix: "m7b5" },
      { steps: [3, 7, 10], name: "Minor seventh", suffix: "m7" },
      { steps: [3, 7, 11], name: "Minor, major seventh", suffix: "m(Maj7)" },
      { steps: [3, 7, 8], name: "Minor, flat sixth", suffix: "mb6" },
      { steps: [3, 7, 9], name: "Minor sixth", suffix: "m6" },
      { steps: [4, 5, 11], name: "Major eleventh (no fifth, no ninth)", suffix: "Maj11" },
      { steps: [4, 5, 7], name: "Added fourth", suffix: "add4" },
      { steps: [4, 7, 10], name: "Dominant seventh", suffix: "7" },
      { steps: [4, 7, 11], name: "Major seventh", suffix: "Maj7" },
      { steps: [4, 7, 9], name: "Major Sixth", suffix: "Maj6" }
    ]
  ],
  [
    4,
    [
      { steps: [2, 3, 6, 10], name: "Minor ninth flat fifth", suffix: "m9b5" },
      { steps: [2, 3, 7, 10], name: "Minor ninth", suffix: "m9" },
      { steps: [2, 3, 7, 11], name: "Minor ninth, major seventh", suffix: "m9(Maj7)" },
      { steps: [2, 3, 7, 9], name: "Minor sixth, added ninth", suffix: "m6/9" },
      { steps: [2, 4, 7, 11], name: "Major ninth", suffix: "Maj9" },
      { steps: [2, 4, 7, 9], name: "Sixth, added ninth", suffix: "6/9" },
      { steps: [4, 5, 7, 11], name: "Major eleventh (no ninth)", suffix: "Maj11" },
      { steps: [4, 6, 7, 10], name: "Seventh, sharp eleventh", suffix: "7#11" },
      { steps: [4, 6, 7, 11], name: "Major seventh, sharp eleventh", suffix: "Maj7#11" }
    ]
  ],
  [
    5,
    [
      { steps: [2, 4, 5, 7, 11], name: "Major eleventh", suffix: "Maj11" },
      { steps: [2, 4, 7, 9, 11], name: "Major thirteen", suffix: "Maj13" }
    ]
  ],
  [
    6,
    [
      { steps: [2, 3, 4, 6, 7, 10], name: "Minor thirteen", suffix: "m13" }
    ]
  ]
]);
function getChordType(notes) {
  if (!notes || notes.length === 0) {
    return { name: "No note" };
  }
  if (notes.length === 1) {
    return { name: "Single note" };
  }
  let steps = [];
  const lowest = notes[0].pitch;
  for (let index16 = 1; index16 < notes.length; index16++) {
    steps.push(notes[index16].pitch - lowest);
  }
  steps = steps.map((d) => d % 12);
  steps = [...new Set(steps)];
  steps = steps.filter((d) => d !== 0);
  if (steps.length === 0) {
    return { name: "Octave" };
  }
  steps.sort((a, b) => a - b);
  const candidates = chordTypes.get(steps.length);
  if (candidates) {
    for (const cand of candidates) {
      if (arrayShallowEquals(steps, cand.steps)) {
        return cand;
      }
    }
  }
  return { name: "Unknown chord type" };
}
function getChordName(notes) {
  const noteLetters = notes.sort((a, b) => a.pitch - b.pitch).map((d) => d.getLetter());
  const chords2 = index4.detect(noteLetters);
  return chords2;
}

// src/instruments/Lamellophone.js
var LamellophoneTuning = class {
  constructor(name, notes) {
    this.name = name;
    this.notes = notes;
    this.short = notes.join(" ");
    this.pitches = notes.map((note2) => getMidiNoteByLabel(note2).pitch);
    this.pitchesSorted = [...this.pitches].sort((a, b) => a - b);
    this.keyCount = notes.length;
  }
  getNumbers() {
    const pitches = this.pitchesSorted;
    const numbers2 = /* @__PURE__ */ new Map();
    for (const [index16, pitch] of pitches.entries()) {
      let number3 = index16 + 1;
      let ending = "";
      let lowerOctave = pitch - 12;
      while (lowerOctave > 0 && numbers2.has(lowerOctave)) {
        number3 = numbers2.get(lowerOctave).number;
        ending += "\xB0";
        lowerOctave -= 12;
      }
      numbers2.set(pitch, { number: number3, numberString: `${number3}${ending}` });
    }
    return [...numbers2.values()].map((d) => d.numberString);
  }
  getLetters() {
    const pitches = this.pitchesSorted;
    const numbers2 = /* @__PURE__ */ new Map();
    for (const [index16, pitch] of pitches.entries()) {
      let number3 = index16 + 1;
      let ending = "";
      let lowerOctave = pitch - 12;
      while (lowerOctave > 0 && numbers2.has(lowerOctave)) {
        number3 = numbers2.get(lowerOctave).number;
        ending += "\xB0";
        lowerOctave -= 12;
      }
      const letter = getMidiNoteByNr(pitch).name;
      numbers2.set(pitch, { number: number3, letterString: `${letter}${ending}` });
    }
    return [...numbers2.values()].map((d) => d.letterString);
  }
};
var lamellophoneTunings = /* @__PURE__ */ new Map([
  ["Kalimba", /* @__PURE__ */ new Map([
    [
      "9 A Major",
      new LamellophoneTuning("9 A Major", ["A5", "C#6", "C#5", "A5", "A4", "F#5", "E5", "E6", "B5"])
    ],
    [
      "9 A Minor",
      new LamellophoneTuning("9 A Minor", ["A5", "C6", "C5", "A5", "A4", "F5", "E5", "E6", "B5"])
    ],
    [
      "9 A Minor 7",
      new LamellophoneTuning("9 A Minor 7", ["A5", "C6", "C5", "A5", "A4", "F#5", "E5", "E6", "B5"])
    ],
    [
      "9 A Ake Bono",
      new LamellophoneTuning("9 A Ake Bono", ["A5", "D6", "D5", "A5", "A4", "F5", "E5", "E6", "A#5"])
    ],
    [
      "9 A Hijaz",
      new LamellophoneTuning("9 A Hijaz", ["G5", "D6", "D5", "A5", "A4", "F#5", "D#5", "D#6", "A#5"])
    ],
    [
      "9 A Pygmy",
      new LamellophoneTuning("9 A Pygmy", ["G5", "C6", "C5", "G5", "G4", "D#5", "D5", "D#6", "A#5"])
    ],
    [
      "17 C Major",
      new LamellophoneTuning("17 C Major", ["D6", "B5", "G5", "E5", "C5", "A4", "F4", "D4", "C4", "E4", "G4", "B4", "D5", "F5", "A5", "C6", "E6"])
    ],
    [
      "21 C Major",
      new LamellophoneTuning("21 C Major", ["D6", "B5", "G5", "E5", "C5", "A4", "F4", "D4", "B3", "G3", "F3", "A3", "C4", "E4", "G4", "B4", "D5", "F5", "A5", "C6", "E6"])
    ]
  ])]
]);
function convertTabToNotes(tab, tuning, tempo = 120) {
  if (!tab || tab.length === 0) {
    return [];
  }
  const symbolToPitchMap = /* @__PURE__ */ new Map();
  const symbols = tuning.getLetters();
  for (let index16 = 0; index16 < tuning.keyCount; index16++) {
    symbolToPitchMap.set(symbols[index16], tuning.pitchesSorted[index16]);
  }
  const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const noteNamesSet = new Set(noteNames);
  const lowestNote = tuning.pitchesSorted[0];
  const startOct = getMidiNoteByNr(lowestNote).octave;
  const secondsPerBeat = bpmToSecondsPerBeat(tempo);
  let insideChord = false;
  let insideNote = false;
  let currentTime = 0;
  let currentPitch = 0;
  let currentOctOffset = 0;
  const notes = [];
  tab = `${tab.toUpperCase().replaceAll("\n", " \n")} `;
  const finishNote = () => {
    try {
      notes.push(Note_default.from({
        pitch: currentPitch + 12 * (startOct + 1 + currentOctOffset),
        start: currentTime,
        end: currentTime + secondsPerBeat
      }));
      currentOctOffset = 0;
      if (!insideChord) {
        currentTime += secondsPerBeat;
      }
    } catch {
      console.log(currentPitch);
    }
    insideNote = false;
  };
  for (const char of tab) {
    if (char === "(") {
      if (insideChord) {
        insideChord = false;
      }
      if (insideNote) {
        finishNote();
      }
      insideChord = true;
    } else if (noteNamesSet.has(char)) {
      if (insideNote) {
        finishNote();
      }
      insideNote = true;
      currentPitch = noteNames.indexOf(char);
    } else if (char === "#") {
      currentPitch++;
    } else if (char === "\xB0") {
      currentOctOffset++;
    } else if (char === " " || char === "\n" || char === ")") {
      if (char === ")") {
        insideChord = false;
      }
      if (char === "\n") {
        insideChord = false;
        currentTime += secondsPerBeat;
      }
      if (insideNote) {
        finishNote();
      }
    }
  }
  return notes;
}
function convertNotesToTab(notes, tuning, mode2 = "letter", restSize = 0.1) {
  if (!notes || notes.length === 0) {
    return [];
  }
  const pitchToSymbolMap = /* @__PURE__ */ new Map();
  const symbols = mode2 === "letter" ? tuning.getLetters() : tuning.getNumbers();
  for (let index16 = 0; index16 < tuning.keyCount; index16++) {
    pitchToSymbolMap.set(tuning.pitchesSorted[index16], symbols[index16]);
  }
  const chords2 = detectChordsByExactStart(notes);
  let tab = "";
  let previousEnd = 0;
  for (const chord2 of chords2) {
    let chordString = chord2.map((note2) => {
      if (pitchToSymbolMap.has(note2.pitch)) {
        return pitchToSymbolMap.get(note2.pitch) || `[${note2.pitch}]`;
      } else {
        return mode2 === "letter" ? getMidiNoteByNr(note2.pitch)?.name ?? note2.pitch : note2.pitch;
      }
    }).join(" ");
    if (chord2.length > 1) {
      chordString = `(${chordString})`;
    }
    tab = chord2[0].start - previousEnd > restSize ? `${tab}
${chordString}` : `${tab} ${chordString}`;
    previousEnd = max(chord2, (n) => n.end);
  }
  return tab.slice(1);
}
function convertNotesToHtmlTab(notes, tuning, mode2 = "letter", restSize = 0.1, colormap = () => "black") {
  if (!notes || notes.length === 0) {
    return [];
  }
  const pitchToSymbolMap = /* @__PURE__ */ new Map();
  const symbols = mode2 === "letter" ? tuning.getLetters() : tuning.getNumbers();
  for (let index16 = 0; index16 < tuning.keyCount; index16++) {
    pitchToSymbolMap.set(tuning.pitches[index16], symbols[index16]);
  }
  const chords2 = detectChordsByExactStart(notes);
  let tab = "";
  let previousEnd = 0;
  for (const chord2 of chords2) {
    let chordString = chord2.map((note2) => {
      let string;
      if (pitchToSymbolMap.has(note2.pitch)) {
        string = pitchToSymbolMap.get(note2.pitch) || `[${note2.pitch}]`;
      } else {
        string = mode2 === "letter" ? getMidiNoteByNr(note2.pitch)?.name ?? note2.pitch : note2.pitch;
      }
      const color2 = colormap(note2.pitch);
      return `<span class='note' style='background-color: ${color2}'>${string}</span>`;
    }).join("\n");
    if (chord2.length > 1) {
      chordString = `<span class='chord'>${chordString}</span>`;
    }
    tab = chord2[0].start - previousEnd > restSize ? `${tab}<br/>${chordString}` : `${tab}${chordString}`;
    previousEnd = max(chord2, (n) => n.end);
  }
  return tab;
}
function convertNumbersToLetters(numberTab, numberLetterMap) {
  if (!numberTab || numberTab.length === 0) {
    return "";
  }
  numberTab = numberTab.replaceAll("'", "\xB0");
  numberTab = numberTab.replaceAll("\u2019", "\xB0");
  numberTab = numberTab.replaceAll("*", "\xB0");
  numberTab = numberTab.replaceAll("\xBA", "\xB0");
  numberTab = numberTab.replaceAll("^", "\xB0");
  for (const [key, value] of numberLetterMap.entries()) {
    numberTab = numberTab.replaceAll(key, value);
  }
  return numberTab;
}
function bestTransposition(notes, tuning) {
  if (!notes || notes.length === 0) {
    return { transpose: 0, retune: /* @__PURE__ */ new Map() };
  }
  const occuringPitches = new Set(notes.map((n) => n.pitch));
  if (occuringPitches.size > tuning.keyCount) {
  }
  const notePitches = [...occuringPitches];
  if (difference(notePitches, tuning.pitches).size === 0) {
    return { transpose: 0, retune: /* @__PURE__ */ new Map() };
  }
  const [minPitch, maxPitch] = extent_default(notePitches);
  const transpose3 = (array, steps) => array.map((d) => d + steps);
  let bestSteps = 0;
  let bestTransposed;
  let commonPitches;
  for (let steps = -minPitch; steps <= 127 - maxPitch; steps++) {
    const transposed = transpose3(notePitches, steps);
    const common = intersection(transposed, tuning.pitches);
    if (!commonPitches || common.size > commonPitches.size) {
      bestSteps = steps;
      bestTransposed = transposed;
    }
  }
  bestTransposed = new Set(bestTransposed);
  const uncommon = difference(bestTransposed, tuning.pitches);
  console.log(uncommon);
  const freePitches = /* @__PURE__ */ new Set();
  const neededPitches = [];
  for (const p of uncommon) {
    if (bestTransposed.has(p)) {
      neededPitches.push(p);
    } else {
      freePitches.add(p);
    }
  }
  console.log(neededPitches);
  console.log(freePitches);
  if (neededPitches.length === 0) {
    return {
      transpose: bestSteps,
      retune: /* @__PURE__ */ new Map()
    };
  }
  if (freePitches.size === 0) {
    return {
      transpose: bestSteps,
      retune: /* @__PURE__ */ new Map()
    };
  }
  const retune = /* @__PURE__ */ new Map();
  for (const neededPitch of neededPitches) {
    let bestMatch = null;
    const bestDiff = Number.POSITIVE_INFINITY;
    let freePitch;
    for (freePitch of freePitches) {
      const diff = Math.abs(neededPitch - freePitch);
      if (diff < bestDiff) {
        bestMatch = freePitch;
      }
    }
    freePitches.delete(bestMatch);
    retune.set(freePitch, neededPitch);
  }
  return {
    transpose: bestSteps,
    retune
  };
}

// src/instruments/Piano.js
var Piano_exports = {};
__export(Piano_exports, {
  pianoPitchRange: () => pianoPitchRange
});
var pianoPitchRange = /* @__PURE__ */ new Map([
  [72, { minPitch: 24, maxPitch: 95 }],
  [88, { minPitch: 21, maxPitch: 108 }],
  [128, { minPitch: 0, maxPitch: 127 }]
]);

// src/alignment/Alignment.js
var Alignment_exports = {};
__export(Alignment_exports, {
  alignNoteArrays: () => alignNoteArrays,
  alignNoteArrays2: () => alignNoteArrays2,
  alignNoteArrays3: () => alignNoteArrays3,
  alignmentBenchmark: () => alignmentBenchmark,
  testAlignment: () => testAlignment
});

// src/comparison/Matching.js
var Matching_exports = {};
__export(Matching_exports, {
  getMatchingError: () => getMatchingError,
  getMatchingSection: () => getMatchingSection,
  getMatchingSliceError: () => getMatchingSliceError,
  getMultiMatchingErrorPerNote: () => getMultiMatchingErrorPerNote,
  matchGtAndMultipleRecordings: () => matchGtAndMultipleRecordings,
  matchGtAndRecordingNotes: () => matchGtAndRecordingNotes
});

// src/utils/index.js
var utils_exports = {};
__export(utils_exports, {
  CIRCLE_OF_5THS: () => CIRCLE_OF_5THS,
  INTERVALS: () => INTERVALS,
  alignNotesToBpm: () => alignNotesToBpm,
  arrayContainsArray: () => arrayContainsArray,
  arrayHasSameElements: () => arrayHasSameElements,
  arrayIndexOf: () => arrayIndexOf,
  arrayShallowEquals: () => arrayShallowEquals,
  arraySlicesEqual: () => arraySlicesEqual,
  averageColor: () => averageColor,
  averageRecordings: () => averageRecordings,
  averageRecordings2: () => averageRecordings2,
  binarySearch: () => binarySearch,
  blobToBase64: () => blobToBase64,
  blobToFileExtension: () => blobToFileExtension,
  bpmToSecondsPerBeat: () => bpmToSecondsPerBeat,
  choose: () => choose,
  chordIntegerJaccardIndex: () => chordIntegerJaccardIndex,
  chordToInteger: () => chordToInteger,
  clipRecordingsPitchesToGtFretboardRange: () => clipRecordingsPitchesToGtFretboardRange,
  clipRecordingsPitchesToGtRange: () => clipRecordingsPitchesToGtRange,
  clipValue: () => clipValue,
  confidenceInterval: () => confidenceInterval,
  countOnesOfBinary: () => countOnesOfBinary,
  deepCloneFlatObjectMap: () => deepCloneFlatObjectMap,
  delay: () => delay,
  differenceMap: () => differenceMap,
  differenceMapErrorAreas: () => differenceMapErrorAreas,
  euclideanDistance: () => euclideanDistance,
  filterRecordingNoise: () => filterRecordingNoise,
  findLocalMaxima: () => findLocalMaxima,
  findNearest: () => findNearest,
  findRepeatedIndices: () => findRepeatedIndices,
  findStreaks: () => findStreaks,
  formatDate: () => formatDate,
  formatMatrix: () => formatMatrix,
  formatSongTitle: () => formatSongTitle,
  formatTime: () => formatTime,
  freqToApproxMidiNr: () => freqToApproxMidiNr,
  getArrayMax: () => getArrayMax,
  getBoxplotCharacteristics: () => getBoxplotCharacteristics,
  getColorLightness: () => getColorLightness,
  getObjectFromLocalStorage: () => getObjectFromLocalStorage,
  groupNotesByPitch: () => groupNotesByPitch,
  jaccardIndex: () => jaccardIndex,
  kendallTau: () => kendallTau,
  kernelDensityEstimator: () => kernelDensityEstimator,
  kernelEpanechnikov: () => kernelEpanechnikov,
  kernelGauss: () => kernelGauss,
  metronomeTrackFromMusicPiece: () => metronomeTrackFromMusicPiece,
  metronomeTrackFromTempoAndMeter: () => metronomeTrackFromTempoAndMeter,
  midiToFrequency: () => midiToFrequency,
  normalizeNdArray: () => normalizeNdArray,
  noteColorFromPitch: () => noteColorFromPitch,
  noteDurationToNoteType: () => noteDurationToNoteType,
  pearsonCorrelation: () => pearsonCorrelation,
  pingMidiDevice: () => pingMidiDevice,
  randFloat: () => randFloat,
  recordingsHeatmap: () => recordingsHeatmap,
  removeDuplicates: () => removeDuplicates,
  reverseString: () => reverseString,
  roundToNDecimals: () => roundToNDecimals,
  setOpacity: () => setOpacity,
  storeObjectInLocalStorage: () => storeObjectInLocalStorage,
  swapSoSmallerFirst: () => swapSoSmallerFirst
});

// src/utils/BlobUtils.js
function blobToBase64(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
function blobToFileExtension(blob) {
  return blob.type.split("/")[1].split(";")[0];
}

// src/utils/ColorUtils.js
function getColorLightness(color2) {
  const { r, g, b } = color(color2).rgb();
  const Y2 = r + r + r + b + g + g + g + g >> 3;
  return Y2 / 2.55;
}
function averageColor(colors) {
  let mR = 0;
  let mG = 0;
  let mB = 0;
  for (const c2 of colors) {
    const { r, g, b } = color(c2).rgb();
    mR += r;
    mG += g;
    mB += b;
  }
  mR = Math.round(mR / colors.length);
  mG = Math.round(mG / colors.length);
  mB = Math.round(mB / colors.length);
  return `rgb(${mR}, ${mG}, ${mB})`;
}
function setOpacity(color2, opacity = 1) {
  const { r, g, b } = color(color2).rgb();
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// src/utils/FormattingUtils.js
function formatTime(seconds, includeMillis = true) {
  if (seconds === void 0 || seconds === null) {
    return includeMillis ? "--:--.---" : "--:--";
  }
  const s = Math.floor(seconds);
  let min3 = Math.floor(s / 60).toString();
  let sec = (s % 60).toString();
  min3 = min3.length < 2 ? `0${min3}` : min3;
  sec = sec.length < 2 ? `0${sec}` : sec;
  if (!includeMillis) {
    return `${min3}:${sec}`;
  }
  let ms = Math.round((seconds - s) * 1e3).toString();
  if (ms.length < 2) {
    ms = `00${ms}`;
  } else if (ms.length < 3) {
    ms = `0${ms}`;
  }
  return `${min3}:${sec}.${ms}`;
}
function formatDate(date, replaceT = false, keepMillis = true) {
  let string = date.toISOString().split(":").join("-");
  if (!keepMillis) {
    string = string.slice(0, string.indexOf("."));
  }
  if (replaceT) {
    string = string.replace("T", " ");
  }
  return string;
}
function formatSongTitle(title, maxLength = 30) {
  if (!title) {
    return "[No Song]";
  }
  if (title.lastIndexOf(".") !== -1) {
    title = title.slice(0, title.lastIndexOf("."));
  }
  if (title.length > maxLength) {
    title = `${title.slice(0, maxLength - 3)}...`;
  }
  return title;
}

// src/utils/LocalStorageUtils.js
function storeObjectInLocalStorage(key, object) {
  const string = JSON.stringify(object);
  localStorage.setItem(key, string);
}
function getObjectFromLocalStorage(key) {
  const string = localStorage.getItem(key);
  if (string === null) {
    return null;
  }
  try {
    return JSON.parse(string);
  } catch {
    return null;
  }
}

// src/utils/MiscUtils.js
function deepCloneFlatObjectMap(map2) {
  const result = /* @__PURE__ */ new Map();
  for (const [key, value] of map2.entries()) {
    result.set(key, { ...value });
  }
  return result;
}
function groupNotesByPitch(tracks) {
  const allNotes = tracks.flat();
  if (allNotes.length === 0) {
    return /* @__PURE__ */ new Map();
  }
  return group(allNotes, (d) => d.pitch);
}
function reverseString(s) {
  return [...s].reverse().join("");
}
function findNearest(notes, targetNote) {
  if (!notes || notes.length === 0 || !targetNote) {
    return null;
  }
  let nearest = null;
  let dist = Number.POSITIVE_INFINITY;
  const targetStart = targetNote.start;
  for (const n of notes) {
    const newDist = Math.abs(n.start - targetStart);
    if (newDist < dist) {
      dist = newDist;
      nearest = n;
    }
  }
  return nearest;
}
function delay(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1e3);
  });
}

// src/utils/NoteColorUtils.js
var noteColormap = [
  "#ff0000",
  "#ff4e00",
  "#db7b00",
  "#ffcc00",
  "#e4ed00",
  "#81d700",
  "#00ffb4",
  "#00ffea",
  "#00baff",
  "#3c00ff",
  "#a800ff",
  "#ff00fd"
].map((d) => {
  const c2 = hsl(d);
  c2.s = 0.5;
  return c2.toString();
});
var noteColormapAccessible = [
  "#6699ff",
  "#66ffff",
  "#000000",
  "#647878",
  "#993366",
  "#ff0000",
  "#ffcc99",
  "#ffff01",
  "#ff9900",
  "#009900",
  "#66ff99",
  "#0000cc"
];
var colorInterpolator = rgb_default("black", "steelblue");
var noteColormapGradientArray = Array.from({ length: 12 }).map((d, index16) => colorInterpolator(index16 / 11));
function noteColorFromPitch(pitch, colormap = "default") {
  switch (colormap) {
    case "accessible":
      return noteColormapAccessible[pitch % 12];
    case "gradient":
      return noteColormapGradientArray[pitch % 12];
    default:
      return noteColormap[pitch % 12];
  }
}

// src/utils/StatisticsUtils.js
function pearsonCorrelation(x, y) {
  if (!x || !y || !x.length || !y.length || x.length !== y.length) {
    throw new Error("Invalid data, must be two arrays with same length");
  }
  if (x.length < 2) {
    throw new Error("Invalid data, length must be >= 2");
  }
  let n = x.length;
  let nn = 0;
  for (let i = 0; i < n; i++, nn++) {
    if (!x[i] && x[i] !== 0 || !y[i] && y[i] !== 0) {
      nn--;
      continue;
    }
    x[nn] = x[i];
    y[nn] = y[i];
  }
  if (n !== nn) {
    x = x.splice(0, nn);
    y = y.splice(0, nn);
    n = nn;
  }
  const meanX = mean(x);
  const meanY = mean(y);
  const calc = (v, mean2) => Math.sqrt(v.reduce((s, a) => s + a * a, 0) - n * mean2 * mean2);
  return (x.map((e, i) => ({ x: e, y: y[i] })).reduce((v, a) => v + a.x * a.y, 0) - n * meanX * meanY) / (calc(x, meanX) * calc(y, meanY));
}
function confidenceInterval(values) {
  const n = values.length;
  const m = mean(values);
  const s = deviation(values);
  const z = 1.96;
  const part = z * (s / Math.sqrt(n));
  const low = m - part;
  const high = m + part;
  return { mean: m, low, high };
}
function getBoxplotCharacteristics(values) {
  values.sort((a, b) => a - b);
  const minValue = values[0];
  const maxValue = values[values.length - 1];
  const q1 = quantile(values, 0.25);
  const q2 = quantile(values, 0.5);
  const q3 = quantile(values, 0.75);
  const iqr = q3 - q1;
  const r0 = Math.max(minValue, q1 - iqr * 1.5);
  const r1 = Math.min(maxValue, q3 + iqr * 1.5);
  return { q1, q2, q3, r0, r1 };
}
function kernelDensityEstimator(kernel, X2) {
  const estimator = (V) => {
    return X2.map((x) => [
      x,
      mean(V, (v) => kernel(x - v))
    ]);
  };
  return estimator;
}
function kernelEpanechnikov(k) {
  const epKernel = (v) => Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
  return epKernel;
}
function kernelGauss(k) {
  const gaKernel = (v) => Math.abs(v / k) <= 1 ? 1 / Math.sqrt(2 * Math.PI) * Math.E ** (-1 / 2 * v * v) : 0;
  return gaKernel;
}

// src/utils/RecordingsUtils.js
function filterRecordingNoise(recording, velocityThreshold = 0, durationThreshold = 0) {
  const result = recording.clone().filter((note2) => {
    if (note2.velocity < velocityThreshold) {
      return false;
    }
    if (note2.getDuration() < durationThreshold) {
      return false;
    }
    return true;
  });
  return result;
}
function clipRecordingsPitchesToGtRange(recordings, groundTruth) {
  const pitchRanges = /* @__PURE__ */ new Map();
  for (const [index16, part] of groundTruth.entries()) {
    const pitchExtent = extent_default(part, (d) => d.pitch);
    pitchRanges.set(index16, pitchExtent);
  }
  return recordings.map((recording) => {
    const track = recording.selectedTrack;
    const [minPitch, maxPitch] = pitchRanges.get(track);
    return recording.clone().filter((note2) => note2.pitch >= minPitch && note2.pitch <= maxPitch);
  });
}
function clipRecordingsPitchesToGtFretboardRange(recordings, groundTruth, mode2 = "exact") {
  if (mode2 === "exact") {
    const occuringPositions = /* @__PURE__ */ new Map();
    for (const [index16, part] of groundTruth.entries()) {
      const positions = new Set(part.map((note2) => `${note2.string} ${note2.fret}`));
      occuringPositions.set(index16, positions);
    }
    return recordings.map((recording) => {
      const track = recording.selectedTrack;
      const validPositions = occuringPositions.get(track);
      return recording.clone().filter((note2) => validPositions.has(`${note2.string} ${note2.fret}`));
    });
  } else {
    const positionRanges = /* @__PURE__ */ new Map();
    for (const [index16, part] of groundTruth.entries()) {
      const stringExtent = extent_default(part, (d) => d.string);
      const fretExtent = extent_default(part, (d) => d.fret);
      positionRanges.set(index16, { stringExtent, fretExtent });
    }
    return recordings.map((recording) => {
      const track = recording.selectedTrack;
      const { stringExtent, fretExtent } = positionRanges.get(track);
      const [minString, maxString] = stringExtent;
      const [minFret, maxFret] = fretExtent;
      return recording.clone().filter((note2) => {
        return note2.string >= minString && note2.string <= maxString && note2.fret >= minFret && note2.fret <= maxFret;
      });
    });
  }
}
function alignNotesToBpm(notes, bpm, timeDivision = 16) {
  const secondsPerBeat = bpmToSecondsPerBeat(bpm);
  const secondsPerDivision = secondsPerBeat / timeDivision;
  return notes.map((note2) => {
    const n = note2.clone();
    n.start = Math.round(n.start / secondsPerDivision) * secondsPerDivision;
    n.end = Math.round(n.end / secondsPerDivision) * secondsPerDivision;
    return n;
  });
}
function recordingsHeatmap(recNotes, nRecs, binSize = 10, attribute = "pitch") {
  let groupedByAttribute;
  if (attribute === "pitch") {
    groupedByAttribute = group(recNotes, (d) => d.pitch);
  } else if (attribute === "channel") {
    groupedByAttribute = group(recNotes, (d) => d.channel);
  } else {
    console.warn(`Invalid attribute parameter '${attribute}'`);
  }
  const heatmapByAttribute = /* @__PURE__ */ new Map();
  for (const [attribute_, notes] of groupedByAttribute.entries()) {
    const maxTime = max(notes, (d) => d.end);
    const nBins = Math.ceil(maxTime * 1e3 / binSize) + 1;
    const heatmap = Array.from({ length: nBins }).fill(0);
    for (const note2 of notes) {
      const start2 = Math.round(note2.start * 1e3 / binSize);
      const end = Math.round(note2.end * 1e3 / binSize);
      for (let bin = start2; bin <= end; bin++) {
        heatmap[bin] += 1;
      }
    }
    for (let bin = 0; bin < heatmap.length; bin++) {
      heatmap[bin] /= nRecs;
    }
    heatmapByAttribute.set(attribute_, heatmap);
  }
  return heatmapByAttribute;
}
function averageRecordings(heatmapByPitch, binSize, threshold = 0.8) {
  const newNotes = [];
  for (const [pitch, heatmap] of heatmapByPitch.entries()) {
    for (let bin = 0; bin < heatmap.length; bin++) {
      heatmap[bin] = heatmap[bin] > threshold;
    }
    let currentNote = null;
    for (let bin = 0; bin < heatmap.length; bin++) {
      if (!currentNote && heatmap[bin]) {
        const time = bin * binSize / 1e3;
        currentNote = new Note_default(pitch, time, 127, 0);
      }
      if (currentNote && (!heatmap[bin] || bin === heatmap.length - 1)) {
        const time = bin * binSize / 1e3;
        currentNote.end = time;
        newNotes.push(currentNote);
        currentNote = null;
      }
    }
  }
  newNotes.sort((a, b) => a.start - b.start);
  return newNotes;
}
function averageRecordings2(recNotes, bandwidth = 0.01, ticksPerSecond, threshold) {
  const groupedByPitch = group(recNotes, (d) => d.pitch);
  const newNotes = [];
  for (const [pitch, notes] of groupedByPitch.entries()) {
    const starts = notes.map((d) => d.start);
    const ends = notes.map((d) => d.end);
    const duration = max(ends);
    const ticks = Math.ceil(ticksPerSecond * duration);
    const x = linear2().domain([0, duration]).range([0, duration]);
    const kde = kernelDensityEstimator(kernelEpanechnikov(bandwidth), x.ticks(ticks));
    const estimateStarts = kde(starts);
    const estimateEnds = kde(ends);
    const maximaStarts = findLocalMaxima(estimateStarts.map((d) => d[1]));
    const maximaEnds = findLocalMaxima(estimateEnds.map((d) => d[1]));
    const chosenStarts = maximaStarts.filter((d) => estimateStarts[d][1] > threshold).map((d) => estimateStarts[d][0]);
    const chosenEnds = maximaEnds.filter((d) => estimateEnds[d][1] > threshold).map((d) => estimateEnds[d][0]);
    while (chosenStarts.length > 0) {
      const nextStart = chosenStarts.shift();
      while (chosenEnds.length > 0 && chosenEnds[0] < nextStart) {
        chosenEnds.shift();
      }
      const nextEnd = chosenEnds.shift();
      while (chosenStarts.length > 0 && chosenStarts[0] < nextEnd) {
        chosenStarts.shift();
      }
      newNotes.push(new Note_default(pitch, nextStart, 127, 0, nextEnd));
    }
  }
  newNotes.sort((a, b) => a.start - b.start);
  return newNotes;
}
function differenceMap(gtNotes, recNotes, binSize) {
  const recHeatmap = recordingsHeatmap(recNotes, 1, binSize);
  const gtHeatmap = recordingsHeatmap(gtNotes, 1, binSize);
  const allPitches = [.../* @__PURE__ */ new Set([
    ...recHeatmap.keys(),
    ...gtHeatmap.keys()
  ])];
  const resultMap = /* @__PURE__ */ new Map();
  for (const pitch of allPitches) {
    let result;
    if (!recHeatmap.has(pitch)) {
      result = gtHeatmap.get(pitch).map((d) => d !== 0 ? 1 : 0);
    } else if (!gtHeatmap.has(pitch)) {
      result = recHeatmap.get(pitch).map((d) => d !== 0 ? 2 : 0);
    } else {
      const recH = recHeatmap.get(pitch);
      const gtH = gtHeatmap.get(pitch);
      const nBins = Math.max(recH.length, gtH.length);
      result = Array.from({ length: nBins }).fill(0);
      for (let index16 = 0; index16 < result.length; index16++) {
        const gtValue = gtH[index16] || 0;
        const recValue = recH[index16] || 0;
        if (gtValue === 0 && recValue === 0) {
          result[index16] = 0;
        }
        if (gtValue !== 0 && recValue === 0) {
          result[index16] = 1;
        }
        if (gtValue === 0 && recValue !== 0) {
          result[index16] = 2;
        }
        if (gtValue !== 0 && recValue !== 0) {
          result[index16] = 3;
        }
      }
    }
    resultMap.set(pitch, result);
  }
  return resultMap;
}
function differenceMapErrorAreas(differenceMap2) {
  let missingBins = 0;
  let additionalBins = 0;
  let correctBins = 0;
  for (const diffMap of differenceMap2.values()) {
    for (const bin of diffMap) {
      if (bin === 1) {
        missingBins++;
      } else if (bin === 2) {
        additionalBins++;
      } else if (bin === 3) {
        correctBins++;
      }
    }
  }
  const maxLength = max([...differenceMap2], (d) => d[1].length);
  const totalArea = differenceMap2.size * maxLength;
  return {
    missing: missingBins / totalArea,
    additional: additionalBins / totalArea,
    correct: correctBins / totalArea
  };
}

// src/utils/WebMidiUtils.js
function pingMidiDevice(deviceName, howOften = 1) {
  if (!navigator.requestMIDIAccess) {
    console.error("MIDI: WebMIDI is not supported in this browser.");
  } else {
    let sentCount = 0;
    let sentTime;
    let totalTime = 0;
    const receiveFunction = () => {
      const ping = Date.now() - sentTime;
      totalTime += ping;
      const avg = totalTime / sentCount;
      console.log(`Received MIDI from ${deviceName} after ${ping} ms (avg: ${avg})`);
    };
    navigator.requestMIDIAccess().then((midiAccess) => {
      for (const input of midiAccess.inputs.values()) {
        if (deviceName === input.name) {
          input.onmidimessage = receiveFunction;
        }
      }
      let outputDevice = null;
      for (const output of midiAccess.outputs.values()) {
        if (deviceName === output.name) {
          outputDevice = output;
        }
      }
      if (!outputDevice) {
        console.error(`Cannot ping output device ${deviceName} because it is not there`);
      }
      const pingFunction = () => {
        if (sentCount < howOften) {
          sentCount++;
          console.log(`Ping ${sentCount}/${howOften} Sending MIDI ping to ${deviceName}`);
          sentTime = new Date();
          outputDevice.send([144, 69, 127]);
          setTimeout(pingFunction, 1e3);
        }
      };
      setTimeout(pingFunction, 1e3);
    }, () => console.error("Cannot get MIDI access"));
  }
}

// src/comparison/Matching.js
function matchGtAndRecordingNotes(recNotes, gtNotes) {
  const groupedByPitch = group(gtNotes, (d) => d.pitch);
  const groupedByPitchRec = group(recNotes, (d) => d.pitch);
  const result = /* @__PURE__ */ new Map();
  for (const [pitch, gtNotes2] of groupedByPitch.entries()) {
    const gtRecMap = /* @__PURE__ */ new Map();
    const additionalNotes = [];
    const missingNotes = [];
    for (const n of gtNotes2) {
      gtRecMap.set(n.start, null);
    }
    if (!groupedByPitchRec.has(pitch)) {
      result.set(pitch, {
        gtRecMap: /* @__PURE__ */ new Map(),
        additionalNotes: [],
        missingNotes: gtNotes2,
        gtNotes: gtNotes2
      });
      continue;
    }
    const recNotes2 = groupedByPitchRec.get(pitch);
    for (const r of recNotes2) {
      const nearest = findNearest(gtNotes2, r);
      const currentEntry = gtRecMap.get(nearest.start);
      if (currentEntry === null) {
        gtRecMap.set(nearest.start, r);
      } else {
        if (Math.abs(nearest.start - r.start) < Math.abs(currentEntry.start - r.start)) {
          gtRecMap.set(nearest.start, r);
          additionalNotes.push(currentEntry);
        } else {
          additionalNotes.push(r);
        }
      }
    }
    for (const n of gtNotes2) {
      if (gtRecMap.get(n.start) === null) {
        missingNotes.push(n);
      }
    }
    result.set(pitch, {
      gtRecMap,
      additionalNotes,
      missingNotes,
      gtNotes: gtNotes2
    });
  }
  for (const [pitch, recNotes2] of groupedByPitchRec.entries()) {
    if (!groupedByPitch.has(pitch)) {
      result.set(pitch, {
        gtRecMap: /* @__PURE__ */ new Map(),
        additionalNotes: recNotes2,
        missingNotes: [],
        gtNotes: []
      });
    }
  }
  return result;
}
function matchGtAndMultipleRecordings(recordings, gtNotes) {
  const allRecNotes = recordings.flatMap((d) => d.notes);
  const groupedByPitch = group(gtNotes, (d) => d.pitch);
  const groupedByPitchRec = group(allRecNotes, (d) => d.pitch);
  const result = /* @__PURE__ */ new Map();
  for (const [pitch, gtNotes2] of groupedByPitch.entries()) {
    const gtRecMap = /* @__PURE__ */ new Map();
    for (const n of gtNotes2) {
      gtRecMap.set(n.start, []);
    }
    if (!groupedByPitchRec.has(pitch)) {
      result.set(pitch, /* @__PURE__ */ new Map());
      continue;
    }
    const recNotes = groupedByPitchRec.get(pitch);
    for (const r of recNotes) {
      const nearest = findNearest(gtNotes2, r);
      const currentEntry = gtRecMap.get(nearest.start);
      currentEntry.push(r);
      gtRecMap.set(nearest.start, currentEntry);
    }
    result.set(pitch, gtRecMap);
  }
  return result;
}
function getMultiMatchingErrorPerNote(multiMatching, errorThreshold = 3) {
  const result = /* @__PURE__ */ new Map();
  for (const [pitch, gtRecMap] of multiMatching.entries()) {
    const gtErrorMap = /* @__PURE__ */ new Map();
    let maxError = 0;
    for (const [gtStart, matchedRecNotes] of gtRecMap.entries()) {
      let error = 0;
      if (matchedRecNotes.length > 0) {
        for (const note2 of matchedRecNotes) {
          const error_ = Math.abs(note2.start - gtStart);
          if (error_ <= errorThreshold) {
            error += error_;
          }
        }
        error /= matchedRecNotes.length;
        if (error > maxError) {
          maxError = error;
        }
      }
      gtErrorMap.set(gtStart, error);
    }
    result.set(pitch, {
      gtErrorMap,
      maxError
    });
  }
  return result;
}
function getMatchingError(matching, addPenalty, missPenalty, timingPenalty, timeThreshold = 0) {
  const result = {
    total: 0,
    totalAdd: 0,
    totalMiss: 0,
    totalCorrect: 0,
    totalTime: 0,
    totalNumberOfGtNotes: 0,
    perPitch: /* @__PURE__ */ new Map()
  };
  for (const [pitch, m] of matching.entries()) {
    const { gtRecMap, additionalNotes, missingNotes, gtNotes } = m;
    const addError = additionalNotes.length * addPenalty;
    const missError = missingNotes.length * missPenalty;
    let correct = 0;
    let timeError = 0;
    for (const [gtStart, matchedRecNote] of gtRecMap.entries()) {
      if (matchedRecNote !== null) {
        correct++;
        const error = Math.abs(matchedRecNote.start - gtStart);
        if (error > timeThreshold) {
          timeError += error;
        }
      }
    }
    const total = addError + missError + timeError * timingPenalty;
    result.perPitch.set(pitch, {
      total,
      addError,
      missError,
      correct,
      timeError,
      numberOfGtNotes: gtNotes.length
    });
    result.totalAdd += addError;
    result.totalMiss += missError;
    result.totalCorrect += correct;
    result.totalTime += timeError;
    result.total += total;
    result.totalNumberOfGtNotes += gtNotes.length;
  }
  return result;
}
function getMatchingSection(matching, start2, end) {
  const result = /* @__PURE__ */ new Map();
  for (const [pitch, m] of matching.entries()) {
    const { gtRecMap, additionalNotes, missingNotes, gtNotes } = m;
    const newGtRecMap = /* @__PURE__ */ new Map();
    for (const [gtStart, matchedRecNote] of gtRecMap.entries()) {
      if (matchedRecNote !== null && gtStart >= start2 && gtStart < end) {
        newGtRecMap.set(gtStart, matchedRecNote);
      }
    }
    result.set(pitch, {
      gtRecMap: newGtRecMap,
      additionalNotes: additionalNotes.filter((d) => d.start >= start2 && d.start < end),
      missingNotes: missingNotes.filter((d) => d.start >= start2 && d.start < end),
      gtNotes
    });
  }
  return result;
}
function getMatchingSliceError(matching, start2, end, addPenalty, missPenalty, timingPenalty) {
  const section = getMatchingSection(matching, start2, end);
  const error = getMatchingError(section, addPenalty, missPenalty, timingPenalty);
  return error;
}

// src/alignment/Alignment.js
function alignNoteArrays(gt, rec) {
  rec = rec.clone();
  const f = alignmentForce(gt.getNotes(), rec.getNotes());
  rec = rec.shiftTime(f);
  return {
    aligned: rec,
    timeDifference: f
  };
}
function alignNoteArrays2(gt, rec) {
  let timeDifference = 0;
  let tries = 0;
  rec = rec.clone();
  while (tries < 25) {
    const matching = matchGtAndRecordingNotes(rec.getNotes(), gt.getNotes());
    let timeDiff = 0;
    let count = 0;
    for (const m of matching.values()) {
      const { gtRecMap } = m;
      for (const [gtStart, matchedRecNote] of gtRecMap.entries()) {
        if (matchedRecNote !== null) {
          count++;
          timeDiff += gtStart - matchedRecNote.start;
        }
      }
    }
    timeDiff /= count;
    rec.shiftTime(timeDiff);
    timeDifference += timeDiff;
    if (Math.abs(timeDiff) < 5e-4) {
      break;
    }
    tries++;
  }
  return {
    aligned: rec,
    timeDifference
  };
}
function alignNoteArrays3(gt, rec) {
  let timeDifference = 0;
  let tries = 0;
  rec = rec.clone();
  while (tries < 25) {
    const matching = matchGtAndRecordingNotes(rec.getNotes(), gt.getNotes());
    const timeDiffs = [];
    for (const m of matching.values()) {
      for (const [gtStart, matchedRecNote] of m.gtRecMap.entries()) {
        if (matchedRecNote !== null) {
          timeDiffs.push(gtStart - matchedRecNote.start);
        }
      }
    }
    const shift = median_default(timeDiffs);
    rec.shiftTime(shift);
    timeDifference += shift;
    if (Math.abs(shift) < 1e-4) {
      break;
    }
    tries++;
  }
  return {
    aligned: rec,
    timeDifference
  };
}
function alignmentForce(a, b) {
  let difference2 = 0;
  let count = 0;
  for (const noteA of a) {
    let distance2 = Number.POSITIVE_INFINITY;
    let diff = Number.POSITIVE_INFINITY;
    for (const noteB of b) {
      if (noteA.pitch === noteB.pitch) {
        const dist = Math.abs(noteA.start - noteB.start);
        if (dist < distance2) {
          distance2 = dist;
          diff = noteA.start - noteB.start;
        }
      }
    }
    if (distance2 < Number.POSITIVE_INFINITY) {
      difference2 += diff;
      count++;
    }
  }
  return difference2 / count;
}
function testAlignment() {
  const test = (a2, b2, title) => {
    console.log(title);
    console.log(b2.getNotes().map((n) => n.start));
    const aligned = alignNoteArrays(a2, b2);
    console.log(aligned.getNotes().map((n) => n.start));
  };
  const a = new NoteArray_default([
    new Note_default(69, 0, 127, 0, 1),
    new Note_default(70, 1, 127, 0, 2),
    new Note_default(71, 2, 127, 0, 3)
  ]);
  console.log(a.getNotes().map((n) => n.start));
  let b;
  b = a.clone().shiftTime(2);
  test(a, b, "shifted by 2");
  b = a.clone().shiftTime(-2);
  test(a, b, "shifted by -2");
  b = a.clone().shiftTime(3).addNotes([new Note_default(72, 2, 127, 0, 3)]);
  test(a, b, "shifted by 3, added note");
  b = a.clone().repeat(2);
  test(a, b, "repeated");
  b = a.clone().repeat(2).shiftTime(3);
  test(a, b, "repeated, shifted by 3");
}
function alignmentBenchmark() {
  const seed = 0.44871573888282423;
  const rand127 = int_default.source(lcg(seed))(0, 127);
  const maxTime = 500;
  const randTime = uniform_default.source(lcg(seed))(0, maxTime);
  const randDuration = uniform_default.source(lcg(seed))(1 / 64, 2);
  const randomNotes = Array.from({ length: 200 }).fill(0).map(() => {
    const start2 = randTime();
    return new Note_default(rand127(), start2, 127, 0, start2 + randDuration());
  });
  const notes = new NoteArray_default(randomNotes).sortByTime();
  console.log("true notes", notes.getNotes());
  const shift = 3;
  const shifted = notes.clone().shiftTime(shift);
  console.log("shifted", shifted);
  const deviation2 = 0.1;
  const pAdd = 0.1;
  const pRemove = 0.1;
  let variation = generateDrumVariation(shifted.getNotes(), deviation2, pAdd, pRemove);
  variation = new NoteArray_default(variation);
  console.log("variation", variation);
  const funcs = [alignNoteArrays, alignNoteArrays2, alignNoteArrays3];
  console.log(`True time shift: ${shift} seconds`);
  console.log("Only shifted");
  for (const f of funcs) {
    const { timeDifference } = f(notes, shifted);
    const error = Math.abs(timeDifference - -shift);
    console.log(`${f.name}
shift: ${timeDifference.toFixed(3)} 
Error ${error.toFixed(3)}`);
  }
  console.log("Shifted & variation");
  for (const f of funcs) {
    const { timeDifference } = f(notes, variation);
    const error = Math.abs(timeDifference - -shift);
    console.log(`${f.name}
shift: ${timeDifference.toFixed(3)} 
Error ${error.toFixed(3)}`);
  }
}

// src/alignment/DiffAlignment.js
var DiffAlignment_exports = {};
__export(DiffAlignment_exports, {
  activationMap: () => activationMap,
  agreement: () => agreement,
  alignGtAndRecToMinimizeDiffError: () => alignGtAndRecToMinimizeDiffError,
  alignRecordingSectionsToBestFit: () => alignRecordingSectionsToBestFit,
  alignRecordingToBestFit: () => alignRecordingToBestFit
});
function alignRecordingToBestFit(gtNotes, recording, binSize = 100) {
  const recNotes = recording.getNotes();
  const bestFit = alignGtAndRecToMinimizeDiffError(gtNotes, recNotes, binSize)[0];
  const newRec = recording.clone().shiftToStartAt(bestFit.offsetMilliseconds / 1e3);
  return newRec;
}
function alignRecordingSectionsToBestFit(gtNotes, recording, binSize, gapDuration = 3, gapMode = "start-start") {
  const sections = Recording_default.segmentAtGaps(gapDuration, gapMode);
  const alignedSections = sections.map((section) => {
    const bestFit = alignGtAndRecToMinimizeDiffError(gtNotes, section, binSize)[0];
    return bestFit;
  });
  const newRec = recording.clone();
  newRec.setNotes(alignedSections.flat());
  return newRec;
}
function alignGtAndRecToMinimizeDiffError(gtNotes, recNotes, binSize) {
  gtNotes = new NoteArray_default(gtNotes);
  recNotes = new NoteArray_default(recNotes).shiftToStartAt(0);
  const gtDuration = gtNotes.getDuration();
  const recDuration = recNotes.getDuration();
  const nBins = Math.ceil(gtDuration * 1e3 / binSize) + 1;
  const nRecBins = Math.ceil(recDuration * 1e3 / binSize) + 1;
  if (nRecBins > nBins) {
    console.warn("Cannot compare GT and rec if rec is longer");
  }
  const gtActivation = activationMap(gtNotes.getNotes(), binSize);
  const recActivation = activationMap(recNotes.getNotes(), binSize);
  const agreementsPerOffset = [];
  for (let offset = 0; offset < nBins - nRecBins + 1; offset++) {
    const currentAgreement = agreement(gtActivation, recActivation, offset);
    agreementsPerOffset.push({
      offsetBins: offset,
      offsetMilliseconds: offset * binSize,
      agreement: currentAgreement
    });
  }
  const sorted = agreementsPerOffset.sort((a, b) => b.agreement - a.agreement);
  return sorted;
}
function activationMap(allNotes, binSize = 100) {
  const activationMap2 = /* @__PURE__ */ new Map();
  for (const [pitch, notes] of group(allNotes, (d) => d.pitch).entries()) {
    const maxTime = max(notes, (d) => d.end);
    const nBins = Math.ceil(maxTime * 1e3 / binSize) + 1;
    const pitchActivationMap = Array.from({ length: nBins }).fill(0);
    for (const note2 of notes) {
      const start2 = Math.round(note2.start * 1e3 / binSize);
      const end = Math.round(note2.end * 1e3 / binSize);
      for (let bin = start2; bin <= end; bin++) {
        pitchActivationMap[bin] = 1;
      }
    }
    activationMap2.set(pitch, pitchActivationMap);
  }
  return activationMap2;
}
function agreement(gtActivations, recActivations, offset) {
  const allPitches = [.../* @__PURE__ */ new Set([
    ...gtActivations.keys(),
    ...recActivations.keys()
  ])];
  let agreement2 = 0;
  for (const pitch of allPitches) {
    if (!gtActivations.has(pitch)) {
    } else if (!recActivations.has(pitch)) {
    } else {
      const gtA = gtActivations.get(pitch);
      const recA = recActivations.get(pitch);
      for (let index16 = 0; index16 < recA.length; index16++) {
        const gtValue = gtA[index16 + offset] || 0;
        const recValue = recA[index16] || 0;
        if (gtValue === 1 && recValue === 1) {
          agreement2++;
        }
      }
    }
  }
  return agreement2;
}

// src/comparison/PriorityMatching.js
var PriorityMatching_exports = {};
__export(PriorityMatching_exports, {
  balancedNoteDistance: () => balancedNoteDistance,
  errorFromPriorityMatching: () => errorFromPriorityMatching,
  getMatrixMinPosition: () => getMatrixMinPosition,
  priorityMatching: () => priorityMatching
});
function priorityMatching(itemsA, itemsB, distanceFunction) {
  const matrix = Array.from({ length: itemsA.length }).map(() => Array.from({ length: itemsB.length }));
  for (const [indexA, gtNote] of itemsA.entries()) {
    for (let indexB = indexA; indexB < itemsB.length; indexB++) {
      const dist = distanceFunction(gtNote, itemsB[indexB]);
      matrix[indexA][indexB] = dist;
      if (matrix[indexB] !== void 0) {
        matrix[indexB][indexA] = dist;
      }
    }
  }
  const matching = /* @__PURE__ */ new Map();
  const numberOfMatches = Math.min(itemsA.length, itemsB.length);
  for (let match = 0; match < numberOfMatches; match++) {
    const [a, b] = getMatrixMinPosition(matrix);
    matching.set(a, b);
    if (match >= numberOfMatches - 1) {
      break;
    }
    for (let index16 = 0; index16 < itemsA.length; index16++) {
      matrix[index16][b] = null;
    }
    for (let index16 = 0; index16 < itemsB.length; index16++) {
      matrix[a][index16] = null;
    }
  }
  return matching;
}
function errorFromPriorityMatching(gtNotes, recNotes, distanceFunction) {
  const matching = priorityMatching(gtNotes, recNotes, distanceFunction);
  const errors = /* @__PURE__ */ new Map();
  for (const [gt, rec] of matching.entries()) {
    const gtNote = gtNotes[gt];
    const recNote = recNotes[rec];
    const error = distanceFunction(gtNote, recNote);
    errors.set(gtNote, error);
  }
  return errors;
}
function balancedNoteDistance(a, b) {
  let dist = 0;
  dist += Math.abs(a.pitch - b.pitch);
  dist += Math.abs(a.pitch % 12 - b.pitch % 12);
  dist += Math.abs(a.start - b.start);
  dist += 0.5 * Math.abs(a.getDuration() - b.getDuration());
  dist += Math.abs(a.channel - b.channel);
  return dist;
}
function getMatrixMinPosition(matrix) {
  const minPerRow = matrix.map((row) => {
    const minInd = minIndex(row);
    return [
      minInd,
      row[minInd]
    ];
  });
  const minRowIndex = minIndex(minPerRow, (d) => d[1]);
  const minColIndex = minPerRow[minRowIndex][0];
  return [minRowIndex, minColIndex];
}

// src/comparison/Similarity.js
var Similarity_exports = {};
__export(Similarity_exports, {
  discretizeTime: () => discretizeTime,
  getSimilarParts: () => getSimilarParts,
  getTrackSimilarity: () => getTrackSimilarity
});
function getSimilarParts(track, selectedInterval, stride, threshold, secondsPerBin = 1 / 16, distance2 = "euclidean") {
  console.log(`Searching for similar parts based on selection, using ${distance2}`);
  if (track === void 0 || track.length === 0) {
    console.warn("No or empty track given");
    return;
  }
  const minTime = min(track, (d) => d.start);
  const maxTime = max(track, (d) => d.end);
  const binCount = Math.ceil((maxTime - minTime) / secondsPerBin);
  const discrTrack = discretizeTime(track, secondsPerBin);
  const startBin = Math.floor((selectedInterval[0] - minTime) / secondsPerBin);
  const endBin = Math.ceil((selectedInterval[1] - minTime) / secondsPerBin);
  const selection2 = sliceDiscretizedTrack(discrTrack, startBin, endBin);
  const selectionSize = endBin - startBin;
  const similarParts = [];
  for (let pos = 0; pos < binCount - selectionSize; pos += stride) {
    const pos2 = pos + selectionSize;
    if (!(pos >= startBin && pos <= endBin) && !(pos2 >= startBin && pos2 <= endBin)) {
      const part = sliceDiscretizedTrack(discrTrack, pos, pos2);
      const dist = getTrackSimilarity(selection2, part, distance2);
      if (dist <= threshold) {
        similarParts.push({
          startBin: pos,
          endBin: pos2,
          startTime: minTime + pos * secondsPerBin,
          endTime: minTime + pos2 * secondsPerBin,
          dist
        });
      }
    }
  }
  return {
    selection: {
      startBin,
      endBin,
      startTime: minTime + startBin * secondsPerBin,
      endTime: minTime + endBin * secondsPerBin
    },
    similarParts
  };
}
function getTrackSimilarity(discrA, discrB, distance2) {
  const common = [];
  for (const key of discrA.keys()) {
    if (discrB.has(key)) {
      common.push(key);
    }
  }
  let totalDist = 0;
  for (const pitch of common) {
    const binsA = discrA.get(pitch);
    const binsB = discrB.get(pitch);
    let dist;
    if (distance2 === "dtw") {
    } else if (distance2 === "euclidean") {
      dist = euclideanDistanceSquared(binsA, binsB);
    } else if (distance2 === "nearest") {
      dist = neirestNeighborDistance(binsA, binsB);
    }
    const weight = 1;
    totalDist += weight * dist;
  }
  let penaltyWeight = 0;
  for (const discr of [discrA, discrB]) {
    for (const key of discr.keys()) {
      if (!common.includes(key)) {
        penaltyWeight += countActiveNoteBins(discr.get(key));
      }
    }
  }
  return totalDist + penaltyWeight;
}
function discretizeTime(track, secondsPerBin) {
  const minTime = min(track, (d) => d.start);
  const maxTime = max(track, (d) => d.end);
  const binCount = Math.ceil((maxTime - minTime) / secondsPerBin);
  const result = /* @__PURE__ */ new Map();
  for (const note2 of track) {
    const startBin = Math.round((note2.start - minTime) / secondsPerBin);
    const endBin = Math.round((note2.end - minTime) / secondsPerBin);
    const pitch = note2.pitch;
    const binArray = result.has(pitch) ? result.get(pitch) : Array.from({ length: binCount }).fill(0);
    for (let bin = startBin; bin <= endBin; bin++) {
      binArray[bin] = 1;
    }
    result.set(pitch, binArray);
  }
  return result;
}
function countActiveNoteBins(binArray) {
  let count = 0;
  for (const bin of binArray) {
    if (bin === 1) {
      count++;
    }
  }
  return count;
}
function sliceDiscretizedTrack(trackMap, startBin, endBin) {
  const slice = /* @__PURE__ */ new Map();
  for (const [key, value] of trackMap.entries()) {
    slice.set(key, value.slice(startBin, endBin));
  }
  return slice;
}
function euclideanDistanceSquared(A2, B2) {
  const maxBins = Math.max(A2.length, B2.length);
  let sum = 0;
  for (let index16 = 0; index16 < maxBins; index16++) {
    const a = A2[index16] || 0;
    const b = B2[index16] || 0;
    const diff = a - b;
    sum += diff * diff;
  }
  return sum;
}
function neirestNeighborDistance(A2, B2) {
  const maxBins = Math.max(A2.length, B2.length);
  const maxOffset = Math.round(maxBins / 4);
  let sum = 0;
  for (let index16 = 0; index16 < maxBins; index16++) {
    let offset = 0;
    const a = A2[index16] || 0;
    const b = B2[index16] || 0;
    if (a === b) {
    } else if (a === 0 && b === 1) {
      while (offset <= maxOffset) {
        offset++;
        if (a[index16 - offset] === 1 || a[index16 + offset === 1]) {
          break;
        }
      }
    } else if (a === 1 && b === 0) {
      while (offset <= maxOffset) {
        offset++;
        if (b[index16 - offset] === 1 || b[index16 + offset === 1]) {
          break;
        }
      }
    }
    sum += offset;
  }
  return sum;
}

// src/comparison/SimilarSections.js
var SimilarSections_exports = {};
__export(SimilarSections_exports, {
  findSimilarNoteSections: () => findSimilarNoteSections,
  findSimilarStringSections: () => findSimilarStringSections
});

// src/stringBased/Levenshtein.js
var Levenshtein_exports = {};
__export(Levenshtein_exports, {
  damerauLevenshtein: () => damerauLevenshtein,
  levenshtein: () => levenshtein
});
function levenshtein(a, b, normalize2 = false) {
  if (a.length === 0 && b.length === 0) {
    return 0;
  }
  if (a.length === 0) {
    return normalize2 ? 1 : b.length;
  }
  if (b.length === 0) {
    return normalize2 ? 1 : a.length;
  }
  let i, j, previous, value;
  if (a.length > b.length) {
    const temporary = a;
    a = b;
    b = temporary;
  }
  const row = Array.from({ length: a.length + 1 });
  for (i = 0; i <= a.length; i++) {
    row[i] = i;
  }
  for (i = 1; i <= b.length; i++) {
    previous = i;
    for (j = 1; j <= a.length; j++) {
      value = b[i - 1] === a[j - 1] ? row[j - 1] : Math.min(row[j - 1] + 1, Math.min(previous + 1, row[j] + 1));
      row[j - 1] = previous;
      previous = value;
    }
    row[a.length] = previous;
  }
  const result = row[a.length];
  return normalize2 ? result / Math.max(a.length, b.length) : result;
}
function damerauLevenshtein(a, b, normalize2 = false) {
  if (a.length === 0 && b.length === 0) {
    return 0;
  }
  if (a.length === 0) {
    return normalize2 ? 1 : b.length;
  }
  if (b.length === 0) {
    return normalize2 ? 1 : a.length;
  }
  const d = Array.from({ length: a.length + 1 }).map(() => Array.from({ length: b.length }));
  for (let i = 0; i <= a.length; i++) {
    d[i][0] = i;
  }
  for (let i = 0; i <= b.length; i++) {
    d[0][i] = i;
  }
  let cost;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  const result = d[a.length][b.length];
  return normalize2 ? result / Math.max(a.length, b.length) : result;
}

// src/comparison/SimilarSections.js
function findSimilarNoteSections(notes, startTime, endTime, threshold = 0.5) {
  const selectedNotes = notes.filter((d) => d.start >= startTime && d.end <= endTime);
  const dataString = PitchSequence_default.fromNotes(notes).getPitches();
  const searchString = PitchSequence_default.fromNotes(selectedNotes).getPitches();
  const length = searchString.length;
  if (length < 3) {
    return [];
  }
  const matches = findSimilarStringSections(dataString, searchString, threshold);
  return matches.map((m) => {
    const { index: index16 } = m;
    const note1 = notes[index16];
    const note2 = notes[index16 + length];
    return {
      ...m,
      startTime: note1.start,
      endTime: note2.end
    };
  });
}
function findSimilarStringSections(dataString, searchString, threshold = 0.5) {
  const length = searchString.length;
  const matches = [];
  for (let index16 = 0; index16 < dataString.length - length; index16++) {
    const slice = dataString.slice(index16, index16 + length);
    const distance2 = levenshtein(searchString, slice) / length;
    if (distance2 < threshold) {
      matches.push({ index: index16, distance: distance2 });
    }
  }
  const filtered = [];
  matches.sort((a, b) => a.distance - b.distance);
  const occupied = Array.from({ length: dataString.length }).fill(false);
  for (const m of matches) {
    const { index: index16 } = m;
    let occ = false;
    for (let i = index16; i < index16 + length; i++) {
      if (occupied[i]) {
        occ = true;
        break;
      }
    }
    if (!occ) {
      filtered.push(m);
      for (let i = index16; i < index16 + length; i++) {
        occupied[i] = true;
      }
    }
  }
  return filtered;
}

// src/stringBased/index.js
var stringBased_exports = {};
__export(stringBased_exports, {
  Gotoh: () => Gotoh_exports,
  ImmediateRepetitionCompression: () => ImmediateRepetitionCompression_exports,
  Levenshtein: () => Levenshtein_exports,
  LongestCommonSubsequence: () => LongestCommonSubsequence_exports,
  NGrams: () => NGrams_exports,
  NeedlemanWunsch: () => NeedlemanWunsch_default,
  SuffixTree: () => SuffixTree_exports
});

// src/stringBased/LongestCommonSubsequence.js
var LongestCommonSubsequence_exports = {};
__export(LongestCommonSubsequence_exports, {
  lcs: () => lcs,
  lcsLength: () => lcsLength,
  normalizedLcsLength: () => normalizedLcsLength
});
function lcs(a, b) {
  const m = a.length;
  const n = b.length;
  if (a.length === 0) {
    return a;
  }
  if (b.length === 0) {
    return b;
  }
  let i;
  let j;
  let row = [];
  let left;
  let diagonal;
  let latch;
  const lcs2 = [];
  const c2 = [];
  for (j = 0; j < n; row[j++] = 0)
    ;
  for (i = 0; i < m; i++) {
    c2[i] = row = [...row];
    for (diagonal = 0, j = 0; j < n; j++, diagonal = latch) {
      latch = row[j];
      if (a[i] === b[j]) {
        row[j] = diagonal + 1;
      } else {
        left = row[j - 1] || 0;
        if (left > row[j]) {
          row[j] = left;
        }
      }
    }
  }
  i--;
  j--;
  while (i > -1 && j > -1) {
    switch (c2[i][j]) {
      default:
        j--;
        lcs2.unshift(a[i]);
      case (i && c2[i - 1][j]):
        i--;
        continue;
      case (j && c2[i][j - 1]):
        j--;
    }
  }
  return Array.isArray(a) || Array.isArray(b) ? lcs2 : lcs2.join("");
}
function lcsLength(a, b) {
  const m = a.length;
  const n = b.length;
  if (a.length === 0) {
    return 0;
  }
  if (b.length === 0) {
    return 0;
  }
  let i;
  let j;
  let row = [];
  let left;
  let diagonal;
  let latch;
  const c2 = [];
  for (j = 0; j < n; row[j++] = 0)
    ;
  for (i = 0; i < m; i++) {
    c2[i] = row = [...row];
    for (diagonal = 0, j = 0; j < n; j++, diagonal = latch) {
      latch = row[j];
      if (a[i] === b[j]) {
        row[j] = diagonal + 1;
      } else {
        left = row[j - 1] || 0;
        if (left > row[j]) {
          row[j] = left;
        }
      }
    }
  }
  i--;
  j--;
  return row[j];
}
function normalizedLcsLength(a, b) {
  const longerLength = Math.max(a.length, b.length);
  if (longerLength === 0) {
    return 0;
  }
  return lcsLength(a, b) / longerLength;
}

// src/stringBased/Gotoh.js
var Gotoh_exports = {};
__export(Gotoh_exports, {
  differenceSimilarity: () => differenceSimilarity,
  gotoh: () => gotoh,
  matchMissmatchSimilarity: () => matchMissmatchSimilarity,
  normalizedGotoh: () => normalizedGotoh
});
function gotoh(seqA, seqB, similarityFunction = matchMissmatchSimilarity, gapPenaltyStart = -1, gapPenaltyExtend = -0.1) {
  if (seqA.length === 0 && seqB.length === 0) {
    return 0;
  }
  const gap = (index16) => gapPenaltyStart + (index16 - 1) * gapPenaltyExtend;
  const lengthA = seqA.length;
  const lengthB = seqB.length;
  const a = Array.from({ length: lengthA + 1 }).map(() => Array.from({ length: lengthB + 1 }));
  const b = Array.from({ length: lengthA + 1 }).map(() => Array.from({ length: lengthB + 1 }));
  const c2 = Array.from({ length: lengthA + 1 }).map(() => Array.from({ length: lengthB + 1 }));
  a[0][0] = 0;
  b[0][0] = 0;
  c2[0][0] = 0;
  for (let i = 1; i <= lengthA; i++) {
    a[i][0] = c2[i][0] = Number.NEGATIVE_INFINITY;
    b[i][0] = gap(i);
  }
  for (let i = 1; i <= lengthB; i++) {
    a[0][i] = b[0][i] = Number.NEGATIVE_INFINITY;
    c2[0][i] = gap(i);
  }
  for (let i = 1; i <= lengthA; i++) {
    for (let j = 1; j <= lengthB; j++) {
      const sim = similarityFunction(seqA[i - 1], seqB[j - 1]);
      a[i][j] = Math.max(a[i - 1][j - 1], b[i - 1][j - 1], c2[i - 1][j - 1]) + sim;
      b[i][j] = Math.max(a[i - 1][j] + gapPenaltyStart, b[i - 1][j] + gapPenaltyExtend, c2[i - 1][j] + gapPenaltyStart);
      c2[i][j] = Math.max(a[i][j - 1] + gapPenaltyStart, b[i][j - 1] + gapPenaltyStart, c2[i][j - 1] + gapPenaltyExtend);
    }
  }
  return Math.max(a[lengthA][lengthB], b[lengthA][lengthB], c2[lengthA][lengthB]);
}
function normalizedGotoh(seqA, seqB, similarityFunction = matchMissmatchSimilarity, gapPenaltyStart = -1, gapPenaltyExtend = -0.1) {
  const similarity = gotoh(seqA, seqB, similarityFunction, gapPenaltyStart, gapPenaltyExtend);
  const longer = seqA.length >= seqB.length ? seqA : seqB;
  const maxSimilarity = gotoh(longer, longer, similarityFunction, gapPenaltyStart, gapPenaltyExtend);
  if (maxSimilarity === 0) {
    return similarity;
  }
  return similarity / maxSimilarity;
}
function matchMissmatchSimilarity(a, b) {
  return a === b ? 1 : -1;
}
function differenceSimilarity(a, b) {
  return -Math.abs(a - b);
}

// src/stringBased/SuffixTree.js
var SuffixTree_exports = {};
__export(SuffixTree_exports, {
  default: () => SuffixTree_default
});
var SuffixTree = class {
  constructor(array) {
    if (typeof array === "string") {
      array = array.split("");
    }
    this.node = new TreeNode();
    if (array && array.length > 0) {
      for (let index16 = 0; index16 < array.length; index16++) {
        this.node.addSuffix(array.slice(index16));
      }
    }
  }
  getLongestRepeatedSubString() {
    return this.node.getLongestRepeatedSubString();
  }
  toString() {
    return this.node.toString();
  }
  toJson() {
    return JSON.stringify(this.node);
  }
};
var TreeNode = class {
  constructor() {
    this.value = [];
    this.leaves = [];
    this.nodes = [];
  }
  checkNodes(suf) {
    let node;
    for (let index16 = 0; index16 < this.nodes.length; index16++) {
      node = this.nodes[index16];
      if (arrayShallowEquals(node.value, [suf[0]])) {
        node.addSuffix(suf.slice(1));
        return true;
      }
    }
    return false;
  }
  checkLeaves(suf) {
    let node, leaf;
    for (let index16 = 0; index16 < this.leaves.length; index16++) {
      leaf = this.leaves[index16];
      if (leaf[0] === suf[0]) {
        node = new TreeNode();
        node.value = [leaf[0]];
        node.addSuffix(suf.slice(1));
        node.addSuffix(leaf.slice(1));
        this.nodes.push(node);
        this.leaves.splice(index16, 1);
        return;
      }
    }
    this.leaves.push(suf);
  }
  addSuffix(suf) {
    if (suf.length === 0) {
      return;
    }
    if (!this.checkNodes(suf)) {
      this.checkLeaves(suf);
    }
  }
  getLongestRepeatedSubString() {
    let array = [];
    let temporary = [];
    for (let index16 = 0; index16 < this.nodes.length; index16++) {
      temporary = this.nodes[index16].getLongestRepeatedSubString();
      if (temporary.length > array.length) {
        array = temporary;
      }
    }
    return this.value.concat(array);
  }
  toString(indent = 1) {
    const ind = " |".repeat(indent);
    let string = "";
    string += this.value.length > 0 ? `-N '${this.value}'` : "root";
    if (this.nodes.length > 0) {
      for (let index16 = 0; index16 < this.nodes.length; index16++) {
        string += `
${ind}${this.nodes[index16].toString(indent + 1)}`;
      }
    }
    if (this.leaves.length > 0) {
      for (let index16 = 0; index16 < this.leaves.length; index16++) {
        string += `
${ind}-L ${this.leaves[index16]}`;
      }
    }
    return string;
  }
};
var SuffixTree_default = SuffixTree;

// src/stringBased/NGrams.js
var NGrams_exports = {};
__export(NGrams_exports, {
  getNGrams: () => getNGrams,
  getNGramsForArray: () => getNGramsForArray
});
function getNGrams(string, length) {
  if (length <= 0) {
    return /* @__PURE__ */ new Map();
  }
  length = Math.min(length, string.length);
  const nGrams = /* @__PURE__ */ new Map();
  for (let index16 = 0; index16 < string.length - length + 1; index16++) {
    const subString = string.slice(index16, index16 + length);
    if (nGrams.has(subString)) {
      nGrams.set(subString, nGrams.get(subString) + 1);
    } else {
      nGrams.set(subString, 1);
    }
  }
  return nGrams;
}
function getNGramsForArray(array, length) {
  if (length <= 0) {
    return /* @__PURE__ */ new Map();
  }
  length = Math.min(length, array.length);
  const nGrams = /* @__PURE__ */ new Map();
  for (let index16 = 0; index16 < array.length - length + 1; index16++) {
    const subArray = array.slice(index16, index16 + length);
    const key = subArray.join(" ");
    let count = 1;
    if (nGrams.has(key)) {
      count = nGrams.get(key).count + 1;
    }
    nGrams.set(key, {
      value: subArray,
      count
    });
  }
  return nGrams;
}

// src/stringBased/ImmediateRepetitionCompression.js
var ImmediateRepetitionCompression_exports = {};
__export(ImmediateRepetitionCompression_exports, {
  compress: () => compress,
  compressionRate: () => compressionRate,
  decompress: () => decompress,
  getImmediateRepetitions: () => getImmediateRepetitions,
  summary: () => summary,
  toString: () => toString
});
function compress(sequence) {
  if (!sequence || sequence.length === 0) {
    return null;
  }
  const longestReps = getImmediateRepetitions(sequence);
  if (longestReps === null) {
    return sequence;
  }
  const { seq, rep, length: len, pos } = longestReps[0];
  const preSeq = sequence.slice(0, pos);
  const postSeq = sequence.slice(pos + len * rep);
  const repetition = compress(seq);
  const pre = compress(preSeq);
  const post = compress(postSeq);
  const depth = Math.max(pre?.depth ?? 0, repetition?.depth ?? 0 + 1, post?.depth ?? 0);
  const length = (pre?.length ?? 0) + (repetition?.length ?? 0) + (post?.length ?? 0);
  return {
    pre,
    seq: repetition,
    rep,
    post,
    depth,
    length,
    content: sequence
  };
}
function getImmediateRepetitions(sequence = []) {
  const foundReps = [];
  for (let length = Math.floor(sequence.length / 2); length > 0; --length) {
    for (let pos = 0; pos < sequence.length - length; ++pos) {
      let numberOfReps = 0;
      while (true) {
        const startPos = pos + (numberOfReps + 1) * length;
        const found = arraySlicesEqual(sequence, sequence, length, pos, startPos);
        if (!found) {
          break;
        } else {
          numberOfReps++;
        }
        if (numberOfReps > 0) {
          const rep = numberOfReps + 1;
          const seq = sequence.slice(pos, pos + length);
          foundReps.push({
            length,
            pos,
            rep,
            seq,
            totalLength: length * rep
          });
        }
      }
    }
  }
  if (foundReps.length > 0) {
    return foundReps.sort((a, b) => {
      return a.totalLength === b.totalLength ? b.rep - a.rep : b.totalLength - a.totalLength;
    });
  }
  return null;
}
function decompress(tree) {
  if (!tree) {
    return [];
  }
  if (tree.join) {
    return tree;
  }
  const seq = decompress(tree.seq);
  const repetition = Array.from({ length: tree.rep }).map(() => seq);
  return [
    ...decompress(tree.pre),
    ...repetition.flat(),
    ...decompress(tree.post)
  ];
}
function summary(tree) {
  if (!tree) {
    return [];
  }
  if (tree.join) {
    return tree;
  }
  return [
    ...summary(tree.pre),
    ...summary(tree.seq),
    ...summary(tree.post)
  ];
}
function toString(tree, separator = " ") {
  if (!tree) {
    return "";
  }
  if (tree.join) {
    return tree.join(separator);
  }
  const seq = toString(tree.seq);
  const repetition = `(${tree.rep}x ${seq})`;
  return [
    toString(tree.pre),
    repetition,
    toString(tree.post)
  ].join(separator).trim();
}
function compressionRate(compressed) {
  if (!compressed?.length || !compressed?.content?.length) {
    throw new Error("Invalid hierarchy");
  }
  return compressed.length / compressed.content.length;
}

// src/stringBased/NeedlemanWunsch.js
var NeedlemanWunsch = class {
  constructor(seq1, seq2, matchScore = 1, mismatchPenalty = -1, gapPenalty = -1) {
    this.seq1 = seq1;
    this.seq2 = seq2;
    this.matchScore = matchScore;
    this.mismatchPenalty = mismatchPenalty;
    this.gapPenalty = gapPenalty;
    this.I = [];
    this.S = [];
    this.T = [];
    this.finalAlignments = [];
    this.calcScoresAndTracebacks();
  }
  calcScoresAndTracebacks() {
    this.S.push([0]);
    this.I.push([[null, null, null]]);
    this.T.push([[false, false, false]]);
    for (let i = 1; i < this.seq2.length + 1; i++) {
      this.S[0].push(this.S[0][this.S[0].length - 1] + this.gapPenalty);
      this.I[0].push([null, null, null]);
      this.T[0].push([true, false, false]);
    }
    for (let i = 1; i < this.seq1.length + 1; i++) {
      this.S.push([this.S[i - 1][0] + this.gapPenalty]);
      this.I.push([[null, null, null]]);
      this.T.push([[false, false, true]]);
      for (let j = 1; j < this.seq2.length + 1; j++) {
        const insert = this.S[i][j - 1] + this.gapPenalty;
        const del = this.S[i - 1][j] + this.gapPenalty;
        const simScore = this.seq1[i - 1] === this.seq2[j - 1] ? this.matchScore : this.mismatchPenalty;
        const match = this.S[i - 1][j - 1] + simScore;
        const intermediateScores = [insert, match, del];
        const score = Math.max(...intermediateScores);
        const tracebackTypeStatus = intermediateScores.map((entry) => entry === score);
        this.S[i].push(score);
        this.I[i].push(intermediateScores);
        this.T[i].push(tracebackTypeStatus);
      }
    }
    const lastRow = this.S[this.S.length - 1];
    this.score = lastRow[lastRow.length - 1];
  }
  alignmentChildren(pos) {
    const [i, j] = pos;
    const children2 = [];
    const tracebackTypeStatus = this.T[i][j];
    if (tracebackTypeStatus[0]) {
      children2.push({ pos: [i, j - 1], tracebackType: 0 });
    }
    if (tracebackTypeStatus[1]) {
      children2.push({ pos: [i - 1, j - 1], tracebackType: 1 });
    }
    if (tracebackTypeStatus[2]) {
      children2.push({ pos: [i - 1, j], tracebackType: 2 });
    }
    return children2;
  }
  alignmentTraceback() {
    const finalAlignments = [];
    const root2 = {
      next: null,
      pos: [this.seq1.length, this.seq2.length],
      alignment: {
        seq1: "",
        seq2: ""
      }
    };
    let current, child, children2, length, alignment, pos, t;
    current = root2;
    while (current) {
      pos = current.pos;
      alignment = current.alignment;
      children2 = this.alignmentChildren(current.pos);
      if (children2.length === 0) {
        finalAlignments.push(alignment);
      }
      current = current.next;
      for (t = 0, length = children2.length; t < length; t++) {
        child = children2[t];
        child.alignment = {
          seq1: alignment.seq1.concat(child.tracebackType === 0 ? "-" : this.seq1[pos[0] - 1]),
          seq2: alignment.seq2.concat(child.tracebackType === 2 ? "-" : this.seq2[pos[1] - 1])
        };
        child.next = current;
        current = child;
      }
    }
    return finalAlignments;
  }
};
var NeedlemanWunsch_default = NeedlemanWunsch;

// src/index.js
function getVersion() {
  return version;
}
export {
  Alignment_exports as Alignment,
  Canvas_exports as Canvas,
  Chords_exports as Chords,
  DiffAlignment_exports as DiffAlignment,
  Drums_exports as Drums,
  Guitar_exports as Guitar,
  GuitarNote_default as GuitarNote,
  HarmonicaNote_default as HarmonicaNote,
  Lamellophone_exports as Lamellophone,
  Matching_exports as Matching,
  Midi_exports as Midi,
  MidiInputManager_default as MidiInputManager,
  MusicPiece_default as MusicPiece,
  Note_default as Note,
  NoteArray_default as NoteArray,
  Piano_exports as Piano,
  PitchSequence_default as PitchSequence,
  PriorityMatching_exports as PriorityMatching,
  Recording_default as Recording,
  SimilarSections_exports as SimilarSections,
  Similarity_exports as Similarity,
  stringBased_exports as StringBased,
  utils_exports as Utils,
  getVersion,
  recordAudio,
  recordMidi
};
//# sourceMappingURL=musicvislib.esm.js.map
