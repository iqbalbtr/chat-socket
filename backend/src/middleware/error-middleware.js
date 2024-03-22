const { PrismaClientRustPanicError } = require("@prisma/client/runtime/library");
const ResponseError = require("../errors/error-response")

function errorMiddleware(err, req, res, next){
    
    if(!err){
        next();
    }

    console.log(err);

    if (err instanceof ResponseError){
        res.status(err.status).json({
            error: err.message
        });
    } else if (err instanceof PrismaClientRustPanicError){
        res.status(500).json({
            error: "Internal server error"
        });
    } else {
        res.status(500).json({
            error: "Internal server error"
        });
    }
}

module.exports = errorMiddleware;