import { createSlice } from '@reduxjs/toolkit';

const infoSlice = createSlice({
  name: 'info',
  initialState: {
    name: '',
    age: null,
    blabla: ''
  },

  reducers: {
    setName(state, action) {
      state.name = action.payload;
      console.log('SetName aufgerufen:', action.payload);
    },
    setAge(state, action) {
      state.age = action.payload;
    },
    setBla(state, action) {
      state.blabla = action.payload;
    }
  }
});

export const { setName, setAge, setBla } = infoSlice.actions;
export default infoSlice.reducer;