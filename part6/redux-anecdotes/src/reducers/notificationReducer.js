import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state, action) {
            state = action.payload
            return action.payload
        },
        clearNotification: () => initialState,
    }
})


export const { createNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer