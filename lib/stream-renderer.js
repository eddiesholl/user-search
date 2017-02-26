"use strict";

const Transform = require('stream').Transform;

class StreamRenderer extends Transform {
    constructor() {
        super({
            objectMode: true,
            transform: (chunk, encoding, callback) => {
                console.log('Search result: ' + JSON.stringify(chunk, 0, 4));
                this.resultCount++;
                callback();
            },
            flush: () => {
                console.log(`Rendered ${this.resultCount} results in total.`);
            }
        });

        this.resultCount = 0;
    }
}
module.exports = StreamRenderer;
