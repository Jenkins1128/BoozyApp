import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	currentState: {}
};

export const logoutAsync = createAsyncThunk('logoutAsync/status', async (data, { rejectWithValue }) => {
	try {
		const response = await axios.post('https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/logout');
		return response.status;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const settingsSlice = createSlice({
	name: 'logoutAsync',
	initialState,
	reducers: {
		resetSettingsRequestStatus: (state) => {
			state.currentState.settingsRequestStatus = 'idle';
		}
	},
	extraReducers: (builder) => {
		builder.addCase(logoutAsync.fulfilled, (state) => {
			state.currentState.settingsRequestStatus = 'fulfilled';
		});
		builder.addCase(logoutAsync.rejected, (state) => {
			state.currentState.settingsRequestStatus = 'rejected';
		});
	}
});

export const { resetSettingsRequestStatus } = settingsSlice.actions;
export const selectSettingsState = (state) => state.settings.currentState;
export default settingsSlice.reducer;
