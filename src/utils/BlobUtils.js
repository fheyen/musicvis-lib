/**
 * @module utils/BlobUtils
 */

/**
 * Converts a Blob to a base64 string
 * @param {Blob} blob Blob
 * @returns {string} base64 string
 */
export function blobToBase64(blob) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

/**
 * Extracts the file extension from a Blob, so it can be saved as a file with
 * an appropriate extension.
 * @param {Blob} blob Blob
 * @returns {string} file extension
 */
export function blobToFileExtension(blob) {
    return blob.type.split('/')[1].split(';')[0];
}
