import Note from '../types/Note';

/**
 * Handles incoming MIDI messages from a MIDI device.
 */
class MidiInputManager {

    #getMidiLiveData;
    #setMidiLiveData;
    #addCurrentNote;
    #removeCurrentNote;

    /**
     * Constructor with callback functions
     *
     * @param {Function} getMidiLiveData a function called by this object to get
     *      the currently recorded MIDI notes from App.js, where the
     *      MidiInputManager instance should be created
     *      Example for how to defined getMidiLiveData as method in App.js:
     *          getMidiLiveData = () => this.state.midiLiveData;
     * @param {Function} setMidiLiveData a function called by this object to
     *      update the currently MIDI notes in App.js
     *      Example:
     *          setMidiLiveData = (data) => {
     *              // Work-around so note_off event handling can
     *              // immediately find the note_on event
     *              this.state.midiLiveData = data;
     *              this.setState({ midiLiveData: data });
     *          };
     * @param {Function} addCurrentNote a function called by this object to add
     *      a currently played note (e.g. currently pressed piano key)
     *      Example:
     *          addCurrentNote = (note) => {
     *              const newMap = new Map(this.state.currentNotes).set(note.pitch, note);
     *              this.setState({ currentNotes: newMap });
     *          }
     * @param {Function} removeCurrentNote a function called by this object to
     *      remove a currently played note
     *      Example:
     *          removeCurrentNote = (pitch) => {
     *              const newMap = new Map(this.state.currentNotes).delete(pitch);
     *              this.setState({ currentNotes: newMap });
     *          }
     */
    constructor(
        getMidiLiveData,
        setMidiLiveData,
        addCurrentNote = () => { },
        removeCurrentNote = () => { },
    ) {
        this.#getMidiLiveData = getMidiLiveData;
        this.#setMidiLiveData = setMidiLiveData;
        this.#addCurrentNote = addCurrentNote;
        this.#removeCurrentNote = removeCurrentNote;
        // Request MIDI access
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess().then(this._onMIDISuccess, this._onMIDIFailure);
        } else {
            console.error('[MidiInput] WebMIDI is not supported in this browser.');
            alert('You browser does not support WebMIDI');
        }
    }

    /**
     * Handles a successful MIDI access request
     *
     * @private
     * @param {*} midiAccess MIDI access
     */
    _onMIDISuccess = (midiAccess) => {
        // console.log(midiAccess);
        console.groupCollapsed(`[MidiInput] ${midiAccess.inputs.size} input devices`);
        for (const input of midiAccess.inputs.values()) {
            console.log(` - ${input.name}`);
            input.onmidimessage = this._handleMIDIMessage;
        }
        console.groupEnd();
        // console.groupCollapsed(`[MidiInput] ${midiAccess.inputs.size} output devices`);
        // for (let output of midiAccess.outputs.values()) {
        //     console.log(` - ${output.name}`);
        // }
        // console.groupEnd();
    }

    /**
     * Handles MIDI access errors
     *
     * @private
     * @param {*} error error
     */
    _onMIDIFailure(error) {
        console.error('[MidiInput] Cannot access MIDI devices.', error);
    }

    /**
     * Handles incoming MIDI messages
     *
     * @private
     * @param {*} message MIDI message
     */
    _handleMIDIMessage = (message) => {
        // console.log(message);
        const device = message.target.name;
        const commandAndChannel = message.data[0];
        const channel = commandAndChannel % 16;
        const command = commandAndChannel - channel;
        const time = message.timeStamp;
        const pitch = message.data[1];
        // A velocity value might not be included with a noteOff command
        const velocity = (message.data.length > 2) ? message.data[2] : 0;
        switch (command) {
        case 128:
            this._noteOff(device, time, pitch, channel);
            break;
        case 144:
            if (velocity > 0) {
                this._noteOn(device, time, pitch, channel, velocity);
            } else {
                this._noteOff(device, time, pitch, channel);
            }
            break;
        case 224:
            // TODO: handle pitch wheel?
            break;
        default:
            // TODO: handle other commands?
        }
    }

    /**
     * Handles note-on messages
     *
     * @private
     * @param {string} device device name
     * @param {number} time time stamp of the message
     * @param {number} pitch MIDI pitch in [0, 127]
     * @param {number} channel MIDI channel
     * @param {number} velocity MIDI velocity
     */
    _noteOn(device, time, pitch, channel, velocity) {
        const note = new Note(pitch, time / 1000, velocity, channel);
        // Add current note
        this.#addCurrentNote(note);
        // Update recorded MIDI data
        // TODO: probably better to only update on note-off,
        // Then we need internal cache
        // But this might be good, since only 'unfinished' notes need to be checked on note-off,
        // so we can remove finished notes from the cache
        let midiData = this.#getMidiLiveData();
        midiData = midiData.concat([note]);
        this.#setMidiLiveData(midiData);
    }

    /**
     * Handles note-off messages by updating the end time of the corresponding
     * note
     *
     * @private
     * @param {string} device device name
     * @param {number} time time stamp of the message
     * @param {number} pitch MIDI pitch in [0, 127]
     * @param {number} channel MIDI channel
     */
    _noteOff(device, time, pitch, channel) {
        const midiData = this.#getMidiLiveData();
        if (midiData.length === 0) {
            // If we have to wait for the setState to process, try again
            setTimeout(() => this._noteOff(time, pitch), 10);
        }
        // Go back to latest note with the same pitch and channel and add the end time
        let index = midiData.length - 1;
        // TODO: if there are multiple instruments or channels, check also for those
        while (midiData[index].pitch !== pitch || midiData[index].channel !== channel) {
            index--;
            if (index < 0) {
                console.warn('[MidiInput] Did not find note-on event for note-off event!');
                break;
            }
        }
        if (index >= 0) {
            // Note successfully found, update data
            midiData[index].end = time / 1000;
            this.#setMidiLiveData(midiData);
            this.#removeCurrentNote(pitch);
        }
    }
}

export default MidiInputManager;
