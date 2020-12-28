/**
 * Allows to record audio blobs.
 * @example
 * Usage (only in async functions):
 *     const recorder = await recordAudio();
 *     recorder.start();
 *     // ...
 *     const audio = await recorder.stop();
 * stop() returns a Blob with audio data
 * @see https://medium.com/@bryanjenningz/how-to-record-and-play-audio-in-javascript-faa1b2b3e49b
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
 */
export const recordAudio = () => {
    return new Promise(async resolve => {
        let stream;
        try {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch (e) {
            console.warn('[AudioInput] Cannot access audio', e);
            return;
        }
        const options = {
            audioBitsPerSecond: 128000
        };
        const mediaRecorder = new MediaRecorder(stream, options);
        let audioChunks = [];
        // Add new data when it arrives
        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });
        // Starts recording
        const start = () => {
            if (!mediaRecorder) {
                console.warn('[AudioInput] Cannot record audio, no microphone?');
                return;
            }
            if (mediaRecorder.state === 'recording') { return; }
            console.log(`[AudioInput] Recording @ ${mediaRecorder.audioBitsPerSecond} b/s`);
            audioChunks = [];
            mediaRecorder.start()
        };
        // Stops recording
        const stop = () =>
            new Promise(resolve => {
                if (!mediaRecorder) { return; }
                console.log('[AudioInput] Stopping audio recording');
                mediaRecorder.addEventListener("stop", () => {
                    // Audio blob contains the data to store on the server
                    const blobOptions = { type: mediaRecorder.mimeType };
                    const audioBlob = new Blob(audioChunks, blobOptions);
                    // console.log(audioBlob);
                    resolve(audioBlob);
                });
                mediaRecorder.stop();
            });
        resolve({ start, stop });
    });
};
