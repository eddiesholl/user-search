"use strict";

const Transform = require("stream").Transform;
const R = require('ramda');
const streamLoader = require('./json-stream-loader');

/*
If a streamed object contains a field with a certain name, look for an object
by id in a stream of potential nested objects.
The nested object stream is evaluated lazily so it is only loaded if required.
*/
class NestedObjectFilter extends Transform {
    constructor(entityStream, fieldToExpand) {
        super({
            objectMode: true // Accept regular js objects as input/output
        });

        this.fieldToExpand = fieldToExpand;
        this.fieldWithId = `${fieldToExpand}_id`;

        this.entityStream = entityStream;
    }

    _transform(chunk, encoding, callback) {
        const lookupId = chunk[this.fieldWithId];
        if (lookupId) {
            // This incoming object refers to a nested object that can be attached
            const enhancedItem = R.clone(chunk);

            this.getEntityBy(lookupId).then(r => {
                enhancedItem[this.fieldToExpand] = r;
                this.push(enhancedItem);
                callback();
            }).catch(e => {
                console.error(e);
            })
        } else {
            this.push(chunk);
            callback();
        }
    }

    // Traverse the input stream the first time a lookup is requested, and then
    // hold the results for future lookups
    getEntityBy(id) {
        if (!this.entityLookup) {
            this.entityLookup = new Promise((resolve, reject) => {
                streamLoader(this.entityStream).then(entities => {
                    resolve(R.indexBy(R.prop('_id'), entities));
                }).catch(reject);
            })
        }

        return this.entityLookup.then(el => {
            return el[id];
        });
    }
}

module.exports = NestedObjectFilter;
