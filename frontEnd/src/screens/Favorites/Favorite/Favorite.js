import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Favorite = ({ keyval, val }) => {
	return (
		<View testID={'container'} key={keyval} style={styles.container}>
			<Text testID={'itemText'} style={styles.itemText}>
				{val.name}
			</Text>
		</View>
	);
};

export default Favorite;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		borderBottomWidth: 2,
		borderBottomColor: '#ededed',
		paddingHorizontal: 100,
		paddingVertical: 20
	},
	itemText: {
		color: 'black'
	}
});
