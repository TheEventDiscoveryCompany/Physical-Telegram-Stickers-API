class RequestError extends Error {
    constructor(errors) {
        super(JSON.stringify(errors));
        this.data = errors;
    }
}

module.exports = RequestError;