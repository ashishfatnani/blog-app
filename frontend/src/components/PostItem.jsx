import { deletePost } from "../service/api";
import { toast, ToastContainer } from "react-toastify";

const PostItem = ({ post, setPosts, totalPosts }) => {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmed) {
      const deleteResponse = await deletePost(post._id);
      if (deleteResponse?.deleted) {
        setPosts(totalPosts.filter((item) => item._id !== post._id));
        toast("Deleted the post successfully!");
      }
    }
  };

  // Inline styles for better UI
  const postItemStyle = {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "15px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
  };

  const postHeaderStyle = {
    fontSize: "1.2rem",
    color: "#333",
    marginBottom: "10px",
  };

  const postContentStyle = {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "10px",
  };

  const postFooterStyle = {
    fontSize: "0.85rem",
    color: "#888",
    marginBottom: "10px",
  };

  const deleteButtonStyle = {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.2s",
  };

  const deleteButtonHoverStyle = {
    backgroundColor: "#c0392b",
  };

  return (
    <div
      className="post-item"
      style={postItemStyle}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <ToastContainer />
      <h3 style={postHeaderStyle}>{post.username}</h3>
      <p style={postContentStyle}>{post.content}</p>
      <small style={postFooterStyle}>
        {new Date(post.datetime).toLocaleString()}
      </small>
      <button
        style={deleteButtonStyle}
        onMouseEnter={(e) =>
          (e.target.style.backgroundColor =
            deleteButtonHoverStyle.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = deleteButtonStyle.backgroundColor)
        }
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default PostItem;
