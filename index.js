const cmdSwitches = [
    { name: 'field', alias: 'f', type: String, defaultValue: 'user.name', multiple: true, description: "Dot seperated path to the search field(s) ie 'user.description'" },
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

if (options.help) {
    console.log(getUsage(usageSections));
}
