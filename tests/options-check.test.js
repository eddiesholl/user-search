/* eslint-env jest */

const optionsCheck = require('../lib/options-check');

test('empty is not valid', () => {
    const result = optionsCheck({});
    expect(result).toBe(false);
});

test('random is not valid', () => {
    const result = optionsCheck({ random: 'abc' });
    expect(result).toBe(false);
});

test('supplying all switches is valid', () => {
    const result = optionsCheck({ entity: 'entity', field: ['field1'], term: 'abc' });
    expect(result).toBe(true);
});
