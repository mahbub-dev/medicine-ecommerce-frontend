import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

const CheckoutButton: React.FC = () => {
    const router = useRouter();
    const isAuthenticated = useSelector((state: any) => state.user); // Assuming user authentication is in redux

    const handleCheckout = () => {
        if (isAuthenticated) {
            router.push('/shipping');
        } else {
            router.push('/login');
        }
    };

    return (
        <button
            onClick={handleCheckout}
            className="bg-green-500 text-white p-4 rounded mt-4"
        >
            Proceed to Checkout
        </button>
    );
};

export default CheckoutButton;
