const userRepository=require("../repositories/user.repository")
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
//TODO:mail functionality
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
module.exports={register,login}