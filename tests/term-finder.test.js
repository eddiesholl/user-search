/* eslint-env jest */

const termFinder = require('../lib/term-finder');

const hasNameFoo = {
    name: 'foo'
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
});
