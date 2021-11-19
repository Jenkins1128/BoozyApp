import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../../images/logo.png';
import { logoutAsync, resetSettingsRequestStatus, selectSettingsState } from './redux/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setSignedIn } from '../../../appSlice';
import { getOS } from '../../helpers/os';

const Settings = () => {
	const state = useSelector(selectSettingsState);
	const dispatch = useDispatch();

	useEffect(() => {
		switch (state.settingsRequestStatus) {
			case 'idle':
				return;
			case 'rejected':
				break;
			case 'fulfilled':
				goToLogin();
				break;
			default:
				return;
		}
	}, [state]);

	const goToLogin = () => {
		setIsSignedInAsyncStorage('false');
		dispatch(setSignedIn({ signedIn: 'false' }));
		dispatch(resetSettingsRequestStatus());
	};

	const setIsSignedInAsyncStorage = async (value) => {
		try {
			await AsyncStorage.setItem('@isSignedIn', value);
		} catch (e) {}
	};

	const logout = () => {
		dispatch(logoutAsync());
	};

	return (
		<SafeAreaView testID={'container'} style={styles.container}>
			<View testID={'logoutButtonContainer'} style={styles.logoutButtonContainer}>
				<TouchableOpacity testID={'logoutButton'} onPress={logout} style={styles.logoutButton}>
					<Text testID={'logoutText'} style={styles.logoutText}>
						Log Out
					</Text>
				</TouchableOpacity>
				<Image testID={'logoImage'} source={logo} style={styles.logoImage} />
			</View>

			<View testID={'aboutContainer'} style={styles.aboutContainer}>
				<View testID={'aboutBoozyContainer'} style={styles.aboutBoozyContainer}>
					<Text testID={'aboutText'} style={styles.aboutText}>
						About Boozy
					</Text>
					<Text testID={'aboutInfo'} style={styles.aboutInfo}>
						Boozy is an app to help you find the best happy hour deals in your area.
					</Text>
				</View>
				<View>
					<Text testID={'creatorText'} style={styles.creatorText}>
						About Us
					</Text>
					<Text testID={'creatorInfo'} style={styles.creatorInfo}>
						Isaiah Jenkins, Hayden Miller, Chelsea Kaye Punzalan {'\n'}
						Sponsor: Jose Alvarado {'\n'}Professors: Doug Halperin and Luigi Lucaccini {'\n'}TA: Harrison Chase Keeling
						{'\n'}CS 490 Spring 2020
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Settings;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: getOS() === 'android' ? StatusBar.currentHeight : 0,
		backgroundColor: '#fff'
	},
	logoutButtonContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		margin: 20
	},
	logoutButton: {
		width: 100,
		height: 60,
		borderRadius: 70,
		elevation: 8,
		color: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EB8873'
	},
	logoutText: {
		color: '#fff',
		fontSize: 14,
		fontWeight: 'bold'
	},
	logoImage: {
		alignSelf: 'center',
		justifyContent: 'flex-start',
		width: '45%',
		height: '60%',
		marginTop: 20,
		opacity: 0.7
	},
	aboutContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		marginHorizontal: 20
	},
	aboutBoozyContainer: {
		marginBottom: 20
	},
	aboutText: {
		color: '#EB8873',
		fontSize: 30,
		fontWeight: 'bold'
	},
	aboutInfo: {
		color: '#ccc',
		fontSize: 13
	},
	creatorText: {
		color: '#EB8873',
		fontSize: 30,
		fontWeight: 'bold'
	},
	creatorInfo: {
		color: '#ccc',
		fontSize: 13
	}
});
