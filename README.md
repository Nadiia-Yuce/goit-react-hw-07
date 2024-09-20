## Послідосвність дій при роботі з React Redux:

1. Створити стор (редюсери + початковий стан)
2. Створити інтерфейс (компоненти) і підписатися на стан
3. Оголосити необхідні екшени
4. Відправити екшен
5. Обробити екшен в редюсері

## Послідовність дій при роботі з HTTP запитами:

1. Оголосити операцію за допомогою `createAsyncThunk` (див. файл contactOps.js)
2. Передати ій 2 аргументи, базовий тип екшену (рядок) та асинхронну функцію
3. Зробити `dispatch` операціі у КОМПОНЕНТІ при подіі/ефекті і перевірити, чи
   спрацьовують екшени
4. Якщо все ок - додати HTTP запит в асинхронну функцію операціі і повернути
   дані (див. файл contactOps.js)

- Не забудь додати 2й аргумент `thunkAPI`, який потрібен для коректного
  відпрацювання помилки запиту. Для цього в частині `catch` прописати:
  ```js
  return thunkAPI.rejectWithValue();
  ```

5. Обробити екшени операціі (pending, fulfilled, rejected) у слайсі у
   властивості `extraReducers` -> `builder.addCase()` (див. файл
   contactsSlice.js)

## Як працюють фабрики екшенів

- скорочено:

```js
export const changeFilter = createAction("contacts/changeFilter");
```

Пояснення: Функція createAction приймає рядок - type екшену. При виклику екшену
як фунції передане їй значення потрапляє у payload. Нпр.: changeFilter(query) це
екшен

```js
const changeFilter = {
  type: "filters/changeFilter",
  payload: query,
};
```

- розширено: По type екшену редюсер розрізняє який саме екшен відбувся. A
  payload - це значення, яке передається при виклику (діспатчі) екшену

```js
export const changeFilter = query => {
  return {
    type: "filters/changeFilter",
    payload: query,
  };
};
```

## Як працює кореневий редюсер (розширено)

Тут contacts та filters - частини стану стора (слайси). А addContact,
deleteContact та changeFilter - екшени

```js
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "contacts/addContact": {
      return {
        ...state,
        contacts: {
          ...state.contacts,
          items: [...state.contacts.items, action.payload],
        },
      };
    }
    case "contacts/deleteContact": {
      return {
        ...state,
        contacts: {
          ...state.contacts,
          items: state.contacts.items.filter(
            task => task.id !== action.payload
          ),
        },
      };
    }
    case "filters/changeFilter": {
      return {
        ...state,
        filters: {
          ...state.filters,
          name: action.payload,
        },
      };
    }

    default:
      return state;
  }
};

export const store = configureStore({
  reducer: rootReducer,
});
```

## Як працює слайс - екшени + редюсер

Див. коментарі внизу (файл contactsSlice.js)
