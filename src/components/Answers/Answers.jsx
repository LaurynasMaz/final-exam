import React, { useContext, useEffect } from 'react';
import AnswerContext from '../../contexts/AnswerContext';
import UserContext from '../../contexts/UserContext';


const Answers = ({ postId }) => {
   const { answers, fetchAnswers } = useContext(AnswerContext);
   const { users } = useContext(UserContext);
   
   useEffect(() => {
      fetchAnswers(postId);
   }, [])

   return (
      <div>
       {answers.map(answer => {
         if(answer.postId.toString() !== postId) return;

         return answers && (
            <div key={answer.answerId}>
               {answer.questionId && users && (
                  <>
                  <img alt="user avatar"
                     style={{width:'30px', height:'30px'}} 
                     src={users.find(user => user.id === answer.userId).avatar} />
                  <span>{users.find(user => user.id === answer.userId).username}</span>
                  </>
               )}
               <p>{answer.comment}</p>
            </div>
         );
      })}  
   </div>
   );
};

export default Answers;



