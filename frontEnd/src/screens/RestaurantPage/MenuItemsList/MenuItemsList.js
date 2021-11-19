import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import MenuItem from '../MenuItem/MenuItem';

const MenuItemsList = ({ state, showMenuItemOverlay, dismiss }) => {
	const menuItem = ({ item, index }) => {
		return <MenuItem key={index} keyval={index} val={item} dismiss={dismiss} />;
	};
	return (
		<View testID={'scrollContainer'} style={styles.scrollContainer}>
			<View testID={'menuItemsTitleContainer'} style={styles.menuItemsTitleContainer}>
				<Text testID={'menuTitle'} style={styles.menuTitle}>
					Menu items
				</Text>
				<View testID={'menuButtonContainer'} style={styles.menuButtonContainer}>
					<TouchableOpacity testID={'menuButton'} onPress={() => showMenuItemOverlay(true)} style={styles.menuButton}>
						<Text testID={'menuItemText'} style={styles.menuItemText}>
							+ Menu Item
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			<FlatList data={state.menuItemArray} keyExtractor={(item, i) => i.toString()} renderItem={menuItem}></FlatList>
		</View>
	);
};

export default MenuItemsList;

const styles = StyleSheet.create({
	scrollContainer: {
		flex: 1,
		width: '100%',
		backgroundColor: 'white'
	},
	menuItemsTitleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	menuTitle: {
		color: 'lightgrey',
		fontSize: 20,
		marginTop: 0,
		fontWeight: 'bold',
		padding: 10
	},
	menuButtonContainer: {
		marginRight: 15
	},
	menuButton: {
		width: 110,
		backgroundColor: '#EB8873',
		borderRadius: 20,
		padding: 7
	},
	menuItemText: {
		color: 'white',
		fontWeight: 'bold'
	}
});
