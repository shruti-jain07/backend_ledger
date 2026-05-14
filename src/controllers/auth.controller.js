const authService=require("../services/auth.service")
const {successResponse}=require("../utils/response")
const register=async(req,res,next)=>{
    try{
        const result=await authService.register(req.body)
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
        const result=await authService.login(req.body)
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
//logout
const logout=async(req,res,next)=>{
    try{
        const token=req.cookies.token
        await authService.logout(token)
        res.clearCookie("token")
        return successResponse(res,"Logged out successfully")
    }catch(err){
        return next(err)
    }
}
module.exports={register,login,logout}