import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	currentState: {}
};

export const favoriteAsync = createAsyncThunk('favoriteAsync/status', async (data, { rejectWithValue }) => {
	const { restaurantId, name } = data;
	try {
		//favorite restaurant
		await axios.post('https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/user/add', {
			restaurantId: restaurantId,
			name: name
		});
		//add restaurants to your favorites
		const response = await axios.post('https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/favorites', {
			restaurantId: restaurantId,
			name: name
		});
		return response.data;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

const favoriteSlice = createSlice({
	name: 'favoriteAsync',
	initialState,
	reducers: {
		resetFavorite: (state) => {
			state.currentState = { ...state.currentState, favoriteRequestStatus: 'idle' };
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(favoriteAsync.fulfilled, (state, { payload }) => {
				state.currentState = { ...state.currentState, favoriteColor: payload[0]['contains'] ? 'red' : 'white', favoriteRequestStatus: 'fulfilled' };
			})
			.addCase(favoriteAsync.rejected, (state) => {
				state.currentState = { ...state.currentState, favoriteRequestStatus: 'rejected' };
			});
	}
});

export const { resetFavorite } = favoriteSlice.actions;

export const selectFavoriteState = (state) => state.favorite.currentState;
export default favoriteSlice.reducer;
