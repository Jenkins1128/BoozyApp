import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmail, updatePassword, resetStatus, loginAsync, selectLogInState } from './redux/loginSlice';
import background from '../../images/background.jpeg';

import LogInHeader from './LogInHeader/LogInHeader';
import LogInInput from './LogInInput/LogInInput';

const LogIn = ({ navigation }) => {
	const state = useSelector(selectLogInState);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isEmpty(state)) {
			return;
		}
		if (state.requestStatus === 'fulfilled') {
			dispatch(resetStatus());
			goToHome();
		} else if (state.requestStatus === 'rejected') {
			dispatch(resetStatus());
			showErrorAlert('Username or password is incorrect.');
		}
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

	const goToHome = () => {
		navigation.navigate('Home');
	};

	const signup = () => {
		navigation.navigate('SignUp');
	};

	const login = () => {
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
					<LogInInput state={state} dispatch={dispatch} updateEmail={updateEmail} updatePassword={updatePassword} signup={signup} login={login} />
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