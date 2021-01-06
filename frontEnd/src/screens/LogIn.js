import React, {Component} from 'react';
import {Animated, StyleSheet, Text, View, TextInput,  TouchableOpacity, ImageBackground, Image } from 'react-native';
//import Todo from './Todo';
// import TodoList from './TodoList';
var isHidden = true;

export default class LogIn extends React.Component{
    
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
                      
                        <ImageBackground source={require('./background.jpeg')} style={styles.backgroundImage} >
                        </ImageBackground>
                        <Image source={require('./logo.png')} style={styles.logoImage} >
                        </Image>
                        <Text style={styles.BoozyText}> </Text>
                        <Text style={styles.BoozySlogan}> </Text>
                        <TextInput
                            style={styles.emailInput}
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
                            placeholder='Email'
                            placeholderTextColor='#FFFFFF'
                            underlineColorAndroid='transparent'>
                        </TextInput> 
                        <TextInput
                            style={styles.passwordInput}
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                            placeholder='Password'
                            placeholderTextColor='#FFFFFF'
                            underlineColorAndroid='transparent'>
                        </TextInput>     
                        {/* onPress={this.signup.bind(this)} */}
                        <TouchableOpacity onPress={this.signup.bind(this)} style={styles.signUpButton}>
                
                            <Text style={styles.signUpText}>Sign Up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.login.bind(this)} style={styles.loginButton}>
                
                            <Text style={styles.logInText}>Log In</Text>
                        </TouchableOpacity>
                        <Animated.View style={[styles.subView,{transform: [{translateY: this.state.bounceValue}]}]} >
                            <Text style={{fontSize: 20, fontWeight: 'bold', color:"red"}}>Username or password is incorrect.</Text>
                        </Animated.View> 
                    
                </View>
                

        );

    }
    signup(){
        if(!isHidden){
            this.showErrorOverlay();
        }
        this.props.navigation.navigate('SignUp');
    }

   

    login(){
        
        const axios = require('axios').default;
        
        axios.post(`https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/login`, {
                email: this.state.email,
                password: this.state.password
              }, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
              }).then((response) => {
                
                //console.log("Logged In!")
                //console.log(response);
                this.goToHome();
              })
              .catch((error) => {
                console.log(error);
                if(isHidden){
                    this.showErrorOverlay();
                }
              });
        
           
              
            //   this.props.navigation.navigate('TodoList', {
            //     dataId: this.state.todoListId,
            //     dataTitle: this.state.todoListTitle,
            //     dataArr: this.state.todoListArray
            //   });
    
    }

    showErrorOverlay(){
        var toValue = 400;
    
        if(isHidden) {
          toValue = -150;
        }
        //This will animate the transalteY of the subview between 0 & 100 depending on its current state
        //100 comes from the style below, which is the height of the subview.
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

    goToHome(){
        if(!isHidden){
            this.showErrorOverlay();
        }
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
    subView: {
        position: "absolute",
  
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        height: 30,
        alignItems: 'center',
        
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
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.95
    },
    logoImage: {
        position: 'absolute',
        // flex: 1,
        top: 125,
        width: '30%',
        height: '20%',
        justifyContent: "center",
        alignSelf: "center",
        opacity: 0.7
    },
    BoozyText:{
        color: '#FFA500',
        fontSize: 90,
        fontFamily: 'Bradley Hand',
        position: 'absolute',
        top: 125,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    BoozySlogan:{
        color: '#E91E63',
        fontSize: 24,
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
    emailInput: {
        position: 'absolute',
        zIndex: 11,
        top: 350,
        width: 320,
        borderRadius: 30,
        alignSelf: 'center',
        color: '#FFFFFF',
        padding: 30,
        borderWidth: 1,
        borderColor: '#ededed',
    },
    passwordInput: {
        position: 'absolute',
        zIndex: 11,
        top: 440,
        width: 320,
        borderRadius: 30,
        alignSelf: 'center',
        color: '#FFFFFF',
        padding: 30,
        borderWidth: 1,
        borderColor: '#ededed',
    },
    signUpButton: {
        position: 'absolute',
        zIndex: 11,
        top: 540,
        width: 150,
        height: 55,
        borderRadius: 70,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        elevation: 8,
        color: '#fff',
        padding: 20,
        backgroundColor: '#FFFFFF',
        
    },
    loginButton: {
        position: 'absolute',
        zIndex: 11,
        top: 610,
        width: 240,
        height: 60,
        borderRadius: 70,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        elevation: 8,
        color: '#fff',
        padding: 20,
        backgroundColor: '#FFFFFF',
        
    },
    logInText: {
        color: '#EB8873',
        fontSize: 14,
        fontWeight: 'bold'
    },
    signUpText: {
        color: '#EB8873',
        fontSize: 11,
        fontWeight: 'bold'
    }
});
