import styled from 'styled-components';

import { ReactComponent as ShoppingIcon } from '../../assets/shoppin-bag.svg';

export const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ItemCountSpan = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`;

export const StyledShoppingIcon = styled(ShoppingIcon)`
  width: 24px;
  height: 24px;
`;

// .cart-icon-container {
//   width: 45px;
//   height: 45px;
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;

//   .shopping-icon {
//     width: 24px;
//     height: 24px;
//   }

//   .item-count {
//     position: absolute;
//     font-size: 10px;
//     font-weight: bold;
//     bottom: 12px;
//   }
// }
