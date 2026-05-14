const TokenBlackList=require("../models/blackList.model")
//add token to blacklist
const addToken=(token)=>{
    return TokenBlackList.create({token})
}
//find blacklisted token
const findToken=(token)=>{
    return TokenBlackList.findOne({token})
}
module.exports={addToken,findToken}