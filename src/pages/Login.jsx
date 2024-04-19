import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const OnChange = (evt) => {
    const key = evt.target.name;
    const value = evt.target.value;

    // setLoginUser({});
    setLoginUser((oldData) => ({ ...oldData, [key]: value }));
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();

    axios
      .post("http://localhost:5000/api/login", {
        email: loginUser.email,
        password: loginUser.password,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>login</h1>
      <div>
        Email <br />
        <input type="email" name="email" onChange={OnChange} />
      </div>
      <div>
        Password <br />
        <input type="password" name="password" onChange={OnChange} />
      </div>
      <div>
        <NavLink to="/forgetpw">Forgotten password?</NavLink>
      </div>

      <button type="submit" className="w-36 h-auto bg-white">
        login
      </button>

      <div>
        Don't have an account?
        <NavLink to="/register">&nbsp;&nbsp;&nbsp;REGISTER</NavLink>
      </div>
    </form>
  );
}

export default Login;
