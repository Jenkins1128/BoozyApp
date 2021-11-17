import React, { useEffect } from 'react';
import { Alert, View, StyleSheet, ImageBackground, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmail, updatePassword, resetStatus, signUpAsync, selectSignUpState } from './redux/signUpSlice';
import background from '../../images/background.jpg';
import SignUpHeader from './SignUpHeader/SignUpHeader';
import SignUpInput from './SignUpInput/SignUpInput';
import { getOS } from '../../helpers/os';

const SignUp = ({ navigation }) => {
	const state = useSelector(selectSignUpState);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isEmpty(state)) {
			return;
		}
		switch (state.requestStatus) {
			case 'idle':
				return;
			case 'rejected':
				showErrorAlert('Username already exists...');
				break;
			case 'fulfilled':
				goToLogin();
				break;
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

	const goToLogin = () => {
		navigation.navigate('Login');
	};

	const signupPressed = () => {
		if (isEmpty(state) || !state.email.trim().length || !state.password.trim().length) {
			showErrorAlert('Please fill out all fields.');
			return;
		}
		if (state.password.trim().length < 6) {
			showErrorAlert('Password needs to be greater than 5 characters.');
			return;
		}
		dispatch(signUpAsync({ email: state.email, password: state.password }));
		console.log('email', state.email, 'pass', state.password);
	};

	return (
		<KeyboardAvoidingView testID={'container'} behavior={getOS() === 'ios' ? 'padding' : 'height'} style={styles.container}>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View testID={'inner'} style={styles.inner}>
					<ImageBackground testID={'backgroundImage'} source={background} style={styles.backgroundImage}>
						<SignUpHeader state={state} goToLogin={goToLogin} />
						<SignUpInput state={state} dispatch={dispatch} updateEmail={updateEmail} updatePassword={updatePassword} signupPressed={signupPressed} />
					</ImageBackground>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	inner: {
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

export default SignUp;
