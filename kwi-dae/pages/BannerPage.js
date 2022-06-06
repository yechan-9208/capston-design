import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, SafeAreaView, Image, StatusBar,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navigation } from '@react-navigation/native';
import axios from 'axios';
//이렇게 상단에 가져와 사용할 이미지를 불러옵니다
import Loading from '../components/Loading';
import favicon from "../assets/교통대학교.jpg"
import favicon1 from "../assets/IU.jpg"

var image ;

//배너페이지
export default function BannerPage({ content, navigation }) {
    const bannerReq = async ()=>{
        var data =  await axios.get('http://13.125.236.240:3003/banner');
        image = data.data.result.bannersrc2;  
        return true;
  
    }

    const [ready, setReady] = useState(true);
    
    useEffect(async () => {
        await bannerReq();
        setReady(false);
    })

    var { height, width } = Dimensions.get('window');
    return ready ? <Loading /> : (
        <ScrollView style={styles.container}>
            <StatusBar style="auto" />

                <Image source = {{uri:image}}
                style={{width:width,height:300,resizeMode:"stretch"}}>
                </Image>

                <Image source ={favicon1}
                style={{width:width,height:300,resizeMode:"contain"}}>
                </Image>

                <Image source ={favicon1}
                style={{width:width,height:300,resizeMode:"cover"}}>
                </Image>

                <Image source ={favicon1}
                style={{width:width,height:300,resizeMode:"repeat"}}>
                </Image>

                <Image source ={favicon}
                style={{width:width,height:300,resizeMode:"stretch"}}>
                </Image>

                <Image source ={favicon}
                style={{width:width,height:300,resizeMode:"stretch"}}>
                </Image>

        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container1: {
        alignItems: "center",
    },

    
});