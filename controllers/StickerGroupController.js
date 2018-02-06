var express = require('express');
var router = express.Router();
var Helpers = require('../helpers/Helpers');
var NotFoundError = require('../helpers/NotFoundError');
var StickerGroup = require('../models/StickerGroup');

router.get('/:urlSlug', (req, res, next) => {
    const stickerGroup = StickerGroup
        .query(req.knex)
        .where('urlSlug', req.params.urlSlug)
        .first();

    stickerGroup.then(stickerGroup => {
        console.log("Got sticker group: ", stickerGroup);
        if (stickerGroup == null) {
            return Promise.reject(new NotFoundError("Could not find a sticker group with that url slug"));
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