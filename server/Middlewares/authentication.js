import jwt from "jsonwebtoken"

import Users from "../Models/userModel.js"

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      return res.json({
        success: false,
        msg: "Please login for access this resource",
      })
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await Users.findById(decode.id)
    next()
  } catch (err) {
    return res.json({ success: false, msg: "Authentication Failed" })
  }
}

export default authentication
