/* eslint-env jest */

const NestedObjectFilter = require('../lib/nested-object-filter');
const getStream = require('./mocks').getStream;

const nested = {
    _id: 123
};

describe('getEntityBy', () => {
    test('empty entity stream returns null', () => {
        expect.assertions(1);
        const sut = new NestedObjectFilter(getStream([]), 'foo');
        const result = sut.getEntityBy('123');
        return result.then(r => {
            expect(r).toBe(undefined);
        })
    });

    test('entity can be found', () => {
        expect.assertions(1);

        const sut = new NestedObjectFilter(getStream(JSON.stringify([nested])), 'foo');
        const result = sut.getEntityBy(nested._id);
        return result.then(r => {
            expect(r).toEqual(nested);
        })
    });

});
