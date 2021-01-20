/**
 * @module instruments/StringedFingering
 * @todo unfinished
 * @todo not tested
 */


/**
 * Represents a positon as {string, fret}
 */
class FretboardPosition {
    /**
     * @param {number} string string
     * @param {number} fret fret
     */
    constructor(string, fret) {
        this.string = string;
        this.fret = fret;
    }

    /**
     * Moves the positon by string and fret
     *
     * @param {number} string string
     * @param {number} fret fret
     */
    moveBy(string, fret) {
        this.string += string;
        this.fret += fret;
    }

    /**
     * Checks whether this position is valid
     *
     * @param {number} maxString number of strings -1
     * @param {number} maxFret number of frets
     * @returns {boolean} true iff valid
     */
    isValid(maxString, maxFret) {
        return this.string <= maxString && this.fret <= maxFret;
    }

    /**
     * Returns true iff this and another FretboardPosition are equal
     *
     * @param {FretboardPosition} otherFretboardPosition another FretboardPosition
     * @returns {boolean} true iff equal
     */
    equals(otherFretboardPosition) {
        return this.string === otherFretboardPosition.string &&
            this.fret === otherFretboardPosition.fret;
    }

    /**
     * String representation
     *
     * @returns {string} string representation
     */
    toString() {
        return `(${this.string}, ${this.fret})`;
    }

    /**
     * @returns {FretboardPosition} clone
     */
    clone() {
        return new FretboardPosition(this.string, this.fret);
    }

    /**
     * Returns (other - this), i.e. how you need to move this to get to other
     *
     * @param {FretboardPosition} otherFretboardPosition another FretboardPosition
     * @returns {object} difference in {string, fret}
     */
    difference(otherFretboardPosition) {
        return {
            string: otherFretboardPosition.string - this.string,
            fret: otherFretboardPosition.fret - this.fret,
        };
    }
}

/**
 * Represents a hand pose, for each of the 10 fingers with a FretboardPosition
 * or null, if the finger is not used
 */
class HandPose {
    /**
     *
     * @param {number[]} fingerPositions Indices 0-9: left thumb, 4 left fingers
     *      right thumb, 4 right fingers. Values: null for finger not pressed,
     *      {string:number, fret:number} for pressed fingers
     */
    constructor(fingerPositions = Array.from({length: 10}).fill(null)) {
        if (fingerPositions.length !== 10) {
            console.error('fingerPositions must have length 10!');
            fingerPositions = Array.from({length: 10}).fill(null);
        }
        this.fingerPositions = fingerPositions;
    }

    /**
     * Move a single finger
     *
     * @param {number} index finger index in [0, 9]
     * @param {FretboardPosition} newPosition new position
     */
    moveFingerTo(index, newPosition) {
        this.fingerPositions[index] = newPosition;
    }

    /**
     *
     * Lift a single finger
     *
     * @param {number} index finger index in [0, 9]
     */
    liftFinger(index) {
        this.fingerPositions[index] = null;
    }

    /**
     * Moves the finger by string and fret
     *
     * @param {number} index finger index in [0, 9]
     * @param {number} string string
     * @param {number} fret fret
     */
    moveFingerBy(index, string, fret) {
        const finger = this.fingerPositions[index];
        if (!finger) { return; }
        finger.moveBy(string, fret);
    }

    /**
     * Move the whole hand, fingers keep relative positions
     *
     * @param {number} string string
     * @param {number} fret fret
     */
    moveHandBy(string, fret) {
        for (const finger of this.fingerPositions) {
            if (finger !== null) {
                finger.moveBy(string, fret);
            }
        }
    }

