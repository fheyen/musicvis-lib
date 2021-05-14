declare module "Alignment" {
    /**
     * Given two NoteArrays, shift the second one in time such that they are aligned
     * @param gt - a NoteArray, e.g. the ground truth
     * @param rec - a NoteArray to align to a
     * @returns an aligned copy of b
     */
    function alignNoteArrays(gt: NoteArray, rec: NoteArray): NoteArray;
    /**
     * Given two NoteArrays, shift the second one in time such that they are aligned
     * @param gt - a NoteArray, e.g. the ground truth
     * @param rec - a NoteArray to align to a
     * @returns an aligned copy of b
     */
    function alignNoteArrays2(gt: NoteArray, rec: NoteArray): NoteArray;
    /**
     * Given two NoteArrays, shift the second one in time such that they are aligned
     * @param gt - a NoteArray, e.g. the ground truth
     * @param rec - a NoteArray to align to a
     * @returns an aligned copy of b
     */
    function alignNoteArrays3(gt: NoteArray, rec: NoteArray): NoteArray;
    /**
     * Calculates the mean difference between all notes in a and the nearest same-
    pitched notes in b
     * @param a - array with notes
     * @param b - array with notes
     * @returns mean time difference
     */
    function alignmentForce(a: Note[], b: Note[]): number;
    /**
     * Test function
     */
    function testAlignment(): void;
    function alignmentBenchmark(): void;
}

declare module "DiffAlignment" {
    /**
     * Global alignment.
     *
     * Returns an array with matches sorted by magnitude of agreement.
     * The offsetMilliseconds value describes at what time the first note of the
     * recording should start.
     *
     * Goal: Know which part of ground truth (GT) was played in recording (rec)
     * Assumptions:
     * - Rec has same tempo as GT
     * - Rec does not start before GT
     * - Rec does not repeat something that is not repeated in the GT
     * - Rec does not have gaps
     * Ideas:
     * - Brute-force
     * - Sliding window
     * - Using diff between time-pitch matrix of GT and rec
     * - Only compute agreement (correct diff part) for the current overlap
     * - For each time position save the agreement magnitude
     * - Optionally: repeat around local maxima with finer binSize
     * @param gtNotes - ground truth notes
     * @param recNotes - recorded notes
     * @param binSize - time bin size in milliseconds
     * @returns best offsets with agreements
     */
    function alignGtAndRecToMinimizeDiffError(gtNotes: Note[], recNotes: Note[], binSize: number): object[];
    /**
     * Returns an activation map, that maps pitch to an array of time bins.
     * Each bin contains a 0 when there is no note or a 1 when there is one.
     * @param allNotes - notes
     * @param binSize - time bin size in milliseconds
     * @returns activation map
     */
    function activationMap(allNotes: Note[], binSize: number): Map;
    /**
     * Given two activation maps, simply counts the number of bins [pitch, time]
     * where both have a 1, so an acitve note
     * Gtmust be longer than rec
     * @param gtActivations - see activationMap()
     * @param recActivations - see activationMap()
     * @param offset - offset for activation2 when comparing
     * @returns agreement
     */
    function agreement(gtActivations: Map, recActivations: Map, offset: number): number;
    /**
     * Aligns the recording to the best fitting position of the ground truth
     * @param gtNotes - ground truth notes
     * @param recording - a Recording object
     * @param binSize - time bin size in milliseconds
     * @returns aligned recording
     */
    function alignRecordingToBestFit(gtNotes: Note[], recording: Recording, binSize: number): Recording;
}

declare module "Chords" {
    /**
     * Detects chords as those notes that have the exact same start time, only works
     * for ground truth (since recordings are not exact)
     * Does only work if groundtruth is aligned! TuxGuitar produces unaligned MIDI.
     * @param notes - notes
     * @returns array of chord arrays
     */
    function detectChordsByExactStart(notes: Note[]): Note[][];
    /**
     * Detects chords, by simply looking for notes that overlap each other in time.
     * Example:
     *    =======
     *       =========
     *         ========
     * Important: Notes must be sorted by start time for this to work correctly.
     * @param notes - array of Note objects
     * @param sortByPitch - sort chords by pitch? (otherwise sorted
     *      by note start time)
     * @returns array of chord arrays
     */
    function detectChordsByOverlap(notes: Note[], sortByPitch: boolean): Note[][];
    /**
     * Returns chord type, e.g. 'Major', 'Diminished', ...
     * Important: Notes must be sorted by pitch ascending
     * @param notes - notes (sorted by pitch asc.)
     * @returns chord type
     */
    function getChordType(notes: Note[]): string;
    /**
     * https://github.com/tonaljs/tonal/tree/master/packages/chord
     * Detected chords can be used with https://github.com/tonaljs/tonal/tree/master/packages/chord-type
     * @param notes - notes
     * @returns possible chord types
     */
    function getChordName(notes: Note[]): string[];
}

declare module "comparison/ErrorClassifier" {
    /**
     * Compares a single recording to a ground truth and labels notes as missing,
    extra, early/late, or short/long
     * @param gtNotes - ground truth notes
     * @param recNotes - recordings notes
     * @param groupBy - attribute to group notes by
     * @param threshold - time threshold for same-ness
     * @returns classified notes
     */
    function classifyErrors(gtNotes: Note[] | GuitarNote[], recNotes: Note[] | GuitarNote[], groupBy: string, threshold: number): NoteWithState[];
    /**
     * Separates classified GT and rec notes
     * @param classifiedNotes - classified notes
     * @returns separated notes
     */
    function separateMissed(classifiedNotes: NoteWithState[]): any;
    /**
     * @param map - map
     * @param key - key
     * @param value - value
     */
    function setOrAdd(map: Map, key: any, value: any): void;
    /**
     * @param map - map
     * @param key - key
     * @returns true if map.get(key).size > 0
     */
    function hasAtLeastOne(map: Map, key: any): boolean;
}

declare module "comparison/Matching" {
    /**
     * For one recording, separately for each pitch,
    matches each recorded note to its closest ground truth note.
    If there are multiple matches, the best (smallest time difference)
    will be kept and others will be regarded as additional notes.
    Ground truth notes without match will be regarded as missing notes.
    
    Result format (separated by pitch in a Map):
    Map:pitch->{
       gtRecMap           matched rec. note for each GT note Map:gtNoteStart->recNote,
       additionalNotes:   rec. notes without matched GT note
       missingNotes:      GT notes without matched rec. note
       gtNotes:           all GT notes
    }
     * @param recNotes - recorded notes of a single recording
     * @param gtNotes - ground truth notes
     * @returns result
     */
    function matchGtAndRecordingNotes(recNotes: Note[], gtNotes: Note[]): Map;
    /**
     * Matches all recorded notes from multiple recordings to the nearest
    ground truth (GT) note.
    Contrary to the matching created by matchGtAndRecordingNotes()
    missing and additional notes are not considered, so multiple notes
    from a single recording can be matched to the same GT note.
    
    Result format:
    Map:pitch->Map:gtStart->arrayOfMatchedRecNotes
     * @param recordings - recordings
     * @param gtNotes - ground truth notes
     * @returns matching
     */
    function matchGtAndMultipleRecordings(recordings: Recording[], gtNotes: Note[]): Map;
    /**
     * Calculates (for each pitch) the average error for each GT note (averaged
    over all matched notes in the recordings),
    as well as the maximum of all those average errors.
    GT notes that have no matched recorded notes will have an error of 0.
     * @param multiMatching - matching with a GT and multiple recordings
     * @param errorThreshold - number seconds of deviation above which
         to exclude an error
     * @returns error summary Map:pitch->{gtErrorMap, maxError},
         gtErrorMap is Map:gtStart->error (error is average over all time
         differences between the GT note and matched recNotes)
     */
    function getMultiMatchingErrorPerNote(multiMatching: Map, errorThreshold: number): Map;
    /**
     * Calculates the error of a matching by applying penalties and summing up
     * @param matching - a matching created by matchGtAndRecordingNotes
     * @param addPenalty - penalty for each additonal note
     * @param missPenalty - penalty for each missing note
     * @param timingPenalty - penalty for note timing differences in seconds
     * @param timeThreshold - timing errors below it (absolute) are ignored
     * @returns errors by category
     */
    function getMatchingError(matching: Map, addPenalty: number, missPenalty: number, timingPenalty: number, timeThreshold: number): any;
    /**
     * Cuts a section from a matching by filtering on the start times
    of ground truth, missing, and additonal notes
     * @param matching - matching
     * @param start - start time (inclusive)
     * @param end - end time (exclusive)
     * @returns section of matching
     */
    function getMatchingSection(matching: Map, start: number, end: number): Map;
    /**
     * Shortcut for getMatchingSection and getMatchingError,
    see them for parameter details.
     * @param matching - matching
     * @param start - start time (inclusive)
     * @param end - end time (exclusive)
     * @param addPenalty - penalty for each additonal note
     * @param missPenalty - penalty for each missing note
     * @param timingPenalty - penalty for note timing differences in seconds
     * @returns error by category
     */
    function getMatchingSliceError(matching: Map, start: number, end: number, addPenalty: number, missPenalty: number, timingPenalty: number): any;
}

