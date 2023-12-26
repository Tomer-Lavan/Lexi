import { createSlice } from '@reduxjs/toolkit';

const activeUserSlice = createSlice({
    name: 'activeUser',
    initialState: null,
    reducers: {
        setActiveUser: (state, action) => action.payload,
    },
});

export const { setActiveUser } = activeUserSlice.actions;
export default activeUserSlice.reducer;
