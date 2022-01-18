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
import { Image } from "cloudinary-react";

const Profile = () => {
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

  const navigate = useNavigate();

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

  const getInfoUser = () => {
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((result) => {
        console.log("result Info:", result.data.Info);
        setInfo(result.data.Info);
        setName(result.data.Info[0].userName);
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
                  cloudName="dvg9eijgb"
                  src={e.image}
                  width="100%"
                />
              </>
            ))}
          <div className="container_photo_userName">
            <div className="userNmae_for_profile"> {name}</div>
          </div>
          <div className="just_to clear">
            <input
              type="file"
              onChange={(e) => {
                setPhoto(e.target.files[0]);
              }}
            />

            <button
              onClick={() => {
                uploadPhoto();
              }}
            >
              {" "}
              upload
            </button>
            <button onClick={updatePhoto}> save</button>
          </div>
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
                      className="imge"
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

                    <div className="dropdown">
                      <div className="dropbtn">
                        <BsListUl className="BsListUl" />
                        <i className="fa fa-caret-down"></i>
                      </div>

                      <div className="dropdown-content">
                        <div className="style_dropdown">
                          {userId == element.user._id ? (
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
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                }}
                              >
                                delete{" "}
                              </button>
                            </div>
                          ) : (
                            <></>
                          )}

                          {userId == element.user._id ? (
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
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>
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
            <div className="No">No Posts</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
