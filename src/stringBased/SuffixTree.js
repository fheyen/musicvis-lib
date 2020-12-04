// Based on https://github.com/eikes/suffixtree/blob/master/js/suffixtree.js

import { arrayContainsArray } from "../utils";

export default class SuffixTree {
    constructor(str) {
        this.string = str;
        this.node = new TreeNode();
        if (str && str.length) {
            for (let i = 0; i < str.length; i++) {
                this.node.addSuffix(str.slice(i));
            }
        }
    }

    toString() {
        return this.node.toString();
    }

    // toArray() {
    //     return this.node.toArray();
    // }

    toJson() {
        return JSON.stringify(this.node);
    }
}

class TreeNode {
    constructor() {
        this.value = "";
        this.leaves = [];
        this.nodes = [];
    }

    checkNodes(suf) {
        let node;
        for (let i = 0; i < this.nodes.length; i++) {
            node = this.nodes[i];
            if (node.value === suf[0]) {
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
                node.value = leaf[0];
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
        }
        if (!this.checkNodes(suf)) {
            this.checkLeaves(suf);
        }
    }

    getLongestRepeatedSubString() {
        let str = "";
        let temp = "";
        for (let i = 0; i < this.nodes.length; i++) {
            temp = this.nodes[i].getLongestRepeatedSubString();
            if (temp.length > str.length) {
                str = temp;
            }
        }
        return this.value + str;
    }

    toHTML() {
        let html = "<div class=node>";
        if (this.value.length) {
            html += "<h3>" + this.value + "</h3>";
        }
        if (this.nodes.length) {
            html += "<h4>nodes</h4><ul>";
            for (let i = 0; i < this.nodes.length; i++) {
                html += "<li>" + this.nodes[i].toHTML() + "</li>";
            }
            html += "</ul>";
        }
        if (this.leaves.length) {
            html += "<h4>leaves</h4><ul>";
            for (let i = 0; i < this.leaves.length; i++) {
                html += "<li>" + this.leaves[i] + "</li>";
            }
            html += "</ul>";
        }
        return html;
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

    // toArray() {
    //     let arr = [];
    //     if (this.value.length) {
    //         arr.push(this.value);
    //     } else {
    //         arr.push('root');
    //     }
    //     if (this.nodes.length) {
    //         for (let i = 0; i < this.nodes.length; i++) {
    //             arr.push(this.nodes[i].toArray());
    //         }
    //     }
    //     if (this.leaves.length) {
    //         for (let i = 0; i < this.leaves.length; i++) {
    //             str += `\n${ind}-L ` + this.leaves[i];
    //         }
    //     }
    //     return arr;
    // }
}
