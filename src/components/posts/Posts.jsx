import PostContext from "../../contexts/PostContext";
import { useContext, useState } from "react";
import Post from "./Post";

const Posts = () => {
   const { posts } = useContext(PostContext);
   const [sortBy, setSortBy] = useState("oldest");

   const sortedPosts = [...posts].sort((a, b) => {
      if (sortBy === "oldest") {
         return new Date(a.timeStamp) - new Date(b.timeStamp);
      } else {
         return new Date(b.timeStamp) - new Date(a.timeStamp);
      }
   });

   return (
      <>
         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="oldest">From Oldest to Newest</option>
            <option value="newest">From Newest to Oldest</option>
         </select>
         {
            sortedPosts.map(post => 
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