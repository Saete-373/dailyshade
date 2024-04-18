import { useState } from "react";

function Login() {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const OnChange = (evt) => {
    const key = evt.target.name;
    const value = evt.target.value;

    // setLoginUser({});
  };
  const OnSubmit = () => {};
  return (
    <>
      <h1>login</h1>
      <div>
        Email
        <input type="email" name="email" onChange={OnChange} />
      </div>
      <div>
        Password
        <input type="password" name="password" onChange={OnChange} />
      </div>
    </>
  );
}

export default Login;
