var express = require('express');
var router = express.Router();
var helpers = require('../helpers');
var mongoose = require('mongoose');

var StickerGroup = require('../node_modules/physical-telegram-stickers-models/mongo/StickerGroup');

router.get('/:stickerGroupUrlSlug', function(req, res) {
    mongoose.connect(mongodbUri)
    .then(() => {
        console.log("connected");
        // only finished sticker groups will have a url slug
        return StickerGroup.findOne({ urlSlug: req.params.stickerGroupUrlSlug})
            .populate({
                "path": "stickers"
            })
            .exec();
    })
    .then(stickerGroup => {
        console.log("Got sticker group: ", stickerGroup);
        var responseJson = helpers.getResponseJson(stickerGroup);
        console.log(responseJson);
        res.status(200).json(responseJson);
    })
    .catch(err => {
        console.log("Error starting: ", err);
        var responseJson = helpers.getResponseJson({}, "Could not retrieve sticker group");
        res.status(500).json(responseJson);
    });
});

module.exports = router;