import UserContext from "../contexts/UserContext"
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/user.css'

const UserInfo = () => {

   const { loggedInUser, setLoggedInUser } = useContext(UserContext);


   const navigation = useNavigate();

   const logOutUser = () => {
      setLoggedInUser(null);
      navigation('/');
   }

   return (
      <div className="userText">
         <img src={loggedInUser.avatar} alt="user avatar" />
         <p>{loggedInUser.username}</p>
         <button onClick={() => logOutUser()}>Log Out</button>
      </div>
   );
}

export default UserInfo;