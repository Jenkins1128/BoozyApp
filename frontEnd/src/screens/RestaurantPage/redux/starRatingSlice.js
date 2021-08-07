import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	currentState: {}
};

export const starRatingAsync = createAsyncThunk('starRatingAsync/status', async (data, { rejectWithValue }) => {
	const { rating, restaurantId, restaurantName } = data;
	try {
		const response = await axios.post('https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/user/' + restaurantId + '/restaurants', {
			content: rating,
			name: restaurantName
		});
		return response.status;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const starRatingSlice = createSlice({
	name: 'starRatingAsync',
	initialState,
	reducers: {
		resetStarRatingRequestStatus: (state) => {
			state.currentState.starRatingRequestStatus = 'idle';
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(starRatingAsync.fulfilled, (state) => {
				state.currentState.starRatingRequestStatus = 'fulfilled';
			})
			.addCase(starRatingAsync.rejected, (state) => {
				state.currentState.starRatingRequestStatus = 'rejected';
			});
	}
});

export const { resetStarRatingRequestStatus } = starRatingSlice.actions;

export const selectStarRatingState = (state) => state.starRating.currentState;
export default starRatingSlice.reducer;
