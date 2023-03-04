import User from "../Models/userModel.js"
import { generateToken } from "../Utils/jwtTokwn.js"
import { encryptPassword, decryptPassword } from "../Utils/bcryptPassword.js"
import { fieldValidation, userExist } from "../Validations/userValidations.js"

export const register = async (req, res, next) => {
  try {
    const errors = await fieldValidation(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    let { name, type, email, password, mobileNumber } = req.body
    const existingUser = await userExist(email)
    if (existingUser) {
      return res.json({ success: false, msg: "Account Already Exist" })
    }

    const user = new User({
      type,
      name,
      email,
      password,
      mobileNumber,
    })
    user.password = await encryptPassword(password)
    await user.save()
    const payload = { id: user.id }
    const token = await generateToken(payload)
    return res.json({
      success: true,
      msg: "Registered Successfully",
      name: user.name,
      token,
    })
  } catch (err) {
    return res.json({ success: false, msg: "Something went wrong" })
  }
}

export const login = async (req, res, next) => {
  try {
    const errors = await fieldValidation(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return res.status(404).json("Email Doesn't Exist")
    }
    const passwordMatch = await decryptPassword(password, user.password)
    if (!passwordMatch) {
      return res.json({ success: false, msg: "Invalid Credentials" })
    }
    const payload = { id: user._id }
    const token = await generateToken(payload)
    return res.json({
      success: true,
      msg: "Login Success",
      name: user.name,
      token,
    })
  } catch (err) {
    return res.json({ success: false, msg: "Something went wrong" })
  }
}
