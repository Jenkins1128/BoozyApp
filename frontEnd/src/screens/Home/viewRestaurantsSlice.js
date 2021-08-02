import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	currentState: {}
};

export const viewRestaurantsAsync = createAsyncThunk('viewRestaurantsAsync/status', async (data, { rejectWithValue }) => {
	const { index, state } = data;
	state.index = index;
	const restaurantId = state.restaurantsArray[index]['id'];
	const name = state.restaurantsArray[index]['name'];
	try {
		const alreadyFavoritedResponse = await axios.post('https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/favorites', {
			restaurantId: restaurantId,
			name: name
		});
		state.alreadyFavorited = alreadyFavoritedResponse.data[0]['contains'];
		const alreadyRatedResponse = await axios.get(`https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/${state.restaurantsArray[index]['id']}/review`);
		state.alreadyRated = alreadyRatedResponse.data[0]['contains'];
		state.allCategories = '';
		for (let i = 0; i < state.restaurantsArray[index]['categories'].length; i++) {
			if (i == 0) {
				state.allCategories += state.restaurantsArray[index]['categories'][i]['title'];
			} else {
				state.allCategories += ', ' + state.restaurantsArray[index]['categories'][i]['title'];
			}
		}
		const newState = { ...state, restaurantsArray: [state.restaurantsArray[index]] };
		return newState;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const viewRestaurantsSlice = createSlice({
	name: 'viewRestaurantsAsync',
	initialState,
	reducers: {
		resetRestaurantRequestStatus: (state) => {
			state.currentState.restaurantRequestStatus = 'idle';
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(viewRestaurantsAsync.fulfilled, (state, { payload }) => {
				state.currentState = { ...state.currentState, restaurantInfo: payload, restaurantRequestStatus: 'fulfilled' };
			})
			.addCase(viewRestaurantsAsync.rejected, (state) => {
				state.currentState = { ...state.currentState, restaurantRequestStatus: 'rejected' };
			});
	}
});

export const { resetRestaurantRequestStatus } = viewRestaurantsSlice.actions;
export const selectRestaurantState = (state) => state.restaurant.currentState;

export default viewRestaurantsSlice.reducer;
