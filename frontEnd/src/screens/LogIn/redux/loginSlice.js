import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../helpers/constants';

const initialState = {
	currentState: {}
};

export const loginAsync = createAsyncThunk('loginAsync/status', async (data, { rejectWithValue }) => {
	const { email, password } = data;
	try {
		const response = await axios.post(`${baseUrl}/login`, {
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
