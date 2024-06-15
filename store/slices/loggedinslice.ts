import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
interface loggedState {
  value: Boolean
}

const initialState: loggedState = {
  value: false,
}


export const loggedInSlice = createSlice({
  name: 'loogedIn',
  initialState,
  reducers:{
    loggeed: (state) =>{
      state.value = true
    },
    out: (state)=>{
      state.value = false
    },
  },
})

export const { loggeed, out } = loggedInSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const slectLogged = (state: RootState) => state.loogedIn.value

export default loggedInSlice.reducer;