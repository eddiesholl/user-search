const fs = require('fs');

const getStreamFor = (dataSources) => {
    return (entityName) => {
        const path = dataSources[entityName];
        return fs.createReadStream(path);
    }
}

module.exports = {
    getStreamFor
}
