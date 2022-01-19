import axios from "axios";
import React, { useState, useEffect } from "react";
import { Routes, useParams, Link, useNavigate } from "react-router-dom";
import { BsChatDots, BsListUl } from "react-icons/bs";
import { AiFillApple, AiFillDelete } from "react-icons/ai";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "@progress/kendo-theme-default/dist/all.css";

const Home = ({ setMyId }) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllPosts();
    getAllUsers();
    getInfoUser();
  }, []);

  const getAllPosts = async () => {
    await axios
      .get("http://localhost:5000/posts/", {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      })
      .then((result) => {
        setPosts(result.data.posts);
        setUserId(result.data.userId);
        setMyId(result.data.userId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getInfoUser = async () => {
    await axios
      .get(`http://localhost:5000/users/${id}`)
      .then((result) => {
        setInfo(result.data.Info);
        console.log("result Info:", result.data.Info);

        setName(result.data.Info[0].userName);
        setUserId(result.data.Info[0]._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllUsers = async () => {
    await axios
      .get("http://localhost:5000/users/all/users",{
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      })
      .then((result) => {
        setAllUsers(result.data.users);
        console.log("woooo",result.data.users);
      
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("important", userId);
  // console.log("post tezea11: ", posts);
  console.log('beshooooooo',allUsers);
  return (
    <>
      <div className="contain_all_home">
        <div className="left_home"></div>

        <div className="middle_home">
          <div
            className="click_new_post"
            onClick={(e) => {
              navigate("/newPost");
            }}
          >
            {info &&
              info.map((item, i) => (
                <div className="test">
                  <div className="user_imge">
                    <img
                      className="imge"
                      src={item.image}
                      alt=""
                      width="100%"
                    />
                    <div className="whats_on">Whats on your Mind ?</div>
                  </div>
                  <div className="line_creatpost"></div>
                </div>
              ))}
          </div>

          <div className="all_posts_home">
            {posts ? (
              posts.map((element, i) => {
                console.log(posts);
                console.log("user image:", element.user.image);

                return (
                  <div className="Post" key={i}>
                    <div className="user_and_drop">
                      {userId === element.user._id ? (
                        <div className="user_imge">
                          <img
                            className="imge"
                            src={element.user.image}
                            alt=""
                            width="100%"
                          />
                          <Link
                            className="linkreg"
                            to={`/profile/${element.user._id}`}
                          >
                            <div className="user_name">
                              {element.user.userName}
                            </div>
                          </Link>{" "}
                        </div>
                      ) : (
                        <div className="user_imge">
                          <img
                            className="imge"
                            src={element.user.image}
                            alt=""
                            width="100%"
                          />
                          <Link
                            className="linkreg"
                            to={`/profile/${element.user._id}`}
                          >
                            <div className="user_name">
                              {element.user.userName}
                            </div>
                          </Link>{" "}
                        </div>
                      )}

                      {userId === element.user._id ? (
                        <div className="dropdown">
                          <div className="dropbtn">
                            <BsListUl className="BsListUl" />
                            <i className="fa fa-caret-down"></i>
                          </div>

                          <div className="dropdown-content">
                            <div className="style_dropdown">
                              <div className="style_drop_delete">
                                <AiFillDelete className="icon_delete" />
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
                                  delete{" "}
                                </button>
                              </div>

                              <button>
                                {" "}
                                Edit
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
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="empty"></div>
                      )}
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
              <div className="No">No Posts</div>
            )}
          </div>
        </div>

        <div className="rigth_home"></div>
      </div>
      <button className="load_more">Load more</button>
    </>
  );
};

export default Home;
