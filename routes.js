var IndexController = require('./controllers/IndexController');
var StickerGroupController = require('./controllers/StickerGroupController');

module.exports = function(app) {
    // Index routes
    app.use('/', IndexController);
    // Sitcker group routes
    app.use('/stickerGroups', StickerGroupController);
};