const express = require('express'),
    router = express.Router(),
    Helpers = require('../helpers/Helpers'),
    RequestError = require('../helpers/RequestError'),
    StickerGroup = require('../models/StickerGroup'),
    Sticker = require('../models/Sticker'),
    NotFoundError = require('objection').Model.NotFoundError;


// CREATE sticker
router.post('/', (req, res, next) => {
    var errors = {};

    // Verify sticker group ID
    if (req.body.stickerGroupId == null) {
        errors.stickerGroupId = "Sticker group ID is required";
    }
    else if (isNaN(req.body.stickerGroupId)) {
        errors.stickerGroupId = "Sticker group ID must be numeric";
    }

    // Verify URL
    if (req.body.url == null) {
        errors.url = "Url is required";
    }

    if (!Helpers.isObjectEmpty(errors)) {
        throw new RequestError(errors);
    }

    req.body.stickerGroupId = parseInt(req.body.stickerGroupId, 10);

    // Check if sticker group with passed ID exists
    StickerGroup
        .query(req.knex)
        .where('id', req.body.stickerGroupId)
        .first()
        .then(stickerGroup => {
            if (stickerGroup == null) {
                throw new NotFoundError("Sticker Group not found");
            }
            // Create new sticker group
            return Sticker
                .query(req.knex)
                .insert(req.body);
        })
        .then(sticker => {
            const responseJson = Helpers.getResponseJson(sticker);
            res.status(200).json(responseJson);
        })
        .catch(err => {
            next(err);
        });
});


// READ sticker
router.get('/:id', (req, res, next) => {
    Sticker
        .query(req.knex)
        .where('id', req.params.id)
        .first()
        .then(sticker => {
            if (sticker == null) {
                throw new NotFoundError("Sticker not found");
            }
            const responseJson = Helpers.getResponseJson(sticker);
            res.status(200).json(responseJson);
        })
        .catch(err => {
            next(err);
        });
});

module.exports = router;