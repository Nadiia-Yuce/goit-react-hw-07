import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contactsSlice";
import filtersReducer from "./filtersSlice";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
  },
});

//!Як працюють фабрики екшенів (розширено)
// export const changeFilter = query => {
//   return {
//     type: "filters/changeFilter",
//     payload: query,
//   };
// };

//! Як працює кореневий редюсер
// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "contacts/addContact": {
//       return {
//         ...state,
//         contacts: {
//           ...state.contacts,
//           items: [...state.contacts.items, action.payload],
//         },
//       };
//     }
//     case "contacts/deleteContact": {
//       return {
//         ...state,
//         contacts: {
//           ...state.contacts,
//           items: state.contacts.items.filter(
//             task => task.id !== action.payload
//           ),
//         },
//       };
//     }
//     case "contacts/changeFilter": {
//       return {
//         ...state,
//           filters: {
//             ...state.filters,
//           name: action.payload,
//         },
//       };
//     }

//     default:
//       return state;
//   }
// };

// export const store = configureStore({
//   reducer: rootReducer,
// });
