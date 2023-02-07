import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './authentication/Login';
import Register from './authentication/Register'
import Header from './components/Header';
import Home from './components/Home';

const App = () => {
   return (
   <>
      <div>
         <Routes>
            <Route element={<Header />}>
               <Route path="/register" element={<Register />}/>
               <Route path="/login" element={<Login />}/>
               <Route path='/' element={<Home />}/>
            </Route>
         </Routes>
      </div>
   </>
   );
}

export default App;
