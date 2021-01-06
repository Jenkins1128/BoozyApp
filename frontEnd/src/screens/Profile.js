import React, {Component} from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, fitToSuppliedMarkers } from 'react-native-maps'
import { StyleSheet, Image, Text, TextInput, ScrollView, TouchableOpacity, View, Dimensions, TouchableHighlight,
    Animated} from 'react-native';
import Favorites from './Favorites';
import * as Location from 'expo-location';

export default class Profile extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            allCategories: '',
            alreadyFavorited: false,
            alreadyRated: false,
            restaurantsArray: [],
        } 
        this.populateRestaurants();
        this.getFavorites();
    }
    
    getFavorites(){
        const axios = require('axios').default;
        axios.get('https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/get', {
                        
                      })
                      .then((response) => { 
                        this.populateRestaurants(response.data) 

                      })
                      .catch(function (error) {
                        console.log(error);
                      });    
    }

    populateRestaurants(response){
        this.setState({
            restaurantsArray: response,
            
        })
    }

    viewFavorites(key){
        
        const axios = require('axios').default;
        axios.post(`https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/favorites`, {
            restaurantId: this.state.restaurantsArray[key]["id"],
            name: this.state.restaurantsArray[key]["name"]
          }, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
          }).then((response) => {
            this.state.alreadyFavorited = response.data[0]["contains"]
        
            axios.get('https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/'+this.state.restaurantsArray[key]["id"]+'/review'
             ,{}, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
              }).then((response) => {
                this.state.alreadyRated = response.data[0]["contains"]
              

                this.setState({allCategories : ''})
                for(var i = 0; i < this.state.restaurantsArray[key]["categories"].length; i++){
                    if(i == 0){
                        this.state.allCategories += this.state.restaurantsArray[key]["categories"][i]["title"];
                    }else{
                        this.state.allCategories += ', '+this.state.restaurantsArray[key]["categories"][i]["title"];
                    }     
                }
                this.props.navigation.navigate('Restaurant', {
                    id: this.state.restaurantsArray[key]["id"],
                    name: this.state.restaurantsArray[key]["name"],
                    img: this.state.restaurantsArray[key]["img"],
                    phone: this.state.restaurantsArray[key]["phone"],
                    rating: this.state.restaurantsArray[key]["rating"],
                    reviews: this.state.restaurantsArray[key]["revCount"],
                    allCategories: this.state.allCategories,
                    alreadyFavorited: this.state.alreadyFavorited,
                    alreadyRated: this.state.alreadyRated
                  });
                
               
                
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(function (error) {
            console.log(error);
          });

    }

 

    render(){
        let restaurants = this.state.restaurantsArray.map((val, key) => {
            return <Favorites key={key} keyval={key} val={val} 
            viewFavorite={()=> this.viewFavorites(key)} />
        });

        return (
                <View style={styles.container}>
                    <Text style= {styles.searchNearbyText} >My Favorites</Text>
                    <ScrollView style={styles.scrollContainer}>
                        {restaurants}
                     </ScrollView> 
                </View>
                

        );

    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    callout: {
        flex: 1, 
        position: 'relative'
    }, 
    searchNearbyText:{
        position: 'absolute',
        top: 50,
        color: '#EB8873',
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 30

    },
    subView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        height: 250,
        alignItems: 'center',
        
    },
    locationStyle:{
        flex: 1,
        fontSize: 18,
        position: 'absolute',
        top: 50
    },
    header: {
        backgroundColor: '#E91E63',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd'
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 32,
    },
    scrollContainer: {
        flexGrow: 1,
        marginBottom: 100,
        position: 'absolute',
        top: 100,
    },
    footer: {
        backgroundColor: '#EB8873',
        position: 'absolute',
        alignContent: 'center',
        height: 55,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },

});