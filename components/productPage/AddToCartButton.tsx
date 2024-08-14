import { addToCart } from '@/store/cartSlice'; // Assuming you have a cart slice
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

interface AddToCartButtonProps {
    product: any;
    onCartOpen: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, onCartOpen }) => {
    const [inCart, setInCart] = useState(false);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        setInCart(true);
    };

    return (
        <button
            onClick={inCart ? onCartOpen : handleAddToCart}
            className="bg-blue-500 text-white p-4 rounded mt-4"
        >
            {inCart ? 'View Cart' : 'Add to Cart'}
        </button>
    );
};

export default AddToCartButton;
