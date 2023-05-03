import { createSlice } from '@reduxjs/toolkit';

const weatherSlice = createSlice({
  name: 'Weather',
  initialState: {
    weeklyData: [],
    dailyData: null
  },
  reducers: {
    replaceWeeklyData(state, action) {
      state.weeklyData = action.payload.data;
      state.dailyData = null;
    },
    replaceDailyData(state, action) {
        state.dailyData = action.payload.data;
      },
  },
});

export const weatherActions = weatherSlice.actions;

export default weatherSlice;