import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'labyrinth',
  initialState: {
    level: 0,
    playerScore: 0,
  },
  reducers: {
    incrementLevel: state => {
      state.level += 1;
    },
    incrementScore: (state, action) => {
      state.playerScore += action.payload
    }
  },
});

export const {
  incrementLevel,
  incrementScore
} = counterSlice.actions;

export const selectLevel = (state: { labyrinth: { level: number; }; }) => state.labyrinth?.level
export const selectPlayerScore = (state: { labyrinth: { playerScore: number; }; }) => state.labyrinth?.playerScore;

export default counterSlice.reducer;
