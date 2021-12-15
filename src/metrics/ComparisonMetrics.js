import * as d3 from 'd3'

/**
 *
 * @param {Note[]} notesA notes
 * @param {Note[]} notesB other notes
 * @returns {number} difference
 */
export function noteCountDifference (notesA, notesB) {
  return Math.abs(notesA.length - notesB.length)
}

/**
 *
 * @param {Note[]} notesA notes
 * @param {Note[]} notesB other notes
 * @returns {number} difference
 */
export function durationDifference (notesA, notesB) {
  const durationA = d3.max(notesA, (d) => d.end)
  const durationB = d3.max(notesB, (d) => d.end)
  return Math.abs(durationA - durationB)
}

/**
 *
 * @param {Note[]} notesA notes
 * @param {Note[]} notesB other notes
 * @returns {number} distance
 */
export function pitchHistogramDistance (notesA, notesB) {
  const histA = d3.group(notesA, (d) => d.pitch)
  const histB = d3.group(notesB, (d) => d.pitch)
  const diff = d3
    .range(0, 128)
    .map((d) => (histA.get(d)?.length || 0) - (histB.get(d)?.length || 0))
  return Math.hypot(...diff)
}

/**
 *
 * @todo allow to re-use a typed array for all recordings to save time and space?
 * @param {Note[]} notesA notes
 * @param {Note[]} notesB other notes
 * @param {number} binSize bin size in seconds
 * @returns {number} distance
 */
export function timeBinningDistance (notesA, notesB, binSize) {
  let result = 0
  const byPitchA = d3.group(notesA, (d) => d.pitch)
  const byPitchB = d3.group(notesB, (d) => d.pitch)

  // Short cut: handle pitch differences first, in a faster way
  const onlyInA = d3.difference(byPitchA.keys(), byPitchB.keys())
  const onlyInB = d3.difference(byPitchB.keys(), byPitchA.keys())
  for (const pitch of onlyInA.values()) {
    // Distance = total note duration / total duration
    const notes = byPitchA.get(pitch)
    const duration = d3.max(notes, (d) => d.end)
    const totalNoteTime = d3.sum(notes, (d) => d.duration)
    result += totalNoteTime / duration
  }
  for (const pitch of onlyInB.values()) {
    const notes = byPitchB.get(pitch)
    const duration = d3.max(notes, (d) => d.end)
    const totalNoteTime = d3.sum(notes, (d) => d.duration)
    result += totalNoteTime / duration
  }

  // Handle common pitches with time bins
  const common = d3.intersection(byPitchA.keys(), byPitchB.keys())
  for (const pitch of common.values()) {
    // Distance = total note duration / total duration
    // TODO: weight beginning of note more than later parts?
    const notesA = byPitchA.get(pitch)
    const notesB = byPitchB.get(pitch)
    const duration = d3.max([...notesA, ...notesB], (d) => d.end)
    const binCount = Math.ceil(duration / binSize)
    const bins = new Uint8Array(binCount)
    // for notesA, set bin to 1
    for (const { start, end } of notesA) {
      const startBin = Math.round(start / binSize)
      const endBin = Math.round(end / binSize)
      for (let index = startBin; index <= endBin; ++index) {
        bins[index] = 1
      }
    }
    // for notesB, check if bins are already marked and compute error based on that
    for (const { start, end } of notesB) {
      const startBin = Math.round(start / binSize)
      const endBin = Math.round(end / binSize)
      for (let index = startBin; index <= endBin; ++index) {
        bins[index] = bins[index] > 0 ? 0 : 1
      }
    }
    result += d3.sum(bins) / binCount
  }

  // Normalize by number of pitches (each pitch already between 0 and 1)
  const pitchCount = d3.union(byPitchA.keys(), byPitchB.keys()).size
  return result / pitchCount
}

/**
 *
 * @todo allow to re-use a typed array for all recordings to save time and space?
 * @param {Note[]} notesA notes
 * @param {Note[]} notesB other notes
 * @param {number} binSize bin size in seconds
 * @returns {number} distance
 */
export function timeBinningDistance2 (notesA, notesB, binSize) {
  const totalDurationA = d3.max(notesA, (d) => d.end)
  const totalDurationB = d3.max(notesB, (d) => d.end)
  const durationOfShorter = Math.min(totalDurationA, totalDurationB)
  const binCount = Math.ceil(durationOfShorter / binSize)
  const bins = new Uint8Array(binCount)
  notesA = notesA.filter((d) => d.start < durationOfShorter)
  notesB = notesB.filter((d) => d.start < durationOfShorter)

  let result = 0
  const byPitchA = d3.group(notesA, (d) => d.pitch)
  const byPitchB = d3.group(notesB, (d) => d.pitch)

  // Short cut: handle pitch differences first, in a faster way
  const onlyInA = d3.difference(byPitchA.keys(), byPitchB.keys())
  const onlyInB = d3.difference(byPitchB.keys(), byPitchA.keys())
  for (const pitch of onlyInA.values()) {
    // Distance = total note duration / total duration
    const notes = byPitchA.get(pitch)
    const totalNoteTime = d3.sum(notes, (d) => d.duration)
    result += totalNoteTime / durationOfShorter
  }
  for (const pitch of onlyInB.values()) {
    const notes = byPitchB.get(pitch)
    const totalNoteTime = d3.sum(notes, (d) => d.duration)
    result += totalNoteTime / durationOfShorter
  }

  // Handle common pitches with time bins
  const common = d3.intersection(byPitchA.keys(), byPitchB.keys())
  for (const pitch of common.values()) {
    bins.fill(0)
    // notesA
    const notesA = byPitchA.get(pitch)
    for (const { start, end } of notesA) {
      const startBin = Math.round(start / binSize)
      const endBin = Math.min(binCount - 1, Math.round(end / binSize))
      for (let index = startBin; index <= endBin; ++index) {
        bins[index] = 1
      }
    }
    // notesB
    const notesB = byPitchB.get(pitch)
    for (const { start, end } of notesB) {
      const startBin = Math.round(start / binSize)
      const endBin = Math.min(binCount - 1, Math.round(end / binSize))
      for (let index = startBin; index <= endBin; ++index) {
        bins[index] = bins[index] > 0 ? 0 : 1
      }
    }
    result += d3.sum(bins) / binCount
  }

  // Normalize by number of pitches (each pitch already between 0 and 1)
  const pitchCount = d3.union(byPitchA.keys(), byPitchB.keys()).size
  return result / pitchCount
}
