import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	currentState: {
		allCategories: '',
		alreadyFavorited: false,
		alreadyRated: false,
		restaurantsArray: []
	}
};

export const getFavoritesAsync = createAsyncThunk('getFavoritesAsync/status', async (data, { rejectWithValue }) => {
	try {
		const response = await axios.get('https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/get');
		return response.data;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const getFavoritesSlice = createSlice({
	name: 'getFavoritesAsync',
	initialState,
	reducers: {
		resetGetFavoritesRequestStatus: (state) => {
			state.currentState.getFavoritesRequestStatus = 'idle';
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getFavoritesAsync.fulfilled, (state, { payload }) => {
			Object.assign(state.currentState, {
				restaurantsArray: payload,
				getFavoritesRequestStatus: 'fulfilled'
			});
		});
		builder.addCase(getFavoritesAsync.rejected, (state) => {
			state.currentState.getFavoritesRequestStatus = 'rejected';
		});
	}
});

export const { resetGetFavoritesRequestStatus } = getFavoritesSlice.actions;
export const selectFavoritesState = (state) => state.profile.currentState;
export default getFavoritesSlice.reducer;
