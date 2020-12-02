import Soundfont from 'soundfont-player';
import NoteArray from '../types/NoteArray';

/**
 * Note player that uses a synthesizer of samples based on sound arguments.
 */
export default class Player {

    #frontendUrl = null;
    // Callbakcs
    #playerTimeCallback = null;
    #onStopCallback = null;
    // Settings
    #sound = null;
    #volume = 1;
    #speed = null;
    #log = false;
    // Internal state
    currentPlayTime = null;
    #instrument = null;
    #audioCtx = new AudioContext();
    #timerID = null;
    #startTimeStamp = null;
    #startAt = 0;
    #endAt = -1;
    #notes = [];
    #notesLeftToPlay = [];
    #songDuration = null;
    #isPlaying = false;
    #isPaused = false;
    // Cache info
    #lastSoundName = null;
    // Valid instrument / sound names
    // For soundfont instruments see: https://github.com/danigb/soundfont-player/blob/master/INSTRUMENTS.md
    #validInstruments = new Map([
        ['acoustic_grand_piano', { name: 'acoustic_grand_piano', desciption: 'Acoustic grand piano' }],
        ['acoustic_guitar_nylon', { name: 'acoustic_guitar_nylon', desciption: 'Acoustic guitar nylon' }],
        ['acoustic_guitar_steel', { name: 'acoustic_guitar_steel', desciption: 'Acoustic guitar steel' }],
        ['distortion_guitar', { name: 'distortion_guitar', desciption: 'Distortion guitar' }],
        ['electric_bass_finger', { name: 'electric_bass_finger', desciption: 'Electric bass finger' }],
        ['electric_bass_pick', { name: 'electric_bass_pick', desciption: 'Electric bass pick' }],
        ['electric_guitar_clean', { name: 'electric_guitar_clean', desciption: 'Electric guitar clean' }],
        ['electric_guitar_muted', { name: 'electric_guitar_muted', desciption: 'Electric guitar muted' }],
        ['overdriven_guitar', { name: 'overdriven_guitar', desciption: 'Overdriven guitar' }],
        ['percussion', { name: 'percussion', desciption: 'Percussion', font: 'FluidR3_GM' }]
    ]);

    /**
     * Player for synthesized or sampled playback of an array of Note objects.
     * @param {string} frontendUrl URL of the frontend, needed to find the
     *      soundfont and sample files
     */
    constructor(frontendUrl) {
        this.#frontendUrl = frontendUrl;
    }

    /**
     * Register a callback for player time change
     * @param {Function} cb callback function, argument is the current player
     *      time in seconds
     * @returns {Player} itself
     */
    onTimeChange = (cb) => {
        this.#playerTimeCallback = cb;
        return this;
    }

    /**
     * Register a callback for player stop
     * @param {Function} cb callback function, no arguments
     * @returns {Player} itself
     */
    onStop = (cb) => {
        this.#onStopCallback = cb;
        return this;
    };

    /**
     * Returns an array with the supported instrument soundfont names
     * @returns {Object[]} {name, description, font}
     */
    getAvailableInstruments = () => {
        return Array.from(this.#validInstruments.values());
    }

    /**
     * Changes the volume (loudness)
     * @param {number} volume volume in [0, 1]
     * @returns {Player} itself
     */
    setVolume = (volume) => {
        this.#volume = volume;
        return this;
    }

    /**
     * Changes the logging flag to enable or disable logging of note events.
     * @param {boolean} log
     */
    setLogging = (log) => {
        this.#log = log;
        return this;
    }

    isPlaying = () => this.#isPlaying;

    isPaused = () => this.#isPaused;

    /**
     * Plays a set of notes.
     * TODO: filter notes before playing to sort out invalid ones.
     * @param {Note[]} notes array of note objects
     * @param {string} sound see https://github.com/keithwhor/audiosynth
     * @param {number} startAt time of the track where to start playing in seconds
     * @param {number} endAt time of the track where to end playing in seconds
     *      or -1 for no end limit
     * @param {number} speed relative speed in [0, 2] (e.g. 0.5 for halfed speed)
     */
    playNotes = (notes, sound = 'piano', startAt = 0, endAt = -1, speed = 1) => {
        // Stop if playing
        if (this.#isPlaying && !this.#isPaused) {
            this.stop();
        }
        // Check arguments
        if (!notes || notes.length === 0) {
            console.warn('[PLAYER] Was called with no data');
            return;
        }
        if (!this.#validInstruments.has(sound)) {
            console.error(`[Player] Sound ${sound} is not supported!`);
            return;
        }
        // Remember original notes for resume
        this.#notes = notes.slice();
        notes = new NoteArray(notes).sortByTime();
        this.#songDuration = notes.getDuration();
        // Start time
        if (startAt > 0) {
            notes = notes.filter(d => d.start >= startAt).shiftTime(-startAt);
            console.log(`[Player] Will start at ${startAt.toFixed(2)} seconds with ${notes.length()} notes left`);
        }
        // Consider playback speed
        if (speed !== 1 && speed > 0) {
            notes = notes.scaleTime(1 / speed);
            this.#songDuration /= speed;
        }
        notes = notes.getNotes();
        // Start playing
        console.log(`[Player] Playing ${notes.length} notes with '${sound}', speed ${speed}, and volume ${this.#volume}`);
        if (this.#audioCtx.state === 'suspended') {
            this.#audioCtx.resume();
        };
        this.#sound = sound;
        this.#startAt = startAt;
        this.#endAt = endAt;
        this.#speed = speed;
        this.#notesLeftToPlay = notes.slice();
        if (sound === this.#lastSoundName) {
            // Re-use instrument
            this._start();
        } else {
            // Load instrument
            this.preloadInstrument(sound).then(this._start);
        }
    }

    /**
     * Loads an instrument (soundfont) in advance so the player can start
     * immediately once it is called
     * @param {string} sound instrument name
     */
    async preloadInstrument(sound) {
        // Had to change it since react somehow redirects everything to /
        // when fetching the file..., using GitHub hosted files now
        // const url = this.#frontendUrl;
        // const file = `soundfonts/${sound}-mp3.js`;
        // console.log(`[Player] Pre-loading sound font from ${url}/${file}`);
        if (!this.#validInstruments.has(sound)) {
            console.warn(`[Player] Invalid sound ${sound}`);
        }
        console.log(`[Player] Loading soundfont ${sound}`);
        const options = {
            // from: url,
            soundfont: this.#validInstruments.get(sound).font || 'FluidR3_GM',
            gain: this.#volume
        };
        const instrument = await Soundfont.instrument(this.#audioCtx, sound, options);
        this.#lastSoundName = sound;
        this.#instrument = instrument;
        console.log(`[Player] Finished loading soundfont ${sound}`);
    }

    /**
     * @private
     * Start scheduler
     */
    _start = () => {
        console.log('[Player] Starting');
        this.#isPlaying = true;
        this.#isPaused = false;
        this.#startTimeStamp = this.#audioCtx.currentTime;
        this._scheduler();
    }

    /**
     * @private
     * Update current time and call callback
     * @param {*} time
     */
    _updateTime = (time) => {
        const current = (time - this.#startTimeStamp) * this.#speed + this.#startAt;
        this.currentPlayTime = current;
        if (this.#playerTimeCallback) {
            this.#playerTimeCallback(current);
        }
    }

    /**
     * @private
     * Plays a single note
     * @param {Note} note note object
     * @param {number} time time in milliseconds
     */
    _playNote = (note, time) => {
        const duration = note.getDuration();
        if (this.#log) {
            console.log(`[Player] Playing ${note.getName()} for ${duration}s`);
        }
        try {
            this.#instrument.play(note.pitch, time, { duration });
        } catch (e) {
            console.error(`[Player] Error for note`, note, e);
        }
    }

    /**
     * @private
     * Scheduler runs every scheduleTimeout milliseconds to schedule notes
     * for the coming lookahead time in seconds
     */
    _scheduler = () => {
        const lookahead = 0.1;
        const scheduleTimeout = 33;
        const ctxTime = this.#audioCtx.currentTime;
        this._updateTime(ctxTime);
        // Schedule notes
        while (this.#notesLeftToPlay.length > 0) {
            const nextNotetime = this.#startTimeStamp + this.#notesLeftToPlay[0].start;
            // Only schedule until the lookahead is reached
            if (nextNotetime > ctxTime + lookahead) {
                break;
            }
            // Play note
            const note = this.#notesLeftToPlay.shift();
            this._playNote(note, nextNotetime);
        }
        const current = ctxTime - this.#startTimeStamp + this.#startAt;
        const endAt = (this.#endAt - this.#startAt) / this.#speed + this.#startAt;
        if (this.#endAt !== -1 && current >= endAt) {
            // Stop if end of time selection is reached
            this.stop();
        } else if (current >= this.#songDuration) {
            // Stop if no notes left to play
            this.stop();
        } else {
            // Plan next scheduler run
            this.#timerID = setTimeout(this._scheduler, scheduleTimeout);
        }
    }

    /**
     * Stops the player
     * @param {boolean} callCallback call the callback function
     * @returns {Player} itself
     */
    stop = (callCallback = true) => {
        if (!this.#isPlaying) {
            return;
        }
        console.log('[Player] Stopping player');
        clearTimeout(this.#timerID);
        this.currentPlayTime = null;
        this.#isPlaying = false;
        this.#isPaused = false;
        this.#notes = [];
        this.#notesLeftToPlay = [];
        // Callback
        if (this.#playerTimeCallback) {
            this.#playerTimeCallback(null);
        }
        if (callCallback && this.#onStopCallback) {
            this.#onStopCallback();
        }
        return this;
    }

    /**
     * Pauses the player
     * @returns {Player} itself
     */
    pause = () => {
        console.log('[Player] Pausing player');
        clearTimeout(this.#timerID);
        this.#isPaused = true;
        // TODO: onpause callback?
        return this;
    }

    /**
     * Resumes the player if paused
     * @returns {Player} itself
     */
    resume = () => {
        console.log('[Player] Resuming player');
        if (!this.#notesLeftToPlay || this.#notesLeftToPlay.length === 0) {
            console.warn('[Player] Cannot resume player since it has not been started!');
            return;
        }
        this.playNotes(this.#notes, this.#sound, this.currentPlayTime, this.#endAt, this.#speed);
        // TODO: on resume callback?
        return this;
    }

    /**
     * Will either pause or resume depending on player state
     * @returns {Player} itself
     */
    pauseOrResume = () => {
        if (!this.#isPlaying) {
            console.warn('[Player] Cannot pause / resume when player is not playing!');
            return;
        }
        if (this.#isPaused) {
            this.resume();
        } else {
            this.pause();
        }
        return this;
    }
}
