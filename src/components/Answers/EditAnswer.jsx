import React, { useContext, useState } from 'react';
import AnswerContext from '../../contexts/AnswerContext';
import UserContext from '../../contexts/UserContext';

const EditAnswer = ({ answerId }) => {
   const { answers, updateAnswer, updatedTimestamp } = useContext(AnswerContext);
   const { loggedInUser } = useContext(UserContext);
   const [formInputs, setFormInputs] = useState({
      comment: ''
   });
   const [showTextArea, setShowTextArea] = useState(false);

   const currentAnswer = answers.find(answer => answer.id === answerId);

   let handleSubmit = async e => {
      e.preventDefault();
      if (loggedInUser.id !== currentAnswer.userId) {
         return;
      }
      await updateAnswer(answerId,
          { comment: formInputs.comment ,
            updatedTimestamp});
      await updateAnswer(answerId);
         setShowTextArea(false);
   };

   return (
      <>
         <button type="button" onClick={() => setShowTextArea(true)}>Edit</button>
         {showTextArea && (
            <form onSubmit={handleSubmit}>
               <textarea
                  type="text"
                  value={formInputs.comment}
                  onChange={e => setFormInputs({ ...formInputs, comment: e.target.value })}
               />
               <button type="submit">Submit</button>
            </form>
         )}
      </>
   );
};


export default EditAnswer;