import PostContext from "../../contexts/PostContext";
import UserContext from "../../contexts/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

const NewPost= () => {

   const [formInputs, setFormInputs] = useState({
      title: '',
      question: ''
   });

   const { addNewPost } = useContext(PostContext);
   const { loggedInUser } = useContext(UserContext);

   const navigation = useNavigate();

   const handleSubmit = e => {
      e.preventDefault();
      const newPost = {
         id: nanoid(),
         userId: loggedInUser.id,
         title: formInputs.title,
         question: formInputs.question,
         timeStamp: new Date().toLocaleString('LT'),
         likes: []
      };

      addNewPost(newPost);

      navigation('/');
   }

   return (
      <main>
         <form onSubmit={handleSubmit} className='form-container'>
            <label>
               Title:
               <input type="text" name="title"
                  value={formInputs.title}
                  onChange={(e) => setFormInputs({...formInputs, title:e.target.value})}
               />
            </label>
            <label>
               Question:
               <textarea  name="question"
                  value={formInputs.question}
                  onChange={(e) => setFormInputs({...formInputs, question:e.target.value})}
               />
            </label>
            <div className="buttonClass">
               <button type="submit">Add new Post</button>
            </div>
         </form>
      </main >
   );
}
 
export default NewPost;