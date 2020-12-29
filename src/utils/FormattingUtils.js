/**
 * @module utils/FormattingUtils
 */

/**
 * Formats a time in seconds to <minutes>:<seconds>.<milliseconds>
 *
 * @param {number|null} seconds in seconds
 * @param {boolean} includeMillis include milli seconds in string?
 * @returns {string} 0-padded time string <minutes>:<seconds>.<milliseconds>
 */
export function formatTime(seconds, includeMillis = true) {
    if (seconds === undefined || seconds === null) {
        return includeMillis ? '--:--.---' : '--:--';
    }
    const s = Math.floor(seconds);
    let min = (Math.floor(s / 60)).toString();
    let sec = (s % 60).toString();
    min = min.length < 2 ? `0${min}` : min;
    sec = sec.length < 2 ? `0${sec}` : sec;
    if (!includeMillis) {
        return `${min}:${sec}`;
    }
    let ms = (Math.floor((seconds - s) * 1000)).toString();
    if (ms.length < 2) {
        ms = `00${ms}`;
    } else if (ms.length < 3) {
        ms = `0${ms}`;
    }
    return `${min}:${sec}.${ms}`;
}

/**
 * Formats a Date to a string with format
 *      YYYY-mm-DDTHH:MM:SS
 * or when replaceT == true
 *      YYYY-mm-DD HH:MM:SS
 *
 * @param {Date} date date
 * @param {boolean} replaceT replace the 'T'?
 * @param {boolean} keepMillis keep milliseconds?
 * @returns {string} formatted date
 */
export function formatDate(date, replaceT = false, keepMillis = true) {
    let str = date.toISOString()
        .split(':').join('-');
    if (!keepMillis) {
        str = str.slice(0, str.indexOf('.'));
    }
    if (replaceT) {
        str = str.replace('T', ' ');
    }
    return str;
}

/**
 * Formats the song title (e.g. remove file extension and shorten)
 *
 * @param {string} title song title
 * @param {number} maxLength shorten to this length
 * @returns {string} formatted song title
 */
export function formatSongTitle(title, maxLength = 30) {
    if (!title) {
        return '[No Song]';
    }
    // Remove file extension
    if (title.lastIndexOf('.') !== -1) {
        title = title.slice(0, title.lastIndexOf('.'));
    }
    // Shorten
    if (title.length > maxLength) {
        title = `${title.slice(0, maxLength - 3)}...`;
    }
    return title;
}
