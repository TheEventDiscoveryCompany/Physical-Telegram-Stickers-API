var express = require('express');
var router = express.Router();
var Helpers = require('../helpers/Helpers');
var NotFoundError = require('../helpers/NotFoundError');
var StickerGroup = require('../models/StickerGroup');


// Create sticker group
router.post('/', (req, res, next) => {
    var errors = {};

    // Verify parameters
    if (req.body.chatId == null) {
        errors.chatId = "Please provide a chat ID";
    }
    else if (isNaN(req.body.chatId)) {
        errors.chatId = "Please provide a numeric chat ID";
    }

    if (!Helpers.isObjectEmpty(errors)) {
        const responseJson = Helpers.getResponseJson(errors, "Invalid request data");
        res.status(400).json(responseJson);
    }
    else {
        // Create new sticker group
        const newStickerGroup = StickerGroup.query(req.knex).insert({ chatId: parseInt(req.body.chatId, 10) });

        newStickerGroup.then(stickerGroup => {
            console.log(stickerGroup);
            const responseJson = Helpers.getResponseJson(stickerGroup);
            res.status(200).json(responseJson);
        })
        .catch(err => {
            console.log(err);
            const responseJson = Helpers.getResponseJson({}, "Could not create sticker group");
            res.status(500).json(responseJson);
        });
    }
});


// Read sticker group
router.get('/:id', (req, res, next) => {
    const stickerGroup = StickerGroup.query(req.knex).where('id', req.params.id).first();

    stickerGroup.then(stickerGroup => {
        console.log("Got sticker group: ", stickerGroup);
        if (stickerGroup == null) {
            return Promise.reject(new NotFoundError("Could not find a sticker group with that id"));
        }

        var responseJson = Helpers.getResponseJson(stickerGroup);
        console.log(responseJson);
        res.status(200).json(responseJson);
    })
    .catch(err => {
        if (err instanceof NotFoundError) {
            var errorMessage = err.message;
            var statusCode = 404;
        }
        else {
            var errorMessage = "Could not retrieve sticker group";
            var statusCode = 500;
        }

        const responseJson = Helpers.getResponseJson({}, errorMessage);
        res.status(statusCode).json(responseJson);
    });
});

module.exports = router;