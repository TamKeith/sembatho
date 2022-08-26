import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  // 1) find if cartItems contains productToAdd
  const existingCartItem = cartItems.find((cartItem) => 
    cartItem.id === productToAdd.id
  );
  // 2) if found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) => 
      cartItem.id === productToAdd.id 
      ? { ...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
    );
  }
  // 3) return new array with modified cartItems
  return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  // 1) find the cartItem to remove
  const existingCartItem = cartItems.find((cartItem) => 
    cartItem.id === cartItemToRemove.id
  );
  // 2) check if quanity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity ===1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  // 3) return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) => 
      cartItem.id === cartItemToRemove.id 
      ? { ...cartItem, quantity: cartItem.quantity - 1}
      : cartItem
    );
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


export const setIsCartOpen = (bool) => 
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}