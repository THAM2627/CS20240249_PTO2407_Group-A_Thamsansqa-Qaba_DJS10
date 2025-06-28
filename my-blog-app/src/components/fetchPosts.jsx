import { useState, useEffect } from 'react';

function fetchPosts() {
  // State to store the fetched blog posts; store errors, and loading status
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

    // useEffect hook to fetch data when the component mounts
    useEffect(() => {
        // We define an async function inside the effect to use await
        const fetchPosts = async () => {
          try {
            // API for fetching posts
            const apiUrl = 'https://jsonplaceholder.typicode.com/postss';
            const response = await fetch(apiUrl);
    
            // Check if the API response is "ok". If not, throw an error.
            if (!response.ok) {
              throw new Error(`HTTP error! status:"Data Fecthing Failed"`);
            }
    
            const data = await response.json();
            setPosts(data);
          } catch (e) {
            // check if it's an error object and get its message.
            if (e instanceof Error) {
              setError(e.message);
            } else {
              setError('An unknown error occurred.');
            }
          } finally {
            // We set loading to false once the fetch attempt is complete.
            setIsLoading(false);
          }
        };

        fetchPosts();
    }, []);
  
    // Display a loading message while fetching data
    if (isLoading) {
      return <div>Loading posts...</div>;
    }
  
    // If an error occurred, display the error message
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    // If the fetch was successful, display the posts
    return (
      <div className="App">
        <h1>Blog Posts</h1>
        <div>
          {posts.map((post,index) => (
            <div key={post.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '20px', paddingBottom: '10px' }}>
              <h2>{index + 1}.{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    ); 
};

export default fetchPosts;