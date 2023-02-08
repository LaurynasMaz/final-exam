import React, { createContext, useState, useEffect, useContext } from "react";
import PostContext from "./PostContext";

const AnswerContext = createContext();

const AnswerProvider = ({ children  }) => {

   const { posts } = useContext(PostContext)
    
   const [answers, setAnswers] = useState([]);

   const fetchAnswers = async (postId) =>{

      const filteredPosts = posts.filter(post => post.id.toString() === postId);

      const answers = filteredPosts.map(post => post.answers);
      setAnswers(answers);

   }

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