import { useNavigation } from '@react-navigation/native';

const GoToLogin = {
	goToLogin: () => {
		const navigation = useNavigation();
		navigation.navigate('Login');
	}
};

export default GoToLogin;
