import { formatTime, formatDate, formatSongTitle } from '../../src/utils/FormattingUtils';

describe('format time', () => {
    test('does format undefined', () => {
        expect(formatTime(null, false)).toBe('--:--');
        expect(formatTime(undefined, false)).toBe('--:--');
        expect(formatTime(null)).toBe('--:--.---');
        expect(formatTime(undefined)).toBe('--:--.---');
    });

    test('does format without milliseconds', () => {
        expect(formatTime(0, false)).toBe('00:00');
        expect(formatTime(1, false)).toBe('00:01');
        expect(formatTime(60, false)).toBe('01:00');
        expect(formatTime(93, false)).toBe('01:33');
    });

    test.skip('does format with milliseconds', () => {
        expect(formatTime(0)).toBe('00:00.000');
        expect(formatTime(1)).toBe('00:01.000');
        expect(formatTime(1.150)).toBe('00:01.150');
        expect(formatTime(60.001)).toBe('01:00.001');
        expect(formatTime(93.123)).toBe('01:33.123');
    });

});

describe.skip('format date', () => {
    const d = new Date(Date.parse('2020-01-01T13:14:15.123'));
    test('does format with T', () => {
        expect(formatDate(d, false, true)).toBe('2020-01-01T13:14:15.123Z');
    });

    test('does format without T', () => {
        expect(formatDate(d, true, true)).toBe('2020-01-01 13:14:15.123Z');
        expect(formatDate(d, true, false)).toBe('2020-01-01 13:14:15');
    });

    test('does format without millis', () => {
        expect(formatDate(d, true, false)).toBe('2020-01-01 13:14:15');
    });
});

describe('format song title', () => {
    test('does format empty title', () => {
        expect(formatSongTitle()).toBe('[No Song]');
    });

    test('does remove file extension', () => {
        expect(formatSongTitle('test.mid')).toBe('test');
    });

    test('does shorten', () => {
        expect(formatSongTitle('test_with_very_long_name.mid', 20)).toBe('test_with_very_lo...');
    });
});
