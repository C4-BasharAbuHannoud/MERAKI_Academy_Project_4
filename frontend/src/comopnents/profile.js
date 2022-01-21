import axios from "axios";

import React, { useState, useEffect } from "react";

import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import {
  BsChatDots,
  BsListUl,
  BsPinFill,
  BsFillHeartFill,
  BsFillGeoAltFill,
  BsFillPersonFill,
} from "react-icons/bs";
import { AiFillApple, AiFillDelete, AiFillHourglass } from "react-icons/ai";
import { ImHome3 } from "react-icons/im";
import { FaUserGraduate } from "react-icons/fa";
import { BsFillCameraFill, BsArrowDownSquareFill } from "react-icons/bs";

import Model from "react-modal";
Model.setAppElement("#root");

const Profile = ({ myId }) => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const token = localStorage.getItem("token");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [photo, setPhoto] = useState("");
  const [uploadImage, setUploadImage] = useState(""); /// for body to put requst
  const [updateImage, setUpdateImage] = useState(""); //// for put and put src updateImage
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [modalIsOpen3, setIsOpen3] = useState(false);

  const navigate = useNavigate();

  const allPostsForUser = () => {
    axios
      .get(`http://localhost:5000/posts/${id}`, {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log("result data 122112:", result.data);
        setPosts(result.data.posts.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getInfoUser = () => {
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((result) => {
        console.log("result Info:", result.data.Info);
        setInfo(result.data.Info);
        setName(result.data.Info[0].userName);
        setUserId(result.data.Info[0]._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadPhoto = async () => {
    console.log(photo);
    const formData = new FormData();
    formData.append("file", photo);
    formData.append("upload_preset", "wyggi4ze");

    await axios
      .post("https://api.cloudinary.com/v1_1/dvg9eijgb/image/upload", formData)
      .then((response) => {
        console.log(response);
        getInfoUser();
        setUploadImage(response.data.secure_url);
        console.log("userId", id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePhoto = async () => {
    await axios
      .put(`http://localhost:5000/users/${id}`, {
        image: uploadImage,
      })
      .then((result) => {
        setUpdateImage(result.data.image.image);

        allPostsForUser();
        getInfoUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    allPostsForUser();
    getInfoUser();
  }, [id]);
  console.log("infooooooooo", info);

  return (
    <>
      <div className="rectangularrr_cover">
        <div className="cover_and_pohoto">
          {info &&
            info.map((e, i) => (
              <>
                <img
                  className="cover"
                  src="http://iamfearlesssoul.com/wp-content/uploads/2016/11/facebook-SOUL-dont-give-up-VH.jpg"
                />
                <img
                  className="photo_profile"
                  cloudname="dvg9eijgb"
                  src={e.image}
                  width="100%"
                  onClick={() => {
                    setIsOpen3(true);
                  }}
                />

                <Model
                  isOpen={modalIsOpen3}
                  onRequestClose={() => setIsOpen3(false)}
                  style={{
                    overlay: {
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    },
                    content: {
                      top: "50%",
                      left: "50%",
                      right: "auto",
                      bottom: "auto",
                      marginRight: "-50%",
                      transform: "translate(-50%, -50%)",
                      width: "650px",

                      height: " 500px",
                      backgroundColor: "#ffffff",
                      borderRadius: "5px",
                      boxShadow: "-0.2px 1px 7px #dadcdf",
                    },
                  }}
                >
                  <div>
                    <img
                      className="popup_img"
                      cloudname="dvg9eijgb"
                      src={e.image}
                      width="100%"
                    />
                  </div>
                </Model>
              </>
            ))}
          <div className="container_photo_userName">
            <div className="userNmae_for_profile"> {name}</div>
          </div>

          <BsFillCameraFill
            className="icon_camera"
            onClick={() => setIsOpen(true)}
          />
          <Model
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            style={{
              overlay: {
                // backgroundColor:'transparent',
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                width: "550px",

                height: " 440px",
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                boxShadow: "-0.2px 1px 7px #dadcdf",
              },
            }}
          >
            <div className="modal_profile_picture">
              <div className="gap_tit_line">
                <div className="title_profile">Update profile picture</div>
                <div className="title_line_pic"> </div>
              </div>

              <div className="input_icon">
                <BsArrowDownSquareFill className="icon_arrow" />
                <input
                  type="file"
                  onChange={(e) => {
                    setPhoto(e.target.files[0]);
                  }}
                />
              </div>

              <div className="upload_icon">
                <BsArrowDownSquareFill className="icon_arrow" />
                <button
                  className="upload_button"
                  onClick={(e) => {
                    uploadPhoto();
                    e.target.style.background =
                      "linear-gradient(-45deg,#CAC531,#F3F9A7)";
                    e.target.style.color = "black";
                  }}
                >
                  {" "}
                  upload
                </button>
              </div>

              <div className="Save_icon">
                <BsArrowDownSquareFill className="icon_arrow" />
                <button
                  className="upload_button"
                  onClick={(e) => {
                    updatePhoto();
                    e.target.style.background =
                      "linear-gradient(-45deg,#CAC531,#F3F9A7)";
                    e.target.style.color = "black";
                  }}
                >
                  save
                </button>
              </div>
            </div>
          </Model>
        </div>
      </div>

      <div className="all_contain_profile">
        <div className="div_info_user">
          {info ? (
            info.map((element, i) => {
              return (
                <>
                  <div className="info_style">
                    <div className="word_info"> Intro</div>
                    <div className="lives">
                      <ImHome3 className="ic" /> lives in Amman - Jordan
                    </div>
                    <div className="country">
                      {" "}
                      <BsFillGeoAltFill className="ic" /> from {element.country}
                    </div>
                    <div className="age">
                      {" "}
                      <AiFillHourglass className="ic" />
                      Age {element.age}
                    </div>
                    <div className="gender">
                      {" "}
                      <BsFillPersonFill className="ic" /> {element.gender}
                    </div>
                    <div className="study">
                      {" "}
                      <FaUserGraduate className="ic" />
                      Studied at University of Jordan
                    </div>
                    <div className="love">
                      {" "}
                      <BsFillHeartFill className="ic" />
                      Single
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <></>
          )}
        </div>
        <div className="posts_and_create">
          <div
            className="click_new_post"
            onClick={(e) => {
              navigate("/newPost");
            }}
          >
            {info &&
              info.map((e, i) => (
                <div className="test">
                  <div className="user_imge">
                    <img
                      className="imge_whats"
                      src={e.image}
                      alt=""
                      width="100%"
                    />
                    <div className="whats_on">
                      {" "}
                      <div>Whats on your Mind</div> <div>{name}</div> ?
                    </div>
                  </div>
                  <div className="line_creatpost"></div>
                </div>
              ))}
          </div>
          {posts[0] ? (
            posts.map((element, i) => {
              return (
                <div className="Post" key={i}>
                  <div className="user_and_drop">
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
                        <div className="user_name">{element.user.userName}</div>
                      </Link>{" "}
                    </div>

                    {console.log("tezevvvvv", element.user._id)}
                    {console.log("ohhhh", userId)}
                    {console.log("noooooo", posts)}

                    {myId === element.user._id ? (
                      <>
                        <BsListUl
                          className="icon_drop"
                          onClick={() => setIsOpen2(true)}
                        />
                        <Model
                          isOpen={modalIsOpen2}
                          onRequestClose={() => setIsOpen2(false)}
                          style={{
                            overlay: {
                              // backgroundColor:'transparent',
                              position: "fixed",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                            },
                            content: {
                              top: "50%",
                              left: "50%",
                              right: "auto",
                              bottom: "auto",
                              marginRight: "-50%",
                              transform: "translate(-50%, -50%)",
                              width: "550px",

                              height: " 440px",
                              backgroundColor: "#ffffff",
                              borderRadius: "5px",
                              boxShadow: "-0.2px 1px 7px #dadcdf",
                            },
                          }}
                        >
                          <div className="style_dropdown">
                            <div className="edit_post">
                              <div className="update">
                                <div className="title_line_editPost">
                                  <div className="title_upadte">Edit post</div>
                                  <div className="line_edtiPost"></div>
                                </div>
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
                                        allPostsForUser();
                                      })
                                      .catch((err) => {
                                        console.log(err);
                                      });
                                  }}
                                >
                                  Save
                                </button>
                              </div>

                              <div className="Delete_post">
                                <div className="title_upadte">Delete Post</div>
                                <div className="line_edtiPost"></div>
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
                                          allPostsForUser();
                                          setIsOpen(false);
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        });
                                    }}
                                  >
                                    delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Model>{" "}
                      </>
                    ) : (
                      <div></div>
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
    </>
  );
};

export default Profile;
