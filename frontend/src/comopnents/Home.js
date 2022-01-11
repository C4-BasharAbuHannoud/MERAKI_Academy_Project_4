import axios from "axios";

import React, { useState, useEffect } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = () => {
    axios
      .get("http://localhost:5000/posts/", {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      })
      .then((result) => {
          console.log(result);
        setPosts(result.data.posts);
        setUserId(result.data.userId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(posts);
 return (
    <div className="Dash">
    
     
    </div>
    
  );
};

export default Home;
