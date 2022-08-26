// import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as ShoppingIcon } from '../../assets/shoppin-bag.svg';

import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

import { CART_ACTION_TYPES } from '../../store/cart/cart.types';

// import { CartContext } from '../../contexts/cart.context';

import { CartIconContainer, ItemCountSpan, StyledShoppingIcon } from './cart-icon.styles.jsx';

const CartIcon = () => {

  const dispatch = useDispatch();

  // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <StyledShoppingIcon />
      <ItemCountSpan>{ cartCount }</ItemCountSpan>
    </CartIconContainer>
  );
}

export default CartIcon;