import mongoose, { Schema } from "mongoose"

const todoShema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
)

const Todo = mongoose.model("todos", todoShema)

export default Todo
