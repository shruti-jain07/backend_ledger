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
/**
 * @swagger
 * /transactions/transfer:
 *   post:
 *     summary: Transfer funds between accounts
 *     tags: [Transactions]
 *     description: Protected route. Requires authentication cookie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fromAccount
 *               - toAccount
 *               - amount
 *               - idempotencyKey
 *             properties:
 *               fromAccount:
 *                 type: string
 *                 example: 6a016cc570431c63312db1bd
 *               toAccount:
 *                 type: string
 *                 example: 6a016ce270431c63312db1be
 *               amount:
 *                 type: number
 *                 example: 50
 *               idempotencyKey:
 *                 type: string
 *                 example: txn-123456
 *     responses:
 *       201:
 *         description: Transaction successful
 *       400:
 *         description: Validation error or insufficient balance
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Account not found
 *       409:
 *         description: Duplicate transaction request
 *       500:
 *         description: Internal server error
 */
router.post("/transfer",authMiddleware,validate(transactionSchema),transactionController.transfer)


/**
 * Create initial funds transaction from system user
 * POST /api/transactions/system/initial-funds
 * 
*/
/**
 * @swagger
 * /transactions/system/initial-funds:
 *   post:
 *     summary: Transfer initial funds from system account
 *     tags: [Transactions]
 *     description: Protected route. Requires system user authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - toAccount
 *               - amount
 *               - idempotencyKey
 *             properties:
 *               toAccount:
 *                 type: string
 *                 example: 687a12bc45de6789f7654321
 *               amount:
 *                 type: number
 *                 example: 1000
 *               idempotencyKey:
 *                 type: string
 *                 example: init-fund-123
 *     responses:
 *       201:
 *         description: Initial funds transferred successfully
 *       400:
 *         description: Validation error or insufficient balance
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden access
 *       404:
 *         description: Account not found
 *       409:
 *         description: Duplicate transaction request
 *       500:
 *         description: Internal server error
 */
router.post("/system/initial-funds",authSystemUserMiddleware,transactionController.initialFundsTransfer)


/**
 * Get logged-in user transaction history
 * GET /api/transactions/history
 */
/**
 * @swagger
 * /transactions/history:
 *   get:
 *     summary: Get logged-in user transaction history
 *     tags: [Transactions]
 *     description: Protected route. Requires authentication cookie.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         example: 10
 *         description: Number of transactions per page
 *     responses:
 *       200:
 *         description: Transaction history fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/history",authMiddleware,transactionController.getTransactionHistory)

module.exports=router