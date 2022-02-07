import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        auth: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAuth: (state, action) => {
            state.auth = action.payload;
        },
    },
});

export const { setUser, setAuth } = userSlice.actions;

export const userSelector = (state) => state.user.user;
export const authSelector = (state) => state.user.auth;

export default userSlice.reducer;
