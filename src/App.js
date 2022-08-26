import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from 'react-router-dom';

import { getCategoriesAndDocuments } from "./utils/firebase/firebase.utils"; 
import { setCategoriesMap } from "./store/categories/category.action";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication";
import Shop from "./routes/shop/shop.component";
import CheckOut from "./routes/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.action";

// const Shop = () => {
//   return (
//     <h1>I am the Shop Page</h1>
//   );
// }


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    // we need to stop listening when this component unmounts to avoid memory leaks
    // this method returns a function that will unsubscribe ie stop listening
    const unsubscribe = onAuthStateChangedListener((user) => {
      if(user){
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe; // unsubscribe whenever you unmount
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<CheckOut />} />
      </Route>
    </Routes>
  );
};

export default App;