declare module "comparison/Similarity" {
    /**
     * Given a track, a selected time interval and a threshold,
    this function searches for parts in the track that are
    similar to the selection.
    It uses a sliding window with the size of the selection
    and a stride given as argument.
     * @param track - array of Note objects
     * @param selectedInterval - [startTime, endTime] in seconds
     * @param stride - stride for the sliding window in number of bins
     * @param threshold - distance threshold below which parts are considered similar
     * @param secondsPerBin - time bin size in seconds
     * @param distance - one of: 'dtw', 'euclidean', 'nearest'
     * @returns similar parts
     */
    function getSimilarParts(track: Note[], selectedInterval: number[], stride: number, threshold: number, secondsPerBin: number, distance: string): any;
    /**
     * Uses calculates the distance between
    two discretized tracks, for each pitch separately.
    Pitch-wise distances are averaged and a penalty is added to the distance
    for pitches that are not occuring in both tracks
     * @param discrA - discretized track
     * @param discrB - discretized track
     * @param distance - one of: 'euclidean', 'nearest'
     * @returns distance
     */
    function getTrackSimilarity(discrA: Map, discrB: Map, distance: string): number;
    /**
     * - Normalizes Note times to be between 0 and (maxTime - minTime),
    - discretizes the start and end time by using Math.round to get
    the closest time bin (beat) and
    - Creates one array for each pitch, where each entry contains
    either a 0 (no note at that time bin) or a 1 (note at that time bin)
     * @param track - an array of Note objects
     * @param secondsPerBin - time bin size in seconds
     * @returns pitch to binArray
     */
    function discretizeTime(track: Note[], secondsPerBin: number): Map;
    /**
     * Counts the occurence of 1 in an array
     * @param binArray - array
     * @returns occurence of 1
     */
    function countActiveNoteBins(binArray: number[]): number;
    /**
     * Slices bins out of a discretices track.
    This is done for each pitch separately
     * @param trackMap - Map pitch->binArray
     * @param startBin - index of first bin
     * @param endBin - index of last bin
     * @returns map with sliced arrays
     */
    function sliceDiscretizedTrack(trackMap: Map, startBin: number, endBin: number): Map;
    /**
     * Returns sum_{i=0}^{N-1}{(a_i-b_i)^2},
    i.e. Euclidean distance but without square root
     * @param A - an array
     * @param B - another array
     * @returns Euclidean distance
     */
    function euclideanDistanceSquared(A: number[], B: number[]): number;
    /**
     * Given two arrays containing 1s and 0s, this algorithm
    goes through all bins and for each bin where one array
    has a 1 and the other a 0, it searches for the closest 1
    next to the 0.
    The distance is then added to the global distance.
     * @param A - an array
     * @param B - another array
     * @returns nearest neighbor distance
     */
    function neirestNeighborDistance(A: number[], B: number[]): number;
}

declare module "comparison/SimilarSections" {
    /**
     * Turns an array of notes into a string to perform pattern matching search for similar
     * patterns.
     * @param notes - notes, must be sorted by Note.start
     * @param startTime - start time of the section to search
     * @param endTime - end time for the section to search
     * @param threshold - threshold for normalized Levenshtein distance in [0, 1]
     * @returns {index, distance, startTime, endTime}
     */
    function findSimilarNoteSections(notes: Note[], startTime: number, endTime: number, threshold: number): object[];
    /**
     * Finds similar sections in a string via Levenshtein distance
     * @param dataString - they string to search in
     * @param searchString - the string to search for
     * @param threshold - threshold for normalized Levenshtein distance in [0, 1]
     * @returns {index, distance}
     */
    function findSimilarStringSections(dataString: stringArray, searchString: stringArray, threshold: number): object[];
}

/**
 * Takes the ground truth and a single recording
 */
declare function getErrorPerGtNote(gtNotes: any, recNotes: any): void;

/**
 * Creates a track of metronome ticks for a given tempo and meter.
 * @param tempo - tempo in bpm, e.g. 120
 * @param meter - e.g. [4, 4]
 * @param duration - duration of the resulting track in seconds
 * @returns metronome track with {time: number, accent: boolean}
 */
declare function metronomeTrackFromTempoAndMeter(tempo: number, meter: number[], duration: number): object[];

/**
 * Creates a track of metronome ticks for a given music piece.
 * @param musicPiece - music piece
 * @returns metronome track with {time: number, accent: boolean}
 */
declare function metronomeTrackFromMusicPiece(musicPiece: MusicPiece): object[];

/**
 * Calculates all n-grams with a specified length
 * @param string - a string
 * @param length - length (n) of n-grams
 * @returns maps n-gram to its number of occurences
 */
declare function getNGrams(string: string, length: number): Map<string, number>;

/**
 * Calculates all n-grams with a specified length
 * @param array - an array of primitive data types
 * @param length - length (n) of n-grams
 * @returns maps n-gram, joined with ' ', to its number of
 * occurences and value
 */
declare function getNGramsForArray(array: any[], length: number): Map<string, object>;

declare module "instruments/StringedFingering" {
    /**
     * Represents a positon as {string, fret}
     * @param string - string
     * @param fret - fret
     */
    class FretboardPosition {
        constructor(string: number, fret: number);
        /**
         * Moves the positon by string and fret
         * @param string - string
         * @param fret - fret
         */
        moveBy(string: number, fret: number): void;
        /**
         * Checks whether this position is valid
         * @param maxString - number of strings -1
         * @param maxFret - number of frets
         * @returns true iff valid
         */
        isValid(maxString: number, maxFret: number): boolean;
        /**
         * Returns true iff this and another FretboardPosition are equal
         * @param otherFretboardPosition - another FretboardPosition
         * @returns true iff equal
         */
        equals(otherFretboardPosition: FretboardPosition): boolean;
        /**
         * String representation
         * @returns string representation
         */
        toString(): string;
        /**
         * @returns clone
         */
        clone(): FretboardPosition;
        /**
         * Returns (other - this), i.e. how you need to move this to get to other
         * @param otherFretboardPosition - another FretboardPosition
         * @returns difference in {string, fret}
         */
        difference(otherFretboardPosition: FretboardPosition): any;
    }
    /**
     * Represents a hand pose, for each of the 10 fingers with a FretboardPosition
     * or null, if the finger is not used
     * @param fingerPositions - Indices 0-9: left thumb, 4 left fingers
     *      right thumb, 4 right fingers. Values: null for finger not pressed,
     *      {string:number, fret:number} for pressed fingers
     */
    class HandPose {
        constructor(fingerPositions: number[]);
        /**
         * Move a single finger
         * @param index - finger index in [0, 9]
         * @param newPosition - new position
         */
        moveFingerTo(index: number, newPosition: FretboardPosition): void;
        /**
         * Lift a single finger
         * @param index - finger index in [0, 9]
         */
        liftFinger(index: number): void;
        /**
         * Moves the finger by string and fret
         * @param index - finger index in [0, 9]
         * @param string - string
         * @param fret - fret
         */
        moveFingerBy(index: number, string: number, fret: number): void;
        /**
         * Move the whole hand, fingers keep relative positions
         * @param string - string
         * @param fret - fret
         */
        moveHandBy(string: number, fret: number): void;
        /**
         * Checks whether this position is valid
         * @param maxString - max string
         * @param maxFret - max fret
         * @returns true iff valid
         */
        isValid(maxString: number, maxFret: number): boolean;
        /**
         * Returns true iff this and another FretboardPosition are equal
         * @param otherHandPose - another hand pose
         * @returns ture iff equal
         */
        euqals(otherHandPose: HandPose): boolean;
        /**
         * @returns string representation
         */
        toString(): string;
        /**
         * @returns clone
         */
        clone(): HandPose;
        /**
         * Returns (other - this), i.e. how you need to move this to get to other
         * @param otherHandPose - another HandPose
         * @returns difference
         */
        difference(otherHandPose: HandPose): object[];
        /**
         * Calculates movement costs
         * @param otherHandPose - another HandPose
         * @returns cost
         */
        costOfMovement(otherHandPose: HandPose): number;
    }
}

/**
 * Lookup for many MIDI specifications.
 */
declare module "fileFormats/Midi" {
    /**
     * A MIDI note
     * @example
     * <caption>Example for a MIDI note</caption>
         { pitch: 69, name: 'A', octave: 4, label: 'A4', frequency: 440.000 }
     * @property pitch - the MIDI note number e.g. 60 for C4
     * @property name - e.g. C#
     * @property octave - number in [-1, 9]
     * @property label - name and octave, e.g. C#5
     * @property frequency - physical frequency
     */
    type MidiNote = {
        pitch: number;
        name: string;
        octave: number;
        label: string;
        frequency: number;
    };
    /**
     * Returns information on the MIDI note with the specified number.
     * @param nr - MIDI note number in [0, 127]
     * @returns MIDI note information as a {@link MidiNote}
     */
    function getMidiNoteByNr(nr: number): MidiNote;
    /**
     * Returns information on the MIDI note with the specified label.
     * @param label - note label, e.g. 'D#0'
         (upper-case and sharp notation necessary)
     * @returns MIDI note information as a {@link MidiNote}
     */
    function getMidiNoteByLabel(label: string): MidiNote;
    /**
     * Returns information on the MIDI note with the specified name and octave.
     * @param name - note name, e.g. 'D#'
         (upper-case and sharp notation necessary)
     * @param octave - octave in [-1, 9]
     * @returns MIDI note information as a {@link MidiNote}
     */
    function getMidiNoteByNameAndOctave(name: string, octave: number): MidiNote;
    /**
     * Returns information on the MIDI instrument with the specified number.
     * @param nr - MIDI instrument number in [0, 127]
     * @returns note info, e.g.
         { number: 0, group: 'Piano', label: 'Acoustic Grand Piano' }
     */
    function getMidiInstrumentByNr(nr: number): any;
    /**
     * Returns information on the MIDI instrument (MIDI level 2) with the
    specified number.
     * @param nr - MIDI instrument number in [0, 127]
     * @param subNr - MIDI instrument sub number in [0, 127]
     * @returns note info, e.g.
         { number: 0, group: 'Piano', label: 'Acoustic Grand Piano' }
     */
    function getMidiInstrumentByNrL2(nr: number, subNr: number): any;
    /**
     * Returns information on the MIDI instrument with the specified number.
     * @param nr - MIDI drum note number in [27, 87]
     * @returns note name, e.g. 'Bass Drum 1
     */
    function getMidiDrumNoteByNr(nr: number): string;
    /**
     * Returns true if a given MIDI pitch refers to a sharp note.
     * @param nr - MIDI note number in [0, 127]
     * @returns true if sharp, false otherwise
     */
    function isSharp(nr: number): boolean;
    /**
     * Returns a note name such as 'C#' (without octave) for a given MIDI
    note number.
     * @param nr - MIDI note number in [0, 127]
     * @returns note name such as 'C#'
     */
    function getNoteNameFromNoteNr(nr: number): string;
    /**
     * Maps flats to sharps, e.g. flatToSharp.get('Db') === 'C#'
     */
    const flatToSharp: Map<string, string>;
    /**
     * Maps shaprs to flats, e.g. sharpToFlat.get('C#') === 'Db'
     */
    const sharpToFlat: Map<string, string>;
    /**
     * Names of notes, indexed like MIDI numbers, i.e. C is 0
     */
    const NOTE_NAMES: string[];
    /**
     * Index equals MIDI note number
     */
    const MIDI_NOTES: MidiNote[];
    /**
     * Set of all MIDI notes that are sharp/flat
     * @example
     * <caption>Find out if a note is sharp/flat</caption>
         const midiNr = 42;
         const isSharp = Midi.SHARPS.has(midiNr);
         // true
     */
    const SHARPS: Set<number>;
    /**
     * A MIDI command
     * @example
     * <caption>Example for a MIDI command</caption>
         { name: 'noteOn', description: 'Note-on', params: ['key', 'velocity'] }],
     * @property name - e.g. 'noteOn'
     * @property description - e.g. 'Note-on'
     * @property params - additional prameters of that command
     */
    type MidiCommand = {
        name: string;
        description: string;
        params: string[] | undefined;
    };
    /**
     * MIDI commands with code, name, and parameters
    From: https://ccrma.stanford.edu/~craig/articles/linuxmidi/misc/essenmidi.html
    https://www.midi.org/specifications/item/table-1-summary-of-midi-message
     */
    const MIDI_COMMANDS: Map<number, MidiCommand>;
    const GENERAL_MIDI_DRUM_NOTE_NUMBERS: Map<number, string>;
    const MIDI_NOTE_RANGES: object[];
}

