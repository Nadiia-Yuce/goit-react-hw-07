import { createSlice } from "@reduxjs/toolkit";

export const selectNameFilter = state => state.filters.name;

const slice = createSlice({
  name: "filters",
  initialState: { name: "" },
  reducers: {
    //   case-reducer
    changeFilter: (state, action) => {
      //Ми можемо мутувати обʼєкти чи масиви напряму, бо у redux є бібліотека immer, яка робить копію поточного стану ї дає можливість "мутувати" його напряму
      state.name = action.payload;
      //   return {
      //     ...state,
      //     name: action.payload,
      //   };
    },
  },
});

//експорт фабрик екшенів
export const { changeFilter } = slice.actions;

//експорт головного редюсера
export default slice.reducer;

//! Як працює слайс - екшени + редюсер
// export const changeFilter = createAction("contacts/changeFilter");

// export default function filtersReducer(state = { name: "" }, action) {
//   switch (action.type) {
//     case "filters/changeFilter": {
//       return {
//         ...state,
//         name: action.payload,
//       };
//     }

//     default:
//       return state;
//   }
// }
