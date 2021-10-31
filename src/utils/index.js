export {
    arrayShallowEquals,
    jaccardIndex,
    kendallTau,
    removeDuplicates,
    arrayContainsArray,
    arrayHasSameElements,
    getArrayMax,
    normalizeNdArray,
    euclideanDistance,
    formatMatrix,
    binarySearch,
} from './ArrayUtils.js';

export {
    blobToBase64,
    blobToFileExtension,
} from './BlobUtils.js';

export {
    getColorLightness,
    averageColor,
} from './ColorUtils.js';

export {
    formatDate,
    formatTime,
    formatSongTitle,
} from './FormattingUtils.js';

export {
    storeObjectInLocalStorage,
    getObjectFromLocalStorage,
} from './LocalStorageUtils.js';

export {
    randFloat,
    choose,
    clipValue,
    swapSoSmallerFirst,
    findLocalMaxima,
} from './MathUtils.js';

export {
    deepCloneFlatObjectMap,
    groupNotesByPitch,
    reverseString,
    findNearest,
    delay,
} from './MiscUtils.js';

export {
    bpmToSecondsPerBeat,
    freqToApproxMidiNr,
    chordToInteger,
    chordIntegerJaccardIndex,
    noteDurationToNoteType,
    metronomeTrackFromTempoAndMeter,
    metronomeTrackFromMusicPiece,
} from './MusicUtils.js';

export { noteColorFromPitch } from './NoteColorUtils.js';

export {
    filterRecordingNoise,
    clipRecordingsPitchesToGtRange,
    clipRecordingsPitchesToGtFretboardRange,
    recordingsHeatmap,
    averageRecordings,
    averageRecordings2,
    differenceMap,
    differenceMapErrorAreas,
    alignNotesToBpm,
} from './RecordingsUtils.js';

export {
    confidenceInterval,
    getBoxplotCharacteristics,
    kernelDensityEstimator,
    kernelEpanechnikov,
    kernelGauss,
} from './StatisticsUtils.js';

export { pingMidiDevice } from './WebMidiUtils.js';

/**
 * @module utils
 */
