const express=require("express")
const router=express.Router()

const accountController=require("../controllers/account.controller")
const {authMiddleware}=require("../middlewares/auth.middleware")
//create account
router.post("/",authMiddleware,accountController.createAccount)
//get all account of logged in user
router.get("/",authMiddleware,accountController.getAccounts)
//get account balance of logged in user using accountId
router.get("/:accountId/balance",authMiddleware,accountController.getAccountBalance)
module.exports=router