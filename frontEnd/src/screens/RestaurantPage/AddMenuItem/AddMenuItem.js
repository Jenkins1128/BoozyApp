import React from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Animated, StyleSheet, Keyboard } from 'react-native';

const AddMenuItem = ({ bounceValue, menuItemState, dispatch, updatePrice, updateDescription, getDataFromMenuItem, dismiss }) => {
	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<Animated.View testID={'subView'} style={[styles.subView, { transform: [{ translateY: bounceValue }] }]}>
				<View testID={'addMenuItemHeader'} style={styles.addMenuItemHeader}>
					<View testID={'addMenuItemTitleContainer'} style={styles.addMenuItemTitleContainer}>
						<Text testID={'addMenuItemTitle'} style={styles.addMenuItemTitle}>
							Add Menu Item
						</Text>
					</View>
					<View>
						<TouchableOpacity testID={'cancelButton'} onPress={dismiss} style={styles.cancelButton}>
							<Text testID={'cancelText'} style={styles.cancelText}>
								Cancel
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<TextInput
					testID={'priceInput'}
					style={styles.priceStyle}
					keyboardType={'numeric'}
					multiline={false}
					value=''
					returnKeyType='next'
					onChangeText={(price) => dispatch(updatePrice({ price: price }))}
					value={menuItemState.price > 0 ? menuItemState.price.toString() : ''}
					placeholder='Enter Price'
				/>
				<TextInput
					testID={'descriptionInput'}
					style={styles.descriptionStyle}
					multiline={false}
					returnKeyType='next'
					onChangeText={(description) => dispatch(updateDescription({ description: description }))}
					value={menuItemState.description}
					placeholder='Enter menu item'
				/>
				<TouchableOpacity testID={'addMenuItemButton'} onPress={getDataFromMenuItem} style={styles.addMenuItemButton}>
					<Text testID={'addMenuItemText'} style={styles.addMenuItemText}>
						Submit
					</Text>
				</TouchableOpacity>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};

export default AddMenuItem;

const styles = StyleSheet.create({
	subView: {
		position: 'absolute',
		backgroundColor: '#FFFFFF',
		padding: 20,
		borderRadius: 30
	},
	addMenuItemHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20
	},
	addMenuItemTitleContainer: {
		marginRight: 20
	},
	addMenuItemTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#EB8873'
	},
	cancelButton: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		padding: 10,
		borderRadius: 20
	},
	priceStyle: {
		fontSize: 18,
		textAlign: 'center',
		marginBottom: 20
	},
	descriptionStyle: {
		fontSize: 18,
		textAlign: 'center',
		marginBottom: 20
	},
	addMenuItemButton: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EB8873',
		padding: 10,
		borderRadius: 20
	},
	cancelText: {
		color: '#EB8873',
		fontWeight: 'bold'
	},
	addMenuItemText: {
		color: 'white',
		fontWeight: 'bold'
	}
});
