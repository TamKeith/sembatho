import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

// the actual component. on every context that gets built for us there is a .Provider and the .Provider is the component that will wrap around
// any other components that need access to the values inside
// <UserProvider>
//  <app />               <----------- app is the children in this case
// </UserProvider>
export const UserProvider = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState(null);
  const value = {currentUser, setCurrentUser};

  useEffect(() => {
    // we need to stop listening when this component unmounts to avoid memory leaks
    // this method returns a function that will unsubscribe ie stop listening
    const unsubscribe = onAuthStateChangedListener((user) => {
      if(user){
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe; // unsubscribe whenever you unmount
  }, []);

  return <UserContext.Provider value={value}>{ children }</UserContext.Provider>
} 