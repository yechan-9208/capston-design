
import { useLinkProps } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet,View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';



const Map = (props) => {


  
  
  return (
  

        <MapView flex= {1}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: props.latitude,
            longitude: props.longitude,
            latitudeDelta: 0.0015,
            longitudeDelta: 0.00121,
          }}>
          <Marker
            coordinate={{ latitude: props.latitude, longitude: props.longitude }}
            title={props.title}
            description={props.path}
          />
        </MapView>

  );
};

export default Map;

const styles = StyleSheet.create({

})