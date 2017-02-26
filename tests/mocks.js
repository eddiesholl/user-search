const Readable = require('stream').Readable;

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

module.exports = {
    getStream
};