declare module "fileFormats/MidiParser" {
    /**
     * Parses a MIDI JSON file to get Note objects with absolute time in seconds.
     * @param data - MIDI data in JSON format
     * @param splitFormat0IntoTracks - split MIDI format 0 data into tracks
         instead of using channels?
     * @param log - set to true to log results etc. to the console
     * @returns including an array of note objects and meta information
     */
    function preprocessMidiFileData(data: any, splitFormat0IntoTracks: boolean, log: boolean): any;
    /**
     * MIDI event types and meta types and their codes
     */
    const EVENT_TYPES: any;
    const META_TYPES: any;
    /**
     * Maps needed for key signature detection from number of sharps / flats
     */
    const KEY_SIG_MAP: Map<number, object>;
}

declare module "fileFormats/MusicXmlParser" {
    /**
     * Converts a collection of MusicXML measures to JavaScript Objects with timing information in seconds.
    Also calculates the position of measure lines and the total time in seconds.
     * @param xml - MusicXML document
     * @param log - set to true to log results etc. to the console
     * @returns parsed document
     */
    function preprocessMusicXmlData(xml: XMLDocument, log: boolean): any;
    /**
     * Returns a map containing maps, such that result.get(partId).get(instrId)
    gives you the instrument with the ID instrId as defined in the part partId.
    
    This is needed to map drum notes to MIDI pitches.
     * @param xml - MusicXML
     * @returns map with structure result.get(partId).get(instrId)
     */
    function getDrumInstrumentMap(xml: XMLDocument): Map;
    /**
     * Map from fiths to key signature
     */
    const keySignatureMap: Map<number, object>;
    /**
     * Maps dynamics to MIDI velocity numbers, i.e. 'ff' to 102
     */
    const dynamicsMap: Map<string, number>;
}

declare module "graphics/Canvas" {
    /**
     * Sets up a canvas rescaled to device pixel ratio
     * @param canvas - canvas element
     * @returns canvas rendering context
     */
    function setupCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D;
    /**
     * Draws a stroked straight line.
     * @example
     * // Set the strokeStyle first
     *      context.strokeStyle = 'black';
     *      // Let's draw an X
     *      Canvas.drawLine(context, 0, 0, 50, 50);
     *      Canvas.drawLine(context, 0, 50, 50, 0);
     * @param context - canvas rendering context
     * @param x1 - x coordinate of the start
     * @param y1 - y coordinate of the start
     * @param x2 - x coordinate of end
     * @param y2 - y coordinate of end
     */
    function drawLine(context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): void;
    /**
     * Draws a stroked straight horizontal line.
     * @param context - canvas rendering context
     * @param x1 - x coordinate of the start
     * @param y - y coordinate of the start
     * @param x2 - x coordinate of end
     */
    function drawHLine(context: CanvasRenderingContext2D, x1: number, y: number, x2: number): void;
    /**
     * Draws a stroked straight vertical line.
     * @param context - canvas rendering context
     * @param x - x coordinate of the start
     * @param y1 - y coordinate of the start
     * @param y2 - y coordinate of end
     */
    function drawVLine(context: CanvasRenderingContext2D, x: number, y1: number, y2: number): void;
    /**
     * Draws a stroked circle.
     * @param context - canvas rendering context
     * @param x - x coordinate of center
     * @param y - y coordinate of center
     * @param radius - radius
     */
    function drawCircle(context: CanvasRenderingContext2D, x: number, y: number, radius: number): void;
    /**
     * Draws a filled circle.
     * @param context - canvas rendering context
     * @param x - x coordinate of center
     * @param y - y coordinate of center
     * @param radius - radius
     */
    function drawFilledCircle(context: CanvasRenderingContext2D, x: number, y: number, radius: number): void;
    /**
     * Draws a filled triangle like this: /\
     * @param context - canvas rendering context
     * @param x - x coordinate of center
     * @param y - y coordinate of center
     * @param halfSize - half of the size
     */
    function drawTriangle(context: CanvasRenderingContext2D, x: number, y: number, halfSize: number): void;
    /**
     * Draws a diamond like this: <>
     * @param context - canvas rendering context
     * @param x - x coordinate of center
     * @param y - y coordinate of center
     * @param halfSize - half of the size
     */
    function drawDiamond(context: CanvasRenderingContext2D, x: number, y: number, halfSize: number): void;
    /**
     * Draws an X
     * @param context - canvas rendering context
     * @param x - x coordinate of center
     * @param y - y coordinate of center
     * @param halfSize - half of the size
     */
    function drawX(context: CanvasRenderingContext2D, x: number, y: number, halfSize: number): void;
    /**
     * Draws a trapezoid that looks like a rectangle but gets narrower at the right
     * end, so better show where one ends and the next begins.
     * @param context - canvas rendering context
     * @param x - x coordinate of top left
     * @param y - y coordinate of top left
     * @param width - width
     * @param height - height (of left side)
     * @param height2 - height (of right side)
     */
    function drawNoteTrapezoid(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, height2: number): void;
    /**
     * Draws a trapezoid that looks like a rectangle but gets narrower at the top
     * end, so better show where one ends and the next begins.
     * @param context - canvas rendering context
     * @param x - x coordinate of bounding rect's top left
     * @param y - y coordinate of bounding rect's top left
     * @param width - width (of bounding rect / bottom side)
     * @param height - height
     * @param width2 - width (of top side)
     */
    function drawNoteTrapezoidUpwards(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, width2: number): void;
    /**
     * Draws a rectangle with rounded corners, does not fill or stroke by itself
     * @param context - canvas rendering context
     * @param x - x coordinate of bounding rect's top left
     * @param y - y coordinate of bounding rect's top left
     * @param width - width
     * @param height - height
     * @param radius - rounding radius
     */
    function drawRoundedRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number): void;
    /**
     * Draws a horizontal, then vertical line to connect two points (or the other
     * way round when xFirst == false)
     * @param context - canvas rendering context
     * @param x1 - x coordinate of start
     * @param y1 - y coordinate of start
     * @param x2 - x coordinate of end
     * @param y2 - y coordinate of end
     * @param [xFirst = true] - controls whether to go first in x or y direction
     */
    function drawCornerLine(context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, xFirst?: boolean): void;
    /**
     * Draws a rounded version of drawCornerLine()
     * @param context - canvas rendering context
     * @param x1 - x coordinate of start
     * @param y1 - y coordinate of start
     * @param x2 - x coordinate of end
     * @param y2 - y coordinate of end
     * @param [maxRadius = 25] - maximum radius, fixes possible overlaps
     */
    function drawRoundedCornerLine(context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, maxRadius?: number): void;
    /**
     * Draws a hexagon
     * @param context - canvas rendering context
     * @param cx - center x
     * @param cy - center y
     * @param radius - radius of the circle on which the points are placed
     */
    function drawHexagon(context: CanvasRenderingContext2D, cx: number, cy: number, radius: number): void;
}

/**
 * Returns the current version of the library
 * @returns version string
 */
declare function getVersion(): string;

/**
 * Allows to record audio blobs.
 * @example
 * Usage (only in async functions):
    const recorder = await recordAudio();
    recorder.start();
    // ...
    const audio = await recorder.stop();
stop() returns a Blob with audio data
 */
declare module "input/AudioRecorder" { }

/**
 * Handles incoming MIDI messages from a MIDI device.
 */
declare module "input/MidiInputManager" {
    /**
     * Constructor with callback functions
     * @param getMidiLiveData - a function called by this object to get
     *      the currently recorded MIDI notes from App.js, where the
     *      MidiInputManager instance should be created
     *      Example for how to defined getMidiLiveData as method in App.js:
     *          getMidiLiveData = () => this.state.midiLiveData;
     * @param setMidiLiveData - a function called by this object to
     *      update the currently MIDI notes in App.js
     *      Example:
     *          setMidiLiveData = (data) => {
     *              // Work-around so note_off event handling can
     *              // immediately find the note_on event
     *              this.state.midiLiveData = data;
     *              this.setState({ midiLiveData: data });
     *          };
     * @param addCurrentNote - a function called by this object to add
     *      a currently played note (e.g. currently pressed piano key)
     *      Example:
     *          addCurrentNote = (note) => {
     *              const newMap = new Map(this.state.currentNotes).set(note.pitch, note);
     *              this.setState({ currentNotes: newMap });
     *          }
     * @param removeCurrentNote - a function called by this object to
     *      remove a currently played note
     *      Example:
     *          removeCurrentNote = (pitch) => {
     *              const newMap = new Map(this.state.currentNotes).delete(pitch);
     *              this.setState({ currentNotes: newMap });
     *          }
     */
    class MidiInputManager {
        constructor(getMidiLiveData: (...params: any[]) => any, setMidiLiveData: (...params: any[]) => any, addCurrentNote: (...params: any[]) => any, removeCurrentNote: (...params: any[]) => any);
    }
}

/**
 * Records incoming MIDI messages from a MIDI device.
 * @example
 * Usage (only in async functions):
 *     const recorder = await recordMidi();
 *     recorder.start();
 *     const notes = recorder.stop();
 */
declare module "input/MidiRecorder" { }

