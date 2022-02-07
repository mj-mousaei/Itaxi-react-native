import { configureStore } from '@reduxjs/toolkit';
import mapSlice from './mapSlice';
import userSlice from './userSlice';

export default configureStore({
    reducer: {
        map: mapSlice,
        user: userSlice,
    },
});
