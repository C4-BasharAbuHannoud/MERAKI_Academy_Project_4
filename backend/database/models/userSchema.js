require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: { type: String,unique: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender:{type:String,required:true},
  age: { type: Number },
  country: { type: String },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

module.exports = mongoose.model("Users", userSchema);
