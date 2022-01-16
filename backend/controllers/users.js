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

const getInfoUser =(req,res)=>{
  let id = req.params.info;
  userModel
    .findById(id)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: `The User ${id} `,
        Info:[result],
      });

    
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        massage: `The User ==> ${id} Not Found`,
      });
    });
}

module.exports = {
  createNewUser,
  getInfoUser
};
