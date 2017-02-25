"use strict";

const Transform = require('stream').Transform;

class StreamRenderer extends Transform {
    constructor() {
        super({
            objectMode: true,
            transform: (chunk, encoding, callback) => {
                console.log(chunk);
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
