import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthData } from 'types/types';

const getInitialState = (): IAuthData => {
  const savedAuth = localStorage.getItem('auth');
  if (savedAuth) {
    return { ...JSON.parse(savedAuth), isAuthenticated: true };
  }
  return {
    name: '',
    mail: '',
    isAuthenticated: false,
  };
};

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: getInitialState,
  reducers: {
    authoriseUser: (state, action: PayloadAction<{ name: string; mail: string }>) => {
      state.name = action.payload.name;
      state.mail = action.payload.mail;
      state.isAuthenticated = true;

      localStorage.setItem(
        'auth',
        JSON.stringify({
          name: action.payload.name,
          mail: action.payload.mail,
        })
      );
    },
    logoutUser: (state) => {
      state.name = '';
      state.mail = '';
      state.isAuthenticated = false;

      localStorage.removeItem('auth');
    },
  },
});

export const { authoriseUser, logoutUser } = authUserSlice.actions;
export default authUserSlice.reducer;
