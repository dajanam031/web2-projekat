import { createSlice } from '@reduxjs/toolkit';
import { ItemToAdd } from '../models/ItemToAdd';

const initialState = {
  item: new ItemToAdd()
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItem: (state, action) => {
      const item = action.payload;
      state.item = item; 
    },
    clearItem: (state) => {
      state.user = new ItemToAdd(); 
    },
  },
});

export const { setItem, clearItem } = itemSlice.actions;
export default itemSlice.reducer;