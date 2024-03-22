const ResponseError = require("../errors/error-response");

module.exports = (scheme, req) => {
    const valid = scheme.validate(req);

    if(!valid.error) {
        return valid.value;    
    } else {
        const message = valid.error.toString();
        throw new ResponseError(400, message);
    }
}