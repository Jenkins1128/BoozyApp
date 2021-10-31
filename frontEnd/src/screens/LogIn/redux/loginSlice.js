import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	currentState: {}
};

export const loginAsync = createAsyncThunk('loginAsync/status', async (data, { rejectWithValue }) => {
	const { email, password } = data;
	try {
		const response = await axios.post('https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/login', {
			email,
			password
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
			.addCase(loginAsync.pending, (state) => {
				Object.assign(state.currentState, {
					requestStatus: 'pending',
					isLoading: true
				});
			})
			.addCase(loginAsync.fulfilled, (state) => {
				Object.assign(state.currentState, {
					requestStatus: 'fulfilled',
					isLoading: false
				});
			})
			.addCase(loginAsync.rejected, (state) => {
				Object.assign(state.currentState, {
					requestStatus: 'rejected',
					isLoading: false
				});
			});
	}
});

export const { updateEmail, updatePassword, resetStatus } = loginSlice.actions;
export const selectLogInState = (state) => state.login.currentState;

export default loginSlice.reducer;
