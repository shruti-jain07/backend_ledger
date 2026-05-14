const express=require("express")
const router=express.Router()
const { authMiddleware } = require("../middlewares/auth.middleware")
const authController=require("../controllers/auth.controller")
const validate=require("../middlewares/validate")
const {registerSchema, loginSchema}=require("../validators/auth.validator")
//POST /api/auth/register
router.post("/register",validate(registerSchema),authController.register)
//POST /api/auth/login
router.post("/login",validate(loginSchema),authController.login)
//POST /api/auth/logout
router.post("/logout",authMiddleware,authController.logout)
module.exports=router