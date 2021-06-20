import { createSlice } from "@reduxjs/toolkit";
import shortid from "shortid";

const { reducer, actions } = createSlice({
  name: "cats",

  initialState: {
    cats: [
      {
        id: shortid.generate(),
        name: "Poi",
        description: "Jose's cat",
        location: "Palmares",
        breed: "N/A",
      },
    ],
  },

  reducers: {
    addCat: (state, action) => {
      state.cats.push(action.payload);
    },
    updateCat: (state, action) => {
      const index = state.cats.findIndex((v) => v.id === action.payload.id);
      if (index === -1) return state;
      state.cats[index] = action.payload;
    },
    removeCat: (state, action) => {
      state.cats = state.cats.filter((x) => x.id !== action.payload);
    },
  },
});

export const { addCat, updateCat, removeCat } = actions;
export default reducer;
