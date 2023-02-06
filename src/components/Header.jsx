import { Link, Outlet } from 'react-router-dom';
const Header = () => {
   return ( 
      <>
       <div className="loginRegister">
         <Link to='/login'>Login</Link>
         <Link to='/register'>Register</Link>
       </div>
       <Outlet />
      </>
    );
}
 
export default Header;