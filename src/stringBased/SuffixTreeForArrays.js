import { arrayShallowEquals } from "../utils/ArrayUtils";

// Adapted from https://github.com/eikes/suffixtree/blob/master/js/suffixtree.js

export default class SuffixTreeForArray {
    constructor(arr) {
        this.string = arr;
        this.node = new TreeNode();
        if (arr && arr.length) {
            for (let i = 0; i < arr.length; i++) {
                this.node.addSuffix(arr.slice(i));
            }
        }
    }

    toString() {
        return this.node.toString();
    }

    toJson() {
        return JSON.stringify(this.node);
    }
}

class TreeNode {
    constructor() {
        this.value = [];
        this.leaves = [];
        this.nodes = [];
    }

    checkNodes(suf) {
        let node;
        for (let i = 0; i < this.nodes.length; i++) {
            node = this.nodes[i];
            if (arrayShallowEquals(node.value, [suf[0]])) {
                node.addSuffix(suf.slice(1));
                return true;
            }
        }
        return false;
    }

    checkLeaves(suf) {
        let node, leaf;
        for (let i = 0; i < this.leaves.length; i++) {
            leaf = this.leaves[i];
            if (leaf[0] === suf[0]) {
                node = new TreeNode();
                node.value = [leaf[0]];
                node.addSuffix(suf.slice(1));
                node.addSuffix(leaf.slice(1));
                this.nodes.push(node);
                this.leaves.splice(i, 1);
                return;
            }
        }
        this.leaves.push(suf);
    }

    addSuffix(suf) {
        if (!suf.length) {
            return
        };
        if (!this.checkNodes(suf)) {
            this.checkLeaves(suf);
        }
    }

    getLongestRepeatedSubString() {
        let arr = [];
        let temp = [];
        for (let i = 0; i < this.nodes.length; i++) {
            temp = this.nodes[i].getLongestRepeatedSubString();
            if (temp.length > arr.length) {
                arr = temp;
            }
        }
        return this.value.concat(arr);
    }

    toString(indent = 1) {
        const ind = ' |'.repeat(indent);
        let str = '';
        if (this.value.length) {
            str += `-N '${this.value}'`;
        } else {
            str += 'root'
        }
        if (this.nodes.length) {
            for (let i = 0; i < this.nodes.length; i++) {
                str += `\n${ind}` + this.nodes[i].toString(indent + 1);
            }
        }
        if (this.leaves.length) {
            for (let i = 0; i < this.leaves.length; i++) {
                str += `\n${ind}-L ` + this.leaves[i];
            }
        }
        return str;
    }
}