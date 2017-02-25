"use strict";

const Transform = require("stream").Transform;
const fs = require('fs');
const R = require('ramda');

class NestedObjectFilter extends Transform {
    constructor(sources, fieldsToExpand) {
        super({
            objectMode: true // Accept regular js objects as input/output
        });

        this.store = {};
        Object.keys(sources).forEach((k) => {
            const path = sources[k];
            const content = fs.readFileSync(path);
            const parsedContent = JSON.parse(content);
            this.store[k] = R.indexBy(R.prop('_id'), parsedContent);
        });

        this.fieldsToExpand = fieldsToExpand;
    }

    _transform(chunk, encoding, callback) {
        Object.keys(chunk)
            .filter(fieldName => {
                return fieldName.slice(-3) === '_id';
            })
            .forEach(fieldNameWithSuffix => {
                const fieldNameClean = fieldNameWithSuffix.slice(0, -3);
                const expansionEntityTypeName = this.fieldsToExpand[fieldNameClean];

                if (expansionEntityTypeName) {
                    const expansionCache = this.store[expansionEntityTypeName];
                    const fieldValue = chunk[fieldNameWithSuffix];

                    const cacheResult = expansionCache[fieldValue];
                    chunk[fieldNameClean] = cacheResult;
                }
            });
        this.push(chunk)
        callback();
    }
}

module.exports = NestedObjectFilter;
