/**
 * Contains patterns for exercises, such as scales
 *
 * @type {Map<string,object>}
 */
const patterns = new Map([
    ['Snare only', {
        name: 'Snare only',
        // 'Chords' of drums to hit, e.g. ['bass', 'snare'] means hitting them both at the same time
        hits: [
            ['snare'],
        ],
    }],
    ['Bass only', {
        name: 'Bass only',
        hits: [
            ['bass'],
        ],
    }],
    ['Snare and bass alternating', {
        name: 'Snare and bass alternating',
        hits: [
            ['snare'],
            ['bass'],
        ],
    }],
    ['Snare and bass together', {
        name: 'Snare and bass together',
        hits: [
            ['snare', 'bass'],
        ],
    }],
    ['Snare and bass alternating / together', {
        name: 'Snare and bass alternating / together',
        hits: [
            ['snare'],
            ['snare', 'bass'],
        ],
    }],
    ['Snare and bass alternating / together 2', {
        name: 'Snare and bass alternating / together 2',
        hits: [
            ['snare', 'bass'],
            ['bass'],
        ],
    }],
    // From https://learndrumsforfree.com/2015/07/10-basic-rock-drum-beats/
    ['Simple Pattern 1', {
        name: 'Simple Pattern 1',
        hits: [
            ['hihat-closed', 'bass'],
            ['hihat-closed'],
            ['hihat-closed', 'snare'],
            ['hihat-closed'],
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'snare'],
            ['hihat-closed'],
        ],
    }],
    ['Simple Pattern 2', {
        name: 'Simple Pattern 2',
        hits: [
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'snare'],
            ['hihat-closed'],
            ['hihat-closed', 'bass'],
            ['hihat-closed'],
            ['hihat-closed', 'snare'],
            ['hihat-closed'],
        ],
    }],
    ['Simple Pattern 3', {
        name: 'Simple Pattern 3',
        hits: [
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'snare'],
            ['hihat-closed'],
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'snare'],
            ['hihat-closed'],
        ],
    }],
    ['Simple Pattern 4', {
        name: 'Simple Pattern 4',
        hits: [
            ['hihat-closed', 'bass'],
            ['hihat-closed'],
            ['hihat-closed', 'snare'],
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'bass'],
            ['hihat-closed'],
            ['hihat-closed', 'snare'],
            ['hihat-closed'],
        ],
    }],
    ['Simple Pattern 5', {
        name: 'Simple Pattern 5',
        hits: [
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'snare'],
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'bass'],
            ['hihat-closed'],
            ['hihat-closed', 'snare'],
            ['hihat-closed'],
        ],
    }],
    ['Simple Pattern 6', {
        name: 'Simple Pattern 6',
        hits: [
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'snare'],
            ['hihat-closed'],
            ['hihat-closed'],
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'snare'],
            ['hihat-closed'],
        ],
    }],
    ['Simple Pattern 7', {
        name: 'Simple Pattern 7',
        hits: [
            ['hihat-closed', 'bass'],
            ['hihat-closed'],
            ['hihat-closed', 'snare'],
            ['hihat-closed', 'bass'],
            ['hihat-closed'],
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'snare'],
            ['hihat-closed'],
        ],
    }],
    ['Simple Pattern 8', {
        name: 'Simple Pattern 8',
        hits: [
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'snare'],
            ['hihat-closed', 'bass'],
            ['hihat-closed'],
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'snare'],
            ['hihat-closed'],
        ],
    }],
    ['Simple Pattern 9', {
        name: 'Simple Pattern 9',
        hits: [
            ['hihat-closed', 'bass'],
            ['hihat-closed'],
            ['hihat-closed', 'snare'],
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'snare'],
            ['hihat-closed'],
        ],
    }],
    ['Simple Pattern 10', {
        name: 'Simple Pattern 10',
        hits: [
            ['hihat-closed', 'snare', 'bass'],
            ['hihat-closed'],
            ['hihat-closed', 'snare', 'bass'],
            ['hihat-closed'],
            ['hihat-closed', 'snare'],
            ['hihat-closed', 'bass'],
            ['hihat-closed', 'snare'],
            ['hihat-closed', 'bass'],
        ],
    }],
]);

export default patterns;
