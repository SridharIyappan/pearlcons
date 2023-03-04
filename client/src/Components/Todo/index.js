import axios from "axios"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import Header from "../Header"

const Todo = () => {
  const [taskName, setTaskName] = useState("")
  const [tasks, setTasks] = useState([])
  const [edit, setEdit] = useState(null)
  const [editTaskName, setEditTaskName] = useState("")

  const success = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }

  const error = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }

  const token = localStorage.getItem("token")

  useEffect(() => {
    getAllTodos()
  }, [])

  const changeEdit = (e, id, tName) => {
    e.preventDefault()
    setEdit(id)
    setEditTaskName(tName)
  }

  const getAllTodos = async e => {
    const headers = {
      authorization: `Bearer ${token}`,
    }
    const d = {}
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/get-all-todos-by-user/`,
        { headers }
      )
      if (data.success) {
        setTasks(data.todos)
        toast.success(data.msg, success)
      } else {
        toast.error(data.msg, error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createTodo = async e => {
    e.preventDefault()
    if (taskName === "") {
      return toast.error("Please Fill Task Name", error)
    }
    const d = {
      taskName,
    }
    const headers = {
      authorization: `Bearer ${token}`,
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/create-todo-by-user/`,
        d,
        { headers }
      )
      if (data.success) {
        setTasks(prev => [...prev, data.todo])
        toast.success(data.msg, success)
        setTaskName("")
      } else {
        toast.error(data.msg, error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const editTodo = async (e, id) => {
    e.preventDefault()
    if (editTaskName === "") {
      return toast.error("Please Fill Task Name", error)
    }
    const d = {
      taskName: editTaskName,
    }
    const headers = {
      authorization: `Bearer ${token}`,
    }
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/edit-todo-by-user/${id}`,
        d,
        { headers }
      )
      if (data.success) {
        setTasks(tasks.filter(task => task._id != data.task._id))
        setTasks(prev => [...prev, data.task])
        toast.success(data.msg, success)
        setEdit(null)
      } else {
        toast.error(data.msg, error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTodo = async (e, id) => {
    e.preventDefault()
    const d = {}
    const headers = {
      authorization: `Bearer ${token}`,
    }
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/delete-todo-by-user/${id}`,
        { headers },
        d
      )
      if (data.success) {
        setTasks(tasks.filter(task => task._id != id))
        toast.success(data.msg, success)
      } else {
        toast.error(data.msg, error)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Header />
      <div className="Todo">
        <ToastContainer />
        <form onSubmit={e => createTodo(e)}>
          <input
            type="text"
            value={taskName}
            onChange={e => {
              setTaskName(e.target.value)
            }}
          />
          <button type="submit">Add Task</button>
        </form>
        <div className="tasks">
          {tasks.map(task => {
            const { _id, taskName } = task
            return (
              <div className="task" key={_id}>
                {edit != _id && (
                  <>
                    <div className="task-name">{taskName}</div>
                    <div className="task-edit">
                      <i
                        class="fa fa-pencil"
                        aria-hidden="true"
                        onClick={e => changeEdit(e, _id, taskName)}
                      ></i>
                    </div>
                    <div className="task-delete">
                      <i
                        class="fa fa-trash"
                        aria-hidden="true"
                        onClick={e => deleteTodo(e, _id)}
                      ></i>
                    </div>
                  </>
                )}
                {edit == _id && (
                  <>
                    <div className="edit-input">
                      <input
                        type="text"
                        value={editTaskName}
                        onChange={e => setEditTaskName(e.target.value)}
                      />
                    </div>
                    <button onClick={e => editTodo(e, _id)}>Update</button>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Todo
