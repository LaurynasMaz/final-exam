import React, { useContext, useState , useEffect} from 'react';
import AnswerContext from '../../contexts/AnswerContext';
import UserContext from '../../contexts/UserContext';
import EditAnswer from './EditAnswer';
import { nanoid } from 'nanoid';

const Answers = ({ postId }) => {
   const { answers, fetchAnswers, addNewComment, deleteAnswer } = useContext(AnswerContext);
   const { users, loggedInUser } = useContext(UserContext);
   const [formInputs, setFormInputs] = useState({
      comment:''
   });
   
   useEffect(() => {
      fetchAnswers(postId);
   }, []);

   const handleSubmit = e => {
      e.preventDefault();
      const newComment = {
         id: nanoid(),
         postId,
         userId: loggedInUser.id,
         comment: formInputs.comment,
         timeStamp: new Date().toLocaleString('LT')
      };
      addNewComment(newComment);
   };
      return (
         <div>
            {loggedInUser && (
               <form onSubmit={handleSubmit}>
                  <textarea type="text" value={formInputs.comment} onChange={(e) => setFormInputs({ ...formInputs, comment: e.target.value })} />
                  <button type="submit">Submit</button>
               </form>
            )}
            {answers.map(answer => {
               if(answer.postId.toString() !== postId) return;
      
               return answer && (
                  <div key={answer.answerId}>
                     {answer. id && users && (
                        <>
                        <img alt="user avatar"
                           style={{width:'30px', height:'30px'}} 
                           src={users.find(user => user.id === answer.userId).avatar} />
                        <span>{users.find(user => user.id === answer.userId).username}</span>
                        </>
                     )}
                     <p>{answer.comment}</p>
                     <small>{answer.timeStamp}</small>
                     <br />
                     <small>{answer.updatedTimestamp}</small>
                     {loggedInUser && loggedInUser.id === answer.userId && (
                        <>
                           <EditAnswer answerId={answer.id} />
                           <button onClick={() => deleteAnswer(answer.id)}>Delete</button>
                        </>
                     )}
                  </div>
               );
            })}  
         </div>
      );
};

export default Answers;
