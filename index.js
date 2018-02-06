require('dotenv').config();

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    Knex = require('knex'),
    knexfile = require('./knexfile');

const nodeEnv = process.env.NODE_ENV || 'development';

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

var port = process.env.PORT || 3000;


// Include routes
require("./routes")(app);

app.listen(port, function() {
    console.log('🅱️erver listening on port ' + port);
});