import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem("token")
    navigate("/signin")
  }
  return (
    <div className="Header">
      <h3 onClick={logOut}>Logout</h3>
    </div>
  )
}

export default Header
