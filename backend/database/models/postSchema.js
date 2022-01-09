const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  date:{ type: Date, default: Date.now },
  role:{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }
});

module.exports = mongoose.model("Posts", postSchema);
