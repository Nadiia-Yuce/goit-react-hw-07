import { createSlice } from "@reduxjs/toolkit";

export const selectNameFilter = state => state.filters.name;

const slice = createSlice({
  name: "filters",
  initialState: { name: "" },
  reducers: {
    //   case-reducer
    changeFilter: (state, action) => {
      state.name = action.payload;
    },
  },
});

//експорт фабрик екшенів
export const { changeFilter } = slice.actions;

//експорт головного редюсера
export default slice.reducer;