declare module "instruments/Drums" {
    /**
     * Pitches that are mapped onto themselves are included for other information.
     * Millenium MPS-850 https://www.thomann.de/de/millenium_mps_850_e_drum_set.htm
     *
     * Notation info (line and shape of symbol) so drum notation can generate a lookup from this
     * https://en.wikipedia.org/wiki/Percussion_notation#/media/File:Sibelius_drum_legend.png
     * Lines start with 0 at the top above the top most horizontal notation line,
     * using incremental integers for every possible position, i.e. for on and between lines
     *
     * Legend:
     *  Map key: The orignal pitch from the input data
     *  repPitch: Replacement pitch, used to simplify multiple zones into one
     *  zone: Zone of the instrument this pitch comes from
     *  order: visual order ranking of this intrumentin the UI (top-bottom or left-right)
     *  line: y position in the drum notation (using integers for every possible position)
     *  shape: Note shape in notation: triangle, <>, x, o, ostroke, xstroke
     *  label: Short label for this intrument
     *  name: Full name of this instrument
     */
    const drumPitchReplacementMapMPS850: Map<number, object>;
    /**
     * Generates a variation of an array of notes by adding, removing or changing notes
     * @param data - array of notes
     * @param deviation - width of the Gauss kernel
     * @param pAdd - probability of adding a note after each note
     * @param pRemove - probability of removing each note
     * @returns variated Note array
     */
    function generateDrumVariation(data: Note[], deviation: number, pAdd: number, pRemove: number): Note[];
    /**
     * Replaces pitches based on replacementMap
     * @param notes - notes
     * @param replacementMap - a map pitch->replacementPitch
     * @returns notes with replaced pitches
     */
    function simplifyDrumPitches(notes: Note[], replacementMap: Map): Notes[];
    /**
     * Returns a Map:pitch->yPosIndex for views to lookup which row
     * a pitch has to be drawn in
     * @param replacementMap - a pitch replacement map
     * @returns Map:pitch->yPosIndex
     */
    function getPitch2PositionMap(replacementMap: Map): Map;
}

declare module "instruments/Guitar" {
    /**
     * Represents a tuning of a fretted string instrument.
     * @param name - name
     * @param notes - array of notes, e.g. ['E2', 'A2', 'D3', ...]
     */
    class StringedTuning {
        constructor(name: string, notes: string[]);
    }
    /**
     * Maps from instrument to string number to list of tunings.
    Defaults are at the top.
     * @example
     * stringedTunings.get('Guitar').get(6) for 6-string guitar tunings
     */
    const stringedTunings: Map<string, Map<number, StringedTuning>>;
    /**
     * For Notes that have a guitar string encoded in their channel, this function
    allows to convert them to a GuitarNote.
     * @param note - a Note that has the guitar string stored in its channel
         e.g. 0 to 5 for a six string
     * @param tuning - tuning
     * @returns a GuitarNote
     */
    function guitarNoteFromNote(note: Note, tuning: StringedTuning): GuitarNote;
    /**
     * Returns a tuning with the specified pitches or null if none found.
     * @param pitches - pitches of the tuning, same order as in
         Guitar.js' stringedTunings, i.e. low to high notes
     * @returns the found tuning or null
     */
    function getTuningFromPitches(pitches: number[]): StringedTuning | null;
    /**
     * Returns the pitch range of a tuning, given the number of frets.
     * @param tuning - tuning
     * @param fretCount - number of frets the instrument has (default: 24)
     * @returns [minPitch, maxPitch]
     */
    function getTuningPitchRange(tuning: StringedTuning, fretCount: number): number[];
    /**
     * Colors for guitar strings, acces via stringColor[string]
    where string in [1, 8].
     */
    const stringColors: string[];
    /**
     * Returns the pitch of a note at a given fretboard position.
     * @param string - string
     * @param fret - fret
     * @param tuning - tuning
     * @returns pitch
     */
    function getPitchFromFretboardPos(string: number, fret: number, tuning: StringedTuning): number;
    /**
     * Returns MIDI attributes of a note at a given fretboard position, e.g. C#
     * @param string - string
     * @param fret - fret
     * @param tuning - tuning
     * @returns note info, e.g. { pitch: 69, name: 'A', octave: 4, label: 'A4', frequency: 440.000 }
     */
    function getNoteInfoFromFretboardPos(string: number, fret: number, tuning: StringedTuning): any;
    /**
     * Finds all fretboard positions with this exact pitch.
     * @param pitch - MIDI pitch
     * @param tuning - tuning
     * @param fretCount - number of frets the instrument has
     * @returns positions
     */
    function getFretboardPositionsFromPitch(pitch: number, tuning: StringedTuning, fretCount: number): object[];
    /**
     * Finds all fretboard positions with this note in all octaves.
     * @param name - note name, e.g. 'C#'
     * @param tuning - tuning
     * @param fretCount - number of frets the instrument has
     * @returns positions
     */
    function getFretboardPositionsFromNoteName(name: string, tuning: StringedTuning, fretCount: number): object[];
    /**
     * Generates example MIDI-like data (preprocessed MIDI).
     * @param startTime - start tick
     * @param count - number of notes to generate
     * @param tuning - tuning
     * @returns notes
     */
    function generateExampleData(startTime: number, count: number, tuning: StringedTuning): GuitarNote[];
    /**
     * Estimates the fretboard position from MIDI notes
     * @param notes - notes with only MIDI information
     * @param tuning - tuning
     * @param fretCount - number of frets the instrument has
     * @returns GuitarNotes with fretboard positions
     */
    function fretboardPositionsFromMidi(notes: Note[], tuning: StringedTuning, fretCount: number): GuitarNote[];
}

declare module "instruments/Lamellophone" {
    /**
     * Represents a tuning of lamellophone.
     * @param name - name
     * @param notes - array of notes, same order as on instrument
         e.g. [..., 'D4','C4', 'F#4', ...]
     */
    class LamellophoneTuning {
        constructor(name: string, notes: string[]);
        /**
         * Returns an array of the tuning's notes as number representation:
        Tuning notes:  C4, D4, ... C5, D5, ... C6,  D6
        Number format: 1,  2,  ... 1°, 2°, ... 1°°, 2°°
         * @returns array with tuning notes in number representation
         */
        getNumbers(): string[];
        /**
         * Returns an array of the tuning's notes as letter representation:
        Tuning notes:  C4, D4, ... C5, D5, ... C6,  D6
        Number format: C,  D,  ... C°, D°, ... C°°, D°°
         * @returns array with tuning notes in letter representation
         */
        getLetters(): string[];
    }
    /**
     * Tunings.
    Notes are in the same order as on the instrument
     */
    const lamellophoneTunings: Map<string, Map<string, LamellophoneTuning>>;
    /**
     * Parses a tab into notes
     * @param tab - in letter format
     * @param tuning - tuning
     * @param tempo - tempo in bpm
     * @returns notes
     */
    function convertTabToNotes(tab: string, tuning: LamellophoneTuning, tempo: number): Note[];
    /**
     * Converts an array of notes into a text tab
     * @param notes - notes
     * @param tuning - tuning
     * @param mode - mode
     * @param restSize - number of seconds for a gap between chords to insert
        a line break
     * @returns text tab
     */
    function convertNotesToTab(notes: Note[], tuning: LamellophoneTuning, mode: 'letter' | 'number', restSize: number): string;
    /**
     * Converts an array of notes into an HTML tab with colored notes
     * @param notes - notes
     * @param tuning - tuning
     * @param mode - mode
     * @param restSize - number of seconds for a gap between chords to insert
        a line break
     * @param colormap - color map function: pitch to color
     * @returns HTML tab
     */
    function convertNotesToHtmlTab(notes: Note[], tuning: LamellophoneTuning, mode: 'letter' | 'number', restSize: number, colormap: (...params: any[]) => any): string;
    /**
     * Converts a number-based tab to note letter format
     * @param numberTab - tab text with number format
     * @param numberLetterMap - maps numbers to letters
     * @returns tab in letter format
     */
    function convertNumbersToLetters(numberTab: string, numberLetterMap: Map<number, string>): string;
    /**
     * Tries to find a transposition s.t. the tuning is able to play all notes.
    If not not possible, return the transposition that requires the least keys to
    be retuned.
     * @param notes - notes
     * @param tuning - tuning
     * @returns {transpose: number, retune: Map}
     */
    function bestTransposition(notes: Note[], tuning: LamellophoneTuning): any;
}

declare module "instruments/Piano" {
    /**
     * Map:keyCount->pitchRange
     * pitchRange is {minPitch:number, maxPitch:number}
     */
    const pianoPitchRange: Map<number, object>;
}

declare module "stringBased/Gotoh" {
    /**
     * Calculates the SIMILARITY for two strings or arrays.
     * Similar to NeedlemanWunsch but O(n^2) instead of O(n^3)
     * IMPORTANT: This metric is not symmetric!
     * @param seqA - a sequence
     * @param seqB - a sequence
     * @param similarityFunction - a function that takes two elements and
     *      returns their similarity score (higher => more similar)
     *      (a:any, b:any):number
     * @param gapPenaltyStart - cost for starting a new gap (negative)
     * @param gapPenaltyExtend - cost for continuing a gap (negative)
     * @returns similarity score
     */
    function gotoh(seqA: string | any[], seqB: string | any[], similarityFunction: (...params: any[]) => any, gapPenaltyStart: number, gapPenaltyExtend: number): number;
    /**
     * Idea: what would the max. similarity value be? the string with itself!
     * So just compare the longer string to itself and use that similarity to
     * normalize
     * @param seqA - a sequence
     * @param seqB - a sequence
     * @param similarityFunction - a function that takes two elements and
     *      returns their similarity score (higher => more similar)
     *      (a:any, b:any):number
     * @param gapPenaltyStart - cost for starting a new gap (negative)
     * @param gapPenaltyExtend - cost for continuing a gap (negative)
     * @returns normalized similarity score
     */
    function normalizedGotoh(seqA: string | any[], seqB: string | any[], similarityFunction: (...params: any[]) => any, gapPenaltyStart: number, gapPenaltyExtend: number): number;
    /**
     * Cost function that simply checks whether two values are equal or not with ===
     * @param a - some value
     * @param b - some value
     * @returns 1 if equal, -1 otherwise
     */
    function matchMissmatchSimilarity(a: any, b: any): number;
    /**
     * Cost function that takes the negative absolute value of the value's
     * difference, assuming that close values are more similar
     * @param a - some value
     * @param b - some value
     * @returns -Math.abs(a - b)
     */
    function differenceSimilarity(a: number, b: number): number;
}

declare module "stringBased" { }

