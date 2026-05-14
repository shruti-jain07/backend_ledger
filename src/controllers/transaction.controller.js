
/**create a new transaction
 * 1.validate request
 * 2.validate idempotency key
 * 3.check account status
 * 4.derive sender balance from ledger
 * 5.create transaction(PENDING)
 * 6.create DEBIT ledger entry
 * 7.create CREDIT ledger entry
 * 8.mark TRANSACTION completed
 * 9.commit mongoDb session
 */
const transactionService=require("../services/transaction.service")
const {successResponse}=require("../utils/response")

const transfer=async(req,res,next)=>{
    try{
        const transaction=await transactionService.transfer(req.user.id,req.body)
        return successResponse(res,"Transaction Completed Successfully",transaction)
    }catch(err){
        return next(err)
    }
}
const initialFundsTransfer=async(req,res,next)=>{
    try{
        const transaction=await transactionService.initialFundsTransfer(req.user.id,req.body)
        return successResponse(res,"Initial funds transferred successfully",transaction)
    }catch(err){
        return next(err)
    }
}

const getTransactionHistory=async(req,res,next)=>{
    try{
        const page=Number(req.query.page)||1
        const limit=Number(req.query.limit)||10
        const transactions=await transactionService.getTransactionHistory(req.user.id,page,limit)
        return successResponse(res,"Transaction history fetched successfully",transactions)
    }catch(err){
        return next(err)
    }
}
module.exports={transfer,initialFundsTransfer,getTransactionHistory}
