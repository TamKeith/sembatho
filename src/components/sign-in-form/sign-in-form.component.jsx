import { useEffect, useState, useContext } from "react";
import { getRedirectResult } from "firebase/auth";

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

//import { UserContext } from "../../contexts/user.context";

import { 
  auth, 
  signInWithGooglePopup, 
  singInWithGoogleRedirect, 
  signInAuthUserWithEmailAndPassword ,
  createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import { SigninOuterContainer, SignInContainer, ButtonsContainer } from './sign-in-form.styles.jsx';

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword (email, password);
      //setCurrentUser(user);
      resetFormFields();
    } catch(error) {
      switch(error.code){
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associtaed with this email');
          break;
        default: 
          console.log(error);
      }
    }
  }


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
  // useEffect(() =>{
  //   async function fetchResponse(){
  //     const response = await getRedirectResult(auth);
  //     console.log(response);

  //     if(response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   } 
  //   fetchResponse();
  // }, []);

  const signInWithGoogle = async (event) => {
    // Destructure the 'user' from the response which is basically some userAuthentication object and use that in the next method
    // const {user} = await signInWithGooglePopup(); <------ no longer need to destructure the user
    // setCurrentUser(user);
    // const userDocRef = await createUserDocumentFromAuth(user);   <--- function is now moved to the user.context
    await signInWithGooglePopup();
  }

  const handleChange = (event) =>{
    const {name, value} = event.target; // event.taget gives us the form field tht is emitting the event
    setFormFields({ ...formFields, [name]: value });  // spread in the other fields and only update the one
  }

  return (
    <SigninOuterContainer>
      <SignInContainer>
        <h2>Already have an account</h2>
        <span>Sign Up with your email and password</span>  

        <form onSubmit={handleSubmit}>
        
          <FormInput label="Email:" type="email" required onChange={handleChange} name="email" value={email} />

          <FormInput label="Password:" type="password" required onChange={handleChange} name="password" value={password}/>
          
          <ButtonsContainer>
            <Button type="submit">Sign In</Button>
            <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
          </ButtonsContainer>
          

        </form>

        {/*<button onClick={logGoogleUser}>
          Sign in with Google Popup
        </button>
        <button onClick={singInWithGoogleRedirect}>
          Sign in with Google Redirect
        </button>*/}
      </SignInContainer>
    </SigninOuterContainer>
  );
}

export default SignInForm;
