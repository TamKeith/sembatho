// import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { CartContext } from '../../contexts/cart.context';
import { selectCartItems } from '../../store/cart/cart.selector.js';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action.js';

import { CheckoutItemContainer, ImageContainer, NameSpan, QuanitySpan, PriceSpan, ValueSpan, LeftAndRightArrow, RemoveButton } from './checkout-item.styles.jsx';

const CheckoutItem = ({cartItem}) => {

  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const { name, imageUrl, price, quantity } = cartItem;

  // const { clearItemFromCart,  addItemToCart, removeItemFromCart } = useContext(CartContext);

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <NameSpan>{ name }</NameSpan>
      <QuanitySpan>
        <LeftAndRightArrow onClick={removeItemHandler}>
          &#10094;
        </LeftAndRightArrow>
        <ValueSpan>{ quantity }</ValueSpan>
        <LeftAndRightArrow onClick={addItemHandler}>
          &#10095;
        </LeftAndRightArrow>
      </QuanitySpan>
      <PriceSpan>{ price }</PriceSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
}

export default CheckoutItem;