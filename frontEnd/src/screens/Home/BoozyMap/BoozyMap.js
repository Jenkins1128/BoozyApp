import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Image, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import logo from '../../../images/logo.png';

const BoozyMap = ({ setMapRef, state, dismiss }) => {
	return (
		<TouchableWithoutFeedback onPress={dismiss}>
			<MapView
				ref={(ref) => {
					setMapRef(ref);
				}}
				initialCamera={{ center: state.initialPosition, zoom: 10, pitch: 0, heading: 0, altitude: 10 }}
				provider={PROVIDER_GOOGLE}
				style={styles.mapStyle}
			>
				<Marker coordinate={state.markerPosition}></Marker>
				{state.restaurantsArray.map((marker, index) => {
					return (
						<Marker key={index} coordinate={{ latitude: marker.lat, longitude: marker.long }}>
							<Image style={{ width: 30, height: 40 }} source={logo} />
							<Callout style={styles.callout} onPress={() => viewRestaurants(index)}>
								<Text>{marker.name}</Text>
								<Text>{marker.address}</Text>
							</Callout>
						</Marker>
					);
				})}
			</MapView>
		</TouchableWithoutFeedback>
	);
};

export default BoozyMap;

const styles = StyleSheet.create({
	mapStyle: {
		flex: 3,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2
	},
	callout: {
		flex: 1,
		position: 'relative'
	}
});
