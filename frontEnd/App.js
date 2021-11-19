import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/app/store';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import SignUp from './src/screens/SignUp/SignUp';
import LogIn from './src/screens/LogIn/LogIn';
import Home from './src/screens/Home/Home';
import RestaurantPage from './src/screens/RestaurantPage/RestaurantPage';
import Settings from './src/screens/Settings/Settings';
import Favorites from './src/screens/Favorites/Favorites';
import { selectIsSignedIn, setSignedIn } from './appSlice';

const BottomTabs = createMaterialBottomTabNavigator();

const HomeTabNav = () => {
	return (
		<BottomTabs.Navigator activeColor='#EB8873' inactiveColor='gray' barStyle={{ backgroundColor: '#fff' }}>
			<BottomTabs.Screen
				name='HomeTab'
				component={Home}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color }) => <Icon name={`ios-home`} color={color} size={25} />
				}}
			/>
			<BottomTabs.Screen
				name='FavoritesTab'
				component={Favorites}
				options={{
					tabBarLabel: 'Favorites',
					tabBarIcon: ({ color }) => <Icon name='ios-heart' color={color} size={25} />
				}}
			/>
			<BottomTabs.Screen
				name='SettingsTab'
				component={Settings}
				options={{
					tabBarLabel: 'Settings',
					tabBarIcon: ({ color }) => <Icon name='ios-settings' color={color} size={25} />
				}}
			/>
		</BottomTabs.Navigator>
	);
};

const AppStack = createStackNavigator();

const AppHome = () => {
	const signedIn = useSelector(selectIsSignedIn);
	const dispatch = useDispatch();

	useEffect(() => {
		const getData = async () => {
			try {
				const value = await AsyncStorage.getItem('@isSignedIn');
				if (value !== null) {
					// value previously stored
					dispatch(setSignedIn({ signedIn: value }));
				}
			} catch (e) {
				// error reading value
			}
		};
		getData();
	}, [signedIn]);

	const [loaded] = useFonts({
		BradleyHandBold: require('./assets/fonts/BradleyHandBold.ttf'),
		Arial: require('./assets/fonts/Arial.ttf')
	});

	if (!loaded) {
		return <AppLoading />;
	} else {
		return (
			<NavigationContainer>
				<AppStack.Navigator screenOptions={{ headerShown: false }}>
					{signedIn === 'true' ? (
						<>
							<AppStack.Screen name='Home' component={HomeTabNav} />
							<AppStack.Screen name='Restaurant' component={RestaurantPage} />
							<AppStack.Screen name='Settings' component={Settings} />
							<AppStack.Screen name='Favorites' component={Favorites} />
						</>
					) : (
						<>
							<AppStack.Screen name='Login' component={LogIn} />
							<AppStack.Screen name='SignUp' component={SignUp} />
						</>
					)}
				</AppStack.Navigator>
			</NavigationContainer>
		);
	}
};

export default function App() {
	return (
		<Provider store={store}>
			<AppHome />
		</Provider>
	);
}
