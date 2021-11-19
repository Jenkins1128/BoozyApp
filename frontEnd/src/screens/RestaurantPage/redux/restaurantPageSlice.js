import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl, defaultRestaurantImageUrl } from '../../../helpers/constants';

const initialState = {
	currentState: {
		restaurantId: '',
		restaurantName: '',
		restaurantImage: defaultRestaurantImageUrl,
		phoneNumber: '',
		allCategories: '',
		rating: 0.0,
		reviews: 0,
		favoriteColor: 'white',
		changeFavoritedColor: '',
		starCount: 0,
		favorited: false,
		rated: false,
		price: 0.0,
		description: '',
		menuItemArray: []
	}
};

export const getMenuItemsAsync = createAsyncThunk('getMenuItemsAsync/status', async (restaurantId, { rejectWithValue }) => {
	try {
		const response = await axios.post(`${baseUrl}/menu/list`, {
			restaurantId: restaurantId
		});
		return response.data;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const restaurantPageSlice = createSlice({
	name: 'getMenuItemsAsync',
	initialState,
	reducers: {
		updateState: (state, { payload }) => {
			Object.assign(state.currentState, {
				restaurantId: payload.params.id,
				restaurantName: payload.params.name,
				restaurantImage: payload.params.img,
				phoneNumber: payload.params.phone,
				allCategories: payload.params.allCategories,
				rating: payload.params.rating,
				reviews: payload.params.reviews,
				rated: payload.params.alreadyRated,
				favorited: payload.params.alreadyFavorited,
				starCount: 0
			});
		},
		updateFavoriteColor: (state, { payload }) => {
			state.currentState.favoriteColor = payload.color;
		},
		updateStarCount: (state, { payload }) => {
			state.currentState.starCount = payload.starCount;
		},
		updateMenuItems: (state, { payload }) => {
			state.currentState.menuItemArray.push(payload.menuItem);
		},
		resetRestaurantPageRequestStatus: (state) => {
			state.currentState.restaurantPageRequestStatus = 'idle';
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getMenuItemsAsync.fulfilled, (state, { payload }) => {
				Object.assign(state.currentState, {
					restaurantPageRequestStatus: 'fulfilled',
					menuItemArray: payload
				});
			})
			.addCase(getMenuItemsAsync.rejected, (state) => {
				state.currentState.restaurantPageRequestStatus = 'rejected';
			});
	}
});

export const { updateState, updateFavoriteColor, updateStarCount, updateMenuItems, resetRestaurantPageRequestStatus } = restaurantPageSlice.actions;

export const selectRestaurantPageState = (state) => state.restaurantPage.currentState;
export default restaurantPageSlice.reducer;
