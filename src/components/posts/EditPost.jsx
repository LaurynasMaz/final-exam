import PostContext from "../../contexts/PostContext";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



const EditPost = () => {

   const { id } = useParams();

   const { posts, updatePost } = useContext(PostContext);

   const currentPost = posts.find(post => post.id.toString() === id)

   const navigation = useNavigate();

   const [formInputs, setFormInputs] = useState({
      title: currentPost.title,
      question: currentPost.question
   });

   const handleSubmit = e => {
      e.preventDefault();
      
      updatePost(id, {
         ...formInputs,
         lastEditTimestamp: new Date().toLocaleString('LT')
      });
      
      navigation('/');
   }

   return (
      <main className='form-container'>

         <form onSubmit={handleSubmit}>
            <label>
               Title:
               <input type="text" name="title"
                  value={formInputs.title}
                  onChange={(e) => setFormInputs({...formInputs, title:e.target.value})}
               />
            </label>
            <label>
               Question:
               <textarea name="question"
                  value={formInputs.question}
                  onChange={(e) => setFormInputs({...formInputs, question:e.target.value})}
               />
            </label>
            <div className="buttonClass">
               <button type="submit">Edit Post</button>
            </div>
            
         </form>
      </main>
   );
}
 
export default EditPost;