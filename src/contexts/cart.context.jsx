import { createContext, useState, useEffect } from "react"

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemsToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const value = { isCartOpen, setIsCartOpen, addItemsToCart, cartItems, cartCount };

  return(
    <CartContext.Provider value={value}>{ children }</CartContext.Provider>
  );
}