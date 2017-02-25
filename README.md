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
node index.js --field user.description --term fred
```

You can get a list of all available switches with
```
node index.js -h
```

## Switches

### field

This switch is expecting an 'object notation' to specify the field you would like to search. Some examples are:

 * user.alias
 * ticket.subject
 * organization.domain_names

### term

The term to search for in the field.
