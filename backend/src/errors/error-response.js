class ResponseError extends Error{
    
    constructor(status, meesage){
        super(meesage);
        this.status = status;
    }
}

module.exports = ResponseError;