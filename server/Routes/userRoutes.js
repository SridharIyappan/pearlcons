import express from "express"
import { register, login } from "../Controllers/userController.js"

import {
  registrationFieldRequirements,
  loginFieldRequirements,
} from "../Validations/userValidations.js"

const userRouter = express.Router()
userRouter.post("/register", registrationFieldRequirements, register)
userRouter.post("/login", loginFieldRequirements, login)

export default userRouter
