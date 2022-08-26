// import { useContext } from 'react';

// import { CartContext } from '../../contexts/cart.context';

import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { ProductCardContainer, Footer, NameSpan, PriceSpan } from './product-card.styles.jsx';

const ProductCard = ({ product }) => {

  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const { name, price, imageUrl } = product;
  // const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCardContainer>
      <img src={ imageUrl } alt={`${name}`} />
      <Footer>
        <NameSpan>{ name }</NameSpan>
        <PriceSpan>{ price }</PriceSpan>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to Cart</Button>
    </ProductCardContainer>
  );
};

export default ProductCard;