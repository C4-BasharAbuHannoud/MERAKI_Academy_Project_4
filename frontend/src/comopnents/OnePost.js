import axios from "axios";

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { BsChatDots, BsPlusCircleFill, BsListUl } from "react-icons/bs";
import Model from "react-modal";
Model.setAppElement("#root");

const OnePost = () => {
  const { _id } = useParams();
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    getOnePost();
  }, [_id]);

  const getOnePost = () => {
    axios
      .get(`http://localhost:5000/posts/${_id}/post`)
      .then((result) => {
        setPosts(result.data.posts);
        setUserId(result.data.userId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("bashar", posts);
  return (
    <>
      <div className="big">
        {posts ? (
          posts.map((element, i) => {
            console.log(posts);

            return (
              <div className="Post_comment" key={i}>
                <div className="user_and_drop">
                  <div className="user_imge">
                    <img
                      className="imge"
                      src={element.user.image}
                      alt=""
                      width="100%"
                    />
                    <div className="user_name_one">{element.user.userName}</div>
                  </div>
                  {/* <div className="dropdown">
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
                                getOnePost();
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
                                  getOnePost();
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
                  </div> */}
                  <div className="empty"></div>
                </div>

                <div className="description">
                  <div className="body_one">{element.description}</div>
                </div>

                <div className="line_post"></div>

                <div className="show_comments_one">
                  <div>
                    <BsChatDots />
                  </div>{" "}
                  Comments
                </div>

                <div className="line_post"></div>

                <div className="all_comments">
                  {element.comments[0] ? (
                    element.comments.map((elem, i) => {
                      console.log(elem);
                      return (
                        <div className="comment_style">

<div className="comment_flex_row">     

                          <img
                            className="uesr_commenter_img"
                            src={elem.commenter.image}
                            alt=""
                            width="100%"
                          />


                          <div className="one_comment">
                            <div className="comment_flex_column">
                              <div className="uesr_commenter_name">
                                {elem.commenter.userName}
                              </div>

                              <div className="comment_font">{elem.comment}</div>
                            </div>
                          </div>
                          </div>


                        </div>
                      );
                    })
                  ) : (
                    <div className="No">No comments </div>
                  )}
                </div>

                <div className="add_comment_syle">
                  <input
                    className="Add_comment"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    type="text"
                    placeholder="write comment here..."
                  />{" "}
                  <BsPlusCircleFill
                    className="apple"
                    onClick={(e) => {
                      console.log("الحمدلله");
                      axios
                        .post(
                          `http://localhost:5000/posts/${element._id}/comments/`,
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
                          getOnePost();
                          setComment("");
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="No">No Posts</div>
        )}
      </div>
    </>
  );
};
export default OnePost;
