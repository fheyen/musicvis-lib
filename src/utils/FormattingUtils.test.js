import { formatTime, formatDate, formatSongTitle } from './FormattingUtils.js'

describe('FormattingUtils', () => {
  describe('format time', () => {
    test('does format undefined', () => {
      expect(formatTime(null, false)).toBe('--:--')
      expect(formatTime(undefined, false)).toBe('--:--')
      expect(formatTime(null)).toBe('--:--.---')
      expect(formatTime(undefined)).toBe('--:--.---')
    })

    test('does format without milliseconds', () => {
      expect(formatTime(0, false)).toBe('00:00')
      expect(formatTime(1, false)).toBe('00:01')
      expect(formatTime(60, false)).toBe('01:00')
      expect(formatTime(93, false)).toBe('01:33')
      expect(formatTime(60 * 45 + 33, false)).toBe('45:33')
    })

    test('does format with milliseconds', () => {
      expect(formatTime(0)).toBe('00:00.000')
      expect(formatTime(1)).toBe('00:01.000')
      expect(formatTime(1.150)).toBe('00:01.150')
      expect(formatTime(60.001)).toBe('01:00.001')
      expect(formatTime(60.012)).toBe('01:00.012')
      expect(formatTime(93.123)).toBe('01:33.123')
    })
  })

  // TODO: one hour off... due to local time
  describe('format date', () => {
    const d = new Date(Date.parse('2020-01-01T14:14:15.123'))
    test('default params', () => {
      expect(formatDate(d)).toBe('2020-01-01T13-14-15.123Z')
    })

    test('does format with T', () => {
      expect(formatDate(d, false, true)).toBe('2020-01-01T13-14-15.123Z')
    })

    test('does format without T', () => {
      expect(formatDate(d, true, true)).toBe('2020-01-01 13-14-15.123Z')
      expect(formatDate(d, true, false)).toBe('2020-01-01 13-14-15')
    })

    test('does format without millis', () => {
      expect(formatDate(d, true, false)).toBe('2020-01-01 13-14-15')
    })

    test('different millis', () => {
      const d2 = new Date(Date.parse('2020-01-01T14:14:15.012'))
      expect(formatDate(d2, true, true)).toBe('2020-01-01 13-14-15.012Z')

      const d3 = new Date(Date.parse('2020-01-01T14:14:15.001'))
      expect(formatDate(d3, true, true)).toBe('2020-01-01 13-14-15.001Z')

      const d4 = new Date(Date.parse('2020-01-01T14:14:15.000'))
      expect(formatDate(d4, true, true)).toBe('2020-01-01 13-14-15.000Z')
    })
  })

  describe('format song title', () => {
    test('does format empty title', () => {
      expect(formatSongTitle()).toBe('[No Song]')
    })

    test('does remove file extension', () => {
      expect(formatSongTitle('test.mid')).toBe('test')
      expect(formatSongTitle('test.something.mid')).toBe('test.something')
    })

    test('no file extension', () => {
      expect(formatSongTitle('test')).toBe('test')
    })

    test('does shorten', () => {
      expect(formatSongTitle('test_with_very_long_name.mid', 20)).toBe('test_with_very_lo...')
    })
  })
})
