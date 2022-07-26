import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import { 
  auth, 
  signInWithGooglePopup, 
  singInWithGoogleRedirect, 
  createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {

  // this code is going to run once when this component mounts for the first time and we can leverage this since it is going to run again when the application 
  // is coming back from the redirected sign-in page/window


  // useEffect(async () => {
  //   const response = await getRedirectResult(auth);
  //   console.log(response);

  //   if(response) {
  //     const userDocRef = await createUserDocumentFromAuth(response.user);
  //   }
  // }, []);
  //                    OR
  useEffect(() =>{
    async function fetchResponse(){
      const response = await getRedirectResult(auth);
      console.log(response);

      if(response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    } 
    fetchResponse();
  }, []);

  const logGoogleUser = async () => {
    // Destructure the 'user' from the response which is basically some userAuthentication object and use that in the next method
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>
        Sign in with Google Popup
      </button>
      <button onClick={singInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
      <SignUpForm />
    </div>
  );

}

export default SignIn;