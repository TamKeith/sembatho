import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { ProductCardContainer, Footer, NameSpan, PriceSpan } from './product-card.styles.jsx';

const ProductCard = ({ product }) => {

  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

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