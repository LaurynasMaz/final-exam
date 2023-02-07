import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './contexts/UserContext';
import { BrowserRouter } from 'react-router-dom';
import { PostProvider } from './contexts/PostContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
      <UserProvider>
         <PostProvider>
           <App />
         </PostProvider>
      </UserProvider>
   </BrowserRouter>
);
