"use strict";

const Transform = require("stream").Transform;
const termFinder = require('./term-finder').termFinder;

// Wrap the term-finder logic as a stream filter. Objects are only allowed through
// the filter if they match the desired term
const SearchFilter = class SearchFilter extends Transform {
    constructor(fields, term) {
        super({
            objectMode: true // Accept regular js objects as input/output
        });

        this.fields = fields;
        this.term = term;

        this.finder = termFinder(fields, term);
    }

    _transform(chunk, encoding, callback) {
        if (this.finder(chunk)) {
            this.push(chunk)
        }
        callback();
    }
}

module.exports = SearchFilter;
