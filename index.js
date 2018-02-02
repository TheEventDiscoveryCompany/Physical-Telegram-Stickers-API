require('dotenv').config();

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

//Mongoose stuff
mongoose.Promise = global.Promise;

if (process.env.MONGODB_URI === undefined) {
    // Server with no authentication
    global.mongodbUri = "mongodb://";
    mongodbUri += process.env.MONGODB_HOST + ":" +
    process.env.MONGODB_PORT + "/" +
    process.env.MONGODB_DATABASE;
}
else {
    // URI set on production/staging
    global.mongodbUri = process.env.MONGODB_URI;
}
    
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