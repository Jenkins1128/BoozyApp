import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import SignUp from './src/screens/SignUp/SignUp';
import LogIn from './src/screens/LogIn/LogIn';
import Home from './src/screens/Home/Home';
import RestaurantPage from './src/screens/RestaurantPage/RestaurantPage';
import Settings from './src/screens/Settings/Settings';
import Favorites from './src/screens/Profile/Profile';

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

const AppStack = createStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<AppStack.Navigator initialRouteName='SignUp' screenOptions={{ headerShown: false }}>
					<AppStack.Screen name='SignUp' component={SignUp} />
					<AppStack.Screen name='Login' component={LogIn} />
					<AppStack.Screen name='Home' component={HomeTabNav} />
					<AppStack.Screen name='Restaurant' component={RestaurantPage} />
					<AppStack.Screen name='Settings' component={Settings} />
					<AppStack.Screen name='Favorites' component={Favorites} />
				</AppStack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
