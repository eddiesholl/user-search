"use strict";

const JSONStream = require('JSONStream');
const entityStream = require('./entity-stream');
const SearchFilter = require('./search-filter');
const NestedObjectFilter = require('./nested-object-filter');

const searcher = (sources, entity, fields, term /*, fieldsToExpand*/ ) => {
    console.log(`Searching for '${term || "<empty values>"}' on '${entity}' in fields: ${fields.join(', ')}`);
    const filterForTerm = new SearchFilter(fields, term);

    const source = sources[entity];

    if (source) {
        const getStreamFor = entityStream.getStreamFor(sources);
        const submitterNestedFilter = new NestedObjectFilter(getStreamFor('user'), 'submitter');
        const assigneeNestedFilter = new NestedObjectFilter(getStreamFor('user'), 'assignee');
        const orgNestedFilter = new NestedObjectFilter(getStreamFor('org'), 'organization');

        const readStream = getStreamFor(entity);

        return readStream
            .pipe(JSONStream.parse('*'))
            .pipe(filterForTerm)
            .pipe(submitterNestedFilter)
            .pipe(assigneeNestedFilter)
            .pipe(orgNestedFilter);

    } else {
        console.warn(`Could not find data source for entity ${entity} in sources: ${JSON.stringify(sources)}`);
    }
}

module.exports = searcher;
