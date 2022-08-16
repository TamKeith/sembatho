import { CardItemContainer, ItemDetails, NameSpan, PriceSpan } from './cart-item.styles.jsx';

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CardItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <NameSpan>{name}</NameSpan>
        <PriceSpan>
          {quantity} x ${price}
        </PriceSpan>
      </ItemDetails>
    </CardItemContainer>
  );
}

export default CartItem;