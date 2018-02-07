const express = require('express'),
    router = express.Router(),
    Helpers = require('../helpers/Helpers'),
    RequestError = require('../helpers/RequestError'),
    StickerGroup = require('../models/StickerGroup');


// CREATE sticker group
router.post('/', (req, res, next) => {
    var errors = {};

    // Verify parameters
    if (req.body.chatId == null) {
        throw new RequestError({ chatId: "Please provide a chat ID" });
    }
    else if (isNaN(req.body.chatId)) {
        throw new RequestError({ chatId: "Please provide a numeric chat ID" });
    }

    // Create new sticker group
    StickerGroup
        .query(req.knex)
        .insert({ chatId: parseInt(req.body.chatId, 10) })
        .then(stickerGroup => {
            console.log(stickerGroup);
            const responseJson = Helpers.getResponseJson(stickerGroup);
            res.status(200).json(responseJson);
        })
        .catch(err => {
            next(err);
        });
});


// READ sticker group
router.get('/:id', (req, res, next) => {
    StickerGroup
        .query(req.knex).where('id', req.params.id)
        .first()
        .throwIfNotFound()
        .then(stickerGroup => {
            const responseJson = Helpers.getResponseJson(stickerGroup);
            res.status(200).json(responseJson);
        })
        .catch(err => {
            next(err);
        });
});

// UPDATE sticker group
router.put('/:id', (req, res, next) => {
    var errors = {};

    // Create new sticker group
    StickerGroup
        .query(req.knex)
        .patchAndFetchById(req.params.id, req.body)
        .then(stickerGroup => {
            const responseJson = Helpers.getResponseJson(stickerGroup);
            res.status(200).json(responseJson);
        })
        .catch(err => {
            next(err);
        });
});

module.exports = router;