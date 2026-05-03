const User=require("../models/user.model")
const createUser=(data)=>{
    return User.create(data)
}
const findUserByEmail=(email)=>{
    return User.findOne({email}).select("+password")
}
const findUserById=(id)=>{
    return User.findById(id)
}
const updatePassword=async(userId,newPassword)=>{
    const user=await User.findById(userId)
    user.password=newPassword
    return user.save()
}
module.exports={
    createUser,findUserById,findUserByEmail,updatePassword
}