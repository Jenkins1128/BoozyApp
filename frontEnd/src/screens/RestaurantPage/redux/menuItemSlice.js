import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	currentState: {}
};

export const postMenuItemAsync = createAsyncThunk('postMenuItemAsync/status', async (data, { rejectWithValue }) => {
	const { description, price, restaurantName, restaurantId } = data;
	try {
		const response = await axios.post('https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/user/' + restaurantId + '/menu', {
			content: description,
			price: price,
			name: restaurantName
		});
		return response.status;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

const postMenuItemSlice = createSlice({
	name: 'postMenuItemAsync',
	initialState,
	reducers: {
		updatePrice: (state) => {
			state.currentState = { ...state.currentState, price: '' };
		},
		updateDescription: (state) => {
			state.currentState = { ...state.currentState, description: '' };
		},
		resetMenuItem: (state) => {
			state.currentState = { ...state.currentState, price: '', description: '' };
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(postMenuItemAsync.fulfilled, (state) => {
				state.currentState = { ...state.currentState, postMenuItemRequestStatus: 'fulfilled' };
			})
			.addCase(postMenuItemAsync.rejected, (state) => {
				state.currentState = { ...state.currentState, postMenuItemRequestStatus: 'rejected' };
			});
	}
});

export const { updatePrice, updateDescription, resetMenuItem } = postMenuItemSlice.actions;

export const selectMenuItemState = (state) => state.menuItem.currentState;
export default postMenuItemSlice.reducer;
