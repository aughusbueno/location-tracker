const express = require("express")
const router = express.Router()
const {
    signin,
    signup,
    logout
} = require("../controller/user.controller")
const auth = require("../middleware/auth.middleware")

router.post('/login', signin)

router.post('/register', signup)

router.get('/logout', auth, logout)

module.exports = router