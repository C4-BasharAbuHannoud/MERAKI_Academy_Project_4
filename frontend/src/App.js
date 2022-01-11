import "./App.css";
import Register from "./comopnents/register";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./comopnents/login";
import Home from "./comopnents/Home";


function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const tokenStorage = localStorage.getItem("token");
    if (tokenStorage) {
      setToken(tokenStorage);
    }
  }, []);

  return (
    <div className="App">
      {token ? <Logout setToken={setToken}/> : <Navigation />}
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/Home" element={<Home token={token} />} />
      </Routes>
    </div>
  );
}

const Navigation = () => {
  return (
    <div className="nav">
      <div className="registerNav">
        <Link to="/signup" className="linkreg">
          Sign Up
        </Link>
      </div>
      <div className="registerNav">
        <Link to="/login" className="linkreg">
          Login
        </Link>
      </div>
    </div>
  );
};

const Logout = ({setToken}) => {
  const navigate = useNavigate()
 
  return (
    <button className="LogOut" onClick={(e) => {
      localStorage.removeItem("token");
      setToken("");
      navigate("/login")
    }}>LogOut</button>
  );
};

export default App;
