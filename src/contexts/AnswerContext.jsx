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
   
   useEffect(() => {
      fetchAnswers();
   }, []);
   return (
         <AnswerContext.Provider 
            value={{
               answers,
               setAnswers,
               fetchAnswers
               }}
            >
         {children}
         </AnswerContext.Provider>
   );
};

export { AnswerProvider };
export default AnswerContext;