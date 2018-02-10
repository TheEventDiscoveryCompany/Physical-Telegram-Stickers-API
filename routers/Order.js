const express = require('express'),
    router = express.Router({ mergeParams: true }),
    Helpers = require('../helpers/Helpers'),
    PwintyOrder = require('../helpers/PwintyOrder'),
    RequestError = require('../helpers/RequestError'),
    StickerGroup = require('../models/StickerGroup'),
    NotFoundError = require('objection').Model.NotFoundError;


// CREATE order
router.post('/', (req, res, next) => {
    if (req.params.stickerGroupId != null) {
        var errors = {};

        // Validate input
        if (req.body.fullName == null || req.body.fullName.length == 0) {
            errors.fullName = "Full name is required";
        }
        if (req.body.address1 == null || req.body.address1.length == 0) {
            errors.address1 = "Address Line 1 is required";
        }
        if (req.body.city == null || req.body.city.length == 0) {
            errors.city = "City is required";
        }
        if (req.body.state == null || req.body.state.length == 0) {
            errors.state = "State is required";
        }
        if (req.body.zipCode == null || req.body.zipCode.length == 0) {
            errors.zipCode = "Zip code is required";
        }
        if (req.body.mobilePhone == null || req.body.mobilePhone.length == 0) {
            errors.mobilePhone = "Mobile phone is required";
        }

        if (!Helpers.isObjectEmpty(errors)) {
            throw new RequestError(errors);
        }
    
        // Check for sticker group
        StickerGroup
        .query(req.knex)
        .eager('stickers')
        .where('id', req.params.stickerGroupId)
        .first()
        .then(stickerGroup => {
            if (stickerGroup == null) {
                throw new NotFoundError("Sticker Group not found");
            }

            // Create pwinty order
            const pwintyOrder = new PwintyOrder();
            pwintyOrder.recipientName = req.body.fullName;
            pwintyOrder.address1 = req.body.address1;
            pwintyOrder.address2 = req.body.address2 || '';
            pwintyOrder.addressTownOrCity = req.body.city;
            pwintyOrder.stateOrCounty = req.body.state;
            pwintyOrder.postalOrZipCode = req.body.zipCode;
            pwintyOrder.mobileTelephone = req.body.mobilePhone;
            return pwintyOrder.createOrder();
        }).then(pwintyOrder => {
            console.log("order created");
            const responseJson = Helpers.getResponseJson(pwintyOrder.response.data);
            res.status(200).json(responseJson);
        })
        .catch(err => {
            next(err);
        });
    }
});

module.exports = router;