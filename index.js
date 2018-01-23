require('dotenv').config();

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

//Mongoose stuff
mongoose.Promise = global.Promise;
var Chat = require('./models/mongo/Chat'),
    StickerGroup = require('./models/mongo/StickerGroup'),
    Sticker = require('./models/mongo/Sticker');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

var port = process.env.PORT || 3000;

if (process.env.MONGODB_URI === undefined) {
    // Server with no authentication
    var mongodbUri = "mongodb://";
    mongodbUri += process.env.MONGODB_HOST + ":" +
    process.env.MONGODB_PORT + "/" +
    process.env.MONGODB_DATABASE;
}
else {
    // URI set on production/staging
    var mongodbUri = process.env.MONGODB_URI;
}

app.get('/', function(req, res) {
    res.send("Welcome friend ( ͡° ͜ʖ ͡°)");
});


app.listen(port, function() {
    console.log('🅱️erver listening on port ' + port);
});