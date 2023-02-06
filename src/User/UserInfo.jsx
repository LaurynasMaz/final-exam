import UserContext from "../contexts/UserContext"
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {

   const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  

   const navigation = useNavigate();

   const logOutUser = () => {
      setLoggedInUser(null);
      navigation('/');
   }
   
   console.log(loggedInUser.userName);
   
   return (
         <div className="userText">
            <span>
               <img src={loggedInUser.avatar} alt="user avatar" style={{width:'30px', height:'30px'}}/>
               <p>{loggedInUser.username}</p>
            </span>
            <button onClick={() => logOutUser()}>Log Out</button>
         </div>
   );
}
 
export default UserInfo;