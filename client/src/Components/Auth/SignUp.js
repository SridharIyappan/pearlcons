import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const SignUp = () => {
  const navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    mobile: Yup.string()
      .required("Mobile Number is required")
      .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Phone number is not valid"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(40, "Password must not exceed 40 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  })
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      type: "user",
    },
    validationSchema,
    onSubmit: async data => {
      console.log(data)
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/register`,
          data
        )
        console.log(res)
        console.log(res.error, "Erro")
        if (res.data.success) {
          localStorage.setItem("token", res.data.token)
          navigate("/")
        } else {
          console.log("working")
          toast.error(res.data.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
  })
  return (
    <div className="SignUp">
      <ToastContainer />
      <div className="container">
        <form id="form" className="form" onSubmit={formik.handleSubmit}>
          <h2>SignUp!</h2>
          <div className="form-control">
            <label for="name" className="form-label">
              Name
            </label>
            <input
              type="name"
              className={
                formik.errors.name && formik.touched.name ? " is-invalid" : ""
              }
              onChange={formik.handleChange}
              value={formik.values.name}
              id="name"
              name="name"
              placeholder="Enter Username"
            />
            <div className="invalid-feedback">
              {formik.errors.name && formik.touched.name
                ? formik.errors.name
                : null}
            </div>
          </div>
          <div className="form-control">
            <label for="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className={
                formik.errors.email && formik.touched.email ? " is-invalid" : ""
              }
              onChange={formik.handleChange}
              value={formik.values.email}
              id="email"
              name="email"
              placeholder="Enter Email"
            />
            <div className="invalid-feedback">
              {formik.errors.email && formik.touched.email
                ? formik.errors.email
                : null}
            </div>
          </div>
          <div className="form-control">
            <label for="mobile" className="form-label">
              Mobile
            </label>
            <input
              type="text"
              className={
                formik.errors.mobile && formik.touched.mobile
                  ? " is-invalid"
                  : ""
              }
              onChange={formik.handleChange}
              value={formik.values.mobile}
              maxLength={10}
              id="mobile"
              name="mobile"
              placeholder="Enter Mobile Number"
            />
            <div className="invalid-feedback">
              {formik.errors.mobile && formik.touched.mobile
                ? formik.errors.mobile
                : null}
            </div>
          </div>

          <div className="form-control">
            <label for="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={
                formik.errors.password && formik.touched.password
                  ? " is-invalid"
                  : ""
              }
              onChange={formik.handleChange}
              value={formik.values.password}
              id="password"
              name="password"
            />
            <div className="invalid-feedback">
              {formik.errors.password && formik.touched.password
                ? formik.errors.password
                : null}
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
        <h3 className="signin-signup-link">
          If you already have an account ? <Link to="/signin">SignIn</Link>
        </h3>
      </div>
    </div>
  )
}

export default SignUp
