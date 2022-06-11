import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, StatusBar, Dimensions } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper'
import * as Font from "expo-font";

import Map from './Map';

import Loading from '../components/Loading';
import favicon from "../assets/IU.jpg"
import favicon1 from "../assets/교통대학교.jpg"
import favicon2 from "../assets/공원아이콘최종.png"
import { FlatGrid } from 'react-native-super-grid';
import { TouchableOpacity } from 'react-native-gesture-handler';
//여행지 정보 페이지
var data;
var data2;
var conid;
var contypeid;
var array;
var array2;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height

export default function AboutPage({navigation,content}) {

 
  var latitude = 37.78825;
  var longitude =  -122.4324;

  
    const renderPagination = (index, total, context) => {
        return (
          <View style={styles.paginationStyle}>
            <Text style={{ color: 'gray' }}>
              <Text style={styles.paginationText}>{index+1}</Text>/{total}
            </Text>
          </View>
        )
      }

    
    const [ready, setready] = useState(true);
    
    useEffect(() =>{
        async function uEffect(){
            await Font.loadAsync({
                NEXONBOLD : require('../assets/fonts/NEXONLv1GothicBold.ttf'),
                NEXONLIGHT : require('../assets/fonts/NEXONLv1GothicLight.ttf'),
                NEXONREGULAR : require('../assets/fonts/NEXONLv1GothicRegular.ttf'),
             });
             //
            await reqAbout();
            
            await reqReview();
          
          }
        uEffect();
        
    },[])

    const reqAbout = async()=>{

        conid = await AsyncStorage.getItem('contentid');
        contypeid = await AsyncStorage.getItem('contenttypeid');
        await AsyncStorage.removeItem('contentid');
        await AsyncStorage.removeItem('contenttypeid');

        data = await axios.get('http://13.125.236.240:3003/tourInfo',{params:{
            contentid : conid ,
            contenttypeid : contypeid
        }});
       
        
    }

    const reqReview = async ()=>{

        array2 = [];
        console.log("콘텐츠 아이디 : "+conid);
        data2 = await axios.get('http://13.125.236.240:3003/review', {
            params: {
                type: 1 ,
                contentid: conid,
                r_num : 0
            }
        });

        

        if(data2.data.result !=null){
            
            for (var i = 0; i < data2.data.result.length; i++) {
                array2.push({
                    title: data2.data.result[i].title, content: data2.data.result[i].content
                    , img: data2.data.result[i].img, id: data2.data.result[i].id
                });
            }
            console.log(data2.data.result[0].img);
        }
        else{
            array2 = [{title : null , content : " 후기가 없습니다.",  id : null, img :null}];
        }


        setready(false);
    }

    

    return ready ? <Loading/> : (
        <ScrollView style={styles.container}>
            <StatusBar style="auto" />

            <View style={styles.box}>
                

                <Swiper
                    autoplay
                    showsPagination={false}
                    autoplayTimeout={4}
                    style={styles.wrapper}
                    renderPagination={renderPagination}
                    loop={false}
                >
                    <View
                        style={styles.slide}
                    >
                        <Image style={styles.image} source={{ uri : data.data.result1[0].firstimage }} />
                    </View>
                    <View
                        style={styles.slide}
                    >
                        <Image style={styles.image} source={{uri : data.data.result1[0].firstimage } } />
                    </View>
                    
                </Swiper>
            </View>

            <View style={styles.box2}>
                <Text style={styles.textStyle1}> {data.data.result1[0].title}</Text>    
            </View>




            <View style={styles.box3}>

                <Text style={styles.addr}>
                위치 : {data.data.result1[0].addr}
                </Text>
                <View style={styles.mapview}>
                <Map latitude ={latitude} longitude ={longitude} path ={data.data.result1[0].addr}title={data.data.result1[0].title}/>
                </View>
                <Text style={styles.homepage}>
                 정보{data.data.result1[0].overview}
                 </Text>
                <Text style={styles.overview}>
                홈페이지: {data.data.result1[0].homepage}
                </Text>   
            </View>




            <View style={styles.box4}>
                <TouchableOpacity style={styles.header}
                onPress={ async ()=>{
                    await AsyncStorage.setItem('contentid',conid);
                    navigation.navigate("후기커뮤니티 페이지")}}>
                    <Text>이곳 가봤어요</Text>
                    
                </TouchableOpacity>
            </View>

            <View style={styles.box5}>
                <StatusBar style="auto" />
                <View style={styles.box}>
                    <Text style={styles.id}>
                        {array2[0].id}
                    </Text>
                    <Text style={styles.title}>
                        {array2[0].title}
                    </Text>
                    <Text style={styles.content}>
                        {array2[0].content}
                    </Text>
                    <Image source={{uri : array2[0].img}}
                        style={{width: 100, resizeMode: "stretch", height: 100, borderRadius: 10 }}
                    />
            </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    box:{
        flex:1,
    },
    box2: { //여행지이름 
        flex: 1, //안먹음
        height: 50,
        borderBottomWidth: 2,
        borderTopWidth: 2,

    },

    textStyle1: {
        marginTop:7,
        fontSize: 28,
        color: "black",
        fontFamily:"NEXONBOLD",
        justifyContent:"center",
    
    },
    box3: { //위치 개장시간 주차유무 여행지 추천 수 
        flex: 3,
        backgroundColor: "white",
 
    },
    addr:{
      margin:20,
        borderWidth:3,
        textAlign:"center",
        padding:30,
        fontSize:30,
        marginBottom:30,
        fontFamily:"NEXONLIGHT",
    },
    mapview :{
      // flex: 3,
      width: windowWidth,
      height: 300,
      padding:30,
    },
    overview:{
      margin:20,
        borderWidth:3,
        padding:30,
        fontFamily:"NEXONLIGHT"
        
    },
    homepage:{
      margin:20,
        borderWidth:3,
        padding:30,
        fontSize:15,
        marginBottom:30,
        fontFamily:"NEXONLIGHT",
    },
    textStyle2: {
        fontSize: 10,
        color: 'black',
    },
    box4: { //이곳 가봤어요
        flex: 2,
        borderBottomWidth: 2,
        borderTopWidth:2,
    },
    header: {
        fontSize: 30,
        color: "black",
        fontFamily:"NEXONLIGHT"
    },
    box5: { //사진왼쪽 후기내용
        flexDirection: "row",
        borderBottomWidth: 1,

    },
    wrapper:{
        height:300,
    },
    text:{
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily:"NEXONLIGHT"
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
      },
    image:{

        resizeMode:"stretch",
        flex:1,
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
      },
      paginationText: {
        color: 'white',
        fontSize: 30,
        fontFamily:"NEXONLIGHT",
      },
    textStyle3: {
        flex: 1,
        fontSize: 25,
        color: "black",
        margin: 10,
        fontFamily:"NEXONLIGHT",
    },
});