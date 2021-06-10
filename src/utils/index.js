export {
    arrayShallowEquals,
    jaccardIndex,
    removeDuplicates,
    arrayContainsArray,
    arrayHasSameElements,
    getMatrixMax,
    formatMatrix,
    binarySearch,
} from './ArrayUtils';

export {
    blobToBase64,
    blobToFileExtension,
} from './BlobUtils';

export {
    formatDate,
    formatTime,
    formatSongTitle,
} from './FormattingUtils';

export {
    storeObjectInLocalStorage,
    getObjectFromLocalStorage,
} from './LocalStorageUtils';

export {
    randFloat,
    choose,
    clipValue,
    swapSoSmallerFirst,
    findLocalMaxima,
} from './MathUtils';

export {
    deepCloneFlatObjectMap,
    groupNotesByPitch,
    reverseString,
    findNearest,
    delay,
} from './MiscUtils';

export {
    bpmToSecondsPerBeat,
    freqToApproxMidiNr,
    chordToInteger,
    chordIntegerJaccardIndex,
    noteDurationToNoteType,
    metronomeTrackFromTempoAndMeter,
    metronomeTrackFromMusicPiece,
} from './MusicUtils';

export { noteColorFromPitch } from './NoteColorUtils';

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
} from './RecordingsUtils';

export {
    confidenceInterval,
    getBoxplotCharacteristics,
    kernelDensityEstimator,
    kernelEpanechnikov,
    kernelGauss,
} from './StatisticsUtils';

export { pingMidiDevice } from './WebMidiUtils';

/**
 * @module utils
 */
