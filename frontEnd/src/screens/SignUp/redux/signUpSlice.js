import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../helpers/constants';

const initialState = {
	currentState: {}
};

export const signUpAsync = createAsyncThunk('signUpAsync/status', async (data, { rejectWithValue }) => {
	const { email, password } = data;
	try {
		const response = await axios.post(`${baseUrl}/register`, {
			email,
			password
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
			state.currentState.email = payload.email;
		},
		updatePassword: (state, { payload }) => {
			state.currentState.password = payload.password;
		},
		resetStatus: (state) => {
			state.currentState.requestStatus = 'idle';
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(signUpAsync.pending, (state) => {
				Object.assign(state.currentState, {
					requestStatus: 'pending',
					isLoading: true
				});
			})
			.addCase(signUpAsync.fulfilled, (state) => {
				Object.assign(state.currentState, {
					requestStatus: 'fulfilled',
					isLoading: false
				});
			})
			.addCase(signUpAsync.rejected, (state) => {
				Object.assign(state.currentState, {
					requestStatus: 'rejected',
					isLoading: false
				});
			});
	}
});

export const { updateEmail, updatePassword, resetStatus } = signUpSlice.actions;
export const selectSignUpState = (state) => state.signup.currentState;

export default signUpSlice.reducer;
