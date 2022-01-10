require("dotenv").config();
const userModel = require("../database/models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let checkEmail = [];
const login = (req, res) => {
  const { email, password } = req.body;

  userModel
    .findOne({ email })
    .then((resultArr) => {
      bcrypt.compare(password, resultArr.password, (err, result) => {
        if (result) {
          const payload = {
            userId: resultArr._id,
            country: resultArr.country,
            userName: resultArr.userName,
          };

          const options = {
            expiresIn: "24h",
          };

          const token = jwt.sign(payload, process.env.SECRET, options);

          checkEmail.push(resultArr.email);
          res.status(200).json({
            success: true,
            massage: " Valid login credentials",
            token,
          });
        } else {
          res.status(403).json({
            success: false,
            message: "The password you’ve entered is incorrect",
          });
        }
      }); 

      checkEmail = [];
    })
    .catch((err) => {
      if (checkEmail.length == 0) {
        res.status(404).json({
          success: false,
          massage: "The email doesn't exist",
        });
      } else {
        res.json(err);
      }
    });
};

module.exports = {
  login,
};
