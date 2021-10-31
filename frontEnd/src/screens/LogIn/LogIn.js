import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmail, updatePassword, resetStatus, loginAsync, selectLogInState } from './redux/loginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import background from '../../images/background.jpeg';
import LogInHeader from './LogInHeader/LogInHeader';
import LogInInput from './LogInInput/LogInInput';
import { setSignedIn } from '../../../appSlice';

const LogIn = ({ navigation }) => {
	const state = useSelector(selectLogInState);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isEmpty(state)) {
			return;
		}
		if (state.requestStatus === 'fulfilled') {
			goToHome();
		} else if (state.requestStatus === 'rejected') {
			showErrorAlert('Username or password is incorrect.');
		}
		dispatch(resetStatus());
	}, [state]);

	const isEmpty = (currentState) => {
		for (const x in currentState) {
			return false;
		}
		return true;
	};

	const showErrorAlert = (errorString) => {
		Alert.alert('Uh oh', errorString, [{ text: 'OK' }]);
	};

	const goToSignup = () => {
		navigation.navigate('SignUp');
	};

	const goToHome = () => {
		setIsSignedInAsyncStorage('true');
		dispatch(setSignedIn({ signedIn: 'true' }));
	};

	const setIsSignedInAsyncStorage = async (value) => {
		try {
			await AsyncStorage.setItem('@isSignedIn', value);
		} catch (e) {
			// saving error
		}
	};

	const loginPressed = () => {
		if (isEmpty(state) || !state.email.trim().length || !state.password.trim().length) {
			showErrorAlert('Please fill out all the fields.');
			return;
		}
		dispatch(loginAsync({ email: state.email, password: state.password }));
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<ImageBackground source={background} style={styles.backgroundImage}>
					<LogInHeader state={state} />
					<LogInInput state={state} dispatch={dispatch} updateEmail={updateEmail} updatePassword={updatePassword} goToSignup={goToSignup} loginPressed={loginPressed} />
				</ImageBackground>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	backgroundImage: {
		flex: 1,
		width: '100%',
		height: '100%',
		opacity: 0.95
	}
});

export default LogIn;
