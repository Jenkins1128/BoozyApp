import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isSignedIn: 'false'
};

const appSlice = createSlice({
	name: 'appSlice',
	initialState,
	reducers: {
		setSignedIn: (state, { payload }) => {
			state.isSignedIn = payload.signedIn;
		}
	}
});

export const { setSignedIn } = appSlice.actions;
export const selectIsSignedIn = (state) => state.app.isSignedIn;
export default appSlice.reducer;
