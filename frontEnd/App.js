import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import SignUp from './src/screens/SignUp';
import LogIn from './src/screens/LogIn';
import Home from './src/screens/Home';
import RestaurantPage from './src/screens/RestaurantPage';
import Settings from './src/screens/Settings';
import Favorites from './src/screens/Profile';

const TabNavigator = createBottomTabNavigator(
  {
    Home: Home,
    Favorites: Favorites,
    Settings: Settings
  },
  
  {
   
    defaultNavigationOptions: ({ navigation }) => ({
      
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        
        let IconComponent = Ionicons;
        let iconName;

        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : ''}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-settings${focused ? '' : ''}`;
        }
        else if (routeName === 'Favorites') {
          iconName = `ios-heart${focused ? '' : ''}`;
        }
        
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
      
    
    }),

    tabBarOptions: {
      activeTintColor: '#EB8873',
      inactiveTintColor: 'gray',
    },

  }
);

const HomeStack = createStackNavigator(
  {
    Tabs: TabNavigator,
    Home: Home,
    Restaurant: RestaurantPage,
    Settings: Settings,
    Favorites: Favorites,
    
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerShown: false
    }
   }

);

const App = createStackNavigator({
  SignUp: SignUp,
  Login: LogIn,
  Home: HomeStack,
},{
  initialRouteName : 'SignUp',
  headerMode: 'none',
    navigationOptions: {
      headerShown: false
    }
},
);

export default createAppContainer(App);