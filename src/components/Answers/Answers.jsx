import React, { useContext, useState, useEffect } from 'react';
import AnswerContext from '../../contexts/AnswerContext';
import UserContext from '../../contexts/UserContext';
import EditAnswer from './EditAnswer';
import { nanoid } from 'nanoid';
import '../../styles/answer.css'

const Answers = ({ postId }) => {
   const { answers, fetchAnswers, addNewComment, deleteAnswer } = useContext(AnswerContext);
   const { users, loggedInUser } = useContext(UserContext);
   const [formInputs, setFormInputs] = useState({
      comment: ''
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
         timeStamp: new Date().toLocaleString('LT'),
      };
      addNewComment(newComment);
      setFormInputs({ comment: '' });
   };
   return (
      <div className='answers'>

         {loggedInUser && (
            <form className='answerTextArea' onSubmit={handleSubmit}>
               <textarea type="text" value={formInputs.comment} onChange={(e) => setFormInputs({ ...formInputs, comment: e.target.value })} />
               <button type="submit">Submit</button>
            </form>
         )}

         {answers.map(answer => {
            if (answer.postId.toString() !== postId) return;

            return answer && (
               <div key={answer.answerId} className='answer' >
                  {answer.id && users && (
                     <div className='user'>
                        <img alt="user avatar"
                           style={{ width: '30px', height: '30px' }}
                           src={users.find(user => user.id === answer.userId).avatar} />
                        <span>{users.find(user => user.id === answer.userId).username}</span>
                     </div>
                  )}
                  <p>{answer.comment}</p>
                  <div className='time'>
                     <small>{answer.timeStamp}</small>
                     <small>Edited: {answer.updatedTimestamp}</small>
                  </div>
                  {loggedInUser && loggedInUser.id === answer.userId && (
                     <>
                        <div className='button'>
                           <EditAnswer answerId={answer.id} />
                           <button onClick={() => deleteAnswer(answer.id)}>Delete</button>
                        </div>
                     </>
                  )}
               </div>
            );
         })}
      </div>
   );
};

export default Answers;
