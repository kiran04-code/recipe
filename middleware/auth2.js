const {validation2} = require("../service/authshopJWT")
function checkAuth2(cookieName2){
    return  function(req, res, next){
        const token = req.cookies[cookieName2]
        if(!token) {
            return next()
        }
        try {
            const payloadnew = validation2(token)
            req.shopuser = payloadnew
            next()
        } catch (error) {
            return res.status(401).json({message: "unauthorized"})
        }
    }
}
module.exports = { checkAuth2 }