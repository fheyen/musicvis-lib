import Note from '../types/Note';

/**
 * Records incoming MIDI messages from a MIDI device.
 * TODO: not used or tested yet
 * Usage (only in async functions):
 *     const recorder = await recordMidi();
 *     recorder.start();
 *     const notes = recorder.stop();
 */
export const recordMidi = () => {
    return new Promise(async resolve => {
        let midiAccess;
        try {
            midiAccess = await navigator.requestMIDIAccess();
        } catch (e) {
            console.warn('[MidiInput] Cannot access MIDI', e);
            return;
        }
        let messages = [];
        // Add new data when it arrives
        const addMessage = (message) => messages.push(message);
        // Starts recording
        const start = () => {
            if (!midiAccess) {
                console.warn('[MidiInput] Cannot record MIDI');
                return;
            }
            // Do this here, in case devices changed
            for (let input of midiAccess.inputs.values()) {
                input.onmidimessage = addMessage;
            }
            console.log(`[MidiInput] Starting recording`);
            messages = [];
        };
        // Stops recording
        const stop = () => {
            if (!midiAccess) { return; }
            console.log('[MidiInput] Stopping recording');
            // Process messages
            const notes = processMidiMessagesToNotes(messages);
            return notes;
        };
        resolve({ start, stop });
    });
};

/**
 * Parses MIDI messages to Notes
 * @param {Oject[]} messages MIDI messages as they come from the WebMidi API
 * @returns {Note[]} notes
 */
function processMidiMessagesToNotes(messages) {
    // Keep track of currently sounding notes
    const currentNotes = new Map();
    const notes = [];
    for (let message of messages) {
        const device = message.target.name;
        const time = message.timeStamp;
        const commandAndChannel = message.data[0];
        const channel = commandAndChannel % 16;
        const command = commandAndChannel - channel;
        const pitch = message.data[1];
        // A velocity value might not be included with a noteOff command
        const velocity = (message.data.length > 2) ? message.data[2] : 0;
        switch (command) {
            case 128:
                noteOff(notes, currentNotes, device, time, pitch, channel);
                break;
            case 144:
                if (velocity > 0) {
                    noteOn(currentNotes, device, time, pitch, channel, velocity);
                } else {
                    noteOff(notes, currentNotes, device, time, pitch, channel);
                }
                break;
            case 224:
                // TODO: handle pitch wheel?
                break;
            default:
            // TODO: handle other commands?
        }
    }
    // Look for unfinished notes
    if (currentNotes.size > 0) {
        console.warn(`[MidiInput] Got ${currentNotes.size} unfinished notes`);
    }
    notes.sort((a, b) => a.start - b.start);
    return notes;
}

/**
 * Handles note-on messages
 * @param {Map} currentNotes Map with started but not yet ended notes
 * @param {string} device device name
 * @param {number} time time stamp of the message
 * @param {number} pitch MIDI pitch in [0, 127]
 * @param {number} channel MIDI channel
 * @param {number} velocity MIDI velocity
 */
function noteOn(currentNotes, device, time, pitch, channel, velocity) {
    const note = new Note(pitch, time / 1000, velocity, channel);
    const key = `${device}-${channel}-${pitch}`;
    currentNotes.set(key, note);
}

/**
 * Handles note-off messages
 * @param {Note[]} notes finished notes
 * @param {Map} currentNotes Map with started but not yet ended notes
 * @param {string} device device name
 * @param {number} time time stamp of the message
 * @param {number} pitch MIDI pitch in [0, 127]
 * @param {number} channel MIDI channel
 */
function noteOff(notes, currentNotes, device, time, pitch, channel) {
    // Look for note start
    const key = `${device}-${channel}-${pitch}`;
    if (!currentNotes.has(key)) {
        console.warn(`[MidiInput] Missing note-on for note-off with key ${key}`);
        return;
    }
    const note = currentNotes.get(key);
    note.end = time / 1000;
    notes.push(note);
    currentNotes.delete(key);
}
