import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [registerMessage, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(true);

  const navigate = useNavigate();

  return (
    <>
      <div className="container_for_all">
        {hidden ? (
          <div className="container_login">
            <div className="slogan"> Welcome to may paltform</div>
            <div className="Login">
              <div className="all_input_login">
                <div>
                  {" "}
                  <input
                    className="input_login"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <input
                    className="input_login"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <button
                  className="button_login"
                  onClick={(e) => {
                    axios
                      .post("http://localhost:5000/login", {
                        email: email,
                        password: password,
                      })
                      .then((result) => {
                        console.log(result);
                        if (result.data.token) {
                          // console.log(result.data.token);
                          setToken(result.data.token);
                          localStorage.setItem("token", result.data.token);
                          navigate(`/Home/${result.data.userId}`);
                        } else {
                          e.target.style.background =
                            "linear-gradient(-45deg,#f7797d,#f7797d)";
                          e.target.style.color = "black";
                        }
                      })
                      .catch((err) => {
                        console.log("err");
                        setMessage("please Enter your email and password ");
                        e.target.style.background =
                          "linear-gradient(-45deg,#f7797d,#f7797d)";
                        e.target.style.color = "black";
                      });
                  }}
                >
                  Log In
                </button>
                {/* <div className="messagLogin">{registerMessage}</div> */}
              </div>
              <div className="sperate_style">
                <div className="line_login"></div>
                <button
                  className="craete_new_account"
                  onClick={(e) => {
                    console.log(e.nativeEvent.path[3]);
                    e.nativeEvent.path[3].style.filter = "blur(9px)";
                    setVisible(true);
                    setHidden(false);
                  }}
                >
                  Craete new account
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {visible ? (
          <div className="register">
            <div className="register-content">
              <div className="title_close">
                <div className="titRegis">Sign Up</div>
                <span
                  className="close"
                  onClick={(e) => {
                    setVisible(false);
                    setHidden(true);
                    setMessage("");
                  }}
                >
                  &times;
                </span>
              </div>
              <div className="gap_inpt_signup">
                <div className="line_signup"></div>
                <div>
                  <input
                    className="input_signup"
                    type="text"
                    placeholder="User_Name"
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <input
                    className="input_signup"
                    type="number"
                    placeholder="Age"
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <input
                    className="input_signup"
                    type="text"
                    placeholder="gender"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                </div>
                <div className="border_bottom">
                  <input
                    className="input_signup"
                    type="text"
                    placeholder="Country"
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                  />
                </div>

                <div className="border_bottom">
                  <input
                    className="input_signup"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <input
                    className="input_signup"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <button
                className="buttonRegs"
                onClick={(e) => {
                  axios
                    .post("http://localhost:5000/users/create", {
                      userName: userName,
                      age: age,
                      gender: gender,
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
                      setMessage(
                        "Error happened while register, please try again"
                      );
                    });
                }}
              >
                Sign Up
              </button>
              <div className="messagReg">{registerMessage}</div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Login;