declare module "stringBased/Levenshtein" {
    /**
     * Computes the Levenshtein distance of two strings or arrays.
     * @param a - a string
     * @param b - another string
     * @param normalize - when set to true, the distance will be normalized
     *      to [0, 1], by dividing by the longer string's length
     * @returns Levenshtein distance
     */
    function levenshtein(a: string | any[], b: string | any[], normalize: boolean): number;
    /**
     * Computes the Damerau-Levenshtein distance of two strings or arrays.
     * @param a - a string
     * @param b - another string
     * @param normalize - when set to true, the distance will be normalized
     *      to [0, 1], by dividing by the longer string's length
     * @returns Levenshtein distance
     */
    function damerauLevenshtein(a: string | any[], b: string | any[], normalize: boolean): number;
}

declare module "stringBased/LongestCommonSubsequence" {
    /**
     * Calculates the longest common subsequence.
     * @example
     * const lcs = StringBased.LongestCommonSubsequence.lcs('hello world!', 'world');
     * // world
     * @param a - a string
     * @param b - another string
     * @returns the longest common subsequence
     */
    function lcs(a: string | any[], b: string | any[]): string | any[];
    /**
     * Calculates the *length* of the longest common subsequence.
     * Also works with arrays.
     * @example
     * const lcsLength = StringBased.LongestCommonSubsequence.lcs('hello world!', 'world');
     * // 5
     * @param a - a string
     * @param b - another string
     * @returns the length of longest common subsequence
     */
    function lcsLength(a: string | any[], b: string | any[]): number;
    /**
     * Normalizes the result of lcsLength() by dividing by the longer string's
     * length.
     * @param a - a string
     * @param b - another string
     * @returns normalized length of longest common subsequence
     */
    function normalizedLcsLength(a: string | any[], b: string | any[]): number;
}

declare module "stringBased/NeedlemanWunsch" {
    /**
     * Needleman-Wunsch algorithm
     * @param seq1 - a string
     * @param seq2 - another string
     * @param match_score - score for matching characters
     * @param mismatch_penalty - penalty for mismatching characters
     * @param gap_penalty - penalty for a gap
     */
    class NeedlemanWunsch {
        constructor(seq1: string | any[], seq2: string | any[], match_score?: number, mismatch_penalty: number, gap_penalty: number);
        /**
         * Calculates (intermediate) scores and tracebacks using provided parameters
         */
        calcScoresAndTracebacks(): void;
        /**
         * Finds next alignment locations (children) from a position in scoring matrix
         * @param pos - m- Position in scoring matrix
         * @returns children - Children positions and alignment types
         */
        alignmentChildren(pos: number[]): object[];
        /**
         * Runs through scoring matrix from bottom-right to top-left using traceback values to create all optimal alignments
         * @returns e.g. [{ seq1: '-4321', seq2: '54321' }]
         */
        alignmentTraceback(): object[];
    }
}

declare module "stringBased/SuffixTree" {
    /**
     * SuffixTree for strings or Arrays
     * @param array - string or Array to process
     */
    class SuffixTree {
        constructor(array: string | any[]);
        /**
         * Returns the longest repeated substring
         * @returns longest repeated substring
         */
        getLongestRepeatedSubString(): any[];
        /**
         * Returns a readable string format of this tree
         * @returns string
         */
        toString(): string;
        /**
         * Returns a JSON representation of this tree
         * @returns JSON
         */
        toJson(): string;
    }
    /**
     * TreeNode
     */
    class TreeNode {
        /**
         * @param suf - suffix
         * @returns true if first entry of suf equals the value of a child
         */
        checkNodes(suf: string | any[]): boolean;
        /**
         * @param suf - suffix
         */
        checkLeaves(suf: string | any[]): void;
        /**
         * @param suf - suffix
         */
        addSuffix(suf: string | any[]): void;
        /**
         * Returns the longest repeated substring
         * @returns longest substring
         */
        getLongestRepeatedSubString(): any[];
        /**
         * Readable string representation of this node and its children
         * @param indent - indentation
         * @returns string representation
         */
        toString(indent?: number): string;
    }
}

/**
 * Creates a new Note
 * @param pitch - pitch
 * @param start - start time in seconds
 * @param velocity - velocity
 * @param channel - MIDI channel
 * @param end - end time in seconds
 * @param string - guitar string
 * @param fret - guitar fret
 */
declare class GuitarNote extends Note {
    constructor(pitch: number, start: number, velocity?: number, channel: number, end: number, string: number, fret: number);
    /**
     * Creates a GuitarNote object from an object via destructuring
     * @param object - object with at least {pitch}
     *  {
     *      pitch: number|string    e.g. 12 or C#4
     *      start: number           start time in seconds
     *      end: number             end time in seconds
     *      velocity: number        MIDI velocity
     *      channel: number         MIDI channel
     *      string: number          guitar string
     *      fret: number            guitar fret
     *  }
     * @returns new note
     */
    static from(object: any): GuitarNote;
    /**
     * Converts a Note to a GuitarNote
     * @param note - note
     * @param string - string
     * @param fret - fret
     * @returns guitar note
     */
    static fromNote(note: Note, string: number, fret: number): GuitarNote;
    /**
     * Simplifies the GuitarNote to a Note
     * @returns note
     */
    toNote(): Note;
    /**
     * Returns a copy of the Note object
     * @returns new note
     */
    clone(): GuitarNote;
    /**
     * Returns true if this note and otherNote have equal attributes.
     * @param otherNote - another GuitarNote
     * @returns true if equal
     */
    equals(otherNote: GuitarNote): boolean;
    /**
     * Human-readable string representation of this GuitarNote
     * @param short - if true, attribute names will be shortened
     * @returns string representation
     */
    toString(short: boolean): string;
    /**
     * Returns the duration of this note in seconds
     * @returns note duration
     */
    getDuration(): number;
    /**
     * Returns the note's name and octave, e.g. 'C#3'
     * @returns note name as string
     */
    getName(): string;
    /**
     * Returns the note's name WITHOUT the octave, e.g. 'C#'
     * @returns note name as string
     */
    getLetter(): string;
    /**
     * Returns the note's octave
     * @returns the note's octave
     */
    getOctave(): number;
    /**
     * Returns a new Note where start and end are multiplied by factor
     * @param addedSeconds - seconds to be added to start and end
     * @returns new note
     */
    shiftTime(addedSeconds: number): Note;
    /**
     * Returns a new Note where start and end are multiplied by factor
     * @param factor - factor to scale start and end with
     * @returns new note
     */
    scaleTime(factor: number): Note;
    /**
     * Returns true, if this Note and otherNote overlap in time.
     * @param otherNote - another Note
     * @returns true if they overlap
     */
    overlapsInTime(otherNote: Note): boolean;
    /**
     * Returns the amount of seconds this Note and otherNote overlap in time.
     * @param otherNote - another Note
     * @returns seconds of overlap
     */
    overlapInSeconds(otherNote: Note): number;
}

/**
 * Do not use this constructor, but the static methods MusicPiece.fromMidi
and MusicPiece.fromMusicXml instead.
 * @param name - name (e.g. file name or piece name)
 * @param tempos - tempos
 * @param timeSignatures - time signatures
 * @param keySignatures - key signatures
 * @param measureTimes - time in seconds for each measure line
 * @param tracks - tracks
 */
declare class MusicPiece {
    constructor(name: string, tempos: TempoDefinition[], timeSignatures: TimeSignature[], keySignatures: KeySignature[], measureTimes: number[], tracks: Track[]);
    /**
     * Creates a MusicPiece object from a MIDI file binary
     * @example
     * <caption>In Node.js</caption>
         const file = path.join(directory, fileName);
         const data = fs.readFileSync(file, 'base64');
         const mp = MusicPiece.fromMidi(fileName, data);
     * @example
     * <caption>In the browser</caption>
         const uintArray = new Uint8Array(midiBinary);
         const MP = MusicPiece.fromMidi(filename, uintArray);
     * @param name - name
     * @param midiFile - MIDI file
     * @returns new MusicPiece
     */
    static fromMidi(name: string, midiFile: ArrayBuffer): MusicPiece;
    /**
     * Creates a MusicPiece object from a MIDI file binary
     * @example
     * <caption>In Node.js</caption>
         const file = path.join(directory, fileName);
         const data = fs.readFileSync(file);
         const mp = MusicPiece.fromMidi(fileName, data);
     * @example
     * <caption>In the browser</caption>
         const uintArray = new Uint8Array(midiBinary);
         const MP = MusicPiece.fromMidi(filename, uintArray);
     * @param name - name
     * @param midiFile - MIDI file
     * @returns new MusicPiece
     */
    static fromMidi2(name: string, midiFile: ArrayBuffer): MusicPiece;
    /**
     * Creates a MusicPiece object from a MusicXML string
     * @example
     * Parsing a MusicPiece in Node.js
       const jsdom = require('jsdom');
       const xmlFile = fs.readFileSync('My Song.musicxml');
       const dom = new jsdom.JSDOM(xmlFile);
       const xmlDocument = dom.window.document;
       const mp = musicvislib.MusicPiece.fromMusicXml('My Song', xmlDocument);
     * @param name - name
     * @param xmlFile - MusicXML file content as string or object
         If it is an object, it must behave like a DOM, e.g. provide methods
         such as .querySelectorAll()
     * @returns new MusicPiece
     */
    static fromMusicXml(name: string, xmlFile: string | any): MusicPiece;
    /**
     * Allows to get a MusicPiece from JSON after doing JSON.stringify()
     * @example
     * const jsonString = mp.toJson();
         const recovered = MusicPiece.fromJson(jsonString);
     * @param json - JSON
     * @returns new MusicPiece
     */
    static fromJson(json: string | JSON): MusicPiece;
    /**
     * Returns a JSON-serialized representation
     * @example
     * const jsonString = mp.toJson();
         const recovered = MusicPiece.fromJson(jsonString);
     * @param pretty - true for readable (prettified) JSON
     * @returns JSON as string
     */
    toJson(pretty: boolean): string;
    /**
     * Returns an array with all notes from all tracks.
     * @param sortByTime - true: sort notes by time
     * @returns all notes of this piece
     */
    getAllNotes(sortByTime: boolean): Note[];
    /**
     * Returns an array with notes from the specified tracks.
     * @param indices - either 'all', a number, or an
         Array with numbers
     * @param sortByTime - true: sort notes by time (not needed for a
         single track)
     * @returns Array with all notes from the specified tracks
     */
    getNotesFromTracks(indices?: 'all' | number | number[], sortByTime: boolean): Note[];
    /**
     * Transposes all or only the specified tracks by the specified number of
    (semitone) steps.
    Will return a new MusicPiece instance.
    Note pitches will be clipped to [0, 127].
     * @param steps - number of semitones to transpose (can be negative)
     * @param tracks - tracks to transpose
     * @returns a new, transposed MusicPiece
     */
    transpose(steps: number, tracks?: 'all' | number | number[]): MusicPiece;
}

