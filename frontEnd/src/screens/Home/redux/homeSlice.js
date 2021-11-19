import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../helpers/constants';

const initialState = {
	currentState: {
		location: '',
		cuisine: null,
		priceType: 6,
		$color: 'white',
		$$color: 'white',
		$$$color: 'white',
		$$$$color: 'white',
		allCategories: '',
		alreadyFavorited: false,
		alreadyRated: false,
		restaurantsArray: [],
		initialPosition: {
			latitude: 0,
			longitude: 0
		},
		markerPosition: {
			latitude: 0,
			longitude: 0
		}
	}
};

export const getCurrentLocationDataAsync = createAsyncThunk('getCurrentLocationDataAsync/status', async (data, { rejectWithValue }) => {
	const { latitude, longitude } = data;
	try {
		const response = await axios.get(`${baseUrl}/yelp/${latitude}/${longitude}`);
		return response.data;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const homeSlice = createSlice({
	name: 'getCurrentLocationDataAsync',
	initialState,
	reducers: {
		updateLocation: (state, { payload }) => {
			state.currentState.location = payload.location;
		},
		updateCuisine: (state, { payload }) => {
			state.currentState.cuisine = payload.cuisine;
		},
		updatePriceType: (state, { payload }) => {
			state.currentState.priceType = payload.priceType;
		},
		update$color: (state, { payload }) => {
			state.currentState.$color = payload.$color;
		},
		update$$color: (state, { payload }) => {
			state.currentState.$$color = payload.$$color;
		},
		update$$$color: (state, { payload }) => {
			state.currentState.$$$color = payload.$$$color;
		},
		update$$$$color: (state, { payload }) => {
			state.currentState.$$$$color = payload.$$$$color;
		},
		updateAllCategories: (state, { payload }) => {
			state.currentState.allCategories = payload.allCategories;
		},
		updateAlreadyFavorited: (state, { payload }) => {
			state.currentState.alreadyFavorited = payload.alreadyFavorited;
		},
		updateAlreadyRated: (state, { payload }) => {
			state.currentState.alreadyRated = payload.alreadyRated;
		},
		updateRestaurantsArray: (state, { payload }) => {
			state.currentState.restaurantsArray = payload.restaurantsArray;
		},
		updateInitialPosition: (state, { payload }) => {
			state.currentState.initialPosition = payload.initialPosition;
		},
		updateMarkerPosition: (state, { payload }) => {
			state.currentState.markerPosition = payload.markerPosition;
		},
		reset: (state) => {
			Object.assign(state.currentState, {
				location: '',
				cuisine: null,
				priceType: 6,
				$color: 'white',
				$$color: 'white',
				$$$color: 'white',
				$$$$color: 'white'
			});
		},
		setPrice1: (state) => {
			Object.assign(state.currentState, {
				priceType: 1,
				$color: 'yellow',
				$$color: 'white',
				$$$color: 'white',
				$$$$color: 'white'
			});
		},
		setPrice2: (state) => {
			Object.assign(state.currentState, {
				priceType: 2,
				$color: 'white',
				$$color: 'yellow',
				$$$color: 'white',
				$$$$color: 'white'
			});
		},
		setPrice3: (state) => {
			Object.assign(state.currentState, {
				priceType: 3,
				$color: 'white',
				$$color: 'white',
				$$$color: 'yellow',
				$$$$color: 'white'
			});
		},
		setPrice4: (state) => {
			Object.assign(state.currentState, {
				priceType: 4,
				$color: 'white',
				$$color: 'white',
				$$$color: 'white',
				$$$$color: 'yellow'
			});
		},
		resetHomeRequestStatus: (state) => {
			state.currentState.locationDataRequestStatus = 'idle';
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCurrentLocationDataAsync.fulfilled, (state, { payload }) => {
				Object.assign(state.currentState, {
					locationDataRequestStatus: 'fulfilled',
					restaurantsArray: payload
				});
			})
			.addCase(getCurrentLocationDataAsync.rejected, (state) => {
				state.currentState.locationDataRequestStatus = 'rejected';
			});
	}
});

export const {
	updateLocation,
	updateCuisine,
	updatePriceType,
	update$color,
	update$$color,
	update$$$color,
	update$$$$color,
	updateAllCategories,
	updateAlreadyFavorited,
	updateAlreadyRated,
	updateRestaurantsArray,
	updateInitialPosition,
	updateMarkerPosition,
	reset,
	setPrice1,
	setPrice2,
	setPrice3,
	setPrice4,
	resetHomeRequestStatus
} = homeSlice.actions;

export const selectHomeState = (state) => state.home.currentState;
export default homeSlice.reducer;
