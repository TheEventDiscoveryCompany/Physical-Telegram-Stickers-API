var IndexRouter = require('./routers/Index');
var StickerGroupRouter = require('./routers/StickerGroup');
var StickerRouter = require('./routers/Sticker');
var OrderRouter = require('./routers/Order');


module.exports = function(app) {
    // Index routes
    app.use('/', IndexRouter);
    // Sitcker group routes
    app.use('/stickerGroups', StickerGroupRouter);
    app.use('/stickers', StickerRouter);
    //app.use('/orders', OrderRouter);
};