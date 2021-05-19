import { arrayShallowEquals, jaccardIndex, removeDuplicates, arrayContainsArray, arrayHasSameElements, getMatrixMax, formatMatrix, binarySearch } from './ArrayUtils';
import { blobToBase64, blobToFileExtension } from './BlobUtils';
import { formatDate, formatTime, formatSongTitle } from './FormattingUtils';
import { storeObjectInLocalStorage, getObjectFromLocalStorage } from './LocalStorageUtils';
import { randFloat, choose, clipValue, swapSoSmallerFirst, findLocalMaxima } from './MathUtils';
import { deepCloneFlatObjectMap, groupNotesByPitch, reverseString, findNearest } from './MiscUtils';
import { bpmToSecondsPerBeat, chordToInteger, chordIntegerJaccardIndex, noteDurationToNoteType } from './MusicUtils';
import { noteColorFromPitch } from './NoteColorUtils';
import { filterRecordingNoise, clipRecordingsPitchesToGtRange, clipRecordingsPitchesToGtFretboardRange, recordingsHeatmap, averageRecordings, averageRecordings2, differenceMap, differenceMapErrorAreas, alignNotesToBpm } from './RecordingsUtils';
import { confidenceInterval, getBoxplotCharacteristics, kernelDensityEstimator, kernelEpanechnikov, kernelGauss } from './StatisticsUtils';
import { pingMidiDevice } from './WebMidiUtils';

/**
 * @module utils
 */
export {
    // Array
    arrayShallowEquals,
    jaccardIndex,
    removeDuplicates,
    arrayContainsArray,
    arrayHasSameElements,
    getMatrixMax,
    formatMatrix,
    binarySearch,
    // Blob
    blobToBase64,
    blobToFileExtension,
    // Formatting
    formatDate,
    formatTime,
    formatSongTitle,
    // LocalStorage
    storeObjectInLocalStorage,
    getObjectFromLocalStorage,
    // Math
    randFloat,
    choose,
    clipValue,
    swapSoSmallerFirst,
    findLocalMaxima,
    // Misc
    deepCloneFlatObjectMap,
    groupNotesByPitch,
    reverseString,
    findNearest,
    // Music
    bpmToSecondsPerBeat,
    chordToInteger,
    chordIntegerJaccardIndex,
    noteDurationToNoteType,
    // NoteColor
    noteColorFromPitch,
    // Recordings
    filterRecordingNoise,
    clipRecordingsPitchesToGtRange,
    clipRecordingsPitchesToGtFretboardRange,
    recordingsHeatmap,
    averageRecordings,
    averageRecordings2,
    differenceMap,
    differenceMapErrorAreas,
    alignNotesToBpm,
    // Statistics
    confidenceInterval,
    getBoxplotCharacteristics,
    kernelDensityEstimator,
    kernelEpanechnikov,
    kernelGauss,
    // WebMidi
    pingMidiDevice,
};
