import { createContext } from "react";

const PostContext = createContext ();

const PostProvider = ({ children }) =>{

    return(
       <PostContext.Provider
         value={{

         }}

       >
        {children}
       </PostContext.Provider> 
    );
};

export { PostProvider };
export default PostContext