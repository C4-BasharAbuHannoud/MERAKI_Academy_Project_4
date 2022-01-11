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
    
    {posts ? (
        posts.map((element, i) => {
            console.log(posts);
          return (
           
              <div className="squar">
                <div className="tit_des_dele_1">
                {/* <div className="title">{element.user}</div> */}
             
                  <div className="body">{element.description}</div>
                </div>
              </div>
              
           
          );
        })
      ) : (
        <di className="No">No Posts</di>
      )}
      
    </div>
    
  );
};

export default Home;
