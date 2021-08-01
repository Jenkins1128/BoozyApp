import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	currentState: {}
};

export const signUpAsync = createAsyncThunk('signUpAsync/status', async (data, { rejectWithValue }) => {
	console.log(data);
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

export const signUpSlice = createSlice({
	name: 'signUpAsync',
	initialState,
	reducers: {
		updateEmail: (state, { payload }) => {
			state.currentState = { ...state.currentState, email: payload.email };
		},
		updatePassword: (state, { payload }) => {
			state.currentState = { ...state.currentState, password: payload.password };
		},
		resetStatus: (state) => {
			state.currentState.requestStatus = 'idle';
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(signUpAsync.pending, (state) => {
				state.currentState = { ...state.currentState, requestStatus: 'pending', isLoading: true };
			})
			.addCase(signUpAsync.fulfilled, (state) => {
				state.currentState = { ...state.currentState, requestStatus: 'fulfilled', isLoading: false };
			})
			.addCase(signUpAsync.rejected, (state) => {
				state.currentState = { ...state.currentState, requestStatus: 'rejected', isLoading: false };
			});
	}
});

export const { updateEmail, updatePassword, resetStatus } = signUpSlice.actions;
export const selectSignUpState = (state) => state.signup.currentState;

export default signUpSlice.reducer;
