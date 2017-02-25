const cmdSwitches = [
    { name: 'entity', alias: 'e', type: String, defaultValue: 'user', description: "The name of the entity ('user', 'ticket' or 'org')" },
    { name: 'field', alias: 'f', type: String, defaultValue: 'name', multiple: true, description: "The name of the field on the entity to search" },
    { name: 'term', alias: 't', type: String, description: 'The term to search for' },
    { name: 'verbose', alias: 'v', type: Boolean },
    { name: 'help', alias: 'h', type: Boolean }
];
const options = require('command-line-args')(cmdSwitches);
const getUsage = require('command-line-usage');
const usageSections = [
    {
        header: 'user-search',
        content: 'Search fields in structured user data for a term.'
    },
    {
        header: 'Options',
        optionList: cmdSwitches
    }
];


console.log('Running user-search with options: ' + JSON.stringify(options));
const optionsCheck = require('./lib/options-check');
const isValidOptions = optionsCheck(options);

if (options.help || !isValidOptions) {
    console.log(getUsage(usageSections));
    process.exit(1);
} else {
    const searcher = require('./lib/searcher');
    const StreamRenderer = require('./lib/stream-renderer');

    const dataSources = {
        user: 'data/users.json',
        ticket: 'data/tickets.json',
        org: 'data/organizations.json'
    };

    const fieldsToExpand = {
        submitter: "user",
        assignee: "user",
        organization: "org"
    }

    const resultStream = searcher(dataSources, options.entity, options.field, options.term, fieldsToExpand);

    if (resultStream) {
        resultStream.pipe(new StreamRenderer());
    }
}
