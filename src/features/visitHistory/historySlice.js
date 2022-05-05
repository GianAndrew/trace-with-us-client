import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../api/serverApi';

export const getVisitHistoryById = createAsyncThunk('visitHistory/getAllHealthData', async (visitid) => {
	try {
		const { data } = await axiosApi.get(`/healthForm/find`, { params: { id: visitid } });
		return data[0];
	} catch (error) {
		return error?.response?.data;
	}
});

const historySlice = createSlice({
	name: 'historyDetails',
	initialState: {
		isLoading: false,
		isSuccess: false,
		isError: false,
		data: {},
	},
	extraReducers: {
		[getVisitHistoryById.pending]: (state, action) => {
			state.isLoading = true;
			state.isSuccess = false;
			state.isError = false;
			state.data = {};
		},
		[getVisitHistoryById.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.isError = false;
			state.data = action.payload;
		},
		[getVisitHistoryById.rejected]: (state, action) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = true;
			state.data = {};
		},
	},
});

export default historySlice.reducer;
