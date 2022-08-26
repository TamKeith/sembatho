// CUSTOM MIDDLEWARE:
const loggerMiddleware = (store) => (next) => (action) => {
  if(!action.type) { 
    return next(action);
  }

  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('currentState: ', store.getState());

  next(action); // the logger can only derive the next state from the store object if its updatated and that happenns once it has run through the reducers with the action

  console.log('next state: ', store.getState());
}