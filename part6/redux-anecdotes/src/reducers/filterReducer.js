import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter (state, action) {
      state = action.payload
      return action.payload
    }
  }
})

export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer