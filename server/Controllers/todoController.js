import Todo from "../Models/todoModel.js"

export const createTodo = async (req, res) => {
  const { taskName } = req.body
  const userId = req.user._id
  try {
    const todo = new Todo({
      taskName,
      userId,
    })
    await todo.save()
    return res.json({ success: true, msg: "Todo Created", todo })
  } catch (error) {
    console.log(error)
    return res.json({ success: false, msg: "Something went wrong", err: error })
  }
}

export const getAllTodosByUser = async (req, res) => {
  const userId = req.user._id
  try {
    const todos = await Todo.find({ userId })
    return res.json({ success: true, msg: "Todos Sended Successfully", todos })
  } catch (error) {
    console.log(error)
    return res.json({ success: false, msg: "Something went wrong", err: error })
  }
}

export const editTodo = async (req, res) => {
  const { id } = req.params
  try {
    await Todo.findByIdAndUpdate({ _id: id }, { $set: req.body })
    const task = await Todo.findById(id)
    return res.json({ success: true, msg: "success", task })
  } catch (error) {
    console.log(error)
    return res.json({ success: false, msg: "Something went wrong" })
  }
}

export const deleteTodo = async (req, res) => {
  const { id } = req.params
  try {
    await Todo.findByIdAndDelete(id)
    return res.json({ success: true, msg: "Todo Deleted" })
  } catch (err) {
    return res.json({ success: false, msg: "Something went wrong", err })
  }
}
