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
