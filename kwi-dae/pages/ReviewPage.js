import React from 'react';
import { StyleSheet, Text, View, Image , ScrollView, TextInput, Dimensions, StatusBar, RefreshControlBase} from 'react-native';
import { Navigation } from '@react-navigation/native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
//이렇게 상단에 가져와 사용할 이미지를 불러옵니다
import * as Font from "expo-font";

import Loading from '../components/Loading';

const winwidth = Dimensions.get('window').width*44/50
const winheight = winwidth;
var data;

//후기페이지
export default function ReviewPage(content,navigation) {

const [ready,setreadty] = useState(true);

// useEffect(() => {
//     async function uEffect() {
//         await Font.loadAsync({
//             NEXONBOLD: require('../assets/fonts/NEXONLv1GothicBold.ttf'),
//             NEXONLIGHT: require('../assets/fonts/NEXONLv1GothicLight.ttf'),
//             NEXONREGULAR: require('../assets/fonts/NEXONLv1GothicRegular.ttf'),
//         });
//         await reviewReq()
//     }

//     uEffect();
// }, [])

useEffect(()=>{
    const uEffect = async()=>{
        console.log('111')
        await Font.loadAsync({
                        NEXONBOLD: require('../assets/fonts/NEXONLv1GothicBold.ttf'),
                        NEXONLIGHT: require('../assets/fonts/NEXONLv1GothicLight.ttf'),
                        NEXONREGULAR: require('../assets/fonts/NEXONLv1GothicRegular.ttf')
                        
                    });
                    console.log('123')
        await reviewReq()
        
    }
    uEffect();

},[])

const reviewReq = async ()=>{
    
    var r_num = await AsyncStorage.getItem('r_num');
    console.log("rnum = "+r_num);
    data = await axios.get('http://13.125.236.240:3003/review',{params:{
        r_num : r_num,
        type : 2,
        contentid : 0,
        id : 0
    }});

    console.log(data.data.result[0]);
    console.log('http://13.125.236.240:3003/'+data.data.result[0].img);
    setreadty(false);


}

return ready ? <Loading/> :(
    <ScrollView style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.id}> 후기</Text>
        <Text style={styles.title}>{data.data.result[0].title}</Text>
        <View style={styles.container1}>
        <Image source={{uri: 'http://13.125.236.240:3003/'+data.data.result[0].img}}
                    style={{
                       width: winwidth, resizeMode: "stretch", height: winheight,
                       borderWidth:4,borderColor:"#e9e9e9",borderRadius:10,
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
    id:{
        fontSize:35,
        fontWeight:"600",
        color:"black",
        borderWidth:5,
        borderColor:"#e9e9e9", 
        
    },
    title:{
        fontSize:35,
        fontWeight:"600",
        color:"black",
        borderWidth:5,
        borderColor:"#e9e9e9",
        borderRadius:10,
        padding:20,
        margin:20,
        marginBottom:0,
        fontFamily: "NEXONBOLD",
    },
    container1:{
        flex:1,
        alignItems:"center",
        padding:20,
        paddingBottom:0,
        borderRadius:10,
        // borderWidth:5,
        // borderTopWidth:0,
        borderColor:"#e9e9e9",
    },
    container2:{
        flex:1,
        padding:20,
        margin:20,
        borderWidth:5,
        borderColor:"#e9e9e9",
        borderRadius: 10,
        fontFamily: "NEXONLIGHT",
    },

})
