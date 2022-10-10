## Modules

<dl>
<dt><a href="#module_Alignment">Alignment</a></dt>
<dd></dd>
<dt><a href="#module_DiffAlignment">DiffAlignment</a></dt>
<dd></dd>
<dt><a href="#module_Chords">Chords</a></dt>
<dd></dd>
<dt><a href="#module_comparison/ErrorClassifier">comparison/ErrorClassifier</a></dt>
<dd></dd>
<dt><a href="#module_comparison/Matching">comparison/Matching</a></dt>
<dd></dd>
<dt><a href="#module_comparison/Similarity">comparison/Similarity</a></dt>
<dd></dd>
<dt><a href="#module_comparison/SimilarSections">comparison/SimilarSections</a></dt>
<dd></dd>
<dt><a href="#module_instruments/StringedFingering">instruments/StringedFingering</a></dt>
<dd></dd>
<dt><a href="#module_fileFormats/Midi">fileFormats/Midi</a></dt>
<dd><p>Lookup for many MIDI specifications.</p>
</dd>
<dt><a href="#module_fileFormats/MidiParser">fileFormats/MidiParser</a></dt>
<dd></dd>
<dt><a href="#module_fileFormats/MusicXmlParser">fileFormats/MusicXmlParser</a></dt>
<dd></dd>
<dt><a href="#module_graphics/Canvas">graphics/Canvas</a></dt>
<dd></dd>
<dt><a href="#module_Svg">Svg</a></dt>
<dd></dd>
<dt><a href="#module_musicvis-lib">musicvis-lib</a></dt>
<dd></dd>
<dt><a href="#module_input/AudioRecorder">input/AudioRecorder</a> ⇒ <code>Promise</code></dt>
<dd><p>Allows to record audio blobs.</p>
</dd>
<dt><a href="#module_input/MidiInputManager">input/MidiInputManager</a></dt>
<dd><p>Handles incoming MIDI messages from a MIDI device.</p>
</dd>
<dt><a href="#module_input/MidiRecorder">input/MidiRecorder</a> ⇒ <code>Promise</code></dt>
<dd><p>Records incoming MIDI messages from a MIDI device.</p>
</dd>
<dt><a href="#module_instruments/Drums">instruments/Drums</a></dt>
<dd></dd>
<dt><a href="#module_instruments/Guitar">instruments/Guitar</a></dt>
<dd></dd>
<dt><a href="#module_instruments/Lamellophone">instruments/Lamellophone</a></dt>
<dd></dd>
<dt><a href="#module_instruments/Piano">instruments/Piano</a></dt>
<dd></dd>
<dt><a href="#module_stringBased/Gotoh">stringBased/Gotoh</a></dt>
<dd></dd>
<dt><a href="#module_stringBased">stringBased</a></dt>
<dd></dd>
<dt><a href="#module_stringBased/Levenshtein">stringBased/Levenshtein</a></dt>
<dd></dd>
<dt><a href="#module_stringBased/LongestCommonSubsequence">stringBased/LongestCommonSubsequence</a></dt>
<dd></dd>
<dt><a href="#module_stringBased/NeedlemanWunsch">stringBased/NeedlemanWunsch</a></dt>
<dd></dd>
<dt><a href="#module_stringBased/SuffixTree">stringBased/SuffixTree</a></dt>
<dd></dd>
<dt><a href="#module_utils/ArrayUtils">utils/ArrayUtils</a></dt>
<dd></dd>
<dt><a href="#module_utils/BlobUtils">utils/BlobUtils</a></dt>
<dd></dd>
<dt><a href="#module_utils/FormattingUtils">utils/FormattingUtils</a></dt>
<dd></dd>
<dt><a href="#module_utils">utils</a></dt>
<dd></dd>
<dt><a href="#module_utils/LocalStorageUtils">utils/LocalStorageUtils</a></dt>
<dd></dd>
<dt><a href="#module_utils/MathUtils">utils/MathUtils</a></dt>
<dd></dd>
<dt><a href="#module_utils/MiscUtils">utils/MiscUtils</a></dt>
<dd></dd>
<dt><a href="#module_utils/MusicUtils">utils/MusicUtils</a></dt>
<dd></dd>
<dt><a href="#module_utils/NoteColorUtils">utils/NoteColorUtils</a></dt>
<dd></dd>
<dt><a href="#module_utils/RecordingsUtils">utils/RecordingsUtils</a></dt>
<dd></dd>
<dt><a href="#module_utils/StatisticsUtils">utils/StatisticsUtils</a></dt>
<dd></dd>
<dt><a href="#module_utils/WebMidiUtils">utils/WebMidiUtils</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#GuitarNote">GuitarNote</a> ⇐ <code><a href="#Note">Note</a></code></dt>
<dd><p>Guitar note class that reflects MIDI properties but has
absolute start and end times in seconds and
information on how to play it.</p>
</dd>
<dt><a href="#HarmonicaNote">HarmonicaNote</a> ⇐ <code><a href="#Note">Note</a></code></dt>
<dd><p>Harmonica note class that reflects MIDI properties but has
absolute start and end times in seconds and
information on how to play it.</p>
</dd>
<dt><del><a href="#MusicPiece">MusicPiece</a></del></dt>
<dd><p>Represents a parsed MIDI or MusicXML file in a uniform format.</p>
</dd>
<dt><a href="#Track">Track</a></dt>
<dd><p>Used by MusicPiece, should not be used directly</p>
</dd>
<dt><a href="#TempoDefinition">TempoDefinition</a></dt>
<dd><p>Tempo definition</p>
</dd>
<dt><a href="#TimeSignature">TimeSignature</a></dt>
<dd><p>Time signature definition</p>
</dd>
<dt><a href="#KeySignature">KeySignature</a></dt>
<dd><p>Key signature definition</p>
</dd>
<dt><a href="#Note">Note</a></dt>
<dd><p>Note class that reflects MIDI properties but has
absolute start and end times in seconds.</p>
</dd>
<dt><a href="#NoteArray">NoteArray</a></dt>
<dd><p>This class represents an array of note objects.
It can be used to simplify operations on a track.</p>
</dd>
<dt><a href="#PitchBend">PitchBend</a></dt>
<dd><p>Class that allows to represent pitch-bends from a MIDI file</p>
</dd>
<dt><a href="#PitchSequence">PitchSequence</a></dt>
<dd><p>Stores a sequence of pitches and provides some methods to simplify and
manipulate it.</p>
</dd>
<dt><a href="#Recording">Recording</a></dt>
<dd><p>Class for storing recorded notes alongside meta information.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#drumInstrumentMap">drumInstrumentMap</a> : <code>Map.&lt;string, object&gt;</code></dt>
<dd><p>Maps internal drum names to MusicXML instrument names and note display</p>
</dd>
<dt><a href="#patterns">patterns</a> : <code>Map.&lt;string, object&gt;</code></dt>
<dd><p>Contains patterns for exercises, such as scales</p>
</dd>
<dt><a href="#patterns">patterns</a> : <code>Map.&lt;string, object&gt;</code></dt>
<dd><p>Contains patterns for exercises, such as scales
TODO: find way to automatically compute patterns from scales, get scales from tonaljs</p>
</dd>
<dt><a href="#noteErrorTypes">noteErrorTypes</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#chordErrorTypes">chordErrorTypes</a> : <code>object</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#priorityMatching">priorityMatching(itemsA, itemsB, distanceFunction)</a> ⇒ <code>Map.&lt;number, number&gt;</code></dt>
<dd><p>Idea: Like in hierarchical clustering, take the most similar pair out of the
set of all possible pairs repeatedly, until one array of items is empty.</p>
</dd>
<dt><a href="#errorFromPriorityMatching">errorFromPriorityMatching(gtNotes, recNotes, distanceFunction)</a> ⇒ <code>Map.&lt;Note, number&gt;</code></dt>
<dd><p>First matches GT to rec notes via priorityMatching, then computes the error
for each GT note that has been matched using the same distance function.
The Map will be undefined for GT notes that have not been matched, they can
be considered missing in the recording.</p>
</dd>
<dt><a href="#balancedNoteDistance">balancedNoteDistance(a, b)</a> ⇒ <code>number</code></dt>
<dd><p>Computes a distance (inverse similarity) of two notes, considering pitch,
chroma, start, duration, and channel.</p>
</dd>
<dt><a href="#getMatrixMinPosition">getMatrixMinPosition(matrix)</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Returns the row and colum indices of the minimum value of the given matrix</p>
</dd>
<dt><a href="#generatePattern">generatePattern(patternType, [repeat])</a> ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code></dt>
<dd><p>Takes a baseline pattern and moves it to the correct position on the fretboard</p>
</dd>
<dt><a href="#generateXml">generateXml(name, tempo, timeSig, drumHits)</a> ⇒ <code>string</code></dt>
<dd><p>Generates MusicXML text from a pattern</p>
</dd>
<dt><a href="#generatePattern">generatePattern(patternType, rootNote, [repeat], [alternate])</a> ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code></dt>
<dd><p>Takes a baseline pattern and moves it to the correct position on the fretboard</p>
</dd>
<dt><a href="#generateXml">generateXml(name, tempo, timeSig, positions)</a> ⇒ <code>string</code></dt>
<dd><p>Generates MusicXML text from a pattern</p>
</dd>
<dt><a href="#generatePattern">generatePattern(patternType, [rootNote], [scaleType], [repeat], [alternate])</a> ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code></dt>
<dd><p>Takes a baseline pattern and moves it to the correct position on the fretboard</p>
</dd>
<dt><a href="#repeatPattern">repeatPattern(nRepetitions, pattern, alternate)</a> ⇒ <code>Array</code></dt>
<dd><p>Repeats a pattern with or without alternating direction</p>
</dd>
<dt><a href="#generateXml">generateXml(name, tempo, timeSig, notes)</a> ⇒ <code>string</code></dt>
<dd><p>Generates MusicXML text from a pattern</p>
</dd>
<dt><a href="#getStartTimeErrorPerGtNote">getStartTimeErrorPerGtNote(gtNotes, recNotes)</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Takes the ground truth and a single recording.
Both gtNotes and recNotes must be sorted by note start time ascending.</p>
</dd>
<dt><a href="#getNoteErrors">getNoteErrors(expectedNote, actualNote)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd></dd>
<dt><a href="#getChordErrors">getChordErrors(expectedChord, actualChord)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd></dd>
<dt><a href="#noteCountDifference">noteCountDifference(notesA, notesB)</a> ⇒ <code>number</code></dt>
<dd></dd>
<dt><a href="#durationDifference">durationDifference(notesA, notesB)</a> ⇒ <code>number</code></dt>
<dd></dd>
<dt><a href="#pitchHistogramDistance">pitchHistogramDistance(notesA, notesB)</a> ⇒ <code>number</code></dt>
<dd></dd>
<dt><a href="#timeBinningDistance">timeBinningDistance(notesA, notesB, binSize)</a> ⇒ <code>number</code></dt>
<dd></dd>
<dt><a href="#timeBinningDistance2">timeBinningDistance2(notesA, notesB, binSize)</a> ⇒ <code>number</code></dt>
<dd></dd>
<dt><a href="#notesCount">notesCount(notes)</a> ⇒ <code>number</code></dt>
<dd><p>Computes the number of notes</p>
</dd>
<dt><a href="#duration">duration(notes)</a> ⇒ <code>number</code></dt>
<dd><p>Computes played duration</p>
</dd>
<dt><a href="#notesPerSecond">notesPerSecond(notes)</a> ⇒ <code>number</code></dt>
<dd><p>Computes the number of notes played per second</p>
</dd>
<dt><a href="#notesPerBeat">notesPerBeat(notes, [bpm])</a> ⇒ <code>number</code></dt>
<dd><p>Computes the number of notes played per relative time (beat)</p>
</dd>
<dt><a href="#differentNotesUsed">differentNotesUsed(notes, mode)</a> ⇒ <code>Array.&lt;object&gt;</code></dt>
<dd><p>Computes the number of different notes used in different modi.</p>
<ul>
<li>Pitch: note and octave are considered</li>
<li>Chroma: only note without octave considered, e.g., C4 == C5</li>
<li>Fretboard position: tuple (string, fret) will be compared</li>
</ul>
</dd>
<dt><a href="#ratioNotesInSet">ratioNotesInSet(notes, set)</a> ⇒ <code>number</code></dt>
<dd><p>Computes the ratio of notes that are in the given set.
Can be used for checking how many notes that were played are part of a
musical scale, by passing the notes of this scale as set.</p>
</dd>
<dt><a href="#pitchMeanAndVariance">pitchMeanAndVariance(notes)</a> ⇒ <code>object</code></dt>
<dd><p>Computes the mean and variance of played pitches</p>
</dd>
<dt><a href="#intervalMeanAndVariance">intervalMeanAndVariance(notes)</a> ⇒ <code>object</code></dt>
<dd><p>Computes the mean and variance of played intervals</p>
</dd>
<dt><a href="#dynamicsMeanAndVariance">dynamicsMeanAndVariance(notes)</a> ⇒ <code>object</code></dt>
<dd><p>Computes the mean and variance of played dynamics</p>
</dd>
<dt><a href="#durationMeanAndVariance">durationMeanAndVariance(notes)</a> ⇒ <code>object</code></dt>
<dd><p>Computes the mean and variance of played dynamics</p>
</dd>
<dt><a href="#onsetDiffMeanAndVariance">onsetDiffMeanAndVariance(notes)</a> ⇒ <code>object</code></dt>
<dd><p>Computes the mean and variance of onset (start time) differences between
consecutive notes.</p>
</dd>
<dt><a href="#guitarStringSkips">guitarStringSkips(notes, [skipped])</a> ⇒ <code>number</code></dt>
<dd><p>Computs the ratio of notes for which one string (or more) where skipped
between the one before and the current note.
The <code>skipped</code> parameter set the minimum amount of strings between the two
notes, e.g., going from string 1 to 3 means that one (string 2) was skipped.</p>
</dd>
<dt><a href="#guitarFretSkips">guitarFretSkips(notes, [skipped])</a> ⇒ <code>number</code></dt>
<dd><p>Computs the ratio of notes for which one fret (or more) where skipped between
the one before and the current note.
The <code>skipped</code> parameter set the minimum amount of fret between the two
notes, e.g., going from fret 1 to 3 means that one (fret 2) was skipped.</p>
</dd>
<dt><a href="#harmonySizeDistribution">harmonySizeDistribution(harmonies)</a> ⇒ <code>Array.&lt;object&gt;</code></dt>
<dd><p>Counts how often harmonies of different sizes occur</p>
</dd>
<dt><a href="#harmonySingleToMultiRatio">harmonySingleToMultiRatio(harmonies)</a> ⇒ <code>number</code></dt>
<dd><p>Determines the ratio of single notes to multi-note harmonies</p>
</dd>
<dt><a href="#notesToIntervals">notesToIntervals(notes)</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Computes the pitch intervals between consecutive notes</p>
</dd>
<dt><a href="#notesToOnsetDifferences">notesToOnsetDifferences(notes)</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Computes the start time differences between consecutive notes</p>
</dd>
<dt><a href="#compress">compress(sequence)</a> ⇒ <code>object</code></dt>
<dd><p>Compresses a sequence by detecting immediately repeating subsequences
hierarchically. Optimal result but high performance complexity.</p>
</dd>
<dt><a href="#getImmediateRepetitions">getImmediateRepetitions(sequence)</a> ⇒ <code>Array.&lt;object&gt;</code></dt>
<dd><p>Finds all immediate repetitions in a given sequence.</p>
</dd>
<dt><a href="#decompress">decompress(tree)</a> ⇒ <code>Array</code></dt>
<dd><p>Restores the original array/sequence from the compressed hierarchy.</p>
</dd>
<dt><a href="#summary">summary(tree)</a> ⇒ <code>Array</code></dt>
<dd><p>Returns the summary of a hierachy, leaving out information about repetitions.</p>
</dd>
<dt><a href="#toString">toString(tree, separator)</a> ⇒ <code>string</code></dt>
<dd><p>Formats a compressed hierarchy into a readable string, for example:
&quot;1222333222333&quot; =&gt; &quot;1 (2x (3x 2) (3x 3))&quot;</p>
</dd>
<dt><a href="#compressionRate">compressionRate(compressed)</a> ⇒ <code>number</code></dt>
<dd><p>Calculates the compression rate in [0, 1] for a result of compress().</p>
</dd>
<dt><a href="#getNGrams">getNGrams(string, length)</a> ⇒ <code>Map.&lt;string, number&gt;</code></dt>
<dd><p>Calculates all n-grams with a specified length</p>
</dd>
<dt><a href="#getNGramsForArray">getNGramsForArray(array, length)</a> ⇒ <code>Map.&lt;string, object&gt;</code></dt>
<dd><p>Calculates all n-grams with a specified length</p>
</dd>
<dt><a href="#simplify">simplify(objectArray, keys)</a></dt>
<dd><p>Simplifies each object in an array by copying only some keys and their values</p>
</dd>
<dt><a href="#getMusicPiecesFromBothFormats">getMusicPiecesFromBothFormats(fileBaseName)</a> ⇒ <code>Object</code></dt>
<dd><p>Given a file name (without extension), this function will read a .mid and a
.musicxml file and parse both to a MusicPiece before returning those.</p>
</dd>
<dt><a href="#getColorLightness">getColorLightness(color)</a> ⇒ <code>number</code></dt>
<dd><p>Determines the perceptual lightness of an HTML color</p>
</dd>
<dt><a href="#averageColor">averageColor(colors)</a> ⇒ <code>string</code></dt>
<dd><p>Determines the average of mutliple given colors</p>
</dd>
<dt><a href="#setOpacity">setOpacity(color, [opacity])</a> ⇒ <code>string</code></dt>
<dd><p>Sets a color&#39;s opacity.
Does not support colors in rgba format.</p>
</dd>
</dl>

<a name="module_Alignment"></a>

## Alignment

