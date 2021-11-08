import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SignUpInput = ({ state, dispatch, updateEmail, updatePassword, signupPressed }) => {
	return (
		<View style={styles.inputContainer}>
			<TextInput
				testID={'emailInput'}
				style={styles.emailInput}
				onChangeText={(email) => dispatch(updateEmail({ email: email }))}
				value={state.email}
				placeholder='Email'
				placeholderTextColor='#EB8873'
				underlineColorAndroid='transparent'
			></TextInput>
			<TextInput
				testID={'passwordInput'}
				style={styles.passwordInput}
				secureTextEntry={true}
				onChangeText={(password) => dispatch(updatePassword({ password: password }))}
				value={state.password}
				placeholder='Password'
				placeholderTextColor='#EB8873'
				underlineColorAndroid='transparent'
			></TextInput>
			<TouchableOpacity testID={'signupPressed'} onPress={signupPressed} style={styles.signUpButton}>
				<Text style={styles.signUpText}>Sign Up</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		flex: 3,
		width: '100%',
		paddingHorizontal: 40
	},
	emailInput: {
		borderRadius: 30,
		color: '#EB8873',
		padding: 30,
		backgroundColor: '#FFFFFF',
		borderTopWidth: 2,
		borderTopColor: '#ededed',
		marginBottom: 10
	},
	passwordInput: {
		borderRadius: 30,
		color: '#EB8873',
		padding: 30,
		backgroundColor: '#FFFFFF',
		marginBottom: 50
	},
	signUpButton: {
		width: '80%',
		height: 90,
		borderRadius: 70,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		elevation: 8,
		color: '#fff',
		backgroundColor: '#EB8873'
	},
	signUpText: {
		color: 'white',
		fontSize: 24,
		fontWeight: 'bold'
	}
});

export default SignUpInput;
