const AppError=require("../utils/AppError")
const validate=(schema)=>{
    return(req,res,next)=>{
        const{error}=schema.validate(req.body,{
            abortEarly:false
        })
        if(error){
            const details=error.details.map((err)=>err.message)
            return next(
                new AppError(
                    "Validation failed",400,"VALIDATION_ERROR",details
                )
            )
        }
        next()
    }
}
module.exports=validate