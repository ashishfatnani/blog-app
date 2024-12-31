import PostItem from "./PostItem";

const PostList = ({ posts, setPosts }) => {
  const postListStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
  };

  const noPostsStyle = {
    fontSize: "1.2rem",
    color: "#777",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div className="post-list" style={postListStyle}>
      {posts.length ? (
        posts.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            setPosts={setPosts}
            totalPosts={posts}
          />
        ))
      ) : (
        <div style={noPostsStyle}>No posts created</div>
      )}
    </div>
  );
};

export default PostList;
