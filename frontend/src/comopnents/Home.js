import axios from "axios";
import React, { useState, useEffect } from "react";
import { Routes, useParams, Link, useNavigate } from "react-router-dom";
import { BsChatDots, BsListUl, BsCloudFill } from "react-icons/bs";
import { AiFillApple, AiFillDelete } from "react-icons/ai";
import { WiThermometer } from "react-icons/wi";
import "react-dropdown/style.css";
import "@progress/kendo-theme-default/dist/all.css";
import Model from "react-modal";
Model.setAppElement("#root");

const articles = [
  {
    title:
      "Tesla přechází na AMD Ryzen. Vyšší výkon infotainmentu je vykoupen kratším dojezdem",

    urlToImage:
      "https://www.cnews.cz/wp-content/uploads/2022/01/Tesla_AMD_Ryzen-infotainment.jpg",
  },
  {
    title: "2:00PM Water Cooler 1/19/2022",

    urlToImage:
      "https://www.nakedcapitalism.com/wp-content/uploads/2022/01/covid-cases-regions-11.png",
  },
  {
    title:
      "Primo caso di incidente grave con Autopilot: un proprietario Tesla accusato di omicidio stradale",

    urlToImage: "https://www.hwupgrade.it/i/n/AzizMain.jpg",
  },
  {
    title: "Az LMBTQ-ideológia a brüsszeli birodalomépítés egyik eszköze",

    urlToImage:
      "https://cdn.nwmgroups.hu/s/img/i/2111/20211128lmbtq-szivarvanyos-zaszlo.jpg",
  },
];

const Home = ({ setMyId, setAllUsersSearch, toEditPost }) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [postsPage, setPostsPage] = useState([]);
  const [description, setDescription] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [weather, setWeather] = useState([]);

  const [news, setNews] = useState([]);
  const [modalIsOpen7, setIsOpen7] = useState(false);

  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
    getAllPosts();
    getWeather();
    getAllNews();
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
        setPostsPage(result.data.posts.reverse());
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

        setName(result.data.Info[0].userName);
        setUserId(result.data.Info[0]._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllUsers = async () => {
    await axios
      .get("http://localhost:5000/users/all/users", {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      })
      .then((result) => {
        setAllUsers(result.data.users);
        setAllUsersSearch(result.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllNews = () => {
    axios
      .get(
        "https://newsdata.io/api/1/news?apikey=pub_3855a9fade903181c8ad90a7bd2540b91bd2&q=battlegrounds"
      )
      .then((result) => {
        setNews(result.data.results.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getWeather = () => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/forecast?q=jordan&APPID=6557810176c36fac5f0db536711a6c52"
      )
      .then((result) => {
        setWeather(result.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("wwww", weather);
  console.log(postsPage);
  return (
    <div>
      <div className="contain_all_home">
        <div className="left_home">
          <div className="left_flex_cloumn">
            {info &&
              info.map((e, i) => (
                <>
                  <div className="userName_andImg_for_homePage" key={i}>
                    <img className="imge" src={e.image} alt="" width="100%" />

                    <Link className="linkFrined" to={`/profile/${e._id}`}>
                      <div className="userName_for_homePage">{e.userName}</div>
                    </Link>
                  </div>
                </>
              ))}

            <div className="suggtion_frined">
              <div className="title_suggtion">Suggestions</div>{" "}
              <div className="may_suggtion">People You May Know</div>
              <div className="gap_frined">
                {allUsers ? (
                  allUsers.map((e, i) => (
                    <>
                      {userId !== e._id ? (
                        <div className="frined" key={i}>
                          <img
                            className="imge_sugg"
                            src={e.image}
                            alt=""
                            width="100%"
                          />
                          <Link className="linkFrined" to={`/profile/${e._id}`}>
                            <div className="user_name_sug">{e.userName}</div>
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="middle_home">
          <div
            className="click_new_post"
            onClick={(e) => {
              navigate("/newPost");
            }}
          >
            {info &&
              info.map((item, i) => (
                <div className="test" key={i}>
                  <div className="user_imge">
                    <img
                      className="imge_whats"
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
            {postsPage ? (
              postsPage.map((element, i) => {
                console.log("soso", element._id);

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
                        <>
                          <BsListUl
                            className="icon_drop"
                            onClick={() => setIsOpen7(true)}
                          />

                          <Model
                            isOpen={modalIsOpen7}
                            onRequestClose={() => setIsOpen7(false)}
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
                                    <div className="title_upadte">
                                      Edit post
                                    </div>
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
                                  {console.log("tsetttt 44444", element._id)}
                                  <button
                                    className="button_update"
                                    onClick={(e) => {
                                      console.log("tsetttt", element._id);

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

                                <div className="Delete_post">
                                  <div className="title_upadte">
                                    Delete Post
                                  </div>
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
                                            getAllPosts();
                                            setIsOpen7(false);
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
                          </Model>
                        </>
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

        <div className="rigth_home">
          <div className="weather">
            {weather &&
              weather.map((ele, i) => (
                <>
                  {ele.dt == 1642939200 ? (
                    <>
                      {" "}
                      <div className="status">
                        <BsCloudFill className="cloud_icon" />

                        <div>Cloudy</div>
                      </div>
                      <div className="temp">
                        <div className="flex_row_temp">
                          <div className="style_temp">
                            {" "}
                            <div>
                              {" "}
                              <WiThermometer className="icon_thermo" />
                            </div>{" "}
                            <div className="fehr"> {ele.main.temp}F</div>{" "}
                          </div>

                          <div className="humidty">
                            humidity {ele.main.humidity}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ))}
          </div>

          <div className="News">
            <div className="News_face_title"> News</div>
            <div className="line_News"> </div>

            <div id="slider">
              {articles &&
                articles.map((e, i) => (
                  <>
                    <div className="figure">
                      <div className="title_News">{e.title}</div>
                      <img className="img_news" src={e.urlToImage} />
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
