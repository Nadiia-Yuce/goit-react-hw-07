import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";

export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

//? Складовий селектор викликається кожного разу, коли змінюється будь-яка властивість слайсу
//Складовий селектор має оголошуватися через ф-ю createSelector(), яка мемоїзує виконані обчислення і задає лише потрібні залежності. Це дозволяє уникнути зайвому виклику селектора.
//Приймає масив залежних селекторів і коллбек функцію, яка в свою чергу аргументами приймає результат виклику функцій-селекторів
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, query) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(query.toLowerCase())
    );
  }
);

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

//? Детальніше по слайсу див. коментарі нижче

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

//* Створення через функцію createSlice()
//* Приймає 3 параметри:
// const slice = createSlice({
//* Імʼя слайсу (рядок)
//   name: "filters",
//* Початковий стан (обʼєкт)
//   initialState: { name: "" },
//* Кейс-Редюсери (обʼєкт): фабрики екшенів (імʼя властивості) + їх редюсери (значення))
//? Це власні редюсери слайсу
// reducers: {
//   case-reducer
// changeFilter: (state, action) => {
//! Ми можемо мутувати обʼєкти чи масиви напряму, бо у redux є бібліотека immer, яка робить копію поточного стану ї дає можливість "мутувати" його напряму
//       state.name = action.payload;
//     },
//   },
// });
//* Ще може бути властивість extraReducers (функція), яка обробляє зовнішні редюсери, які даному слайсу не належать
//? Приймає єдиний парамент builder, на якому є метод addCase(action, reducer)

//експорт головного редюсера, який буде використовуватися у файлі store.js
// export default slice.reducer;

//експорт фабрик екшенів
// export const { changeFilter } = slice.actions;
