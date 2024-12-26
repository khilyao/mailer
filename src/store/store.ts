import { configureStore } from "@reduxjs/toolkit";

import { RTKAPI } from "@features/api.ts";

const store = configureStore({
  reducer: {
    [RTKAPI.reducerPath]: RTKAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(RTKAPI.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
