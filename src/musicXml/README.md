# Types

1. [Types](#types)
   1. [Overview](#overview)
   2. [Track](#track)
   3. [Measure](#measure)

The types are roughly based on the MusicXML format.

## Overview

Overview of the type definitions (classes).

```
    +-------------------+
    | Track             |
    +-------------------+
    | - parts:Part[]    |
    | - title:string    |
    +-------------------+
          |
          | contains multiple
          V
    +-------------------+
    | Measure           |
    +-------------------+
    | - notes:NoteArray |
    | - bpm:number      |
    | - beats:number    |
    | - beatType:number |
    +-------------------+
          |
          | contains one
          V
    +-------------------+             +---------------------+
    | NoteArray         |             | Recording           |
    +-------------------+             +---------------------+
    | - notes:Note[]    |   extends   | - name:string       |
    |                   |<------------| - date:Date         |
    +-------------------+             | - dateString:string |
          |                           +---------------------+
          | contains multiple
          V
    +-------------------+             +-------------------+
    | Note              |             | GuitarNote        |
    +-------------------+             +-------------------+
    | - pitch:number    |   extends   | - string:number   |
    | - start:number    |<------------| - fret:number     |
    | - end:number      |             +-------------------+
    | - channel:number  |
    | - velocity:number |
    +-------------------+
```

## Track

- Serves to represent an entire piece of music with one instrument.
- Consists of multiple Parts

## Measure

- Has fixed tempo (BPM) and beat type
- Contains one NoteArray
