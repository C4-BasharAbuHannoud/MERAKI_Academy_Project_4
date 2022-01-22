const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  description: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  // image : {type:String},
  date: { type: Date, default: Date.now },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

module.exports = mongoose.model("Posts", postSchema);
