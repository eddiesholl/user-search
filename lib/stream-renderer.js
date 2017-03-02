"use strict";

const Transform = require('stream').Transform;

class StreamRenderer extends Transform {
    constructor(response) {
        super({
            objectMode: true,
            transform: (chunk, encoding, callback) => {
                console.log('Search result: ' + JSON.stringify(chunk, 0, 4));
                response.write(JSON.stringify(chunk, 0, 4));
                callback();
            },
            flush: () => {
                response.end("");
            }
        });

        this.resultCount = 0;
    }
}
module.exports = StreamRenderer;
