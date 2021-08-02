import React, { useEffect } from 'react';
import { Alert, View, StyleSheet, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmail, updatePassword, resetStatus, signUpAsync, selectSignUpState } from './signUpSlice';
import background from '../../images/background.jpg';
import SignUpHeader from './SignUpHeader';
import SignUpInput from './SignUpInput';

const SignUp = ({ navigation }) => {
	const state = useSelector(selectSignUpState);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isEmpty(state)) {
			return;
		}
		if (state.requestStatus === 'rejected') {
			dispatch(resetStatus());
			showErrorAlert('Username already exists...');
			return;
		}
		if (state.requestStatus === 'fulfilled') {
			dispatch(resetStatus());
			login();
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

	const login = () => {
		navigation.navigate('Login');
	};

	const signup = () => {
		if (isEmpty(state) || !state.email.trim().length || !state.password.trim().length) {
			showErrorAlert('Please fill out all fields.');
			return;
		}
		dispatch(signUpAsync({ email: state.email, password: state.password }));
	};

	const goToHome = () => {
		navigation.navigate('Home');
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<ImageBackground source={background} style={styles.backgroundImage}>
					<SignUpHeader state={state} login={login} />
					<SignUpInput state={state} dispatch={dispatch} updateEmail={updateEmail} updatePassword={updatePassword} signup={signup} />
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

export default SignUp;
