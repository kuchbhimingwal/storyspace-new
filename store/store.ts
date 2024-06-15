import { configureStore } from '@reduxjs/toolkit'
import loggedInSlice from './slices/loggedinslice'
import addUserSclice from './slices/profileSlice'
export const store = configureStore({
  reducer: {
    loogedIn : loggedInSlice,
    addUser: addUserSclice
  }
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']