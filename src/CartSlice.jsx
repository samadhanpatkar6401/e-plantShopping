import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    currentBill: null
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
    generateBill: (state) => {
      const billItems = state.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: parseFloat(item.cost.replace('$', '')),
        total: parseFloat(item.cost.replace('$', '')) * item.quantity
      }));
      
      const subtotal = billItems.reduce((sum, item) => sum + item.total, 0);
      const tax = subtotal * 0.1;
      const total = subtotal + tax;
      
      state.currentBill = {
        items: billItems,
        subtotal,
        tax,
        total,
        date: new Date().toLocaleString()
      };
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { 
  addItem, 
  removeItem, 
  updateQuantity, 
  clearCart,
  generateBill 
} = CartSlice.actions;

export default CartSlice.reducer;