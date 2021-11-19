import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import logo from '../../../images/logo.png';

const LogInHeader = ({ state }) => {
	return (
		<View testID={'header'} style={styles.header}>
			<Image testID={'logoImage'} source={logo} style={styles.logoImage}></Image>
			{state.isLoading && <ActivityIndicator testID={'loadingIndicator'} style={styles.loadingIndicator} size='large' color='#fff' />}
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
		marginTop: 100
	},
	logoImage: {
		width: '30%',
		height: '40%',
		opacity: 0.7
	}
});

export default LogInHeader;
