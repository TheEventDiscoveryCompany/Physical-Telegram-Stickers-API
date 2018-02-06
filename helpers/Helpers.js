class Helpers {
    static getResponseJson(data, errorMessage) {
        var responseJson;

        if (errorMessage != null) {
            responseJson = {
                status: "error",
                message: errorMessage,
                errors: data
            };
        }
        else {
            responseJson = {
                status: "success",
                data: data
            };
        }

        return responseJson;
    }

    static catchAsyncErrors(fn) {
        return (req, res, next) => {
            Promise.resolve(fn(req, res, next))
                .catch(next);
        };
    }

    static isObjectEmpty(obj) {
        return (Object.keys(obj).length === 0 && obj.constructor === Object);
    }
}

module.exports = Helpers;