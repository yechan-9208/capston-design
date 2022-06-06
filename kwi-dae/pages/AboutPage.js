import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, StatusBar, Dimensions } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navigation } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper'
import * as Font from "expo-font";



import Loading from '../components/Loading';
import favicon from "../assets/IU.jpg"
import favicon1 from "../assets/교통대학교.jpg"
import favicon2 from "../assets/공원아이콘최종.png"
import { FlatGrid } from 'react-native-super-grid';
import { TouchableOpacity } from 'react-native-gesture-handler';
//여행지 정보 페이지
var data;

export default function AboutPage({ route }) {
    const [slideTime, setSlideTime] = useState(1); // 초기 슬라이딩 시간 1초
    useEffect(() => {
      const autoTimer = setTimeout(() => setSlideTime(0), 1000); // 1초 후에 slideTime을 8초로 바꾸고
      return () => clearTimeout(autoTimer);
    }, [])
    const {width,height} = Dimensions.get('window')
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
            await reqAbout();
          }
        uEffect();
        
    },[])

    const navigation = useNavigation();
    const main = 'https://firebasestorage.googleapis.com/v0/b/sparta-image.appspot.com/o/lecture%2Fmain.png?alt=media&token=8e5eb78d-19ee-4359-9209-347d125b322c'

    const reqAbout = async()=>{

        var conid = await AsyncStorage.getItem('contentid');
        var contypeid = await AsyncStorage.getItem('contenttypeid');

        data = await axios.get('http://13.125.236.240:3003/tourInfo',{params:{
            contentid : conid ,
            contenttypeid : contypeid
        }});
        console.log(data.data);
        setready(false);
      
    }
    const randerItem = ({ item }) => {
        return(<View style={styles.container}>


        </View>)
    }

    return ready ? <Loading/> : (
        <ScrollView style={styles.container}>
            <StatusBar style="auto" />

            <View style={{}}>
                

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
                <Text style={styles.homepage}>
                 정보{data.data.result1[0].overview}
                 </Text>
                <Text style={styles.overview}>
                홈페이지: {data.data.result1[0].homepage}
                </Text>
                
            </View>

            <View style={styles.box4}>
                <TouchableOpacity style={styles.header}
                onPress={()=>{navigation.navigate("후기커뮤니티 페이지")}}>
                    <Text>이곳 가봤어요</Text>
                    
                </TouchableOpacity>
            </View>

            <View style={styles.box5}>
                <View style={styles.img}>
                    <Image source={{ uri: main }} style={{ width: 250, height: 200, resizeMode: "stretch" }} />
                </View>
                <View style={styles.textStyle3}>
                    <Text>후기내용 데이터 받아와야함 </Text>
                </View>
            </View>

            <View style={styles.box5}>
                <View style={styles.img}>
                    <Image source={favicon} style={{ width: 250, height: 200, resizeMode: "stretch" }} />
                </View>
                <View style={styles.text}>
                    <Text>후기내용</Text>
                </View>
            </View>

            <View style={styles.box5}>
                <View style={styles.img}>
                    <Image source={favicon1} style={{ width: 250, height: 200, resizeMode: "stretch" }} />
                </View>
                <View style={styles.text}>
                    <Text>후기내용</Text>
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
    box2: { //여행지이름 
        flex: 30, //안먹음
        height: 150,
        justifyContent: "center",
        borderBottomWidth: 2,
        borderTopWidth: 2,
    },
    textStyle1: {
        fontSize: 28,
        color: "black",
    
    },
    box3: { //위치 개장시간 주차유무 여행지 추천 수 
        flex: 3,
        backgroundColor: '#eaf7fe',
        margin:20,


    },
    addr:{
        borderWidth:3,
        textAlign:"center",
        padding:30,
        fontSize:30,
        marginBottom:30,
    },
    overview:{
        borderWidth:3,
        padding:30,
        
    },
    homepage:{
        borderWidth:3,
        padding:30,
        fontSize:15,
        marginBottom:30,
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
        fontWeight: 'bold'
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
      },
    textStyle3: {
        flex: 1,
        fontSize: 25,
        color: "black",
        margin: 10,
    },
});