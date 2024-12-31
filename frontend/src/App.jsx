import { useEffect, useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import { fetchPosts } from "./service/api";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch initial posts
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    getPosts();

    // Set up WebSocket
    const socket = new WebSocket("ws://localhost:5000");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "newPost") {
        setPosts((prevPosts) => [...prevPosts, data.payload]);
      } else if (data.type === "deletePost") {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== data.payload.id)
        );
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  // Inline styles
  const appStyle = {
    fontFamily: "'Arial', sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const headerStyle = {
    textAlign: "center",
    fontSize: "2rem",
    color: "#333",
    marginBottom: "20px",
  };

  return (
    <div style={appStyle}>
      <h1 style={headerStyle}>Real-Time Blog</h1>
      <PostForm setPosts={setPosts} posts={posts} />
      <PostList posts={posts} setPosts={setPosts} />
    </div>
  );
};

export default App;
