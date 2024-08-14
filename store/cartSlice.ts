import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { RootState } from "../store"; // Adjust the import path as needed

interface CartItem {
	productId: string;
	variantId?: string;
	variantName: string;
	name: string;
	price: number;
	quantity: number;
	maxQuantity: number;
	discount: number;
	image: string;
}

interface CartState {
	items: CartItem[];
	totalPrice: number;
	discount: number;
	shipping: number;
}

const initialState: CartState = {
	items: [],
	totalPrice: 0,
	discount: 0,
	shipping: 5, // example flat rate shipping
};

const calculateTotalPrice = (
	items: CartItem[],
	discount: number,
	shipping: number
) => {
	const subtotal = items.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);
	return subtotal - discount + shipping;
};

// const calculateTotalDiscount = (items: any[]) => {
// 	return items.reduce(
// 		(totalDiscount, item) => totalDiscount + (item.discount / 100) * (item.price * item.quantity),
// 		0
// 	);
// };

const calculateTotalDiscount = (items: CartItem[]) => {
	const totalDiscount = items.reduce(
		(totalDiscount, item) =>
			totalDiscount +
			(item.discount / 100) * (item.price * item.quantity),
		0
	);
	return totalDiscount;
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart(state, action: PayloadAction<CartItem>) {
			// Find the index of the item with the same productId but different variantId
			const existingItemIndex = state.items.findIndex(
				(item) =>
					item.productId === action.payload.productId
			);
		
			if (existingItemIndex >= 0) {
				// If there's an existing item with the same productId, remove it
				state.items.splice(existingItemIndex, 1);
			}
		
			// Add the new item
			state.items.push({ ...action.payload, quantity: action.payload.quantity });
		
			// Recalculate total discount, price, and shipping
			state.discount = calculateTotalDiscount(state.items);
			state.totalPrice = calculateTotalPrice(
				state.items,
				state.discount,
				state.shipping
			);
			state.shipping = 5;
		},
		
		
		removeFromCart(state, action: PayloadAction<string>) {
			state.items = state.items.filter(
				(item) => item.variantId !== action.payload
			);
			state.discount = calculateTotalDiscount(state.items);
			state.totalPrice = calculateTotalPrice(
				state.items,
				state.discount,
				state.shipping
			);
		},
		incrementQuantity(state, action: PayloadAction<string>) {
			const item = state.items.find(
				(item) => item.variantId === action.payload
			);
			if (item && item.quantity < item.maxQuantity) {
				item.quantity += 1;
			}
			state.discount = calculateTotalDiscount(state.items);
			state.totalPrice = calculateTotalPrice(
				state.items,
				state.discount,
				state.shipping
			);
		},
		decrementQuantity(state, action: PayloadAction<string>) {
			const item = state.items.find(
				(item) => item.variantId === action.payload
			);
			if (item) {
				if (item.quantity > 1) {
					item.quantity -= 1;
				} else {
					state.items = state.items.filter(
						(i) => i.variantId !== action.payload
					);
				}
			}
			state.discount = calculateTotalDiscount(state.items);
			state.totalPrice = calculateTotalPrice(
				state.items,
				state.discount,
				state.shipping
			);
		},
		clearCart(state) {
			state.items = [];
			state.totalPrice = 0;
			state.discount = 0;
		},
		applyDiscount(state, action: PayloadAction<number>) {
			state.discount = action.payload;
			state.totalPrice = calculateTotalPrice(
				state.items,
				state.discount,
				state.shipping
			);
		},
		updateShipping(state, action: PayloadAction<number>) {
			state.shipping = action.payload;
			state.totalPrice = calculateTotalPrice(
				state.items,
				state.discount,
				state.shipping
			);
		},
	},
});

// Export actions
export const {
	addToCart,
	removeFromCart,
	incrementQuantity,
	decrementQuantity,
	clearCart,
	applyDiscount,
	updateShipping,
} = cartSlice.actions;

// Selector to get cart items
export const selectCartItems = (state: RootState) => state.cart.items;

const persistConfig = {
	key: "cart",
	storage,
};

export const persistedCartReducer = persistReducer(
	persistConfig,
	cartSlice.reducer
);
export default persistedCartReducer;
