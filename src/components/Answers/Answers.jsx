import React, { useContext, useEffect } from 'react';
import AnswerContext from '../../contexts/AnswerContext';
import UserContext from '../../contexts/UserContext';

const Answers = ({ postId }) => {

   const { answers, fetchAnswers } = useContext(AnswerContext);
   const { users } = useContext(UserContext);
   
   useEffect(()=>{
      fetchAnswers(postId);
   }, [])

   return (
      <div>
         {answers && answers.length !== 0 && answers.map(answerObject => (

            answerObject.map(answer =>
               <div key={answer.questionId}>
               {answer.questionId && users && (
                  <>
                     {users.find(user => user.id === answer.userId) && (
                        <>
                           <img alt="user avatar"
                            style={{width:'30px', height:'30px'}} 
                            src={users.find(user => user.id === answer.userId).avatar} />
                           <span>{users.find(user => user.id === answer.userId).username}</span>
                        </>
                     )}
                  </>
               )}
               <p>{answer.comment}</p>
               </div>
            )
            
         ))}
      </div>
   );
};

export default Answers;
