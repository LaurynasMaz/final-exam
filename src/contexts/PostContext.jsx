import { createContext, useState, useEffect } from "react";

const PostContext = createContext();

const PostProvider = ({ children }) => {

   const [posts, setPosts] = useState([])

   useEffect(() => {
      fetch('http://localhost:5000/posts')
         .then(response => response.json())
         .then(data => setPosts(data))
         .catch(error => console.log(error));
   }, []);
   const addNewPost = async (newPost) => {
      const response = await fetch('http://localhost:5000/posts', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(newPost),
      });
      const data = await response.json();
      setPosts([...posts, data]);
   };

   return (
      <PostContext.Provider
         value={{
            posts,
            addNewPost
         }}
      >
         {children}
      </PostContext.Provider>
   );
}

export { PostProvider };
export default PostContext;