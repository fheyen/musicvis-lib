import { arrayShallowEquals, removeDuplicates, arrayContainsArray, arrayHasSameElements, flattenArray, getMatrixMax, formatMatrix } from './ArrayUtils';
import { formatDate, formatTime, formatSongTitle } from './FormattingUtils';
import { storeObjectInLocalStorage, getObjectFromLocalStorage } from './LocalStorageUtils';
import { randFloat, choose, clipValue, swapSoSmallerFirst, findLocalMaxima } from './MathUtils';
import { bpmToSecondsPerBeat, deepCloneFlatObjectMap, groupNotesByPitch, noteArrayToPitchSequence, noteArrayToString, reverseString, pitchSequenceToInvervals, findNearest } from './MiscUtils';
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
    flattenArray,
    getMatrixMax,
    formatMatrix,
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
    noteArrayToPitchSequence,
    noteArrayToString,
    reverseString,
    pitchSequenceToInvervals,
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
    pingMidiDevice
};
