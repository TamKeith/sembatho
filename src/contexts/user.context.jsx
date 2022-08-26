import { createContext, useState, useEffect, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});


export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const INITIAL_STATE = {
  currentUser: null
}

const userReducer = (state, action) => {
  console.log('dispatched');
  console.log(action);
  const { type, payload } = action;

  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default: 
        throw new Error(`unhandled type ${type} in userReducer`)
  }
}


// the actual component. on every context that gets built for us there is a .Provider and the .Provider is the component that will wrap around
// any other components that need access to the values inside
// <UserProvider>
//  <app />               <----------- app is the children in this case
// </UserProvider>
export const UserProvider = ({ children }) => {
  // const [ currentUser, setCurrentUser ] = useState(null);    <---- using REDUCERS instead of useState:
  // START CALLING REDUCER METHODS
  const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state;
  console.log(currentUser);
  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)); // <------- dispatch is how we pass in the action to our reducer
  }
  // END CALLING REDUCER METHODS

  const value = {currentUser, setCurrentUser};

  // THIS USEEFFECT IS NOW BEING FIRED FROM THE APP.JS FILE SINCE THE USER PROVIDER IS NO LONGER IN USE:
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

/**
Reducers: functions that always return a new  object based on the actions passed into them

const userReducer = (state, action) => {
  return {
    currentUser:
  }
}
 */