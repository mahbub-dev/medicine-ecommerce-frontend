import { addToCart } from '@/store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const AddToCartButton = ({ product }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const isInCart = cartItems.some(item => item.productId === product._id);

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addToCart({ productId: product._id, name: product.name, price: product.price, stock: product.stock, maxQuantity: product.maxQuantity }));
    }
  };

  return (
    <button onClick={handleAddToCart}>
      {isInCart ? 'View Cart' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;
