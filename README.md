## Послідосвність дій при роботі з React Redux:

1. Створити стор (редюсери + початковий стан)
2. Створити інтерфейс (компоненти) і підписатися на стан
3. Оголосити необхідні екшени
4. Відправити екшен
5. Обробити екшен в редюсері

## Послідовність дій при роботі з React Persist:

1. Зробити необхідні імпорти бібліотеки:

- import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST,
  PURGE, REGISTER, } from "redux-persist";
- import storage from "redux-persist/lib/storage";

2. Зберегти редюсер з конфігурацією:

- const `persistedReducer` = persistReducer(persistConfig, rootReducer)

```js
const persistConfig = {
  key: 'назва ключа в локал стореджі',
  storage,
  whitelist: ["назва властивості"] // optional
    blacklist: ["назва властивості"] // optional
};
```

- rootReducer - це звичайний редюсер, який обробляє екшени (імпортується з файла
  слайсу)

3. В store передати цей `persistedReducer` у властивість reducer.

4. Сворити змінну persistor і передати їй store:

```js
export const persistor = persistStore(store);
```

5. В main.jsx потрібно огорнути компонентом PersistGate компонент App і передати
   йому в пропс наш `persistor`:

- import { PersistGate } from "redux-persist/integration/react";
- вигляд: <PersistGate loading={null} persistor={persistor}></PersistGate>

6. Щоб уникнути помилки в консолі, додаємо `middleware` в `store`: (приклад
   стору)

```js
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
```
