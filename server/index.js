import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { connectDb } from "./Middlewares/dbConnection.js"
import userRouter from "./Routes/userRoutes.js"
import todoRouter from "./Routes/todoRoutes.js"

// ENV Config
dotenv.config()

// DB Connection
connectDb()

// Initialize Port Number
const port = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

app.use("/api", userRouter)
app.use("/api", todoRouter)

// Server Listen
app.listen(port, () =>
  console.log(`http://localhost:${port}, on ${process.env.NODE_ENV} mode`)
)
