import React from 'react';
import { useSelector } from 'react-redux';

const CartSummary: React.FC = () => {
    const cartItems = useSelector((state: any) => state.cart.items);
    const totalPrice = cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0);

    return (
        <div className="cart-summary mt-4">
            <p className="font-bold text-xl">Total: ${totalPrice}</p>
            <p className="text-gray-500">Shipping charges and discounts will be applied at checkout.</p>
        </div>
    );
};

export default CartSummary;
