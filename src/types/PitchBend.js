/**
 * Class that allows to represent pitch-bends from a MIDI file
 *
 * @todo NYI
 * @todo not used yet
 */
class PitchBend {
    /**
     * @param {number} start start time in seconds
     * @param {number} amount bend amount
     * @param {number} channel MIDI channel
     */
    constructor(
        start = 0,
        channel = 0,
    ) {
        this.start = start;
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
            channel = 0,
        } = object;
        return new PitchBend(start, channel);
    }
}

export default PitchBend;
