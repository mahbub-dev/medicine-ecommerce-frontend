import { useSelector } from 'react-redux';

const CartSummary = () => {
  const { totalPrice, discount, shipping } = useSelector(state => state.cart);

  const finalPrice = totalPrice - discount + shipping;

  return (
    <div className="cart-summary">
      <p>Total Price: {totalPrice}</p>
      <p>Discount: {discount}</p>
      <p>Shipping: {shipping}</p>
      <p>Final Price: {finalPrice}</p>
    </div>
  );
};

export default CartSummary;
