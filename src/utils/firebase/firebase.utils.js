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
  collection, // allows us to get a collection ref (same as we got a collection ref) coz we are trying to write to a brand new collection
  writeBatch,
  query,
  getDocs
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  // create the collectionRef to store all the different json objects
  const collectionRef = collection(db, collectionKey);
  // writebatch allows us to add our objects to this collection in one successful transaction. instatiate a batch class
  const batch = writeBatch(db);
  // with this batch instance you can now attach a bunch of different writes, deletes, sets etc to the batch and only when we are ready to fire off the batch
  // does the actual transaction begin
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef); // generate a query off of this collectionRef

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnapShot => docSnapShot.data());

  // FORMAT OF THE DATA RETURNED WHEN WE USED THE CONTEXT API:
  // const querySnapshot = await getDocs(q); // get a snapshot from the object generated above by the query method
  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});
  
  // return categoryMap;
  /**
  This is the structure of categoryMap that we care trying to build
  {
    hats: {
      title: 'Hats',
      items: [
        {},
        {}
      ]
    },
    sneakers: {
      titls: 'Sneakers',
      items: [
        {},
        {}
      ]
    }
  }

 */
}


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

  // return userDocRef;
  return userSnapshot; // we want the data now so that we can store it inside our Reducer
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

export const getCurrentUser = () => {
  // we are converting from Observable listener into a Promise based function call
  return new Promise((resolve, reject) => { // positive and negative handle cases for a promise
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject  // reject is a callback that takes whatever you pass to it, usually it is an error and it will actually reject it so the Promise knows to reject
    );
  });
}
  