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

The term to search for in the field. If this flag is omitted, a match is made if the field is empty (an empty string, or an empty array).

### --data (-d)

By default, the tool operates on the JSON files stored in the `data` folder. If you would like to search alternate data files, you can provide the custom path with this option. The directory should contain the 3 JSON files.

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

## Simplicity

The use of native node.js streams and pipes works quite well in this solution. The solution is fairly compact, with good seperation of concerns. Each aspect of the solution can be broken into a self-contained chunk. The streams snap together well.

One of the challenges with the solution is keeping the operation async. One of the more complex pieces is the lazy loading of objects for nested object detection.

## Performance and large data sets

The performance tradeoffs made in the design of the app are based around the proposed data sets size of '10000+'. This scale is non-trivial, but is still not a crazy amount to be holding in memory, for example. Effort has been made to avoid too much impact from the size of the data, for example the [JSONStream](https://www.npmjs.com/package/json-stream) library is used to avoid loading the entire file at once. Only single entities are considered at a time for the initial term matching. But the nested object handling does load all objects (if and when required).

The set of nested objects is lazy loaded, so this data is only pulled in when the first nested object lookup is requested by a search match.

There is a known waste of memory storage in the nested object filters. They currently only process a single field, so there are actually 2 'user' nested object filters. These will hold duplicate user records. This would be an obvious future improvement.

The search matches are currently processed as a stream, and flushed to stdout as soon as they arrive. They are not held in memory, so they don't accumulate in memory.

To help scale the tool to larger data sets, here are some proposals:

* Don't pull nested objects for consideration into memory. Scan the input files containing nested objects each time a possible nested object replacementt is found. This will be slower, but have a smaller memory footprint.
* A small improvement to this is to load all the ids of nested objects first. This means re-scanning the file can be avoided ifthe nested object does not exist inthe file.

## Error handling and robustness

There is reasonable checking around failure cases and bad data. Simple errors like input files missing, are having invalid JSON content, provide clear fedback to the user.

The critical entry points for user data (like which field to search on) make sure that most possible bad states can't flow into the execution of the app. With more time, it would be useful to go through and provide more type checking and assertions on function parameters. This might be using something like typescript or tcomb, or also just plain old `assert` calls.

The command line interface is fairly strict about what it will allow through, so it's hard to provide bad options to the engine.

The async streams make it a little harder to stop on errors, but the main error hooks are in place, to prevent operation on bad states.
