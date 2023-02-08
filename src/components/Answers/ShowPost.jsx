import Post from "../posts/Post";
import PostContext from "../../contexts/PostContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Answers from "./Answers";

const ShowPost = () => {
   const { posts } = useContext(PostContext)
   const [postData, setPostData] = useState(null)
   const { id } = useParams();

   const getPostData = () =>{
      const postData = posts.find(post => post.id.toString() === id);
      setPostData(postData)
   }

   useEffect(()=>{
      getPostData();
   }, [])

   return ( 
      <>
      {postData &&
         <Post data={postData} />
         
      }
         <Answers postId={id} />
         
      </>
    );
}
 
export default ShowPost;