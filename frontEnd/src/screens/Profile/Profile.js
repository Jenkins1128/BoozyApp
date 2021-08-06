import React, { useEffect } from 'react';
import { StyleSheet, Text, FlatList, View, Alert, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Favorite from './Favorite/Favorite';
import { getFavoritesAsync, resetGetFavoritesRequestStatus, selectFavoritesState } from './redux/profileSlice';

const Profile = () => {
	const state = useSelector(selectFavoritesState);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFavoritesAsync());
	}, []);

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
// export default class Profile extends React.Component {
// 	constructor(props) {
// 		// super(props);
// 		// this.state = {
// 		// 	allCategories: '',
// 		// 	alreadyFavorited: false,
// 		// 	alreadyRated: false,
// 		// 	restaurantsArray: []
// 		// };
// 		//this.populateRestaurants();
// 		this.getFavorites();
// 	}

// 	getFavorites() {
// 		const axios = require('axios').default;
// 		axios
// 			.get('https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/get', {})
// 			.then((response) => {
// 				this.populateRestaurants(response.data);
// 			})
// 			.catch(function (error) {
// 				console.log(error);
// 			});
// 	}

// 	// populateRestaurants(response) {
// 	// 	this.setState({
// 	// 		restaurantsArray: response
// 	// 	});
// 	// }

// 	viewFavorites(key) {
// 		const axios = require('axios').default;
// 		axios
// 			.post(
// 				`https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/favorites`,
// 				{
// 					restaurantId: this.state.restaurantsArray[key]['id'],
// 					name: this.state.restaurantsArray[key]['name']
// 				},
// 				{
// 					headers: {
// 						Accept: 'application/json, text/plain, */*',
// 						'Content-Type': 'application/json'
// 					}
// 				}
// 			)
// 			.then((response) => {
// 				this.state.alreadyFavorited = response.data[0]['contains'];

// 				axios
// 					.get(
// 						'https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/' + this.state.restaurantsArray[key]['id'] + '/review',
// 						{},
// 						{
// 							headers: {
// 								Accept: 'application/json, text/plain, */*',
// 								'Content-Type': 'application/json'
// 							}
// 						}
// 					)
// 					.then((response) => {
// 						this.state.alreadyRated = response.data[0]['contains'];

// 						this.setState({ allCategories: '' });
// 						for (var i = 0; i < this.state.restaurantsArray[key]['categories'].length; i++) {
// 							if (i == 0) {
// 								this.state.allCategories += this.state.restaurantsArray[key]['categories'][i]['title'];
// 							} else {
// 								this.state.allCategories += ', ' + this.state.restaurantsArray[key]['categories'][i]['title'];
// 							}
// 						}
// 						this.props.navigation.navigate('Restaurant', {
// 							id: this.state.restaurantsArray[key]['id'],
// 							name: this.state.restaurantsArray[key]['name'],
// 							img: this.state.restaurantsArray[key]['img'],
// 							phone: this.state.restaurantsArray[key]['phone'],
// 							rating: this.state.restaurantsArray[key]['rating'],
// 							reviews: this.state.restaurantsArray[key]['revCount'],
// 							allCategories: this.state.allCategories,
// 							alreadyFavorited: this.state.alreadyFavorited,
// 							alreadyRated: this.state.alreadyRated
// 						});
// 					})
// 					.catch(function (error) {
// 						console.log(error);
// 					});
// 			})
// 			.catch(function (error) {
// 				console.log(error);
// 			});
// 	}

// 	render() {

// 	}
// }
