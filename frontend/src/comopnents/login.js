import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setMessage] = useState("");

  const navigate = useNavigate();

  return (

    <div className="Login">
      <div className="border_bottom">
        <div className="titRegis">Login</div>
      </div>
      <div className="buttonlogin ">
        {" "}
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="buttonlogin">
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <button
        className="buttonRegs"
        onClick={(e) => {
          axios
            .post("http://localhost:5000/login", {
              email: email,
              password: password,
            })
            .then((result) => {
              navigate("/dashboard");
            })
            .catch((err) => {
              setMessage(err.response.data.message);
              e.target.style.background =
              "linear-gradient(-45deg,#f7797d,#f7797d)";
            e.target.style.color = "black";
              
            });
        }}
      >
        Login
      </button>
      <div className="messagReg">{loginMessage}</div>
     
    </div>

 
  );
};

export default Login;