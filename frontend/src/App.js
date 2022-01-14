import "./App.css";

import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./comopnents/login";
import Home from "./comopnents/Home";
import NewPost from "./comopnents/newPost";
import Profile from "./comopnents/profile";
import Navigation from "./comopnents/Navigation";

function App() {
  const [token, setToken] = useState("");
  const [myId,setMyId]= useState("");
 
  const navigate = useNavigate();

  useEffect(() => {
    const tokenStorage = localStorage.getItem("token");
    console.log(tokenStorage);
    if (tokenStorage) {
      setToken(tokenStorage);
    }
  }, []);

  return (
    <>
      {token ? (
    <Navigation setToken={setToken} myId={myId} />
      ) : (
        <> </>
      )}
      <div className="App">
        <div className="Home">
          <Routes>
            <Route
              path="/Home"
              element={<Home token={token} setMyId={setMyId} />}
            />
            <Route path="/newPost" element={<NewPost token={token} />} />
            <Route path={`/profile/:id`} element={<Profile />} />
          </Routes>
        </div>
        {token ? <></> : <Login setToken={setToken} />}
      </div>
    </>
  );
}





export default App;
