import { CART_ACTION_TYPES } from "./cart.types";

// contains all the readable values inside our context (values normally stored in the useState individually in the context). these are the objects we need to keep track of as far as what our Reducer should return
const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
}

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch(type){
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default: 
      return state;
  }
}