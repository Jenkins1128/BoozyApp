import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	currentState: {}
};

export const viewRestaurantsAsync = createAsyncThunk('viewRestaurantsAsync/status', async (data, { rejectWithValue }) => {
	const { index, state } = data;
	console.log(data);
	state.index = index;
	let restaurantId;
	if (state.restaurantsArray[index]['id']) {
		restaurantId = state.restaurantsArray[index]['id'];
	} else if (state.restaurantsArray[index]['restaurantId']) {
		restaurantId = state.restaurantsArray[index]['restaurantId'];
	}
	const name = state.restaurantsArray[index]['name'];
	console.log(name, restaurantId);
	try {
		const alreadyFavoritedResponse = await axios.post('https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/favorites', {
			restaurantId: restaurantId,
			name: name
		});
		console.log('alreadyFavoritedResponse');
		const alreadyRatedResponse = await axios.get(`https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/${restaurantId}/review`);
		console.log('alreadyRatedResponse');
		const categories = state.restaurantsArray[index]['categories'] ? state.restaurantsArray[index]['categories'].map((obj) => obj.title) : [];
		const categoriesString = categories.length ? categories.join(', ') : '';
		console.log(categoriesString);
		const newState = {
			...state,
			alreadyFavorited: alreadyFavoritedResponse.data[0]['contains'],
			alreadyRated: alreadyRatedResponse.data[0]['contains'],
			allCategories: categoriesString,
			restaurantsArray: [state.restaurantsArray[index]]
		};
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
