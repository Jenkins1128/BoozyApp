import React from 'react';
import {Animated, StyleSheet, Text, View, TextInput,  TouchableOpacity, ImageBackground } from 'react-native';

var isHidden = true;
export default class SignUp extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            bounceValue: new Animated.Value(50)
        } 
    }
    
    render(){
        return (    
                <View style={styles.container}>      
                        <ImageBackground source={require('./background.jpg')} style={styles.backgroundImage} >
                        </ImageBackground>
                        <Text style={styles.BoozyText}>Boozy</Text>
                        <Text style={styles.BoozySlogan}>Happy hours, Happy you.</Text>
        
                        <TextInput
                            style={styles.emailInput}
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
                            placeholder='Email'
                            placeholderTextColor='#EB8873'
                            underlineColorAndroid='transparent'>
                        </TextInput> 
                        <TextInput
                            style={styles.passwordInput}
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                            placeholder='Password'
                            placeholderTextColor='#EB8873'
                            underlineColorAndroid='transparent'>
                        </TextInput>     
                        <TouchableOpacity onPress={this.login.bind(this)} style={styles.loginButton}>      
                            <Text style={styles.logInText}>Log In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.signup.bind(this)} style={styles.signUpButton}>
                
                            <Text style={styles.signUpText}>Sign Up</Text>
                        </TouchableOpacity> 
                        <Animated.View style={[styles.subView,{transform: [{translateY: this.state.bounceValue}]}]} >
                            <Text style={{fontSize: 20, fontWeight: 'bold', color:"red"}}>Username already exists.</Text>
                        </Animated.View>     
                </View>
        );
    }

    signup(){
        const axios = require('axios').default;
        if(this.state.email.trim().length > 0 && this.state.password.trim().length > 0){
        axios.post(`https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/register`, {
                email: this.state.email,
                password: this.state.password
              }, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
              }).then((response) => {
                console.log("Registered!")
                //this.props.navigation.navigate('LoginPage');
                //console.log(response);
                this.login();
              })
              .catch((error) => {
                console.log(error);
                if(isHidden){
                    this.showErrorOverlay();
                }
                
              });

        }   
    }

    showErrorOverlay(){
        var toValue = 400;
        if(isHidden) {
          toValue = -150;
        }
        Animated.spring(
          this.state.bounceValue,
          {
            toValue: toValue,
            velocity: 5,
            tension: 2,
            friction: 8,
          }
        ).start();
        isHidden = !isHidden;
    }

    login(){
        if(!isHidden){
            this.showErrorOverlay();
        }
        this.props.navigation.navigate('Login');
    }

    goToHome(){
        this.props.navigation.navigate('Home');
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
        backgroundColor: '#E91E63',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd'
    },
    headerText: {
        backgroundColor: '#fc0',
        width: '100%', 
        height: '100%' 
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.95
    },
    subView: {
        position: "absolute",
  
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        height: 30,
        alignItems: 'center',
    },
    BoozyText:{
        color: '#EB8873',
        fontSize: 90,
        fontFamily: 'Bradley Hand',
        position: 'absolute',
        top: 125,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    BoozySlogan:{
        color: 'white',
        fontSize: 25,
        fontFamily: 'Bradley Hand',
        position: 'absolute',
        top: 340,
        fontWeight: 'bold',
        alignSelf: 'center',
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
    usernameInput: {
        position: 'absolute',
        zIndex: 11,
        top: 400,
        width: 280,
        borderRadius: 30,
        alignSelf: 'center',
        color: '#FFFFFF',
        padding: 30,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
    },
    emailInput: {
        position: 'absolute',
        zIndex: 11,
        top: 400,
        width: 280,
        borderRadius: 30,
        alignSelf: 'center',
        color: '#EB8873',
        padding: 30,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
    },
    passwordInput: {
        position: 'absolute',
        zIndex: 11,
        top: 490,
        width: 280,
        borderRadius: 30,
        alignSelf: 'center',
        color: '#EB8873',
        padding: 30,
        backgroundColor: '#FFFFFF',
    },
    signUpButton: {
        position: 'absolute',
        zIndex: 14,
        right: 17,
        bottom: 30,
        width: 380,
        height: 90,
        borderRadius: 70,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        color: '#fff',
        padding: 20,
        backgroundColor: '#EB8873',
    },
    loginButton: {
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
        backgroundColor: '#EB8873',
    },
    logInText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    signUpText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    }
});
