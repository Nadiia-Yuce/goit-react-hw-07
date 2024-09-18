import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts } from "./contactsOps";

export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

const initialState = {
  items: [],
  loading: false,
  error: false,
};

//? Детальніше по слайсу див. коментарі в filtersSlice.js

const slice = createSlice({
  name: "contacts",
  initialState,

  //extraReducers використовуємо для обробки інших, НЕ ВЛАСНИХ екшенів
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
  // reducers: {
  //   addContact: (state, action) => {
  //     state.items.push(action.payload);
  //   },
  //   deleteContact: (state, action) => {
  //     state.items = state.items.filter(task => task.id !== action.payload);
  //   },
  // },
});

export const { addContact, deleteContact } = slice.actions;
export default slice.reducer;

//! Як працює слайс - екшени + редюсер

//Спрощена система оголошення фабрик екшенів

// export const addContact = createAction("contacts/addContact");
// export const deleteContact = createAction("contacts/deleteContact");

//Редюсер

// export default function contactsReducer(state = initialState, action) {
//   switch (action.type) {
//     case "contacts/addContact": {
//       return {
//         ...state,
//         items: [...state.items, action.payload],
//       };
//     }
//     case "contacts/deleteContact": {
//       return {
//         ...state,
//         items: state.items.filter(task => task.id !== action.payload),
//       };
//     }
//     default:
//       return state;
//   }
// }
