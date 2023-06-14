import { configureStore } from '@reduxjs/toolkit';

import { favoritesReducer } from './favorites.slice'; 
import { alertReducer } from './alert.slice';
import { authReducer } from './auth.slice';
import { usersReducer } from './users.slice';

export * from './alert.slice';
export * from './auth.slice';
export * from './users.slice';
export * from './favorites.slice';

export const store = configureStore({
    reducer: {
        favs: favoritesReducer,
        alert: alertReducer,
        auth: authReducer,
        users: usersReducer
    },
});