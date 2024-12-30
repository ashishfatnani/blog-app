const Post = require("../models/Post");

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ datetime: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new post
const createPost = async (req, res) => {
  const { username, content } = req.body;
  try {
    const newPost = await Post.create({ username, content });
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a post by ID
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.json({ id, deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getPosts, createPost, deletePost };
