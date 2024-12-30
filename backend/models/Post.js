const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  username: { type: String, required: true },
  datetime: { type: Date, default: Date.now },
  content: { type: String, required: true },
});

module.exports = mongoose.model("Post", PostSchema);
