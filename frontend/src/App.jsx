// src/App.js
import { useEffect, useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import { fetchPosts } from "./service/api";
import "./App.css";

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

  return (
    <div className="app">
      <h1>Real-Time Blog</h1>
      <PostForm setPosts={setPosts} posts={posts} />
      <PostList posts={posts} setPosts={setPosts} />
    </div>
  );
};

export default App;
