import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const savedItems = createSlice({
  name: 'savedItems',
  initialState,
  reducers: {
    setSavedItem: (state, action) => {
      let data = state.data;
      const found = data.findIndex(val => val._id == action.payload._id);

      if (found < 0) {
        state.data.push(action.payload);
      } else {
        // const found = data.findIndex(val => val.id == action.payload.id);
        // data[found].count = data[found].count + action.payload.count;
        // console.log(state.data, 'already');
        // let data = [...state.data];
        // //   const found = data.findIndex(val => val.id == action.payload.id);
        // data.splice(found, 1);
        // state.data = [...data];
      }
    },

    deleteItem: (state, action) => {
      let data = [...state.data];

      const found = data.findIndex(val => val._id == action.payload);

      if (found >= 0) {
        data.splice(found, 1);
        state.data = [...data];
        console.log(state.data, 'found in red');
      }
    },
  },
});

export const {setSavedItem, deleteItem} = savedItems.actions;
export default savedItems.reducer;
