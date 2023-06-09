import { configureStore } from '@reduxjs/toolkit';
import { loggedUser } from './services/loggedUserAPI';

import openedChatsSlice from './features/openedChatsSlice';
import { openedChatsListener } from './middlewares';
import { allUsersPublicDataAPI } from './services/allUsersPublicDataAPI';
import { userDataAPI } from './services/userDataAPI';

export const store = configureStore({
  reducer: {
    [loggedUser.reducerPath]: loggedUser.reducer,
    [allUsersPublicDataAPI.reducerPath]: allUsersPublicDataAPI.reducer,
    [userDataAPI.reducerPath]: userDataAPI.reducer,
    openedChats: openedChatsSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(loggedUser.middleware, allUsersPublicDataAPI.middleware, userDataAPI.middleware)
      .prepend(openedChatsListener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
