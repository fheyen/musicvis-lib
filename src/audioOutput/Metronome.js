/**
 * Metronome
 */
export default class Metronome {

    #isPlaying = false;
    // Stores the timeout
    #timerID = null;
    #bpm = null;
    #beat = 4;
    #beatType = 4;
    #startTimeStamp = null;
    // Stores the number of the current beat (for accents)
    #beatCount = null;
    #audioCtx = new AudioContext();

    get bpm() { return this.#bpm; }

    get beatCount() { return this.#beatCount; }

    /**
     * Starts the metronome with a given tempo in bpm
     * @param {number} bpm tempo in bpm
     * @param {string} beatTypeString e.g. '4/4', '3/4'
     */
    start(bpm, beatTypeString = '4/4') {
        if (!bpm || isNaN(+bpm)) {
            console.error(`[Metronome] Invalid bpm ${bpm}`);
            return;
        }
        const splitBt = beatTypeString.split('/');
        if (splitBt.length !== 2 || isNaN(+splitBt[0] || isNaN(+splitBt[1]))) {
            console.error(`[Metronome] Invalid beatType ${beatTypeString}, using 4/4 instead`);
            this.#beat = 4;
            this.#beatType = 4;
        } else {
            this.#beat = +splitBt[0];
            this.#beatType = +splitBt[1];
        }
        console.log(`Metronome @ ${bpm}bpm, ${this.#beat}/${this.#beatType}`);
        if (this.#audioCtx.state === 'suspended') {
            this.#audioCtx.resume();
        };
        this.#bpm = bpm;
        this.#isPlaying = true;
        // Reset state
        this.#beatCount = 0;
        this.#startTimeStamp = this.#audioCtx.currentTime;
        this._scheduler();
    }

    /**
     * Stops the metronome
     */
    stop() {
        console.log(`Metronome stopped`);
        clearTimeout(this.#timerID);
        this.#isPlaying = false;
    }

    /**
     * Starts the metronome is it not running and stops it if it is
     * @param {number} bpm tempo in bpm, last used bpm will be used as fallback
     * @param {string} beatTypeString e.g. '4/4', '3/4'
     */
    toggle(bpm, beatTypeString = '4/4') {
        if (this.#isPlaying) {
            this.stop();
        } else {
            if (bpm === undefined) {
                bpm = this.#bpm;
            }
            this.start(bpm, beatTypeString);
        }
    }

    /**
     * Plays a single peep.
     */
    peep() {
        if (this.#audioCtx.state === 'suspended') {
            this.#audioCtx.resume();
        };
        const osc = this.#audioCtx.createOscillator();
        osc.connect(this.#audioCtx.destination);
        osc.frequency.value = 440;
        osc.start(this.#audioCtx.currentTime);
        osc.stop(this.#audioCtx.currentTime + 0.1);
    }

    /**
     * @private
     * Scheduler runs every scheduleTimeout milliseconds to schedule notes
     * for the coming lookahead time in seconds.
     */
    _scheduler = () => {
        // Scheduler parameters
        const lookahead = 0.1; // seconds
        const scheduleTimeout = 50; // milliseconds
        // Beat properties
        const accentNote = this.#beat;
        const secondsPerBeat = 60 / this.#bpm;
        const duration = 0.1;
        let nextNotetime = this.#startTimeStamp + this.#beatCount * secondsPerBeat;
        // Only schedule beats until the lookahead is reached
        while (nextNotetime < this.#audioCtx.currentTime + lookahead) {
            nextNotetime += secondsPerBeat;
            // Accent on every n-th note starting with the 0th
            const frequency = this.#beatCount % accentNote === 0 ? 440 : 220;
            this._playSound(nextNotetime, frequency, duration);
            this.#beatCount++;
        }
        // Plan next scheduler run
        this.#timerID = setTimeout(this._scheduler, scheduleTimeout);
    }

    /**
     * @private
     * Play a sounds via AudioContext and an oscillator.
     * @param {number} time  AudioContext time in seconds
     * @param {number} frequency frequency in Hz
     * @param {number} duration duration of the sound in seconds
     */
    _playSound(time, frequency, duration) {
        const osc = this.#audioCtx.createOscillator();
        osc.connect(this.#audioCtx.destination);
        osc.frequency.value = frequency;
        osc.start(time);
        osc.stop(time + duration);
        // console.log(frequency);
    }
}
