require('dotenv').config();

const express = require('express'),
    app = express(),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    { Model } = require('objection'),
    Knex = require('knex'),
    knexfile = require('./knexfile'),
    Helpers = require('./helpers/Helpers'),
    RequestError = require('./helpers/RequestError');

const nodeEnv = process.env.NODE_ENV || 'development';

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));

app.use((req, res, next) => {
    // Function that parses the tenant id from path, header, query parameter etc.
    // and returns an instance of knex. You should cache the knex instances and
    // not create a new one for each query.
    req.knex = Knex(knexfile[nodeEnv]);
    next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded


// Include routes
require("./routes")(app);


// This handles all of the errors
// This should be the last call in the middleware stack in order to catch errors from everything
app.use(function(err, req, res, next) {
    // JSON parsing error
    if (err instanceof SyntaxError) {
        // error handling logic
        res.status(400).json(Helpers.getResponseJson({}, 'Invalid JSON format: ' + err.message));
    }
    // Thrown when there are errors validating request data
    else if (err instanceof RequestError) {
        res.status(400).json(Helpers.getResponseJson(err.data, 'Invalid request data'));
    }
    // Model validation errors
    else if (err instanceof Model.ValidationError) {
        let validationErrors = {};
        for (field in err.data) {
            // Take the first validation error
            validationErrors[field] = err.data[field][0].message;
        }
        res.status(400).json(Helpers.getResponseJson(validationErrors, 'Validation error'));
    }
    else if (err instanceof Model.NotFoundError) {
        res.status(400).json(Helpers.getResponseJson({}, 'Resource not found'));
    }
    // Fallback for all other errors
    else if (err instanceof Error) {
        console.log(err);
        res.status(400).json(Helpers.getResponseJson({}, 'An unknown error has occurred'));
    }
    else {
        next(err);
    }
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('🅱️erver listening on port ' + port);
});