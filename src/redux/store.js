import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import contactsReducer from "./contactsSlice";
import filtersReducer from "./filtersSlice";

//! Як працювати з Persist (аналог localStorage) описано в README.md
const persistContactsConfig = {
  key: "user-contacts",
  storage,
  //Властивості whitelist - щоб передати властивості, які потрібно зберігати у локал сторедж; та blacklist - щоб передати ті, які НЕ потрібно зберігати. (Використовуємо або ту, або іншу//зазвичай це whitelist)
  whitelist: ["items"],
};

const persistFilretsConfig = {
  key: "user-filters",
  storage,
  whitelist: ["name"],
};

const persistedContactsReducer = persistReducer(
  persistContactsConfig,
  contactsReducer
);

const persistedFiltersReducer = persistReducer(
  persistFilretsConfig,
  filtersReducer
);

export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
    filters: persistedFiltersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

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
