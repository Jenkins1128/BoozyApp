import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	currentState: {}
};

export const loginAsync = createAsyncThunk('loginAsync/status', async (data, { rejectWithValue }) => {
	try {
		const response = await axios.post(data.url, {
			email: data.email,
			password: data.password
		});
		return response.status;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

const loginSlice = createSlice({
	name: 'loginAsync',
	initialState,
	reducers: {
		updateEmail: (state, { payload }) => {
			state.currentState = { ...state.currentState, email: payload.email };
		},
		updatePassword: (state, { payload }) => {
			state.currentState = { ...state.currentState, password: payload.password };
		},
		reset: (state) => {
			state.currentState = {};
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginAsync.pending, (state) => {
				state.currentState = { ...state.currentState, requestStatus: 'pending', isLoading: true };
			})
			.addCase(loginAsync.fulfilled, (state) => {
				state.currentState = { ...state.currentState, requestStatus: 'fulfilled', isLoading: false };
			})
			.addCase(loginAsync.rejected, (state) => {
				state.currentState = { ...state.currentState, requestStatus: 'rejected', isLoading: false };
			});
	}
});

export const { updateEmail, updatePassword, reset } = loginSlice.actions;
export const selectLogInState = (state) => state.login.currentState;

export default loginSlice.reducer;
