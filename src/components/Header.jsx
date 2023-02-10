import { Link, Outlet } from 'react-router-dom';
import UserInfo from '../User/UserInfo';
import UserContext from "../contexts/UserContext";
import { useContext } from "react";


const Header = () => {

   const { loggedInUser } = useContext(UserContext);

   return (
      <>
      <header>
         {
            loggedInUser
               ?
               <>
                  <UserInfo />
                  <Link to='/'>Home</Link>
                  <Link to='newPost'>New Post</Link>
               </>
               :
               <div className="loginRegister">
                  <Link to='/'>Home</Link>
                  <Link to='/login'>Login</Link>
                  <Link to='/register'>Register</Link>
               </div>
         }
         </header>
         <Outlet />
      </>
   );
}

export default Header;