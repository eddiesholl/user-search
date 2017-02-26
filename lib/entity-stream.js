const fs = require('fs');

// Curried function for retrieving a file stream from a map of data sources
const getStreamFor = (dataSources) => {
    return (entityName) => {
        const path = dataSources[entityName];
        return fs.createReadStream(path);
    }
}

module.exports = {
    getStreamFor
}
