/**
 * @module stringBased/NeedlemanWunsch
 */

/**
 * Needleman-Wunsch algorithm
 *
 * @see https://github.com/blievrouw/needleman-wunsch/blob/master/src/needleman_wunsch.js
 * @todo does not support cost matrix
 * @todo extend by matchMismathFunction
 */
class NeedlemanWunsch {
  /**
     * @param {string|Array} seq1 a string
     * @param {string|Array} seq2 another string
     * @param {number} matchScore score for matching characters
     * @param {number} mismatchPenalty penalty for mismatching characters
     * @param {number} gapPenalty penalty for a gap
     */
  constructor (seq1, seq2, matchScore = 1, mismatchPenalty = -1, gapPenalty = -1) {
    // Compared sequences
    this.seq1 = seq1
    this.seq2 = seq2
    // Scoring parameters
    this.matchScore = matchScore
    this.mismatchPenalty = mismatchPenalty
    this.gapPenalty = gapPenalty
    // Intermediate scores matrix (scores for [`insert`, `match`, `delete`] positions)
    this.I = []
    // Score matrix (best score out of intermediate scores)
    this.S = []
    // Traceback matrix (boolean values for [`insert`, `match`, `delete`] positions)
    this.T = []
    // Alignments
    this.finalAlignments = []

    // Calculate scores and tracebacks
    this.calcScoresAndTracebacks()
  }

  /**
     * Calculates (intermediate) scores and tracebacks using provided parameters
     */
  calcScoresAndTracebacks () {
    this.S.push([0])
    this.I.push([[null, null, null]])
    this.T.push([[false, false, false]])

    // Calculate scores and traceback on first row
    for (let i = 1; i < this.seq2.length + 1; i++) {
      this.S[0].push(this.S[0][this.S[0].length - 1] + this.gapPenalty)
      this.I[0].push([null, null, null])
      this.T[0].push([true, false, false])
    }

    // Generate other rows
    for (let i = 1; i < this.seq1.length + 1; i++) {
      this.S.push([this.S[i - 1][0] + this.gapPenalty])
      this.I.push([[null, null, null]])
      this.T.push([[false, false, true]])
      for (let j = 1; j < this.seq2.length + 1; j++) {
        const insert = this.S[i][j - 1] + this.gapPenalty
        const del = this.S[i - 1][j] + this.gapPenalty
        // similarity
        // TODO: support function here
        const simScore = this.seq1[i - 1] === this.seq2[j - 1] ? this.matchScore : this.mismatchPenalty
        const match = this.S[i - 1][j - 1] + simScore
        const intermediateScores = [insert, match, del]
        const score = Math.max(...intermediateScores)
        const tracebackTypeStatus = intermediateScores.map(entry => entry === score)
        this.S[i].push(score)
        this.I[i].push(intermediateScores)
        this.T[i].push(tracebackTypeStatus)
      }
    }

    // set best match score
    const lastRow = this.S[this.S.length - 1]
    this.score = lastRow[lastRow.length - 1]
  }

  /**
     * Finds next alignment locations (children) from a position in scoring matrix
     *
     * @param {number[]} pos m- Position in scoring matrix
     * @returns {object[]} children - Children positions and alignment types
     */
  alignmentChildren (pos) {
    const [i, j] = pos
    const children = []
    const tracebackTypeStatus = this.T[i][j]
    if (tracebackTypeStatus[0]) {
      // insert
      children.push({ pos: [i, j - 1], tracebackType: 0 })
    }
    if (tracebackTypeStatus[1]) {
      // match
      children.push({ pos: [i - 1, j - 1], tracebackType: 1 })
    }
    if (tracebackTypeStatus[2]) {
      // delete
      children.push({ pos: [i - 1, j], tracebackType: 2 })
    }
    return children
  }

  /**
     * Runs through scoring matrix from bottom-right to top-left using traceback values to create all optimal alignments
     *
     * @returns {object[]} e.g. [{ seq1: '-4321', seq2: '54321' }]
     */
  alignmentTraceback () {
    const finalAlignments = []
    const root = {
      next: null,
      pos: [this.seq1.length, this.seq2.length],
      alignment: {
        seq1: '',
        seq2: ''
        // score: this.score,
      }
    }
    let current, child, children, length, alignment, pos, t
    current = root
    while (current) {
      pos = current.pos
      alignment = current.alignment
      // Get children alignments
      children = this.alignmentChildren(current.pos)
      // Store completed alignments
      if (children.length === 0) {
        finalAlignments.push(alignment)
      }
      current = current.next
      for (t = 0, length = children.length; t < length; t++) {
        child = children[t]
        child.alignment = {
          // -1 refers to offset between  scoring matrix and the sequence
          seq1: alignment.seq1.concat(child.tracebackType === 0 ? '-' : this.seq1[pos[0] - 1]),
          seq2: alignment.seq2.concat(child.tracebackType === 2 ? '-' : this.seq2[pos[1] - 1])
          // TODO: add score for this alignment
          // score: alignment.score - this.S[pos[0]][pos[1]]
        }
        // Move down a layer
        child.next = current
        current = child
      }
    }
    return finalAlignments
  }
}

export default NeedlemanWunsch
