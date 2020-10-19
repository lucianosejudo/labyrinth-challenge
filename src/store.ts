import { configureStore } from '@reduxjs/toolkit';
import labyrinthReducer from './components/Labyrinth/labyrinthSlice'

export default configureStore({
  reducer: {
    labyrinth: labyrinthReducer,
  },
});