/**
 * Simplifies each object in an array by copying only some keys and their values
 * @param objectArray - array with objects
 * @param keys - keys to copy
 */
declare function simplify(objectArray: object[], keys: string[]): void;

/**
 * Given a file name (without extension), this function will read a .mid and a
.musicxml file and parse both to a MusicPiece before returning those.
 * @param fileBaseName - file name without extension
 * @returns two MusicPiece objects
 */
declare function getMusicPiecesFromBothFormats(fileBaseName: string): any;

/**
 * Creates a new Note. Note.from() is preferred over using the constructor.
 * @param pitch - pitch
 * @param start - start time in seconds
 * @param velocity - velocity
 * @param channel - MIDI channel
 * @param end - end time in seconds
 */
declare class Note {
    constructor(pitch: number, start: number, velocity?: number, channel: number, end: number);
    /**
     * Creates a Note object from an object via destructuring.
    Use either 'end' or 'duration', if both are specified, end will be used.
     * @example
     * <caption>Using end</caption>
     const n = Note.from({
         pitch: 'C#4',     // e.g. 12 or C#4
         start: 0.5,       // start time in seconds
         end: 1.5,         // end time in seconds
         velocity: 127,    // MIDI velocity
         channel: 0,       // MIDI channel
     });
     * @example
     * <caption>Using duration</caption>
     const n = Note.from({
         pitch: 'C#4',
         start: 0.5,
         duration: 1.2,
     });
     * @param object - object with at least {pitch}
     * @param object.pitch - e.G. 12 or C#4
     * @param object.start - start time in seconds
     * @param object.end - end time in seconds
     * @param object.duration - duration in seconds
     * @param object.velocity - MIDI velocity
     * @param object.channel - MIDI channel
     * @returns new note
     */
    static from(object: {
        pitch: number | string;
        start: number;
        end: number;
        duration: number;
        velocity: number;
        channel: number;
    }): Note;
    /**
     * Returns a copy of the Note object
     * @returns new note
     */
    clone(): Note;
    /**
     * Returns the duration of this note in seconds
     * @returns note duration
     */
    getDuration(): number;
    /**
     * Returns the note's name and octave, e.g. 'C#3'
     * @returns note name as string
     */
    getName(): string;
    /**
     * Returns the note's name WITHOUT the octave, e.g. 'C#'
     * @returns note name as string
     */
    getLetter(): string;
    /**
     * Returns the note's octave
     * @returns the note's octave
     */
    getOctave(): number;
    /**
     * Returns a new Note where start and end are multiplied by factor
     * @param addedSeconds - seconds to be added to start and end
     * @returns new note
     */
    shiftTime(addedSeconds: number): Note;
    /**
     * Returns a new Note where start and end are multiplied by factor
     * @param factor - factor to scale start and end with
     * @returns new note
     */
    scaleTime(factor: number): Note;
    /**
     * Returns true, if this Note and otherNote overlap in time.
     * @param otherNote - another Note
     * @returns true if they overlap
     */
    overlapsInTime(otherNote: Note): boolean;
    /**
     * Returns the amount of seconds this Note and otherNote overlap in time.
     * @param otherNote - another Note
     * @returns seconds of overlap
     */
    overlapInSeconds(otherNote: Note): number;
    /**
     * Returns true if this note and otherNote have equal attributes.
     * @param otherNote - another Note
     * @returns true if equal
     */
    equals(otherNote: Note): boolean;
    /**
     * Human-readable string representation of this Note
     * @param short - if true, attribute names will be shortened
     * @returns string representation
     */
    toString(short: boolean): string;
}

/**
 * Creates a new NoteArray,
will make a copy of the passed array and cast all notes
 * @example
 * const notes = [
      // Some Note objects
  ];
  const noteArr = new NoteArray(notes)
      // Add more notes (all notes will be sorted by time by default after this)
      .addNotes([])
      // Scale all note's sart and end time to make a track slower or faster
      .scaleTime(0.5)
      // Do more ...
      // This class also mirrors many functions from the Array class
      .sort(sortFunction).filter(filterFunction).map(mapFunction).slice(0, 20)

  // Get Note objects back in a simple Array
  const transformedNotes = noteArr.getNotes();
  // [Note, Note, Note, ...]

  // Or use an iterator
  for (const note of noteArr) {
      console.log(note);
  }
 * @param notes - notes, default: []
 */
declare class NoteArray {
    constructor(notes: Note[]);
    /**
     * Returns a simple array with all Note objects.
     * @example
     * <caption>Getting notes as simple Note[]</caption>
         const na = new NoteArray(someNotes);
         const notes = na.getNotes();
     * @example
     * <caption>Using an iterator instead</caption>
         const na = new NoteArray(someNotes);
         for (const note of na) {
             console.log(note);
         }
         // Or copy all Notes to an array with
         const array = [...na];
     * @returns array with Note objects
     */
    getNotes(): Note[];
    /**
     * Appends notes to this NoteArray
     * @param notes - notes
     * @param sort - iff ture, sorts notes by start timeafter adding
         the new ones (default:true)
     * @returns itself
     */
    addNotes(notes: Note[], sort?: boolean): NoteArray;
    /**
     * Adds the notes from another NoteArray to this NoteArray
    IMPORTANT: this does not change the notes or sort them!
    Take a look at NoteArray.append() if you want to extend
    a track at its end.
     * @param noteArray - another NoteArray
     * @returns itself
     */
    concat(noteArray: NoteArray): NoteArray;
    /**
     * Appends notes to the end of this NoteArray, after shifting them by its
    duration. Set gap to something != 0 to create a gap or overlap.
     * @param noteArray - another NoteArray
     * @param gap - in seconds between the two parts
     * @returns itself
     */
    append(noteArray: NoteArray, gap: number): NoteArray;
    /**
     * Repeats the notes of this array by concatenating a time-shifted copy
     * @param times - number of times to repeat it
     * @returns a new NoteArray with the repeated note sequence
     */
    repeat(times: number): NoteArray;
    /**
     * Returns the number of Note objects in this NoteArray
     * @returns note count
     */
    length(): number;
    /**
     * Returns the start time of the earliest note in this NoteArray
     * @returns start time
     */
    getStartTime(): number;
    /**
     * Returns the duration of this note array in seconds from 0 to the end of
    the latest note.
     * @returns duration
     */
    getDuration(): number;
    /**
     * Scales the time of each note by factor
     * @param factor - factor
     * @returns itself
     */
    scaleTime(factor: number): NoteArray;
    /**
     * Adds the speicifed number of seconds to each note
     * @param addedSeconds - time to add in seconds
     * @returns itself
     */
    shiftTime(addedSeconds: number): NoteArray;
    /**
     * Moves all notes s.t. the first starts at <start>
    Will sort the notes by start time.
     * @param startTime - the new start time for the earliest note
     * @returns itself
     */
    shiftToStartAt(startTime: number): NoteArray;
    /**
     * Similar to Array.forEach
     * @param func - a function
     * @returns this
     */
    forEach(func: (...params: any[]) => any): NoteArray;
    /**
     * Sorts the notes
     * @param sortFunction - sort function, e.g. (a, b)=>a.start-b.start
     * @returns itself
     */
    sort(sortFunction: (...params: any[]) => any): NoteArray;
    /**
     * Sorts the notes by start time
     * @returns itself
     */
    sortByTime(): NoteArray;
    /**
     * Maps the notes using some mapping function
     * @param mapFunction - mapping function with same signature as
         Array.map()
     * @returns itself
     */
    map(mapFunction: (...params: any[]) => any): NoteArray;
    /**
     * Slices the notes by index, like Array.slice()
     * @param start - start index
     * @param end - end index
     * @returns itself
     */
    slice(start: number, end: number): NoteArray;
    /**
     * Slices the notes by time.
    The modes 'end' and 'contained' will remove all notes with end === null!
    Notes will not be changed, e.g. start time will remain the same.
     * @param startTime - start of the filter range in seconds
     * @param endTime - end of the filter range in seconds (exclusive)
     * @param [mode = contained] - controls which note time to consider,
         one of:
         - start: note.start must be inside range
         - end: note.end must be inside range
         - contained: BOTH note.start and note.end must be inside range
         - touched: EITHER start or end (or both) must be inside range)
         - touched-included: like touched, but also includes notes where
             neither start nor end inside range, but range is completely
             inside the note
         (contained is default)
     * @returns itself
     */
    sliceTime(startTime: number, endTime: number, mode?: string): NoteArray;
    /**
     * Slices this NoteArray into slices by the given times. Will not return
    NoteArrays but simple Note[][], where each item contains all notes of one
    time slice. Do not include 0, it will be assumed as first time to slice.
    To make sure notes are not contained twice in different slices use the
    mode 'start'.
     * @example
     * // Slice into 1 second slices
         const slices = noteArray.sliceAtTimes([1, 2, 3], 'start)
     * @param times - points of time at which to slice (in seconds)
     * @param mode - see NoteArray.sliceTime()
     * @returns time slices
     */
    sliceAtTimes(times: number[], mode: string): Note[][];
    /**
     * Segments the NoteArray into smaller ones at times where no note occurs
    for a specified amount of time.
    This method is useful for segmenting a recording session into separate
    songs, riffs, licks, ...
     * @param gapDuration - duration of seconds for a gap to be used as
         segmenting time
     * @param mode - gaps can either be considered as
         the maximum time between two note's starts or the end of the first
         and the start of the second note
     * @returns segments
     */
    segmentAtGaps(gapDuration: number, mode: 'start-start' | 'end-start'): Note[][];
    /**
     * Segments the NoteArray into Arrays of Notes at given indices
     * @example
     * <caption>Get notes in partions of 4</caption>
         const noteGroups = myNoteArray.segmentAtIndices([4, 8, 12, 16, 20]);
         // noteGroups = [
         //     Array(4),
         //     Array(4),
         //     Array(4),
         // ]
     * @param indices - indices
     * @returns segments
     */
    segmentAtIndices(indices: number[]): Note[][];
    /**
     * Filters the NoteArray like you would filter via Array.filter().
     * @example
     * // Only keep notes longer than 1 second
         const filtered = noteArray.filter(note=>note.getDuration()>1);
     * @param filterFunction - filter function, same signature as
         Array.filter()
     * @returns itself
     */
    filter(filterFunction: (...params: any[]) => any): NoteArray;
    /**
     * Filters by pitch, keeping only pitches specified in <pitches>
     * @param pitches - array or Set of pitches to keep
     * @returns itself
     */
    filterPitches(pitches: number[] | Set<number>): NoteArray;
    /**
     * Transposes each note by <steps> semitones, will clip pitches to [0, 127]
     * @param steps - number of semitones to transpose, can be negative
     * @returns itself
     */
    transpose(steps: number): NoteArray;
    /**
     * Will set the octave of all notes to -1.
    This might cause two notes to exist at the same time and pitch!
     * @returns itself
     */
    removeOctaves(): NoteArray;
    /**
     * Reverses the note array, such that it can be played backwards.
     * @returns itself
     */
    reverse(): NoteArray;
    /**
     * Returns true if this NoteArray and otherNoteArray have equal attributes.
     * @param otherNoteArray - another NoteArray
     * @returns true if equal
     */
    equals(otherNoteArray: NoteArray): boolean;
    /**
     * Deep clone, all contained notes are cloned as well.
     * @returns clone
     */
    clone(): NoteArray;
}

