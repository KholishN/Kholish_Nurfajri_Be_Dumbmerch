const jwt = require("jsonwebtoken");


exports.auth = (req, res, next) => {
    const authHeader = req.header("Authorization")

    const token =  authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.send({
            mesaage: "Access Denied"
        })
    }

    try {
        
        const verified = jwt.verify(token, "admin")

        req.user = verified

        next()

    } catch (error) {
        console.log(error)
        res.send({
            message: "Invalid Token"
        })
    }
};