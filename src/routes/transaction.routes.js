const express=require("express")
const router=express.Router()

const transactionController=require("../controllers/transaction.controller")
const validate=require("../middlewares/validate")
const {transactionSchema}=require("../validators/transaction.validator")
const {authMiddleware,authSystemUserMiddleware}=require("../middlewares/auth.middleware")
/**
 * Create a new transaction
 * POST /api/transactions/transfer 
 * 
*/
router.post("/transfer",authMiddleware,validate(transactionSchema),transactionController.transfer)
/**
 * Create initial funds transaction from system user
 * POST /api/transactions/system/initial-funds
 * 
*/
router.post("/system/initial-funds",authSystemUserMiddleware,transactionController.initialFundsTransfer)


module.exports=router