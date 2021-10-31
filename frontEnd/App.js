import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/app/store';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUp from './src/screens/SignUp/SignUp';
import LogIn from './src/screens/LogIn/LogIn';
import Home from './src/screens/Home/Home';
import RestaurantPage from './src/screens/RestaurantPage/RestaurantPage';
import Settings from './src/screens/Settings/Settings';
import Favorites from './src/screens/Profile/Profile';
import { selectIsSignedIn, setSignedIn } from './appSlice';

const Tab = createMaterialBottomTabNavigator();

const HomeTabNav = () => {
	return (
		<Tab.Navigator activeColor='#EB8873' inactiveColor='gray' barStyle={{ backgroundColor: '#fff' }}>
			<Tab.Screen
				name='Home'
				component={Home}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color }) => <Icon name={`ios-home`} color={color} size={25} />
				}}
			/>
			<Tab.Screen
				name='Favorites'
				component={Favorites}
				options={{
					tabBarLabel: 'Favorites',
					tabBarIcon: ({ color }) => <Icon name='ios-heart' color={color} size={25} />
				}}
			/>
			<Tab.Screen
				name='Settings'
				component={Settings}
				options={{
					tabBarLabel: 'Settings',
					tabBarIcon: ({ color }) => <Icon name='ios-settings' color={color} size={25} />
				}}
			/>
		</Tab.Navigator>
	);
};

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
};

const AppStack = createStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<AppHome />
		</Provider>
	);
}
