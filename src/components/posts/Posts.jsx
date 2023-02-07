import PostContext from "../../contexts/PostContext";
import { useContext } from "react";
import Post from "./Post";

const Posts = () => {

   const { posts } = useContext(PostContext);

   return (
      <>
         {
            posts.map(post => 
               <Post 
                  key={post.id}
                  data={post}
               />  
            )
         }
      </>
   );
}
 
export default Posts;