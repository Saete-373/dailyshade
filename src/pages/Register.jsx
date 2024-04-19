import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [regisUser, setRegisUser] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const OnChange = (evt) => {
    const key = evt.target.name;
    const value = evt.target.value;

    setRegisUser((oldData) => ({ ...oldData, [key]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (regisUser.password === regisUser.cpassword) {
      axios
        .post("http://localhost:5000/api/register", {
          username: regisUser.username,
          email: regisUser.email,
          password: regisUser.password,
        })
        .then((res) => {
          console.log(res);
          navigate("/login")
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.error("Password is not match");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>register</h1>
      <div>
        Username <br />
        <input type="text" name="username" onChange={OnChange} />
      </div>
      <div>
        Email <br />
        <input type="email" name="email" onChange={OnChange} />
      </div>
      <div>
        Password <br />
        <input type="password" name="password" onChange={OnChange} />
      </div>
      <div>
        Confirm Password <br />
        <input type="password" name="cpassword" onChange={OnChange} />
      </div>
      <div>
        <NavLink to="/forgetpw">Forgotten password?</NavLink>
      </div>

      <button type="submit" className="w-36 h-auto bg-white">
        Register
      </button>

      <div>
        Don't have an account?
        <NavLink to="/register">&nbsp;&nbsp;&nbsp;REGISTER</NavLink>
      </div>
    </form>
  );
}

export default Register;
