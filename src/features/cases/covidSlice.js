import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCovidCases = createAsyncThunk('covid/getCovidCases', async () => {
	try {
		const { data } = await axios.get('https://api.covid19api.com/summary');
		return data;
	} catch (error) {
		return error?.response?.data;
	}
});

const covidSlice = createSlice({
	name: 'cases',
	initialState: {
		isLoading: false,
		isSuccess: false,
		isError: false,
		cases: {},
	},
	extraReducers: {
		[getCovidCases.pending]: (state, action) => {
			state.isLoading = true;
			state.isSuccess = false;
			state.isError = false;
			state.cases = {};
		},
		[getCovidCases.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.isError = false;
			state.cases = action.payload.Global;
		},
		[getCovidCases.rejected]: (state, action) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = true;
			state.cases = {};
		},
	},
});

export default covidSlice.reducer;
