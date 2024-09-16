import { createSlice } from "@reduxjs/toolkit";

export const selectContacts = state => state.contacts.items;

const initialState = {
  items: [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ],
};

//? Детальніше по слайсу див. коментарі в filtersSlice.js

const slice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.items = state.items.filter(task => task.id !== action.payload);
    },
  },
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
