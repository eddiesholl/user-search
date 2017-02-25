const fs = require('fs');
const JSONStream = require('JSONStream');
const SearchFilter = require('./search-filter');

module.exports = (sources, entity, fields, term) => {
    console.log(`Searching for '${term}' on '${entity}' in fields: ${fields.join(', ')}`);
    const filterForTerm = new SearchFilter(fields, term);

    const source = sources[entity];

    if (source) {
        const readStream = fs.createReadStream('data/' + source);
        readStream
            .pipe(JSONStream.parse('*'))
            .pipe(filterForTerm)
            .pipe(JSONStream.stringify())
            .pipe(process.stdout);
    } else {
        console.warn(`Could not find data source for entity ${entity} in sources: ${JSON.stringify(sources)}`);
    }
};
