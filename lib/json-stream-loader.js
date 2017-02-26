const JSONStream = require('JSONStream');

// Accumulate parsed JSON objects from an incoming stream
module.exports = (inputStream) => {
    return new Promise((resolve, reject) => {
        const parseStream = JSONStream.parse('*');
        const items = [];
        parseStream.on('data', (item) => {
            items.push(item);
        });
        parseStream.on('end', () => {
            resolve(items);
        });
        parseStream.on('error', (e) => {
            reject(e);
        });

        inputStream.pipe(parseStream);
    });
}
