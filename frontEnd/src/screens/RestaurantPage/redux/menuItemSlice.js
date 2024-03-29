import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../helpers/constants';

const initialState = {
	currentState: {}
};

export const postMenuItemAsync = createAsyncThunk('postMenuItemAsync/status', async (data, { rejectWithValue }) => {
	const { description, price, restaurantName, restaurantId } = data;
	try {
		const response = await axios.post(`${baseUrl}/user/${restaurantId}/menu`, {
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
		updatePrice: (state, { payload }) => {
			state.currentState.price = payload.price;
		},
		updateDescription: (state, { payload }) => {
			state.currentState.description = payload.description;
		},
		resetMenuItem: (state) => {
			Object.assign(state.currentState, {
				price: '',
				description: '',
				postMenuItemRequestStatus: 'idle'
			});
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(postMenuItemAsync.fulfilled, (state) => {
				state.currentState.postMenuItemRequestStatus = 'fulfilled';
			})
			.addCase(postMenuItemAsync.rejected, (state) => {
				state.currentState.postMenuItemRequestStatus = 'rejected';
			});
	}
});

export const { updatePrice, updateDescription, resetMenuItem } = postMenuItemSlice.actions;

export const selectMenuItemState = (state) => state.menuItem.currentState;
export default postMenuItemSlice.reducer;
