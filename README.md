# Introduction

This is a simple command line utility for searching well-formed and structured user data.

# Requirements

The app uses node and the npm ecosystem. To use it, first you will need a a recent version of [node and npm](https://docs.npmjs.com/getting-started/installing-node) installed.

# Usage

To prepare the app for running:
```
npm install
```

This takes care of installing all dependencies via the npm package manager.

To actually run the tool, use a command like:
```
node index.js --entity user --field description --term fred
node index.js -e user -f description -t fred

```

You can get a list of all available switches with
```
node index.js -h
```

## Switches

### --entity (-e)

The entity type you would like to search. Currently supported entities:

 * user
 * ticket
 * org

### --field (-f)

The field on the specified entity to search in. For example:

 * alias
 * domain_names
 * priority

### --term (-t)

The term to search for in the field.

# Tests

You can invoke the unit tests for the app via:
```
npm test
```
These tests use the [jest](https://facebook.github.io/jest/docs/getting-started.html) framework.

# Requirements and future enhancements

The requirements provided for this task clearly outline a few key aspcets that are important to consider. These are discussed here in more detail.

## Extensibility
The implementation here is fairly open to easy extensibility in most places. Very little of the specifics of the 'user search' domain is included in the lower level code. The relationships between objects, for example, are expressed up in the top 1 or 2 levels of function calls. This could be improved further by extracting some of the domain specific logic up out of the `searcher` function.

Other available extension points:

 * Paths to objects within the json input can be specified in the call to JSONStream.parse(). Right now it extracts all objects.
 * The way that nested objects are attached is all contained in the `nested-object-filter` class. Right now it assumes fields use an `_id` suffix.
 * The output is generated using a `Transform` applied to a stream of results. This is the `stream-renderer` class. It would be trivial to swap in a new renderer for differently formatted output.

## Test coverage and testability

I have provided a basic level of test coverage across most of the logic in this app. The tests focus on the moving parts rather than validating the specific domain 'ie user objects'.

There are also some end to end integration tests that make use sample data to run a full search.

Apart from the integration tests, the tests don't require interacting with the real world. It is only in the outer layer of the app that we actually interact with the file stream. It is not entirely pure, but it is very close.

## Performance and large data sets

## Error handling and robustness
