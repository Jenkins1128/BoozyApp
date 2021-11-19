import React, { useEffect } from 'react';
import { StyleSheet, Text, FlatList, View, Alert, SafeAreaView, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getOS } from '../../helpers/os';
import Favorite from './Favorite/Favorite';
import { getFavoritesAsync, resetGetFavoritesRequestStatus, selectFavoritesState } from './redux/favoritesSlice';

const Favorites = ({ navigation }) => {
	const state = useSelector(selectFavoritesState);
	const dispatch = useDispatch();

	//did screen focus, get restaurant data
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			dispatch(getFavoritesAsync());
		});
		return unsubscribe;
	}, [navigation]);

	useEffect(() => {
		switch (state.getFavoritesRequestStatus) {
			case 'idle':
				return;
			case 'rejected':
				showErrorAlert('Unable to get favorites. Please check your network.');
				break;
			case 'fulfilled':
				break;
			default:
				return;
		}
		dispatch(resetGetFavoritesRequestStatus());
	}, [state]);

	const showErrorAlert = (errorString) => {
		Alert.alert('Uh oh', errorString, [{ text: 'OK' }]);
	};

	const favorite = ({ item, index }) => {
		return <Favorite key={index} keyval={index} val={item} />;
	};

	return (
		<SafeAreaView testID={'container'} style={styles.container}>
			<View testID={'myFavoritesContainer'} style={styles.myFavoritesContainer}>
				<Text testID={'myFavoritesText'} style={styles.myFavoritesText}>
					My Favorites
				</Text>
			</View>
			<View testID={'myFavoritesListContainer'} style={styles.myFavoritesListContainer}>
				<FlatList data={state.restaurantsArray} keyExtractor={(item, i) => i.toString()} renderItem={favorite} />
			</View>
		</SafeAreaView>
	);
};

export default Favorites;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: getOS() === 'android' ? StatusBar.currentHeight : 0,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%'
	},
	myFavoritesContainer: {
		flex: 1
	},
	myFavoritesListContainer: {
		flex: 7
	},
	myFavoritesText: {
		color: '#EB8873',
		fontFamily: 'Arial',
		fontWeight: 'bold',
		fontSize: 30
	}
});
