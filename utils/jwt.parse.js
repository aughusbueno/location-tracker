const decode = require("jwt-decode")

const jwtdecode = (token) => {
    const decodedToken = decode(token,{
        header : true
    })

    return decodedToken
}

module.exports = jwtdecode