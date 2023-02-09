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
   const updatePost = async (id, updatedPost) => {

      let postObject =  getCurrentPostObject(id);
      postObject = {...postObject, ...updatedPost};

      await fetch(`http://localhost:5000/posts/${id}`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(postObject)
      });

      setPosts(posts.map(post => post.id.toString() === postObject.id.toString() ? postObject : post));
   };

   const getCurrentPostObject = (id) => {
      return posts.find(post => post.id.toString() === id.toString());
   }
   const deletePost = async (id) => {
      await fetch(`http://localhost:5000/posts/${id}`, {
         method: 'DELETE',
      });
      setPosts(posts.filter(post => post.id !== id));
   };
   const likePost = async (id, userId) => {
      const post = getCurrentPostObject(id);
      if (!post.likes.includes(userId)) {
        post.likes.push(userId);
        await fetch(`http://localhost:5000/posts/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(post)
        });
        setPosts(posts.map(post => post.id === id ? post : post));
      }
    };
    const unlikePost = async (id, userId) => {
      const post = getCurrentPostObject(id);
      const index = post.likes.indexOf(userId);
      if (index !== -1) {
        post.likes.splice(index, 1);
        await fetch(`http://localhost:5000/posts/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(post)
        });
        setPosts(posts.map(post => post.id === id ? post : post));
      }
    };

   return (
      <PostContext.Provider
         value={{
            posts,
            addNewPost,
            updatePost,
            deletePost,
            likePost,
            unlikePost
         }}
      >
         {children}
      </PostContext.Provider>
   );
}

export { PostProvider };
export default PostContext;