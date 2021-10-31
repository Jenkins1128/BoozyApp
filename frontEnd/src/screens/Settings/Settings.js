import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../../images/logo.png';
import { logoutAsync, resetSettingsRequestStatus, selectSettingsState } from './redux/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setSignedIn } from '../../../appSlice';

const Settings = ({ navigation }) => {
	const state = useSelector(selectSettingsState);
	const dispatch = useDispatch();

	useEffect(() => {
		switch (state.settingsRequestStatus) {
			case 'idle':
				return;
			case 'rejected':
				break;
			case 'fulfilled':
				setIsSignedIn('false');
				dispatch(resetSettingsRequestStatus());
				dispatch(setSignedIn({ signedIn: 'false' }));
				//navigation.navigate('Login');
				break;
			default:
				return;
		}
	}, [state]);

	const setIsSignedIn = async (value) => {
		try {
			await AsyncStorage.setItem('@isSignedIn', value);
		} catch (e) {
			// saving error
		}
	};

	const logout = () => {
		dispatch(logoutAsync());
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.logoutButtonContainer}>
				<TouchableOpacity onPress={logout} style={styles.logoutButton}>
					<Text style={styles.logoutText}>Log Out</Text>
				</TouchableOpacity>
				<Image source={logo} style={styles.logoImage} />
			</View>

			<View style={styles.aboutContainer}>
				<View style={styles.aboutBoozyContainer}>
					<Text style={styles.AboutText}>About Boozy</Text>
					<Text style={styles.aboutInfo}>Boozy is an app to help you find the best happy hour deals in your area.</Text>
				</View>
				<View>
					<Text style={styles.creatorText}>About Us</Text>
					<Text style={styles.creatorInfo}>
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
	AboutText: {
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
