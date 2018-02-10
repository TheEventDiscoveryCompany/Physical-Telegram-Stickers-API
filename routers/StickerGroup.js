const express = require('express'),
    router = express.Router(),
    Helpers = require('../helpers/Helpers'),
    RequestError = require('../helpers/RequestError'),
    StickerGroup = require('../models/StickerGroup'),
    OrderRouter = require('./Order'),
    NotFoundError = require('objection').Model.NotFoundError;


// CREATE sticker group
router.post('/', (req, res, next) => {
    var errors = {};

    // Verify parameters
    if (req.body.chatId == null) {
        errors.chatId = "Chat ID is required";
    }
    else if (isNaN(req.body.chatId)) {
        errors.chatId = "Chat ID must be numeric";
    }

    if (!Helpers.isObjectEmpty(errors)) {
        throw new RequestError(errors);
    }

    req.body.chatId = parseInt(req.body.chatId, 10);

    // Create new sticker group
    StickerGroup
        .query(req.knex)
        .insert(req.body)
        .then(stickerGroup => {
            const responseJson = Helpers.getResponseJson(stickerGroup);
            res.status(200).json(responseJson);
        })
        .catch(err => {
            next(err);
        });
});


// READ sticker group
router.get('/:stickerGroupId', (req, res, next) => {
    StickerGroup
        .query(req.knex)
        .where('id', req.params.stickerGroupId)
        .first()
        .then(stickerGroup => {
            if (stickerGroup == null) {
                throw new NotFoundError("Sticker Group not found");
            }
            const responseJson = Helpers.getResponseJson(stickerGroup);
            res.status(200).json(responseJson);
        })
        .catch(err => {
            next(err);
        });
});

// UPDATE sticker group
router.put('/:stickerGroupId', (req, res, next) => {
    var errors = {};

    // Create new sticker group
    StickerGroup
        .query(req.knex)
        .patchAndFetchById(req.params.stickerGroupId, req.body)
        .then(stickerGroup => {
            const responseJson = Helpers.getResponseJson(stickerGroup);
            res.status(200).json(responseJson);
        })
        .catch(err => {
            next(err);
        });
});

router.use('/:stickerGroupId/orders', OrderRouter);

module.exports = router;