    /**
     * Checks whether this position is valid
     *
     * @param {number} maxString max string
     * @param {number} maxFret max fret
     * @returns {boolean} true iff valid
     */
    isValid(maxString, maxFret) {
        for (const finger of this.fingerPositions) {
            if (finger !== null && !finger.isValid(maxString, maxFret)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Returns true iff this and another FretboardPosition are equal
     *
     * @param {HandPose} otherHandPose another hand pose
     * @returns {boolean} ture iff equal
     */
    euqals(otherHandPose) {
        const fingers1 = this.fingerPositions;
        const fingers2 = otherHandPose.fingerPositions;
        for (let index = 0; index < 10; index++) {
            if (fingers1[index] !== fingers2[index]) {
                if (fingers1[index] === null || fingers2[index] === null) {
                    return false;
                }
                if (!fingers1[index].equals(fingers2[index])) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * @returns {string} string representation
     */
    toString() {
        let string = 'HandPose ';
        const names = ['T', 1, 2, 3, 4, 'RT', 6, 7, 8, 9];
        for (let index = 0; index < 10; index++) {
            const finger = this.fingerPositions[index];
            if (finger !== null) {
                string = `${string} ${names[index]} ${finger.toString()}`;
            }
        }
        return string;
    }

    /**
     * @returns {HandPose} clone
     */
    clone() {
        return new HandPose(this.fingerPositions.map(d => d.clone()));
    }

    /**
     * Returns (other - this), i.e. how you need to move this to get to other
     *
     * @param {HandPose} otherHandPose another HandPose
     * @returns {object[]} difference
     */
    difference(otherHandPose) {
        const diff = [];
        const fingers1 = this.fingerPositions;
        const fingers2 = otherHandPose.fingerPositions;
        for (let index = 0; index < 10; index++) {
            if (fingers1[index] === null) {
                diff[index] = fingers2[index];
            } else if (fingers2[index] === null) {
                diff[index] = null;
            } else {
                diff[index] = fingers1[index].difference(fingers2[index]);
            }
        }
        return diff;
    }

    /**
     * Calculates movement costs
     *
     * @param {HandPose} otherHandPose another HandPose
     * @returns {number} cost
     */
    costOfMovement(otherHandPose) {
        // Naive: move every finger alone
        // TODO:

        // Cheaper to lift finger than to move anything
        // const costs = {
        //     lift: 1,
        //     moveFret: 2,
        //     press: 3,
        //     wholeHandMoveFret: 1,
        //     wholeHandMoveString: 1,
        // };

        if (this.equals(otherHandPose)) {
            return 0;
        }

        const diff = this.difference(otherHandPose);
        const fingers1 = this.fingerPositions;
        const fingers2 = otherHandPose.fingerPositions;

        // Easy cases

        // Lift all fingers
        if (diff.every(d => d === null)) {
            return 1;
        }
        // Lift some fingers, others stay the same
        let assumptionValid = true;
        for (let index = 0; index < 10; index++) {
            if (fingers2[index] !== null && !fingers1[index].equals(fingers2[index])) {
                assumptionValid = false;
                break;
            }
        }
        if (assumptionValid) {
            return 2;
        }
        // Slide whole hand, no string change
        if (diff.every(d => d !== null && d.string === 0)) {
            const fret = diff[0].fret;
            if (diff.every(d => d.fret === fret)) {
                return 1 + 0.1 * Math.abs(fret);
            }
        }
        // Put some fingers down, other stay the same
        assumptionValid = true;
        for (let index = 0; index < 10; index++) {
            if (fingers1[index] !== null && !fingers1[index].equals(fingers2[index])) {
                assumptionValid = false;
                break;
            }
        }
        if (assumptionValid) {
            return 2;
        }
        // TODO: more cases
        console.log('unknown pose change cost', this, otherHandPose, diff);

        return 5;
    }
}

// export function getHandPoseForChord(positions) {
//     // Sort by string DESCENDING and fret ASCENDING
//     positions.sort((a, b) => {
//         if (a.string !== b.string) {
//             return b.string - a.string;
//         }
//         return a.fret - b.fret;
//     });
//     console.log(positions.map(d => d.toString()));

//     const empty = new Array(10).fill(null);
//     if (positions.length === 0) {
//         return new HandPose();
//     }
//     if (notes.length === 1) {
//         empty[1] = new FretboardPosition(string, fret);
//         return new HandPose(empty);
//     }
//     if (notes.length === 1) {
//         empty[1] = new FretboardPosition(string, fret);
//         return new HandPose(empty);
//     }


// }


// /**
//  * @todo try beam search, i.e. look ahead into the tree of possible
//  * continuations, always with a certain number of branches and depth
//  * @param {Note[]} notes
//  */
// export function getOptimalHandPoseSequence(notes, branches, depth) {
//     // Segment track into chords?
//     // Pro: easier to solve?
//     // Contra:

//     // Get list of possible FretboardPosition for all notes

//     // Choose first pose

// }
