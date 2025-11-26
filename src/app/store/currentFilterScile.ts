import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterType, ViewType } from 'types/types';

interface ITaskState {
  currentFilter: FilterType;
  currentView: ViewType;
}

const initialState: ITaskState = {
  currentFilter: FilterType.ALL,
  currentView: ViewType.LIST,
};

const currentFilterSlice = createSlice({
  name: 'currentFilter',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<FilterType>) => {
      state.currentFilter = action.payload;
    },
    updateView: (state, action: PayloadAction<ViewType>) => {
      state.currentView = action.payload;
    },
  },
});

export const { updateFilter, updateView } = currentFilterSlice.actions;
export default currentFilterSlice.reducer;
