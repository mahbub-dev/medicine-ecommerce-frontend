import { decrementQuantity, incrementQuantity } from '@/store/cartSlice'; // Assuming these actions exist
import React from 'react';
import { useDispatch } from 'react-redux';

interface QuantityManagerProps {
    item: any;
}

const QuantityManager: React.FC<QuantityManagerProps> = ({ item }) => {
    const dispatch = useDispatch();

    return (
        <div className="quantity-manager flex items-center space-x-4">
            <button
                onClick={() => dispatch(decrementQuantity(item.id))}
                disabled={item.quantity === 1}
                className="bg-gray-200 p-2 rounded"
            >
                -
            </button>
            <span>{item.quantity}</span>
            <button
                onClick={() => dispatch(incrementQuantity(item.id))}
                className="bg-gray-200 p-2 rounded"
            >
                +
            </button>
        </div>
    );
};

export default QuantityManager;
