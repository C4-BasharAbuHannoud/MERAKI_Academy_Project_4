import axios from "axios";

import React, { useState, useEffect } from "react";

import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { BsChatDots, BsListUl,BsPinFill ,BsFillHeartFill,BsFillGeoAltFill,BsFillPersonFill} from "react-icons/bs";
import { AiFillApple, AiFillDelete,AiFillHourglass} from "react-icons/ai";
import { ImHome3 } from "react-icons/im";
import { FaUserGraduate } from "react-icons/fa";


const Profile = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const token = localStorage.getItem("token");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
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
        setName(result.data.posts[0].user.userName);
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
          <img
            className="cover"
            src="http://iamfearlesssoul.com/wp-content/uploads/2016/11/facebook-SOUL-dont-give-up-VH.jpg"
          />
          <img
            className="photo_profile"
            src="https://scontent.famm6-1.fna.fbcdn.net/v/t1.6435-9/173242211_1092876921199476_1246742746665098615_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeGzItc6qhQkw4J8sAgifUczBll5eW2af4QGWXl5bZp_hOgattAfVKALj5FpOvmqtGUFX6Us09fBVbXtfbfjYxDA&_nc_ohc=f4ADnImphcgAX8ev_WN&_nc_ht=scontent.famm6-1.fna&oh=00_AT8GIw4pnr6Hrcn8QA5fc0SQhAscsA_Sx9X3h_m1Ch6DrA&oe=62090139"
            width="100%"
          />

          <div className="container_photo_userName">
            <div className="userNmae_for_profile">{name}</div>
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
                    <div className="lives"><ImHome3 className="ic"/> lives in Amman - Jordan</div>
                    <div className="country" > <BsFillGeoAltFill className="ic"/> from {element.country}</div>
                    <div className="age"> <AiFillHourglass className="ic"/>Age {element.age}</div>
                       <div className="gender"> <BsFillPersonFill className="ic"/> {element.gender}</div>
                    <div className="study"> <FaUserGraduate className="ic"/>Studied at University of Jordan</div>
                    <div className="love"> <BsFillHeartFill className="ic"/>Single</div>

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
            <div className="test">
              <div className="user_imge">
                <img
                  className="imge"
                  src="https://www.everblazing.org/wp-content/uploads/2017/06/avatar-372-456324-300x300.png"
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
          </div>
          {posts ? (
            posts.map((element, i) => {
              return (
                <div className="Post" key={i}>
                  <div className="user_and_drop">
                    <div className="user_imge">
                      <img
                        className="imge"
                        src="https://www.everblazing.org/wp-content/uploads/2017/06/avatar-372-456324-300x300.png"
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
                        {/* <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Woohoo, you're reading this text in a modal!
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal> */}

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
