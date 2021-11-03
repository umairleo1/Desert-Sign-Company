import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const cartItems = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      let data = state.data;
      let found = data.findIndex(val => val._id == action.payload._id);

      if (found === -1) {
        state.data.push(action.payload);
      }
      // else {
      //   // let found = data.findIndex(val => val._id == action.payload._id);
      //   console.log('found', found, 'count', action.payload.count);

      //   data[found].count = data[found].count + action.payload.count;
      // }
    },
    updateCount: (state, action) => {
      let data = state.data;
      let found = data.findIndex(val => val._id == action.payload.id);
      if (found > -1) {
        data[found].count = data[found].count + action.payload.count;
      }
      // console.log(found, 'vvvvv');
    },

    incrimentQuantity: (state, action) => {
      let data = state.data;
      let found = data.findIndex(val => val._id == action.payload);
      // console.log(action.payload, 'vvvvv');
      data[found].count = data[found].count + 1;

      //   console.log(action.payload, 'here is data');
    },

    decrimentQuantity: (state, action) => {
      let data = state.data;
      let found = data.findIndex(val => val._id == action.payload);
      if (data[found].count == 1) return;
      else {
        data[found].count = data[found].count - 1;
      }
    },
    deleteItem: (state, action) => {
      let data = [...state.data];
      let found = data.findIndex(val => val._id == action.payload);
      data.splice(found, 1);
      state.data = [...data];
    },
    emptyCart: (state, action) => {
      state.data = [];
    },
  },
});

export const {
  setCartItems,
  incrimentQuantity,
  decrimentQuantity,
  deleteItem,
  updateCount,
  emptyCart,
} = cartItems.actions;
export default cartItems.reducer;
