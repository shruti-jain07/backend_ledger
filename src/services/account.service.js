const ERROR_CODES = require("../constants/errorCodes")
const accountRepository=require("../repositories/account.repository")
const AppError = require("../utils/AppError")
const createAccount=async(userId)=>{
    return accountRepository.createAccount({
        user:userId
    })
}

const getAccounts=async(userId)=>{
    return accountRepository.getAccountByUser(userId)
}

const getAccountBalance=async(userId,accountId)=>{
    const account=await accountRepository.findAccountById(accountId)
    //account exists
    if(!account){
        throw new AppError("Account not found",404,ERROR_CODES.NOT_FOUND)
    }
    //ownership
    if(account.user.toString()!==userId.toString()){
        throw new AppError("Unauthorized account access",403,ERROR_CODES.FORBIDDEN)
    }
    //balance
    const balance=await account.getBalance()
    return {
        accountId:account._id,
        balance,
        currency:account.currency
    }
}
module.exports={createAccount,getAccounts,getAccountBalance}
