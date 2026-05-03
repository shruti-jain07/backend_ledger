const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "User profile fetched",
    data: req.user
  })
})

module.exports = router