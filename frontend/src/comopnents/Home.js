import axios from "axios";

import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
        console.log("result data:", result.data);
        setPosts(result.data.posts);
        setUserId(result.data.userId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("post: ", posts);
  return (
    <div className="Dash">
      {posts ? (
        posts.map((element, i) => {
          console.log(posts);
          console.log("user:", element.user._id);
          console.log(userId);
          return (
            <div className="squar">
              <Link to={`/profile/${element.user._id}`}></Link> // link to profile/ and to useParams in profile comopnents. 
              <button
                className="newbutton"
                onClick={(e) => {
                  navigate("/newPost");
                }}
              >
                New Post
              </button>
              <div className="tit_des_dele_1">
                <div className="body">{element.description}</div>
                {userId == element.user._id ? (
                  <button
                    className="delete"
                    onClick={(e) => {
                      axios
                        .delete(`http://localhost:5000/posts/${element._id}`)
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
                {userId == element.user._id ? (
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
                          .put(`http://localhost:5000/posts/${element._id}`, {
                            description,
                          })
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

                <div className="comment_AddComment">
                  {element.comments.map((element, i) => {
                    return (
                      <div className="comment_style">
                        comment: {element.comment}
                      </div>
                    );
                  })}

                  <div className="edit_style_comment">
                    <input
                      type="text"
                      className="comment"
                      placeholder="type here.."
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    />

                    <button
                      className="butt_comment"
                      onClick={(e) => {
                        e.target.style.background =
                          "linear-gradient(-45deg,#CAC531,#F3F9A7)";
                        e.target.style.color = "black";

                        axios
                          .post(
                            `http://localhost:5000/posts/${element._id}/comments`,
                            {
                              comment,
                            },
                            {
                              headers: {
                                Authorization: ` Bearer ${token}`,
                              },
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
                      Add New Comment
                    </button>
                  </div>
                </div>
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
