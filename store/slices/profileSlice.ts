import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
interface addUserState {
  value: Object
}
const initialState: addUserState = {
  value: {},
}

export const addUserSclice = createSlice({
  name: 'addUser',
  initialState,
  reducers:{
    addUser: (state, action: PayloadAction<addUserState>) =>{
      state.value = action.payload
    }
  },
})

export const { addUser } = addUserSclice.actions;
// Other code such as selectors can use the imported `RootState` type
export const slectLogged = (state: RootState) => state.addUser.value

export default addUserSclice.reducer;