import { Route, Routes, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import SignUp from "./Components/Auth/SignUp"
import SignIn from "./Components/Auth/SignIn"
import "./App.css"
import Todo from "./Components/Todo"

function App() {
  // const [token, setToken] = useState("")
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  useEffect(() => {
    if (token == null) {
      navigate("/signin")
    }
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route excat path="/signup" element={<SignUp />}></Route>
        <Route excat path="/signin" element={<SignIn />}></Route>
        <Route excat path="/" element={<Todo />}></Route>
      </Routes>
    </div>
  )
}

export default App
