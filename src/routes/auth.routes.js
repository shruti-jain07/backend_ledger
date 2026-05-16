const express=require("express")
const router=express.Router()
const { authMiddleware } = require("../middlewares/auth.middleware")
const authController=require("../controllers/auth.controller")
const validate=require("../middlewares/validate")
const {registerSchema, loginSchema}=require("../validators/auth.validator")


//POST /api/auth/register
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Test2
 *               email:
 *                 type: string
 *                 example: Test2@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */
router.post("/register",validate(registerSchema),authController.register)


//POST /api/auth/login
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: Test2@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

router.post("/login",validate(loginSchema),authController.login)


//POST /api/auth/logout
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     description: Protected route. Requires authentication cookie.
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
router.post("/logout",authMiddleware,authController.logout)
module.exports=router