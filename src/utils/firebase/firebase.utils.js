/**
 * In order to use firebase you actually need to import 'initializeApp' from 'firebase/app'. Firebase is a suite of tools and firestore is one of the tools inside.
 * This suite you bring down from the Library as a thing call the 'app' from 'firebase/app'. This 'initializeApp' function that you import creates an app instance 
 * for you based on some type of config. This config is an object that allows us to attach this firebase app instance to that instance that we have online,
 * (i.e. sembatho-db).
 * */ 

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
 } from 'firebase/auth';

import {
  getFirestore, // get firestore instance
  doc, // to get the document instance
  getDoc, // to get the document's data 
  setDoc, // to set the document's data
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB8X1aVdc7H-BNxsr_dJOwunIQ4sqrstA",
  authDomain: "sembatho-db.firebaseapp.com",
  projectId: "sembatho-db",
  storageBucket: "sembatho-db.appspot.com",
  messagingSenderId: "437338559763",
  appId: "1:437338559763:web:6be55f7fc2f8481a8536e6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// SETUP Authentication
const googleProvider = new GoogleAuthProvider();  // there are diff providers you can use eg a provider for sigining with facebook, twitter etc...

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const singInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// SETUP THE db
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return;
  // we need to see it there is an existiing doc ref 'userDocRef' in this case. this is a special type of object that Firestore uses when talking about actual 
  // instance of a document model
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  // NB: The Snapshot which is kinda like the data allows to check if there is an instance of it that exists inside the db and it also allows use to access the data
  // if user data does not exist 
  // create / set the document with the data from userAuth in my collection
  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation 
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }

  }
  // if user data exists
  // return userDocRef
  return userDocRef;
}


// Create a user with email and password
// NB: this falls under Native providers so we do not need to provide a provioder
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => 
  /**
   * *** These are some of the paramters that you can pass to the 'onAuthStateChanged' listener ***
   * next: callback
   * error: errorCallback
   * complete: completedCallBack
   */
  onAuthStateChanged(auth, callback);
  