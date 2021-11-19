import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../helpers/constants';

const initialState = {
	currentState: {}
};

export const viewRestaurantsAsync = createAsyncThunk('viewRestaurantsAsync/status', async (data, { rejectWithValue }) => {
	const { index, state } = data;
	state.index = index;
	let restaurantId;
	if (state.restaurantsArray[index]['id']) {
		restaurantId = state.restaurantsArray[index]['id'];
	} else if (state.restaurantsArray[index]['restaurantId']) {
		restaurantId = state.restaurantsArray[index]['restaurantId'];
	}
	const name = state.restaurantsArray[index]['name'];
	try {
		const alreadyFavoritedResponse = await axios.post(`${baseUrl}/favorites`, {
			restaurantId: restaurantId,
			name: name
		});
		const alreadyRatedResponse = await axios.get(`${baseUrl}/${restaurantId}/review`);
		const categories = state.restaurantsArray[index]['categories'] ? state.restaurantsArray[index]['categories'].map((obj) => obj.title) : [];
		const categoriesString = categories.length ? categories.join(', ') : '';
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
				Object.assign(state.currentState, {
					restaurantInfo: payload,
					restaurantRequestStatus: 'fulfilled'
				});
			})
			.addCase(viewRestaurantsAsync.rejected, (state) => {
				state.currentState.restaurantRequestStatus = 'rejected';
			});
	}
});

export const { resetRestaurantRequestStatus } = viewRestaurantsSlice.actions;
export const selectRestaurantState = (state) => state.restaurant.currentState;

export default viewRestaurantsSlice.reducer;
