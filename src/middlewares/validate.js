const AppError=require("../utils/AppError")
const ERROR_CODES=require("../constants/errorCodes")
const validate=(schema)=>{
    return(req,res,next)=>{
        const validationData={
            body:req.body,
            params:req.params,
            query:req.query
        }
        const{error}=schema.validate(validationData,{
            abortEarly:false,
            allowUnknown:true
        })
        if(error){
            const details=error.details.map((err)=>err.message)
            return next(
                new AppError(
                    "Validation failed",400,ERROR_CODES.VALIDATION_ERROR,details
                )
            )
        }
        next()
    }
}
module.exports=validate