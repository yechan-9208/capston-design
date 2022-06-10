import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Image, TouchableOpacity, StatusBar,Button, Dimensions,Text } from 'react-native';
import { Navigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Swiper from 'react-native-swiper'
//이렇게 상단에 가져와 사용할 이미지를 불러옵니다

import Loading from '../components/Loading';
import favicon1 from '../assets/공원아이콘최종.png';
import button1 from '../assets/축제.png';
import button2 from '../assets/연극공연.png';
import button3 from '../assets/자연.png';
import button4 from '../assets/전시회2.png';
import button5 from '../assets/폭포.png';
import button6 from '../assets/식물원.png';

var banner1 = [];
var banner2;


const {width,height} = Dimensions.get('window')

const renderPagination = (index, total, context) => {
    return (
      <View style={styles.paginationStyle}>
        <Text style={{ color: 'grey' }}>
          <Text style={styles.paginationText}>{index+1}</Text>/{total}
        </Text>
      </View>
    )
  }
   
export default function MainPage({ navigation, route }) {
    const [slideTime, setSlideTime] = useState(1); // 초기 슬라이딩 시간 1초
    useEffect(() => {
      const autoTimer = setTimeout(() => setSlideTime(0), 1000); // 1초 후에 slideTime을 8초로 바꾸고
      return () => clearTimeout(autoTimer);
    }, [])
    
    const main = 'https://firebasestorage.googleapis.com/v0/b/sparta-image.appspot.com/o/lecture%2Fmain.png?alt=media&token=8e5eb78d-19ee-4359-9209-347d125b322c'
    const work = () => setworking(true);
    const onChangeText = (payload) => setText(payload);
    const [text, setText] = useState();
    const [ready, setReady] = useState(true);

    useEffect(() => {
      async function uEffect(){
        
        await bannerReq();
        
      }

      uEffect();
      
  })

    const addTodo = () => {
        if (text === "") {
            return;
        }
        console.log(text);
        console.log(text);
        console.log(text);
        axios({
            url: 'http://13.125.236.240:3003/test',
            method: 'get',
            data: {
                param: 'text'
            }
        });

        setText("");
    };
    const bannerReq = async () => {
        try {
            var img = await axios.get('http://13.125.236.240:3003/banner');

            banner2 = img.data.result.bannersrc2;
            banner1.push({
                url: img.data.result.bannersrc2,
                url: img.data.result.bannersrc1
            });
            console.log(banner2);
            setReady(false);
            return img.data.result.bannersrc1;
        }
        catch (err) { console.log(err);
          setReady(false); }
        
    }

    const buttonEvent = async (cat)=>{
      await AsyncStorage.removeItem("flag");
      await AsyncStorage.removeItem("cat");
      await AsyncStorage.setItem("flag","2"); 
      await AsyncStorage.setItem("cat",cat);

      console.log(await AsyncStorage.getItem('cat'));

      
    }
   


    return  ready ? <Loading /> :(
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.containerOne}>
            <TouchableOpacity style={{}}
                    onPress={() => { navigation.navigate("검색") }}>
                    <Text>검색하기</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerTwo}>
                <View style={styles.box1}></View>
                <Swiper
                autoplay
                showsPagination={true}
                autoplayTimeout={4}
        style={styles.wrapper}
        renderPagination={renderPagination}
        loop={false}
      >
        <View
          style={styles.slide}
          title={
            <Text numberOfLines={1}></Text>
          }
        >
          <Image style={styles.image} source={{uri:main}}  />
        </View>
        <View
          style={styles.slide}
          title={<Text numberOfLines={1}></Text>}
        >
          <Image style={styles.image} source={favicon1}/>
        </View>
        <View
          style={styles.slide}
          title={<Text numberOfLines={1}></Text>}
        >
          <Image style={styles.image} source={favicon1}  />
        </View>
        <View
          style={styles.slide}
          title={
            <Text numberOfLines={1}></Text>
          }
        >
          <Image style={styles.image} source={{uri:main}} />
        </View>
      </Swiper>
                
            <View style={styles.box1}></View>
            </View>
            <View style={styles.containerThree}>
                <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", height: "60%" }}>
                    <TouchableOpacity style={{}}
                        onPress={async () => {
                          await buttonEvent("0");
                          navigation.navigate("여행지결과 페이지") }}>
                        <Image source={button1} ></Image>
                        <Text style={{textAlign:"center",fontSize:15}}>
                          축제
                        </Text>
                      
                    </TouchableOpacity>
                  

                    <TouchableOpacity style={{}}
                        onPress={async() => { 
                          await buttonEvent("1");
                          navigation.navigate("여행지결과 페이지") }}>
                        <Image source={button2} ></Image>
                        <Text style={{textAlign:"center",fontSize:15}}>
                          연극 공연
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{}}
                        onPress={async() => {
                          await buttonEvent("2");
                          navigation.navigate("여행지결과 페이지") }}>
                        <Image source={button3} ></Image>
                        <Text style={{textAlign:"center",fontSize:15}}>
                          자연 관광지
                        </Text>
                    </TouchableOpacity>

                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", height: "10%" }}>

                    <TouchableOpacity style={{}}
                        onPress={async() => { 
                          await buttonEvent("3");
                          navigation.navigate("여행지결과 페이지") }}>
                        <Image source={button4} ></Image>
                        <Text style={{textAlign:"center",fontSize:15}}>
                        전시회 박람회
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{}}
                        onPress={async () => {
                          await buttonEvent("4");
                          navigation.navigate("여행지결과 페이지") }}>
                        <Image source={button5} ></Image>
                        <Text style={{textAlign:"center",fontSize:15}}>
                          폭포 계곡
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{}}
                        onPress={async() => {
                          await buttonEvent("5"); 
                          navigation.navigate("여행지결과 페이지") }}>
                        <Image source={button6} ></Image>
                        <Text style={{textAlign:"center",fontSize:15}}>
                          식물원
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={styles.box4}></View>
            <View style={styles.box5}></View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#white"
    },
    input: {
        backgroundColor: "white",
        marginTop: 3, // 검색창 위치
        paddingVertical: 5, //검색창 크기
        paddingHorizontal: 20, // 안에 입력하세요 위치
        borderRadius: 20, //원형 
    },
    containerOne: {
        flex: 0.5,
        backgroundColor: "white",
        alignItems: "flex-end",
        justifyContent: "center"
    },
    containerTwo: {
        flex: 2,


    },
    wrapper: {},
    slide: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'transparent'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    },
    image: {
      width:width,
      resizeMode:"stretch",
      flex: 1,   //이유를 모르겠음
      
    },
    paginationStyle: {
      position: 'absolute',
      bottom: 10,
      right: 10
    },
    paginationText: {
      color: 'gray',
      fontSize: 30,
    },

    containerThree: {
        flex: 3,
        backgroundColor:'white',
        borderRadius:10,
    },
    title: {
        color: 'red',
    },
    box1: {
        flex: 0.05,
    },
    box2: {
        flex: 1,
    },
    box3: {
        flex: 0.5,
        backgroundColor: "red"
    },
    box4: {
        flex: 0.1,
        // // borderBottomWidth: 3,
        // // borderTopWidth: 3,
        // borderColor: "gray",
        backgroundColor: "#e9e9e9",
    },
    box5: {
        flex: 0.6,
        backgroundColor: 'white',
        borderRadius:10,
        
    },
    card1:{
      fontSize:20,
      textAlign:"center"
    },

}); 