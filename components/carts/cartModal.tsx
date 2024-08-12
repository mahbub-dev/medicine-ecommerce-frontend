import { decrementQuantity, incrementQuantity, removeFromCart } from '@/store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import CartSummary from './CartSummary';

const CartModal = ({ onClose }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map(item => (
              <div key={item.productId}>
                <h3>{item.name}</h3>
                <p>{item.price} x {item.quantity}</p>
                <button onClick={() => dispatch(incrementQuantity(item.productId))}>+</button>
                <button onClick={() => dispatch(decrementQuantity(item.productId))}>-</button>
                <button onClick={() => dispatch(removeFromCart(item.productId))}>Remove</button>
                {item.stock === 0 && <p className="stock-out">Stock Out</p>}
              </div>
            ))}
            <CartSummary />
          </div>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CartModal;
