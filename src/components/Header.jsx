import { Link, Outlet } from 'react-router-dom';
import UserInfo from '../User/UserInfo';
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import '../styles/header.css'


const Header = () => {

   const { loggedInUser } = useContext(UserContext);

   return (
      <>
      <header>
         <div className='logo'>
            <img src="https://cdn-icons-png.flaticon.com/512/61/61498.png" alt="logo" />
         </div>
         {
            loggedInUser
               ?
               <>
                  <div className="links">
                     <UserInfo />
                     <Link to='/'>Home</Link>
                     <Link to='newPost'>New Post</Link>
                  </div>
               </>
               :
               <div className="links">
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