import { Link, Outlet } from 'react-router-dom';
import UserInfo from '../User/UserInfo';
import UserContext from "../contexts/UserContext";
import { useContext } from "react";


const Header = () => {

   const { loggedInUser } = useContext(UserContext);

   return (
      <>
         {
            loggedInUser 
            ? 
               <>
               <UserInfo /> 
               <Link to='/'>Home</Link>
               </>
            :
               <div className="loginRegister">
                  <Link to='/login'>Login</Link>
                  <Link to='/register'>Register</Link>
               </div>
         }
         <Outlet />
      </>
   );
}
 
export default Header;