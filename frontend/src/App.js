import "./App.css";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./comopnents/login";
import Home from "./comopnents/Home";
import NewPost from "./comopnents/newPost";
import Profile from "./comopnents/profile";
import Navigation from "./comopnents/Navigation";
import OnePost from "./comopnents/OnePost";

function App() {
  const [token, setToken] = useState("");
  const [myId, setMyId] = useState("");
  const [passPhoto, setPassPhoto] = useState("");
  const [allUsersSearch, setAllUsersSearch] = useState([]);
  const [toEditPost, setToEditPost] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const tokenStorage = localStorage.getItem("token");

    if (tokenStorage) {
      setToken(tokenStorage);
    }
  }, []);

  return (
    <>
      {token ? (
        <Navigation
          setToken={setToken}
          myId={myId}
          allUsersSearch={allUsersSearch}
        />
      ) : (
        <> </>
      )}
      <div className="App">
        <div className="Home">
          <Routes>
            <Route
              path="/Home/:id"
              element={
                <Home
                  token={token}
                  setMyId={setMyId}
                  passPhoto={passPhoto}
                  setAllUsersSearch={setAllUsersSearch}
                  toEditPost={toEditPost}
                />
              }
            />
            <Route
              path="/newPost"
              element={
                <NewPost
                  token={token}
                  setToEditPost={setToEditPost}
                  myId={myId}
                />
              }
            />
            <Route
              path={`/profile/:id`}
              element={<Profile setPassPhoto={setPassPhoto} myId={myId} />}
            />
            <Route path={`/posts/:_id/post`} element={<OnePost />} />
          </Routes>
        </div>
        {token ? <></> : <Login setToken={setToken} />}
      </div>
    </>
  );
}

export default App;
