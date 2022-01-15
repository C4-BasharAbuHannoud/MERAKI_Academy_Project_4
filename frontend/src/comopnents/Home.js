import axios from "axios";

import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { BsChatDots, BsListUl } from "react-icons/bs";

const Home = ({ setMyId }) => {
  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    await axios
      .get("http://localhost:5000/posts/", {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log("result data:", result.data);
        setPosts(result.data.posts);
        setUserId(result.data.userId);
        setMyId(result.data.userId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("post: ", posts);
  return (
    <>
      <div
        className="click_new_post"
        onClick={(e) => {
          navigate("/newPost");
        }}
      >
        <div className="test">
          <div className="whats_on">Whats on your Mind ?</div>
          <div className="line_creatpost"></div>
        </div>
      </div>
      {posts ? (
        posts.map((element, i) => {
          console.log(posts);
          console.log("user:", element.user._id);
          console.log(userId);
          return (
            <div className="Post" key={i}>
              <div className="user_and_drop">
                <Link className="linkreg" to={`/profile/${element.user._id}`}>
                  <div className="user_name">{element.user.userName}</div>
                </Link>{" "}
                {/*link to profile/ and to useParams in profile comopnents*/}
                <div className="dropdown">
                  <div className="dropbtn">
                    <BsListUl className="BsListUl" />
                    <i className="fa fa-caret-down"></i>
                  </div>

                  <div className="dropdown-content">
                    {userId == element.user._id ? (
                      <button
                        className="button_delete"
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

                    {userId == element.user._id ? (
                      <div className="update">
                        <div className="title_upadte">Edit post</div>

                        <input
                          type="text"
                          className="Post_update"
                          placeholder="description"
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />

                        <button
                          className="button_update"
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
                          Save
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              <div className="description">
                <div className="body">{element.description}</div>
              </div>

              <div className="line_post"></div>
              <Link className="linkreg" to={`/posts/${element._id}/post`}>
                <div className="show_comments">
                  <div>
                    <BsChatDots />
                  </div>{" "}
                  Comments
                </div>
              </Link>
            </div>
          );
        })
      ) : (
        <di className="No">No Posts</di>
      )}
    </>
  );
};

export default Home;
