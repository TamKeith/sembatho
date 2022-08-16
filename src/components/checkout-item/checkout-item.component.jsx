import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { CheckoutItemContainer, ImageContainer, NameSpan, QuanitySpan, PriceSpan, ValueSpan, LeftAndRightArrow, RemoveButton } from './checkout-item.styles.jsx';

const CheckoutItem = ({cartItem}) => {

  const { name, imageUrl, price, quantity } = cartItem;

  const { clearItemFromCart,  addItemToCart, removeItemFromCart } = useContext(CartContext);

  const clearItemHandler = () => clearItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);

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