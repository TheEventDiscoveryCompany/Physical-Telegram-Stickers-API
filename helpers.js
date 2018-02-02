module.exports = {
    getResponseJson: function(data, errorMessage) {
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
};