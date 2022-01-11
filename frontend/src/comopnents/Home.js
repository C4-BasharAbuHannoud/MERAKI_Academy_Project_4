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
                  {userId == element.user ? (
                    <button
                      className="delete"
                      onClick={(e) => {
                        axios
                          .delete(
                            `http://localhost:5000/posts/${element._id}`
                          )
                          .then((result) => {
                            getAllPosts();
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    >
                      delete
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="style_div">
                  {userId == element.user ? (
                    <div className="caertPost_update">
                      <h1 className="border_bottom_h1">Update Posts</h1>
                     
                      <div className="border_bottom">
                        <input
                          type="text"
                          className="Post_update"
                          placeholder="description"
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                      </div>
                      <button
                        className="update"
                        onClick={(e) => {
                       
                          e.target.style.background =
                            "linear-gradient(-45deg,#CAC531,#F3F9A7)";
                          e.target.style.color = "black";
                          axios
                            .put(
                              `http://localhost:5000/posts/${element._id}`,
                              {
                              
                                description,
                              }
                            )
                            .then((result) => {
                              getAllPosts();
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                      >
                        Update
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}

                
             
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
