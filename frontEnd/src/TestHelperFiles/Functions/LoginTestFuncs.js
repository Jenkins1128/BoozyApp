import { Alert } from 'react-native';

const ShowErrorAlert = {
	showErrorAlert: (errorString) => {
		Alert.alert('Uh oh', errorString, [{ text: 'OK' }]);
	}
};

const isEmpty = (currentState) => {
	for (const x in currentState) {
		return false;
	}
	return true;
};

export { ShowErrorAlert, isEmpty };
