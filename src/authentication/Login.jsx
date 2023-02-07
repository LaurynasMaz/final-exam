import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

   const [formInputs, setFormInputs] = useState({
      username : '',
      password : ''
   });
   const [failedLogIn, setFailedLogIn] = useState(false);
   const { users, setLoggedInUser } = useContext(UserContext);

   const navigate = useNavigate();

   const handleSubmit = (e) => {
      e.preventDefault();

      const loggedInUser = users.find(user => user.username === formInputs.username && user.password === formInputs.password);

      if (!loggedInUser) {
         setFailedLogIn(true);
         return;
      }

      setLoggedInUser(loggedInUser);
      navigate('/');
   } 

   return (
   <>
      <div>
         <form onSubmit={handleSubmit}>
            <label>
            UserName:
            <input type="text" name="userName"
            value={formInputs.userName}
            onChange={(e)=>setFormInputs({...formInputs, username:e.target.value})}
            />
            </label>
            <label>
            Password:
            <input type="password" name="password"
            value={formInputs.password}
            onChange={(e)=>setFormInputs({...formInputs, password:e.target.value})}
            />
            </label>
            <input type="submit" value="Log In" />
            {
            failedLogIn && <span>Wrong log in info</span>
            }
         </form>
      </div>
   </>
); 
}

export default Login;