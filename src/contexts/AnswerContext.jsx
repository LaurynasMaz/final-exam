import React, { createContext, useState, useEffect } from "react";

const AnswerContext = createContext();

const AnswerProvider = ({ children  }) => {

   const [answers, setAnswers] = useState([]);

   const fetchAnswers = () => {
      fetch(`http://localhost:5000/answers/`)
         .then(response => response.json())
         .then(data => setAnswers(data))
         .catch(error => console.log(error));
   };
   const addNewComment = async (newComment) => {
      console.log(newComment)
      await fetch('http://localhost:5000/answers', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(newComment),
      });

      setAnswers([...answers, newComment]);
   };
   
   useEffect(() => {
      fetchAnswers();
   }, []);
   return (
         <AnswerContext.Provider 
            value={{
               answers,
               setAnswers,
               fetchAnswers,
               addNewComment
               }}
            >
         {children}
         </AnswerContext.Provider>
   );
};

export { AnswerProvider };
export default AnswerContext;