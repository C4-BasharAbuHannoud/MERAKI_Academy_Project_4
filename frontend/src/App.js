import "./App.css";

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./comopnents/login";
import Home from "./comopnents/Home";
import NewPost from "./comopnents/newPost";
import Profile from "./comopnents/profile";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenStorage = localStorage.getItem("token");
    if (tokenStorage) {
      setToken(tokenStorage);
    }
  }, []);

  return (
    <>
      {token ? <div className="nav"> </div> : <> </>}
      <div className="App">
        <div className="Home">
          <Routes>
            <Route path="/Home" element={<Home token={token} />} />
            <Route path="/newPost" element={<NewPost token={token} />} />
            <Route path={`/profile/:id`} element={<Profile />} />
          </Routes>
        </div>
        {token ? <Logout setToken={setToken} /> : <Login setToken={setToken} />}
      </div>
    </>
  );
}

const Navigation = () => {
  return (
    <div className="nav">
      <div className="registerNav">
        <Link to="/" className="linkreg">
          Sign Up
        </Link>
      </div>
      <div className="registerNav">
        <Link to="/" className="linkreg">
          Login
        </Link>
      </div>
    </div>
  );
};

const Logout = ({ setToken }) => {
  const navigate = useNavigate();

  return (
    <button
      className="LogOut"
      onClick={(e) => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
      }}
    >
      LogOut
    </button>
  );
};

export default App;
