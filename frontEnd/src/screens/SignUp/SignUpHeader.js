import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

const SignUpHeader = ({ state, login }) => {
	return (
		<View style={styles.header}>
			<TouchableOpacity onPress={login} style={styles.loginButton}>
				<Text style={styles.logInText}>Log In</Text>
			</TouchableOpacity>
			<Text style={styles.BoozyText}>Boozy</Text>
			<Text style={styles.BoozySlogan}>Happy hours, Happy you.</Text>
			{state.isLoading && <ActivityIndicator style={styles.loadingIndicator} size='large' color='#fff' />}
		</View>
	);
};

const styles = StyleSheet.create({
	loadingIndicator: {
		marginTop: 20
	},
	header: {
		flex: 2,
		alignItems: 'center',
		marginTop: 40
	},
	loginButton: {
		width: 100,
		height: 60,
		borderRadius: 70,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'flex-end',
		color: '#fff',
		padding: 20,
		marginRight: 5,
		backgroundColor: '#EB8873'
	},
	BoozyText: {
		color: '#EB8873',
		fontSize: 90,
		fontFamily: 'Bradley Hand',
		fontWeight: 'bold'
	},
	BoozySlogan: {
		color: 'white',
		fontSize: 25,
		fontFamily: 'Bradley Hand',
		fontWeight: 'bold'
	},
	logInText: {
		color: 'white',
		fontSize: 14,
		fontWeight: 'bold'
	}
});

export default SignUpHeader;
