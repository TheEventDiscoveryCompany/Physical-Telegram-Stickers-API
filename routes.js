var IndexController = require('./controllers/IndexController');

module.exports = function(app) {
    // Index routes
    app.use('/', IndexController);
};