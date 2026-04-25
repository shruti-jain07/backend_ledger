const {errorResponse}=require("../utils/response")
const errorHandler=(err,req,res,next)=>{
    console.error("Error:",err)
    return errorResponse(
        res,
        err.message||"Internal server Error",
        err.code||[],
        err.details||[],
        err.statusCode||500
    )
}
module.exports=errorHandler