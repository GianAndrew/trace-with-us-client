import { configureStore } from '@reduxjs/toolkit';

import covidReducer from './cases/covidSlice';
import historySlice from './visitHistory/historySlice';

const store = configureStore({
	reducer: {
		covid: covidReducer,
		history: historySlice,
	},
});

export default store;
