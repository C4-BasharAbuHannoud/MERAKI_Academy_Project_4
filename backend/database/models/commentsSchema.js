const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: { type: String },
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});

module.exports = mongoose.model("Comment", commentSchema);
