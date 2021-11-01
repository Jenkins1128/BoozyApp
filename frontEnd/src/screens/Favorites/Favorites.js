import React, { useEffect } from 'react';
import { StyleSheet, Text, FlatList, View, Alert, SafeAreaView, StatusBar, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Favorite from './Favorite/Favorite';
import { getFavoritesAsync, resetGetFavoritesRequestStatus, selectFavoritesState } from './redux/profileSlice';

const Profile = ({ navigation }) => {
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
		<SafeAreaView style={styles.container}>
			<View style={styles.myFavoritesContainer}>
				<Text style={styles.myFavoritesText}>My Favorites</Text>
			</View>
			<View style={styles.myFavoritesListContainer}>
				<FlatList data={state.restaurantsArray} keyExtractor={(item, i) => i.toString()} renderItem={favorite} />
			</View>
		</SafeAreaView>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
	},
	header: {
		backgroundColor: '#E91E63',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 10,
		borderBottomColor: '#ddd'
	}
});
