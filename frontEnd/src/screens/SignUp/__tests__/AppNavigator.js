import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import SignUp from '../SignUp';
import LogIn from '../../LogIn/LogIn';

const { Screen, Navigator } = createStackNavigator();

const Navigation = ({ store }) => {
	return (
		<Navigator>
			<Screen name='SignUp' component={<Provider store={store}>{SignUp}</Provider>} />
			<Screen name='LogIn' component={<Provider store={store}>{LogIn}</Provider>} />
		</Navigator>
	);
};
export default Navigation;
