const dispatch = jest.fn(),
	setIsSignedInAsyncStorage = jest.fn(),
	setSignedIn = jest.fn(),
	resetSettingsRequestStatus = jest.fn(),
	logoutAsync = jest.fn();

const SettingsTestFuncs = {
	goToLogin: () => {
		setIsSignedInAsyncStorage('false');
		dispatch(setSignedIn({ signedIn: 'false' }));
		dispatch(resetSettingsRequestStatus());
	},
	setIsSignedInAsyncStorage: async (value) => {
		try {
			await AsyncStorage.setItem('@isSignedIn', value);
		} catch (e) {}
	},
	logout: () => {
		dispatch(logoutAsync());
	}
};

export default SettingsTestFuncs;
