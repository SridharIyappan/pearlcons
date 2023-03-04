import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "user",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
)

const Users = mongoose.model("users", userSchema)

export default Users
