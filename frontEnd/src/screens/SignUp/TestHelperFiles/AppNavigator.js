import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../SignUp';
import LogIn from '../../LogIn/LogIn';

const { Screen, Navigator } = createStackNavigator();

const Navigation = () => {
	return (
		<Navigator>
			<Screen name='SignUp' component={SignUp} />
			<Screen name='Login' component={LogIn} />
		</Navigator>
	);
};
export default Navigation;
