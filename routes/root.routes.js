const express = require("express")
const router = express.Router()
const path = require("path")
const auth = require("../middleware/auth.middleware")

router.get('/test', auth, (req, res)=>{
    res.send({status : true, message : "Authorized!"})
})

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/index.html'))
})

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/register.html'))
})

router.get('/driver', auth, (req, res) => {
    res.sendFile(path.join(__dirname,'../public/driver.html'))
})

router.get('/client', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/client.html'))
})

module.exports = router