import axios from "axios";

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    allPostsForUser();
  }, [id]);

  const allPostsForUser = () => {
    axios
      .get(`http://localhost:5000/posts/${id}`, {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log("result data:", result.data);
        setPosts(result.data.posts);
        setUserId(result.data.userId);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {posts.map((element, i) => { 
        return (
          <div >
            <div key={"hi"}>{element.user.userName}</div>
            <div key={"5"}>{element.description}</div>

            <div
              className="test_comments"
              onClick={(e) => {
                console.log("hii");
              }}
            >
              comments
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Profile;
