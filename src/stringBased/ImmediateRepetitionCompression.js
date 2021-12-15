import { arraySlicesEqual } from '../utils/ArrayUtils'

/**
 * Compresses a sequence by detecting immediately repeating subsequences
 * hierarchically. Optimal result but high performance complexity.
 *
 * @todo Link to observable demo
 * @param {Array} sequence array with immediately repeating subsequences
 * @returns {object} compressed hierarchy
 */
export function compress (sequence) {
  if (!sequence || sequence.length === 0) {
    return null
  }
  const longestReps = getImmediateRepetitions(sequence)
  if (longestReps === null) {
    return sequence
  }
  // Get repetition
  const { seq, rep, length: len, pos } = longestReps[0]

  // Get rest of sequence
  const preSeq = sequence.slice(0, pos)
  const postSeq = sequence.slice(pos + len * rep)

  // Recurse with longest repetition
  const repetition = compress(seq)
  // Recurse with left rest
  const pre = compress(preSeq)
  // Recurse with right rest
  const post = compress(postSeq)

  // Get current depth
  const depth = Math.max(
    pre?.depth ?? 0,
    repetition?.depth ?? 0 + 1,
    post?.depth ?? 0
  )

  // Get current length / width, i.e. compressed sequence length
  const length =
    (pre?.length ?? 0) +
    (repetition?.length ?? 0) +
    (post?.length ?? 0)

  return {
    pre,
    seq: repetition,
    rep,
    post: post,
    // Depth, leaves are 0, root is highest
    depth,
    // Compressed length
    length,
    // Include complete sequence of this node
    content: sequence
  }
}

/**
 * Finds all immediate repetitions in a given sequence.
 *
 * @param {Array} sequence array with immediately repeating subsequences
 * @returns {object[]} result
 */
export function getImmediateRepetitions (sequence = []) {
  const foundReps = []
  // For each length, look for a repetition that has that length
  for (let length = Math.floor(sequence.length / 2); length > 0; --length) {
    for (let pos = 0; pos < sequence.length - length; ++pos) {
      let numberOfReps = 0
      // eslint-disable-next-line no-constant-condition
      while (true) {
        // Let's see how often the slice at pos with the current length repeats immediately...
        const startPos = pos + (numberOfReps + 1) * length
        const found = arraySlicesEqual(
          sequence,
          sequence,
          length,
          pos,
          startPos
        )
        if (!found) {
          // No more repetitions found
          break
        } else {
          // Continue with searching for more
          numberOfReps++
        }
        // Did we find any repetitions?
        if (numberOfReps > 0) {
          const rep = numberOfReps + 1
          const seq = sequence.slice(pos, pos + length)
          foundReps.push({
            length,
            pos,
            rep,
            seq,
            totalLength: length * rep
          })
        }
      }
    }
  }
  if (foundReps.length > 0) {
    // Prioritize the ones that encompass most of the sequence, i.e., maximum length*rep
    return foundReps.sort((a, b) => {
      // If same total length, choose the one with more repetitions
      // Better 8*a than 4*aa
      return a.totalLength === b.totalLength
        ? b.rep - a.rep
        : b.totalLength - a.totalLength
    })
  }
  return null
}

/**
 * Restores the original array/sequence from the compressed hierarchy.
 *
 * @param {object} tree compressed hierarchy
 * @returns {Array} decompressed sequence
 */
export function decompress (tree) {
  if (!tree) {
    return []
  }
  if (tree.join) {
    return tree
  }
  const seq = decompress(tree.seq)
  const repetition = Array.from({ length: tree.rep }).map(() => seq)
  return [
    ...decompress(tree.pre),
    ...repetition.flat(),
    ...decompress(tree.post)
  ]
}

/**
 * Formats a compressed hierarchy into a readable string, for example:
 * "1222333222333" => "1 (2x (3x 2) (3x 3))"
 *
 * @param {object} tree compressed hierarchy
 * @param {string} separator separator
 * @returns {string} result
 */
export function toString (tree, separator = ' ') {
  if (!tree) {
    return ''
  }
  if (tree.join) {
    return tree.join(separator)
  }
  const seq = toString(tree.seq)
  const repetition = `(${tree.rep}x ${seq})`
  return [
    toString(tree.pre),
    repetition,
    toString(tree.post)
  ].join(separator).trim()
}

/**
 * Calculates the compression rate in [0, 1] for a result of compress().
 *
 * @param {object} compressed compressed hierachy
 * @returns {number} compression ratio
 * @throws {'Invalid hierarchy'} for invalid hierarchy
 */
export function compressionRate (compressed) {
  if (!compressed?.length || !compressed?.content?.length) {
    throw new Error('Invalid hierarchy')
  }
  return compressed.length / compressed.content.length
}
