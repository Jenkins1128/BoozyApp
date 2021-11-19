import { Alert } from 'react-native';

const SignupTestFuncs = {
	showErrorAlert: (errorString) => {
		Alert.alert('Uh oh', errorString, [{ text: 'OK' }]);
	},
	isEmpty: (currentState) => {
		for (const x in currentState) {
			return false;
		}
		return true;
	}
};

export default SignupTestFuncs;
