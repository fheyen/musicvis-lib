/**
 * Class that allows to represent pitch-bends from a MIDI file
 *
 * @todo NYI
 * @todo not used yet
 * @todo can we aggregated pitchbend events into one PitchBend?
 *      needs amounts: number[]
 *      aggregation ends when amount is 0 (for some time? otherwise vibrato will be multiple PB)
 */
class PitchBend {
    /**
     * @param {number} start start time in seconds
     * @param {number} amount bend amount
     * @param {number} channel MIDI channel
     */
    constructor(
        start = 0,
        amount = 0,
        channel = 0,
    ) {
        this.start = start;
        this.amount = amount;
        this.channel = channel;
    }

    /**
     * Creates a GuitarNote object from an object via destructuring
     *
     * @param {object} object object with at least {pitch}
     * @returns {PitchBend} new note
     */
    static from(object) {
        const {
            start = 0,
            amount = 0,
            channel = 0,
        } = object;
        return new PitchBend(start, amount, channel);
    }
}

export default PitchBend;
