import React, {useState, useRef,useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import IconA from 'react-native-vector-icons/AntDesign';
import {SH, SF, SW, Colors} from '../../utils';
import {setItemInLocalStorage} from '../../Services/Api';
import {GOOGLE_MAPS_APIKEY} from '../../Services/ApiList';
import axios from 'axios';
const MapScreen = ({navigation}) => {

  const mapRef = useRef(null);
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const handleZoomIn = () => {
    mapRef.current?.animateToRegion({
      ...position,
      latitudeDelta: position.latitudeDelta / 2,
      longitudeDelta: position.longitudeDelta / 2,
    });
  };

  const handleZoomOut = () => {
    mapRef.current?.animateToRegion({
      ...position,
      latitudeDelta: position.latitudeDelta * 2,
      longitudeDelta: position.longitudeDelta * 2,
    });
  };

  const handleMarkerPress = zoomIn => {
    if (zoomIn) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  const handleMarkerDragEnd = async e => {
    // Update the position when the marker is dragged to a new location
    const newCoordinate = e.nativeEvent.coordinate;
    setPosition({
      ...position,
      latitude: newCoordinate.latitude,
      longitude: newCoordinate.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    const placeAddress = await getPlaceNameFromLatLong(
      newCoordinate.latitude,
      newCoordinate.longitude,
    );
    console.log('🚀 ~ handleMarkerDragEnd ~ placeAddress:', placeAddress);
    // Optionally, you can also update the map region to the new location
    mapRef.current?.animateToRegion({
      ...position,
      latitude: newCoordinate.latitude,
      longitude: newCoordinate.longitude,
    });
  };
  useEffect(() => {
  Geolocation.getCurrentPosition(pos => {
    const crd = pos.coords;
    setPosition({
      latitude: crd.latitude,
      longitude: crd.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    animateToCurrentLocation();
  });
}, []);
const animateToCurrentLocation = () => {
  Geolocation.getCurrentPosition(pos => {
    const crd = pos.coords;
    const newPosition = {
      latitude: crd.latitude,
      longitude: crd.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    setPosition(newPosition);
    mapRef.current?.animateToRegion({
      ...newPosition,
      latitudeDelta: newPosition.latitudeDelta / 2,
      longitudeDelta: newPosition.longitudeDelta / 2,
    });
  });
};
  const handleNavigateToCreateEvent = async () => {
    try {
      const placeAddress = await getPlaceNameFromLatLong(
        position.latitude,
        position.longitude,

      );
      
      console.log(
        '🚀 ~ handleNavigateToCreateEvent ~ placeAddress:',
        placeAddress,
      );

      navigation.navigate('CreateEvent', {
        latitude: position.latitude,
        longitude: position.longitude,
        address: placeAddress, // Assuming 'formatted_address' is the key for the address in the response
      });
    } catch (error) {
      console.error('Error getting place address:', error);
      // Handle error if needed
    }
  };

  const getPlaceNameFromLatLong = (lat, long) => {
    console.log('🚀 ~ getPlaceNameFromLatLong ~ lat, long:', lat, long);
    return new Promise((resolve, reject) => {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_MAPS_APIKEY}`;
      console.log('🚀 ~ returnnewPromise ~ url:', url);
      axios
        .get(url)
        .then(response => {
          console.log('🚀 ~ returnnewPromise ~ response.data:', response.data);
          if (response.data.status === 'OK') {
            resolve(response.data.results[0].formatted_address);
          } else {
            resolve('');
            // resolve('address');
            // reject('No results found');
          }
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser
            // and an instance of http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={position}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}>
          {/* center */}
        <Marker
          title="You are here"
          description="This is a description"
          coordinate={position}
          draggable={true} // Make the marker draggable
          onDragEnd={handleMarkerDragEnd} // Handle drag end event
          onPress={() => handleMarkerPress(true)} // Zoom In
        />
        <Marker
          title="Zoom Out"
          description="This is a description"
          coordinate={{
            latitude: position.latitude + 0.01,
            longitude: position.longitude + 0.01,
          }}
          onPress={() => handleMarkerPress(false)} // Zoom Out
        />
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleZoomIn} style={styles.button}>
          <IconA size={SF(27)} name="plus" color={'black'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleZoomOut} style={styles.button}>
          <IconA size={SF(27)} name="minus" color={'black'}/>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleNavigateToCreateEvent}
        style={styles.navigateButton}>
        <Text style={styles.navigateButtonText}>Confirm Location</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: SH(40),
    width: SW(70),
    // paddingHorizontal: '2%',
    // marginBottom: SW(10),
    marginLeft: 'auto',
    margin: SW(15),
  },
  button: {
    margin: SW(5),
    fontWeight:'600'

   
  },
  navigateButton: {
    backgroundColor: '#293170',
    height: '5%',
    width: 200,
    marginBottom: 10,
    borderTopLeftRadius: 12,
    borderBottomRightRadius:12
  },
  navigateButtonText: {
    color: 'white',
    fontSize: SF(16),
    alignItems: 'center',
    textAlign: 'center',
    paddingVertical: 10,
    fontWeight: '700',
  },
});

export default MapScreen;

////////////////////////////////////////////////////////////
