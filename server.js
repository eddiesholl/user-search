var http = require('http');
var url = require('url');

var server = http.createServer(function (request, response) {
  var options = url.parse(request.url, true).query;
  response.writeHead(200, {"Content-Type": "application/json"});
  options.data = 'data'

  if (options.entity && options.field && options.term) {

    const searcher = require('./lib/searcher');
    const StreamRenderer = require('./lib/stream-renderer');

    const dataSources = {
        user: `${options.data}/users.json`,
        ticket: `${options.data}/tickets.json`,
        org: `${options.data}/organizations.json`
    };

    try {
        const resultStream = searcher(dataSources, options.entity, options.field.split(','), options.term);

        if (resultStream) {
            resultStream.pipe(new StreamRenderer(response));
        }
    } catch (e) {
        console.error(`Failed to execute search: ` + e)
        response.end(`Failed to execute search: ` + e)
    }
  } else {
    response.end("Missing parameters");
  }
});

server.listen(8000);
console.log("Server running at http://127.0.0.1:8000/");
