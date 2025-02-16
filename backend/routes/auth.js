const jwt = require("jsonwebtoken")
const secret = "PrAb1234567!@#$%^&"

function setUser(user){
  return jwt.sign(user, secret)
}

function getUser(token){
  if(!token) return null;
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    return null
  }
}

module.exports={setUser, getUser}