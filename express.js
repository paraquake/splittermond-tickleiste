'use strict';
var path = require('path'),
  express = require('express'),
  API = require('json-api'),
  APIError = API.types.Error,
  mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/splittermond');
var models = {
  "Tickleiste": require('./mongoose-models/tickleiste'),
  "Participant": require('./mongoose-models/participant')
};

var adapter = new API.dbAdapters.Mongoose(models);
var registry = new API.ResourceTypeRegistry({
  participants: require('./res-desc/participants'),
  tickleiste: require('./res-desc/tickleisten')
}, {
  "dbAdapter": adapter
});

// Set up a front controller, passing it controllers that'll be used
// to handle requests for API resources and for the auto-generated docs.
var app = express();
var Front = new API.httpStrategies.Express(
  new API.controllers.API(registry),
  new API.controllers.Documentation(registry, {
    name: 'Splittermond Tickleiste API'
  })
);
var apiReqHandler = Front.apiRequest;

// Add generic/untransformed routes.
// To do this in a more scalable and configurable way, check out
// http://github.com/ethanresnick/express-simple-router. To protect some
// routes, check out http://github.com/ethanresnick/express-simple-firewall.
app.get("/", Front.docsRequest);
app.route("/:type(tickleisten|participants)")
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler);
app.route("/:type(tickleisten|participants)/:id")
  .get(apiReqHandler).patch(apiReqHandler).delete(apiReqHandler);
app.route("/:type(tickleisten|participants)/:id/relationships/:relationship")
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler).delete(apiReqHandler);

app.use(function(req, res, next) {
  Front.sendError(new APIError(404, undefined, 'Not Found'), req, res);
});

// Render the docs at /
// app.get("/", Front.docsRequest);
//
// // Add routes for basic list, read, create, update, delete operations
// app.get("/:type(tickleisten|participants)", Front.apiRequest);
// app.get("/:type(tickleiste|participant)/:id", Front.apiRequest);
// app.post("/:type(tickleiste|participant)", Front.apiRequest);
// app.patch("/:type(tickleiste|participant)/:id", Front.apiRequest);
// app.delete("/:type(tickleiste|participant)/:id", Front.apiRequest);
//
// // Add routes for adding to, removing from, or updating resource relationships
// app.post("/:type(tickleiste|participant)/:id/relationships/:relationship", Front.apiRequest);
// app.patch("/:type(tickleiste|participant)/:id/relationships/:relationship", Front.apiRequest);
// app.delete("/:type(tickleiste|participant)/:id/relationships/:relationship", Front.apiRequest);


app.listen(3000);
