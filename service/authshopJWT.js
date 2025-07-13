const jwt  = require("jsonwebtoken")
const secretKey2 = process.env.JWT_SECRATE_KEY2
function createToken2(shopuser){
 const payload = {
    _id: shopuser._id,
    email:shopuser.email,
    Number:shopuser.Number,
 }
 const token = jwt.sign(payload,secretKey2)
 return token
}
function validation2(token){
  const payload2 = jwt.verify(token,secretKey2)
  return payload2
}
module.exports = {createToken2 ,validation2}