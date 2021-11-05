import { Alert } from 'react-native';

const ShowErrorAlert = {
	showErrorAlert: (errorString) => {
		Alert.alert('Uh oh', errorString, [{ text: 'OK' }]);
	}
};

export default ShowErrorAlert;
