import {
    clearCart,
    decrementQuantity,
    incrementQuantity,
    removeFromCart,
    selectCartItems
} from "@/store/cartSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

interface CartProps {
    onSubmit?: any;
}

const Cart = ({ onSubmit }: CartProps) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const isLoggedIn = useSelector((state: any) => state?.auth?.user);
    const router = useRouter();

    const handleIncrement = (productId: string) => {
        dispatch(incrementQuantity(productId));
    };

    const handleDecrement = (productId: string) => {
        dispatch(decrementQuantity(productId));
    };

    const handleRemove = (item: any) => {
        dispatch(removeFromCart(item));
  
    };

    const handleCheckout = () => {
        if (isLoggedIn) {
            router.push("/shipping");
        } else {
            router.push("/auth/login");
        }
    };

    const handleClearCart = () => {
        dispatch(clearCart());
     
    };

    const calculateSubtotal = (items: any[]) => {
        return items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    const calculateTotalDiscount = (items: any[]) => {
        return items.reduce(
            (totalDiscount, item) => totalDiscount + (item.discount / 100) * (item.price * item.quantity),
            0
        );
    };

    const shippingCost = 5; // Example shipping cost
    const subtotal = calculateSubtotal(cartItems);
    const totalDiscount = calculateTotalDiscount(cartItems);
    const totalPrice = subtotal - totalDiscount + shippingCost;

    // Calculate discounted price for each item
    const calculateDiscountedPrice = (price: number, discount: number) => {
        return price - (price * discount) / 100;
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            <ul className="space-y-4">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cartItems.map((item) => {
                        const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
                        return (
                            <li
                                key={item.variantId}
                                className="border p-4 rounded-lg flex items-center justify-between">
                                <div className="flex items-center">
                                    <Image
                                        width={200}
                                        height={200}
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover mr-4"
                                    />
                                    <div>
                                        <h2 className="font-semibold">{item.name}</h2>
                                        <p className="text-gray-600">Variant: {item.variantName}</p>
                                        <p className="text-gray-600">Original Price: ${item.price.toFixed(2)}</p>
                                        <p className="text-gray-600">Discounted Price ({item.discount}%) : ${discountedPrice.toFixed(2)}</p>
                                        <p className="text-gray-600">Max Quantity: {item.maxQuantity}</p>
                                        <p
                                            className={`font-bold ${
                                                item.maxQuantity <= 0 ? "text-red-600" : "text-green-600"
                                            }`}
                                        >
                                            {item.maxQuantity <= 0
                                                ? "Stock Out"
                                                : `In Stock: ${item.maxQuantity}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleDecrement(item.variantId as string)}
                                        disabled={item.maxQuantity <= 0 || item.quantity <= 1}
                                        className="px-2 py-1 border rounded-lg bg-gray-200 text-gray-700"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        readOnly
                                        className="w-16 text-center border rounded-lg"
                                    />
                                    <button
                                        onClick={() => handleIncrement(item.variantId as string)}
                                        disabled={item.maxQuantity <= 0 || item.quantity >= item.maxQuantity}
                                        className="px-2 py-1 border rounded-lg bg-gray-200 text-gray-700"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => handleRemove(item)}
                                        className="px-2 py-1 border rounded-lg bg-red-500 text-white"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        );
                    })
                )}
            </ul>
            <div className="mt-4 border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                    <p>Subtotal:</p>
                    <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-lg font-bold mt-2">
                    <p>Total Discount:</p>
                    <p>-${totalDiscount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-lg font-bold mt-2">
                    <p>Shipping Cost:</p>
                    <p>${shippingCost.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-lg font-bold mt-2">
                    <p>Total Price:</p>
                    <p>${totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex space-x-4 mt-4">
                    <button
                        onClick={handleClearCart}
                        className="px-4 py-2 border rounded-lg bg-gray-300 text-gray-700"
                    >
                        Clear Cart
                    </button>
                    <button
                    disabled={cartItems.length===0}
                        onClick={handleCheckout}
                        className="px-4 py-2 border rounded-lg bg-blue-500 text-white"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
