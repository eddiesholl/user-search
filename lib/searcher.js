"use strict";

const fs = require('fs');
const JSONStream = require('JSONStream');
const SearchFilter = require('./search-filter');

const searcher = (sources, entity, fields, term) => {
    console.log(`Searching for '${term}' on '${entity}' in fields: ${fields.join(', ')}`);
    const filterForTerm = new SearchFilter(fields, term);

    const source = sources[entity];

    if (source) {
        const readStream = fs.createReadStream('data/' + source);
        return readStream
            .pipe(JSONStream.parse('*'))
            .pipe(filterForTerm)
    } else {
        console.warn(`Could not find data source for entity ${entity} in sources: ${JSON.stringify(sources)}`);
    }
}

module.exports = searcher;