/**
 * Class that allows to represent pitch-bends from a MIDI file
 * @param pitch - pitch
 * @param start - start time in seconds
 * @param velocity - velocity
 * @param channel - MIDI channel
 * @param end - end time in seconds
 */
declare class PitchBend {
    constructor(pitch: number, start: number, velocity?: number, channel: number, end: number);
    /**
     * Creates a GuitarNote object from an object via destructuring
     * @param object - object with at least {pitch}
     * @returns new note
     */
    static from(object: any): PitchBend;
    /**
     * Converts a Note to a GuitarNote
     * @param note - note
     * @returns guitar note
     */
    static fromNote(note: Note): PitchBend;
    /**
     * Returns a copy of the Note object
     * @returns new note
     */
    clone(): PitchBend;
    /**
     * Returns true if this note and otherNote have equal attributes.
     * @param otherNote - another GuitarNote
     * @returns true if equal
     */
    equals(otherNote: PitchBend): boolean;
}

/**
 * Stores a sequence of pitches and provides some methods to simplify and
 * manipulate it.
 * @param pitches - pitches
 */
declare class PitchSequence {
    constructor(pitches: number[]);
    /**
     * Creates a pitch sequence from an array of Notes
     * @param notes - notes
     * @returns pitch sequence
     */
    static fromNotes(notes: Note[]): PitchSequence;
    /**
     * @param string - a string of Unicode characters
     * @returns pitch sequence
     */
    static fromCharString(string: string): PitchSequence;
    /**
     * @returns pitches
     */
    getPitches(): number[];
    /**
     * @returns number of pitches
     */
    length(): number;
    /**
     * Turns pitch sequence into a string by turning each  pitch into a character
     * (based on Unicode index)
     * @returns string representation of note pitches
     */
    toCharString(): string;
    /**
     * @returns a string with the notes' names
     */
    toNoteNameString(): string;
    /**
     * Reverses the order of pitches in this PitchSequence
     * @returns this
     */
    reverse(): PitchSequence;
    /**
     * Takes a sequence of MIDI pitches and nomralizes them to be in [0, 11]
     * @returns this
     */
    removeOctaves(): PitchSequence;
    /**
     * Transforms note pitches to intervals, i.e. diffrences between to subsequent
     * notes: C, C#, C, D => 1, -1, 2
     * @returns intervals
     */
    toIntervals(): number[];
    /**
     * @returns clone
     */
    clone(): PitchSequence;
    /**
     * Returns true if this NoteArray and otherNoteArray have equal attributes.
     * @param otherPitchSequence - another NoteArray
     * @returns true if equal
     */
    equals(otherPitchSequence: NoteArray): boolean;
}

/**
 * Creates a new Recording
 * @param name - name if the song
 * @param date - date of the recording
 * @param notes - array of Note objects
 * @param [speed = 1] - relative speed compared to ground truth,
     e.g. 0.5 for half as fast
 * @param [selectedTrack = 0] - track number of the ground truth to which
     this recording belongs
 * @param [timeSelection = null] - time selection of the ground
     truth to which this recording belongs, or null if full duration
 * @param [comment = ''] - a free-text comment for the user to annotate
     the recording
 */
declare class Recording {
    constructor(name: string, date: Date, notes: Note[], speed?: number, selectedTrack?: number, timeSelection?: number[] | null, comment?: string);
    /**
     * Returns a copy of the Note object
     * @returns new recording
     */
    clone(): Recording;
    /**
     * Returns true if this Recording and otherRecording have equal attributes.
     * @param otherRecording - another Recording
     * @returns true if equal
     */
    equals(otherRecording: Recording): boolean;
    /**
     * Turns the recoring into a simple object with the same properties
     * @returns simple object representation of the recording
     */
    toSimpleObject(): any;
    /**
     * Creates a Note object from an object via destructuring
     * @param object - object with at least {name, date, notes, speed}
     * @returns new note
     */
    static from(object: any): Recording;
}

declare module "utils/ArrayUtils" {
    /**
     * Shallow compares two arrays
     * @param a - an array
     * @param b - another array
     * @returns true iff equal
     */
    function arrayShallowEquals(a: any[], b: any[]): boolean;
    /**
     * Checks if two arrays contain the same elements,
    ignoring their ordering in each array.
     * @param a - an array
     * @param b - another array
     * @param checkLength - also checks if arrays have the same length
     * @returns true iff arrays contain same elements
     */
    function arrayHasSameElements(a: any[], b: any[], checkLength: boolean): boolean;
    /**
     * Jaccard index calulates the similarity of the sets as the size of the set
    interaction divided by the size of the set union:
    jackard_index = |intersection| / |union|
     * @param set1 - set 1
     * @param set2 - set 2
     * @returns similarity in [0, 1]
     */
    function jaccardIndex(set1: number[], set2: number[]): number;
    /**
     * Kendall Tau distance
     * @param ranking1 - a ranking, i.e. for each entry the rank
     * @param ranking2 - a ranking, i.e. for each entry the rank
     * @param [normalize = true] - normalize to [0, 1]?
     * @returns Kendall tau distance
     */
    function kendallTau(ranking1: number[], ranking2: number[], normalize?: boolean): number;
    /**
     * Removes duplicates from an Array by converting to a Set and back
     * @param array - an array
     * @returns array without duplicates
     */
    function removeDuplicates(array: any[]): any[];
    /**
     * Checks whether the array a contains the array b, i.e. whether the first
    b.length elements are the same.
     * @param a - an array
     * @param b - a shorter array
     * @returns true iff a contains b
     */
    function arrayContainsArray(a: any[], b: any[]): boolean;
    /**
     * Returns the maximum numerical value from an array of arrays
     * @param matrix - matrix
     * @returns maximum value
     */
    function getMatrixMax(matrix: number[][]): number;
    /**
     * Stringifies a 2D array / matrix for logging onto the console.
     * @param matrix - the matrix
     * @param colSeparator - column separator
     * @param rowSeparator - row separator
     * @param formatter - formatting for each element
     * @returns stringified matrix
     */
    function formatMatrix(matrix: any[][], colSeparator: string, rowSeparator: string, formatter: (...params: any[]) => any): string;
    /**
     * Returns the value in array that is closest to value.
    Array MUST be sorted ascending.
     * @param array - array
     * @param value - value
     * @param accessor - accessor
     * @returns value in array closest to value
     */
    function binarySearch(array: any[], value: any, accessor: (...params: any[]) => any): any;
}

declare module "utils/BlobUtils" {
    /**
     * Converts a Blob to a base64 string
     * @param blob - Blob
     * @returns base64 string
     */
    function blobToBase64(blob: Blob): Promise<string>;
    /**
     * Extracts the file extension from a Blob, so it can be saved as a file with
     * an appropriate extension.
     * @param blob - Blob
     * @returns file extension
     */
    function blobToFileExtension(blob: Blob): string;
}

declare module "utils/FormattingUtils" {
    /**
     * Formats a time in seconds to <minutes>:<seconds>.<milliseconds>
     * @param seconds - in seconds
     * @param includeMillis - include milli seconds in string?
     * @returns 0-padded time string <minutes>:<seconds>.<milliseconds>
     */
    function formatTime(seconds: number | null, includeMillis: boolean): string;
    /**
     * Formats a Date to a string with format
     *      YYYY-mm-DDTHH:MM:SS
     * or when replaceT == true
     *      YYYY-mm-DD HH:MM:SS
     * @param date - date
     * @param replaceT - replace the 'T'?
     * @param keepMillis - keep milliseconds?
     * @returns formatted date
     */
    function formatDate(date: Date, replaceT: boolean, keepMillis: boolean): string;
    /**
     * Formats the song title (e.g. remove file extension and shorten)
     * @param title - song title
     * @param maxLength - shorten to this length
     * @returns formatted song title
     */
    function formatSongTitle(title: string, maxLength: number): string;
}

declare module "utils" { }

declare module "utils/LocalStorageUtils" {
    /**
     * Stringifies an object and stores it in the localStorage
     * @param key - key
     * @param object - JSON compatible object
     */
    function storeObjectInLocalStorage(key: string, object: any): void;
    /**
     * Retrieves a stringified object from the localStorage and parses it.
     * @param key - key
     * @returns object or null of not possible
     */
    function getObjectFromLocalStorage(key: string): any | null;
}

declare module "utils/MathUtils" {
    /**
     * Generates a random float in [min, max)
     * @param min - minimum
     * @param max - maximum
     * @returns random float
     */
    function randFloat(min: number, max: number): number;
    /**
     * Returns a random element from the given array.
     * @param array - an array
     * @returns random element from the array
     */
    function choose(array: any[]): any;
    /**
     * Shortcut for Math.max(minValue, Math.min(maxValue, value))
     * @param value - value
     * @param minValue - lower limit
     * @param maxValue - upper limit
     * @returns clipped number
     */
    function clipValue(value: number, minValue: number, maxValue: number): number;
    /**
     * Rounds a number to a given number of decimals
     * @param number - a number
     * @param n - number of digits
     * @returns rounded number
     */
    function roundToNDecimals(number: number, n: number): number;
    /**
     * Swaps two numbers if the first is larger than the second
     * @param x - a number
     * @param y - a number
     * @returns array with the smaller number first
     */
    function swapSoSmallerFirst(x: number, y: number): number[];
    /**
     * Counts the number of 1s in a binary number, e.g 100101 has 3 1s
     * @param integer - an integer number
     * @returns number of 1s
     */
    function countOnesOfBinary(integer: number): number;
    /**
     * Local maxima are found by looking at entries that are higher than their left
     * and right neighbor, or higher than their only neighbor if they are at the
     * boundary.
     * IMPORTANT: does not find plateaus
     * @param array - array
     * @returns array with indices of maxima
     */
    function findLocalMaxima(array: number[]): number[];
}

