import { minIndex } from 'd3'

/**
 * Idea: Like in hierarchical clustering, take the most similar pair out of the
 * set of all possible pairs repeatedly, until one array of items is empty.
 *
 * @template T1
 * @template T2
 * @param {T1[]} itemsA an array with items
 * @param {T2[]} itemsB an array with items
 * @param {function(T1, T2): number} distanceFunction distance function for two
 *      items, must be 0 for equal items and symmetric
 * @returns {Map<number,number>} with the indices of the matched items
 */
export function priorityMatching (itemsA, itemsB, distanceFunction) {
  // Build distance matrix
  const matrix = Array.from({ length: itemsA.length }).map(
    () => Array.from({ length: itemsB.length })
  )
  for (const [indexA, gtNote] of itemsA.entries()) {
    for (let indexB = indexA; indexB < itemsB.length; indexB++) {
      const dist = distanceFunction(gtNote, itemsB[indexB])
      matrix[indexA][indexB] = dist
      if (matrix[indexB] !== undefined) {
        matrix[indexB][indexA] = dist
      }
    }
  }
  // Compute matching pair by pair
  const matching = new Map()
  const numberOfMatches = Math.min(itemsA.length, itemsB.length)
  for (let match = 0; match < numberOfMatches; match++) {
    // Find most similar pair, i.e. matrix entry with smallest value
    const [a, b] = getMatrixMinPosition(matrix)
    matching.set(a, b)
    // Remove from matrix (just set to null)
    if (match >= numberOfMatches - 1) {
      break
    }
    for (let index = 0; index < itemsA.length; index++) {
      matrix[index][b] = null
    }
    for (let index = 0; index < itemsB.length; index++) {
      matrix[a][index] = null
    }
  }
  return matching
}

/**
 * First matches GT to rec notes via priorityMatching, then computes the error
 * for each GT note that has been matched using the same distance function.
 * The Map will be undefined for GT notes that have not been matched, they can
 * be considered missing in the recording.
 *
 * @param {Note[]} gtNotes ground truth notes
 * @param {Note[]} recNotes recorded notes
 * @param {function(Note,Note): number} distanceFunction distance function,
 *      taking two notes and returning the 'distance', i.e. how different they
 *      are. See balancedNoteDistance as example.
 * @returns {Map<Note,number>} a Map from GT note to its error
 */
export function errorFromPriorityMatching (gtNotes, recNotes, distanceFunction) {
  const matching = priorityMatching(gtNotes, recNotes, distanceFunction)
  // Map GT notes to errors
  const errors = new Map()
  for (const [gt, rec] of matching.entries()) {
    const gtNote = gtNotes[gt]
    const recNote = recNotes[rec]
    const error = distanceFunction(gtNote, recNote)
    errors.set(gtNote, error)
  }
  return errors
}

/**
 * Computes a distance (inverse similarity) of two notes, considering pitch,
 * chroma, start, duration, and channel.
 *
 * @param {Note} a a Note
 * @param {Note} b a Note
 * @returns {number} distance
 */
export function balancedNoteDistance (a, b) {
  let dist = 0
  // Pitch
  dist += Math.abs(a.pitch - b.pitch)
  // Chroma
  dist += Math.abs(a.pitch % 12 - b.pitch % 12)
  // Start time
  dist += Math.abs(a.start - b.start)
  // Duration
  dist += 0.5 * Math.abs(a.getDuration() - b.getDuration())
  // Channel
  dist += Math.abs(a.channel - b.channel)
  return dist
}

/**
 * Returns the row and colum indices of the minimum value of the given matrix
 *
 * @param {number[][]} matrix matrix
 * @returns {number[]} [rowIndex, columIndex] of the minimum value
 */
export function getMatrixMinPosition (matrix) {
  // Find most similar pair, i.e. matrix entry with smallest value
  const minPerRow = matrix.map(row => {
    const minInd = minIndex(row)
    return [
      minInd,
      row[minInd]
    ]
  })
  const minRowIndex = minIndex(minPerRow, d => d[1])
  const minColIndex = minPerRow[minRowIndex][0]
  return [minRowIndex, minColIndex]
}
