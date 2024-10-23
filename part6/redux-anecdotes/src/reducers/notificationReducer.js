import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            state = action.payload
            return action.payload
        },
        clearNotification: () => initialState,
    }
})


export const { setNotification, clearNotification } = notificationSlice.actions


export const createNotification = (content, seconds) => {
    return async dispatch => {
        dispatch(setNotification(content))
        
        setTimeout(() => dispatch(clearNotification()), seconds * 1000)
    }
}

export default notificationSlice.reducer