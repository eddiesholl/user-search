/* eslint-env jest */

const termFinder = require('../lib/term-finder');

const hasNameFoo = {
    name: 'foo',
    emptyString: '',
    emptyArray: [],
    nullField: null,
    arrayWithFoo: ['foo'],
    arrayWithBar: ['bar'],
    trueField: true,
    falseField: false,
    numberField: 1
};

describe('findTermInFields', () => {
    test('can find foo in name', () => {
        const result = termFinder.findTermInFields(hasNameFoo, ['name'], 'foo')
        expect(result).toBe(true);
    });
});

describe('findTermInField', () => {
    test('can find foo in name', () => {
        const result = termFinder.findTermInField(hasNameFoo, 'name', 'foo')
        expect(result).toBe(true);
    });

    test('does not find bar in name', () => {
        const result = termFinder.findTermInField(hasNameFoo, 'name', 'bar')
        expect(result).toBe(false);
    });

    test('can match an empty string field', () => {
        const result = termFinder.findTermInField(hasNameFoo, 'emptyString', undefined)
        expect(result).toBe(true);
    });

    test('can match an empty array field', () => {
        const result = termFinder.findTermInField(hasNameFoo, 'emptyArray', undefined)
        expect(result).toBe(true);
    });

    test('does not match a null field', () => {
        const result = termFinder.findTermInField(hasNameFoo, 'nullField', undefined)
        expect(result).toBe(false);
    });

    test('can match on array field items', () => {
        const result = termFinder.findTermInField(hasNameFoo, 'arrayWithFoo', 'foo')
        expect(result).toBe(true);
    });

    test('does not match on array field items', () => {
        const result = termFinder.findTermInField(hasNameFoo, 'arrayWithBar', 'foo')
        expect(result).toBe(false);
    });

    test('can match on boolean field items', () => {
        const result = termFinder.findTermInField(hasNameFoo, 'trueField', 'true')
        expect(result).toBe(true);
    });

    test('can not match on boolean field items', () => {
        const result = termFinder.findTermInField(hasNameFoo, 'falseField', 'true')
        expect(result).toBe(false);
    });

    test('can match on number field items', () => {
        const result = termFinder.findTermInField(hasNameFoo, 'numberField', '1')
        expect(result).toBe(true);
    });

    test('can not match on number field items', () => {
        const result = termFinder.findTermInField(hasNameFoo, 'numberField', '2')
        expect(result).toBe(false);
    });

});
