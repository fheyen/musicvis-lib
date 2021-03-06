import { arrayShallowEquals, removeDuplicates, arrayContainsArray, arrayHasSameElements, getMatrixMax, formatMatrix } from './ArrayUtils';
import { blobToBase64, blobToFileExtension } from './BlobUtils';
import { formatDate, formatTime, formatSongTitle } from './FormattingUtils';
import { storeObjectInLocalStorage, getObjectFromLocalStorage } from './LocalStorageUtils';
import { randFloat, choose, clipValue, swapSoSmallerFirst, findLocalMaxima } from './MathUtils';
import { bpmToSecondsPerBeat, deepCloneFlatObjectMap, groupNotesByPitch, reverseString, findNearest } from './MiscUtils';
import { noteColorFromPitch } from './NoteColorUtils';
import { filterRecordingNoise, clipRecordingsPitchesToGtRange, recordingsHeatmap, averageRecordings, averageRecordings2, differenceMap, differenceMapErrorAreas, alignNotesToBpm } from './RecordingsUtils';
import { confidenceInterval, getBoxplotCharacteristics, kernelDensityEstimator, kernelEpanechnikov, kernelGauss } from './StatisticsUtils';
import { pingMidiDevice } from './WebMidiUtils';

export {
    // Array
    arrayShallowEquals,
    removeDuplicates,
    arrayContainsArray,
    arrayHasSameElements,
    getMatrixMax,
    formatMatrix,
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
    bpmToSecondsPerBeat,
    deepCloneFlatObjectMap,
    groupNotesByPitch,
    reverseString,
    findNearest,
    // NoteColor
    noteColorFromPitch,
    // Recordings
    filterRecordingNoise,
    clipRecordingsPitchesToGtRange,
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
