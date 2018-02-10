var axios = require('axios');

class PwintyOrder {
    constructor(orderId) {
        this.apiUrl = ((process.env.PWINTY_ENV == 'live') ? 'https://api.pwinty.com/v2.6/Orders' : 'https://sandbox.pwinty.com/v2.6/Orders');
        this.orderId = orderId;
    }

    createOrder() {
        this.endpoint = "";
        return this.sendPwintyRequest({
            "recipientName": this.recipientName,
            "address1": this.address1,
            "address2": this.address2,
            "addressTownOrCity": this.addressTownOrCity,
            "stateOrCounty": this.stateOrCounty,
            "postalOrZipCode": this.postalOrZipCode,
            "destinationCountryCode": "US", // NOTE: Are we only doing US orders?
            "countryCode": "US",
            "preferredShippingMethod": "CHEAPEST", // Standard values are CHEAPEST or PRIORITY, contact us for more details.
            "payment": "InvoiceMe", // Payment option for order, either InvoiceMe or InvoiceRecipient
            "qualityLevel": "Standard", // Quality Level for order, either Pro or Standard
            "mobileTelephone": this.mobileTelephone
        });
    }

    addPhotos() {
        this.endpoint = ("/" + this.orderId + "/Photos");
    }

    sendPwintyRequest(requestObj) {
        const url = this.apiUrl + this.endpoint;

        return new Promise((resolve, reject) => {
            axios.post(url, requestObj, {
                headers: {
                    "X-Pwinty-MerchantId": process.env.PWINTY_MERCHANT_ID,
                    "X-Pwinty-REST-API-Key": process.env.PWINTY_API_KEY
                }
            }).then(response => {
                console.log('Pwinty Request sent');
                // store response, return instance of class
                this.response = response;
                resolve(this);
            }).catch(err => {
                reject(err);
            });
        });
    }
};

module.exports = PwintyOrder;