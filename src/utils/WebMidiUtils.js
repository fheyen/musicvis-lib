/**
 * @module utils/WebMidiUtils
 */

/**
 * Allows to ping a MIDI device that loops back to measure latency.
 * The tool loopMIDI does exactly this:
 *
 * @see https://www.tobias-erichsen.de/software/loopmidi.html.
 * @example pingMidiDevice('loopMIDI Port', 10);
 * @param {string} deviceName name of the MIDI device
 * @param {number} howOften how many times to ping the device
 */
export function pingMidiDevice (deviceName, howOften = 1) {
  if (!navigator.requestMIDIAccess) {
    console.error('MIDI: WebMIDI is not supported in this browser.')
  } else {
    let sentCount = 0
    let sentTime
    let totalTime = 0
    // Start listening for incoming data
    const receiveFunction = () => {
      const ping = Date.now() - sentTime
      totalTime += ping
      const avg = totalTime / sentCount
      console.log(`Received MIDI from ${deviceName} after ${ping} ms (avg: ${avg})`)
    }
    navigator.requestMIDIAccess().then(midiAccess => {
      for (const input of midiAccess.inputs.values()) {
        if (deviceName === input.name) {
          input.onmidimessage = receiveFunction
        }
      }
      // Get output device
      let outputDevice = null
      for (const output of midiAccess.outputs.values()) {
        if (deviceName === output.name) {
          outputDevice = output
        }
      }
      if (!outputDevice) {
        console.error(`Cannot ping output device ${deviceName} because it is not there`)
      }
      // Send data once a second
      const pingFunction = () => {
        if (sentCount < howOften) {
          sentCount++
          console.log(`Ping ${sentCount}/${howOften} Sending MIDI ping to ${deviceName}`)
          sentTime = new Date()
          outputDevice.send([0x90, 0x45, 0x7F])
          setTimeout(pingFunction, 1000)
        }
      }
      setTimeout(pingFunction, 1000)
    }, () => console.error('Cannot get MIDI access')
    )
  }
}
