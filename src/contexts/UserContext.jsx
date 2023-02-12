import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {

   const [loggedInUser, setLoggedInUser] = useState();
   const [users, setUsers] = useState([])

   const getUsers = async () => {
      const allUsers = await fetch('http://localhost:5000/users')
         .then(response => response.json());
      setUsers(allUsers);
   }

   useEffect(() => {
      getUsers();
   }, []);

   const addNewUser = async (newUser) => {
      const response = await fetch('http://localhost:5000/users', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(newUser),
      });
      const data = await response.json();
      setUsers([...users, data]);
   };

   return (
      <UserContext.Provider
         value={{
            users,
            addNewUser,
            loggedInUser,
            setLoggedInUser
         }}
      >
         {children}
      </UserContext.Provider>
   );
}

export { UserProvider };
export default UserContext;