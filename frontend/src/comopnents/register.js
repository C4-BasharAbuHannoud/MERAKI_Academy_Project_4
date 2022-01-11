import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [registerMessage, setMessage] = useState("");
  return (
    <div className="register">
      <div className="border_bottom">
        <div className="titRegis">Sign Up</div>
      </div>
      <div className="border_bottom">
        <input
          type="text"
          placeholder="User_Name"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </div>

      <div className="border_bottom">
        <input
          type="number"
          placeholder="Age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
      </div>

      <div className="border_bottom">
        <input
          type="text"
          placeholder="gender"
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
      </div>
      <div className="border_bottom">
        <input
          type="text"
          placeholder="Country"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
      </div>

      <div className="border_bottom">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      

      <div className="border_bottom">
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
            .post("http://localhost:5000/users/create", {
             userName: userName,
              age: age,
              gender:gender,
              country: country,
              email: email,
              password: password,
            })
            .then((result) => {
              console.log(result.data);

              e.target.style.background =
                "linear-gradient(-45deg,#CAC531,#F3F9A7)";
              e.target.style.color = "black";

              setMessage("The user has been created successfully");
            })
            .catch((err) => {
              e.target.style.background =
                "linear-gradient(-45deg,#f7797d,#f7797d)";
              e.target.style.color = "black";
              setMessage("Error happened while register, please try again");
            });
        }}
      >
        Register
      </button>
      <div className="messagReg">{registerMessage}</div>
    </div>
  );
};

export default Register;
