import { createSlice } from '@reduxjs/toolkit';

// const savedCart =
//   typeof window !== undefined
//     ? window?.localStorage.getItem('testCart')
//     : undefined;
// const parsedCart = savedCart
//   ? JSON.parse(savedCart)
//   : { cart: [], totalAmount: 0 };

const initialState = {
  // cart: parsedCart.cart,
  // totalAmount: parsedCart.totalAmount,
  cart: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      // check if already exists in cart
      const index = state.cart.findIndex((i) => {
        return (
          item.title.replace(/ /g, '').toLowerCase() ===
          i.title.replace(/ /g, '').toLowerCase()
        );
      });
      if (state.cart.length !== 0 && index !== -1) {
        return;
      }
      // adding item to cart
      state.cart.push(item);
      state.totalAmount += item.price;
    },
    removeFromCart(state, action) {
      const item = action.payload;
      const index = state.cart.findIndex((i) => {
        return item.title === i.title;
      });
      if (index === -1) return;
      state.totalAmount -= item.price;
      state.cart.splice(index, 1);
    },
    resetCart(state) {
      return initialState;
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
