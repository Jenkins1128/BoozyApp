import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../helpers/constants';

const initialState = {
	currentState: {}
};

export const getDataFromFilterAsync = createAsyncThunk('getDataFromFilterAsync/status', async (data, { rejectWithValue }) => {
	const { location, priceType, cuisine } = data;
	try {
		const response = await axios.get(`${baseUrl}/yelp/${location}/${priceType}/${cuisine}`);
		return response.data;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const getDataFromFilterSlice = createSlice({
	name: 'getDataFromFilterAsync',
	initialState,
	reducers: {
		resetDataFromFilterRequestStatus: (state) => {
			state.currentState.dataFromFilterRequestStatus = 'idle';
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getDataFromFilterAsync.fulfilled, (state, { payload }) => {
			Object.assign(state.currentState, {
				restaurantsArray: payload,
				dataFromFilterRequestStatus: 'fulfilled'
			});
		});
		builder.addCase(getDataFromFilterAsync.rejected, (state) => {
			state.currentState.dataFromFilterRequestStatus = 'rejected';
		});
	}
});

export const { resetDataFromFilterRequestStatus } = getDataFromFilterSlice.actions;
export const selectDataFromFilterState = (state) => state.dataFromFilter.currentState;
export default getDataFromFilterSlice.reducer;
