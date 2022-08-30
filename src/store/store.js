/**
 * Combined place where all of our Redux Happens, where our State lives but also where we receive Actions and Dispatch them into our Reducers to update the state
 */
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import thunk from 'redux-thunk'; <----- SAGAs replace thunks, you mainly want one async lib Sagas or Thunks Redux-RxJs/Redux-Observable
import createSagaMiddleware from '@redux-saga/core';
import { loggerMiddleware } from './middleware/logger';

import { rootSaga } from './root-saga';

// import { configureStore } from '@reduxjs/toolkit';

/** NB: the logger allows us to see:
 * 1) what the state looks like b4 an action is dispatched, 
 * 2) what the action is, 
 * 3) how the state looks like after the action
 * 
 * And in order to use it we have to use middleWares
 * */
import logger from 'redux-logger';

// root reducer (if you wanna think of your state being build by multiple reducers)
import { rootReducer } from './root-reducer';

// The format of a middleware always follows the same signature: it is going to be 3 functions that return from one another. in order to uderstand this we need to understand
// the concept of currying. Currying a function is essentially a function that returns you another function.
/**
 * 
const curryFunc = (a) => (b, c) => {
  a + b - c
}
const withA = curryFunc(A);
withA === (b, c) => (a=A) + b - c 
eg: 
with3(2, 4); // 3 + 2 - 4
*
*/

const persistConfig = {
  key: 'root',  // persist the whole thing from the root level
  storage,
  whitelist: ['cart'] // this is typically what we normally persist
  // blacklist: ['user'] // we normally do not persist the user object to avoid weird errors since the auth is tracking the user
}

const sagaMidleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// older way of creating the store:
// or you can use custom 'loggerMiddleware'
const middleWares = [
  process.env.NODE_ENV !== 'production' && logger, 
  sagaMidleware
  // thunk
].filter(Boolean); 

// setting up your website so that it can use the Redux Devtools you need to modify the compose method. You modify to determine if you want to 
// use "Redux's compose" or the "DevTools' compose"
const composeEnhancer = 
  (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer, 
  undefined, 
  composedEnhancers
);

// after the store has been instantiated with the actual sagaMiddleware inside, then we tell the saga middleware to run
sagaMidleware.run(rootSaga);

export const persistor = persistStore(store);

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
//   // enhancers: composedEnhancers
// });


 