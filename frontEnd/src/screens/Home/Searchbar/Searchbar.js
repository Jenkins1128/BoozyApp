import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

const Searchbar = ({ state, dispatch, updateLocation, showFilterOverlay, getDataFromFilter, dismiss }) => {
	return (
		<TouchableWithoutFeedback onPress={dismiss}>
			<View style={styles.searchContainer}>
				<View style={styles.searchNearbyTextContainer}>
					<Text style={styles.searchNearbyText}>Search for happy hours nearby.</Text>
				</View>
				<View style={styles.searchBarBackground}>
					<Feather name='search' style={styles.searchIconStyle} />
					<TextInput
						style={styles.inputStyle}
						multiline={false}
						returnKeyType='next'
						onKeyPress={(ev) => {
							if (ev.nativeEvent.key == 'Enter') {
								getDataFromFilter();
							}
						}}
						onChangeText={(location) => dispatch(updateLocation({ location: location }))}
						value={state.location}
						placeholder='Enter City or Zip code'
					/>
					<TouchableOpacity onPress={showFilterOverlay}>
						<MaterialIcons name='filter-list' style={styles.filterIconStyle} />
					</TouchableOpacity>
				</View>
				<TouchableOpacity onPress={getDataFromFilter} style={styles.searchButton}>
					<Text style={styles.searchtext}>search</Text>
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default Searchbar;

const styles = StyleSheet.create({
	searchContainer: {
		flex: 1,
		width: '100%',
		padding: 20
	},
	searchNearbyTextContainer: {
		marginBottom: 10
	},
	searchNearbyText: {
		color: '#EB8873',
		fontFamily: 'Arial',
		fontWeight: 'bold',
		fontSize: 18
	},
	searchBarBackground: {
		backgroundColor: '#F0EEEE',
		height: 50,
		width: '90%',
		borderRadius: 15,
		alignSelf: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20
	},
	searchIconStyle: {
		fontSize: 35,
		color: '#E91E63'
	},
	filterIconStyle: {
		fontSize: 35,
		color: '#E91E63'
	},
	inputStyle: {
		fontSize: 18
	},
	searchButton: {
		alignSelf: 'flex-end',
		marginTop: 5,
		marginRight: 20,
		color: '#E91E63'
	},

	searchtext: {
		color: '#E91E63'
	}
});
