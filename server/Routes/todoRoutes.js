import express from "express"
import {
  createTodo,
  deleteTodo,
  editTodo,
  getAllTodosByUser,
} from "../Controllers/todoController.js"
import authentication from "../Middlewares/authentication.js"
import authorization from "../Middlewares/authorization.js"

const todoRouter = express.Router()

todoRouter.post(
  "/create-todo-by-user",
  authentication,
  authorization("user"),
  createTodo
)
todoRouter.get(
  "/get-all-todos-by-user",
  authentication,
  authorization("user"),
  getAllTodosByUser
)
todoRouter.put(
  "/edit-todo-by-user/:id",
  authentication,
  authorization("user"),
  editTodo
)
todoRouter.delete(
  "/delete-todo-by-user/:id",
  authentication,
  authorization("user"),
  deleteTodo
)

export default todoRouter
