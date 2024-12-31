// src/components/PostForm.js
import { useState } from "react";
import { createPost } from "../service/api";
import { toast, ToastContainer } from "react-toastify";

const PostForm = ({ setPosts, posts }) => {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && content) {
      const createResposne = await createPost({ username, content });
      if (createResposne?.content) {
        setPosts([...posts, createResposne]);
        setUsername("");
        setContent("");
        toast("Post created successfully");
      }
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <ToastContainer />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
