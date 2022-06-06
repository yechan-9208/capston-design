import React, { useState ,useEffect} from 'react';
import { StyleSheet, TextInput, View, Image, Button, Alert,TouchableOpacity } from 'react-native';
import { useNavigation  } from '@react-navigation/native';

const Routers = ({pageName})=>{
    const navigation = useNavigation();
    return (
        <TouchableOpacity style = {{flex:1 ,backgroundColor : "black"}} 
            onPress = {() =>{ navigation.navigate(pageName)}}> 
        </TouchableOpacity>
    )
}

export default Routers ;