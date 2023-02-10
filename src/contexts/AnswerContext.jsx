import React, { createContext, useState, useEffect } from "react";

const AnswerContext = createContext();

const AnswerProvider = ({ children }) => {

   const [answers, setAnswers] = useState([]);

   const fetchAnswers = () => {
      fetch(`http://localhost:5000/answers/`)
         .then(response => response.json())
         .then(data => setAnswers(data))
         .catch(error => console.log(error));
   };
   useEffect(() => {
      fetchAnswers();
   }, []);
   const addNewComment = async (newComment) => {
      await fetch('http://localhost:5000/answers', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(newComment),
      });

      setAnswers([...answers, newComment]);
   };
   const updateAnswer = async (id, updatedAnswer) => {

      let answerObject = getCurrentAnswerObject(id);
      answerObject = { ...answerObject, ...updatedAnswer };

      answerObject.updatedTimestamp = new Date().toLocaleString('LT')

      await fetch(`http://localhost:5000/answers/${id}`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(answerObject)
      });

      setAnswers(answers.map(answer => answer.id === id ? answerObject : answer));
   };

   const getCurrentAnswerObject = (id) => {
      return answers.find(answer => answer.id === id);
   }
   const deleteAnswer = async (id) => {
      await fetch(`http://localhost:5000/answers/${id}`, {
         method: 'DELETE',
      });
      setAnswers(answers.filter(answer => answer.id !== id));
   };

   return (
      <AnswerContext.Provider
         value={{
            answers,
            setAnswers,
            fetchAnswers,
            addNewComment,
            updateAnswer,
            deleteAnswer
         }}
      >
         {children}
      </AnswerContext.Provider>
   );
};

export { AnswerProvider };
export default AnswerContext;