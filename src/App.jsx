import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './authentication/Login';
import Register from './authentication/Register'
import Header from './components/Header';

const App = () => {
   return (
      <>
      <div>
         <Routes>
            <Route element={<Header />}>
               <Route path="/register" element={<Register />}/>
               <Route path="/login" element={<Login />}/>
            </Route>
         </Routes>
         </div>
      </>
   );
}

export default App;
