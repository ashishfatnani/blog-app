const express = require("express");
const { getPosts, createPost, deletePost } = require("../controllers/post");

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.delete("/:id", deletePost);

module.exports = router;
