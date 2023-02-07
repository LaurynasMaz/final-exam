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

   return (
      <PostContext.Provider
         value={{
            posts,
         }}
      >
         {children}
      </PostContext.Provider>
   );
}

export { PostProvider };
export default PostContext;