import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Feather, AntDesign, MaterialIcons } from '@expo/vector-icons';
import background from '../../images/background.jpeg';
import logo from '../../images/logo.png';

export default class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	logout() {
		const axios = require('axios').default;
		axios
			.post(
				'https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/logout',
				{},
				{
					headers: {
						Accept: 'application/json, text/plain, */*',
						'Content-Type': 'application/json'
					}
				}
			)
			.then((response) => {
				this.goToLogIn();
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	goToLogIn() {
		this.props.navigation.navigate('Login');
	}

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground source={background} style={styles.backgroundImage}></ImageBackground>
				<Image source={logo} style={styles.logoImage}></Image>
				<Text style={styles.AboutText}>About Boozy</Text>
				<Text style={styles.aboutInfo}>Boozy is an app to help you find the best happy hour deals in your area.</Text>
				<Text style={styles.creatorText}>About Us</Text>
				<Text style={styles.creatorInfo}>
					Isaiah Jenkins, Hayden Miller, Chelsea Kaye Punzalan {'\n'}
					Sponsor: Jose Alvarado {'\n'}Professors: Doug Halperin and Luigi Lucaccini {'\n'}TA: Harrison Chase Keeling
					{'\n'}CS 490 Spring 2020
				</Text>

				<TouchableOpacity onPress={this.logout.bind(this)} style={styles.logoutButton}>
					<Text style={styles.logoutText}>Log Out</Text>
				</TouchableOpacity>
			</View>
		);
	}

	goToHome() {
		this.props.navigation.navigate('Home');
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EB8873'
	},
	header: {
		backgroundColor: '#EB8873',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 10,
		borderBottomColor: '#ddd'
	},
	headerText: {
		backgroundColor: '#fc0',
		width: '100%', // applied to Image
		height: '100%'
	},
	backgroundImage: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		opacity: 0.95
	},
	logoImage: {
		position: 'absolute',
		top: 125,
		width: '30%',
		height: '20%',
		justifyContent: 'center',
		alignSelf: 'center',
		opacity: 0.7
	},
	AboutText: {
		color: '#FFF',
		fontSize: 30,
		position: 'absolute',
		top: 310,
		left: 20,
		fontWeight: 'bold'
	},
	aboutInfo: {
		color: '#FFFFFF',
		flex: 1,
		fontSize: 12,
		position: 'absolute',
		top: 340,
		left: 20
	},
	creatorText: {
		color: '#FFF',
		fontSize: 30,
		position: 'absolute',
		top: 370,
		left: 20,
		fontWeight: 'bold'
	},
	creatorInfo: {
		color: '#FFFFFF',
		flex: 1,
		fontSize: 12,
		position: 'absolute',
		top: 400,
		left: 20
	},
	scrollContainer: {
		flex: 1,
		marginBottom: 100
	},
	footer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 10
	},
	logoutButton: {
		position: 'absolute',
		zIndex: 14,
		right: 10,
		top: 50,
		width: 100,
		height: 60,
		borderRadius: 70,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 8,
		color: '#fff',
		padding: 20,
		backgroundColor: '#fff'
	},
	logoutText: {
		color: '#EB8873',
		fontSize: 14,
		fontWeight: 'bold'
	}
});
