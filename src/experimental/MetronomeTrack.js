// eslint-disable-next-line no-unused-vars
import { Utils, MusicPiece } from 'musicvis-lib';

/**
 * Creates a track of metronome ticks for a given tempo and meter.
 *
 * @param {number} tempo tempo in bpm, e.g. 120
 * @param {number[]} meter e.g. [4, 4]
 * @param {number} duration duration of the resulting track in seconds
 * @returns {object[]} metronome track with {time: number, accent: boolean}
 */
export function metronomeTrackFromTempoAndMeter(tempo = 120, meter = [4, 4], duration = 60) {
    const track = [];
    const secondsPerBeat = Utils.bpmToSecondsPerBeat(tempo) / (meter[1] / 4);
    let currentTime = 0;
    while (currentTime <= duration) {
        for (let beat = 0; beat < meter[0]; beat++) {
            track.push({
                time: currentTime,
                accent: beat % meter[0] === 0,
            });
            currentTime += secondsPerBeat;
            if (currentTime > duration) {
                return track;
            }
        }
    }
}

/**
 * Creates a track of metronome ticks for a given music piece.
 *
 * @todo not tested yet
 * @param {MusicPiece} musicPiece music piece
 * @returns {object[]} metronome track with {time: number, accent: boolean}
 */
export function metronomeTrackFromMusicPiece(musicPiece) {
    const { duration, tempos, timeSignatures } = musicPiece;
    const track = [];
    let currentTime = 0;
    let currentTempo;
    let currentTimeSignature;
    while (currentTime <= duration) {
        // TODO: always use the most recent tempo and meter
        for (const tempo of tempos) {
            if (tempo.time > currentTime) {
                break;
            }
            currentTempo = tempo.bpm;
        }
        for (const sig of timeSignatures) {
            if (sig.time > currentTime) {
                break;
            }
            currentTimeSignature = sig.signature;
        }
        const secondsPerBeat = Utils.bpmToSecondsPerBeat(currentTempo) / (currentTimeSignature[1] / 4);
        for (let beat = 0; beat < currentTimeSignature[0]; beat++) {
            track.push({
                time: currentTime,
                accent: beat % currentTimeSignature[0] === 0,
            });
            currentTime += secondsPerBeat;
            if (currentTime > duration) {
                return track;
            }
        }
    }
}
