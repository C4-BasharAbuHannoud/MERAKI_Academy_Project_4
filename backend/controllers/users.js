require("dotenv").config();
const userModel = require("../database/models/userSchema");

//1- Creat an new user
const createNewUser = (req, res) => {
  const { userName, email, password,gender,age, country, role } = req.body;

  const newUser = new userModel({
    userName,
    email,
    password,
    gender,
    age,
    country,
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
      if (err.code == 11000) {
        res
          .status(409)
          .json({ success: false, massage: `The email or userName already exists` });
      } else {
        res.json(err);
      }
    });
};

module.exports = {
  createNewUser,
};
