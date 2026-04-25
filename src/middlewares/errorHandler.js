const {errorResponse}=require("../utils/response")
const logger=require("../utils/logger")

const errorHandler=(err,req,res,next)=>{
    logger.error({
        message:err.message,
        code:err.code,
        stack:err.stack,
        path:req.originalUrl,
        method:req.method
    })
    return errorResponse(
        res,
        err.message||"Internal server Error",
        err.code||[],
        err.details||[],
        err.statusCode||500
    )
}
module.exports=errorHandler