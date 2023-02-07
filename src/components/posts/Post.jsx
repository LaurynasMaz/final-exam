import UserContext from "../../contexts/UserContext";
import PostContext from "../../contexts/PostContext";
import { useContext } from "react";



const Post = ({data}) => {

   const { users, loggedInUser } = useContext(UserContext);
   const { posts } = useContext(PostContext)

   const postOwner = users.find(user => user.id === data.userId);

   
   return (
      <div className="postCard">
         {postOwner && (
            <>
               <img
                  src={postOwner.avatar}
                  alt="user avatar"
                  style={{width:'30px', height:'30px'}}

               />
               <span>{postOwner.username}</span>
            </>
         )}
         <h1>{data.title}</h1>
         <p>{data.question}</p>
      </div>
   );
}
 
export default Post;