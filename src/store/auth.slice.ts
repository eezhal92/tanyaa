import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { User, UserRole } from "../types";

type AuthState = {
  user: User | null
}

const initialState: AuthState = {
  user: {
    id: 1,
    name: 'Foobar',
    email: 'foobar@gmail.com',
    role: UserRole.Tenant,
  }
}

export const authSelectors = {
  selectUser: (state: RootState) => state.auth.user,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user
    }
  }
})

