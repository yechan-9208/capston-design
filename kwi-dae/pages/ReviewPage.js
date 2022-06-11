import React from 'react';
import { StyleSheet, Text, View, Image , ScrollView, TextInput,  StatusBar} from 'react-native';
import { Navigation } from '@react-navigation/native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
//이렇게 상단에 가져와 사용할 이미지를 불러옵니다

import Loading from '../components/Loading';
import favicon from "../assets/IU.jpg"

var data;

//후기페이지
export default function ReviewPage(content,navigation) {

const [ready,setreadty] = useState(true);

useEffect(()=>{
    const uEffect = async()=>{
        await reviewReq()
        
    }
    uEffect();

},[])

const reviewReq = async ()=>{
    
    var r_num = await AsyncStorage.getItem('r_num');
    await AsyncStorage.removeItem('r_num');
    console.log("rnum = "+r_num);
    data = await axios.get('http://13.125.236.240:3003/review',{params:{
        r_num : r_num,
        type : 2,
        contentid : 0
    }});

    console.log(data.data.result[0]);

    setreadty(false);


}

return ready ? <Loading/> :(
    <ScrollView style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>{data.data.result[0].title}</Text>
        <View style={styles.container1}>
        <Image source={{uri: data.data.result[0].img}}
                    style={{
                        width: 250, resizeMode: "stretch", height: 200
                    }}
                />
                </View>
        <View style={styles.container2}>
            <Text>{data.data.result[0].content}</Text>
        </View>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title:{
        fontSize:44,
        fontWeight:"600",
        color:"black",
        borderWidth:5,
        borderColor:"#e9e9e9",

    },
    container1:{
        flex:1,

        alignItems:"center",
    },
    container2:{
        flex:1,
        padding:20,
        margin:20,
        borderWidth:5,
        borderColor:"#e9e9e9",
        borderRadius:20,
    },

})
