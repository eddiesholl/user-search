/* eslint-env jest */

const searcher = require('../lib/searcher');
const getSink = require('./mocks').getSink;

const dataSources = {
    user: `data/small/users.json`,
    ticket: `data/small/tickets.json`,
    org: `data/small/organizations.json`
};

test('integration test: single match', (done) => {
    expect.assertions(2);

    const resultStream = searcher(dataSources, 'user', ['alias'], 'Coffey');
    const sink = getSink();
    sink.on('finish', () => {
        expect(sink.results.length).toBe(1);
        expect(sink.results[0]._id).toBe(1);
        done();
    });

    resultStream.pipe(sink);
});


test('integration test: no match', (done) => {
    expect.assertions(1);

    const resultStream = searcher(dataSources, 'user', ['alias'], 'Something crazy');
    const sink = getSink();
    sink.on('finish', () => {
        expect(sink.results).toBe(undefined);
        done();
    });

    resultStream.pipe(sink);
});

test('integration test: nested objects', (done) => {
    expect.assertions(5);

    const resultStream = searcher(dataSources, 'ticket', ['subject'], 'Korea');
    const sink = getSink();
    sink.on('finish', () => {
        expect(sink.results.length).toBe(1);
        const match = sink.results[0];
        expect(match.organization).toBeDefined();
        expect(match.organization._id).toBe(101);

        expect(match.assignee).toBeDefined();
        expect(match.assignee._id).toBe(2);

        done();
    });

    resultStream.pipe(sink);
});
