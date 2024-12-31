const API_URL = "http://localhost:5000";

// Fetch posts
export const fetchPosts = async () => {
  const response = await fetch(`${API_URL}/posts`);
  return response.json();
};

// Create a new post
export const createPost = async (postData) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });

  await fetchPosts();
  return response.json();
};

// Delete a post
export const deletePost = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
  });
  await fetchPosts();
  return response.json();
};
