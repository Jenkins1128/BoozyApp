import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	currentState: {}
};

export const getDataFromFilterAsync = createAsyncThunk('getDataFromFilterAsync/status', async (data, { rejectWithValue }) => {
	const { location, priceType, cuisine } = data;
	console.log(location, priceType, cuisine);
	try {
		const response = await axios.get('https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/yelp/' + location + '/' + priceType + '/' + cuisine);
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
			state.currentState = { ...state.currentState, restaurantsArray: payload, dataFromFilterRequestStatus: 'fulfilled' };
		});
		builder.addCase(getDataFromFilterAsync.rejected, (state) => {
			state.currentState = { ...state.currentState, dataFromFilterRequestStatus: 'rejected' };
		});
	}
});

export const { resetDataFromFilterRequestStatus } = getDataFromFilterSlice.actions;
export const selectDataFromFilterState = (state) => state.dataFromFilter.currentState;
export default getDataFromFilterSlice.reducer;
