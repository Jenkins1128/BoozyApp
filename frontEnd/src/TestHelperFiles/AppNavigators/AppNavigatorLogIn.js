import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../../screens/SignUp/SignUp';
import LogIn from '../../screens/LogIn/LogIn';

const { Screen, Navigator } = createStackNavigator();

const Navigation = () => {
	return (
		<Navigator>
			<Screen name='Login' component={LogIn} />
			<Screen name='SignUp' component={SignUp} />
		</Navigator>
	);
};
export default Navigation;
