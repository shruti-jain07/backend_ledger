const jwt=require("jsonwebtoken")
const AppError=require("../utils/AppError")
const ERROR_CODES=require("../constants/errorCodes")
const userRepository=require("../repositories/user.repository")
const tokenBlackListRepository=require("../repositories/tokenBlackList.repository")

const authMiddleware=async(req,res,next)=>{
    let token
    try{
        token=req.cookies.token
        if(!token){
            throw new AppError("Authentication Required",401,ERROR_CODES.UNAUTHORIZED)
        }
        const blackListedToken=await tokenBlackListRepository.findToken(token)
        if(blackListedToken){
            throw new AppError("Token is invalidated,please login again",401,ERROR_CODES.UNAUTHORIZED)
        }
        let decoded
        try{
            decoded=jwt.verify(token,process.env.JWT_SECRET)
        }catch(err){
            return next(
                new AppError("Invalid token or expired token",401,ERROR_CODES.UNAUTHORIZED)
            )
        }
        const user=await userRepository.findUserById(decoded.id)
        if(!user){
            throw new AppError("User not found",401,ERROR_CODES.UNAUTHORIZED)
        }
        req.user={
            id:user._id,email:user.email
        }
        
        return next()
    }catch(err){
        return next(err)
    }
}

const authSystemUserMiddleware=async(req,res,next)=>{
    let token
    try{
        token=req.cookies.token
        if(!token){
            throw new AppError("Authentication Required",401,ERROR_CODES.UNAUTHORIZED)
        }
        const blackListedToken=await tokenBlackListRepository.findToken(token)
        if(blackListedToken){
            throw new AppError("Token is invalidated,please login again",401,ERROR_CODES.UNAUTHORIZED)
        }
        let decoded
        try{
            decoded=jwt.verify(token,process.env.JWT_SECRET)
        }catch(err){
            return next(
             new AppError("Invalid token or expired token",401,ERROR_CODES.UNAUTHORIZED)
            )
        }
        const user=await userRepository.findSystemUserById(decoded.id)
       if(!user){
    throw new AppError("User not found",401,ERROR_CODES.UNAUTHORIZED)
}

if(!user.systemUser){
    throw new AppError("Forbidden Access",403,ERROR_CODES.FORBIDDEN)
}
        req.user={
            id:user._id,email:user.email
        }
        return next()
    }catch(err){
        return next(err)
    }
}

module.exports={authMiddleware,authSystemUserMiddleware}