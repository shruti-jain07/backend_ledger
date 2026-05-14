const userRepository=require("../repositories/user.repository")
const tokenBlacListRepository=require("../repositories/tokenBlackList.repository")
const AppError=require("../utils/AppError")
const ERROR_CODES=require("../constants/errorCodes")
const jwt=require("jsonwebtoken")
//generate jwt
const generateToken=(user)=>{
    return jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"3d"}
    )
}

//register
const register=async({name,email,password})=>{
    //checking existing user
    const existingUser=await userRepository.findUserByEmail(email)
    if(existingUser){
        throw new AppError(
            "User already exists",400,ERROR_CODES.BAD_REQUEST
        )
    }
    //Create User
    const user=await userRepository.createUser({
        name,email,password
    })
    //mail
    //generate token
    const token=generateToken(user)
    return {user,token}
}
//login
const login=async({email,password})=>{
    const user=await userRepository.findUserByEmail(email)
    if(!user){
        throw new AppError(
            "Invalid Credentials",401,ERROR_CODES.UNAUTHORIZED
        )
    }
    const isMatch=await user.comparePassword(password)
    if(!isMatch){
        throw new AppError("Invalid Credentials",401,ERROR_CODES.UNAUTHORIZED)
    }
    const token=generateToken(user)
    return {user,token}
}
//logout
const logout=async(token)=>{
    if(!token){
        throw new AppError("Authentication required",401,ERROR_CODES.UNAUTHORIZED)
    }
    //checking already blacklisted
    const blackListedToken=await tokenBlacListRepository.findToken(token)
    if(blackListedToken){
        throw new AppError("Token already invalidated",400,ERROR_CODES.BAD_REQUEST)
    }
    //blacklist token
    await tokenBlacListRepository.addToken(token)
    return
}
module.exports={register,login,logout}