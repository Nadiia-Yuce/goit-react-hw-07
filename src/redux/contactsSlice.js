import { createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./contactsOps";

export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

const initialState = {
  items: [],
  loading: false,
  error: false,
};

const handlePending = state => {
  state.loading = true;
  state.error = false;
};

const handleRejected = state => {
  state.loading = false;
  state.error = true;
};

//? Детальніше по слайсу див. коментарі в filtersSlice.js

const slice = createSlice({
  name: "contacts",
  initialState,

  //extraReducers використовуємо для обробки інших, НЕ ВЛАСНИХ екшенів
  extraReducers: builder => {
    builder
      //-----------------------GET------------------------------//
      .addCase(fetchContacts.pending, handlePending)

      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })

      .addCase(fetchContacts.rejected, handleRejected)
      //-----------------------POST------------------------------//
      .addCase(addContact.pending, handlePending)

      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })

      .addCase(addContact.rejected, handleRejected)
      //----------------------DELETE-------------------------------//
      .addCase(deleteContact.pending, handlePending)

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload.id
        );
        state.loading = false;
      })

      .addCase(deleteContact.rejected, handleRejected);
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

// export const { addContact, deleteContact } = slice.actions;

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
