import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LogInInput = ({ state, dispatch, updateEmail, updatePassword, goToSignup, loginPressed }) => {
	return (
		<View style={styles.inputContainer}>
			<TextInput style={styles.emailInput} onChangeText={(email) => dispatch(updateEmail({ email: email }))} value={state.email} placeholder='Email' placeholderTextColor='#FFFFFF' underlineColorAndroid='transparent'></TextInput>
			<TextInput
				style={styles.passwordInput}
				secureTextEntry={true}
				onChangeText={(password) => dispatch(updatePassword({ password: password }))}
				value={state.password}
				placeholder='Password'
				placeholderTextColor='#FFFFFF'
				underlineColorAndroid='transparent'
			></TextInput>
			<TouchableOpacity onPress={goToSignup} style={styles.signUpButton}>
				<Text style={styles.signUpText}>Sign Up</Text>
			</TouchableOpacity>
			<TouchableOpacity testID={'loginButton'} onPress={loginPressed} style={styles.loginButton}>
				<Text style={styles.logInText}>Log In</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		flex: 4
	},
	emailInput: {
		width: 320,
		borderRadius: 30,
		alignSelf: 'center',
		color: '#FFFFFF',
		marginBottom: 10,
		padding: 30,
		borderWidth: 1,
		borderColor: '#ededed'
	},
	passwordInput: {
		width: 320,
		borderRadius: 30,
		alignSelf: 'center',
		color: '#FFFFFF',
		padding: 30,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: '#ededed'
	},
	signUpButton: {
		width: 150,
		height: 55,
		borderRadius: 70,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		elevation: 8,
		color: '#fff',
		padding: 20,
		marginBottom: 10,
		backgroundColor: '#FFFFFF'
	},
	loginButton: {
		width: 240,
		height: 60,
		borderRadius: 70,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		elevation: 8,
		color: '#fff',
		padding: 20,
		backgroundColor: '#FFFFFF'
	},
	logInText: {
		color: '#EB8873',
		fontSize: 14,
		fontWeight: 'bold'
	},
	signUpText: {
		color: '#EB8873',
		fontSize: 11,
		fontWeight: 'bold'
	}
});

export default LogInInput;
