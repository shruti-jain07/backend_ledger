const accountService=require("../services/account.service")
const {successResponse}=require("../utils/response")

const createAccount=async(req,res,next)=>{
    try{
        const account=await accountService.createAccount(req.user.id)
        return successResponse(res,"Account Created",account)
    }catch(err){
        return next(err)
    }
}
const getAccounts=async(req,res,next)=>{
    try{
        const accounts=await accountService.getAccounts(req.user.id)
        return successResponse(res,"Accounts fetched",accounts)
    }catch(err){
        return next(err)
    }
}

const getAccountBalance=async(req,res,next)=>{
    try{
        const result=await accountService.getAccountBalance(req.user.id,req.params.accountId)
        return successResponse(res,"Balance Fetched Successfully",result)
    }catch(err){
        return next(err)
    }
}
module.exports={
    createAccount,getAccounts,getAccountBalance
}