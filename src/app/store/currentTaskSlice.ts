import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ITaskState {
  currentId: number | undefined;
}

const initialState: ITaskState = {
  currentId: undefined,
};

const currentTaskSlice = createSlice({
  name: 'currentTask',
  initialState,
  reducers: {
    updateId: (state, action: PayloadAction<number | undefined>) => {
      state.currentId = action.payload;
    },
  },
});

export const { updateId } = currentTaskSlice.actions;
export default currentTaskSlice.reducer;
