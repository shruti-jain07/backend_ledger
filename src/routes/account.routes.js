const express=require("express")
const router=express.Router()

const accountController=require("../controllers/account.controller")
const {authMiddleware}=require("../middlewares/auth.middleware")
//create account
/**
 * @swagger
 * /account:
 *   post:
 *     summary: Create a new account
 *     tags: [Account]
 *     description: Protected route. Requires authentication cookie.
 *     responses:
 *       201:
 *         description: Account created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/",authMiddleware,accountController.createAccount)


//get all account of logged in user
/**
 * @swagger
 * /account:
 *   get:
 *     summary: Get all accounts of logged in user
 *     tags: [Account]
 *     description: Protected route. Requires authentication cookie.
 *     responses:
 *       200:
 *         description: Accounts fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/",authMiddleware,accountController.getAccounts)


//get account balance of logged in user using accountId
/**
 * @swagger
 * /account/{accountId}/balance:
 *   get:
 *     summary: Get account balance
 *     tags: [Account]
 *     description: Protected route. Requires authentication cookie.
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Account balance fetched successfully
 *       401:
 *         description: Unauthorized account access
 *       404:
 *         description: Account not found
 *       500:
 *         description: Internal server error
 */
router.get("/:accountId/balance",authMiddleware,accountController.getAccountBalance)
module.exports=router