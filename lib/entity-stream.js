const fs = require('fs');

// Curried function for retrieving a file stream from a map of data sources
const getStreamFor = (dataSources) => {
    return (entityName) => {
        const path = dataSources[entityName];
        const stream = fs.createReadStream(path);
        stream.on('error', (e) => {
            console.error(`Failed to open input file '${path}' for streaming: ` + e);
        });
        return stream;
    }
}

module.exports = {
    getStreamFor
}
