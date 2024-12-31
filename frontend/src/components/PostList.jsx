// src/components/PostList.js
import PostItem from "./PostItem";

const PostList = ({ posts, setPosts }) => {
  return (
    <div className="post-list">
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
        <div>No posts created</div>
      )}
    </div>
  );
};

export default PostList;
