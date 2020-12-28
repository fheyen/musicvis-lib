# Types

1. [Types](#types)
   1. [Overview](#overview)
   2. [Note](#note)
   3. [NoteArray](#notearray)

The types are roughly based on the MusicXML format.

## Overview

Overview of the type definitions (classes).

```
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

## Note

- Simple representation of a note
- Uses absolute time in seconds


## NoteArray


This class serves to simplify handling a collection of Note objects.

- Allows for easy manipulations of Note objects, such as sorting, time changes, ...
- Is agnostic to tempo etc.
- Contains multiple Notes
