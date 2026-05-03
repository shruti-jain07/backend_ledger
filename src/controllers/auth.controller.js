const userService=require("../services/auth.service")
const {successResponse}=require("../utils/response")
const register=async(req,res,next)=>{
    try{
        const result=await userService.register(req.body)
        res.cookie("token",result.token,{
            httpOnly:true,
            secure:false
        })
        const {password,...safeUser}=result.user.toObject()
        return successResponse(res,"User Created",safeUser)
    }
    catch(err){
        next(err)
    }
}
//login
const login=async(req,res,next)=>{
    try{
        const result=await userService.login(req.body)
        res.cookie("token",result.token,{
            httpOnly:true,
            secure:false
        })
        const {password,...safeUser}=result.user.toObject()
        return successResponse(res,"Login Successful",safeUser)
    }catch(err){
        next(err)
    }
}
module.exports={register,login}