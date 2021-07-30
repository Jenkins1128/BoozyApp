import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

// const TabNavigator = createBottomTabNavigator(
// 	{
// 		Home: Home,
// 		Favorites: Favorites,
// 		Settings: Settings
// 	},
// 	{
// 		defaultNavigationOptions: ({ navigation }) => ({
// 			tabBarIcon: ({ focused, tintColor }) => {
// 				const { routeName } = navigation.state;
// 				let IconComponent = Ionicons;
// 				let iconName;

// 				if (routeName === 'Home') {
// 					iconName = `ios-home${focused ? '' : ''}`;
// 				} else if (routeName === 'Settings') {
// 					iconName = `ios-settings${focused ? '' : ''}`;
// 				} else if (routeName === 'Favorites') {
// 					iconName = `ios-heart${focused ? '' : ''}`;
// 				}

// 				return <IconComponent name={iconName} size={25} color={tintColor} />;
// 			}
// 		}),
// 		tabBarOptions: {
// 			activeTintColor: '#EB8873',
// 			inactiveTintColor: 'gray'
// 		}
// 	}
// );

// const HomeNavigator = createStackNavigator(
// 	{
// 		Tabs: TabNavigator,
// 		Home: Home,
// 		Restaurant: RestaurantPage,
// 		Settings: Settings,
// 		Favorites: Favorites
// 	},
// 	{
// 		headerMode: 'none',
// 		navigationOptions: {
// 			headerShown: false
// 		}
// 	}
// );

// const AppNavigator = createStackNavigator(
// 	{
// 		SignUp: SignUp,
// 		Login: LogIn,
// 		Home: HomeNavigator
// 	},
// 	{
// 		initialRouteName: 'SignUp',
// 		headerMode: 'none',
// 		navigationOptions: {
// 			headerShown: false
// 		}
// 	}
// );

// const Tab = createMaterialBottomTabNavigator();

// const TabNav = () => {
// 	return (
// 		<Tab.Navigator
// 			screenOptions={({ navigation }) => ({
// 				tabBarIcon: ({ focused, color }) => {
// 					const { routeName } = navigation.state;
// 					let IconComponent = Ionicons;
// 					let iconName;

// 					if (routeName === 'Home') {
// 						iconName = `ios-home${focused ? '' : ''}`;
// 					} else if (routeName === 'Settings') {
// 						iconName = `ios-settings${focused ? '' : ''}`;
// 					} else if (routeName === 'Favorites') {
// 						iconName = `ios-heart${focused ? '' : ''}`;
// 					}

// 					return <IconComponent name={iconName} size={25} color={color} />;
// 				}
// 			})}
// 			activeColor='#EB8873'
// 			inactiveColor='gray'
// 		>
// 			<Tab.Screen name='Home' component={Home} />
// 			<Tab.Screen name='Favorites' component={Favorites} />
// 			<Tab.Screen name='Settings' component={Settings} />
// 		</Tab.Navigator>
// 	);
// };

const AppStack = createStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<AppStack.Navigator initialRouteName='SignUp' screenOptions={{ headerShown: false }}>
					<AppStack.Screen name='SignUp' component={SignUp} />
					<AppStack.Screen name='Login' component={LogIn} />
					<AppStack.Screen name='Home' component={Home} />
					<AppStack.Screen name='Restaurant' component={RestaurantPage} />
					<AppStack.Screen name='Settings' component={Settings} />
					<AppStack.Screen name='Favorites' component={Favorites} />
				</AppStack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