* [Alignment](#module_Alignment)
    * _static_
        * [.alignNoteArrays(gt, rec)](#module_Alignment.alignNoteArrays) ⇒ [<code>NoteArray</code>](#NoteArray)
        * [.alignNoteArrays2(gt, rec)](#module_Alignment.alignNoteArrays2) ⇒ [<code>NoteArray</code>](#NoteArray)
        * [.alignNoteArrays3(gt, rec)](#module_Alignment.alignNoteArrays3) ⇒ [<code>NoteArray</code>](#NoteArray)
        * [.testAlignment()](#module_Alignment.testAlignment)
        * [.alignmentBenchmark()](#module_Alignment.alignmentBenchmark)
    * _inner_
        * [~alignmentForce(a, b)](#module_Alignment..alignmentForce) ⇒ <code>number</code>

<a name="module_Alignment.alignNoteArrays"></a>

### Alignment.alignNoteArrays(gt, rec) ⇒ [<code>NoteArray</code>](#NoteArray)
Given two NoteArrays, shift the second one in time such that they are aligned

**Kind**: static method of [<code>Alignment</code>](#module_Alignment)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - an aligned copy of b  
**Todo**

- [ ] use https://en.wikipedia.org/wiki/Smith%E2%80%93Waterman_algorithm     to find note alignment, then only use those for force calculation


| Param | Type | Description |
| --- | --- | --- |
| gt | [<code>NoteArray</code>](#NoteArray) | a NoteArray, e.g. the ground truth |
| rec | [<code>NoteArray</code>](#NoteArray) | a NoteArray to align to a |

<a name="module_Alignment.alignNoteArrays2"></a>

### Alignment.alignNoteArrays2(gt, rec) ⇒ [<code>NoteArray</code>](#NoteArray)
Given two NoteArrays, shift the second one in time such that they are aligned

**Kind**: static method of [<code>Alignment</code>](#module_Alignment)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - an aligned copy of b  

| Param | Type | Description |
| --- | --- | --- |
| gt | [<code>NoteArray</code>](#NoteArray) | a NoteArray, e.g. the ground truth |
| rec | [<code>NoteArray</code>](#NoteArray) | a NoteArray to align to a |

<a name="module_Alignment.alignNoteArrays3"></a>

### Alignment.alignNoteArrays3(gt, rec) ⇒ [<code>NoteArray</code>](#NoteArray)
Given two NoteArrays, shift the second one in time such that they are aligned

**Kind**: static method of [<code>Alignment</code>](#module_Alignment)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - an aligned copy of b  
**Todo**

- [ ] use median instead of average?


| Param | Type | Description |
| --- | --- | --- |
| gt | [<code>NoteArray</code>](#NoteArray) | a NoteArray, e.g. the ground truth |
| rec | [<code>NoteArray</code>](#NoteArray) | a NoteArray to align to a |

<a name="module_Alignment.testAlignment"></a>

### Alignment.testAlignment()
Test function

**Kind**: static method of [<code>Alignment</code>](#module_Alignment)  
**Todo**

- [ ] move to test

<a name="module_Alignment.alignmentBenchmark"></a>

### Alignment.alignmentBenchmark()
**Kind**: static method of [<code>Alignment</code>](#module_Alignment)  
**Todo**

- [ ] Benchmark different aligment functions on a randomly generated test setThis allows to check the calculated alignment against a known ground truth

<a name="module_Alignment..alignmentForce"></a>

### Alignment~alignmentForce(a, b) ⇒ <code>number</code>
Calculates the mean difference between all notes in a and the nearest same-pitched notes in b

**Kind**: inner method of [<code>Alignment</code>](#module_Alignment)  
**Returns**: <code>number</code> - mean time difference  

| Param | Type | Description |
| --- | --- | --- |
| a | [<code>Array.&lt;Note&gt;</code>](#Note) | array with notes |
| b | [<code>Array.&lt;Note&gt;</code>](#Note) | array with notes |

<a name="module_DiffAlignment"></a>

## DiffAlignment

* [DiffAlignment](#module_DiffAlignment)
    * [.alignRecordingToBestFit(gtNotes, recording, binSize)](#module_DiffAlignment.alignRecordingToBestFit) ⇒ [<code>Recording</code>](#Recording)
    * [.alignRecordingSectionsToBestFit(gtNotes, recording, binSize, gapDuration, gapMode)](#module_DiffAlignment.alignRecordingSectionsToBestFit) ⇒ [<code>Recording</code>](#Recording)
    * [.alignGtAndRecToMinimizeDiffError(gtNotes, recNotes, binSize)](#module_DiffAlignment.alignGtAndRecToMinimizeDiffError) ⇒ <code>Array.&lt;object&gt;</code>
    * [.activationMap(allNotes, binSize)](#module_DiffAlignment.activationMap) ⇒ <code>Map</code>
    * [.agreement(gtActivations, recActivations, offset)](#module_DiffAlignment.agreement) ⇒ <code>number</code>

<a name="module_DiffAlignment.alignRecordingToBestFit"></a>

### DiffAlignment.alignRecordingToBestFit(gtNotes, recording, binSize) ⇒ [<code>Recording</code>](#Recording)
Aligns the recording to the best fitting position of the ground truth

**Kind**: static method of [<code>DiffAlignment</code>](#module_DiffAlignment)  
**Returns**: [<code>Recording</code>](#Recording) - aligned recording  

| Param | Type | Description |
| --- | --- | --- |
| gtNotes | [<code>Array.&lt;Note&gt;</code>](#Note) | ground truth notes |
| recording | [<code>Recording</code>](#Recording) | a Recording object |
| binSize | <code>number</code> | time bin size in milliseconds |

<a name="module_DiffAlignment.alignRecordingSectionsToBestFit"></a>

### DiffAlignment.alignRecordingSectionsToBestFit(gtNotes, recording, binSize, gapDuration, gapMode) ⇒ [<code>Recording</code>](#Recording)
Splits the recording at gaps > gapDuration and then aligns each section to
the best fitting position of the ground truth.

**Kind**: static method of [<code>DiffAlignment</code>](#module_DiffAlignment)  
**Returns**: [<code>Recording</code>](#Recording) - aligned recording  

| Param | Type | Description |
| --- | --- | --- |
| gtNotes | [<code>Array.&lt;Note&gt;</code>](#Note) | ground truth notes |
| recording | [<code>Recording</code>](#Recording) | a Recording object |
| binSize | <code>number</code> | time bin size in milliseconds |
| gapDuration | <code>number</code> | duration of seconds for a gap to be used as      segmenting time |
| gapMode | <code>&#x27;start-start&#x27;</code> \| <code>&#x27;end-start&#x27;</code> | gaps can either be considered as      the maximum time between two note's starts or the end of the first      and the start of the second note |

<a name="module_DiffAlignment.alignGtAndRecToMinimizeDiffError"></a>

### DiffAlignment.alignGtAndRecToMinimizeDiffError(gtNotes, recNotes, binSize) ⇒ <code>Array.&lt;object&gt;</code>
Global alignment.

Returns an array with matches sorted by magnitude of agreement.
The offsetMilliseconds value describes at what time the first note of the
recording should start.

Goal: Know which part of ground truth (GT) was played in recording (rec)
Assumptions:
- Rec has same tempo as GT
- Rec does not start before GT
- Rec does not repeat something that is not repeated in the GT
- Rec does not have gaps
Ideas:
- Brute-force
- Sliding window
- Using diff between time-pitch matrix of GT and rec
- Only compute agreement (correct diff part) for the current overlap
- For each time position save the agreement magnitude
- Optionally: repeat around local maxima with finer binSize

**Kind**: static method of [<code>DiffAlignment</code>](#module_DiffAlignment)  
**Returns**: <code>Array.&lt;object&gt;</code> - best offsets with agreements  

| Param | Type | Description |
| --- | --- | --- |
| gtNotes | [<code>Array.&lt;Note&gt;</code>](#Note) | ground truth notes |
| recNotes | [<code>Array.&lt;Note&gt;</code>](#Note) | recorded notes |
| binSize | <code>number</code> | time bin size in milliseconds |

<a name="module_DiffAlignment.activationMap"></a>

### DiffAlignment.activationMap(allNotes, binSize) ⇒ <code>Map</code>
Returns an activation map, that maps pitch to an array of time bins.
Each bin contains a 0 when there is no note or a 1 when there is one.

**Kind**: static method of [<code>DiffAlignment</code>](#module_DiffAlignment)  
**Returns**: <code>Map</code> - activation map  

| Param | Type | Description |
| --- | --- | --- |
| allNotes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |
| binSize | <code>number</code> | time bin size in milliseconds |

<a name="module_DiffAlignment.agreement"></a>

### DiffAlignment.agreement(gtActivations, recActivations, offset) ⇒ <code>number</code>
Given two activation maps, simply counts the number of bins [pitch, time]
where both have a 1, so an acitve note
GT must be longer than rec

**Kind**: static method of [<code>DiffAlignment</code>](#module_DiffAlignment)  
**Returns**: <code>number</code> - agreement  
**Todo**

- [ ] also count common 0s?


| Param | Type | Description |
| --- | --- | --- |
| gtActivations | <code>Map</code> | see activationMap() |
| recActivations | <code>Map</code> | see activationMap() |
| offset | <code>number</code> | offset for activation2 when comparing |

<a name="module_Chords"></a>

## Chords

* [Chords](#module_Chords)
    * [.detectChordsByExactStart(notes)](#module_Chords.detectChordsByExactStart) ⇒ <code>Array.&lt;Array.&lt;Note&gt;&gt;</code>
    * [.detectChordsBySimilarStart(notes, threshold)](#module_Chords.detectChordsBySimilarStart) ⇒ <code>Array.&lt;Array.&lt;Note&gt;&gt;</code>
    * [.detectChordsByOverlap(notes, sortByPitch)](#module_Chords.detectChordsByOverlap) ⇒ <code>Array.&lt;Array.&lt;Note&gt;&gt;</code>
    * [.getChordType(notes)](#module_Chords.getChordType) ⇒ <code>string</code>
    * [.getChordName(notes)](#module_Chords.getChordName) ⇒ <code>Array.&lt;string&gt;</code>

<a name="module_Chords.detectChordsByExactStart"></a>

### Chords.detectChordsByExactStart(notes) ⇒ <code>Array.&lt;Array.&lt;Note&gt;&gt;</code>
Detects chords as those notes that have the exact same start time, only worksfor ground truth (since recordings are not exact)Does only work if ground truth is aligned! TuxGuitar produces unaligned MIDI.

**Kind**: static method of [<code>Chords</code>](#module_Chords)  
**Returns**: <code>Array.&lt;Array.&lt;Note&gt;&gt;</code> - array of chord arrays  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |

<a name="module_Chords.detectChordsBySimilarStart"></a>

### Chords.detectChordsBySimilarStart(notes, threshold) ⇒ <code>Array.&lt;Array.&lt;Note&gt;&gt;</code>
Detects chords by taking a note as new chord then adding all notes closeafter it to the chord, until the next note is farther away than the given`threshold`. Then, the next chord is started with this note.

**Kind**: static method of [<code>Chords</code>](#module_Chords)  
**Returns**: <code>Array.&lt;Array.&lt;Note&gt;&gt;</code> - chords  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |
| threshold | <code>number</code> | threshold |

<a name="module_Chords.detectChordsByOverlap"></a>

### Chords.detectChordsByOverlap(notes, sortByPitch) ⇒ <code>Array.&lt;Array.&lt;Note&gt;&gt;</code>
Detects chords, by simply looking for notes that overlap each other in time.Example:   =======      =========        ========Important: Notes must be sorted by start time for this to work correctly.

**Kind**: static method of [<code>Chords</code>](#module_Chords)  
**Returns**: <code>Array.&lt;Array.&lt;Note&gt;&gt;</code> - array of chord arrays  
**Todo**

- [ ] not used yet
- [ ] optional minimum overlap ratio
- [ ] new definition of chord? i.e. notes have to start 'together'


| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | array of Note objects |
| sortByPitch | <code>boolean</code> | sort chords by pitch? (otherwise sorted      by note start time) |

<a name="module_Chords.getChordType"></a>

### Chords.getChordType(notes) ⇒ <code>string</code>
Returns chord type, e.g. 'Major', 'Diminished', ...Important: Notes must be sorted by pitch ascending

**Kind**: static method of [<code>Chords</code>](#module_Chords)  
**Returns**: <code>string</code> - chord type  
**Todo**

- [ ] some chords might be multiple types


| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes (sorted by pitch asc.) |

<a name="module_Chords.getChordName"></a>

### Chords.getChordName(notes) ⇒ <code>Array.&lt;string&gt;</code>
https://github.com/tonaljs/tonal/tree/master/packages/chordDetected chords can be used with https://github.com/tonaljs/tonal/tree/master/packages/chord-type

**Kind**: static method of [<code>Chords</code>](#module_Chords)  
**Returns**: <code>Array.&lt;string&gt;</code> - possible chord types  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |

<a name="module_comparison/ErrorClassifier"></a>

## comparison/ErrorClassifier

* [comparison/ErrorClassifier](#module_comparison/ErrorClassifier)
    * _static_
        * [.classifyErrors(gtNotes, recNotes, groupBy, threshold)](#module_comparison/ErrorClassifier.classifyErrors) ⇒ <code>Array.&lt;NoteWithState&gt;</code>
        * [.separateMissed(classifiedNotes)](#module_comparison/ErrorClassifier.separateMissed) ⇒ <code>Object</code>
    * _inner_
        * [~setOrAdd(map, key, value)](#module_comparison/ErrorClassifier..setOrAdd)
        * [~hasAtLeastOne(map, key)](#module_comparison/ErrorClassifier..hasAtLeastOne) ⇒ <code>boolean</code>

<a name="module_comparison/ErrorClassifier.classifyErrors"></a>

### comparison/ErrorClassifier.classifyErrors(gtNotes, recNotes, groupBy, threshold) ⇒ <code>Array.&lt;NoteWithState&gt;</code>
Compares a single recording to a ground truth and labels notes as missing,extra, early/late, or short/long

**Kind**: static method of [<code>comparison/ErrorClassifier</code>](#module_comparison/ErrorClassifier)  
**Returns**: <code>Array.&lt;NoteWithState&gt;</code> - classified notes  
**Todo**

- [ ] generalize to channel/pitch instead of string and fret?


| Param | Type | Description |
| --- | --- | --- |
| gtNotes | [<code>Array.&lt;Note&gt;</code>](#Note) \| [<code>Array.&lt;GuitarNote&gt;</code>](#GuitarNote) | ground truth notes |
| recNotes | [<code>Array.&lt;Note&gt;</code>](#Note) \| [<code>Array.&lt;GuitarNote&gt;</code>](#GuitarNote) | recordings notes |
| groupBy | <code>string</code> | attribute to group notes by |
| threshold | <code>number</code> | time threshold for same-ness |

<a name="module_comparison/ErrorClassifier.separateMissed"></a>

### comparison/ErrorClassifier.separateMissed(classifiedNotes) ⇒ <code>Object</code>
Separates classified GT and rec notes

**Kind**: static method of [<code>comparison/ErrorClassifier</code>](#module_comparison/ErrorClassifier)  
**Returns**: <code>Object</code> - separated notes  

| Param | Type | Description |
| --- | --- | --- |
| classifiedNotes | <code>Array.&lt;NoteWithState&gt;</code> | classified notes |

<a name="module_comparison/ErrorClassifier..setOrAdd"></a>

### comparison/ErrorClassifier~setOrAdd(map, key, value)
**Kind**: inner method of [<code>comparison/ErrorClassifier</code>](#module_comparison/ErrorClassifier)  

| Param | Type | Description |
| --- | --- | --- |
| map | <code>Map</code> | map |
| key | <code>\*</code> | key |
| value | <code>\*</code> | value |

<a name="module_comparison/ErrorClassifier..hasAtLeastOne"></a>

### comparison/ErrorClassifier~hasAtLeastOne(map, key) ⇒ <code>boolean</code>
**Kind**: inner method of [<code>comparison/ErrorClassifier</code>](#module_comparison/ErrorClassifier)  
**Returns**: <code>boolean</code> - true if map.get(key).size > 0  

| Param | Type | Description |
| --- | --- | --- |
| map | <code>Map</code> | map |
| key | <code>\*</code> | key |

<a name="module_comparison/Matching"></a>

## comparison/Matching

* [comparison/Matching](#module_comparison/Matching)
    * [.matchGtAndRecordingNotes(recNotes, gtNotes)](#module_comparison/Matching.matchGtAndRecordingNotes) ⇒ <code>Map</code>
    * [.matchGtAndMultipleRecordings(recordings, gtNotes)](#module_comparison/Matching.matchGtAndMultipleRecordings) ⇒ <code>Map</code>
    * [.getMultiMatchingErrorPerNote(multiMatching, errorThreshold)](#module_comparison/Matching.getMultiMatchingErrorPerNote) ⇒ <code>Map</code>
    * [.getMatchingError(matching, addPenalty, missPenalty, timingPenalty, timeThreshold)](#module_comparison/Matching.getMatchingError) ⇒ <code>object</code>
    * [.getMatchingSection(matching, start, end)](#module_comparison/Matching.getMatchingSection) ⇒ <code>Map</code>
    * [.getMatchingSliceError(matching, start, end, addPenalty, missPenalty, timingPenalty)](#module_comparison/Matching.getMatchingSliceError) ⇒ <code>object</code>

<a name="module_comparison/Matching.matchGtAndRecordingNotes"></a>

### comparison/Matching.matchGtAndRecordingNotes(recNotes, gtNotes) ⇒ <code>Map</code>
For one recording, separately for each pitch,
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

**Kind**: static method of [<code>comparison/Matching</code>](#module_comparison/Matching)  
**Returns**: <code>Map</code> - result  
**Todo**

- [ ] add max distance?


| Param | Type | Description |
| --- | --- | --- |
| recNotes | [<code>Array.&lt;Note&gt;</code>](#Note) | recorded notes of a single recording |
| gtNotes | [<code>Array.&lt;Note&gt;</code>](#Note) | ground truth notes |

<a name="module_comparison/Matching.matchGtAndMultipleRecordings"></a>

### comparison/Matching.matchGtAndMultipleRecordings(recordings, gtNotes) ⇒ <code>Map</code>
Matches all recorded notes from multiple recordings to the nearest
ground truth (GT) note.
Contrary to the matching created by matchGtAndRecordingNotes()
missing and additional notes are not considered, so multiple notes
from a single recording can be matched to the same GT note.

Result format:
Map:pitch->Map:gtStart->arrayOfMatchedRecNotes

**Kind**: static method of [<code>comparison/Matching</code>](#module_comparison/Matching)  
**Returns**: <code>Map</code> - matching  

| Param | Type | Description |
| --- | --- | --- |
| recordings | [<code>Array.&lt;Recording&gt;</code>](#Recording) | recordings |
| gtNotes | [<code>Array.&lt;Note&gt;</code>](#Note) | ground truth notes |

<a name="module_comparison/Matching.getMultiMatchingErrorPerNote"></a>

### comparison/Matching.getMultiMatchingErrorPerNote(multiMatching, errorThreshold) ⇒ <code>Map</code>
Calculates (for each pitch) the average error for each GT note (averaged
over all matched notes in the recordings),
as well as the maximum of all those average errors.
GT notes that have no matched recorded notes will have an error of 0.

**Kind**: static method of [<code>comparison/Matching</code>](#module_comparison/Matching)  
**Returns**: <code>Map</code> - error summary Map:pitch->{gtErrorMap, maxError},
     gtErrorMap is Map:gtStart->error (error is average over all time
     differences between the GT note and matched recNotes)  

| Param | Type | Description |
| --- | --- | --- |
| multiMatching | <code>Map</code> | matching with a GT and multiple recordings |
| errorThreshold | <code>number</code> | number seconds of deviation above which      to exclude an error |

<a name="module_comparison/Matching.getMatchingError"></a>

### comparison/Matching.getMatchingError(matching, addPenalty, missPenalty, timingPenalty, timeThreshold) ⇒ <code>object</code>
Calculates the error of a matching by applying penalties and summing up

**Kind**: static method of [<code>comparison/Matching</code>](#module_comparison/Matching)  
**Returns**: <code>object</code> - errors by category  

| Param | Type | Description |
| --- | --- | --- |
| matching | <code>Map</code> | a matching created by matchGtAndRecordingNotes |
| addPenalty | <code>number</code> | penalty for each additonal note |
| missPenalty | <code>number</code> | penalty for each missing note |
| timingPenalty | <code>number</code> | penalty for note timing differences in seconds |
| timeThreshold | <code>number</code> | timing errors below it (absolute) are ignored |

<a name="module_comparison/Matching.getMatchingSection"></a>

### comparison/Matching.getMatchingSection(matching, start, end) ⇒ <code>Map</code>
Cuts a section from a matching by filtering on the start times
of ground truth, missing, and additonal notes

**Kind**: static method of [<code>comparison/Matching</code>](#module_comparison/Matching)  
**Returns**: <code>Map</code> - section of matching  

| Param | Type | Description |
| --- | --- | --- |
| matching | <code>Map</code> | matching |
| start | <code>number</code> | start time (inclusive) |
| end | <code>number</code> | end time (exclusive) |

<a name="module_comparison/Matching.getMatchingSliceError"></a>

### comparison/Matching.getMatchingSliceError(matching, start, end, addPenalty, missPenalty, timingPenalty) ⇒ <code>object</code>
Shortcut for getMatchingSection and getMatchingError,
see them for parameter details.

**Kind**: static method of [<code>comparison/Matching</code>](#module_comparison/Matching)  
**Returns**: <code>object</code> - error by category  

| Param | Type | Description |
| --- | --- | --- |
| matching | <code>Map</code> | matching |
| start | <code>number</code> | start time (inclusive) |
| end | <code>number</code> | end time (exclusive) |
| addPenalty | <code>number</code> | penalty for each additonal note |
| missPenalty | <code>number</code> | penalty for each missing note |
| timingPenalty | <code>number</code> | penalty for note timing differences in seconds |

<a name="module_comparison/Similarity"></a>

## comparison/Similarity

* [comparison/Similarity](#module_comparison/Similarity)
    * _static_
        * [.getSimilarParts(track, selectedInterval, stride, threshold, secondsPerBin, distance)](#module_comparison/Similarity.getSimilarParts) ⇒ <code>object</code>
        * [.getTrackSimilarity(discrA, discrB, distance)](#module_comparison/Similarity.getTrackSimilarity) ⇒ <code>number</code>
        * [.discretizeTime(track, secondsPerBin)](#module_comparison/Similarity.discretizeTime) ⇒ <code>Map</code>
    * _inner_
        * [~countActiveNoteBins(binArray)](#module_comparison/Similarity..countActiveNoteBins) ⇒ <code>number</code>
        * [~sliceDiscretizedTrack(trackMap, startBin, endBin)](#module_comparison/Similarity..sliceDiscretizedTrack) ⇒ <code>Map</code>
        * [~euclideanDistanceSquared(A, B)](#module_comparison/Similarity..euclideanDistanceSquared) ⇒ <code>number</code>
        * [~neirestNeighborDistance(A, B)](#module_comparison/Similarity..neirestNeighborDistance) ⇒ <code>number</code>

<a name="module_comparison/Similarity.getSimilarParts"></a>

### comparison/Similarity.getSimilarParts(track, selectedInterval, stride, threshold, secondsPerBin, distance) ⇒ <code>object</code>
Given a track, a selected time interval and a threshold,this function searches for parts in the track that aresimilar to the selection.It uses a sliding window with the size of the selectionand a stride given as argument.

**Kind**: static method of [<code>comparison/Similarity</code>](#module_comparison/Similarity)  
**Returns**: <code>object</code> - similar parts  

| Param | Type | Description |
| --- | --- | --- |
| track | [<code>Array.&lt;Note&gt;</code>](#Note) | array of Note objects |
| selectedInterval | <code>Array.&lt;number&gt;</code> | [startTime, endTime] in seconds |
| stride | <code>number</code> | stride for the sliding window in number of bins |
| threshold | <code>number</code> | distance threshold below which parts are considered similar |
| secondsPerBin | <code>number</code> | time bin size in seconds |
| distance | <code>string</code> | one of: 'dtw', 'euclidean', 'nearest' |

<a name="module_comparison/Similarity.getTrackSimilarity"></a>

### comparison/Similarity.getTrackSimilarity(discrA, discrB, distance) ⇒ <code>number</code>
Uses calculates the distance betweentwo discretized tracks, for each pitch separately.Pitch-wise distances are averaged and a penalty is added to the distancefor pitches that are not occuring in both tracks

**Kind**: static method of [<code>comparison/Similarity</code>](#module_comparison/Similarity)  
**Returns**: <code>number</code> - distance  
**See**: https://github.com/GordonLesti/dynamic-time-warping  

| Param | Type | Description |
| --- | --- | --- |
| discrA | <code>Map</code> | discretized track |
| discrB | <code>Map</code> | discretized track |
| distance | <code>string</code> | one of: 'euclidean', 'nearest' |

<a name="module_comparison/Similarity.discretizeTime"></a>

### comparison/Similarity.discretizeTime(track, secondsPerBin) ⇒ <code>Map</code>
- Normalizes Note times to be between 0 and (maxTime - minTime),- discretizes the start and end time by using Math.round to getthe closest time bin (beat) and- Creates one array for each pitch, where each entry containseither a 0 (no note at that time bin) or a 1 (note at that time bin)

**Kind**: static method of [<code>comparison/Similarity</code>](#module_comparison/Similarity)  
**Returns**: <code>Map</code> - pitch to binArray  

| Param | Type | Description |
| --- | --- | --- |
| track | [<code>Array.&lt;Note&gt;</code>](#Note) | an array of Note objects |
| secondsPerBin | <code>number</code> | time bin size in seconds |

<a name="module_comparison/Similarity..countActiveNoteBins"></a>

### comparison/Similarity~countActiveNoteBins(binArray) ⇒ <code>number</code>
Counts the occurence of 1 in an array

**Kind**: inner method of [<code>comparison/Similarity</code>](#module_comparison/Similarity)  
**Returns**: <code>number</code> - occurence of 1  

| Param | Type | Description |
| --- | --- | --- |
| binArray | <code>Array.&lt;number&gt;</code> | array |

<a name="module_comparison/Similarity..sliceDiscretizedTrack"></a>

### comparison/Similarity~sliceDiscretizedTrack(trackMap, startBin, endBin) ⇒ <code>Map</code>
Slices bins out of a discretices track.This is done for each pitch separately

**Kind**: inner method of [<code>comparison/Similarity</code>](#module_comparison/Similarity)  
**Returns**: <code>Map</code> - map with sliced arrays  

| Param | Type | Description |
| --- | --- | --- |
| trackMap | <code>Map</code> | Map pitch->binArray |
| startBin | <code>number</code> | index of first bin |
| endBin | <code>number</code> | index of last bin |

<a name="module_comparison/Similarity..euclideanDistanceSquared"></a>

### comparison/Similarity~euclideanDistanceSquared(A, B) ⇒ <code>number</code>
Returns sum_{i=0}^{N-1}{(a_i-b_i)^2},i.e. Euclidean distance but without square root

**Kind**: inner method of [<code>comparison/Similarity</code>](#module_comparison/Similarity)  
**Returns**: <code>number</code> - Euclidean distance  

| Param | Type | Description |
| --- | --- | --- |
| A | <code>Array.&lt;number&gt;</code> | an array |
| B | <code>Array.&lt;number&gt;</code> | another array |

<a name="module_comparison/Similarity..neirestNeighborDistance"></a>

### comparison/Similarity~neirestNeighborDistance(A, B) ⇒ <code>number</code>
Given two arrays containing 1s and 0s, this algorithmgoes through all bins and for each bin where one arrayhas a 1 and the other a 0, it searches for the closest 1next to the 0.The distance is then added to the global distance.

**Kind**: inner method of [<code>comparison/Similarity</code>](#module_comparison/Similarity)  
**Returns**: <code>number</code> - nearest neighbor distance  

| Param | Type | Description |
| --- | --- | --- |
| A | <code>Array.&lt;number&gt;</code> | an array |
| B | <code>Array.&lt;number&gt;</code> | another array |

<a name="module_comparison/SimilarSections"></a>

## comparison/SimilarSections

* [comparison/SimilarSections](#module_comparison/SimilarSections)
    * [.findSimilarNoteSections(notes, startTime, endTime, threshold)](#module_comparison/SimilarSections.findSimilarNoteSections) ⇒ <code>Array.&lt;object&gt;</code>
    * [.findSimilarStringSections(dataString, searchString, threshold)](#module_comparison/SimilarSections.findSimilarStringSections) ⇒ <code>Array.&lt;object&gt;</code>

<a name="module_comparison/SimilarSections.findSimilarNoteSections"></a>

### comparison/SimilarSections.findSimilarNoteSections(notes, startTime, endTime, threshold) ⇒ <code>Array.&lt;object&gt;</code>
Turns an array of notes into a string to perform pattern matching search for similar
patterns.

**Kind**: static method of [<code>comparison/SimilarSections</code>](#module_comparison/SimilarSections)  
**Returns**: <code>Array.&lt;object&gt;</code> - {index, distance, startTime, endTime}  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes, must be sorted by Note.start |
| startTime | <code>number</code> | start time of the section to search |
| endTime | <code>number</code> | end time for the section to search |
| threshold | <code>number</code> | threshold for normalized Levenshtein distance in [0, 1] |

<a name="module_comparison/SimilarSections.findSimilarStringSections"></a>

### comparison/SimilarSections.findSimilarStringSections(dataString, searchString, threshold) ⇒ <code>Array.&lt;object&gt;</code>
Finds similar sections in a string via Levenshtein distance

**Kind**: static method of [<code>comparison/SimilarSections</code>](#module_comparison/SimilarSections)  
**Returns**: <code>Array.&lt;object&gt;</code> - {index, distance}  

| Param | Type | Description |
| --- | --- | --- |
| dataString | <code>stringArray</code> | they string to search in |
| searchString | <code>stringArray</code> | the string to search for |
| threshold | <code>number</code> | threshold for normalized Levenshtein distance in [0, 1] |

<a name="module_instruments/StringedFingering"></a>

## instruments/StringedFingering
**Todo**

- [ ] unfinished
- [ ] not tested


* [instruments/StringedFingering](#module_instruments/StringedFingering)
    * [.FretboardPosition](#module_instruments/StringedFingering.FretboardPosition)
        * [new exports.FretboardPosition(string, fret)](#new_module_instruments/StringedFingering.FretboardPosition_new)
        * [.moveBy(string, fret)](#module_instruments/StringedFingering.FretboardPosition+moveBy)
        * [.isValid(maxString, maxFret)](#module_instruments/StringedFingering.FretboardPosition+isValid) ⇒ <code>boolean</code>
        * [.equals(otherFretboardPosition)](#module_instruments/StringedFingering.FretboardPosition+equals) ⇒ <code>boolean</code>
        * [.toString()](#module_instruments/StringedFingering.FretboardPosition+toString) ⇒ <code>string</code>
        * [.clone()](#module_instruments/StringedFingering.FretboardPosition+clone) ⇒ <code>FretboardPosition</code>
        * [.difference(otherFretboardPosition)](#module_instruments/StringedFingering.FretboardPosition+difference) ⇒ <code>object</code>
    * [.HandPose](#module_instruments/StringedFingering.HandPose)
        * [new exports.HandPose(fingerPositions)](#new_module_instruments/StringedFingering.HandPose_new)
        * [.moveFingerTo(index, newPosition)](#module_instruments/StringedFingering.HandPose+moveFingerTo)
        * [.liftFinger(index)](#module_instruments/StringedFingering.HandPose+liftFinger)
        * [.moveFingerBy(index, string, fret)](#module_instruments/StringedFingering.HandPose+moveFingerBy)
        * [.moveHandBy(string, fret)](#module_instruments/StringedFingering.HandPose+moveHandBy)
        * [.isValid(maxString, maxFret)](#module_instruments/StringedFingering.HandPose+isValid) ⇒ <code>boolean</code>
        * [.euqals(otherHandPose)](#module_instruments/StringedFingering.HandPose+euqals) ⇒ <code>boolean</code>
        * [.toString()](#module_instruments/StringedFingering.HandPose+toString) ⇒ <code>string</code>
        * [.clone()](#module_instruments/StringedFingering.HandPose+clone) ⇒ <code>HandPose</code>
        * [.difference(otherHandPose)](#module_instruments/StringedFingering.HandPose+difference) ⇒ <code>Array.&lt;object&gt;</code>
        * [.costOfMovement(otherHandPose)](#module_instruments/StringedFingering.HandPose+costOfMovement) ⇒ <code>number</code>

<a name="module_instruments/StringedFingering.FretboardPosition"></a>

### instruments/StringedFingering.FretboardPosition
Represents a positon as {string, fret}

**Kind**: static class of [<code>instruments/StringedFingering</code>](#module_instruments/StringedFingering)  

* [.FretboardPosition](#module_instruments/StringedFingering.FretboardPosition)
    * [new exports.FretboardPosition(string, fret)](#new_module_instruments/StringedFingering.FretboardPosition_new)
    * [.moveBy(string, fret)](#module_instruments/StringedFingering.FretboardPosition+moveBy)
    * [.isValid(maxString, maxFret)](#module_instruments/StringedFingering.FretboardPosition+isValid) ⇒ <code>boolean</code>
    * [.equals(otherFretboardPosition)](#module_instruments/StringedFingering.FretboardPosition+equals) ⇒ <code>boolean</code>
    * [.toString()](#module_instruments/StringedFingering.FretboardPosition+toString) ⇒ <code>string</code>
    * [.clone()](#module_instruments/StringedFingering.FretboardPosition+clone) ⇒ <code>FretboardPosition</code>
    * [.difference(otherFretboardPosition)](#module_instruments/StringedFingering.FretboardPosition+difference) ⇒ <code>object</code>

<a name="new_module_instruments/StringedFingering.FretboardPosition_new"></a>

#### new exports.FretboardPosition(string, fret)

| Param | Type | Description |
| --- | --- | --- |
| string | <code>number</code> | string |
| fret | <code>number</code> | fret |

<a name="module_instruments/StringedFingering.FretboardPosition+moveBy"></a>

#### fretboardPosition.moveBy(string, fret)
Moves the positon by string and fret

**Kind**: instance method of [<code>FretboardPosition</code>](#module_instruments/StringedFingering.FretboardPosition)  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>number</code> | string |
| fret | <code>number</code> | fret |

<a name="module_instruments/StringedFingering.FretboardPosition+isValid"></a>

#### fretboardPosition.isValid(maxString, maxFret) ⇒ <code>boolean</code>
Checks whether this position is valid

**Kind**: instance method of [<code>FretboardPosition</code>](#module_instruments/StringedFingering.FretboardPosition)  
**Returns**: <code>boolean</code> - true iff valid  

| Param | Type | Description |
| --- | --- | --- |
| maxString | <code>number</code> | number of strings -1 |
| maxFret | <code>number</code> | number of frets |

<a name="module_instruments/StringedFingering.FretboardPosition+equals"></a>

#### fretboardPosition.equals(otherFretboardPosition) ⇒ <code>boolean</code>
Returns true iff this and another FretboardPosition are equal

**Kind**: instance method of [<code>FretboardPosition</code>](#module_instruments/StringedFingering.FretboardPosition)  
**Returns**: <code>boolean</code> - true iff equal  

| Param | Type | Description |
| --- | --- | --- |
| otherFretboardPosition | <code>FretboardPosition</code> | another FretboardPosition |

<a name="module_instruments/StringedFingering.FretboardPosition+toString"></a>

#### fretboardPosition.toString() ⇒ <code>string</code>
String representation

**Kind**: instance method of [<code>FretboardPosition</code>](#module_instruments/StringedFingering.FretboardPosition)  
**Returns**: <code>string</code> - string representation  
<a name="module_instruments/StringedFingering.FretboardPosition+clone"></a>

#### fretboardPosition.clone() ⇒ <code>FretboardPosition</code>
**Kind**: instance method of [<code>FretboardPosition</code>](#module_instruments/StringedFingering.FretboardPosition)  
**Returns**: <code>FretboardPosition</code> - clone  
<a name="module_instruments/StringedFingering.FretboardPosition+difference"></a>

#### fretboardPosition.difference(otherFretboardPosition) ⇒ <code>object</code>
Returns (other - this), i.e. how you need to move this to get to other

**Kind**: instance method of [<code>FretboardPosition</code>](#module_instruments/StringedFingering.FretboardPosition)  
**Returns**: <code>object</code> - difference in {string, fret}  

| Param | Type | Description |
| --- | --- | --- |
| otherFretboardPosition | <code>FretboardPosition</code> | another FretboardPosition |

<a name="module_instruments/StringedFingering.HandPose"></a>

### instruments/StringedFingering.HandPose
Represents a hand pose, for each of the 10 fingers with a FretboardPosition
or null, if the finger is not used

**Kind**: static class of [<code>instruments/StringedFingering</code>](#module_instruments/StringedFingering)  

* [.HandPose](#module_instruments/StringedFingering.HandPose)
    * [new exports.HandPose(fingerPositions)](#new_module_instruments/StringedFingering.HandPose_new)
    * [.moveFingerTo(index, newPosition)](#module_instruments/StringedFingering.HandPose+moveFingerTo)
    * [.liftFinger(index)](#module_instruments/StringedFingering.HandPose+liftFinger)
    * [.moveFingerBy(index, string, fret)](#module_instruments/StringedFingering.HandPose+moveFingerBy)
    * [.moveHandBy(string, fret)](#module_instruments/StringedFingering.HandPose+moveHandBy)
    * [.isValid(maxString, maxFret)](#module_instruments/StringedFingering.HandPose+isValid) ⇒ <code>boolean</code>
    * [.euqals(otherHandPose)](#module_instruments/StringedFingering.HandPose+euqals) ⇒ <code>boolean</code>
    * [.toString()](#module_instruments/StringedFingering.HandPose+toString) ⇒ <code>string</code>
    * [.clone()](#module_instruments/StringedFingering.HandPose+clone) ⇒ <code>HandPose</code>
    * [.difference(otherHandPose)](#module_instruments/StringedFingering.HandPose+difference) ⇒ <code>Array.&lt;object&gt;</code>
    * [.costOfMovement(otherHandPose)](#module_instruments/StringedFingering.HandPose+costOfMovement) ⇒ <code>number</code>

<a name="new_module_instruments/StringedFingering.HandPose_new"></a>

#### new exports.HandPose(fingerPositions)

| Param | Type | Description |
| --- | --- | --- |
| fingerPositions | <code>Array.&lt;number&gt;</code> | Indices 0-9: left thumb, 4 left fingers      right thumb, 4 right fingers. Values: null for finger not pressed,      {string:number, fret:number} for pressed fingers |

<a name="module_instruments/StringedFingering.HandPose+moveFingerTo"></a>

#### handPose.moveFingerTo(index, newPosition)
Move a single finger

**Kind**: instance method of [<code>HandPose</code>](#module_instruments/StringedFingering.HandPose)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | finger index in [0, 9] |
| newPosition | <code>FretboardPosition</code> | new position |

<a name="module_instruments/StringedFingering.HandPose+liftFinger"></a>

#### handPose.liftFinger(index)
Lift a single finger

**Kind**: instance method of [<code>HandPose</code>](#module_instruments/StringedFingering.HandPose)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | finger index in [0, 9] |

<a name="module_instruments/StringedFingering.HandPose+moveFingerBy"></a>

#### handPose.moveFingerBy(index, string, fret)
Moves the finger by string and fret

**Kind**: instance method of [<code>HandPose</code>](#module_instruments/StringedFingering.HandPose)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | finger index in [0, 9] |
| string | <code>number</code> | string |
| fret | <code>number</code> | fret |

<a name="module_instruments/StringedFingering.HandPose+moveHandBy"></a>

#### handPose.moveHandBy(string, fret)
Move the whole hand, fingers keep relative positions

**Kind**: instance method of [<code>HandPose</code>](#module_instruments/StringedFingering.HandPose)  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>number</code> | string |
| fret | <code>number</code> | fret |

<a name="module_instruments/StringedFingering.HandPose+isValid"></a>

#### handPose.isValid(maxString, maxFret) ⇒ <code>boolean</code>
Checks whether this position is valid

**Kind**: instance method of [<code>HandPose</code>](#module_instruments/StringedFingering.HandPose)  
**Returns**: <code>boolean</code> - true iff valid  

| Param | Type | Description |
| --- | --- | --- |
| maxString | <code>number</code> | max string |
| maxFret | <code>number</code> | max fret |

<a name="module_instruments/StringedFingering.HandPose+euqals"></a>

#### handPose.euqals(otherHandPose) ⇒ <code>boolean</code>
Returns true iff this and another FretboardPosition are equal

**Kind**: instance method of [<code>HandPose</code>](#module_instruments/StringedFingering.HandPose)  
**Returns**: <code>boolean</code> - ture iff equal  

| Param | Type | Description |
| --- | --- | --- |
| otherHandPose | <code>HandPose</code> | another hand pose |

<a name="module_instruments/StringedFingering.HandPose+toString"></a>

#### handPose.toString() ⇒ <code>string</code>
**Kind**: instance method of [<code>HandPose</code>](#module_instruments/StringedFingering.HandPose)  
**Returns**: <code>string</code> - string representation  
<a name="module_instruments/StringedFingering.HandPose+clone"></a>

#### handPose.clone() ⇒ <code>HandPose</code>
**Kind**: instance method of [<code>HandPose</code>](#module_instruments/StringedFingering.HandPose)  
**Returns**: <code>HandPose</code> - clone  
<a name="module_instruments/StringedFingering.HandPose+difference"></a>

#### handPose.difference(otherHandPose) ⇒ <code>Array.&lt;object&gt;</code>
Returns (other - this), i.e. how you need to move this to get to other

**Kind**: instance method of [<code>HandPose</code>](#module_instruments/StringedFingering.HandPose)  
**Returns**: <code>Array.&lt;object&gt;</code> - difference  

| Param | Type | Description |
| --- | --- | --- |
| otherHandPose | <code>HandPose</code> | another HandPose |

<a name="module_instruments/StringedFingering.HandPose+costOfMovement"></a>

#### handPose.costOfMovement(otherHandPose) ⇒ <code>number</code>
Calculates movement costs

**Kind**: instance method of [<code>HandPose</code>](#module_instruments/StringedFingering.HandPose)  
**Returns**: <code>number</code> - cost  

| Param | Type | Description |
| --- | --- | --- |
| otherHandPose | <code>HandPose</code> | another HandPose |

<a name="module_fileFormats/Midi"></a>

## fileFormats/Midi
Lookup for many MIDI specifications.

**See**: https://soundprogramming.net/file-formats/  

* [fileFormats/Midi](#module_fileFormats/Midi)
    * _static_
        * [.flatToSharp](#module_fileFormats/Midi.flatToSharp) : <code>Map.&lt;string, string&gt;</code>
        * [.sharpToFlat](#module_fileFormats/Midi.sharpToFlat) : <code>Map.&lt;string, string&gt;</code>
        * [.NOTE_NAMES](#module_fileFormats/Midi.NOTE_NAMES) : <code>Array.&lt;string&gt;</code>
        * [.NOTE_NAMES_FLAT](#module_fileFormats/Midi.NOTE_NAMES_FLAT) : <code>Array.&lt;string&gt;</code>
        * [.MIDI_NOTES](#module_fileFormats/Midi.MIDI_NOTES) : <code>Array.&lt;MidiNote&gt;</code>
        * [.SHARPS](#module_fileFormats/Midi.SHARPS) : <code>Set.&lt;number&gt;</code>
        * [.MIDI_COMMANDS](#module_fileFormats/Midi.MIDI_COMMANDS) : <code>Map.&lt;number, MidiCommand&gt;</code>
        * [.MIDI_NOTE_RANGES](#module_fileFormats/Midi.MIDI_NOTE_RANGES) : <code>Array.&lt;object&gt;</code>
        * [.getMidiNoteByNr(nr)](#module_fileFormats/Midi.getMidiNoteByNr) ⇒ <code>MidiNote</code>
        * [.getMidiNoteByLabel(label)](#module_fileFormats/Midi.getMidiNoteByLabel) ⇒ <code>MidiNote</code>
        * [.getMidiNoteByNameAndOctave(name, octave)](#module_fileFormats/Midi.getMidiNoteByNameAndOctave) ⇒ <code>MidiNote</code>
        * [.getMidiInstrumentByNr(nr)](#module_fileFormats/Midi.getMidiInstrumentByNr) ⇒ <code>object</code>
        * [.getMidiInstrumentByNrL2(nr, subNr)](#module_fileFormats/Midi.getMidiInstrumentByNrL2) ⇒ <code>object</code>
        * [.getMidiDrumNoteByNr(nr)](#module_fileFormats/Midi.getMidiDrumNoteByNr) ⇒ <code>string</code>
        * [.isSharp(nr)](#module_fileFormats/Midi.isSharp) ⇒ <code>boolean</code>
        * [.getNoteNameFromNoteNr(nr)](#module_fileFormats/Midi.getNoteNameFromNoteNr) ⇒ <code>string</code>
    * _inner_
        * [~GENERAL_MIDI_DRUM_NOTE_NUMBERS](#module_fileFormats/Midi..GENERAL_MIDI_DRUM_NOTE_NUMBERS) : <code>Map.&lt;number, string&gt;</code>
        * [~MidiNote](#module_fileFormats/Midi..MidiNote) : <code>object</code>
        * [~MidiCommand](#module_fileFormats/Midi..MidiCommand) : <code>object</code>

<a name="module_fileFormats/Midi.flatToSharp"></a>

### fileFormats/Midi.flatToSharp : <code>Map.&lt;string, string&gt;</code>
Maps flats to sharps, e.g. flatToSharp.get('Db') === 'C#'

**Kind**: static constant of [<code>fileFormats/Midi</code>](#module_fileFormats/Midi)  
<a name="module_fileFormats/Midi.sharpToFlat"></a>

### fileFormats/Midi.sharpToFlat : <code>Map.&lt;string, string&gt;</code>
Maps shaprs to flats, e.g. sharpToFlat.get('C#') === 'Db'

**Kind**: static constant of [<code>fileFormats/Midi</code>](#module_fileFormats/Midi)  
<a name="module_fileFormats/Midi.NOTE_NAMES"></a>

### fileFormats/Midi.NOTE\_NAMES : <code>Array.&lt;string&gt;</code>
Names of notes, indexed like MIDI numbers, i.e. C is 0

**Kind**: static constant of [<code>fileFormats/Midi</code>](#module_fileFormats/Midi)  
<a name="module_fileFormats/Midi.NOTE_NAMES_FLAT"></a>

### fileFormats/Midi.NOTE\_NAMES\_FLAT : <code>Array.&lt;string&gt;</code>
Names of notes, indexed like MIDI numbers, i.e. C is 0, with flats instead ofsharps.

**Kind**: static constant of [<code>fileFormats/Midi</code>](#module_fileFormats/Midi)  
<a name="module_fileFormats/Midi.MIDI_NOTES"></a>

### fileFormats/Midi.MIDI\_NOTES : <code>Array.&lt;MidiNote&gt;</code>
Index equals MIDI note number

**Kind**: static constant of [<code>fileFormats/Midi</code>](#module_fileFormats/Midi)  
<a name="module_fileFormats/Midi.SHARPS"></a>

### fileFormats/Midi.SHARPS : <code>Set.&lt;number&gt;</code>
Set of all MIDI notes that are sharp/flat

**Kind**: static constant of [<code>fileFormats/Midi</code>](#module_fileFormats/Midi)  
**Example** *(Find out if a note is sharp/flat)*  
```js
     const midiNr = 42;
     const isSharp = Midi.SHARPS.has(midiNr);
     // true
```
<a name="module_fileFormats/Midi.MIDI_COMMANDS"></a>

### fileFormats/Midi.MIDI\_COMMANDS : <code>Map.&lt;number, MidiCommand&gt;</code>
MIDI commands with code, name, and parametersFrom: https://ccrma.stanford.edu/~craig/articles/linuxmidi/misc/essenmidi.htmlhttps://www.midi.org/specifications/item/table-1-summary-of-midi-message

**Kind**: static constant of [<code>fileFormats/Midi</code>](#module_fileFormats/Midi)  
<a name="module_fileFormats/Midi.MIDI_NOTE_RANGES"></a>

### fileFormats/Midi.MIDI\_NOTE\_RANGES : <code>Array.&lt;object&gt;</code>
**Kind**: static constant of [<code>fileFormats/Midi</code>](#module_fileFormats/Midi)  
**Todo**

- [ ] add instrument numbers
- [ ] This might be useful, e.g. to check which notes Player can play

<a name="module_fileFormats/Midi.getMidiNoteByNr"></a>

### fileFormats/Midi.getMidiNoteByNr(nr) ⇒ <code>MidiNote</code>
Returns information on the MIDI note with the specified number.

**Kind**: static method of [<code>fileFormats/Midi</code>](#module_fileFormats/Midi)  
**Returns**: <code>MidiNote</code> - MIDI note information as a [MidiNote](MidiNote)  

| Param | Type | Description |
| --- | --- | --- |
| nr | <code>number</code> | MIDI note number in [0, 127] |

<a name="module_fileFormats/Midi.getMidiNoteByLabel"></a>

### fileFormats/Midi.getMidiNoteByLabel(label) ⇒ <code>MidiNote</code>
Returns information on the MIDI note with the specified label.

**Kind**: static method of [<code>fileFormats/Midi</code>](#module_fileFormats/Midi)  
**Returns**: <code>MidiNote</code> - MIDI note information as a [MidiNote](MidiNote)  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | note label, e.g. 'D#0'      (upper-case and sharp notation necessary) |

<a name="module_fileFormats/Midi.getMidiNoteByNameAndOctave"></a>

### fileFormats/Midi.getMidiNoteByNameAndOctave(name, octave) ⇒ <code>MidiNote</code>
Returns information on the MIDI note with the specified name and octave.

**Kind**: static method of [<code>fileFormats/Midi</code>](#module_fileFormats/Midi)  
**Returns**: <code>MidiNote</code> - MIDI note information as a [MidiNote](MidiNote)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | note name, e.g. 'D#'      (upper-case and sharp notation necessary) |
| octave | <code>number</code> | octave in [-1, 9] |

<a name="module_fileFormats/Midi.getMidiInstrumentByNr"></a>

### fileFormats/Midi.getMidiInstrumentByNr(nr) ⇒ <code>object</code>
Returns information on the MIDI instrument with the specified number.

**Kind**: static method of [<code>fileFormats/Midi</code>](#module_fileFormats/Midi)  
**Returns**: <code>object</code> - note info, e.g.     { number: 0, group: 'Piano', label: 'Acoustic Grand Piano' }  

| Param | Type | Description |
| --- | --- | --- |
| nr | <code>number</code> | MIDI instrument number in [0, 127] |

<a name="module_fileFormats/Midi.getMidiInstrumentByNrL2"></a>

### fileFormats/Midi.getMidiInstrumentByNrL2(nr, subNr) ⇒ <code>object</code>
Returns information on the MIDI instrument (MIDI level 2) with thespecified number.

**Kind**: static method of [<code>fileFormats/Midi</code>](#module_fileFormats/Midi)  
**Returns**: <code>object</code> - note info, e.g.     { number: 0, group: 'Piano', label: 'Acoustic Grand Piano' }  

| Param | Type | Description |
| --- | --- | --- |
| nr | <code>number</code> | MIDI instrument number in [0, 127] |
| subNr | <code>number</code> | MIDI instrument sub number in [0, 127] |

<a name="module_fileFormats/Midi.getMidiDrumNoteByNr"></a>

### fileFormats/Midi.getMidiDrumNoteByNr(nr) ⇒ <code>string</code>
Returns information on the MIDI instrument with the specified number.

**Kind**: static method of [<code>fileFormats/Midi</code>](#module_fileFormats/Midi)  
**Returns**: <code>string</code> - note name, e.g. 'Bass Drum 1  

| Param | Type | Description |
| --- | --- | --- |
| nr | <code>number</code> | MIDI drum note number in [27, 87] |

<a name="module_fileFormats/Midi.isSharp"></a>

### fileFormats/Midi.isSharp(nr) ⇒ <code>boolean</code>
Returns true if a given MIDI pitch refers to a sharp note.

**Kind**: static method of [<code>fileFormats/Midi</code>](#module_fileFormats/Midi)  
**Returns**: <code>boolean</code> - true if sharp, false otherwise  

| Param | Type | Description |
| --- | --- | --- |
| nr | <code>number</code> | MIDI note number in [0, 127] |

<a name="module_fileFormats/Midi.getNoteNameFromNoteNr"></a>

### fileFormats/Midi.getNoteNameFromNoteNr(nr) ⇒ <code>string</code>
Returns a note name such as 'C#' (without octave) for a given MIDInote number.

**Kind**: static method of [<code>fileFormats/Midi</code>](#module_fileFormats/Midi)  
**Returns**: <code>string</code> - note name such as 'C#'  

| Param | Type | Description |
| --- | --- | --- |
| nr | <code>number</code> | MIDI note number in [0, 127] |

<a name="module_fileFormats/Midi..GENERAL_MIDI_DRUM_NOTE_NUMBERS"></a>

### fileFormats/Midi~GENERAL\_MIDI\_DRUM\_NOTE\_NUMBERS : <code>Map.&lt;number, string&gt;</code>
**Kind**: inner constant of [<code>fileFormats/Midi</code>](#module_fileFormats/Midi)  
<a name="module_fileFormats/Midi..MidiNote"></a>

### fileFormats/Midi~MidiNote : <code>object</code>
A MIDI note

**Kind**: inner typedef of [<code>fileFormats/Midi</code>](#module_fileFormats/Midi)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pitch | <code>number</code> | the MIDI note number e.g. 60 for C4 |
| name | <code>string</code> | e.g. C# |
| octave | <code>number</code> | number in [-1, 9] |
| label | <code>string</code> | name and octave, e.g. C#5 |
| frequency | <code>number</code> | physical frequency |

**Example** *(Example for a MIDI note)*  
```js
     { pitch: 69, name: 'A', octave: 4, label: 'A4', frequency: 440.000 }
```
<a name="module_fileFormats/Midi..MidiCommand"></a>

### fileFormats/Midi~MidiCommand : <code>object</code>
A MIDI command

**Kind**: inner typedef of [<code>fileFormats/Midi</code>](#module_fileFormats/Midi)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | e.g. 'noteOn' |
| description | <code>string</code> | e.g. 'Note-on' |
| params | <code>Array.&lt;string&gt;</code> \| <code>undefined</code> | additional prameters of that command |

**Example** *(Example for a MIDI command)*  
```js
     { name: 'noteOn', description: 'Note-on', params: ['key', 'velocity'] }],
```
<a name="module_fileFormats/MidiParser"></a>

## fileFormats/MidiParser
**Todo**

- [ ] parse pitch bends
- [ ] after tempo changes notes and measure time do not align,      see "[Test] Tempo change.mid"


* [fileFormats/MidiParser](#module_fileFormats/MidiParser)
    * _static_
        * [.preprocessMidiFileData(data, splitFormat0IntoTracks, log)](#module_fileFormats/MidiParser.preprocessMidiFileData) ⇒ <code>object</code>
    * _inner_
        * [~EVENT_TYPES](#module_fileFormats/MidiParser..EVENT_TYPES) : <code>object</code>
        * [~META_TYPES](#module_fileFormats/MidiParser..META_TYPES) : <code>object</code>
        * [~KEY_SIG_MAP](#module_fileFormats/MidiParser..KEY_SIG_MAP) : <code>Map.&lt;number, object&gt;</code>
        * [~getMeasureIndices(notes, measureTimes)](#module_fileFormats/MidiParser..getMeasureIndices) ⇒ <code>Array.&lt;number&gt;</code>

<a name="module_fileFormats/MidiParser.preprocessMidiFileData"></a>

### fileFormats/MidiParser.preprocessMidiFileData(data, splitFormat0IntoTracks, log) ⇒ <code>object</code>
Parses a MIDI JSON file to get Note objects with absolute time in seconds.

**Kind**: static method of [<code>fileFormats/MidiParser</code>](#module_fileFormats/MidiParser)  
**Returns**: <code>object</code> - including an array of note objects and meta information  
**See**: https://github.com/colxi/midi-parser-js/wiki/MIDI-File-Format-Specifications  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | MIDI data in JSON format |
| splitFormat0IntoTracks | <code>boolean</code> | split MIDI format 0 data into tracks      instead of using channels? |
| log | <code>boolean</code> | set to true to log results etc. to the console |

<a name="module_fileFormats/MidiParser..EVENT_TYPES"></a>

### fileFormats/MidiParser~EVENT\_TYPES : <code>object</code>
MIDI event types and meta types and their codes

**Kind**: inner constant of [<code>fileFormats/MidiParser</code>](#module_fileFormats/MidiParser)  
**See**: https://github.com/colxi/midi-parser-js/wiki/MIDI-File-Format-SpecificationsEvent Type         Value   Value decimal    Parameter 1         Parameter 2Note Off           0x8       8              note number         velocityNote On            0x9       9              note number         velocityNote Aftertouch    0xA      10              note number         aftertouch valueController         0xB      11              controller number   controller valueProgram Change     0xC      12              program number      not usedChannel Aftertouch 0xD      13              aftertouch value    not usedPitch Bend         0xE      14              pitch value (LSB)   pitch value (MSB)Meta               0xFF    255                 parameters depend on meta type  
<a name="module_fileFormats/MidiParser..META_TYPES"></a>

### fileFormats/MidiParser~META\_TYPES : <code>object</code>
**Kind**: inner constant of [<code>fileFormats/MidiParser</code>](#module_fileFormats/MidiParser)  
<a name="module_fileFormats/MidiParser..KEY_SIG_MAP"></a>

### fileFormats/MidiParser~KEY\_SIG\_MAP : <code>Map.&lt;number, object&gt;</code>
Maps needed for key signature detection from number of sharps / flats

**Kind**: inner constant of [<code>fileFormats/MidiParser</code>](#module_fileFormats/MidiParser)  
**See**: https://www.recordingblogs.com/wiki/midi-key-signature-meta-message  
<a name="module_fileFormats/MidiParser..getMeasureIndices"></a>

### fileFormats/MidiParser~getMeasureIndices(notes, measureTimes) ⇒ <code>Array.&lt;number&gt;</code>
For the notes of one track, computes the notes' indices where new measuresstart.

**Kind**: inner method of [<code>fileFormats/MidiParser</code>](#module_fileFormats/MidiParser)  
**Returns**: <code>Array.&lt;number&gt;</code> - measure indices  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes of a track |
| measureTimes | <code>Array.&lt;numer&gt;</code> | times in seconds where new measures start |

<a name="module_fileFormats/MusicXmlParser"></a>

## fileFormats/MusicXmlParser

* [fileFormats/MusicXmlParser](#module_fileFormats/MusicXmlParser)
    * _static_
        * [.preprocessMusicXmlData(xml, log)](#module_fileFormats/MusicXmlParser.preprocessMusicXmlData) ⇒ <code>object</code>
    * _inner_
        * [~keySignatureMap](#module_fileFormats/MusicXmlParser..keySignatureMap) : <code>Map.&lt;number, object&gt;</code>
        * [~dynamicsMap](#module_fileFormats/MusicXmlParser..dynamicsMap) : <code>Map.&lt;string, number&gt;</code>
        * [~removeRehearsalRepetitions(measureRehearsalMap)](#module_fileFormats/MusicXmlParser..removeRehearsalRepetitions) ⇒ <code>Map.&lt;number, string&gt;</code>
        * [~getLyricsFromNote(note)](#module_fileFormats/MusicXmlParser..getLyricsFromNote) ⇒ <code>string</code>
        * [~getDrumInstrumentMap(xml)](#module_fileFormats/MusicXmlParser..getDrumInstrumentMap) ⇒ <code>Map</code>

<a name="module_fileFormats/MusicXmlParser.preprocessMusicXmlData"></a>

### fileFormats/MusicXmlParser.preprocessMusicXmlData(xml, log) ⇒ <code>object</code>
Converts a collection of MusicXML measures to JavaScript Objects with timing information in seconds.
Also calculates the position of measure lines and the total time in seconds.

**Kind**: static method of [<code>fileFormats/MusicXmlParser</code>](#module_fileFormats/MusicXmlParser)  
**Returns**: <code>object</code> - parsed document  

| Param | Type | Description |
| --- | --- | --- |
| xml | <code>XMLDocument</code> | MusicXML document |
| log | <code>boolean</code> | set to true to log results etc. to the console |

<a name="module_fileFormats/MusicXmlParser..keySignatureMap"></a>

### fileFormats/MusicXmlParser~keySignatureMap : <code>Map.&lt;number, object&gt;</code>
Map from fiths to key signature

**Kind**: inner constant of [<code>fileFormats/MusicXmlParser</code>](#module_fileFormats/MusicXmlParser)  
<a name="module_fileFormats/MusicXmlParser..dynamicsMap"></a>

### fileFormats/MusicXmlParser~dynamicsMap : <code>Map.&lt;string, number&gt;</code>
Maps dynamics to MIDI velocity numbers, i.e. 'ff' to 102

**Kind**: inner constant of [<code>fileFormats/MusicXmlParser</code>](#module_fileFormats/MusicXmlParser)  
<a name="module_fileFormats/MusicXmlParser..removeRehearsalRepetitions"></a>

### fileFormats/MusicXmlParser~removeRehearsalRepetitions(measureRehearsalMap) ⇒ <code>Map.&lt;number, string&gt;</code>
Removes duplicates from measureRehearsalMap, which occur when a measure was
repeated

**Kind**: inner method of [<code>fileFormats/MusicXmlParser</code>](#module_fileFormats/MusicXmlParser)  
**Returns**: <code>Map.&lt;number, string&gt;</code> - cleaned map  

| Param | Type | Description |
| --- | --- | --- |
| measureRehearsalMap | <code>Map.&lt;number, string&gt;</code> | map |

<a name="module_fileFormats/MusicXmlParser..getLyricsFromNote"></a>

### fileFormats/MusicXmlParser~getLyricsFromNote(note) ⇒ <code>string</code>
Reads lyrics from a note element

**Kind**: inner method of [<code>fileFormats/MusicXmlParser</code>](#module_fileFormats/MusicXmlParser)  
**Returns**: <code>string</code> - lyrics for this note  

| Param | Type | Description |
| --- | --- | --- |
| note | <code>HTMLElement</code> | note element |

<a name="module_fileFormats/MusicXmlParser..getDrumInstrumentMap"></a>

### fileFormats/MusicXmlParser~getDrumInstrumentMap(xml) ⇒ <code>Map</code>
Returns a map containing maps, such that result.get(partId).get(instrId)
gives you the instrument with the ID instrId as defined in the part partId.

This is needed to map drum notes to MIDI pitches.

**Kind**: inner method of [<code>fileFormats/MusicXmlParser</code>](#module_fileFormats/MusicXmlParser)  
**Returns**: <code>Map</code> - map with structure result.get(partId).get(instrId)  

| Param | Type | Description |
| --- | --- | --- |
| xml | <code>XMLDocument</code> | MusicXML |

<a name="module_graphics/Canvas"></a>

## graphics/Canvas
**Todo**

- [ ] combine multiple canvases into one, by drawing over common background
- [ ] save canvas as file https://www.digitalocean.com/community/tutorials/js-canvas-toblob


* [graphics/Canvas](#module_graphics/Canvas)
    * [.setupCanvas(canvas)](#module_graphics/Canvas.setupCanvas) ⇒ <code>CanvasRenderingContext2D</code>
    * [.drawLine(context, x1, y1, x2, y2)](#module_graphics/Canvas.drawLine) ⇒ <code>void</code>
    * ~~[.drawHLine(context, x1, y, x2)](#module_graphics/Canvas.drawHLine) ⇒ <code>void</code>~~
    * ~~[.drawVLine(context, x, y1, y2)](#module_graphics/Canvas.drawVLine) ⇒ <code>void</code>~~
    * [.drawBowRight(context, x1, y1, x2, y2, [strength])](#module_graphics/Canvas.drawBowRight)
    * [.drawCircle(context, x, y, radius)](#module_graphics/Canvas.drawCircle) ⇒ <code>void</code>
    * [.drawFilledCircle(context, x, y, radius)](#module_graphics/Canvas.drawFilledCircle) ⇒ <code>void</code>
    * [.drawTriangle(context, x, y, halfSize)](#module_graphics/Canvas.drawTriangle) ⇒ <code>void</code>
    * [.drawDiamond(context, x, y, halfSize)](#module_graphics/Canvas.drawDiamond) ⇒ <code>void</code>
    * [.drawX(context, x, y, halfSize)](#module_graphics/Canvas.drawX) ⇒ <code>void</code>
    * [.drawNoteTrapezoid(context, x, y, width, height, height2)](#module_graphics/Canvas.drawNoteTrapezoid) ⇒ <code>void</code>
    * [.drawNoteTrapezoidUpwards(context, x, y, width, height, width2)](#module_graphics/Canvas.drawNoteTrapezoidUpwards) ⇒ <code>void</code>
    * [.drawRoundedRect(context, x, y, width, height, radius)](#module_graphics/Canvas.drawRoundedRect) ⇒ <code>void</code>
    * [.drawCornerLine(context, x1, y1, x2, y2, [xFirst])](#module_graphics/Canvas.drawCornerLine)
    * [.drawRoundedCornerLine(context, x1, y1, x2, y2, [maxRadius])](#module_graphics/Canvas.drawRoundedCornerLine)
    * [.drawRoundedCornerLineRightLeft(context, x1, y1, x2, y2, [maxRadius])](#module_graphics/Canvas.drawRoundedCornerLineRightLeft)
    * [.drawHexagon(context, cx, cy, radius)](#module_graphics/Canvas.drawHexagon)
    * [.drawBezierConnectorX(context, x1, y1, x2, y2)](#module_graphics/Canvas.drawBezierConnectorX)
    * [.drawBezierConnectorY(context, x1, y1, x2, y2)](#module_graphics/Canvas.drawBezierConnectorY)
    * [.drawRoundedCorner(context, x1, y1, x2, y2, turnLeft, roundness)](#module_graphics/Canvas.drawRoundedCorner)
    * [.drawArc(context, startX1, startX2, length, yBottom)](#module_graphics/Canvas.drawArc)
    * [.drawAssymetricArc(context, startX1, endX1, startX2, endX2, yBottom)](#module_graphics/Canvas.drawAssymetricArc)
    * [.drawBracketH(context, x, y, w, h)](#module_graphics/Canvas.drawBracketH)
    * [.drawMatrix(context, matrix, [x], [y], [size], colorMap)](#module_graphics/Canvas.drawMatrix)
    * [.drawColorRamp(context, colorMap)](#module_graphics/Canvas.drawColorRamp)

<a name="module_graphics/Canvas.setupCanvas"></a>

### graphics/Canvas.setupCanvas(canvas) ⇒ <code>CanvasRenderingContext2D</code>
Sets up a canvas rescaled to device pixel ratio

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  
**Returns**: <code>CanvasRenderingContext2D</code> - canvas rendering context  

| Param | Type | Description |
| --- | --- | --- |
| canvas | <code>HTMLCanvasElement</code> | canvas element |

<a name="module_graphics/Canvas.drawLine"></a>

### graphics/Canvas.drawLine(context, x1, y1, x2, y2) ⇒ <code>void</code>
Draws a stroked straight line.

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> | canvas rendering context |
| x1 | <code>number</code> | x coordinate of the start |
| y1 | <code>number</code> | y coordinate of the start |
| x2 | <code>number</code> | x coordinate of end |
| y2 | <code>number</code> | y coordinate of end |

**Example**  
```js
// Set the strokeStyle first     context.strokeStyle = 'black';     // Let's draw an X     Canvas.drawLine(context, 0, 0, 50, 50);     Canvas.drawLine(context, 0, 50, 50, 0);
```
<a name="module_graphics/Canvas.drawHLine"></a>

### ~~graphics/Canvas.drawHLine(context, x1, y, x2) ⇒ <code>void</code>~~
***Deprecated***

Draws a stroked straight horizontal line.

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> | canvas rendering context |
| x1 | <code>number</code> | x coordinate of the start |
| y | <code>number</code> | y coordinate of the start |
| x2 | <code>number</code> | x coordinate of end |

<a name="module_graphics/Canvas.drawVLine"></a>

### ~~graphics/Canvas.drawVLine(context, x, y1, y2) ⇒ <code>void</code>~~
***Deprecated***

Draws a stroked straight vertical line.

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> | canvas rendering context |
| x | <code>number</code> | x coordinate of the start |
| y1 | <code>number</code> | y coordinate of the start |
| y2 | <code>number</code> | y coordinate of end |

<a name="module_graphics/Canvas.drawBowRight"></a>

### graphics/Canvas.drawBowRight(context, x1, y1, x2, y2, [strength])
Draws a line that bows to the right in the direction of travel (looks like aleft turn), thereby encoding direction. Useful for node-link graphs.

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> |  | canvas rendering context |
| x1 | <code>number</code> |  | x coordinate of the start |
| y1 | <code>number</code> |  | y coordinate of the start |
| x2 | <code>number</code> |  | x coordinate of end |
| y2 | <code>number</code> |  | y coordinate of end |
| [strength] | <code>number</code> | <code>0.5</code> | how much the bow deviates from a straight line      towards the right, negative values will make bows to the left |

<a name="module_graphics/Canvas.drawCircle"></a>

### graphics/Canvas.drawCircle(context, x, y, radius) ⇒ <code>void</code>
Draws a stroked circle.

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> | canvas rendering context |
| x | <code>number</code> | x coordinate of center |
| y | <code>number</code> | y coordinate of center |
| radius | <code>number</code> | radius |

<a name="module_graphics/Canvas.drawFilledCircle"></a>

### graphics/Canvas.drawFilledCircle(context, x, y, radius) ⇒ <code>void</code>
Draws a filled circle.

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> | canvas rendering context |
| x | <code>number</code> | x coordinate of center |
| y | <code>number</code> | y coordinate of center |
| radius | <code>number</code> | radius |

<a name="module_graphics/Canvas.drawTriangle"></a>

### graphics/Canvas.drawTriangle(context, x, y, halfSize) ⇒ <code>void</code>
Draws a filled triangle like this: /\

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> | canvas rendering context |
| x | <code>number</code> | x coordinate of center |
| y | <code>number</code> | y coordinate of center |
| halfSize | <code>number</code> | half of the size |

<a name="module_graphics/Canvas.drawDiamond"></a>

### graphics/Canvas.drawDiamond(context, x, y, halfSize) ⇒ <code>void</code>
Draws a diamond like this: <>

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> | canvas rendering context |
| x | <code>number</code> | x coordinate of center |
| y | <code>number</code> | y coordinate of center |
| halfSize | <code>number</code> | half of the size |

<a name="module_graphics/Canvas.drawX"></a>

### graphics/Canvas.drawX(context, x, y, halfSize) ⇒ <code>void</code>
Draws an X

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> | canvas rendering context |
| x | <code>number</code> | x coordinate of center |
| y | <code>number</code> | y coordinate of center |
| halfSize | <code>number</code> | half of the size |

<a name="module_graphics/Canvas.drawNoteTrapezoid"></a>

### graphics/Canvas.drawNoteTrapezoid(context, x, y, width, height, height2) ⇒ <code>void</code>
Draws a trapezoid that looks like a rectangle but gets narrower at the rightend, so better show where one ends and the next begins.

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> | canvas rendering context |
| x | <code>number</code> | x coordinate of top left |
| y | <code>number</code> | y coordinate of top left |
| width | <code>number</code> | width |
| height | <code>number</code> | height (of left side) |
| height2 | <code>number</code> | height (of right side) |

<a name="module_graphics/Canvas.drawNoteTrapezoidUpwards"></a>

### graphics/Canvas.drawNoteTrapezoidUpwards(context, x, y, width, height, width2) ⇒ <code>void</code>
Draws a trapezoid that looks like a rectangle but gets narrower at the topend, so better show where one ends and the next begins.

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> | canvas rendering context |
| x | <code>number</code> | x coordinate of bounding rect's top left |
| y | <code>number</code> | y coordinate of bounding rect's top left |
| width | <code>number</code> | width (of bounding rect / bottom side) |
| height | <code>number</code> | height |
| width2 | <code>number</code> | width (of top side) |

<a name="module_graphics/Canvas.drawRoundedRect"></a>

### graphics/Canvas.drawRoundedRect(context, x, y, width, height, radius) ⇒ <code>void</code>
Draws a rectangle with rounded corners, does not fill or stroke by itself

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> | canvas rendering context |
| x | <code>number</code> | x coordinate of bounding rect's top left |
| y | <code>number</code> | y coordinate of bounding rect's top left |
| width | <code>number</code> | width |
| height | <code>number</code> | height |
| radius | <code>number</code> | rounding radius |

<a name="module_graphics/Canvas.drawCornerLine"></a>

### graphics/Canvas.drawCornerLine(context, x1, y1, x2, y2, [xFirst])
Draws a horizontal, then vertical line to connect two points (or the otherway round when xFirst == false)

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> |  | canvas rendering context |
| x1 | <code>number</code> |  | x coordinate of start |
| y1 | <code>number</code> |  | y coordinate of start |
| x2 | <code>number</code> |  | x coordinate of end |
| y2 | <code>number</code> |  | y coordinate of end |
| [xFirst] | <code>boolean</code> | <code>true</code> | controls whether to go first in x or y direction |

<a name="module_graphics/Canvas.drawRoundedCornerLine"></a>

### graphics/Canvas.drawRoundedCornerLine(context, x1, y1, x2, y2, [maxRadius])
Draws a rounded version of drawCornerLine().Only works for dendrograms drawn from top-dowm, usedrawRoundedCornerLineRightLeft for right-to-left dendrograms.

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> |  | canvas rendering context |
| x1 | <code>number</code> |  | x coordinate of start |
| y1 | <code>number</code> |  | y coordinate of start |
| x2 | <code>number</code> |  | x coordinate of end |
| y2 | <code>number</code> |  | y coordinate of end |
| [maxRadius] | <code>number</code> | <code>25</code> | maximum radius, fixes possible overlaps |

<a name="module_graphics/Canvas.drawRoundedCornerLineRightLeft"></a>

### graphics/Canvas.drawRoundedCornerLineRightLeft(context, x1, y1, x2, y2, [maxRadius])
Draws a rounded version of drawRoundedCornerLine for right-to-leftdendrograms.

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> |  | canvas rendering context |
| x1 | <code>number</code> |  | x coordinate of start |
| y1 | <code>number</code> |  | y coordinate of start |
| x2 | <code>number</code> |  | x coordinate of end |
| y2 | <code>number</code> |  | y coordinate of end |
| [maxRadius] | <code>number</code> | <code>25</code> | maximum radius, fixes possible overlaps |

<a name="module_graphics/Canvas.drawHexagon"></a>

### graphics/Canvas.drawHexagon(context, cx, cy, radius)
Draws a hexagon, call context.fill() or context.stroke() afterwards.

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> | canvas rendering context |
| cx | <code>number</code> | center x |
| cy | <code>number</code> | center y |
| radius | <code>number</code> | radius of the circle on which the points are placed |

<a name="module_graphics/Canvas.drawBezierConnectorX"></a>

### graphics/Canvas.drawBezierConnectorX(context, x1, y1, x2, y2)
Draws a Bezier curve to connect to points in X direction.

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> | canvas rendering context |
| x1 | <code>number</code> | x coordinate of the first point |
| y1 | <code>number</code> | y coordinate of the first point |
| x2 | <code>number</code> | x coordinate of the second point |
| y2 | <code>number</code> | y coordinate of the second point |

<a name="module_graphics/Canvas.drawBezierConnectorY"></a>

### graphics/Canvas.drawBezierConnectorY(context, x1, y1, x2, y2)
Draws a Bezier curve to connect to points in Y direction.

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> | canvas rendering context |
| x1 | <code>number</code> | x coordinate of the first point |
| y1 | <code>number</code> | y coordinate of the first point |
| x2 | <code>number</code> | x coordinate of the second point |
| y2 | <code>number</code> | y coordinate of the second point |

<a name="module_graphics/Canvas.drawRoundedCorner"></a>

### graphics/Canvas.drawRoundedCorner(context, x1, y1, x2, y2, turnLeft, roundness)
Draws a rounded corner, requires x and y distances between points to beequal.

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> | canvas rendering context |
| x1 | <code>number</code> | x coordinate of the first point |
| y1 | <code>number</code> | y coordinate of the first point |
| x2 | <code>number</code> | x coordinate of the second point |
| y2 | <code>number</code> | y coordinate of the second point |
| turnLeft | <code>boolean</code> | true for left turn, false for right turn |
| roundness | <code>number</code> | corner roundness between 0 (sharp) and 1 (round) |

<a name="module_graphics/Canvas.drawArc"></a>

### graphics/Canvas.drawArc(context, startX1, startX2, length, yBottom)
Draws an arc that connects similar parts.Both parts must have the same width in pixels.

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> | canvas rendering context |
| startX1 | <code>number</code> | x coordinate of the start of the first part |
| startX2 | <code>number</code> | x coordinate of the start of the second part |
| length | <code>number</code> | length in pixels of the parts |
| yBottom | <code>number</code> | bottom baseline y coordinate |

<a name="module_graphics/Canvas.drawAssymetricArc"></a>

### graphics/Canvas.drawAssymetricArc(context, startX1, endX1, startX2, endX2, yBottom)
Draws a more complex path and fills it.Two arcs: One from startX1 to endX2 on the top, one from endX1 to startX2below it.

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> | canvas rendering context |
| startX1 | <code>number</code> | x coordinate of the start of the first part |
| endX1 | <code>number</code> | x coordinate of the end of the first part |
| startX2 | <code>number</code> | x coordinate of the start of the second part |
| endX2 | <code>number</code> | x coordinate of the end of the second part |
| yBottom | <code>number</code> | bottom baseline y coordinate |

<a name="module_graphics/Canvas.drawBracketH"></a>

### graphics/Canvas.drawBracketH(context, x, y, w, h)
Draws a horizontal bracket like this |_____| (bottom)or this |""""""| (top).Use a positive h for bottom and a negative one for top.

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> | canvas rendering context |
| x | <code>number</code> | x position of the bracket's horizontal lines |
| y | <code>number</code> | y position of the bracket's horizontal lines |
| w | <code>number</code> | width of the bracket's horizontal lines |
| h | <code>number</code> | height of the bracket's vertical ticks |

<a name="module_graphics/Canvas.drawMatrix"></a>

### graphics/Canvas.drawMatrix(context, matrix, [x], [y], [size], colorMap)
Draws a quadratic matrix onto a canvas

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> |  | canvas rendering context |
| matrix | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> |  | matrix |
| [x] | <code>number</code> | <code>0</code> | x position of the top left corner |
| [y] | <code>number</code> | <code>0</code> | y position of the top left corner |
| [size] | <code>number</code> | <code>400</code> | width and height in pixel |
| colorMap | <code>function</code> |  | colormap from [min, max] to a color |

<a name="module_graphics/Canvas.drawColorRamp"></a>

### graphics/Canvas.drawColorRamp(context, colorMap)
Draws a color ramp

**Kind**: static method of [<code>graphics/Canvas</code>](#module_graphics/Canvas)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> | canvas rendering context |
| colorMap | <code>function</code> | colormap from [min, max] to a color |

<a name="module_Svg"></a>

## Svg
**Todo**

- [ ] test
- [ ] export


* [Svg](#module_Svg)
    * [.getSvgArrowTipPath(toX, toY, pointTo, tipSize)](#module_Svg.getSvgArrowTipPath) ⇒ <code>string</code>
    * [.getSvgCArrowPath(fromX, fromY, toX, toY, pointTo, tipSize)](#module_Svg.getSvgCArrowPath) ⇒ <code>string</code>
    * [.getSvgCArrowPath2(fromX, fromY, toX, toY, width, pointTo, tipSize)](#module_Svg.getSvgCArrowPath2) ⇒ <code>string</code>
    * [.getSvgHorizontalSArrowPath(fromX, fromY, toX, toY, tipSize, pointTo)](#module_Svg.getSvgHorizontalSArrowPath) ⇒ <code>string</code>
    * [.getSvgVerticalSArrowPath(fromX, fromY, toX, toY, tipSize, pointTo)](#module_Svg.getSvgVerticalSArrowPath) ⇒ <code>string</code>

<a name="module_Svg.getSvgArrowTipPath"></a>

### Svg.getSvgArrowTipPath(toX, toY, pointTo, tipSize) ⇒ <code>string</code>
Draws an arrow tip with two straight lines.

**Kind**: static method of [<code>Svg</code>](#module_Svg)  
**Returns**: <code>string</code> - arrow tip SVG path 'd' attribute  

| Param | Type | Description |
| --- | --- | --- |
| toX | <code>number</code> | x coordinate where the arrow is pointing |
| toY | <code>number</code> | y coordinate where the arrow is pointing |
| pointTo | <code>string</code> | top, right, bottom, left, top-right, top-left,      bottom-right, bottom-left |
| tipSize | <code>number</code> | size of the arrow tip |

<a name="module_Svg.getSvgCArrowPath"></a>

### Svg.getSvgCArrowPath(fromX, fromY, toX, toY, pointTo, tipSize) ⇒ <code>string</code>
Creates a roughly C-shaped arrow (quarter ellipse).

**Kind**: static method of [<code>Svg</code>](#module_Svg)  
**Returns**: <code>string</code> - SVG path 'd' attribute  

| Param | Type | Description |
| --- | --- | --- |
| fromX | <code>number</code> | starting x |
| fromY | <code>number</code> | starting y |
| toX | <code>number</code> | target x |
| toY | <code>number</code> | target y |
| pointTo | <code>string</code> | top, right, bottom, left, top-right, top-left,      bottom-right, bottom-left |
| tipSize | <code>number</code> | size of the tip |

<a name="module_Svg.getSvgCArrowPath2"></a>

### Svg.getSvgCArrowPath2(fromX, fromY, toX, toY, width, pointTo, tipSize) ⇒ <code>string</code>
Creates a C-shaped arrow (half elipse).

**Kind**: static method of [<code>Svg</code>](#module_Svg)  
**Returns**: <code>string</code> - SVG path 'd' attribute  

| Param | Type | Description |
| --- | --- | --- |
| fromX | <code>number</code> | starting x |
| fromY | <code>number</code> | starting y |
| toX | <code>number</code> | target x |
| toY | <code>number</code> | target y |
| width | <code>number</code> | width |
| pointTo | <code>string</code> | top, right, bottom, left, top-right, top-left,      bottom-right, bottom-left |
| tipSize | <code>number</code> | size of the tip |

<a name="module_Svg.getSvgHorizontalSArrowPath"></a>

### Svg.getSvgHorizontalSArrowPath(fromX, fromY, toX, toY, tipSize, pointTo) ⇒ <code>string</code>
Creates a roughly S-shaped arrow (horizontal).

**Kind**: static method of [<code>Svg</code>](#module_Svg)  
**Returns**: <code>string</code> - SVG path 'd' attribute  

| Param | Type | Description |
| --- | --- | --- |
| fromX | <code>number</code> | starting x |
| fromY | <code>number</code> | starting y |
| toX | <code>number</code> | target x |
| toY | <code>number</code> | target y |
| tipSize | <code>number</code> | size of the tip |
| pointTo | <code>string</code> | top, right, bottom, left, top-right, top-left,      bottom-right, bottom-left |

<a name="module_Svg.getSvgVerticalSArrowPath"></a>

### Svg.getSvgVerticalSArrowPath(fromX, fromY, toX, toY, tipSize, pointTo) ⇒ <code>string</code>
Creates a roughly S-shaped arrow (vertical).

**Kind**: static method of [<code>Svg</code>](#module_Svg)  
**Returns**: <code>string</code> - SVG path 'd' attribute  

| Param | Type | Description |
| --- | --- | --- |
| fromX | <code>number</code> | starting x |
| fromY | <code>number</code> | starting y |
| toX | <code>number</code> | target x |
| toY | <code>number</code> | target y |
| tipSize | <code>number</code> | size of the tip |
| pointTo | <code>string</code> | top, right, bottom, left, top-right, top-left,      bottom-right, bottom-left |

<a name="module_musicvis-lib"></a>

## musicvis-lib
<a name="module_musicvis-lib.getVersion"></a>

### musicvis-lib.getVersion() ⇒ <code>string</code>
Returns the current version of the library

**Kind**: static method of [<code>musicvis-lib</code>](#module_musicvis-lib)  
**Returns**: <code>string</code> - version string  
<a name="module_input/AudioRecorder"></a>

## input/AudioRecorder ⇒ <code>Promise</code>
Allows to record audio blobs.

**Returns**: <code>Promise</code> - audio recorder  
**See**

- https://medium.com/@bryanjenningz/how-to-record-and-play-audio-in-javascript-faa1b2b3e49b
- https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

**Example** *(Usage (only in async functions))*  
```js
    const recorder = await recordAudio();
    recorder.start();
    // ...
    const audio = await recorder.stop();
stop() returns a Blob with audio data
```
<a name="module_input/MidiInputManager"></a>

## input/MidiInputManager
Handles incoming MIDI messages from a MIDI device.


* [input/MidiInputManager](#module_input/MidiInputManager)
    * [~MidiInputManager](#module_input/MidiInputManager..MidiInputManager)
        * [new MidiInputManager(getMidiLiveData, setMidiLiveData, addCurrentNote, removeCurrentNote)](#new_module_input/MidiInputManager..MidiInputManager_new)

<a name="module_input/MidiInputManager..MidiInputManager"></a>

### input/MidiInputManager~MidiInputManager
**Kind**: inner class of [<code>input/MidiInputManager</code>](#module_input/MidiInputManager)  
<a name="new_module_input/MidiInputManager..MidiInputManager_new"></a>

#### new MidiInputManager(getMidiLiveData, setMidiLiveData, addCurrentNote, removeCurrentNote)
Constructor with callback functions


| Param | Type | Description |
| --- | --- | --- |
| getMidiLiveData | <code>function</code> | a function called by this object to get      the currently recorded MIDI notes from App.js, where the      MidiInputManager instance should be created      Example for how to defined getMidiLiveData as method in App.js:          getMidiLiveData = () => this.state.midiLiveData; |
| setMidiLiveData | <code>function</code> | a function called by this object to      update the currently MIDI notes in App.js      Example:          setMidiLiveData = (data) => {              // Work-around so note_off event handling can              // immediately find the note_on event              this.state.midiLiveData = data;              this.setState({ midiLiveData: data });          }; |
| addCurrentNote | <code>function</code> | a function called by this object to add      a currently played note (e.g. currently pressed piano key)      Example:          addCurrentNote = (note) => {              const newMap = new Map(this.state.currentNotes).set(note.pitch, note);              this.setState({ currentNotes: newMap });          } |
| removeCurrentNote | <code>function</code> | a function called by this object to      remove a currently played note      Example:          removeCurrentNote = (pitch) => {              const newMap = new Map(this.state.currentNotes).delete(pitch);              this.setState({ currentNotes: newMap });          } |

<a name="module_input/MidiRecorder"></a>

## input/MidiRecorder ⇒ <code>Promise</code>
Records incoming MIDI messages from a MIDI device.

**Returns**: <code>Promise</code> - MIDI recorder  

| Param | Type | Description |
| --- | --- | --- |
| [onMessage] | <code>function</code> | a callback function to get notfied of incoming      messages |

**Example** *(Usage (only in async functions))*  
```js
    const recorder = await recordMidi();
    recorder.start();
    const notes = recorder.stop();
```
<a name="module_instruments/Drums"></a>

## instruments/Drums

* [instruments/Drums](#module_instruments/Drums)
    * [.DRUM_PARTS](#module_instruments/Drums.DRUM_PARTS) : <code>object</code>
    * [.DRUM_ACTIONS](#module_instruments/Drums.DRUM_ACTIONS) : <code>object</code>
    * [.DRUM_PARTS_ACTIONS](#module_instruments/Drums.DRUM_PARTS_ACTIONS) : <code>object</code>
    * [.drumPitchReplacementMapMPS850](#module_instruments/Drums.drumPitchReplacementMapMPS850) : <code>Map.&lt;number, object&gt;</code>
    * [.generateDrumVariation(data, deviation, pAdd, pRemove)](#module_instruments/Drums.generateDrumVariation) ⇒ [<code>Array.&lt;Note&gt;</code>](#Note)
    * [.simplifyDrumPitches(notes, replacementMap)](#module_instruments/Drums.simplifyDrumPitches) ⇒ <code>Array.&lt;Notes&gt;</code>
    * [.getPitch2PositionMap(replacementMap)](#module_instruments/Drums.getPitch2PositionMap) ⇒ <code>Map</code>

<a name="module_instruments/Drums.DRUM_PARTS"></a>

### instruments/Drums.DRUM\_PARTS : <code>object</code>
Drum parts

**Kind**: static constant of [<code>instruments/Drums</code>](#module_instruments/Drums)  
<a name="module_instruments/Drums.DRUM_ACTIONS"></a>

### instruments/Drums.DRUM\_ACTIONS : <code>object</code>
Drum actions

**Kind**: static constant of [<code>instruments/Drums</code>](#module_instruments/Drums)  
<a name="module_instruments/Drums.DRUM_PARTS_ACTIONS"></a>

### instruments/Drums.DRUM\_PARTS\_ACTIONS : <code>object</code>
Drum parts and actions

**Kind**: static constant of [<code>instruments/Drums</code>](#module_instruments/Drums)  
**Todo**

- [ ] still incomplete

<a name="module_instruments/Drums.drumPitchReplacementMapMPS850"></a>

### instruments/Drums.drumPitchReplacementMapMPS850 : <code>Map.&lt;number, object&gt;</code>
Pitches that are mapped onto themselves are included for other information.Millenium MPS-850 https://www.thomann.de/de/millenium_mps_850_e_drum_set.htmNotation info (line and shape of symbol) so drum notation can generate a lookup from thishttps://en.wikipedia.org/wiki/Percussion_notation#/media/File:Sibelius_drum_legend.pngLines start with 0 at the top above the top most horizontal notation line,using incremental integers for every possible position, i.e. for on and between linesLegend: Map key: The orignal pitch from the input data repPitch: Replacement pitch, used to simplify multiple zones into one zone: Zone of the instrument this pitch comes from order: visual order ranking of this intrumentin the UI (top-bottom or left-right) line: y position in the drum notation (using integers for every possible position) shape: Note shape in notation: triangle, <>, x, o, ostroke, xstroke label: Short label for this intrument name: Full name of this instrument

**Kind**: static constant of [<code>instruments/Drums</code>](#module_instruments/Drums)  
<a name="module_instruments/Drums.generateDrumVariation"></a>

### instruments/Drums.generateDrumVariation(data, deviation, pAdd, pRemove) ⇒ [<code>Array.&lt;Note&gt;</code>](#Note)
Generates a variation of an array of notes by adding, removing or changing notes

**Kind**: static method of [<code>instruments/Drums</code>](#module_instruments/Drums)  
**Returns**: [<code>Array.&lt;Note&gt;</code>](#Note) - variated Note array  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Array.&lt;Note&gt;</code>](#Note) | array of notes |
| deviation | <code>number</code> | width of the Gauss kernel |
| pAdd | <code>number</code> | probability of adding a note after each note |
| pRemove | <code>number</code> | probability of removing each note |

<a name="module_instruments/Drums.simplifyDrumPitches"></a>

### instruments/Drums.simplifyDrumPitches(notes, replacementMap) ⇒ <code>Array.&lt;Notes&gt;</code>
Replaces pitches based on replacementMap

**Kind**: static method of [<code>instruments/Drums</code>](#module_instruments/Drums)  
**Returns**: <code>Array.&lt;Notes&gt;</code> - notes with replaced pitches  
**Throws**:

- <code>&#x27;No replacement map given!&#x27;</code> when replacementMap is missing


| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |
| replacementMap | <code>Map</code> | a map pitch->replacementPitch |

<a name="module_instruments/Drums.getPitch2PositionMap"></a>

### instruments/Drums.getPitch2PositionMap(replacementMap) ⇒ <code>Map</code>
Returns a Map:pitch->yPosIndex for views to lookup which rowa pitch has to be drawn in

**Kind**: static method of [<code>instruments/Drums</code>](#module_instruments/Drums)  
**Returns**: <code>Map</code> - Map:pitch->yPosIndex  

| Param | Type | Description |
| --- | --- | --- |
| replacementMap | <code>Map</code> | a pitch replacement map |

<a name="module_instruments/Guitar"></a>

## instruments/Guitar

* [instruments/Guitar](#module_instruments/Guitar)
    * [.StringedTuning](#module_instruments/Guitar.StringedTuning)
        * [new exports.StringedTuning(name, notes)](#new_module_instruments/Guitar.StringedTuning_new)
    * [.stringedTunings](#module_instruments/Guitar.stringedTunings) : <code>Map.&lt;string, Map.&lt;number, StringedTuning&gt;&gt;</code>
    * [.stringColors](#module_instruments/Guitar.stringColors) : <code>Array.&lt;string&gt;</code>
    * [.guitarNoteFromNote(note, tuning)](#module_instruments/Guitar.guitarNoteFromNote) ⇒ [<code>GuitarNote</code>](#GuitarNote)
    * [.getTuningFromPitches(pitches)](#module_instruments/Guitar.getTuningFromPitches) ⇒ <code>StringedTuning</code> \| <code>null</code>
    * [.getTuningPitchRange(tuning, fretCount)](#module_instruments/Guitar.getTuningPitchRange) ⇒ <code>Array.&lt;number&gt;</code>
    * [.getPitchFromFretboardPos(string, fret, tuning)](#module_instruments/Guitar.getPitchFromFretboardPos) ⇒ <code>number</code>
    * [.getNoteInfoFromFretboardPos(string, fret, tuning)](#module_instruments/Guitar.getNoteInfoFromFretboardPos) ⇒ <code>object</code>
    * [.getFretboardPositionsFromPitch(pitch, tuning, fretCount)](#module_instruments/Guitar.getFretboardPositionsFromPitch) ⇒ <code>Array.&lt;object&gt;</code>
    * [.getFretboardPositionsFromNoteName(name, tuning, fretCount)](#module_instruments/Guitar.getFretboardPositionsFromNoteName) ⇒ <code>Array.&lt;object&gt;</code>
    * [.generateExampleData(startTime, count, tuning)](#module_instruments/Guitar.generateExampleData) ⇒ [<code>Array.&lt;GuitarNote&gt;</code>](#GuitarNote)
    * [.fretboardPositionsFromMidi(notes, tuning, fretCount)](#module_instruments/Guitar.fretboardPositionsFromMidi) ⇒ [<code>Array.&lt;GuitarNote&gt;</code>](#GuitarNote)

<a name="module_instruments/Guitar.StringedTuning"></a>

### instruments/Guitar.StringedTuning
Represents a tuning of a fretted string instrument.

**Kind**: static class of [<code>instruments/Guitar</code>](#module_instruments/Guitar)  
<a name="new_module_instruments/Guitar.StringedTuning_new"></a>

#### new exports.StringedTuning(name, notes)
Represents a tuning of a fretted string instrument.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name |
| notes | <code>Array.&lt;string&gt;</code> | array of notes, e.g. ['E2', 'A2', 'D3', ...] |

<a name="module_instruments/Guitar.stringedTunings"></a>

### instruments/Guitar.stringedTunings : <code>Map.&lt;string, Map.&lt;number, StringedTuning&gt;&gt;</code>
Maps from instrument to string number to list of tunings.Defaults are at the top.

**Kind**: static constant of [<code>instruments/Guitar</code>](#module_instruments/Guitar)  
**Todo**

- [ ] add more? https://en.wikipedia.org/wiki/List_of_guitar_tunings
- [ ] https://github.com/PirtleShell/string-tunings/blob/master/tunings.json
- [ ] replace arrays by maps? tuning name - tuning

**Example**  
```js
stringedTunings.get('Guitar').get(6) for 6-string guitar tunings
```
<a name="module_instruments/Guitar.stringColors"></a>

### instruments/Guitar.stringColors : <code>Array.&lt;string&gt;</code>
Colors for guitar strings, acces via stringColor[string]where string in [1, 8].

**Kind**: static constant of [<code>instruments/Guitar</code>](#module_instruments/Guitar)  
<a name="module_instruments/Guitar.guitarNoteFromNote"></a>

### instruments/Guitar.guitarNoteFromNote(note, tuning) ⇒ [<code>GuitarNote</code>](#GuitarNote)
For Notes that have a guitar string encoded in their channel, this functionallows to convert them to a GuitarNote.

**Kind**: static method of [<code>instruments/Guitar</code>](#module_instruments/Guitar)  
**Returns**: [<code>GuitarNote</code>](#GuitarNote) - a GuitarNote  

| Param | Type | Description |
| --- | --- | --- |
| note | [<code>Note</code>](#Note) | a Note that has the guitar string stored in its channel      e.g. 0 to 5 for a six string |
| tuning | <code>StringedTuning</code> | tuning |

<a name="module_instruments/Guitar.getTuningFromPitches"></a>

### instruments/Guitar.getTuningFromPitches(pitches) ⇒ <code>StringedTuning</code> \| <code>null</code>
Returns a tuning with the specified pitches or null if none found.

**Kind**: static method of [<code>instruments/Guitar</code>](#module_instruments/Guitar)  
**Returns**: <code>StringedTuning</code> \| <code>null</code> - the found tuning or null  

| Param | Type | Description |
| --- | --- | --- |
| pitches | <code>Array.&lt;number&gt;</code> | pitches of the tuning, same order as in      Guitar.js' stringedTunings, i.e. low to high notes |

<a name="module_instruments/Guitar.getTuningPitchRange"></a>

### instruments/Guitar.getTuningPitchRange(tuning, fretCount) ⇒ <code>Array.&lt;number&gt;</code>
Returns the pitch range of a tuning, given the number of frets.

**Kind**: static method of [<code>instruments/Guitar</code>](#module_instruments/Guitar)  
**Returns**: <code>Array.&lt;number&gt;</code> - [minPitch, maxPitch]  

| Param | Type | Description |
| --- | --- | --- |
| tuning | <code>StringedTuning</code> | tuning |
| fretCount | <code>number</code> | number of frets the instrument has (default: 24) |

<a name="module_instruments/Guitar.getPitchFromFretboardPos"></a>

### instruments/Guitar.getPitchFromFretboardPos(string, fret, tuning) ⇒ <code>number</code>
Returns the pitch of a note at a given fretboard position.

**Kind**: static method of [<code>instruments/Guitar</code>](#module_instruments/Guitar)  
**Returns**: <code>number</code> - pitch  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>number</code> | string |
| fret | <code>number</code> | fret |
| tuning | <code>StringedTuning</code> | tuning |

<a name="module_instruments/Guitar.getNoteInfoFromFretboardPos"></a>

### instruments/Guitar.getNoteInfoFromFretboardPos(string, fret, tuning) ⇒ <code>object</code>
Returns MIDI attributes of a note at a given fretboard position, e.g. C#

**Kind**: static method of [<code>instruments/Guitar</code>](#module_instruments/Guitar)  
**Returns**: <code>object</code> - note info, e.g. { pitch: 69, name: 'A', octave: 4, label: 'A4', frequency: 440.000 }  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>number</code> | string |
| fret | <code>number</code> | fret |
| tuning | <code>StringedTuning</code> | tuning |

<a name="module_instruments/Guitar.getFretboardPositionsFromPitch"></a>

### instruments/Guitar.getFretboardPositionsFromPitch(pitch, tuning, fretCount) ⇒ <code>Array.&lt;object&gt;</code>
Finds all fretboard positions with this exact pitch.

**Kind**: static method of [<code>instruments/Guitar</code>](#module_instruments/Guitar)  
**Returns**: <code>Array.&lt;object&gt;</code> - positions  

| Param | Type | Description |
| --- | --- | --- |
| pitch | <code>number</code> | MIDI pitch |
| tuning | <code>StringedTuning</code> | tuning |
| fretCount | <code>number</code> | number of frets the instrument has |

<a name="module_instruments/Guitar.getFretboardPositionsFromNoteName"></a>

### instruments/Guitar.getFretboardPositionsFromNoteName(name, tuning, fretCount) ⇒ <code>Array.&lt;object&gt;</code>
Finds all fretboard positions with this note in all octaves.

**Kind**: static method of [<code>instruments/Guitar</code>](#module_instruments/Guitar)  
**Returns**: <code>Array.&lt;object&gt;</code> - positions  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | note name, e.g. 'C#' |
| tuning | <code>StringedTuning</code> | tuning |
| fretCount | <code>number</code> | number of frets the instrument has |

<a name="module_instruments/Guitar.generateExampleData"></a>

### instruments/Guitar.generateExampleData(startTime, count, tuning) ⇒ [<code>Array.&lt;GuitarNote&gt;</code>](#GuitarNote)
Generates example MIDI-like data (preprocessed MIDI).

**Kind**: static method of [<code>instruments/Guitar</code>](#module_instruments/Guitar)  
**Returns**: [<code>Array.&lt;GuitarNote&gt;</code>](#GuitarNote) - notes  

| Param | Type | Description |
| --- | --- | --- |
| startTime | <code>number</code> | start tick |
| count | <code>number</code> | number of notes to generate |
| tuning | <code>StringedTuning</code> | tuning |

<a name="module_instruments/Guitar.fretboardPositionsFromMidi"></a>

### instruments/Guitar.fretboardPositionsFromMidi(notes, tuning, fretCount) ⇒ [<code>Array.&lt;GuitarNote&gt;</code>](#GuitarNote)
Estimates the fretboard position from MIDI notes

**Kind**: static method of [<code>instruments/Guitar</code>](#module_instruments/Guitar)  
**Returns**: [<code>Array.&lt;GuitarNote&gt;</code>](#GuitarNote) - GuitarNotes with fretboard positions  
**Todo**

- [ ] does not work well yet


| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes with only MIDI information |
| tuning | <code>StringedTuning</code> | tuning |
| fretCount | <code>number</code> | number of frets the instrument has |

<a name="module_instruments/Lamellophone"></a>

## instruments/Lamellophone

* [instruments/Lamellophone](#module_instruments/Lamellophone)
    * [.LamellophoneTuning](#module_instruments/Lamellophone.LamellophoneTuning)
        * [new exports.LamellophoneTuning(name, notes)](#new_module_instruments/Lamellophone.LamellophoneTuning_new)
        * [.getNumbers()](#module_instruments/Lamellophone.LamellophoneTuning+getNumbers) ⇒ <code>Array.&lt;string&gt;</code>
        * [.getLetters()](#module_instruments/Lamellophone.LamellophoneTuning+getLetters) ⇒ <code>Array.&lt;string&gt;</code>
    * [.lamellophoneTunings](#module_instruments/Lamellophone.lamellophoneTunings) : <code>Map.&lt;string, Map.&lt;string, LamellophoneTuning&gt;&gt;</code>
    * [.convertTabToNotes(tab, tuning, tempo)](#module_instruments/Lamellophone.convertTabToNotes) ⇒ [<code>Array.&lt;Note&gt;</code>](#Note)
    * [.convertNotesToTab(notes, tuning, mode, restSize)](#module_instruments/Lamellophone.convertNotesToTab) ⇒ <code>string</code>
    * [.convertNotesToHtmlTab(notes, tuning, mode, restSize, colormap)](#module_instruments/Lamellophone.convertNotesToHtmlTab) ⇒ <code>string</code>
    * [.convertNumbersToLetters(numberTab, numberLetterMap)](#module_instruments/Lamellophone.convertNumbersToLetters) ⇒ <code>string</code>
    * [.bestTransposition(notes, tuning)](#module_instruments/Lamellophone.bestTransposition) ⇒ <code>object</code>

<a name="module_instruments/Lamellophone.LamellophoneTuning"></a>

### instruments/Lamellophone.LamellophoneTuning
Represents Lamellophone tunings

**Kind**: static class of [<code>instruments/Lamellophone</code>](#module_instruments/Lamellophone)  

* [.LamellophoneTuning](#module_instruments/Lamellophone.LamellophoneTuning)
    * [new exports.LamellophoneTuning(name, notes)](#new_module_instruments/Lamellophone.LamellophoneTuning_new)
    * [.getNumbers()](#module_instruments/Lamellophone.LamellophoneTuning+getNumbers) ⇒ <code>Array.&lt;string&gt;</code>
    * [.getLetters()](#module_instruments/Lamellophone.LamellophoneTuning+getLetters) ⇒ <code>Array.&lt;string&gt;</code>

<a name="new_module_instruments/Lamellophone.LamellophoneTuning_new"></a>

#### new exports.LamellophoneTuning(name, notes)
Represents a tuning of lamellophone.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name |
| notes | <code>Array.&lt;string&gt;</code> | array of notes, same order as on instrument      e.g. [..., 'D4','C4', 'F#4', ...] |

<a name="module_instruments/Lamellophone.LamellophoneTuning+getNumbers"></a>

#### lamellophoneTuning.getNumbers() ⇒ <code>Array.&lt;string&gt;</code>
Returns an array of the tuning's notes as number representation:Tuning notes:  C4, D4, ... C5, D5, ... C6,  D6Number format: 1,  2,  ... 1°, 2°, ... 1°°, 2°°

**Kind**: instance method of [<code>LamellophoneTuning</code>](#module_instruments/Lamellophone.LamellophoneTuning)  
**Returns**: <code>Array.&lt;string&gt;</code> - array with tuning notes in number representation  
<a name="module_instruments/Lamellophone.LamellophoneTuning+getLetters"></a>

#### lamellophoneTuning.getLetters() ⇒ <code>Array.&lt;string&gt;</code>
Returns an array of the tuning's notes as letter representation:Tuning notes:  C4, D4, ... C5, D5, ... C6,  D6Number format: C,  D,  ... C°, D°, ... C°°, D°°

**Kind**: instance method of [<code>LamellophoneTuning</code>](#module_instruments/Lamellophone.LamellophoneTuning)  
**Returns**: <code>Array.&lt;string&gt;</code> - array with tuning notes in letter representation  
<a name="module_instruments/Lamellophone.lamellophoneTunings"></a>

### instruments/Lamellophone.lamellophoneTunings : <code>Map.&lt;string, Map.&lt;string, LamellophoneTuning&gt;&gt;</code>
Tunings.Notes are in the same order as on the instrument

**Kind**: static constant of [<code>instruments/Lamellophone</code>](#module_instruments/Lamellophone)  
<a name="module_instruments/Lamellophone.convertTabToNotes"></a>

### instruments/Lamellophone.convertTabToNotes(tab, tuning, tempo) ⇒ [<code>Array.&lt;Note&gt;</code>](#Note)
Parses a tab into notes

**Kind**: static method of [<code>instruments/Lamellophone</code>](#module_instruments/Lamellophone)  
**Returns**: [<code>Array.&lt;Note&gt;</code>](#Note) - notes  

| Param | Type | Description |
| --- | --- | --- |
| tab | <code>string</code> | in letter format |
| tuning | <code>LamellophoneTuning</code> | tuning |
| tempo | <code>number</code> | tempo in bpm |

<a name="module_instruments/Lamellophone.convertNotesToTab"></a>

### instruments/Lamellophone.convertNotesToTab(notes, tuning, mode, restSize) ⇒ <code>string</code>
Converts an array of notes into a text tab

**Kind**: static method of [<code>instruments/Lamellophone</code>](#module_instruments/Lamellophone)  
**Returns**: <code>string</code> - text tab  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |
| tuning | <code>LamellophoneTuning</code> | tuning |
| mode | <code>&#x27;letter&#x27;</code> \| <code>&#x27;number&#x27;</code> | mode |
| restSize | <code>number</code> | number of seconds for a gap between chords to insert     a line break |

<a name="module_instruments/Lamellophone.convertNotesToHtmlTab"></a>

### instruments/Lamellophone.convertNotesToHtmlTab(notes, tuning, mode, restSize, colormap) ⇒ <code>string</code>
Converts an array of notes into an HTML tab with colored notes

**Kind**: static method of [<code>instruments/Lamellophone</code>](#module_instruments/Lamellophone)  
**Returns**: <code>string</code> - HTML tab  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |
| tuning | <code>LamellophoneTuning</code> | tuning |
| mode | <code>&#x27;letter&#x27;</code> \| <code>&#x27;number&#x27;</code> | mode |
| restSize | <code>number</code> | number of seconds for a gap between chords to insert     a line break |
| colormap | <code>function</code> | color map function: pitch to color |

<a name="module_instruments/Lamellophone.convertNumbersToLetters"></a>

### instruments/Lamellophone.convertNumbersToLetters(numberTab, numberLetterMap) ⇒ <code>string</code>
Converts a number-based tab to note letter format

**Kind**: static method of [<code>instruments/Lamellophone</code>](#module_instruments/Lamellophone)  
**Returns**: <code>string</code> - tab in letter format  

| Param | Type | Description |
| --- | --- | --- |
| numberTab | <code>string</code> | tab text with number format |
| numberLetterMap | <code>Map.&lt;number, string&gt;</code> | maps numbers to letters |

<a name="module_instruments/Lamellophone.bestTransposition"></a>

### instruments/Lamellophone.bestTransposition(notes, tuning) ⇒ <code>object</code>
Tries to find a transposition s.t. the tuning is able to play all notes.If not not possible, return the transposition that requires the least keys tobe retuned.

**Kind**: static method of [<code>instruments/Lamellophone</code>](#module_instruments/Lamellophone)  
**Returns**: <code>object</code> - {transpose: number, retune: Map}  
**Todo**

- [ ] tests fail


| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |
| tuning | <code>LamellophoneTuning</code> | tuning |

<a name="module_instruments/Piano"></a>

## instruments/Piano
<a name="module_instruments/Piano.pianoPitchRange"></a>

### instruments/Piano.pianoPitchRange : <code>Map.&lt;number, object&gt;</code>
Map:keyCount->pitchRange
pitchRange is {minPitch:number, maxPitch:number}

**Kind**: static constant of [<code>instruments/Piano</code>](#module_instruments/Piano)  
<a name="module_stringBased/Gotoh"></a>

## stringBased/Gotoh

* [stringBased/Gotoh](#module_stringBased/Gotoh)
    * [.gotoh(seqA, seqB, similarityFunction, gapPenaltyStart, gapPenaltyExtend)](#module_stringBased/Gotoh.gotoh) ⇒ <code>number</code>
    * [.normalizedGotoh(seqA, seqB, similarityFunction, gapPenaltyStart, gapPenaltyExtend)](#module_stringBased/Gotoh.normalizedGotoh) ⇒ <code>number</code>
    * [.matchMissmatchSimilarity(a, b)](#module_stringBased/Gotoh.matchMissmatchSimilarity) ⇒ <code>number</code>
    * [.differenceSimilarity(a, b)](#module_stringBased/Gotoh.differenceSimilarity) ⇒ <code>number</code>

<a name="module_stringBased/Gotoh.gotoh"></a>

### stringBased/Gotoh.gotoh(seqA, seqB, similarityFunction, gapPenaltyStart, gapPenaltyExtend) ⇒ <code>number</code>
Calculates the SIMILARITY for two strings or arrays.
Similar to NeedlemanWunsch but O(n^2) instead of O(n^3)
IMPORTANT: This metric is not symmetric!

**Kind**: static method of [<code>stringBased/Gotoh</code>](#module_stringBased/Gotoh)  
**Returns**: <code>number</code> - similarity score  
**See**: https://de.wikipedia.org/wiki/Gotoh-Algorithmus  
**Todo**

- [ ] normalize to [0, 1], but how?
- [ ] somehow the the matched sequences and gaps...


| Param | Type | Description |
| --- | --- | --- |
| seqA | <code>string</code> \| <code>Array</code> | a sequence |
| seqB | <code>string</code> \| <code>Array</code> | a sequence |
| similarityFunction | <code>function</code> | a function that takes two elements and      returns their similarity score (higher => more similar)      (a:any, b:any):number |
| gapPenaltyStart | <code>number</code> | cost for starting a new gap (negative) |
| gapPenaltyExtend | <code>number</code> | cost for continuing a gap (negative) |

<a name="module_stringBased/Gotoh.normalizedGotoh"></a>

### stringBased/Gotoh.normalizedGotoh(seqA, seqB, similarityFunction, gapPenaltyStart, gapPenaltyExtend) ⇒ <code>number</code>
Idea: what would the max. similarity value be? the string with itself!
So just compare the longer string to itself and use that similarity to
normalize

**Kind**: static method of [<code>stringBased/Gotoh</code>](#module_stringBased/Gotoh)  
**Returns**: <code>number</code> - normalized similarity score  
**Todo**

- [ ] does this work with negative costs and/or results?
- [ ] can this be optimized since only the similarityFunction is needed?
- [ ] only compute 'a' matrix for maxSimilarity


| Param | Type | Description |
| --- | --- | --- |
| seqA | <code>string</code> \| <code>Array</code> | a sequence |
| seqB | <code>string</code> \| <code>Array</code> | a sequence |
| similarityFunction | <code>function</code> | a function that takes two elements and      returns their similarity score (higher => more similar)      (a:any, b:any):number |
| gapPenaltyStart | <code>number</code> | cost for starting a new gap (negative) |
| gapPenaltyExtend | <code>number</code> | cost for continuing a gap (negative) |

<a name="module_stringBased/Gotoh.matchMissmatchSimilarity"></a>

### stringBased/Gotoh.matchMissmatchSimilarity(a, b) ⇒ <code>number</code>
Cost function that simply checks whether two values are equal or not with ===

**Kind**: static method of [<code>stringBased/Gotoh</code>](#module_stringBased/Gotoh)  
**Returns**: <code>number</code> - 1 if equal, -1 otherwise  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>any</code> | some value |
| b | <code>any</code> | some value |

<a name="module_stringBased/Gotoh.differenceSimilarity"></a>

### stringBased/Gotoh.differenceSimilarity(a, b) ⇒ <code>number</code>
Cost function that takes the negative absolute value of the value's
difference, assuming that close values are more similar

**Kind**: static method of [<code>stringBased/Gotoh</code>](#module_stringBased/Gotoh)  
**Returns**: <code>number</code> - -Math.abs(a - b)  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | some value |
| b | <code>number</code> | some value |

<a name="module_stringBased"></a>

## stringBased
**Todo**

- [ ] rename to Sequences

<a name="module_stringBased/Levenshtein"></a>

## stringBased/Levenshtein

* [stringBased/Levenshtein](#module_stringBased/Levenshtein)
    * [.levenshtein(a, b, normalize)](#module_stringBased/Levenshtein.levenshtein) ⇒ <code>number</code>
    * [.damerauLevenshtein(a, b, normalize)](#module_stringBased/Levenshtein.damerauLevenshtein) ⇒ <code>number</code>

<a name="module_stringBased/Levenshtein.levenshtein"></a>

### stringBased/Levenshtein.levenshtein(a, b, normalize) ⇒ <code>number</code>
Computes the Levenshtein distance of two strings or arrays.

**Kind**: static method of [<code>stringBased/Levenshtein</code>](#module_stringBased/Levenshtein)  
**Returns**: <code>number</code> - Levenshtein distance  
**See**: https://gist.github.com/andrei-m/982927#gistcomment-1931258  
**Author**: https://github.com/kigiri, license: MIT  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>string</code> \| <code>Array</code> | a string |
| b | <code>string</code> \| <code>Array</code> | another string |
| normalize | <code>boolean</code> | when set to true, the distance will be normalized      to [0, 1], by dividing by the longer string's length |

<a name="module_stringBased/Levenshtein.damerauLevenshtein"></a>

### stringBased/Levenshtein.damerauLevenshtein(a, b, normalize) ⇒ <code>number</code>
Computes the Damerau-Levenshtein distance of two strings or arrays.

**Kind**: static method of [<code>stringBased/Levenshtein</code>](#module_stringBased/Levenshtein)  
**Returns**: <code>number</code> - Levenshtein distance  
**See**: https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>string</code> \| <code>Array</code> | a string |
| b | <code>string</code> \| <code>Array</code> | another string |
| normalize | <code>boolean</code> | when set to true, the distance will be normalized      to [0, 1], by dividing by the longer string's length |

<a name="module_stringBased/LongestCommonSubsequence"></a>

## stringBased/LongestCommonSubsequence

* [stringBased/LongestCommonSubsequence](#module_stringBased/LongestCommonSubsequence)
    * [.lcs(a, b)](#module_stringBased/LongestCommonSubsequence.lcs) ⇒ <code>string</code> \| <code>Array</code>
    * [.lcsLength(a, b)](#module_stringBased/LongestCommonSubsequence.lcsLength) ⇒ <code>number</code>
    * [.normalizedLcsLength(a, b)](#module_stringBased/LongestCommonSubsequence.normalizedLcsLength) ⇒ <code>number</code>

<a name="module_stringBased/LongestCommonSubsequence.lcs"></a>

### stringBased/LongestCommonSubsequence.lcs(a, b) ⇒ <code>string</code> \| <code>Array</code>
Calculates the longest common subsequence.

**Kind**: static method of [<code>stringBased/LongestCommonSubsequence</code>](#module_stringBased/LongestCommonSubsequence)  
**Returns**: <code>string</code> \| <code>Array</code> - the longest common subsequence  
**See**: https://rosettacode.org/wiki/Longest_common_subsequence#JavaScript  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>string</code> \| <code>Array</code> | a string |
| b | <code>string</code> \| <code>Array</code> | another string |

**Example**  
```js
const lcs = StringBased.LongestCommonSubsequence.lcs('hello world!', 'world');
// world
```
<a name="module_stringBased/LongestCommonSubsequence.lcsLength"></a>

### stringBased/LongestCommonSubsequence.lcsLength(a, b) ⇒ <code>number</code>
Calculates the *length* of the longest common subsequence.
Also works with arrays.

**Kind**: static method of [<code>stringBased/LongestCommonSubsequence</code>](#module_stringBased/LongestCommonSubsequence)  
**Returns**: <code>number</code> - the length of longest common subsequence  
**See**: https://rosettacode.org/wiki/Longest_common_subsequence#JavaScript  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>string</code> \| <code>Array</code> | a string |
| b | <code>string</code> \| <code>Array</code> | another string |

**Example**  
```js
const lcsLength = StringBased.LongestCommonSubsequence.lcs('hello world!', 'world');
// 5
```
<a name="module_stringBased/LongestCommonSubsequence.normalizedLcsLength"></a>

### stringBased/LongestCommonSubsequence.normalizedLcsLength(a, b) ⇒ <code>number</code>
Normalizes the result of lcsLength() by dividing by the longer string's
length.

**Kind**: static method of [<code>stringBased/LongestCommonSubsequence</code>](#module_stringBased/LongestCommonSubsequence)  
**Returns**: <code>number</code> - normalized length of longest common subsequence  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>string</code> \| <code>Array</code> | a string |
| b | <code>string</code> \| <code>Array</code> | another string |

<a name="module_stringBased/NeedlemanWunsch"></a>

## stringBased/NeedlemanWunsch

* [stringBased/NeedlemanWunsch](#module_stringBased/NeedlemanWunsch)
    * [~NeedlemanWunsch](#module_stringBased/NeedlemanWunsch..NeedlemanWunsch)
        * [new NeedlemanWunsch(seq1, seq2, matchScore, mismatchPenalty, gapPenalty)](#new_module_stringBased/NeedlemanWunsch..NeedlemanWunsch_new)
        * [.calcScoresAndTracebacks()](#module_stringBased/NeedlemanWunsch..NeedlemanWunsch+calcScoresAndTracebacks)
        * [.alignmentChildren(pos)](#module_stringBased/NeedlemanWunsch..NeedlemanWunsch+alignmentChildren) ⇒ <code>Array.&lt;object&gt;</code>
        * [.alignmentTraceback()](#module_stringBased/NeedlemanWunsch..NeedlemanWunsch+alignmentTraceback) ⇒ <code>Array.&lt;object&gt;</code>

<a name="module_stringBased/NeedlemanWunsch..NeedlemanWunsch"></a>

### stringBased/NeedlemanWunsch~NeedlemanWunsch
Needleman-Wunsch algorithm

**Kind**: inner class of [<code>stringBased/NeedlemanWunsch</code>](#module_stringBased/NeedlemanWunsch)  
**See**: https://github.com/blievrouw/needleman-wunsch/blob/master/src/needleman_wunsch.js  
**Todo**

- [ ] does not support cost matrix
- [ ] extend by matchMismathFunction


* [~NeedlemanWunsch](#module_stringBased/NeedlemanWunsch..NeedlemanWunsch)
    * [new NeedlemanWunsch(seq1, seq2, matchScore, mismatchPenalty, gapPenalty)](#new_module_stringBased/NeedlemanWunsch..NeedlemanWunsch_new)
    * [.calcScoresAndTracebacks()](#module_stringBased/NeedlemanWunsch..NeedlemanWunsch+calcScoresAndTracebacks)
    * [.alignmentChildren(pos)](#module_stringBased/NeedlemanWunsch..NeedlemanWunsch+alignmentChildren) ⇒ <code>Array.&lt;object&gt;</code>
    * [.alignmentTraceback()](#module_stringBased/NeedlemanWunsch..NeedlemanWunsch+alignmentTraceback) ⇒ <code>Array.&lt;object&gt;</code>

<a name="new_module_stringBased/NeedlemanWunsch..NeedlemanWunsch_new"></a>

#### new NeedlemanWunsch(seq1, seq2, matchScore, mismatchPenalty, gapPenalty)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| seq1 | <code>string</code> \| <code>Array</code> |  | a string |
| seq2 | <code>string</code> \| <code>Array</code> |  | another string |
| matchScore | <code>number</code> | <code>1</code> | score for matching characters |
| mismatchPenalty | <code>number</code> |  | penalty for mismatching characters |
| gapPenalty | <code>number</code> |  | penalty for a gap |

<a name="module_stringBased/NeedlemanWunsch..NeedlemanWunsch+calcScoresAndTracebacks"></a>

#### needlemanWunsch.calcScoresAndTracebacks()
Calculates (intermediate) scores and tracebacks using provided parameters

**Kind**: instance method of [<code>NeedlemanWunsch</code>](#module_stringBased/NeedlemanWunsch..NeedlemanWunsch)  
<a name="module_stringBased/NeedlemanWunsch..NeedlemanWunsch+alignmentChildren"></a>

#### needlemanWunsch.alignmentChildren(pos) ⇒ <code>Array.&lt;object&gt;</code>
Finds next alignment locations (children) from a position in scoring matrix

**Kind**: instance method of [<code>NeedlemanWunsch</code>](#module_stringBased/NeedlemanWunsch..NeedlemanWunsch)  
**Returns**: <code>Array.&lt;object&gt;</code> - children - Children positions and alignment types  

| Param | Type | Description |
| --- | --- | --- |
| pos | <code>Array.&lt;number&gt;</code> | m- Position in scoring matrix |

<a name="module_stringBased/NeedlemanWunsch..NeedlemanWunsch+alignmentTraceback"></a>

#### needlemanWunsch.alignmentTraceback() ⇒ <code>Array.&lt;object&gt;</code>
Runs through scoring matrix from bottom-right to top-left using traceback values to create all optimal alignments

**Kind**: instance method of [<code>NeedlemanWunsch</code>](#module_stringBased/NeedlemanWunsch..NeedlemanWunsch)  
**Returns**: <code>Array.&lt;object&gt;</code> - e.g. [{ seq1: '-4321', seq2: '54321' }]  
<a name="module_stringBased/SuffixTree"></a>

## stringBased/SuffixTree

* [stringBased/SuffixTree](#module_stringBased/SuffixTree)
    * [~SuffixTree](#module_stringBased/SuffixTree..SuffixTree)
        * [new SuffixTree(array)](#new_module_stringBased/SuffixTree..SuffixTree_new)
        * [.getLongestRepeatedSubString()](#module_stringBased/SuffixTree..SuffixTree+getLongestRepeatedSubString) ⇒ <code>Array</code>
        * [.toString()](#module_stringBased/SuffixTree..SuffixTree+toString) ⇒ <code>string</code>
        * [.toJson()](#module_stringBased/SuffixTree..SuffixTree+toJson) ⇒ <code>string</code>
    * [~TreeNode](#module_stringBased/SuffixTree..TreeNode)
        * [.checkNodes(suf)](#module_stringBased/SuffixTree..TreeNode+checkNodes) ⇒ <code>boolean</code>
        * [.checkLeaves(suf)](#module_stringBased/SuffixTree..TreeNode+checkLeaves)
        * [.addSuffix(suf)](#module_stringBased/SuffixTree..TreeNode+addSuffix)
        * [.getLongestRepeatedSubString()](#module_stringBased/SuffixTree..TreeNode+getLongestRepeatedSubString) ⇒ <code>Array</code>
        * [.toString(indent)](#module_stringBased/SuffixTree..TreeNode+toString) ⇒ <code>string</code>

<a name="module_stringBased/SuffixTree..SuffixTree"></a>

### stringBased/SuffixTree~SuffixTree
Suffix tree, a tree that shows which subsequences are repeated

**Kind**: inner class of [<code>stringBased/SuffixTree</code>](#module_stringBased/SuffixTree)  
**See**: https://github.com/eikes/suffixtree/blob/master/js/suffixtree.js  

* [~SuffixTree](#module_stringBased/SuffixTree..SuffixTree)
    * [new SuffixTree(array)](#new_module_stringBased/SuffixTree..SuffixTree_new)
    * [.getLongestRepeatedSubString()](#module_stringBased/SuffixTree..SuffixTree+getLongestRepeatedSubString) ⇒ <code>Array</code>
    * [.toString()](#module_stringBased/SuffixTree..SuffixTree+toString) ⇒ <code>string</code>
    * [.toJson()](#module_stringBased/SuffixTree..SuffixTree+toJson) ⇒ <code>string</code>

<a name="new_module_stringBased/SuffixTree..SuffixTree_new"></a>

#### new SuffixTree(array)
SuffixTree for strings or Arrays


| Param | Type | Description |
| --- | --- | --- |
| array | <code>string</code> \| <code>Array</code> | string or Array to process |

<a name="module_stringBased/SuffixTree..SuffixTree+getLongestRepeatedSubString"></a>

#### suffixTree.getLongestRepeatedSubString() ⇒ <code>Array</code>
Returns the longest repeated substring

**Kind**: instance method of [<code>SuffixTree</code>](#module_stringBased/SuffixTree..SuffixTree)  
**Returns**: <code>Array</code> - longest repeated substring  
<a name="module_stringBased/SuffixTree..SuffixTree+toString"></a>

#### suffixTree.toString() ⇒ <code>string</code>
Returns a readable string format of this tree

**Kind**: instance method of [<code>SuffixTree</code>](#module_stringBased/SuffixTree..SuffixTree)  
**Returns**: <code>string</code> - string  
<a name="module_stringBased/SuffixTree..SuffixTree+toJson"></a>

#### suffixTree.toJson() ⇒ <code>string</code>
Returns a JSON representation of this tree

**Kind**: instance method of [<code>SuffixTree</code>](#module_stringBased/SuffixTree..SuffixTree)  
**Returns**: <code>string</code> - JSON  
<a name="module_stringBased/SuffixTree..TreeNode"></a>

### stringBased/SuffixTree~TreeNode
TreeNode

**Kind**: inner class of [<code>stringBased/SuffixTree</code>](#module_stringBased/SuffixTree)  

* [~TreeNode](#module_stringBased/SuffixTree..TreeNode)
    * [.checkNodes(suf)](#module_stringBased/SuffixTree..TreeNode+checkNodes) ⇒ <code>boolean</code>
    * [.checkLeaves(suf)](#module_stringBased/SuffixTree..TreeNode+checkLeaves)
    * [.addSuffix(suf)](#module_stringBased/SuffixTree..TreeNode+addSuffix)
    * [.getLongestRepeatedSubString()](#module_stringBased/SuffixTree..TreeNode+getLongestRepeatedSubString) ⇒ <code>Array</code>
    * [.toString(indent)](#module_stringBased/SuffixTree..TreeNode+toString) ⇒ <code>string</code>

<a name="module_stringBased/SuffixTree..TreeNode+checkNodes"></a>

#### treeNode.checkNodes(suf) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>TreeNode</code>](#module_stringBased/SuffixTree..TreeNode)  
**Returns**: <code>boolean</code> - true if first entry of suf equals the value of a child  

| Param | Type | Description |
| --- | --- | --- |
| suf | <code>string</code> \| <code>Array</code> | suffix |

<a name="module_stringBased/SuffixTree..TreeNode+checkLeaves"></a>

#### treeNode.checkLeaves(suf)
**Kind**: instance method of [<code>TreeNode</code>](#module_stringBased/SuffixTree..TreeNode)  

| Param | Type | Description |
| --- | --- | --- |
| suf | <code>string</code> \| <code>Array</code> | suffix |

<a name="module_stringBased/SuffixTree..TreeNode+addSuffix"></a>

#### treeNode.addSuffix(suf)
**Kind**: instance method of [<code>TreeNode</code>](#module_stringBased/SuffixTree..TreeNode)  

| Param | Type | Description |
| --- | --- | --- |
| suf | <code>string</code> \| <code>Array</code> | suffix |

<a name="module_stringBased/SuffixTree..TreeNode+getLongestRepeatedSubString"></a>

#### treeNode.getLongestRepeatedSubString() ⇒ <code>Array</code>
Returns the longest repeated substring

**Kind**: instance method of [<code>TreeNode</code>](#module_stringBased/SuffixTree..TreeNode)  
**Returns**: <code>Array</code> - longest substring  
<a name="module_stringBased/SuffixTree..TreeNode+toString"></a>

#### treeNode.toString(indent) ⇒ <code>string</code>
Readable string representation of this node and its children

**Kind**: instance method of [<code>TreeNode</code>](#module_stringBased/SuffixTree..TreeNode)  
**Returns**: <code>string</code> - string representation  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| indent | <code>number</code> | <code>1</code> | indentation |

<a name="module_utils/ArrayUtils"></a>

## utils/ArrayUtils

* [utils/ArrayUtils](#module_utils/ArrayUtils)
    * [.arrayShallowEquals(a, b)](#module_utils/ArrayUtils.arrayShallowEquals) ⇒ <code>boolean</code>
    * [.arrayHasSameElements(a, b, checkLength)](#module_utils/ArrayUtils.arrayHasSameElements) ⇒ <code>boolean</code>
    * [.jaccardIndex(set1, set2)](#module_utils/ArrayUtils.jaccardIndex) ⇒ <code>number</code>
    * [.kendallTau(ranking1, ranking2, [normalize])](#module_utils/ArrayUtils.kendallTau) ⇒ <code>number</code>
    * [.removeDuplicates(array)](#module_utils/ArrayUtils.removeDuplicates) ⇒ <code>Array</code>
    * [.arrayContainsArray(a, b)](#module_utils/ArrayUtils.arrayContainsArray) ⇒ <code>boolean</code>
    * [.arraySlicesEqual(a, b, length, [startA], [startB])](#module_utils/ArrayUtils.arraySlicesEqual) ⇒ <code>boolean</code>
    * [.arrayIndexOf(haystack, needle, [startIndex])](#module_utils/ArrayUtils.arrayIndexOf) ⇒ <code>number</code>
    * [.getArrayMax(array)](#module_utils/ArrayUtils.getArrayMax) ⇒ <code>number</code>
    * [.normalizeNdArray(array)](#module_utils/ArrayUtils.normalizeNdArray) ⇒ <code>Array</code>
    * [.euclideanDistance(matrixA, matrixB)](#module_utils/ArrayUtils.euclideanDistance) ⇒ <code>number</code>
    * [.formatMatrix(matrix, colSeparator, rowSeparator, formatter)](#module_utils/ArrayUtils.formatMatrix) ⇒ <code>string</code>
    * [.binarySearch(array, value, accessor)](#module_utils/ArrayUtils.binarySearch) ⇒ <code>\*</code>
    * [.findStreaks(values, accessor, equality)](#module_utils/ArrayUtils.findStreaks) ⇒ <code>Array.&lt;object&gt;</code>
    * [.findRepeatedIndices(sequence, equals)](#module_utils/ArrayUtils.findRepeatedIndices) ⇒ <code>Array.&lt;number&gt;</code>

<a name="module_utils/ArrayUtils.arrayShallowEquals"></a>

### utils/ArrayUtils.arrayShallowEquals(a, b) ⇒ <code>boolean</code>
Shallow compares two arrays

**Kind**: static method of [<code>utils/ArrayUtils</code>](#module_utils/ArrayUtils)  
**Returns**: <code>boolean</code> - true iff equal  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Array</code> | an array |
| b | <code>Array</code> | another array |

<a name="module_utils/ArrayUtils.arrayHasSameElements"></a>

### utils/ArrayUtils.arrayHasSameElements(a, b, checkLength) ⇒ <code>boolean</code>
Checks if two arrays contain the same elements,ignoring their ordering in each array.

**Kind**: static method of [<code>utils/ArrayUtils</code>](#module_utils/ArrayUtils)  
**Returns**: <code>boolean</code> - true iff arrays contain same elements  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Array</code> | an array |
| b | <code>Array</code> | another array |
| checkLength | <code>boolean</code> | also checks if arrays have the same length |

<a name="module_utils/ArrayUtils.jaccardIndex"></a>

### utils/ArrayUtils.jaccardIndex(set1, set2) ⇒ <code>number</code>
Jaccard index calulates the similarity of the sets as the size of the setinteraction divided by the size of the set union:jackard_index = |intersection| / |union|

**Kind**: static method of [<code>utils/ArrayUtils</code>](#module_utils/ArrayUtils)  
**Returns**: <code>number</code> - similarity in [0, 1]  
**See**: https://en.wikipedia.org/wiki/Jaccard_index  

| Param | Type | Description |
| --- | --- | --- |
| set1 | <code>Array.&lt;number&gt;</code> | set 1 |
| set2 | <code>Array.&lt;number&gt;</code> | set 2 |

<a name="module_utils/ArrayUtils.kendallTau"></a>

### utils/ArrayUtils.kendallTau(ranking1, ranking2, [normalize]) ⇒ <code>number</code>
Kendall Tau distance

**Kind**: static method of [<code>utils/ArrayUtils</code>](#module_utils/ArrayUtils)  
**Returns**: <code>number</code> - Kendall tau distance  
**Throws**:

- <code>&#x27;Ranking length must be equal&#x27;</code> if rankings don't have euqal length

**See**: https://en.wikipedia.org/wiki/Kendall_tau_distance  
**Todo**

- [ ] naive implementation, can be sped up with hints on Wikipedia,   see also https://stackoverflow.com/questions/6523712/calculating-the-number-of-inversions-in-a-permutation/6523781#6523781


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ranking1 | <code>Array.&lt;number&gt;</code> |  | a ranking, i.e. for each entry the rank |
| ranking2 | <code>Array.&lt;number&gt;</code> |  | a ranking, i.e. for each entry the rank |
| [normalize] | <code>boolean</code> | <code>true</code> | normalize to [0, 1]? |

<a name="module_utils/ArrayUtils.removeDuplicates"></a>

### utils/ArrayUtils.removeDuplicates(array) ⇒ <code>Array</code>
Removes duplicates from an Array by converting to a Set and back

**Kind**: static method of [<code>utils/ArrayUtils</code>](#module_utils/ArrayUtils)  
**Returns**: <code>Array</code> - array without duplicates  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | an array |

<a name="module_utils/ArrayUtils.arrayContainsArray"></a>

### utils/ArrayUtils.arrayContainsArray(a, b) ⇒ <code>boolean</code>
Checks whether the array a contains the array b, i.e. whether the firstb.length elements are the same.

**Kind**: static method of [<code>utils/ArrayUtils</code>](#module_utils/ArrayUtils)  
**Returns**: <code>boolean</code> - true iff a contains b  
**Todo**

- [ ] rename to arrayStartsWithArray


| Param | Type | Description |
| --- | --- | --- |
| a | <code>Array</code> | an array |
| b | <code>Array</code> | a shorter array |

<a name="module_utils/ArrayUtils.arraySlicesEqual"></a>

### utils/ArrayUtils.arraySlicesEqual(a, b, length, [startA], [startB]) ⇒ <code>boolean</code>
Compares a slice of a with a slice of b.Slices start at startA and startB and have the same length

**Kind**: static method of [<code>utils/ArrayUtils</code>](#module_utils/ArrayUtils)  
**Returns**: <code>boolean</code> - true if slices are equal  
**Throws**:

- <code>&#x27;undefined length&#x27;</code> length is undefined
- <code>&#x27;start &lt; 0&#x27;</code> when start is negative


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| a | <code>Array</code> |  | an Array |
| b | <code>Array</code> |  | an Array |
| length | <code>number</code> |  | slice length |
| [startA] | <code>number</code> | <code>0</code> | start index for the slice in a to compare |
| [startB] | <code>number</code> | <code>0</code> | start index for the slice in b to compare |

<a name="module_utils/ArrayUtils.arrayIndexOf"></a>

### utils/ArrayUtils.arrayIndexOf(haystack, needle, [startIndex]) ⇒ <code>number</code>
Finds an array in another array, only shallow comparison

**Kind**: static method of [<code>utils/ArrayUtils</code>](#module_utils/ArrayUtils)  
**Returns**: <code>number</code> - index or -1 when not found  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| haystack | <code>Array</code> |  | array to search in |
| needle | <code>Array</code> |  | array to search for |
| [startIndex] | <code>number</code> | <code>0</code> | index from which to start searching |

<a name="module_utils/ArrayUtils.getArrayMax"></a>

### utils/ArrayUtils.getArrayMax(array) ⇒ <code>number</code>
Returns the maximum numerical value from an array of arrays with arbitrarydepth and structure.

**Kind**: static method of [<code>utils/ArrayUtils</code>](#module_utils/ArrayUtils)  
**Returns**: <code>number</code> - maximum value  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | array |

<a name="module_utils/ArrayUtils.normalizeNdArray"></a>

### utils/ArrayUtils.normalizeNdArray(array) ⇒ <code>Array</code>
Normalizes by dividing all entries by the maximum.Only for positive values!

**Kind**: static method of [<code>utils/ArrayUtils</code>](#module_utils/ArrayUtils)  
**Returns**: <code>Array</code> - normalized array  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | nD array with arbitrary depth and structure |

<a name="module_utils/ArrayUtils.euclideanDistance"></a>

### utils/ArrayUtils.euclideanDistance(matrixA, matrixB) ⇒ <code>number</code>
Assumes same shape of matrices.

**Kind**: static method of [<code>utils/ArrayUtils</code>](#module_utils/ArrayUtils)  
**Returns**: <code>number</code> - Euclidean distance of the two matrices  

| Param | Type | Description |
| --- | --- | --- |
| matrixA | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | a matrix |
| matrixB | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | a matrix |

<a name="module_utils/ArrayUtils.formatMatrix"></a>

### utils/ArrayUtils.formatMatrix(matrix, colSeparator, rowSeparator, formatter) ⇒ <code>string</code>
Stringifies a 2D array / matrix for logging onto the console.

**Kind**: static method of [<code>utils/ArrayUtils</code>](#module_utils/ArrayUtils)  
**Returns**: <code>string</code> - stringified matrix  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>Array.&lt;Array.&lt;any&gt;&gt;</code> | the matrix |
| colSeparator | <code>string</code> | column separator |
| rowSeparator | <code>string</code> | row separator |
| formatter | <code>function</code> | formatting for each element |

<a name="module_utils/ArrayUtils.binarySearch"></a>

### utils/ArrayUtils.binarySearch(array, value, accessor) ⇒ <code>\*</code>
Returns the value in array that is closest to value.Array MUST be sorted ascending.

**Kind**: static method of [<code>utils/ArrayUtils</code>](#module_utils/ArrayUtils)  
**Returns**: <code>\*</code> - value in array closest to value  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | array |
| value | <code>\*</code> | value |
| accessor | <code>function</code> | accessor |

<a name="module_utils/ArrayUtils.findStreaks"></a>

### utils/ArrayUtils.findStreaks(values, accessor, equality) ⇒ <code>Array.&lt;object&gt;</code>
Finds streaks of values in an array.

**Kind**: static method of [<code>utils/ArrayUtils</code>](#module_utils/ArrayUtils)  
**Returns**: <code>Array.&lt;object&gt;</code> - {startIndex, endIndex, length}[]  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array</code> | array |
| accessor | <code>function</code> | value to compare |
| equality | <code>function</code> | comparator for equality of two values |

**Example**  
```js
const arr = [1, 1, 2, 3, 3, 3];  const streaks = findStreaks(arr);
```
<a name="module_utils/ArrayUtils.findRepeatedIndices"></a>

### utils/ArrayUtils.findRepeatedIndices(sequence, equals) ⇒ <code>Array.&lt;number&gt;</code>
For each element in a sequence, finds the lowest index where an equal elementoccurs.

**Kind**: static method of [<code>utils/ArrayUtils</code>](#module_utils/ArrayUtils)  
**Returns**: <code>Array.&lt;number&gt;</code> - result  

| Param | Type | Description |
| --- | --- | --- |
| sequence | <code>Array</code> | an Array |
| equals | <code>function</code> | euqality function |

<a name="module_utils/BlobUtils"></a>

## utils/BlobUtils

* [utils/BlobUtils](#module_utils/BlobUtils)
    * [.blobToBase64(blob)](#module_utils/BlobUtils.blobToBase64) ⇒ <code>Promise.&lt;string, undefined&gt;</code>
    * [.blobToFileExtension(blob)](#module_utils/BlobUtils.blobToFileExtension) ⇒ <code>string</code>

<a name="module_utils/BlobUtils.blobToBase64"></a>

### utils/BlobUtils.blobToBase64(blob) ⇒ <code>Promise.&lt;string, undefined&gt;</code>
Converts a Blob to a base64 string

**Kind**: static method of [<code>utils/BlobUtils</code>](#module_utils/BlobUtils)  
**Returns**: <code>Promise.&lt;string, undefined&gt;</code> - base64 string  

| Param | Type | Description |
| --- | --- | --- |
| blob | <code>Blob</code> | Blob |

<a name="module_utils/BlobUtils.blobToFileExtension"></a>

### utils/BlobUtils.blobToFileExtension(blob) ⇒ <code>string</code>
Extracts the file extension from a Blob, so it can be saved as a file with
an appropriate extension.

**Kind**: static method of [<code>utils/BlobUtils</code>](#module_utils/BlobUtils)  
**Returns**: <code>string</code> - file extension  

| Param | Type | Description |
| --- | --- | --- |
| blob | <code>Blob</code> | Blob |

<a name="module_utils/FormattingUtils"></a>

## utils/FormattingUtils

* [utils/FormattingUtils](#module_utils/FormattingUtils)
    * [.formatTime(seconds, includeMillis)](#module_utils/FormattingUtils.formatTime) ⇒ <code>string</code>
    * [.formatDate(date, replaceT, keepMillis)](#module_utils/FormattingUtils.formatDate) ⇒ <code>string</code>
    * [.formatSongTitle(title, maxLength)](#module_utils/FormattingUtils.formatSongTitle) ⇒ <code>string</code>

<a name="module_utils/FormattingUtils.formatTime"></a>

### utils/FormattingUtils.formatTime(seconds, includeMillis) ⇒ <code>string</code>
Formats a time in seconds to <minutes>:<seconds>.<milliseconds>

**Kind**: static method of [<code>utils/FormattingUtils</code>](#module_utils/FormattingUtils)  
**Returns**: <code>string</code> - 0-padded time string <minutes>:<seconds>.<milliseconds>  

| Param | Type | Description |
| --- | --- | --- |
| seconds | <code>number</code> \| <code>null</code> | in seconds |
| includeMillis | <code>boolean</code> | include milli seconds in string? |

<a name="module_utils/FormattingUtils.formatDate"></a>

### utils/FormattingUtils.formatDate(date, replaceT, keepMillis) ⇒ <code>string</code>
Formats a Date to a string with format
     YYYY-mm-DDTHH:MM:SS
or when replaceT == true
     YYYY-mm-DD HH:MM:SS

**Kind**: static method of [<code>utils/FormattingUtils</code>](#module_utils/FormattingUtils)  
**Returns**: <code>string</code> - formatted date  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | date |
| replaceT | <code>boolean</code> | replace the 'T'? |
| keepMillis | <code>boolean</code> | keep milliseconds? |

<a name="module_utils/FormattingUtils.formatSongTitle"></a>

### utils/FormattingUtils.formatSongTitle(title, maxLength) ⇒ <code>string</code>
Formats the song title (e.g. remove file extension and shorten)

**Kind**: static method of [<code>utils/FormattingUtils</code>](#module_utils/FormattingUtils)  
**Returns**: <code>string</code> - formatted song title  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | song title |
| maxLength | <code>number</code> | shorten to this length |

<a name="module_utils"></a>

## utils
<a name="module_utils/LocalStorageUtils"></a>

## utils/LocalStorageUtils

* [utils/LocalStorageUtils](#module_utils/LocalStorageUtils)
    * [.storeObjectInLocalStorage(key, object)](#module_utils/LocalStorageUtils.storeObjectInLocalStorage)
    * [.getObjectFromLocalStorage(key)](#module_utils/LocalStorageUtils.getObjectFromLocalStorage) ⇒ <code>object</code> \| <code>null</code>

<a name="module_utils/LocalStorageUtils.storeObjectInLocalStorage"></a>

### utils/LocalStorageUtils.storeObjectInLocalStorage(key, object)
Stringifies an object and stores it in the localStorage

**Kind**: static method of [<code>utils/LocalStorageUtils</code>](#module_utils/LocalStorageUtils)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | key |
| object | <code>object</code> | JSON compatible object |

<a name="module_utils/LocalStorageUtils.getObjectFromLocalStorage"></a>

### utils/LocalStorageUtils.getObjectFromLocalStorage(key) ⇒ <code>object</code> \| <code>null</code>
Retrieves a stringified object from the localStorage and parses it.

**Kind**: static method of [<code>utils/LocalStorageUtils</code>](#module_utils/LocalStorageUtils)  
**Returns**: <code>object</code> \| <code>null</code> - object or null of not possible  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | key |

<a name="module_utils/MathUtils"></a>

## utils/MathUtils

* [utils/MathUtils](#module_utils/MathUtils)
    * [.randFloat(min, max)](#module_utils/MathUtils.randFloat) ⇒ <code>number</code>
    * [.choose(array)](#module_utils/MathUtils.choose) ⇒ <code>any</code>
    * [.clipValue(value, minValue, maxValue)](#module_utils/MathUtils.clipValue) ⇒ <code>number</code>
    * [.roundToNDecimals(number, n)](#module_utils/MathUtils.roundToNDecimals) ⇒ <code>number</code>
    * [.swapSoSmallerFirst(x, y)](#module_utils/MathUtils.swapSoSmallerFirst) ⇒ <code>Array.&lt;number&gt;</code>
    * [.countOnesOfBinary(integer)](#module_utils/MathUtils.countOnesOfBinary) ⇒ <code>number</code>
    * [.findLocalMaxima(array)](#module_utils/MathUtils.findLocalMaxima) ⇒ <code>Array.&lt;number&gt;</code>

<a name="module_utils/MathUtils.randFloat"></a>

### utils/MathUtils.randFloat(min, max) ⇒ <code>number</code>
Generates a random float in [min, max)

**Kind**: static method of [<code>utils/MathUtils</code>](#module_utils/MathUtils)  
**Returns**: <code>number</code> - random float  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>number</code> | minimum |
| max | <code>number</code> | maximum |

<a name="module_utils/MathUtils.choose"></a>

### utils/MathUtils.choose(array) ⇒ <code>any</code>
Returns a random element from the given array.

**Kind**: static method of [<code>utils/MathUtils</code>](#module_utils/MathUtils)  
**Returns**: <code>any</code> - random element from the array  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | an array |

<a name="module_utils/MathUtils.clipValue"></a>

### utils/MathUtils.clipValue(value, minValue, maxValue) ⇒ <code>number</code>
Shortcut for Math.max(minValue, Math.min(maxValue, value))

**Kind**: static method of [<code>utils/MathUtils</code>](#module_utils/MathUtils)  
**Returns**: <code>number</code> - clipped number  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | value |
| minValue | <code>number</code> | lower limit |
| maxValue | <code>number</code> | upper limit |

<a name="module_utils/MathUtils.roundToNDecimals"></a>

### utils/MathUtils.roundToNDecimals(number, n) ⇒ <code>number</code>
Rounds a number to a given number of decimals

**Kind**: static method of [<code>utils/MathUtils</code>](#module_utils/MathUtils)  
**Returns**: <code>number</code> - rounded number  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>number</code> | a number |
| n | <code>number</code> | number of digits |

<a name="module_utils/MathUtils.swapSoSmallerFirst"></a>

### utils/MathUtils.swapSoSmallerFirst(x, y) ⇒ <code>Array.&lt;number&gt;</code>
Swaps two numbers if the first is larger than the second

**Kind**: static method of [<code>utils/MathUtils</code>](#module_utils/MathUtils)  
**Returns**: <code>Array.&lt;number&gt;</code> - array with the smaller number first  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | a number |
| y | <code>number</code> | a number |

<a name="module_utils/MathUtils.countOnesOfBinary"></a>

### utils/MathUtils.countOnesOfBinary(integer) ⇒ <code>number</code>
Counts the number of 1s in a binary number, e.g 100101 has 3 1s

**Kind**: static method of [<code>utils/MathUtils</code>](#module_utils/MathUtils)  
**Returns**: <code>number</code> - number of 1s  
**See**: https://prismoskills.appspot.com/lessons/Bitwise_Operators/Count_ones_in_an_integer.jsp  

| Param | Type | Description |
| --- | --- | --- |
| integer | <code>number</code> | an integer number |

<a name="module_utils/MathUtils.findLocalMaxima"></a>

### utils/MathUtils.findLocalMaxima(array) ⇒ <code>Array.&lt;number&gt;</code>
Local maxima are found by looking at entries that are higher than their left
and right neighbor, or higher than their only neighbor if they are at the
boundary.
IMPORTANT: does not find plateaus

**Kind**: static method of [<code>utils/MathUtils</code>](#module_utils/MathUtils)  
**Returns**: <code>Array.&lt;number&gt;</code> - array with indices of maxima  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array.&lt;number&gt;</code> | array |

<a name="module_utils/MiscUtils"></a>

## utils/MiscUtils

* [utils/MiscUtils](#module_utils/MiscUtils)
    * [.deepCloneFlatObjectMap(map)](#module_utils/MiscUtils.deepCloneFlatObjectMap) ⇒ <code>Map</code>
    * [.groupNotesByPitch(tracks)](#module_utils/MiscUtils.groupNotesByPitch) ⇒ <code>Map</code>
    * [.reverseString(s)](#module_utils/MiscUtils.reverseString) ⇒ <code>string</code>
    * [.findNearest(notes, targetNote)](#module_utils/MiscUtils.findNearest) ⇒ [<code>Note</code>](#Note)
    * [.delay(seconds)](#module_utils/MiscUtils.delay) ⇒ <code>Promise</code>

<a name="module_utils/MiscUtils.deepCloneFlatObjectMap"></a>

### utils/MiscUtils.deepCloneFlatObjectMap(map) ⇒ <code>Map</code>
Clones a map where the values are flat objects,i.e. values do not contain objects themselfes.

**Kind**: static method of [<code>utils/MiscUtils</code>](#module_utils/MiscUtils)  
**Returns**: <code>Map</code> - a copy of the map with copies of the value objects  

| Param | Type | Description |
| --- | --- | --- |
| map | <code>Map</code> | a map with object values |

<a name="module_utils/MiscUtils.groupNotesByPitch"></a>

### utils/MiscUtils.groupNotesByPitch(tracks) ⇒ <code>Map</code>
Groups the Notes from multiple tracks

**Kind**: static method of [<code>utils/MiscUtils</code>](#module_utils/MiscUtils)  
**Returns**: <code>Map</code> - grouping  

| Param | Type | Description |
| --- | --- | --- |
| tracks | <code>Array.&lt;Array.&lt;Note&gt;&gt;</code> | array of arrays of Note objects |

<a name="module_utils/MiscUtils.reverseString"></a>

### utils/MiscUtils.reverseString(s) ⇒ <code>string</code>
Reverses a given string.

**Kind**: static method of [<code>utils/MiscUtils</code>](#module_utils/MiscUtils)  
**Returns**: <code>string</code> - reversed string  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>string</code> | string |

<a name="module_utils/MiscUtils.findNearest"></a>

### utils/MiscUtils.findNearest(notes, targetNote) ⇒ [<code>Note</code>](#Note)
Given some notes and a target note, findsthe note that has its start time closest tothe one of targetNote

**Kind**: static method of [<code>utils/MiscUtils</code>](#module_utils/MiscUtils)  
**Returns**: [<code>Note</code>](#Note) - closest note to targetNote  
**Todo**

- [ ] replace by d3 argmin or sth?


| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |
| targetNote | [<code>Note</code>](#Note) | target note |

<a name="module_utils/MiscUtils.delay"></a>

### utils/MiscUtils.delay(seconds) ⇒ <code>Promise</code>
Allows to wait for a number of seconds with async/awaitIMPORTANT: This it not exact, it will at *least* wait for X seconds

**Kind**: static method of [<code>utils/MiscUtils</code>](#module_utils/MiscUtils)  
**Returns**: <code>Promise</code> - empty Promise that will resolve after the specified amount     of seconds  

| Param | Type | Description |
| --- | --- | --- |
| seconds | <code>number</code> | number of seconds to wait |

<a name="module_utils/MusicUtils"></a>

## utils/MusicUtils

* [utils/MusicUtils](#module_utils/MusicUtils)
    * [.CIRCLE_OF_5THS](#module_utils/MusicUtils.CIRCLE_OF_5THS) : <code>Array.&lt;Array.&lt;any&gt;&gt;</code>
    * [.INTERVALS](#module_utils/MusicUtils.INTERVALS) : <code>Map.&lt;number, string&gt;</code>
    * [.bpmToSecondsPerBeat(bpm)](#module_utils/MusicUtils.bpmToSecondsPerBeat) ⇒ <code>number</code>
    * [.freqToApproxMidiNr(frequency)](#module_utils/MusicUtils.freqToApproxMidiNr) ⇒ <code>number</code>
    * [.midiToFrequency(midi)](#module_utils/MusicUtils.midiToFrequency) ⇒ <code>number</code>
    * [.chordToInteger(notes)](#module_utils/MusicUtils.chordToInteger) ⇒ <code>number</code>
    * [.chordIntegerJaccardIndex(chord1, chord2)](#module_utils/MusicUtils.chordIntegerJaccardIndex) ⇒ <code>number</code>
    * [.noteDurationToNoteType(duration, bpm)](#module_utils/MusicUtils.noteDurationToNoteType) ⇒ <code>object</code>
    * [.metronomeTrackFromTempoAndMeter(tempo, meter, duration)](#module_utils/MusicUtils.metronomeTrackFromTempoAndMeter) ⇒ <code>Array.&lt;object&gt;</code>
    * [.metronomeTrackFromMusicPiece(musicPiece, [tempoFactor])](#module_utils/MusicUtils.metronomeTrackFromMusicPiece) ⇒ <code>Array.&lt;object&gt;</code>

<a name="module_utils/MusicUtils.CIRCLE_OF_5THS"></a>

### utils/MusicUtils.CIRCLE\_OF\_5THS : <code>Array.&lt;Array.&lt;any&gt;&gt;</code>
Circle of 5ths as[midiNr, noteAsSharp, noteAsFlat, numberOfSharps, numberOfFlats]

**Kind**: static constant of [<code>utils/MusicUtils</code>](#module_utils/MusicUtils)  
**See**: https://en.wikipedia.org/wiki/Circle_of_fifths  
<a name="module_utils/MusicUtils.INTERVALS"></a>

### utils/MusicUtils.INTERVALS : <code>Map.&lt;number, string&gt;</code>
Maps number of semitones to interval namem - minorM - majorP - perfectaug - augmented

**Kind**: static constant of [<code>utils/MusicUtils</code>](#module_utils/MusicUtils)  
<a name="module_utils/MusicUtils.bpmToSecondsPerBeat"></a>

### utils/MusicUtils.bpmToSecondsPerBeat(bpm) ⇒ <code>number</code>
Converts beats per minute to seconds per beat

**Kind**: static method of [<code>utils/MusicUtils</code>](#module_utils/MusicUtils)  
**Returns**: <code>number</code> - seconds per beat  

| Param | Type | Description |
| --- | --- | --- |
| bpm | <code>number</code> | tempo in beats per minute |

<a name="module_utils/MusicUtils.freqToApproxMidiNr"></a>

### utils/MusicUtils.freqToApproxMidiNr(frequency) ⇒ <code>number</code>
Maps any frequency (in Hz) to an approximate MIDI note number. Result can berounded to get to the closest MIDI note or used as is for a sound in betweentwo notes.

**Kind**: static method of [<code>utils/MusicUtils</code>](#module_utils/MusicUtils)  
**Returns**: <code>number</code> - MIDI note number (not rounded)  

| Param | Type | Description |
| --- | --- | --- |
| frequency | <code>number</code> | a frequency in Hz |

<a name="module_utils/MusicUtils.midiToFrequency"></a>

### utils/MusicUtils.midiToFrequency(midi) ⇒ <code>number</code>
Maps any MIDI number (can be in-between, like 69.5 for A4 + 50 cents) to itsfrequency.

**Kind**: static method of [<code>utils/MusicUtils</code>](#module_utils/MusicUtils)  
**Returns**: <code>number</code> - frequency in Hz  

| Param | Type | Description |
| --- | --- | --- |
| midi | <code>number</code> | MIDI note number |

<a name="module_utils/MusicUtils.chordToInteger"></a>

### utils/MusicUtils.chordToInteger(notes) ⇒ <code>number</code>
Turns a chord into an integer that uniquely describes the occuring chroma.If the same chroma occurs twice this will not make a difference(e.g. [C4, E4, G4, C5] will equal [C4, E4, G4])How it works:Chord has C, E, and Gx = 000010010001        G  E   C

**Kind**: static method of [<code>utils/MusicUtils</code>](#module_utils/MusicUtils)  
**Returns**: <code>number</code> - an integer that uniquely identifies this chord's chroma  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |

<a name="module_utils/MusicUtils.chordIntegerJaccardIndex"></a>

### utils/MusicUtils.chordIntegerJaccardIndex(chord1, chord2) ⇒ <code>number</code>
Takes two chord integer representations from chordToInteger() and computesthe Jaccard index

**Kind**: static method of [<code>utils/MusicUtils</code>](#module_utils/MusicUtils)  
**Returns**: <code>number</code> - Jackard index, from 0 for different to 1 for identical  

| Param | Type | Description |
| --- | --- | --- |
| chord1 | <code>number</code> | chord as integer representation |
| chord2 | <code>number</code> | chord as integer representation |

<a name="module_utils/MusicUtils.noteDurationToNoteType"></a>

### utils/MusicUtils.noteDurationToNoteType(duration, bpm) ⇒ <code>object</code>
Estimates the note type (whole, quarter, ...) and number of dots for dottednotes

**Kind**: static method of [<code>utils/MusicUtils</code>](#module_utils/MusicUtils)  
**Returns**: <code>object</code> - note type and number of dots     e.g. { "dots": 0, "duration": 1, "type": 1 } for a whole note     e.g. { "dots": 1, "duration": 1.5, "type": 1 } for a dotted whole note  
**Todo**

- [ ] test if corrrectly 'calibrated'


| Param | Type | Description |
| --- | --- | --- |
| duration | <code>number</code> | duration of a note |
| bpm | <code>number</code> | tempo of the piece in bpm |

<a name="module_utils/MusicUtils.metronomeTrackFromTempoAndMeter"></a>

### utils/MusicUtils.metronomeTrackFromTempoAndMeter(tempo, meter, duration) ⇒ <code>Array.&lt;object&gt;</code>
Creates a track of metronome ticks for a given tempo and meter.

**Kind**: static method of [<code>utils/MusicUtils</code>](#module_utils/MusicUtils)  
**Returns**: <code>Array.&lt;object&gt;</code> - metronome track with {time: number, accent: boolean}  

| Param | Type | Description |
| --- | --- | --- |
| tempo | <code>number</code> | tempo in bpm, e.g. 120 |
| meter | <code>Array.&lt;number&gt;</code> | e.g. [4, 4] |
| duration | <code>number</code> | duration of the resulting track in seconds |

<a name="module_utils/MusicUtils.metronomeTrackFromMusicPiece"></a>

### utils/MusicUtils.metronomeTrackFromMusicPiece(musicPiece, [tempoFactor]) ⇒ <code>Array.&lt;object&gt;</code>
Creates a track of metronome ticks for a given music piece.

**Kind**: static method of [<code>utils/MusicUtils</code>](#module_utils/MusicUtils)  
**Returns**: <code>Array.&lt;object&gt;</code> - metronome track with {time: number, accent: boolean}  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| musicPiece | [<code>MusicPiece</code>](#MusicPiece) |  | music piece |
| [tempoFactor] | <code>number</code> | <code>1</code> | rescale the tempo of the metronome, e.g. 2      for twice the speed |

<a name="module_utils/NoteColorUtils"></a>

## utils/NoteColorUtils

* [utils/NoteColorUtils](#module_utils/NoteColorUtils)
    * _static_
        * [.noteColorFromPitch(pitch, colormap)](#module_utils/NoteColorUtils.noteColorFromPitch) ⇒ <code>string</code>
    * _inner_
        * [~noteColormap](#module_utils/NoteColorUtils..noteColormap) : <code>Array.&lt;string&gt;</code>
        * [~noteColormapAccessible](#module_utils/NoteColorUtils..noteColormapAccessible) : <code>Array.&lt;string&gt;</code>
        * [~noteColormapGradientArray](#module_utils/NoteColorUtils..noteColormapGradientArray) : <code>Array.&lt;string&gt;</code>

<a name="module_utils/NoteColorUtils.noteColorFromPitch"></a>

### utils/NoteColorUtils.noteColorFromPitch(pitch, colormap) ⇒ <code>string</code>
Returns the note color depending on the given pitch.
(Simplifies note color lookup by looking up the color for pitch%12.)

**Kind**: static method of [<code>utils/NoteColorUtils</code>](#module_utils/NoteColorUtils)  
**Returns**: <code>string</code> - color code  

| Param | Type | Description |
| --- | --- | --- |
| pitch | <code>number</code> | MIDI pitch in [0, 127] |
| colormap | <code>string</code> | one of 'default', 'accessible', 'gradient' |

<a name="module_utils/NoteColorUtils..noteColormap"></a>

### utils/NoteColorUtils~noteColormap : <code>Array.&lt;string&gt;</code>
Maps each note to a color
Colors from https://www.svpwiki.com/music+note+or+sound+colors
Order is C, C#, ... B

**Kind**: inner constant of [<code>utils/NoteColorUtils</code>](#module_utils/NoteColorUtils)  
<a name="module_utils/NoteColorUtils..noteColormapAccessible"></a>

### utils/NoteColorUtils~noteColormapAccessible : <code>Array.&lt;string&gt;</code>
Colorblind save colors from
Malandrino et al. - Visualization and Music Harmony: Design, Implementation,
and Evaluation https://ieeexplore.ieee.org/abstract/document/8564210
Order is C, C#, ... B

**Kind**: inner constant of [<code>utils/NoteColorUtils</code>](#module_utils/NoteColorUtils)  
<a name="module_utils/NoteColorUtils..noteColormapGradientArray"></a>

### utils/NoteColorUtils~noteColormapGradientArray : <code>Array.&lt;string&gt;</code>
Gradient color map from black to steelblue

**Kind**: inner constant of [<code>utils/NoteColorUtils</code>](#module_utils/NoteColorUtils)  
<a name="module_utils/RecordingsUtils"></a>

## utils/RecordingsUtils

* [utils/RecordingsUtils](#module_utils/RecordingsUtils)
    * [.filterRecordingNoise(recording, velocityThreshold, durationThreshold)](#module_utils/RecordingsUtils.filterRecordingNoise) ⇒ [<code>Recording</code>](#Recording)
    * [.clipRecordingsPitchesToGtRange(recordings, groundTruth)](#module_utils/RecordingsUtils.clipRecordingsPitchesToGtRange) ⇒ [<code>Array.&lt;Recording&gt;</code>](#Recording)
    * [.clipRecordingsPitchesToGtFretboardRange(recordings, groundTruth, [mode])](#module_utils/RecordingsUtils.clipRecordingsPitchesToGtFretboardRange) ⇒ [<code>Array.&lt;Recording&gt;</code>](#Recording)
    * [.alignNotesToBpm(notes, bpm, timeDivision)](#module_utils/RecordingsUtils.alignNotesToBpm) ⇒ [<code>Array.&lt;Note&gt;</code>](#Note)
    * [.recordingsHeatmap(recNotes, nRecs, binSize, attribute)](#module_utils/RecordingsUtils.recordingsHeatmap) ⇒ <code>Map</code>
    * [.averageRecordings(heatmapByPitch, binSize, threshold)](#module_utils/RecordingsUtils.averageRecordings) ⇒ [<code>Array.&lt;Note&gt;</code>](#Note)
    * [.averageRecordings2(recNotes, bandwidth, ticksPerSecond, threshold)](#module_utils/RecordingsUtils.averageRecordings2) ⇒ [<code>Array.&lt;Note&gt;</code>](#Note)
    * [.differenceMap(gtNotes, recNotes, binSize)](#module_utils/RecordingsUtils.differenceMap) ⇒ <code>Map</code>
    * [.differenceMapErrorAreas(differenceMap)](#module_utils/RecordingsUtils.differenceMapErrorAreas) ⇒ <code>object</code>

<a name="module_utils/RecordingsUtils.filterRecordingNoise"></a>

### utils/RecordingsUtils.filterRecordingNoise(recording, velocityThreshold, durationThreshold) ⇒ [<code>Recording</code>](#Recording)
Filters notes of a recording to remove noise from the MIDI device or pickup

**Kind**: static method of [<code>utils/RecordingsUtils</code>](#module_utils/RecordingsUtils)  
**Returns**: [<code>Recording</code>](#Recording) - clone of the recording with filtered notes  
**Todo**

- [ ] detect gaps and fill them


| Param | Type | Description |
| --- | --- | --- |
| recording | [<code>Recording</code>](#Recording) | a recording |
| velocityThreshold | <code>number</code> | notes with velocity < velocityThreshold      are removed |
| durationThreshold | <code>number</code> | notes with duration < velocityThreshold      are removed (value in seconds) |

<a name="module_utils/RecordingsUtils.clipRecordingsPitchesToGtRange"></a>

### utils/RecordingsUtils.clipRecordingsPitchesToGtRange(recordings, groundTruth) ⇒ [<code>Array.&lt;Recording&gt;</code>](#Recording)
Removes notes from a recordings which are outside the range of the groundtruth and therefore likely noise.Looks up the pitch range from the track of the GT that the recording was madefor.

**Kind**: static method of [<code>utils/RecordingsUtils</code>](#module_utils/RecordingsUtils)  
**Returns**: [<code>Array.&lt;Recording&gt;</code>](#Recording) - filtered recordings  

| Param | Type | Description |
| --- | --- | --- |
| recordings | [<code>Array.&lt;Recording&gt;</code>](#Recording) | recordings |
| groundTruth | <code>Array.&lt;Array.&lt;Note&gt;&gt;</code> | ground truth |

<a name="module_utils/RecordingsUtils.clipRecordingsPitchesToGtFretboardRange"></a>

### utils/RecordingsUtils.clipRecordingsPitchesToGtFretboardRange(recordings, groundTruth, [mode]) ⇒ [<code>Array.&lt;Recording&gt;</code>](#Recording)
Removes notes from a recordings which are outside the fretboard range of theground truth and therefore likely noise.Looks up the fretboard position range from the track of the GT that therecording was made for.

**Kind**: static method of [<code>utils/RecordingsUtils</code>](#module_utils/RecordingsUtils)  
**Returns**: [<code>Array.&lt;Recording&gt;</code>](#Recording) - filtered recordings  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| recordings | [<code>Array.&lt;Recording&gt;</code>](#Recording) |  | recordings |
| groundTruth | <code>Array.&lt;Array.&lt;Note&gt;&gt;</code> |  | ground truth |
| [mode] | <code>&#x27;exact&#x27;</code> \| <code>&#x27;area&#x27;</code> | <code>exact</code> | mode for which fretboard positions to      include: exact will only keep notes that have positions that occur in      the GT, area will get a rectangular area of the fretboard that contains      all GT positions and fill filter on that. |

<a name="module_utils/RecordingsUtils.alignNotesToBpm"></a>

### utils/RecordingsUtils.alignNotesToBpm(notes, bpm, timeDivision) ⇒ [<code>Array.&lt;Note&gt;</code>](#Note)
Aligns notes to a rhythmic pattern

**Kind**: static method of [<code>utils/RecordingsUtils</code>](#module_utils/RecordingsUtils)  
**Returns**: [<code>Array.&lt;Note&gt;</code>](#Note) - aligned notes  
**Todo**

- [ ] not used


| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |
| bpm | <code>number</code> | e.g. 120 for tempo 120 |
| timeDivision | <code>number</code> | e.g. 16 for 16th note steps |

<a name="module_utils/RecordingsUtils.recordingsHeatmap"></a>

### utils/RecordingsUtils.recordingsHeatmap(recNotes, nRecs, binSize, attribute) ⇒ <code>Map</code>
Calculates a heatmap either pitch- or channel-wise.Pitch-time heatmap:Calculates a heatmap of multiple recordings, to see the note density in thepitch-time-space.Channel-time heatmap:Calculates a heatmap of multiple recordings, to see the note density in thechannel-time-space. Channel could be a guitar string or left and right handfor example.

**Kind**: static method of [<code>utils/RecordingsUtils</code>](#module_utils/RecordingsUtils)  
**Returns**: <code>Map</code> - pitch->heatmap; heatmap is number[] for all time slices  

| Param | Type | Description |
| --- | --- | --- |
| recNotes | [<code>Array.&lt;Note&gt;</code>](#Note) | recordings |
| nRecs | <code>number</code> | number of recordings |
| binSize | <code>number</code> | time bin size in milliseconds |
| attribute | <code>string</code> | 'pitch' | 'channel' |

<a name="module_utils/RecordingsUtils.averageRecordings"></a>

### utils/RecordingsUtils.averageRecordings(heatmapByPitch, binSize, threshold) ⇒ [<code>Array.&lt;Note&gt;</code>](#Note)
'Averages' multiple recordings of the same piece to get an approximation ofthe ground truth.

**Kind**: static method of [<code>utils/RecordingsUtils</code>](#module_utils/RecordingsUtils)  
**Returns**: [<code>Array.&lt;Note&gt;</code>](#Note) - approximated ground truth notes  
**Todo**

- [ ] use velocity?


| Param | Type | Description |
| --- | --- | --- |
| heatmapByPitch | <code>Map</code> | haetmap from recordingsHeatmap() |
| binSize | <code>number</code> | size of time bins in milliseconds |
| threshold | <code>number</code> | note is regarded as true when this ratio of      recordings has a note there |

<a name="module_utils/RecordingsUtils.averageRecordings2"></a>

### utils/RecordingsUtils.averageRecordings2(recNotes, bandwidth, ticksPerSecond, threshold) ⇒ [<code>Array.&lt;Note&gt;</code>](#Note)
Extracts a probable ground truth from multiple recordings. Uses one KDE foreach note starts and ends, detects maxima in the KDE and thresholds them.Then uses alternating start end end candidates to create notes.

**Kind**: static method of [<code>utils/RecordingsUtils</code>](#module_utils/RecordingsUtils)  
**Returns**: [<code>Array.&lt;Note&gt;</code>](#Note) - new notes  

| Param | Type | Description |
| --- | --- | --- |
| recNotes | [<code>Array.&lt;Note&gt;</code>](#Note) | recordings notes |
| bandwidth | <code>number</code> | kernel bandwidth |
| ticksPerSecond | <code>number</code> | number of ticks per second |
| threshold | <code>number</code> | threshold |

<a name="module_utils/RecordingsUtils.differenceMap"></a>

### utils/RecordingsUtils.differenceMap(gtNotes, recNotes, binSize) ⇒ <code>Map</code>
Returns a Map: pitch->differenceMap, differenceMap is an Array with time binsand each bin is either     0 (none, neither GT nor rec have a note here)     1 (missing, only GT has a note here)     2 (additional, only rec has a note here)     3 (both, both have a note here)

**Kind**: static method of [<code>utils/RecordingsUtils</code>](#module_utils/RecordingsUtils)  
**Returns**: <code>Map</code> - pitch->differenceMap; differenceMap is number[] for all time slices  
**Todo**

- [ ] move to comparison


| Param | Type | Description |
| --- | --- | --- |
| gtNotes | [<code>Array.&lt;Note&gt;</code>](#Note) | ground truth notes |
| recNotes | [<code>Array.&lt;Note&gt;</code>](#Note) | recrodings notes |
| binSize | <code>number</code> | size of a time bin in milliseconds |

**Example**  
```js
const diffMap = differenceMap(gtNotes, recNotes, 10);
```
<a name="module_utils/RecordingsUtils.differenceMapErrorAreas"></a>

### utils/RecordingsUtils.differenceMapErrorAreas(differenceMap) ⇒ <code>object</code>
Computes the 'area' of error from a differenceMap normalized by total area.The area is simply the number of bins with each value, total area is max.number of bins in all pitches * the number of pitches.

**Kind**: static method of [<code>utils/RecordingsUtils</code>](#module_utils/RecordingsUtils)  
**Returns**: <code>object</code> - {missing, additional, correct} area ratios  
**Todo**

- [ ] move to comparison
- [ ] not used or tested yet
- [ ] add threshold for small errors (i.e. ignore area left and right of notes' start and end (masking?)))


| Param | Type | Description |
| --- | --- | --- |
| differenceMap | <code>Map</code> | differenceMap from differenceMap() |

**Example**  
```js
const diffMap = differenceMap(gtNotes, recNotes, 10);     const diffMapErrors = differenceMapErrorAreas(diffMap);     const {missing, additional, correct} = diffMapErrors;
```
<a name="module_utils/StatisticsUtils"></a>

## utils/StatisticsUtils

* [utils/StatisticsUtils](#module_utils/StatisticsUtils)
    * [.pearsonCorrelation(x, y)](#module_utils/StatisticsUtils.pearsonCorrelation) ⇒ <code>number</code>
    * [.confidenceInterval(values)](#module_utils/StatisticsUtils.confidenceInterval) ⇒ <code>object</code>
    * [.getBoxplotCharacteristics(values)](#module_utils/StatisticsUtils.getBoxplotCharacteristics) ⇒ <code>object</code>
    * [.kernelDensityEstimator(kernel, X)](#module_utils/StatisticsUtils.kernelDensityEstimator) ⇒ <code>function</code>
        * [~estimator(V)](#module_utils/StatisticsUtils.kernelDensityEstimator..estimator) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
    * [.kernelEpanechnikov(k)](#module_utils/StatisticsUtils.kernelEpanechnikov) ⇒ <code>function</code>
        * [~epKernel(v)](#module_utils/StatisticsUtils.kernelEpanechnikov..epKernel) ⇒ <code>number</code>
    * [.kernelGauss(k)](#module_utils/StatisticsUtils.kernelGauss) ⇒ <code>function</code>
        * [~gaKernel(v)](#module_utils/StatisticsUtils.kernelGauss..gaKernel) ⇒ <code>number</code>

<a name="module_utils/StatisticsUtils.pearsonCorrelation"></a>

### utils/StatisticsUtils.pearsonCorrelation(x, y) ⇒ <code>number</code>
Computes the Pearson correlation

**Kind**: static method of [<code>utils/StatisticsUtils</code>](#module_utils/StatisticsUtils)  
**Returns**: <code>number</code> - correlation  
**Throws**:

- <code>&#x27;Invalid data, must be two arrays with same length&#x27;</code> for invalid arguments
- <code>&#x27;Invalid data, length must be &gt;&#x3D; 2&#x27;</code> for invalid arguments

**See**: https://gist.github.com/matt-west/6500993#gistcomment-3718526  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Array.&lt;number&gt;</code> | an array of numbers |
| y | <code>Array.&lt;number&gt;</code> | an array of numbers |

<a name="module_utils/StatisticsUtils.confidenceInterval"></a>

### utils/StatisticsUtils.confidenceInterval(values) ⇒ <code>object</code>
Calculates a 95% confidence interval

**Kind**: static method of [<code>utils/StatisticsUtils</code>](#module_utils/StatisticsUtils)  
**Returns**: <code>object</code> - {mean, low, high}  
**See**: https://www.alchemer.com/resources/blog/how-to-calculate-confidence-intervals/  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array.&lt;numnber&gt;</code> | values |

<a name="module_utils/StatisticsUtils.getBoxplotCharacteristics"></a>

### utils/StatisticsUtils.getBoxplotCharacteristics(values) ⇒ <code>object</code>
Given an array of numbers, computes the proportions of a boxplot.

**Kind**: static method of [<code>utils/StatisticsUtils</code>](#module_utils/StatisticsUtils)  
**Returns**: <code>object</code> - { q1, q2, q3, r0, r1 }  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array.&lt;number&gt;</code> | values |

<a name="module_utils/StatisticsUtils.kernelDensityEstimator"></a>

### utils/StatisticsUtils.kernelDensityEstimator(kernel, X) ⇒ <code>function</code>
Returns a kernel desity estimator function.

**Kind**: static method of [<code>utils/StatisticsUtils</code>](#module_utils/StatisticsUtils)  
**Returns**: <code>function</code> - kernel density estimator  
**See**: https://www.d3-graph-gallery.com/graph/violin_basicDens.html  

| Param | Type | Description |
| --- | --- | --- |
| kernel | <code>function</code> | kernel function |
| X | <code>Array.&lt;number&gt;</code> | domain |

**Example**  
```js
// With x being a d3.scaleLinear() scaleconst kde = kernelDensityEstimator(kernelEpanechnikov(0.2), x.ticks(50));const estimate = kde(data);
```
<a name="module_utils/StatisticsUtils.kernelDensityEstimator..estimator"></a>

#### kernelDensityEstimator~estimator(V) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
Kernel desity estimatorFor each value of X it computes the estimated density of the data valuesin V. The result has the form [ [x1, est1], [x2, est2], ... ]

**Kind**: inner method of [<code>kernelDensityEstimator</code>](#module_utils/StatisticsUtils.kernelDensityEstimator)  
**Returns**: <code>Array.&lt;Array.&lt;number&gt;&gt;</code> - estimates for points of X  

| Param | Type | Description |
| --- | --- | --- |
| V | <code>Array.&lt;number&gt;</code> | values |

<a name="module_utils/StatisticsUtils.kernelEpanechnikov"></a>

### utils/StatisticsUtils.kernelEpanechnikov(k) ⇒ <code>function</code>
Epanechnikov kernel

**Kind**: static method of [<code>utils/StatisticsUtils</code>](#module_utils/StatisticsUtils)  
**Returns**: <code>function</code> - kernel function with curried k  

| Param | Type | Description |
| --- | --- | --- |
| k | <code>number</code> | kernel size |

<a name="module_utils/StatisticsUtils.kernelEpanechnikov..epKernel"></a>

#### kernelEpanechnikov~epKernel(v) ⇒ <code>number</code>
Epanechnokov kernel function

**Kind**: inner method of [<code>kernelEpanechnikov</code>](#module_utils/StatisticsUtils.kernelEpanechnikov)  
**Returns**: <code>number</code> - result  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>number</code> | value |

<a name="module_utils/StatisticsUtils.kernelGauss"></a>

### utils/StatisticsUtils.kernelGauss(k) ⇒ <code>function</code>
Gauss kernel

**Kind**: static method of [<code>utils/StatisticsUtils</code>](#module_utils/StatisticsUtils)  
**Returns**: <code>function</code> - kernel function with curried k  

| Param | Type | Description |
| --- | --- | --- |
| k | <code>number</code> | kernel size |

<a name="module_utils/StatisticsUtils.kernelGauss..gaKernel"></a>

#### kernelGauss~gaKernel(v) ⇒ <code>number</code>
Gaussian kernel function

**Kind**: inner method of [<code>kernelGauss</code>](#module_utils/StatisticsUtils.kernelGauss)  
**Returns**: <code>number</code> - result  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>number</code> | value |

<a name="module_utils/WebMidiUtils"></a>

## utils/WebMidiUtils
<a name="module_utils/WebMidiUtils.pingMidiDevice"></a>

### utils/WebMidiUtils.pingMidiDevice(deviceName, howOften)
Allows to ping a MIDI device that loops back to measure latency.
The tool loopMIDI does exactly this:

**Kind**: static method of [<code>utils/WebMidiUtils</code>](#module_utils/WebMidiUtils)  
**See**: https://www.tobias-erichsen.de/software/loopmidi.html.  

| Param | Type | Description |
| --- | --- | --- |
| deviceName | <code>string</code> | name of the MIDI device |
| howOften | <code>number</code> | how many times to ping the device |

**Example**  
```js
pingMidiDevice('loopMIDI Port', 10);
```
<a name="GuitarNote"></a>

## GuitarNote ⇐ [<code>Note</code>](#Note)
Guitar note class that reflects MIDI properties but has
absolute start and end times in seconds and
information on how to play it.

**Kind**: global class  
**Extends**: [<code>Note</code>](#Note)  

* [GuitarNote](#GuitarNote) ⇐ [<code>Note</code>](#Note)
    * [new GuitarNote(pitch, start, velocity, channel, end, string, fret)](#new_GuitarNote_new)
    * _instance_
        * [.toNote()](#GuitarNote+toNote) ⇒ [<code>Note</code>](#Note)
        * [.clone()](#GuitarNote+clone) ⇒ [<code>GuitarNote</code>](#GuitarNote)
        * [.equals(otherNote)](#GuitarNote+equals) ⇒ <code>boolean</code>
        * [.toString(short)](#GuitarNote+toString) ⇒ <code>string</code>
        * [.getDuration()](#Note+getDuration) ⇒ <code>number</code>
        * [.getName()](#Note+getName) ⇒ <code>string</code>
        * [.getLetter()](#Note+getLetter) ⇒ <code>string</code>
        * [.getOctave()](#Note+getOctave) ⇒ <code>number</code>
        * [.shiftTime(addedSeconds)](#Note+shiftTime) ⇒ [<code>Note</code>](#Note)
        * [.scaleTime(factor)](#Note+scaleTime) ⇒ [<code>Note</code>](#Note)
        * [.overlapsInTime(otherNote)](#Note+overlapsInTime) ⇒ <code>boolean</code>
        * [.overlapInSeconds(otherNote)](#Note+overlapInSeconds) ⇒ <code>number</code>
    * _static_
        * [.from(object)](#GuitarNote.from) ⇒ [<code>GuitarNote</code>](#GuitarNote)
        * [.fromNote(note, string, fret)](#GuitarNote.fromNote) ⇒ [<code>GuitarNote</code>](#GuitarNote)

<a name="new_GuitarNote_new"></a>

### new GuitarNote(pitch, start, velocity, channel, end, string, fret)
Creates a new Note


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pitch | <code>number</code> | <code>0</code> | pitch |
| start | <code>number</code> | <code>0</code> | start time in seconds |
| velocity | <code>number</code> | <code>127</code> | velocity |
| channel | <code>number</code> | <code>0</code> | MIDI channel |
| end | <code>number</code> | <code></code> | end time in seconds |
| string | <code>number</code> | <code></code> | guitar string |
| fret | <code>number</code> | <code></code> | guitar fret |

<a name="GuitarNote+toNote"></a>

### guitarNote.toNote() ⇒ [<code>Note</code>](#Note)
Simplifies the GuitarNote to a Note

**Kind**: instance method of [<code>GuitarNote</code>](#GuitarNote)  
**Returns**: [<code>Note</code>](#Note) - note  
<a name="GuitarNote+clone"></a>

### guitarNote.clone() ⇒ [<code>GuitarNote</code>](#GuitarNote)
Returns a copy of the Note object

**Kind**: instance method of [<code>GuitarNote</code>](#GuitarNote)  
**Overrides**: [<code>clone</code>](#Note+clone)  
**Returns**: [<code>GuitarNote</code>](#GuitarNote) - new note  
<a name="GuitarNote+equals"></a>

### guitarNote.equals(otherNote) ⇒ <code>boolean</code>
Returns true if this note and otherNote have equal attributes.

**Kind**: instance method of [<code>GuitarNote</code>](#GuitarNote)  
**Overrides**: [<code>equals</code>](#Note+equals)  
**Returns**: <code>boolean</code> - true if equal  

| Param | Type | Description |
| --- | --- | --- |
| otherNote | [<code>GuitarNote</code>](#GuitarNote) | another GuitarNote |

<a name="GuitarNote+toString"></a>

### guitarNote.toString(short) ⇒ <code>string</code>
Human-readable string representation of this GuitarNote

**Kind**: instance method of [<code>GuitarNote</code>](#GuitarNote)  
**Overrides**: [<code>toString</code>](#Note+toString)  
**Returns**: <code>string</code> - string representation  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| short | <code>boolean</code> | <code>false</code> | if true, attribute names will be shortened |

<a name="Note+getDuration"></a>

### guitarNote.getDuration() ⇒ <code>number</code>
Returns the duration of this note in seconds

**Kind**: instance method of [<code>GuitarNote</code>](#GuitarNote)  
**Overrides**: [<code>getDuration</code>](#Note+getDuration)  
**Returns**: <code>number</code> - note duration  
<a name="Note+getName"></a>

### guitarNote.getName() ⇒ <code>string</code>
Returns the note's name and octave, e.g. 'C#3'

**Kind**: instance method of [<code>GuitarNote</code>](#GuitarNote)  
**Overrides**: [<code>getName</code>](#Note+getName)  
**Returns**: <code>string</code> - note name as string  
<a name="Note+getLetter"></a>

### guitarNote.getLetter() ⇒ <code>string</code>
Returns the note's name WITHOUT the octave, e.g. 'C#'

**Kind**: instance method of [<code>GuitarNote</code>](#GuitarNote)  
**Overrides**: [<code>getLetter</code>](#Note+getLetter)  
**Returns**: <code>string</code> - note name as string  
<a name="Note+getOctave"></a>

### guitarNote.getOctave() ⇒ <code>number</code>
Returns the note's octave

**Kind**: instance method of [<code>GuitarNote</code>](#GuitarNote)  
**Overrides**: [<code>getOctave</code>](#Note+getOctave)  
**Returns**: <code>number</code> - the note's octave  
<a name="Note+shiftTime"></a>

### guitarNote.shiftTime(addedSeconds) ⇒ [<code>Note</code>](#Note)
Returns a new Note where start and end are multiplied by factor

**Kind**: instance method of [<code>GuitarNote</code>](#GuitarNote)  
**Overrides**: [<code>shiftTime</code>](#Note+shiftTime)  
**Returns**: [<code>Note</code>](#Note) - new note  

| Param | Type | Description |
| --- | --- | --- |
| addedSeconds | <code>number</code> | seconds to be added to start and end |

<a name="Note+scaleTime"></a>

### guitarNote.scaleTime(factor) ⇒ [<code>Note</code>](#Note)
Returns a new Note where start and end are multiplied by factor

**Kind**: instance method of [<code>GuitarNote</code>](#GuitarNote)  
**Overrides**: [<code>scaleTime</code>](#Note+scaleTime)  
**Returns**: [<code>Note</code>](#Note) - new note  

| Param | Type | Description |
| --- | --- | --- |
| factor | <code>number</code> | factor to scale start and end with |

<a name="Note+overlapsInTime"></a>

### guitarNote.overlapsInTime(otherNote) ⇒ <code>boolean</code>
Returns true, if this Note and otherNote overlap in time.

**Kind**: instance method of [<code>GuitarNote</code>](#GuitarNote)  
**Overrides**: [<code>overlapsInTime</code>](#Note+overlapsInTime)  
**Returns**: <code>boolean</code> - true if they overlap  

| Param | Type | Description |
| --- | --- | --- |
| otherNote | [<code>Note</code>](#Note) | another Note |

<a name="Note+overlapInSeconds"></a>

### guitarNote.overlapInSeconds(otherNote) ⇒ <code>number</code>
Returns the amount of seconds this Note and otherNote overlap in time.

**Kind**: instance method of [<code>GuitarNote</code>](#GuitarNote)  
**Overrides**: [<code>overlapInSeconds</code>](#Note+overlapInSeconds)  
**Returns**: <code>number</code> - seconds of overlap  

| Param | Type | Description |
| --- | --- | --- |
| otherNote | [<code>Note</code>](#Note) | another Note |

<a name="GuitarNote.from"></a>

### GuitarNote.from(object) ⇒ [<code>GuitarNote</code>](#GuitarNote)
Creates a GuitarNote object from an object via destructuring

**Kind**: static method of [<code>GuitarNote</code>](#GuitarNote)  
**Returns**: [<code>GuitarNote</code>](#GuitarNote) - new note  
**Throws**:

- <code>Error</code> when pitch is invalid


| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | object with at least {pitch}  {      pitch: number|string    e.g. 12 or C#4      start: number           start time in seconds      end: number             end time in seconds      velocity: number        MIDI velocity      channel: number         MIDI channel      string: number          guitar string      fret: number            guitar fret  } |

<a name="GuitarNote.fromNote"></a>

### GuitarNote.fromNote(note, string, fret) ⇒ [<code>GuitarNote</code>](#GuitarNote)
Converts a Note to a GuitarNote

**Kind**: static method of [<code>GuitarNote</code>](#GuitarNote)  
**Returns**: [<code>GuitarNote</code>](#GuitarNote) - guitar note  

| Param | Type | Description |
| --- | --- | --- |
| note | [<code>Note</code>](#Note) | note |
| string | <code>number</code> | string |
| fret | <code>number</code> | fret |

<a name="HarmonicaNote"></a>

## HarmonicaNote ⇐ [<code>Note</code>](#Note)
Harmonica note class that reflects MIDI properties but has
absolute start and end times in seconds and
information on how to play it.

**Kind**: global class  
**Extends**: [<code>Note</code>](#Note)  

* [HarmonicaNote](#HarmonicaNote) ⇐ [<code>Note</code>](#Note)
    * [new HarmonicaNote(pitch, start, velocity, channel, end, hole, instruction)](#new_HarmonicaNote_new)
    * _instance_
        * [.toNote()](#HarmonicaNote+toNote) ⇒ [<code>Note</code>](#Note)
        * [.clone()](#HarmonicaNote+clone) ⇒ [<code>GuitarNote</code>](#GuitarNote)
        * [.equals(otherNote)](#HarmonicaNote+equals) ⇒ <code>boolean</code>
        * [.toString(short)](#HarmonicaNote+toString) ⇒ <code>string</code>
        * [.getDuration()](#Note+getDuration) ⇒ <code>number</code>
        * [.getName()](#Note+getName) ⇒ <code>string</code>
        * [.getLetter()](#Note+getLetter) ⇒ <code>string</code>
        * [.getOctave()](#Note+getOctave) ⇒ <code>number</code>
        * [.shiftTime(addedSeconds)](#Note+shiftTime) ⇒ [<code>Note</code>](#Note)
        * [.scaleTime(factor)](#Note+scaleTime) ⇒ [<code>Note</code>](#Note)
        * [.overlapsInTime(otherNote)](#Note+overlapsInTime) ⇒ <code>boolean</code>
        * [.overlapInSeconds(otherNote)](#Note+overlapInSeconds) ⇒ <code>number</code>
    * _static_
        * [.from(object)](#HarmonicaNote.from) ⇒ [<code>HarmonicaNote</code>](#HarmonicaNote)
        * [.fromNote(note, hole, instruction)](#HarmonicaNote.fromNote) ⇒ [<code>HarmonicaNote</code>](#HarmonicaNote)

<a name="new_HarmonicaNote_new"></a>

### new HarmonicaNote(pitch, start, velocity, channel, end, hole, instruction)
Creates a new Note


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pitch | <code>number</code> | <code>0</code> | pitch |
| start | <code>number</code> | <code>0</code> | start time in seconds |
| velocity | <code>number</code> | <code>127</code> | velocity |
| channel | <code>number</code> | <code>0</code> | MIDI channel |
| end | <code>number</code> | <code></code> | end time in seconds |
| hole | <code>number</code> | <code></code> | harmonica hole |
| instruction | <code>&#x27;blow&#x27;</code> \| <code>&#x27;draw&#x27;</code> \| <code>&#x27;bend&#x27;</code> \| <code>&#x27;overblow&#x27;</code> | <code></code> | instruction, e.g., blow or draw |

<a name="HarmonicaNote+toNote"></a>

### harmonicaNote.toNote() ⇒ [<code>Note</code>](#Note)
Simplifies the HarmonicaNote to a Note

**Kind**: instance method of [<code>HarmonicaNote</code>](#HarmonicaNote)  
**Returns**: [<code>Note</code>](#Note) - note  
<a name="HarmonicaNote+clone"></a>

### harmonicaNote.clone() ⇒ [<code>GuitarNote</code>](#GuitarNote)
Returns a copy of the Note object

**Kind**: instance method of [<code>HarmonicaNote</code>](#HarmonicaNote)  
**Overrides**: [<code>clone</code>](#Note+clone)  
**Returns**: [<code>GuitarNote</code>](#GuitarNote) - new note  
<a name="HarmonicaNote+equals"></a>

### harmonicaNote.equals(otherNote) ⇒ <code>boolean</code>
Returns true if this note and otherNote have equal attributes.

**Kind**: instance method of [<code>HarmonicaNote</code>](#HarmonicaNote)  
**Overrides**: [<code>equals</code>](#Note+equals)  
**Returns**: <code>boolean</code> - true if equal  

| Param | Type | Description |
| --- | --- | --- |
| otherNote | [<code>GuitarNote</code>](#GuitarNote) | another GuitarNote |

<a name="HarmonicaNote+toString"></a>

### harmonicaNote.toString(short) ⇒ <code>string</code>
Human-readable string representation of this HarmonicaNote

**Kind**: instance method of [<code>HarmonicaNote</code>](#HarmonicaNote)  
**Overrides**: [<code>toString</code>](#Note+toString)  
**Returns**: <code>string</code> - string representation  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| short | <code>boolean</code> | <code>false</code> | if true, attribute names will be shortened |

<a name="Note+getDuration"></a>

### harmonicaNote.getDuration() ⇒ <code>number</code>
Returns the duration of this note in seconds

**Kind**: instance method of [<code>HarmonicaNote</code>](#HarmonicaNote)  
**Overrides**: [<code>getDuration</code>](#Note+getDuration)  
**Returns**: <code>number</code> - note duration  
<a name="Note+getName"></a>

### harmonicaNote.getName() ⇒ <code>string</code>
Returns the note's name and octave, e.g. 'C#3'

**Kind**: instance method of [<code>HarmonicaNote</code>](#HarmonicaNote)  
**Overrides**: [<code>getName</code>](#Note+getName)  
**Returns**: <code>string</code> - note name as string  
<a name="Note+getLetter"></a>

### harmonicaNote.getLetter() ⇒ <code>string</code>
Returns the note's name WITHOUT the octave, e.g. 'C#'

**Kind**: instance method of [<code>HarmonicaNote</code>](#HarmonicaNote)  
**Overrides**: [<code>getLetter</code>](#Note+getLetter)  
**Returns**: <code>string</code> - note name as string  
<a name="Note+getOctave"></a>

### harmonicaNote.getOctave() ⇒ <code>number</code>
Returns the note's octave

**Kind**: instance method of [<code>HarmonicaNote</code>](#HarmonicaNote)  
**Overrides**: [<code>getOctave</code>](#Note+getOctave)  
**Returns**: <code>number</code> - the note's octave  
<a name="Note+shiftTime"></a>

### harmonicaNote.shiftTime(addedSeconds) ⇒ [<code>Note</code>](#Note)
Returns a new Note where start and end are multiplied by factor

**Kind**: instance method of [<code>HarmonicaNote</code>](#HarmonicaNote)  
**Overrides**: [<code>shiftTime</code>](#Note+shiftTime)  
**Returns**: [<code>Note</code>](#Note) - new note  

| Param | Type | Description |
| --- | --- | --- |
| addedSeconds | <code>number</code> | seconds to be added to start and end |

<a name="Note+scaleTime"></a>

### harmonicaNote.scaleTime(factor) ⇒ [<code>Note</code>](#Note)
Returns a new Note where start and end are multiplied by factor

**Kind**: instance method of [<code>HarmonicaNote</code>](#HarmonicaNote)  
**Overrides**: [<code>scaleTime</code>](#Note+scaleTime)  
**Returns**: [<code>Note</code>](#Note) - new note  

| Param | Type | Description |
| --- | --- | --- |
| factor | <code>number</code> | factor to scale start and end with |

<a name="Note+overlapsInTime"></a>

### harmonicaNote.overlapsInTime(otherNote) ⇒ <code>boolean</code>
Returns true, if this Note and otherNote overlap in time.

**Kind**: instance method of [<code>HarmonicaNote</code>](#HarmonicaNote)  
**Overrides**: [<code>overlapsInTime</code>](#Note+overlapsInTime)  
**Returns**: <code>boolean</code> - true if they overlap  

| Param | Type | Description |
| --- | --- | --- |
| otherNote | [<code>Note</code>](#Note) | another Note |

<a name="Note+overlapInSeconds"></a>

### harmonicaNote.overlapInSeconds(otherNote) ⇒ <code>number</code>
Returns the amount of seconds this Note and otherNote overlap in time.

**Kind**: instance method of [<code>HarmonicaNote</code>](#HarmonicaNote)  
**Overrides**: [<code>overlapInSeconds</code>](#Note+overlapInSeconds)  
**Returns**: <code>number</code> - seconds of overlap  

| Param | Type | Description |
| --- | --- | --- |
| otherNote | [<code>Note</code>](#Note) | another Note |

<a name="HarmonicaNote.from"></a>

### HarmonicaNote.from(object) ⇒ [<code>HarmonicaNote</code>](#HarmonicaNote)
Creates a HarmonicaNote object from an object via destructuring

**Kind**: static method of [<code>HarmonicaNote</code>](#HarmonicaNote)  
**Returns**: [<code>HarmonicaNote</code>](#HarmonicaNote) - new note  
**Throws**:

- <code>Error</code> when pitch is invalid


| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | object with at least {pitch}  {      pitch: number|string    e.g. 12 or C#4      start: number           start time in seconds      end: number             end time in seconds      velocity: number        MIDI velocity      channel: number         MIDI channel      hole: number            harmonica hole      instruction: string     instruction, e.g., blow or draw  } |

<a name="HarmonicaNote.fromNote"></a>

### HarmonicaNote.fromNote(note, hole, instruction) ⇒ [<code>HarmonicaNote</code>](#HarmonicaNote)
Converts a Note to a Harmonica

**Kind**: static method of [<code>HarmonicaNote</code>](#HarmonicaNote)  
**Returns**: [<code>HarmonicaNote</code>](#HarmonicaNote) - harmonica note  

| Param | Type | Description |
| --- | --- | --- |
| note | [<code>Note</code>](#Note) | note |
| hole | <code>number</code> | harmonica hole |
| instruction | <code>&#x27;blow&#x27;</code> \| <code>&#x27;draw&#x27;</code> \| <code>&#x27;bend&#x27;</code> \| <code>&#x27;overblow&#x27;</code> | instruction, e.g., blow or draw |

<a name="MusicPiece"></a>

## ~~MusicPiece~~
***Deprecated***

Represents a parsed MIDI or MusicXML file in a uniform format.

**Kind**: global class  

* ~~[MusicPiece](#MusicPiece)~~
    * [new MusicPiece(name, tempos, timeSignatures, keySignatures, measureTimes, tracks, [xmlMeasureIndices])](#new_MusicPiece_new)
    * _instance_
        * [.toJson(pretty)](#MusicPiece+toJson) ⇒ <code>string</code>
        * ~~[.getAllNotes(sortByTime)](#MusicPiece+getAllNotes) ⇒ [<code>Array.&lt;Note&gt;</code>](#Note)~~
        * [.getNotesFromTracks(indices, sortByTime)](#MusicPiece+getNotesFromTracks) ⇒ [<code>Array.&lt;Note&gt;</code>](#Note)
        * [.transpose(steps, tracks)](#MusicPiece+transpose) ⇒ [<code>MusicPiece</code>](#MusicPiece)
    * _static_
        * [.fromMidi(name, midiFile)](#MusicPiece.fromMidi) ⇒ [<code>MusicPiece</code>](#MusicPiece)
        * [.fromMusicXml(name, xmlFile)](#MusicPiece.fromMusicXml) ⇒ [<code>MusicPiece</code>](#MusicPiece)
        * [.fromJson(json)](#MusicPiece.fromJson) ⇒ [<code>MusicPiece</code>](#MusicPiece)

<a name="new_MusicPiece_new"></a>

### new MusicPiece(name, tempos, timeSignatures, keySignatures, measureTimes, tracks, [xmlMeasureIndices])
**Throws**:

- <code>&#x27;No or invalid tracks given!&#x27;</code> when invalid tracks are given


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name (e.g. file name or piece name) |
| tempos | [<code>Array.&lt;TempoDefinition&gt;</code>](#TempoDefinition) | tempos |
| timeSignatures | [<code>Array.&lt;TimeSignature&gt;</code>](#TimeSignature) | time signatures |
| keySignatures | [<code>Array.&lt;KeySignature&gt;</code>](#KeySignature) | key signatures |
| measureTimes | <code>Array.&lt;number&gt;</code> | time in seconds for each measure line |
| tracks | [<code>Array.&lt;Track&gt;</code>](#Track) | tracks |
| [xmlMeasureIndices] | <code>Array.&lt;number&gt;</code> | for each parsed measure, the index of   the corresponding XML measure (only for MusicXML) |

<a name="MusicPiece+toJson"></a>

### musicPiece.toJson(pretty) ⇒ <code>string</code>
Returns a JSON-serialized representation

**Kind**: instance method of [<code>MusicPiece</code>](#MusicPiece)  
**Returns**: <code>string</code> - JSON as string  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pretty | <code>boolean</code> | <code>false</code> | true for readable (prettified) JSON |

**Example**  
```js
const jsonString = mp.toJson();     const recovered = MusicPiece.fromJson(jsonString);
```
<a name="MusicPiece+getAllNotes"></a>

### ~~musicPiece.getAllNotes(sortByTime) ⇒ [<code>Array.&lt;Note&gt;</code>](#Note)~~
***Deprecated***

Returns an array with all notes from all tracks.

**Kind**: instance method of [<code>MusicPiece</code>](#MusicPiece)  
**Returns**: [<code>Array.&lt;Note&gt;</code>](#Note) - all notes of this piece  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sortByTime | <code>boolean</code> | <code>false</code> | true: sort notes by time |

<a name="MusicPiece+getNotesFromTracks"></a>

### musicPiece.getNotesFromTracks(indices, sortByTime) ⇒ [<code>Array.&lt;Note&gt;</code>](#Note)
Returns an array with notes from the specified tracks.

**Kind**: instance method of [<code>MusicPiece</code>](#MusicPiece)  
**Returns**: [<code>Array.&lt;Note&gt;</code>](#Note) - Array with all notes from the specified tracks  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| indices | <code>&#x27;all&#x27;</code> \| <code>number</code> \| <code>Array.&lt;number&gt;</code> | <code>all</code> | either 'all', a number, or an      Array with numbers |
| sortByTime | <code>boolean</code> | <code>false</code> | true: sort notes by time (not needed for a      single track) |

<a name="MusicPiece+transpose"></a>

### musicPiece.transpose(steps, tracks) ⇒ [<code>MusicPiece</code>](#MusicPiece)
Transposes all or only the specified tracks by the specified number of(semitone) steps.Will return a new MusicPiece instance.Note pitches will be clipped to [0, 127].Will not change playing instructions such as string and fret.

**Kind**: instance method of [<code>MusicPiece</code>](#MusicPiece)  
**Returns**: [<code>MusicPiece</code>](#MusicPiece) - a new, transposed MusicPiece  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| steps | <code>number</code> | <code>0</code> | number of semitones to transpose (can be negative) |
| tracks | <code>&#x27;all&#x27;</code> \| <code>number</code> \| <code>Array.&lt;number&gt;</code> | <code>all</code> | tracks to transpose |

<a name="MusicPiece.fromMidi"></a>

### MusicPiece.fromMidi(name, midiFile) ⇒ [<code>MusicPiece</code>](#MusicPiece)
Creates a MusicPiece object from a MIDI file binary

**Kind**: static method of [<code>MusicPiece</code>](#MusicPiece)  
**Returns**: [<code>MusicPiece</code>](#MusicPiece) - new MusicPiece  
**Throws**:

- <code>&#x27;No MIDI file content given&#x27;</code> when MIDI file is undefined or null


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name |
| midiFile | <code>ArrayBuffer</code> | MIDI file |

**Example** *(In Node.js)*  
```js
     const file = path.join(directory, fileName);
     const data = fs.readFileSync(file, 'base64');
     const mp = MusicPiece.fromMidi(fileName, data);
```
**Example** *(In the browser)*  
```js
     const uintArray = new Uint8Array(midiBinary);
     const MP = MusicPiece.fromMidi(filename, uintArray);
```
<a name="MusicPiece.fromMusicXml"></a>

### MusicPiece.fromMusicXml(name, xmlFile) ⇒ [<code>MusicPiece</code>](#MusicPiece)
Creates a MusicPiece object from a MusicXML string

**Kind**: static method of [<code>MusicPiece</code>](#MusicPiece)  
**Returns**: [<code>MusicPiece</code>](#MusicPiece) - new MusicPiece  
**Throws**:

- <code>&#x27;No MusicXML file content given&#x27;</code> when MusicXML file is undefined or null


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name |
| xmlFile | <code>string</code> \| <code>object</code> | MusicXML file content as string or object      If it is an object, it must behave like a DOM, e.g. provide methods      such as .querySelectorAll() |

**Example**  
```js
Parsing a MusicPiece in Node.js   const jsdom = require('jsdom');   const xmlFile = fs.readFileSync('My Song.musicxml');   const dom = new jsdom.JSDOM(xmlFile);   const xmlDocument = dom.window.document;   const mp = musicvislib.MusicPiece.fromMusicXml('My Song', xmlDocument);
```
<a name="MusicPiece.fromJson"></a>

### MusicPiece.fromJson(json) ⇒ [<code>MusicPiece</code>](#MusicPiece)
Allows to get a MusicPiece from JSON after doing JSON.stringify()

**Kind**: static method of [<code>MusicPiece</code>](#MusicPiece)  
**Returns**: [<code>MusicPiece</code>](#MusicPiece) - new MusicPiece  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>string</code> \| <code>object</code> | JSON |

**Example**  
```js
const jsonString = mp.toJson();     const recovered = MusicPiece.fromJson(jsonString);
```
<a name="Note"></a>

## Note
Note class that reflects MIDI properties but hasabsolute start and end times in seconds.

**Kind**: global class  

* [Note](#Note)
    * [new Note(pitch, start, velocity, channel, end)](#new_Note_new)
    * _instance_
        * [.clone()](#Note+clone) ⇒ [<code>Note</code>](#Note)
        * [.getDuration()](#Note+getDuration) ⇒ <code>number</code>
        * [.getName()](#Note+getName) ⇒ <code>string</code>
        * [.getLetter()](#Note+getLetter) ⇒ <code>string</code>
        * [.getOctave()](#Note+getOctave) ⇒ <code>number</code>
        * [.shiftTime(addedSeconds)](#Note+shiftTime) ⇒ [<code>Note</code>](#Note)
        * [.scaleTime(factor)](#Note+scaleTime) ⇒ [<code>Note</code>](#Note)
        * [.overlapsInTime(otherNote)](#Note+overlapsInTime) ⇒ <code>boolean</code>
        * [.overlapInSeconds(otherNote)](#Note+overlapInSeconds) ⇒ <code>number</code>
        * [.equals(otherNote)](#Note+equals) ⇒ <code>boolean</code>
        * [.toString(short)](#Note+toString) ⇒ <code>string</code>
    * _static_
        * [.from(object)](#Note.from) ⇒ [<code>Note</code>](#Note)

<a name="new_Note_new"></a>

### new Note(pitch, start, velocity, channel, end)
Creates a new Note. Note.from() is preferred over using the constructor.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pitch | <code>number</code> | <code>0</code> | pitch |
| start | <code>number</code> | <code>0</code> | start time in seconds |
| velocity | <code>number</code> | <code>127</code> | velocity |
| channel | <code>number</code> | <code>0</code> | MIDI channel |
| end | <code>number</code> | <code></code> | end time in seconds |

<a name="Note+clone"></a>

### note.clone() ⇒ [<code>Note</code>](#Note)
Returns a copy of the Note object

**Kind**: instance method of [<code>Note</code>](#Note)  
**Returns**: [<code>Note</code>](#Note) - new note  
<a name="Note+getDuration"></a>

### note.getDuration() ⇒ <code>number</code>
Returns the duration of this note in seconds

**Kind**: instance method of [<code>Note</code>](#Note)  
**Returns**: <code>number</code> - note duration  
<a name="Note+getName"></a>

### note.getName() ⇒ <code>string</code>
Returns the note's name and octave, e.g. 'C#3'

**Kind**: instance method of [<code>Note</code>](#Note)  
**Returns**: <code>string</code> - note name as string  
<a name="Note+getLetter"></a>

### note.getLetter() ⇒ <code>string</code>
Returns the note's name WITHOUT the octave, e.g. 'C#'

**Kind**: instance method of [<code>Note</code>](#Note)  
**Returns**: <code>string</code> - note name as string  
<a name="Note+getOctave"></a>

### note.getOctave() ⇒ <code>number</code>
Returns the note's octave

**Kind**: instance method of [<code>Note</code>](#Note)  
**Returns**: <code>number</code> - the note's octave  
<a name="Note+shiftTime"></a>

### note.shiftTime(addedSeconds) ⇒ [<code>Note</code>](#Note)
Returns a new Note where start and end are multiplied by factor

**Kind**: instance method of [<code>Note</code>](#Note)  
**Returns**: [<code>Note</code>](#Note) - new note  

| Param | Type | Description |
| --- | --- | --- |
| addedSeconds | <code>number</code> | seconds to be added to start and end |

<a name="Note+scaleTime"></a>

### note.scaleTime(factor) ⇒ [<code>Note</code>](#Note)
Returns a new Note where start and end are multiplied by factor

**Kind**: instance method of [<code>Note</code>](#Note)  
**Returns**: [<code>Note</code>](#Note) - new note  

| Param | Type | Description |
| --- | --- | --- |
| factor | <code>number</code> | factor to scale start and end with |

<a name="Note+overlapsInTime"></a>

### note.overlapsInTime(otherNote) ⇒ <code>boolean</code>
Returns true, if this Note and otherNote overlap in time.

**Kind**: instance method of [<code>Note</code>](#Note)  
**Returns**: <code>boolean</code> - true if they overlap  

| Param | Type | Description |
| --- | --- | --- |
| otherNote | [<code>Note</code>](#Note) | another Note |

<a name="Note+overlapInSeconds"></a>

### note.overlapInSeconds(otherNote) ⇒ <code>number</code>
Returns the amount of seconds this Note and otherNote overlap in time.

**Kind**: instance method of [<code>Note</code>](#Note)  
**Returns**: <code>number</code> - seconds of overlap  

| Param | Type | Description |
| --- | --- | --- |
| otherNote | [<code>Note</code>](#Note) | another Note |

<a name="Note+equals"></a>

### note.equals(otherNote) ⇒ <code>boolean</code>
Returns true if this note and otherNote have equal attributes.

**Kind**: instance method of [<code>Note</code>](#Note)  
**Returns**: <code>boolean</code> - true if equal  

| Param | Type | Description |
| --- | --- | --- |
| otherNote | [<code>Note</code>](#Note) | another Note |

<a name="Note+toString"></a>

### note.toString(short) ⇒ <code>string</code>
Human-readable string representation of this Note

**Kind**: instance method of [<code>Note</code>](#Note)  
**Returns**: <code>string</code> - string representation  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| short | <code>boolean</code> | <code>false</code> | if true, attribute names will be shortened |

<a name="Note.from"></a>

### Note.from(object) ⇒ [<code>Note</code>](#Note)
Creates a Note object from an object via destructuring.Use either 'end' or 'duration', if both are specified, end will be used.

**Kind**: static method of [<code>Note</code>](#Note)  
**Returns**: [<code>Note</code>](#Note) - new note  
**Throws**:

- <code>Error</code> when pitch is invalid


| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | object with at least {pitch} |
| object.pitch | <code>number</code> \| <code>string</code> | e.G. 12 or C#4 |
| object.start | <code>number</code> | start time in seconds |
| object.end | <code>number</code> | end time in seconds |
| object.duration | <code>number</code> | duration in seconds |
| object.velocity | <code>number</code> | MIDI velocity |
| object.channel | <code>number</code> | MIDI channel |

**Example** *(Using end)*  
```js
 const n = Note.from({
     pitch: 'C#4',     // e.g. 12 or C#4
     start: 0.5,       // start time in seconds
     end: 1.5,         // end time in seconds
     velocity: 127,    // MIDI velocity
     channel: 0,       // MIDI channel
 });
```
**Example** *(Using duration)*  
```js
 const n = Note.from({
     pitch: 'C#4',
     start: 0.5,
     duration: 1.2,
 });
```
<a name="NoteArray"></a>

## NoteArray
This class represents an array of note objects.It can be used to simplify operations on a track.

**Kind**: global class  

* [NoteArray](#NoteArray)
    * [new NoteArray([notes], [reUseNotes])](#new_NoteArray_new)
    * [.getNotes()](#NoteArray+getNotes) ⇒ [<code>Array.&lt;Note&gt;</code>](#Note)
    * [.setNotes(notes)](#NoteArray+setNotes) ⇒ [<code>NoteArray</code>](#NoteArray)
    * [.addNotes(notes, sort)](#NoteArray+addNotes) ⇒ [<code>NoteArray</code>](#NoteArray)
    * [.concat(noteArray)](#NoteArray+concat) ⇒ [<code>NoteArray</code>](#NoteArray)
    * [.append(noteArray, gap)](#NoteArray+append) ⇒ [<code>NoteArray</code>](#NoteArray)
    * [.repeat(times)](#NoteArray+repeat) ⇒ [<code>NoteArray</code>](#NoteArray)
    * [.length()](#NoteArray+length) ⇒ <code>number</code>
    * [.getStartTime()](#NoteArray+getStartTime) ⇒ <code>number</code>
    * [.getDuration()](#NoteArray+getDuration) ⇒ <code>number</code>
    * [.scaleTime(factor)](#NoteArray+scaleTime) ⇒ [<code>NoteArray</code>](#NoteArray)
    * [.shiftTime(addedSeconds)](#NoteArray+shiftTime) ⇒ [<code>NoteArray</code>](#NoteArray)
    * [.shiftToStartAt(startTime)](#NoteArray+shiftToStartAt) ⇒ [<code>NoteArray</code>](#NoteArray)
    * [.forEach(func)](#NoteArray+forEach) ⇒ [<code>NoteArray</code>](#NoteArray)
    * [.sort(sortFunction)](#NoteArray+sort) ⇒ [<code>NoteArray</code>](#NoteArray)
    * [.sortByTime()](#NoteArray+sortByTime) ⇒ [<code>NoteArray</code>](#NoteArray)
    * [.map(mapFunction)](#NoteArray+map) ⇒ [<code>NoteArray</code>](#NoteArray)
    * [.slice(start, end)](#NoteArray+slice) ⇒ [<code>NoteArray</code>](#NoteArray)
    * [.sliceTime(startTime, endTime, [mode])](#NoteArray+sliceTime) ⇒ [<code>NoteArray</code>](#NoteArray)
    * [.sliceAtTimes(times, mode, [reUseNotes])](#NoteArray+sliceAtTimes) ⇒ <code>Array.&lt;Array.&lt;Note&gt;&gt;</code>
    * [.segmentAtGaps(gapDuration, mode)](#NoteArray+segmentAtGaps) ⇒ <code>Array.&lt;Array.&lt;Note&gt;&gt;</code>
    * [.segmentAtIndices(indices)](#NoteArray+segmentAtIndices) ⇒ <code>Array.&lt;Array.&lt;Note&gt;&gt;</code>
    * [.filter(filterFunction)](#NoteArray+filter) ⇒ [<code>NoteArray</code>](#NoteArray)
    * [.filterPitches(pitches)](#NoteArray+filterPitches) ⇒ [<code>NoteArray</code>](#NoteArray)
    * [.transpose(steps)](#NoteArray+transpose) ⇒ [<code>NoteArray</code>](#NoteArray)
    * [.removeOctaves()](#NoteArray+removeOctaves) ⇒ [<code>NoteArray</code>](#NoteArray)
    * [.reverse()](#NoteArray+reverse) ⇒ [<code>NoteArray</code>](#NoteArray)
    * [.equals(otherNoteArray)](#NoteArray+equals) ⇒ <code>boolean</code>
    * [.clone()](#NoteArray+clone) ⇒ [<code>NoteArray</code>](#NoteArray)

<a name="new_NoteArray_new"></a>

### new NoteArray([notes], [reUseNotes])
Creates a new NoteArray,will make a copy of the passed array and cast all notes


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [notes] | [<code>Array.&lt;Note&gt;</code>](#Note) | <code>[]</code> | notes |
| [reUseNotes] | <code>boolean</code> | <code>false</code> | if true, will directly use the passed notes.      This can be dangerous if you do not want them to change. |

**Example**  
```js
const notes = [      // Some Note objects  ];  const noteArr = new NoteArray(notes)      // Add more notes (all notes will be sorted by time by default after this)      .addNotes([])      // Scale all note's sart and end time to make a track slower or faster      .scaleTime(0.5)      // Do more ...      // This class also mirrors many functions from the Array class      .sort(sortFunction).filter(filterFunction).map(mapFunction).slice(0, 20)  // Get Note objects back in a simple Array  const transformedNotes = noteArr.getNotes();  // [Note, Note, Note, ...]  // Or use an iterator  for (const note of noteArr) {      console.log(note);  }
```
<a name="NoteArray+getNotes"></a>

### noteArray.getNotes() ⇒ [<code>Array.&lt;Note&gt;</code>](#Note)
Returns a simple array with all Note objects.

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>Array.&lt;Note&gt;</code>](#Note) - array with Note objects  
**Example** *(Getting notes as simple Note[])*  
```js
     const na = new NoteArray(someNotes);
     const notes = na.getNotes();
```
**Example** *(Using an iterator instead)*  
```js
     const na = new NoteArray(someNotes);
     for (const note of na) {
         console.log(note);
     }
     // Or copy all Notes to an array with
     const array = [...na];
```
<a name="NoteArray+setNotes"></a>

### noteArray.setNotes(notes) ⇒ [<code>NoteArray</code>](#NoteArray)
Overwrite the NoteArray's notes with another Array of Notes

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - itself  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |

<a name="NoteArray+addNotes"></a>

### noteArray.addNotes(notes, sort) ⇒ [<code>NoteArray</code>](#NoteArray)
Appends notes to this NoteArray

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - itself  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) |  | notes |
| sort | <code>boolean</code> | <code>true</code> | iff ture, sorts notes by start timeafter adding      the new ones (default:true) |

<a name="NoteArray+concat"></a>

### noteArray.concat(noteArray) ⇒ [<code>NoteArray</code>](#NoteArray)
Adds the notes from another NoteArray to this NoteArrayIMPORTANT: this does not change the notes or sort them!Take a look at NoteArray.append() if you want to extenda track at its end.

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - itself  

| Param | Type | Description |
| --- | --- | --- |
| noteArray | [<code>NoteArray</code>](#NoteArray) | another NoteArray |

<a name="NoteArray+append"></a>

### noteArray.append(noteArray, gap) ⇒ [<code>NoteArray</code>](#NoteArray)
Appends notes to the end of this NoteArray, after shifting them by itsduration. Set gap to something != 0 to create a gap or overlap.

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - itself  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| noteArray | [<code>NoteArray</code>](#NoteArray) |  | another NoteArray |
| gap | <code>number</code> | <code>0</code> | in seconds between the two parts |

<a name="NoteArray+repeat"></a>

### noteArray.repeat(times) ⇒ [<code>NoteArray</code>](#NoteArray)
Repeats the notes of this array by concatenating a time-shifted copy

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - a new NoteArray with the repeated note sequence  

| Param | Type | Description |
| --- | --- | --- |
| times | <code>number</code> | number of times to repeat it |

<a name="NoteArray+length"></a>

### noteArray.length() ⇒ <code>number</code>
Returns the number of Note objects in this NoteArray

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: <code>number</code> - note count  
<a name="NoteArray+getStartTime"></a>

### noteArray.getStartTime() ⇒ <code>number</code>
Returns the start time of the earliest note in this NoteArray

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: <code>number</code> - start time  
<a name="NoteArray+getDuration"></a>

### noteArray.getDuration() ⇒ <code>number</code>
Returns the duration of this note array in seconds from 0 to the end ofthe latest note.

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: <code>number</code> - duration  
<a name="NoteArray+scaleTime"></a>

### noteArray.scaleTime(factor) ⇒ [<code>NoteArray</code>](#NoteArray)
Scales the time of each note by factor

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - itself  

| Param | Type | Description |
| --- | --- | --- |
| factor | <code>number</code> | factor |

<a name="NoteArray+shiftTime"></a>

### noteArray.shiftTime(addedSeconds) ⇒ [<code>NoteArray</code>](#NoteArray)
Adds the speicifed number of seconds to each note

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - itself  

| Param | Type | Description |
| --- | --- | --- |
| addedSeconds | <code>number</code> | time to add in seconds |

<a name="NoteArray+shiftToStartAt"></a>

### noteArray.shiftToStartAt(startTime) ⇒ [<code>NoteArray</code>](#NoteArray)
Moves all notes s.t. the first starts at <start>Will sort the notes by start time.

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - itself  

| Param | Type | Description |
| --- | --- | --- |
| startTime | <code>number</code> | the new start time for the earliest note |

<a name="NoteArray+forEach"></a>

### noteArray.forEach(func) ⇒ [<code>NoteArray</code>](#NoteArray)
Similar to Array.forEach

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - this  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | a function |

<a name="NoteArray+sort"></a>

### noteArray.sort(sortFunction) ⇒ [<code>NoteArray</code>](#NoteArray)
Sorts the notes

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - itself  

| Param | Type | Description |
| --- | --- | --- |
| sortFunction | <code>function</code> | sort function, e.g. (a, b)=>a.start-b.start |

<a name="NoteArray+sortByTime"></a>

### noteArray.sortByTime() ⇒ [<code>NoteArray</code>](#NoteArray)
Sorts the notes by start time

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - itself  
<a name="NoteArray+map"></a>

### noteArray.map(mapFunction) ⇒ [<code>NoteArray</code>](#NoteArray)
Maps the notes using some mapping function

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - itself  

| Param | Type | Description |
| --- | --- | --- |
| mapFunction | <code>function</code> | mapping function with same signature as      Array.map() |

<a name="NoteArray+slice"></a>

### noteArray.slice(start, end) ⇒ [<code>NoteArray</code>](#NoteArray)
Slices the notes by index, like Array.slice()

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - itself  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>number</code> | start index |
| end | <code>number</code> | end index |

<a name="NoteArray+sliceTime"></a>

### noteArray.sliceTime(startTime, endTime, [mode]) ⇒ [<code>NoteArray</code>](#NoteArray)
Slices the notes by time.The modes 'end' and 'contained' will remove all notes with end === null!Notes will not be changed, e.g. start time will remain the same.

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - itself  
**Throws**:

- <code>&#x27;Invalid slicing mode&#x27;</code> When slicing mode is not one of the     above values


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| startTime | <code>number</code> |  | start of the filter range in seconds |
| endTime | <code>number</code> |  | end of the filter range in seconds (exclusive) |
| [mode] | <code>string</code> | <code>&quot;contained&quot;</code> | controls which note time to consider,      one of:      - start: note.start must be inside range      - end: note.end must be inside range      - contained: BOTH note.start and note.end must be inside range      - touched: EITHER start or end (or both) must be inside range)      - touched-included: like touched, but also includes notes where          neither start nor end inside range, but range is completely          inside the note      (contained is default) |

<a name="NoteArray+sliceAtTimes"></a>

### noteArray.sliceAtTimes(times, mode, [reUseNotes]) ⇒ <code>Array.&lt;Array.&lt;Note&gt;&gt;</code>
Slices this NoteArray into slices by the given times. Will not returnNoteArrays but simple Note[][], where each item contains all notes of onetime slice. Do not include 0, it will be assumed as first time to slice.To make sure notes are not contained twice in different slices use themode 'start'.

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: <code>Array.&lt;Array.&lt;Note&gt;&gt;</code> - time slices  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| times | <code>Array.&lt;number&gt;</code> |  | points of time at which to slice (in seconds) |
| mode | <code>string</code> |  | see NoteArray.sliceTime() |
| [reUseNotes] | <code>boolean</code> | <code>false</code> | if true, will not clone notes.      This can be dangerous if you do not want them to change. |

**Example**  
```js
// Slice into 1 second slices     const slices = noteArray.sliceAtTimes([1, 2, 3], 'start)
```
<a name="NoteArray+segmentAtGaps"></a>

### noteArray.segmentAtGaps(gapDuration, mode) ⇒ <code>Array.&lt;Array.&lt;Note&gt;&gt;</code>
Segments the NoteArray into smaller ones at times where no note occursfor a specified amount of time.This method is useful for segmenting a recording session into separatesongs, riffs, licks, ...

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: <code>Array.&lt;Array.&lt;Note&gt;&gt;</code> - segments  

| Param | Type | Description |
| --- | --- | --- |
| gapDuration | <code>number</code> | duration of seconds for a gap to be used as      segmenting time |
| mode | <code>&#x27;start-start&#x27;</code> \| <code>&#x27;end-start&#x27;</code> | gaps can either be considered as      the maximum time between two note's starts or the end of the first      and the start of the second note |

<a name="NoteArray+segmentAtIndices"></a>

### noteArray.segmentAtIndices(indices) ⇒ <code>Array.&lt;Array.&lt;Note&gt;&gt;</code>
Segments the NoteArray into Arrays of Notes at given indices

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: <code>Array.&lt;Array.&lt;Note&gt;&gt;</code> - segments  

| Param | Type | Description |
| --- | --- | --- |
| indices | <code>Array.&lt;number&gt;</code> | indices |

**Example** *(Get notes in partions of 4)*  
```js
     const noteGroups = myNoteArray.segmentAtIndices([4, 8, 12, 16, 20]);
     // noteGroups = [
     //     Array(4),
     //     Array(4),
     //     Array(4),
     // ]
```
<a name="NoteArray+filter"></a>

### noteArray.filter(filterFunction) ⇒ [<code>NoteArray</code>](#NoteArray)
Filters the NoteArray like you would filter via Array.filter().

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - itself  

| Param | Type | Description |
| --- | --- | --- |
| filterFunction | <code>function</code> | filter function, same signature as      Array.filter() |

**Example**  
```js
// Only keep notes longer than 1 second     const filtered = noteArray.filter(note=>note.getDuration()>1);
```
<a name="NoteArray+filterPitches"></a>

### noteArray.filterPitches(pitches) ⇒ [<code>NoteArray</code>](#NoteArray)
Filters by pitch, keeping only pitches specified in <pitches>

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - itself  

| Param | Type | Description |
| --- | --- | --- |
| pitches | <code>Array.&lt;number&gt;</code> \| <code>Set.&lt;number&gt;</code> | array or Set of pitches to keep |

<a name="NoteArray+transpose"></a>

### noteArray.transpose(steps) ⇒ [<code>NoteArray</code>](#NoteArray)
Transposes each note by <steps> semitones, will clip pitches to [0, 127]

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - itself  

| Param | Type | Description |
| --- | --- | --- |
| steps | <code>number</code> | number of semitones to transpose, can be negative |

<a name="NoteArray+removeOctaves"></a>

### noteArray.removeOctaves() ⇒ [<code>NoteArray</code>](#NoteArray)
Will set the octave of all notes to -1.This might cause two notes to exist at the same time and pitch!

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - itself  
<a name="NoteArray+reverse"></a>

### noteArray.reverse() ⇒ [<code>NoteArray</code>](#NoteArray)
Reverses the note array, such that it can be played backwards.

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - itself  
<a name="NoteArray+equals"></a>

### noteArray.equals(otherNoteArray) ⇒ <code>boolean</code>
Returns true if this NoteArray and otherNoteArray have equal attributes.

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: <code>boolean</code> - true if equal  

| Param | Type | Description |
| --- | --- | --- |
| otherNoteArray | [<code>NoteArray</code>](#NoteArray) | another NoteArray |

<a name="NoteArray+clone"></a>

### noteArray.clone() ⇒ [<code>NoteArray</code>](#NoteArray)
Deep clone, all contained notes are cloned as well.

**Kind**: instance method of [<code>NoteArray</code>](#NoteArray)  
**Returns**: [<code>NoteArray</code>](#NoteArray) - clone  
<a name="PitchBend"></a>

## PitchBend
Class that allows to represent pitch-bends from a MIDI file

**Kind**: global class  
**Todo**

- [ ] NYI
- [ ] not used yet
- [ ] can we aggregated pitchbend events into one PitchBend?
     needs amounts: number[]
     aggregation ends when amount is 0 (for some time? otherwise vibrato will be multiple PB)


* [PitchBend](#PitchBend)
    * [new PitchBend(start, amount, channel)](#new_PitchBend_new)
    * [.from(object)](#PitchBend.from) ⇒ [<code>PitchBend</code>](#PitchBend)

<a name="new_PitchBend_new"></a>

### new PitchBend(start, amount, channel)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| start | <code>number</code> | <code>0</code> | start time in seconds |
| amount | <code>number</code> | <code>0</code> | bend amount |
| channel | <code>number</code> | <code>0</code> | MIDI channel |

<a name="PitchBend.from"></a>

### PitchBend.from(object) ⇒ [<code>PitchBend</code>](#PitchBend)
Creates a GuitarNote object from an object via destructuring

**Kind**: static method of [<code>PitchBend</code>](#PitchBend)  
**Returns**: [<code>PitchBend</code>](#PitchBend) - new note  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | object with at least {pitch} |

<a name="PitchSequence"></a>

## PitchSequence
Stores a sequence of pitches and provides some methods to simplify and
manipulate it.

**Kind**: global class  
**Todo**

- [ ] implement keepOnlyHighestConcurrentNotes


* [PitchSequence](#PitchSequence)
    * [new PitchSequence(pitches)](#new_PitchSequence_new)
    * _instance_
        * [.getPitches()](#PitchSequence+getPitches) ⇒ <code>Array.&lt;number&gt;</code>
        * [.length()](#PitchSequence+length) ⇒ <code>number</code>
        * [.toCharString()](#PitchSequence+toCharString) ⇒ <code>string</code>
        * [.toNoteNameString()](#PitchSequence+toNoteNameString) ⇒ <code>string</code>
        * [.reverse()](#PitchSequence+reverse) ⇒ [<code>PitchSequence</code>](#PitchSequence)
        * [.removeOctaves()](#PitchSequence+removeOctaves) ⇒ [<code>PitchSequence</code>](#PitchSequence)
        * [.toIntervals()](#PitchSequence+toIntervals) ⇒ <code>Array.&lt;number&gt;</code>
        * [.clone()](#PitchSequence+clone) ⇒ [<code>PitchSequence</code>](#PitchSequence)
        * [.equals(otherPitchSequence)](#PitchSequence+equals) ⇒ <code>boolean</code>
    * _static_
        * [.fromNotes(notes)](#PitchSequence.fromNotes) ⇒ [<code>PitchSequence</code>](#PitchSequence)
        * [.fromCharString(string)](#PitchSequence.fromCharString) ⇒ [<code>PitchSequence</code>](#PitchSequence)

<a name="new_PitchSequence_new"></a>

### new PitchSequence(pitches)

| Param | Type | Description |
| --- | --- | --- |
| pitches | <code>Array.&lt;number&gt;</code> | pitches |

<a name="PitchSequence+getPitches"></a>

### pitchSequence.getPitches() ⇒ <code>Array.&lt;number&gt;</code>
**Kind**: instance method of [<code>PitchSequence</code>](#PitchSequence)  
**Returns**: <code>Array.&lt;number&gt;</code> - pitches  
<a name="PitchSequence+length"></a>

### pitchSequence.length() ⇒ <code>number</code>
**Kind**: instance method of [<code>PitchSequence</code>](#PitchSequence)  
**Returns**: <code>number</code> - number of pitches  
<a name="PitchSequence+toCharString"></a>

### pitchSequence.toCharString() ⇒ <code>string</code>
Turns pitch sequence into a string by turning each  pitch into a character
(based on Unicode index)

**Kind**: instance method of [<code>PitchSequence</code>](#PitchSequence)  
**Returns**: <code>string</code> - string representation of note pitches  
<a name="PitchSequence+toNoteNameString"></a>

### pitchSequence.toNoteNameString() ⇒ <code>string</code>
**Kind**: instance method of [<code>PitchSequence</code>](#PitchSequence)  
**Returns**: <code>string</code> - a string with the notes' names  
<a name="PitchSequence+reverse"></a>

### pitchSequence.reverse() ⇒ [<code>PitchSequence</code>](#PitchSequence)
Reverses the order of pitches in this PitchSequence

**Kind**: instance method of [<code>PitchSequence</code>](#PitchSequence)  
**Returns**: [<code>PitchSequence</code>](#PitchSequence) - this  
<a name="PitchSequence+removeOctaves"></a>

### pitchSequence.removeOctaves() ⇒ [<code>PitchSequence</code>](#PitchSequence)
Takes a sequence of MIDI pitches and nomralizes them to be in [0, 11]

**Kind**: instance method of [<code>PitchSequence</code>](#PitchSequence)  
**Returns**: [<code>PitchSequence</code>](#PitchSequence) - this  
<a name="PitchSequence+toIntervals"></a>

### pitchSequence.toIntervals() ⇒ <code>Array.&lt;number&gt;</code>
Transforms note pitches to intervals, i.e. diffrences between to subsequent
notes: C, C#, C, D => 1, -1, 2

**Kind**: instance method of [<code>PitchSequence</code>](#PitchSequence)  
**Returns**: <code>Array.&lt;number&gt;</code> - intervals  
<a name="PitchSequence+clone"></a>

### pitchSequence.clone() ⇒ [<code>PitchSequence</code>](#PitchSequence)
**Kind**: instance method of [<code>PitchSequence</code>](#PitchSequence)  
**Returns**: [<code>PitchSequence</code>](#PitchSequence) - clone  
<a name="PitchSequence+equals"></a>

### pitchSequence.equals(otherPitchSequence) ⇒ <code>boolean</code>
Returns true if this NoteArray and otherNoteArray have equal attributes.

**Kind**: instance method of [<code>PitchSequence</code>](#PitchSequence)  
**Returns**: <code>boolean</code> - true if equal  

| Param | Type | Description |
| --- | --- | --- |
| otherPitchSequence | [<code>NoteArray</code>](#NoteArray) | another NoteArray |

<a name="PitchSequence.fromNotes"></a>

### PitchSequence.fromNotes(notes) ⇒ [<code>PitchSequence</code>](#PitchSequence)
Creates a pitch sequence from an array of Notes

**Kind**: static method of [<code>PitchSequence</code>](#PitchSequence)  
**Returns**: [<code>PitchSequence</code>](#PitchSequence) - pitch sequence  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |

<a name="PitchSequence.fromCharString"></a>

### PitchSequence.fromCharString(string) ⇒ [<code>PitchSequence</code>](#PitchSequence)
**Kind**: static method of [<code>PitchSequence</code>](#PitchSequence)  
**Returns**: [<code>PitchSequence</code>](#PitchSequence) - pitch sequence  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | a string of Unicode characters |

<a name="Recording"></a>

## Recording
Class for storing recorded notes alongside meta information.

**Kind**: global class  

* [Recording](#Recording)
    * [new Recording(name, date, notes, [speed], [selectedTrack], [timeSelection], [comment])](#new_Recording_new)
    * _instance_
        * [.clone()](#Recording+clone) ⇒ [<code>Recording</code>](#Recording)
        * [.equals(otherRecording)](#Recording+equals) ⇒ <code>boolean</code>
        * [.toSimpleObject()](#Recording+toSimpleObject) ⇒ <code>object</code>
    * _static_
        * [.from(object)](#Recording.from) ⇒ [<code>Recording</code>](#Recording)

<a name="new_Recording_new"></a>

### new Recording(name, date, notes, [speed], [selectedTrack], [timeSelection], [comment])
Creates a new Recording


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | name if the song |
| date | <code>Date</code> |  | date of the recording |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) |  | array of Note objects |
| [speed] | <code>number</code> | <code>1</code> | relative speed compared to ground truth,      e.g. 0.5 for half as fast |
| [selectedTrack] | <code>number</code> | <code>0</code> | track number of the ground truth to which      this recording belongs |
| [timeSelection] | <code>Array.&lt;number&gt;</code> \| <code>null</code> | <code></code> | time selection of the ground      truth to which this recording belongs, or null if full duration |
| [comment] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | a free-text comment for the user to annotate      the recording |

<a name="Recording+clone"></a>

### recording.clone() ⇒ [<code>Recording</code>](#Recording)
Returns a copy of the Note object

**Kind**: instance method of [<code>Recording</code>](#Recording)  
**Returns**: [<code>Recording</code>](#Recording) - new recording  
<a name="Recording+equals"></a>

### recording.equals(otherRecording) ⇒ <code>boolean</code>
Returns true if this Recording and otherRecording have equal attributes.

**Kind**: instance method of [<code>Recording</code>](#Recording)  
**Returns**: <code>boolean</code> - true if equal  

| Param | Type | Description |
| --- | --- | --- |
| otherRecording | [<code>Recording</code>](#Recording) | another Recording |

<a name="Recording+toSimpleObject"></a>

### recording.toSimpleObject() ⇒ <code>object</code>
Turns the recoring into a simple object with the same properties

**Kind**: instance method of [<code>Recording</code>](#Recording)  
**Returns**: <code>object</code> - simple object representation of the recording  
<a name="Recording.from"></a>

### Recording.from(object) ⇒ [<code>Recording</code>](#Recording)
Creates a Note object from an object via destructuring

**Kind**: static method of [<code>Recording</code>](#Recording)  
**Returns**: [<code>Recording</code>](#Recording) - new note  
**Throws**:

- <code>Error</code> when name, date, or notes are missing


| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | object with at least {name, date, notes, speed} |

<a name="drumInstrumentMap"></a>

## drumInstrumentMap : <code>Map.&lt;string, object&gt;</code>
Maps internal drum names to MusicXML instrument names and note display

**Kind**: global constant  
<a name="patterns"></a>

## patterns : <code>Map.&lt;string, object&gt;</code>
Contains patterns for exercises, such as scales

**Kind**: global constant  
<a name="patterns"></a>

## patterns : <code>Map.&lt;string, object&gt;</code>
Contains patterns for exercises, such as scales
TODO: find way to automatically compute patterns from scales, get scales from tonaljs

**Kind**: global constant  
<a name="noteErrorTypes"></a>

## noteErrorTypes : <code>object</code>
**Kind**: global constant  
<a name="chordErrorTypes"></a>

## chordErrorTypes : <code>object</code>
**Kind**: global constant  
<a name="priorityMatching"></a>

## priorityMatching(itemsA, itemsB, distanceFunction) ⇒ <code>Map.&lt;number, number&gt;</code>
Idea: Like in hierarchical clustering, take the most similar pair out of the
set of all possible pairs repeatedly, until one array of items is empty.

**Kind**: global function  
**Returns**: <code>Map.&lt;number, number&gt;</code> - with the indices of the matched items  

| Param | Type | Description |
| --- | --- | --- |
| itemsA | <code>Array.&lt;T1&gt;</code> | an array with items |
| itemsB | <code>Array.&lt;T2&gt;</code> | an array with items |
| distanceFunction | <code>function</code> | distance function for two      items, must be 0 for equal items and symmetric |

<a name="errorFromPriorityMatching"></a>

## errorFromPriorityMatching(gtNotes, recNotes, distanceFunction) ⇒ <code>Map.&lt;Note, number&gt;</code>
First matches GT to rec notes via priorityMatching, then computes the error
for each GT note that has been matched using the same distance function.
The Map will be undefined for GT notes that have not been matched, they can
be considered missing in the recording.

**Kind**: global function  
**Returns**: <code>Map.&lt;Note, number&gt;</code> - a Map from GT note to its error  

| Param | Type | Description |
| --- | --- | --- |
| gtNotes | [<code>Array.&lt;Note&gt;</code>](#Note) | ground truth notes |
| recNotes | [<code>Array.&lt;Note&gt;</code>](#Note) | recorded notes |
| distanceFunction | <code>function</code> | distance function,      taking two notes and returning the 'distance', i.e. how different they      are. See balancedNoteDistance as example. |

<a name="balancedNoteDistance"></a>

## balancedNoteDistance(a, b) ⇒ <code>number</code>
Computes a distance (inverse similarity) of two notes, considering pitch,
chroma, start, duration, and channel.

**Kind**: global function  
**Returns**: <code>number</code> - distance  

| Param | Type | Description |
| --- | --- | --- |
| a | [<code>Note</code>](#Note) | a Note |
| b | [<code>Note</code>](#Note) | a Note |

<a name="getMatrixMinPosition"></a>

## getMatrixMinPosition(matrix) ⇒ <code>Array.&lt;number&gt;</code>
Returns the row and colum indices of the minimum value of the given matrix

**Kind**: global function  
**Returns**: <code>Array.&lt;number&gt;</code> - [rowIndex, columIndex] of the minimum value  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | matrix |

<a name="generatePattern"></a>

## generatePattern(patternType, [repeat]) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
Takes a baseline pattern and moves it to the correct position on the fretboard

**Kind**: global function  
**Returns**: <code>Array.&lt;Array.&lt;number&gt;&gt;</code> - array of [string, fret] positions  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| patternType | <code>string</code> |  | pattern type |
| [repeat] | <code>number</code> | <code>1</code> | number of repeats |

<a name="generateXml"></a>

## generateXml(name, tempo, timeSig, drumHits) ⇒ <code>string</code>
Generates MusicXML text from a pattern

**Kind**: global function  
**Returns**: <code>string</code> - MusicXML string  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name |
| tempo | <code>number</code> | tempo in bpm |
| timeSig | <code>string</code> | time signature e.g. 4/4 |
| drumHits | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | the output of generatePattern |

<a name="generatePattern"></a>

## generatePattern(patternType, rootNote, [repeat], [alternate]) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
Takes a baseline pattern and moves it to the correct position on the fretboard

**Kind**: global function  
**Returns**: <code>Array.&lt;Array.&lt;number&gt;&gt;</code> - array of [string, fret] positions  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| patternType | <code>string</code> |  | pattern type |
| rootNote | <code>string</code> |  | root note |
| [repeat] | <code>number</code> | <code>1</code> | number of repetitions |
| [alternate] | <code>boolena</code> | <code>false</code> | reverse notes every second repetition |

<a name="generateXml"></a>

## generateXml(name, tempo, timeSig, positions) ⇒ <code>string</code>
Generates MusicXML text from a pattern

**Kind**: global function  
**Returns**: <code>string</code> - MusicXML string  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name |
| tempo | <code>number</code> | tempo in bpm |
| timeSig | <code>string</code> | time signature e.g. 4/4 |
| positions | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | the output of generatePattern |

<a name="generatePattern"></a>

## generatePattern(patternType, [rootNote], [scaleType], [repeat], [alternate]) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
Takes a baseline pattern and moves it to the correct position on the fretboard

**Kind**: global function  
**Returns**: <code>Array.&lt;Array.&lt;number&gt;&gt;</code> - array of [string, fret] positions  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| patternType | <code>string</code> |  | pattern type |
| [rootNote] | <code>string</code> | <code>&quot;C&quot;</code> | root note |
| [scaleType] | <code>string</code> | <code>&quot;major&quot;</code> | see tonaljs scale types |
| [repeat] | <code>number</code> | <code>1</code> | number of repetitions |
| [alternate] | <code>boolean</code> | <code>false</code> | reverse notes every second repetition |

<a name="repeatPattern"></a>

## repeatPattern(nRepetitions, pattern, alternate) ⇒ <code>Array</code>
Repeats a pattern with or without alternating direction

**Kind**: global function  
**Returns**: <code>Array</code> - repeated pattern  

| Param | Type | Description |
| --- | --- | --- |
| nRepetitions | <code>number</code> | number of repetitions |
| pattern | <code>Array</code> | pattern |
| alternate | <code>boolean</code> | alternate direction? |

<a name="generateXml"></a>

## generateXml(name, tempo, timeSig, notes) ⇒ <code>string</code>
Generates MusicXML text from a pattern

**Kind**: global function  
**Returns**: <code>string</code> - MusicXML string  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name |
| tempo | <code>number</code> | tempo in bpm |
| timeSig | <code>string</code> | time signature e.g. 4/4 |
| notes | <code>Object</code> | the output of generatePattern |

<a name="getStartTimeErrorPerGtNote"></a>

## getStartTimeErrorPerGtNote(gtNotes, recNotes) ⇒ <code>Array.&lt;number&gt;</code>
Takes the ground truth and a single recording.Both gtNotes and recNotes must be sorted by note start time ascending.

**Kind**: global function  
**Returns**: <code>Array.&lt;number&gt;</code> - for each note the difference in start time to the closest     recorded note  

| Param | Type | Description |
| --- | --- | --- |
| gtNotes | [<code>Array.&lt;Note&gt;</code>](#Note) | ground truth notes |
| recNotes | [<code>Array.&lt;Note&gt;</code>](#Note) | recorded notes |

<a name="getNoteErrors"></a>

## getNoteErrors(expectedNote, actualNote) ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - errors  
**Todo**

- [ ] untested, unused


| Param | Type | Description |
| --- | --- | --- |
| expectedNote | [<code>Note</code>](#Note) | a note |
| actualNote | [<code>Note</code>](#Note) | a note |

<a name="getChordErrors"></a>

## getChordErrors(expectedChord, actualChord) ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - errors  
**Todo**

- [ ] NYI


| Param | Type | Description |
| --- | --- | --- |
| expectedChord | [<code>Array.&lt;Note&gt;</code>](#Note) | a chord |
| actualChord | [<code>Array.&lt;Note&gt;</code>](#Note) | a chord |

<a name="noteCountDifference"></a>

## noteCountDifference(notesA, notesB) ⇒ <code>number</code>
**Kind**: global function  
**Returns**: <code>number</code> - difference  

| Param | Type | Description |
| --- | --- | --- |
| notesA | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |
| notesB | [<code>Array.&lt;Note&gt;</code>](#Note) | other notes |

<a name="durationDifference"></a>

## durationDifference(notesA, notesB) ⇒ <code>number</code>
**Kind**: global function  
**Returns**: <code>number</code> - difference  

| Param | Type | Description |
| --- | --- | --- |
| notesA | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |
| notesB | [<code>Array.&lt;Note&gt;</code>](#Note) | other notes |

<a name="pitchHistogramDistance"></a>

## pitchHistogramDistance(notesA, notesB) ⇒ <code>number</code>
**Kind**: global function  
**Returns**: <code>number</code> - distance  

| Param | Type | Description |
| --- | --- | --- |
| notesA | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |
| notesB | [<code>Array.&lt;Note&gt;</code>](#Note) | other notes |

<a name="timeBinningDistance"></a>

## timeBinningDistance(notesA, notesB, binSize) ⇒ <code>number</code>
**Kind**: global function  
**Returns**: <code>number</code> - distance  
**Todo**

- [ ] allow to re-use a typed array for all recordings to save time and space?


| Param | Type | Description |
| --- | --- | --- |
| notesA | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |
| notesB | [<code>Array.&lt;Note&gt;</code>](#Note) | other notes |
| binSize | <code>number</code> | bin size in seconds |

<a name="timeBinningDistance2"></a>

## timeBinningDistance2(notesA, notesB, binSize) ⇒ <code>number</code>
**Kind**: global function  
**Returns**: <code>number</code> - distance  
**Todo**

- [ ] allow to re-use a typed array for all recordings to save time and space?


| Param | Type | Description |
| --- | --- | --- |
| notesA | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |
| notesB | [<code>Array.&lt;Note&gt;</code>](#Note) | other notes |
| binSize | <code>number</code> | bin size in seconds |

<a name="notesCount"></a>

## notesCount(notes) ⇒ <code>number</code>
Computes the number of notes

**Kind**: global function  
**Returns**: <code>number</code> - number of notes  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |

<a name="duration"></a>

## duration(notes) ⇒ <code>number</code>
Computes played duration

**Kind**: global function  
**Returns**: <code>number</code> - duration  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |

<a name="notesPerSecond"></a>

## notesPerSecond(notes) ⇒ <code>number</code>
Computes the number of notes played per second

**Kind**: global function  
**Returns**: <code>number</code> - number of notes per second  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |

<a name="notesPerBeat"></a>

## notesPerBeat(notes, [bpm]) ⇒ <code>number</code>
Computes the number of notes played per relative time (beat)

**Kind**: global function  
**Returns**: <code>number</code> - number of notes per beat  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) |  | notes |
| [bpm] | <code>number</code> | <code>120</code> | tempo in bpm |

<a name="differentNotesUsed"></a>

## differentNotesUsed(notes, mode) ⇒ <code>Array.&lt;object&gt;</code>
Computes the number of different notes used in different modi.- Pitch: note and octave are considered- Chroma: only note without octave considered, e.g., C4 == C5- Fretboard position: tuple (string, fret) will be compared

**Kind**: global function  
**Returns**: <code>Array.&lt;object&gt;</code> - note and usage count  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |
| mode | <code>&#x27;pitch&#x27;</code> \| <code>&#x27;chroma&#x27;</code> \| <code>&#x27;fretboardPos&#x27;</code> | mode |

<a name="ratioNotesInSet"></a>

## ratioNotesInSet(notes, set) ⇒ <code>number</code>
Computes the ratio of notes that are in the given set.Can be used for checking how many notes that were played are part of amusical scale, by passing the notes of this scale as set.

**Kind**: global function  
**Returns**: <code>number</code> - ratio of notes inside set  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |
| set | <code>Set</code> | set of note names, e.g. C, D# (no flats) |

**Example**  
```js
const cMaj = new Set(...'CDEFGAB');const ratio = ratioNotesInSet(notes, cMaj);
```
<a name="pitchMeanAndVariance"></a>

## pitchMeanAndVariance(notes) ⇒ <code>object</code>
Computes the mean and variance of played pitches

**Kind**: global function  
**Returns**: <code>object</code> - {mean, variance}  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |

<a name="intervalMeanAndVariance"></a>

## intervalMeanAndVariance(notes) ⇒ <code>object</code>
Computes the mean and variance of played intervals

**Kind**: global function  
**Returns**: <code>object</code> - {mean, variance}  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |

<a name="dynamicsMeanAndVariance"></a>

## dynamicsMeanAndVariance(notes) ⇒ <code>object</code>
Computes the mean and variance of played dynamics

**Kind**: global function  
**Returns**: <code>object</code> - {mean, variance}  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |

<a name="durationMeanAndVariance"></a>

## durationMeanAndVariance(notes) ⇒ <code>object</code>
Computes the mean and variance of played dynamics

**Kind**: global function  
**Returns**: <code>object</code> - {mean, variance}  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |

<a name="onsetDiffMeanAndVariance"></a>

## onsetDiffMeanAndVariance(notes) ⇒ <code>object</code>
Computes the mean and variance of onset (start time) differences betweenconsecutive notes.

**Kind**: global function  
**Returns**: <code>object</code> - {mean, variance}  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |

<a name="guitarStringSkips"></a>

## guitarStringSkips(notes, [skipped]) ⇒ <code>number</code>
Computs the ratio of notes for which one string (or more) where skippedbetween the one before and the current note.The `skipped` parameter set the minimum amount of strings between the twonotes, e.g., going from string 1 to 3 means that one (string 2) was skipped.

**Kind**: global function  
**Returns**: <code>number</code> - ratio of notes where `skipped` string where skipped  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| notes | [<code>Array.&lt;GuitarNote&gt;</code>](#GuitarNote) |  | notes |
| [skipped] | <code>number</code> | <code>0</code> | number of strings skipped between notes |

<a name="guitarFretSkips"></a>

## guitarFretSkips(notes, [skipped]) ⇒ <code>number</code>
Computs the ratio of notes for which one fret (or more) where skipped betweenthe one before and the current note.The `skipped` parameter set the minimum amount of fret between the twonotes, e.g., going from fret 1 to 3 means that one (fret 2) was skipped.

**Kind**: global function  
**Returns**: <code>number</code> - ratio of notes where `skipped` string where skipped  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| notes | [<code>Array.&lt;GuitarNote&gt;</code>](#GuitarNote) |  | notes |
| [skipped] | <code>number</code> | <code>0</code> | number of fret skipped between notes |

<a name="harmonySizeDistribution"></a>

## harmonySizeDistribution(harmonies) ⇒ <code>Array.&lt;object&gt;</code>
Counts how often harmonies of different sizes occur

**Kind**: global function  
**Returns**: <code>Array.&lt;object&gt;</code> - {size, count}  

| Param | Type | Description |
| --- | --- | --- |
| harmonies | <code>Array.&lt;Array.&lt;Note&gt;&gt;</code> | groups of notes that belong to harmonies |

**Example**  
```js
// You can use different grouping functions as well, see chords/Chords.js const harmonies = Chords.detectChordsBySimilarStart(notes, theshold); const sizeDistr = harmonySizeDistribution(harmonies);
```
<a name="harmonySingleToMultiRatio"></a>

## harmonySingleToMultiRatio(harmonies) ⇒ <code>number</code>
Determines the ratio of single notes to multi-note harmonies

**Kind**: global function  
**Returns**: <code>number</code> - ratio of single notes to multi-note harmonies  

| Param | Type | Description |
| --- | --- | --- |
| harmonies | <code>Array.&lt;Array.&lt;Note&gt;&gt;</code> | groups of notes that belong to harmonies |

<a name="notesToIntervals"></a>

## notesToIntervals(notes) ⇒ <code>Array.&lt;number&gt;</code>
Computes the pitch intervals between consecutive notes

**Kind**: global function  
**Returns**: <code>Array.&lt;number&gt;</code> - pitch intervals  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |

<a name="notesToOnsetDifferences"></a>

## notesToOnsetDifferences(notes) ⇒ <code>Array.&lt;number&gt;</code>
Computes the start time differences between consecutive notes

**Kind**: global function  
**Returns**: <code>Array.&lt;number&gt;</code> - start time differences  

| Param | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;Note&gt;</code>](#Note) | notes |

<a name="compress"></a>

## compress(sequence) ⇒ <code>object</code>
Compresses a sequence by detecting immediately repeating subsequences
hierarchically. Optimal result but high performance complexity.

**Kind**: global function  
**Returns**: <code>object</code> - compressed hierarchy  
**Todo**

- [ ] Link to observable demo


| Param | Type | Description |
| --- | --- | --- |
| sequence | <code>Array</code> | array with immediately repeating subsequences |

<a name="getImmediateRepetitions"></a>

## getImmediateRepetitions(sequence) ⇒ <code>Array.&lt;object&gt;</code>
Finds all immediate repetitions in a given sequence.

**Kind**: global function  
**Returns**: <code>Array.&lt;object&gt;</code> - result  
**Todo**

- [ ] implement a mode that just looks for the best one, instead of later
sorting all found ones (will be faster since less sequence.slice() happens)
Still needs to keep all results with the same score


| Param | Type | Description |
| --- | --- | --- |
| sequence | <code>Array</code> | array with immediately repeating subsequences |

<a name="decompress"></a>

## decompress(tree) ⇒ <code>Array</code>
Restores the original array/sequence from the compressed hierarchy.

**Kind**: global function  
**Returns**: <code>Array</code> - decompressed sequence  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>object</code> | compressed hierarchy |

<a name="summary"></a>

## summary(tree) ⇒ <code>Array</code>
Returns the summary of a hierachy, leaving out information about repetitions.

**Kind**: global function  
**Returns**: <code>Array</code> - summary  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>object</code> | compressed hierarchy |

**Example**  
```js
const arr = '12312345656'.split('')
 const h = compress(arr)
 summary(h).join('')
 // '123456'
```
<a name="toString"></a>

## toString(tree, separator) ⇒ <code>string</code>
Formats a compressed hierarchy into a readable string, for example:
"1222333222333" => "1 (2x (3x 2) (3x 3))"

**Kind**: global function  
**Returns**: <code>string</code> - result  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>object</code> | compressed hierarchy |
| separator | <code>string</code> | separator |

<a name="compressionRate"></a>

## compressionRate(compressed) ⇒ <code>number</code>
Calculates the compression rate in [0, 1] for a result of compress().

**Kind**: global function  
**Returns**: <code>number</code> - compression ratio  
**Throws**:

- <code>&#x27;Invalid hierarchy&#x27;</code> for invalid hierarchy


| Param | Type | Description |
| --- | --- | --- |
| compressed | <code>object</code> | compressed hierachy |

<a name="getNGrams"></a>

## getNGrams(string, length) ⇒ <code>Map.&lt;string, number&gt;</code>
Calculates all n-grams with a specified length

**Kind**: global function  
**Returns**: <code>Map.&lt;string, number&gt;</code> - maps n-gram to its number of occurences  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | a string |
| length | <code>number</code> | length (n) of n-grams |

<a name="getNGramsForArray"></a>

## getNGramsForArray(array, length) ⇒ <code>Map.&lt;string, object&gt;</code>
Calculates all n-grams with a specified length

**Kind**: global function  
**Returns**: <code>Map.&lt;string, object&gt;</code> - maps n-gram, joined with ' ', to its number of
occurences and value  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | an array of primitive data types |
| length | <code>number</code> | length (n) of n-grams |

<a name="simplify"></a>

## simplify(objectArray, keys)
Simplifies each object in an array by copying only some keys and their values

**Kind**: global function  
**Todo.**: move to testing lib  

| Param | Type | Description |
| --- | --- | --- |
| objectArray | <code>Array.&lt;object&gt;</code> | array with objects |
| keys | <code>Array.&lt;string&gt;</code> | keys to copy |

<a name="getMusicPiecesFromBothFormats"></a>

## getMusicPiecesFromBothFormats(fileBaseName) ⇒ <code>Object</code>
Given a file name (without extension), this function will read a .mid and a.musicxml file and parse both to a MusicPiece before returning those.

**Kind**: global function  
**Returns**: <code>Object</code> - two MusicPiece objects  

| Param | Type | Description |
| --- | --- | --- |
| fileBaseName | <code>string</code> | file name without extension |

<a name="getColorLightness"></a>

## getColorLightness(color) ⇒ <code>number</code>
Determines the perceptual lightness of an HTML color

**Kind**: global function  
**Returns**: <code>number</code> - lightness in [0, 100]  
**See**: https://stackoverflow.com/a/596241 (but normalizing to 0, 100)  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | HTML color specifier |

<a name="averageColor"></a>

## averageColor(colors) ⇒ <code>string</code>
Determines the average of mutliple given colors

**Kind**: global function  
**Returns**: <code>string</code> - average as RGB string  

| Param | Type | Description |
| --- | --- | --- |
| colors | <code>Array.&lt;string&gt;</code> | HTML color specifiers |

<a name="setOpacity"></a>

## setOpacity(color, [opacity]) ⇒ <code>string</code>
Sets a color's opacity.
Does not support colors in rgba format.

**Kind**: global function  
**Returns**: <code>string</code> - color as RGBA string  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| color | <code>string</code> |  | valid HTML color identifier |
| [opacity] | <code>number</code> | <code>1</code> | opacity from 0 to 1 |

