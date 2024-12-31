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

  // Inline styles
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    fontSize: "1rem",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    outline: "none",
  };

  const textareaStyle = {
    ...inputStyle,
    resize: "none",
    height: "100px",
  };

  const buttonStyle = {
    fontSize: "1rem",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <ToastContainer />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={inputStyle}
      />
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={textareaStyle}
      />
      <button
        type="submit"
        style={{
          ...buttonStyle,
          ...(username && content ? buttonHoverStyle : {}),
        }}
      >
        Post
      </button>
    </form>
  );
};

export default PostForm;
