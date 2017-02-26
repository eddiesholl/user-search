const Readable = require('stream').Readable;
const Writable = require('stream').Writable;

// Useful for providing a stream of input to a test subject
const getStream = (inputLines) => {
    var i = 0;
    return new Readable({
        objectMode: true,
        read() {
            if (i === inputLines.length) {
                this.push(null);
            } else {
                this.push(inputLines[i++]);
            }
        }
    });
};

// Useful for capturing all items in a stream during a test
const getSink = () => {
    return new Writable({
        objectMode: true,
        write(chunk, encoding, callback) {
            if (this.results) {
                this.results.push(chunk);
            } else {
                this.results = [chunk];
            }
            callback();
        }
    });
};

module.exports = {
    getStream,
    getSink
};
