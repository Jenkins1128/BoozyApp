import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../helpers/constants';

const initialState = {
	currentState: {}
};

export const favoriteAsync = createAsyncThunk('favoriteAsync/status', async (data, { rejectWithValue }) => {
	const { restaurantId, name } = data;
	try {
		//favorite restaurant
		await axios.post(`${baseUrl}/user/add`, {
			restaurantId: restaurantId,
			name: name
		});
		//add restaurants to your favorites
		const response = await axios.post(`${baseUrl}/favorites`, {
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
			state.currentState.favoriteRequestStatus = 'idle';
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(favoriteAsync.fulfilled, (state, { payload }) => {
				Object.assign(state.currentState, {
					favoriteColor: payload[0]['contains'] ? 'red' : 'white',
					favoriteRequestStatus: 'fulfilled'
				});
			})
			.addCase(favoriteAsync.rejected, (state) => {
				state.currentState.favoriteRequestStatus = 'rejected';
			});
	}
});

export const { resetFavorite } = favoriteSlice.actions;

export const selectFavoriteState = (state) => state.favorite.currentState;
export default favoriteSlice.reducer;
