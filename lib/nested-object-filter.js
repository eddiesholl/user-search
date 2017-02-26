"use strict";

const Transform = require("stream").Transform;
const R = require('ramda');
const streamLoader = require('./json-stream-loader');

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
            const enhancedItem = R.clone(chunk);

            this.getEntityBy(lookupId).then(r => {
                console.log('enhancing with ' + JSON.stringify(r))
                enhancedItem[this.fieldToExpand] = r;
                this.push(enhancedItem);
                callback();
            }).catch(e => {
                console.log(e)
            })
        } else {
            this.push(chunk);
            callback();

        }

    }

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
