const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET || "DSAM@O@()JDMDA@)("

const authToken = async (req, res, next) => {
    const token = req.cookies.token

    try
    {
        const user = jwt.verify(token,JWT_SECRET) 
        req.user = user
        next()
    }
    catch(err)
    {
        res.clearCookie("token")

        return res.json({status : false, error : "Invalid token"})
    }
}

module.exports = authToken