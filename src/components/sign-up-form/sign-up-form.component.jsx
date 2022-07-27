import { useState } from "react";

import FormInput from '../form-input/form-input.component';
import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // 1) confirm that the passwords match
    if(password !== confirmPassword) {
      alert("Password do not match!");
      return;
    }

    try {
      const {user} = await createAuthUserWithEmailAndPassword(email, password);
      // 3) then create a user document
      // 4) also pass displayName when generating the document
      await createUserDocumentFromAuth(user, { displayName });
      // 5) clear up the sign-up fields after
      resetFormFields();
      
    } catch(error) {
      // 2) see if we have authenticated tht user with email and password
      if(error.code === 'auth/email-already-in-use'){
        alert('cannot create user, email already in use');
        return;
      } else {
        console.log('user creation encountered an error ', error);
      }
    }

  }

  const handleChange = (event) =>{
    const {name, value} = event.target; // event.taget gives us the form field tht is emitting the event
    setFormFields({ ...formFields, [name]: value });  // spread in the other fields and only update the one
  }

  return (
    <div className="sign-up-outer-container">
      <div className="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign Up with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput label="Display Name:" type="text" required onChange={handleChange} name="displayName" value={displayName} />

          <FormInput label="Email:" type="email" required onChange={handleChange} name="email" value={email} />

          <FormInput label="Password:" type="password" required onChange={handleChange} name="password" value={password}/>

          <FormInput label="Confirm Password:" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm