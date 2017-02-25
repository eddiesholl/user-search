const fs = require('fs');
const JSONStream = require('JSONStream');
const SearchFilter = require('./search-filter');

module.exports = (sources, entity, fields, term) => {
    console.log(`Searching for '${term}' on '${entity}' in fields: ${fields.join(', ')}`);
    const filterForTerm = new SearchFilter(fields, term);

    const readStream = fs.createReadStream('data/users.json');
    readStream
        .pipe(JSONStream.parse('*'))
        .pipe(filterForTerm)
        .pipe(JSONStream.stringify())
        .pipe(process.stdout);
};
