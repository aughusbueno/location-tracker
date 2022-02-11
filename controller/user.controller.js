const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const user = require("../models/user")

const JWT_SECRET = process.env.JWT_SECRET || "DSAM@O@()JDMDA@)("

const signin = async (req, res) => {
    const email = req.body.email
    const plainTextPassword = req.body.password

    try{
        const User = await user.findOne({email}).lean()

        if(!User){
            return res.json({status : false, error : "Invalid credentials"})
        }

        if(await bcrypt.compare(plainTextPassword,User.password)){

            const token = jwt.sign({
                id : User._id,
                name : User.name,
                email : User.email,
                vehicle : User.vehicle,
                plate : User.plate
            }, JWT_SECRET)

            res.cookie("token", token, {
                httpOnly : true,
                // secure : true,
                // signed : true
            })

            return res.json({status : true, token : token})
        }
        else{
            return res.json({status : false, error : "Incorrect password"})
        }
    }
    catch(err){
        res.json({status : false, error : err})
    }
}

const signup = async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const plainTextPassword = req.body.password
    const vehicle = req.body.vehicle
    const plate = req.body.plate

    const password = await bcrypt.hash(plainTextPassword, 10)

    try{
        const User = await user.create({name,email,password,vehicle,plate})

        User.saved()

        return res.json({status : true, data : User})
    }
    catch(err){
        if(err.code === 11000){
            return res.json({status:false, error : "Email is already in used."})
        }
        res.json({status : false, error : err})
    }

}

const logout = async (req, res) => {
    res.cookie('token', '', {maxAge : 1})

    res.redirect('/')
}

module.exports = {
    signin,
    signup,
    logout
}