import React from 'react';
import { View, Animated, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Keyboard } from 'react-native';

const FilterView = ({ bounceValue, dispatch, state, reset, updateLocation, updateCuisine, setPrice1, setPrice2, setPrice3, setPrice4, showFilterOverlay, getDataFromFilter }) => {
	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<Animated.View testID={'subView'} style={[styles.subView, { transform: [{ translateY: bounceValue }] }]}>
				<View testID={'header'} style={styles.header}>
					<View testID={'title'} style={styles.title}>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#EB8873' }}>Filters</Text>
					</View>
					<View testID={'headerSettings'} style={styles.headerSettings}>
						<TouchableOpacity testID={'resetButton'} onPress={() => dispatch(reset())} style={styles.resetButton}>
							<Text testID={'resetText'} style={styles.resetText}>
								Reset
							</Text>
						</TouchableOpacity>
						<TouchableOpacity testID={'cancelButton'} onPress={() => showFilterOverlay()} style={styles.cancelButton}>
							<Text testID={'cancelText'} style={styles.cancelText}>
								Cancel
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View testID={'filterInput'} style={styles.filterInput}>
					<TextInput
						testID={'locationInput'}
						style={styles.locationStyle}
						textAlign='center'
						multiline={false}
						returnKeyType='next'
						onChangeText={(location) => dispatch(updateLocation({ location: location }))}
						value={state.location}
						placeholder='Enter City or Zip code'
					/>
					<TextInput
						testID={'cuisineInput'}
						style={styles.cuisineStyle}
						textAlign='center'
						multiline={false}
						returnKeyType='next'
						onChangeText={(cuisine) => dispatch(updateCuisine({ cuisine: cuisine }))}
						value={state.cuisine}
						placeholder='Enter cuisine'
					/>
					<View testID={'priceTypeContainer'} style={styles.priceTypeContainer}>
						<TouchableOpacity testID={'$Button'} onPress={() => dispatch(setPrice1())} style={styles.$Button}>
							<Text style={{ color: state.$color, fontWeight: 'bold', fontSize: 16 }}>$</Text>
						</TouchableOpacity>
						<TouchableOpacity testID={'$$Button'} onPress={() => dispatch(setPrice2())} style={styles.$$Button}>
							<Text style={{ color: state.$$color, fontWeight: 'bold', fontSize: 16 }}>$$</Text>
						</TouchableOpacity>
						<TouchableOpacity testID={'$$$Button'} onPress={() => dispatch(setPrice3())} style={styles.$$$Button}>
							<Text style={{ color: state.$$$color, fontWeight: 'bold', fontSize: 16 }}>$$$</Text>
						</TouchableOpacity>
						<TouchableOpacity testID={'$$$$Button'} onPress={() => dispatch(setPrice4())} style={styles.$$$$Button}>
							<Text style={{ color: state.$$$$color, fontWeight: 'bold', fontSize: 16 }}>$$$$</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity testID={'applyButton'} onPress={getDataFromFilter} style={styles.applyButton}>
						<Text testID={'applyText'} style={styles.applyText}>
							Apply
						</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};

export default FilterView;

const styles = StyleSheet.create({
	subView: {
		position: 'absolute',
		backgroundColor: '#FFFFFF',
		padding: 20,
		borderRadius: 30
	},
	header: {
		flex: 1
	},
	title: {
		flex: 1,
		alignSelf: 'center'
	},
	headerSettings: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	filterInput: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center'
	},
	locationStyle: {
		flex: 1,
		padding: 20,
		fontSize: 18
	},
	cuisineStyle: {
		flex: 1,
		padding: 20,
		fontSize: 18
	},
	priceTypeContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		height: 100,
		width: '80%'
	},
	cancelButton: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		padding: 10,
		borderRadius: 20
	},
	resetButton: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		padding: 10,
		borderRadius: 20
	},
	applyButton: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EB8873',
		padding: 10,
		borderRadius: 20
	},
	$Button: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EB8873',
		borderRadius: 30,
		width: 45,
		height: 45
	},
	$$Button: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EB8873',
		borderRadius: 20,
		borderRadius: 30,
		width: 45,
		height: 45
	},
	$$$Button: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EB8873',
		borderRadius: 20,
		borderRadius: 30,
		width: 45,
		height: 45
	},
	$$$$Button: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EB8873',
		borderRadius: 20,
		borderRadius: 30,
		width: 45,
		height: 45
	},
	resetText: {
		color: '#EB8873',
		fontWeight: 'bold'
	},
	cancelText: {
		color: '#EB8873',
		fontWeight: 'bold'
	},
	applyText: {
		color: 'white',
		fontWeight: 'bold'
	}
});