declare module "utils/MiscUtils" {
    /**
     * Converts beats per minute to seconds per beat
     * @param bpm - tempo in beats per minute
     * @returns seconds per beat
     */
    function bpmToSecondsPerBeat(bpm: number): number;
    /**
     * Clones a map where the values are flat objects,
    i.e. values do not contain objects themselfes.
     * @param map - a map with object values
     * @returns a copy of the map with copies of the value objects
     */
    function deepCloneFlatObjectMap(map: Map): Map;
    /**
     * Groups the Notes from multiple tracks
     * @param tracks - array of arrays of Note objects
     * @returns grouping
     */
    function groupNotesByPitch(tracks: Note[][]): Map;
    /**
     * Reverses a given string.
     * @param s - string
     * @returns reversed string
     */
    function reverseString(s: string): string;
    /**
     * Given some notes and a target note, finds
    the note that has its start time closest to
    the one of targetNote
     * @param notes - notes
     * @param targetNote - target note
     * @returns closest note to targetNote
     */
    function findNearest(notes: Note[], targetNote: Note): Note;
}

declare module "utils/MusicUtils" {
    /**
     * Converts beats per minute to seconds per beat
     * @param bpm - tempo in beats per minute
     * @returns seconds per beat
     */
    function bpmToSecondsPerBeat(bpm: number): number;
    /**
     * Turns a chord into an integer that uniquely describes the occuring chroma.
    If the same chroma occurs twice this will not make a difference
    (e.g. [C4, E4, G4, C5] will equal [C4, E4, G4])
    
    How it works:
    Chord has C, E, and G
    x = 000010010001
            G  E   C
     * @param notes - notes
     * @returns an integer that uniquely identifies this chord's chroma
     */
    function chordToInteger(notes: Note[]): number;
    /**
     * Takes two chord integer representations from chordToInteger() and computes
    the Jaccard index
     * @param chord1 - chord as integer representation
     * @param chord2 - chord as integer representation
     * @returns Jackard index, from 0 for different to 1 for identical
     */
    function chordIntegerJaccardIndex(chord1: number, chord2: number): number;
    /**
     * Estimates the note type (whole, quarter, ...) and number of dots for dotted
    notes
     * @param duration - duration of a note
     * @param bpm - tempo of the piece in bpm
     * @returns note type and number of dots
         e.g. { "dots": 0, "duration": 1, "type": 1 } for a whole note
         e.g. { "dots": 1, "duration": 1.5, "type": 1 } for a dotted whole note
     */
    function noteDurationToNoteType(duration: number, bpm: number): any;
    /**
     * Circle of 5ths as
    [midiNr, noteAsSharp, noteAsFlat, numberOfSharps, numberOfFlats]
     */
    const CIRCLE_OF_5THS: any[][];
    /**
     * Maps number of semitones to interval name
    m - minor
    M - major
    P - perfect
    aug - augmented
     */
    const INTERVALS: Map<number, string>;
}

declare module "utils/NoteColorUtils" {
    /**
     * Maps each note to a color
     * Colors from https://www.svpwiki.com/music+note+or+sound+colors
     * Order is C, C#, ... B
     */
    const noteColormap: string[];
    /**
     * Colorblind save colors from
     * Malandrino et al. - Visualization and Music Harmony: Design, Implementation,
     * and Evaluation https://ieeexplore.ieee.org/abstract/document/8564210
     * Order is C, C#, ... B
     */
    const noteColormapAccessible: string[];
    /**
     * Gradient color map from black to steelblue
     */
    const noteColormapGradientArray: string[];
    /**
     * Returns the note color depending on the given pitch.
     * (Simplifies note color lookup by looking up the color for pitch%12.)
     * @param pitch - MIDI pitch in [0, 127]
     * @param colormap - one of 'default', 'accessible', 'gradient'
     * @returns color code
     */
    function noteColorFromPitch(pitch: number, colormap: string): string;
}

declare module "utils/RecordingsUtils" {
    /**
     * Filters notes of a recording to remove noise from the MIDI device or pickup
     * @param recording - a recording
     * @param velocityThreshold - notes with velocity < velocityThreshold
         are removed
     * @param durationThreshold - notes with duration < velocityThreshold
         are removed (value in seconds)
     * @returns clone of the recording with filtered notes
     */
    function filterRecordingNoise(recording: Recording, velocityThreshold: number, durationThreshold: number): Recording;
    /**
     * Removes notes from a recordings which are outside the range of the ground
    truth and therefore likely noise.
    Looks up the pitch range from the track of the GT that the recording was made
    for.
     * @param recordings - recordings
     * @param groundTruth - ground truth
     * @returns filtered recordings
     */
    function clipRecordingsPitchesToGtRange(recordings: Recording[], groundTruth: Note[][]): Recording[];
    /**
     * Removes notes from a recordings which are outside the fretboard range of the
    ground truth and therefore likely noise.
    Looks up the fretboard position range from the track of the GT that the
    recording was made for.
     * @param recordings - recordings
     * @param groundTruth - ground truth
     * @param [mode = exact] - mode for which fretboard positions to
         include: exact will only keep notes that have positions that occur in
         the GT, area will get a rectangular area of the fretboard that contains
         all GT positions and fill filter on that.
     * @returns filtered recordings
     */
    function clipRecordingsPitchesToGtFretboardRange(recordings: Recording[], groundTruth: Note[][], mode?: 'exact' | 'area'): Recording[];
    /**
     * Aligns notes to a rhythmic pattern
     * @param notes - notes
     * @param bpm - e.g. 120 for tempo 120
     * @param timeDivision - e.g. 16 for 16th note steps
     * @returns aligned notes
     */
    function alignNotesToBpm(notes: Note[], bpm: number, timeDivision: number): Note[];
    /**
     * Calculates a heatmap either pitch- or channel-wise.
    Pitch-time heatmap:
    Calculates a heatmap of multiple recordings, to see the note density in the
    pitch-time-space.
    Channel-time heatmap:
    Calculates a heatmap of multiple recordings, to see the note density in the
    channel-time-space. Channel could be a guitar string or left and right hand
    for example.
     * @param recNotes - recordings
     * @param nRecs - number of recordings
     * @param binSize - time bin size in milliseconds
     * @param attribute - 'pitch' | 'channel'
     * @returns pitch->heatmap; heatmap is number[] for all time slices
     */
    function recordingsHeatmap(recNotes: Note[], nRecs: number, binSize: number, attribute: string): Map;
    /**
     * 'Averages' multiple recordings of the same piece to get an approximation of
    the ground truth.
     * @param heatmapByPitch - haetmap from recordingsHeatmap()
     * @param binSize - size of time bins in milliseconds
     * @param threshold - note is regarded as true when this ratio of
         recordings has a note there
     * @returns approximated ground truth notes
     */
    function averageRecordings(heatmapByPitch: Map, binSize: number, threshold: number): Note[];
    /**
     * Extracts a probable ground truth from multiple recordings. Uses one KDE for
    each note starts and ends, detects maxima in the KDE and thresholds them.
    Then uses alternating start end end candidates to create notes.
     * @param recNotes - recordings notes
     * @param bandwidth - kernel bandwidth
     * @param ticksPerSecond - number of ticks per second
     * @param threshold - threshold
     * @returns new notes
     */
    function averageRecordings2(recNotes: Note[], bandwidth: number, ticksPerSecond: number, threshold: number): Note[];
    /**
     * Returns a Map: pitch->differenceMap, differenceMap is an Array with time bins
    and each bin is either
         0 (none, neither GT nor rec have a note here)
         1 (missing, only GT has a note here)
         2 (additional, only rec has a note here)
         3 (both, both have a note here)
     * @param gtNotes - ground truth notes
     * @param recNotes - recrodings notes
     * @param binSize - size of a time bin
     * @returns pitch->differenceMap; differenceMap is number[] for all time slices
     */
    function differenceMap(gtNotes: Note[], recNotes: Note[], binSize: number): Map;
    /**
     * Computes the 'area' of error from a differenceMap normalized by total area.
    The area is simply the number of bins with each value, total area is max.
    number of bins in all pitches * the number of pitches.
     * @param differenceMap - differenceMap from differenceMap()
     * @returns {missing, additional, correct} area ratio
     */
    function differenceMapErrorAreas(differenceMap: Map): any;
}

declare module "utils/StatisticsUtils" {
    /**
     * Calculates a 95% confidence interval
     * @param values - values
     * @returns {mean, low, high}
     */
    function confidenceInterval(values: numnber[]): any;
    /**
     * Given an array of Note objects, returns the numbers
     * that are drawn in a box plot (of the Note.start property)
     * @param values - values
     * @returns { q1, q2, q3, r0, r1 }
     */
    function getBoxplotCharacteristics(values: number[]): any;
    /**
     * Returns a kernel desity estimator function.
     * @example
     * // With x being a d3.scaleLinear() scale
     * const kde = kernelDensityEstimator(kernelEpanechnikov(0.2), x.ticks(50));
     * const estimate = kde(data);
     * @param kernel - kernel function
     * @param X - domain
     * @returns kernel density estimator
     */
    function kernelDensityEstimator(kernel: (...params: any[]) => any, X: number[]): (...params: any[]) => any;
    /**
     * Epanechnikov kernel
     * @param k - kernel size
     * @returns kernel function with curried k
     */
    function kernelEpanechnikov(k: number): (...params: any[]) => any;
    /**
     * Gauss kernel
     * @param k - kernel size
     * @returns kernel function with curried k
     */
    function kernelGauss(k: number): (...params: any[]) => any;
}

declare module "utils/WebMidiUtils" {
    /**
     * Allows to ping a MIDI device that loops back to measure latency.
     * The tool loopMIDI does exactly this:
     * @example
     * pingMidiDevice('loopMIDI Port', 10);
     * @param deviceName - name of the MIDI device
     * @param howOften - how many times to ping the device
     */
    function pingMidiDevice(deviceName: string, howOften: number): void;
}

