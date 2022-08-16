import { useContext } from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/shoppin-bag.svg';

import { CartContext } from '../../contexts/cart.context';

import { CartIconContainer, ItemCountSpan, StyledShoppingIcon } from './cart-icon.styles.jsx';

const CartIcon = () => {

  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <StyledShoppingIcon />
      <ItemCountSpan>{ cartCount }</ItemCountSpan>
    </CartIconContainer>
  );
}

export default CartIcon;