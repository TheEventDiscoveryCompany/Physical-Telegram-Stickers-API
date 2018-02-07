var IndexController = require('./controllers/IndexController');
var StickerGroupController = require('./controllers/StickerGroupController');
var StickerController = require('./controllers/StickerController');

module.exports = function(app) {
    // Index routes
    app.use('/', IndexController);
    // Sitcker group routes
    app.use('/stickerGroups', StickerGroupController);
    app.use('/stickers', StickerController);
};