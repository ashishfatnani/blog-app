// src/components/PostItem.js
import { deletePost } from "../service/api";
import { toast, ToastContainer } from "react-toastify";

const PostItem = ({ post, setPosts, totalPosts }) => {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmed) {
      const deleteResposne = await deletePost(post._id);
      if (deleteResposne?.deleted) {
        setPosts(totalPosts.filter((item) => item._id != post._id));
        toast("Deleted the post successfully !");
      }
    }
  };

  return (
    <div className="post-item">
      <ToastContainer />
      <h3>{post.username}</h3>
      <p>{post.content}</p>
      <small>{new Date(post.datetime).toLocaleString()}</small>
      <button className="delete-btn" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default PostItem;
