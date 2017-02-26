/* eslint-env jest */

const sut = require('../lib/json-stream-loader');
const getStream = require('./mocks').getStream;


test('empty stream is valid', () => {
    expect.assertions(1);
    const result = sut(getStream([]));
    return result.then(r => {
        expect(r).toEqual([]);
    })
});

test('invalid json throws', () => {
    expect.assertions(1);
    const result = sut(getStream(['abc']));
    return result.catch(e => {
        expect(e).toEqual(new Error('Invalid JSON (Unexpected "a" at position 0 in state STOP)'));
    });
});

test('simple valid json', () => {
    expect.assertions(1);
    const result = sut(getStream(['{', '}']));
    return result.then(r => {
        expect(r).toEqual([]);
    })
});

test('simple valid array', () => {
    expect.assertions(1);
    const result = sut(getStream(['[', "{}", ']']));
    return result.then(r => {
        expect(r).toEqual([{}]);
    })
});

test('array of items', () => {
    expect.assertions(1);
    const result = sut(getStream(['[', '{ "a": "b"},', '{ "c": "d"}', ']']));
    return result.then(r => {
        expect(r).toEqual([{ a: 'b' }, { c: 'd' }]);
    })
});
