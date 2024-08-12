import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  maxQuantity: number;
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

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        if (existingItem.quantity < existingItem.maxQuantity) {
          existingItem.quantity += 1;
          state.totalPrice += existingItem.price;
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.totalPrice += action.payload.price;
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const itemIndex = state.items.findIndex(item => item.productId === action.payload);
      if (itemIndex >= 0) {
        state.totalPrice -= state.items[itemIndex].price * state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    incrementQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(item => item.productId === action.payload);
      if (item && item.quantity < item.maxQuantity) {
        item.quantity += 1;
        state.totalPrice += item.price;
      }
    },
    decrementQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(item => item.productId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalPrice -= item.price;
      } else if (item && item.quantity === 1) {
        state.totalPrice -= item.price;
        state.items = state.items.filter(item => item.productId !== action.payload);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    applyDiscount(state, action: PayloadAction<number>) {
      state.discount = action.payload;
      state.totalPrice -= state.discount;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  applyDiscount,
} = cartSlice.actions;

const persistConfig = {
  key: 'cart',
  storage,
};

export const persistedCartReducer = persistReducer(persistConfig, cartSlice.reducer);
export default persistedCartReducer;
