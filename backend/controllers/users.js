require("dotenv").config();
const userModel = require("../database/models/userSchema");

//1- Creat an new user
const createNewUser = (req, res) => {
  const { userName, email, password, gender, age, country, role, image } =
    req.body;

  const newUser = new userModel({
    userName,
    email,
    password,
    gender,
    age,
    country,
    image,
    role,
  });

  newUser
    .save()
    .then((result) => {
      res.json({
        success: true,
        massage: " Success User Added",
        author: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};

const getInfoUser = (req, res) => {
  let id = req.params.info;
  userModel
    .findById(id)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: `The User ${id} `,
        Info: [result],
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        massage: `The User ==> ${id} Not Found`,
      });
    });
};

const updateImage = (req, res) => {
  const userId = req.params.image;
  // const { image } = req.body;

  userModel
    .findByIdAndUpdate(userId, req.body, { new: true })
    .then((result) => {
      if (result == null) {
        return res.status(404).json({
          success: false,
          massage: `The image ==> ${userId} Not Found`,
        });
      }
      res.status(202).json({
        success: true,
        massage: `Success Image updated`,
        image: result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        massage: `The Image for ==> ${userId} Not Found`,
        err,
      });
    });
};

const getAllUsers = (req, res) => {

  const userId = req.token.userId;
  userModel
    .find({})
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "All the Users",
        userId: userId,
        users: result,
      });
    })
    .catch((err) => {
      res.status(500).json({ success: false, massage: "server error" });
    });
};

module.exports = {
  createNewUser,
  getInfoUser,
  updateImage,
  getAllUsers,
};
