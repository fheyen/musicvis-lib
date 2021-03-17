/* eslint-disable unicorn/prefer-spread */
import { arrayShallowEquals } from '../utils/ArrayUtils';

/**
 * @module stringBased/SuffixTree
 */

/**
 * Suffix tree, a tree that shows which subsequences are repeated
 *
 * @see https://github.com/eikes/suffixtree/blob/master/js/suffixtree.js
 */
class SuffixTree {
    /**
     * SuffixTree for strings or Arrays
     *
     * @param {string|Array} array string or Array to process
     */
    constructor(array) {
        // Split string to array
        if (typeof array === 'string') {
            array = array.split('');
        }
        this.node = new TreeNode();
        if (array && array.length > 0) {
            for (let index = 0; index < array.length; index++) {
                this.node.addSuffix(array.slice(index));
            }
        }
    }

    /**
     * Returns the longest repeated substring
     *
     * @returns {Array} longest repeated substring
     */
    getLongestRepeatedSubString() {
        return this.node.getLongestRepeatedSubString();
    }

    /**
     * Returns a readable string format of this tree
     *
     * @returns {string} string
     */
    toString() {
        return this.node.toString();
    }

    /**
     * Returns a JSON representation of this tree
     *
     * @returns {string} JSON
     */
    toJson() {
        return JSON.stringify(this.node);
    }
}

/**
 * TreeNode
 */
class TreeNode {
    /**
     *
     */
    constructor() {
        this.value = [];
        this.leaves = [];
        this.nodes = [];
    }

    /**
     * @param {string|Array} suf suffix
     * @returns {boolean} true if first entry of suf equals the value of a child
     */
    checkNodes(suf) {
        let node;
        for (let index = 0; index < this.nodes.length; index++) {
            node = this.nodes[index];
            if (arrayShallowEquals(node.value, [suf[0]])) {
                node.addSuffix(suf.slice(1));
                return true;
            }
        }
        return false;
    }

    /**
     * @param {string|Array} suf suffix
     */
    checkLeaves(suf) {
        let node, leaf;
        for (let index = 0; index < this.leaves.length; index++) {
            leaf = this.leaves[index];
            if (leaf[0] === suf[0]) {
                node = new TreeNode();
                node.value = [leaf[0]];
                node.addSuffix(suf.slice(1));
                node.addSuffix(leaf.slice(1));
                this.nodes.push(node);
                this.leaves.splice(index, 1);
                return;
            }
        }
        this.leaves.push(suf);
    }

    /**
     * @param {string|Array} suf suffix
     */
    addSuffix(suf) {
        if (suf.length === 0) {
            return;
        }
        if (!this.checkNodes(suf)) {
            this.checkLeaves(suf);
        }
    }

    /**
     * Returns the longest repeated substring
     *
     * @returns {Array} longest substring
     */
    getLongestRepeatedSubString() {
        let array = [];
        let temporary = [];
        for (let index = 0; index < this.nodes.length; index++) {
            temporary = this.nodes[index].getLongestRepeatedSubString();
            if (temporary.length > array.length) {
                array = temporary;
            }
        }
        return this.value.concat(array);
    }

    /**
     * Readable string representation of this node and its children
     *
     * @param {number} indent indentation
     * @returns {string} string representation
     */
    toString(indent = 1) {
        const ind = ' |'.repeat(indent);
        let string = '';
        string += this.value.length > 0 ? `-N '${this.value}'` : 'root';
        if (this.nodes.length > 0) {
            for (let index = 0; index < this.nodes.length; index++) {
                string += `\n${ind}${this.nodes[index].toString(indent + 1)}`;
            }
        }
        if (this.leaves.length > 0) {
            for (let index = 0; index < this.leaves.length; index++) {
                string += `\n${ind}-L ${this.leaves[index]}`;
            }
        }
        return string;
    }
}

export default SuffixTree;
