import { Navigation } from '../navigation/StackNavigator';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, StatusBar, Dimensions, TouchableOpacity, transform, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatGrid } from 'react-native-super-grid';
import * as Font from "expo-font";

import Loading from '../components/Loading';
import axios from 'axios';

//여행지 결과 페이지

var array = [];
var topWord = "";

const winwidth = Dimensions.get('window').width*2/5;

export default function ResultPage({ navigation,  area, area_num }) {
  // 임시
  // area = [,];

  const [ready, setready] = useState(true);
  const [items, setitem] = useState();

  useEffect(() => {
    async function uEffect() {
      await Font.loadAsync({
        NEXONBOLD: require('../assets/fonts/NEXONLv1GothicBold.ttf'),
        NEXONLIGHT: require('../assets/fonts/NEXONLv1GothicLight.ttf'),
        NEXONREGULAR: require('../assets/fonts/NEXONLv1GothicRegular.ttf'),
      });
      await resultReq();
    }
    uEffect();
  }, [])

  const resultReq = async () => {
    array = [];
    var flag = await AsyncStorage.getItem('flag');

    if (flag == "1") {
      // keyword 통신
      await AsyncStorage.removeItem('flag');
      topWord = '';

      var keyword = await AsyncStorage.getItem('keyword');
      topWord = "'" + keyword + "' 에 대한 검색 결과";

      var result = await axios.get('http://13.125.236.240:3003/Search', {
        params: {
          keyword: keyword,
          area : area,
        }
      });
      await AsyncStorage.removeItem('keyword');

      console.log(result.data);

      for (var i = 0; i < result.data.result.length; i++) {
        
          array.push({
            title: result.data.result[i].title, firstimage: result.data.result[i].firstimage
            , contentid: result.data.result[i].contentid, contenttypeid: result.data.result[i].contenttypeid
          });
        }
      

      setready(false);
    }

    else if (flag == "2") {
      // category 통신
      
      await AsyncStorage.removeItem('flag');
      topWord = '';
      var cat = await AsyncStorage.getItem('cat');

      switch (cat) {
        case '0':
          topWord = '축제'
          break;
        case '1':
          topWord = '공연'
          break;
        case '2':
          topWord = '자연 관광지'
          break;
        case '3':
          topWord = '전시회'
          break;
        case '4':
          topWord = '계곡, 폭포'
          break;
        case '5':
          topWord = '식물원'
          break;
        default:
          topWord = '오류'
          break;
      }

      var result = await axios.get('http://13.125.236.240:3003/category', {
        params: {
          catCode: cat,
          area : area,
        }
      });
      await AsyncStorage.removeItem('cat');

      console.log(result.data);
      if(result.data.inSuccess == true){
        for (var i = 0; i < result.data.result.length; i++) {
          
            array.push({
              title: result.data.result[i].title, firstimage: result.data.result[i].firstimage
              , contentid: result.data.result[i].contentid, contenttypeid: result.data.result[i].contenttypeid
            });
          
        }
      }     

      setready(false);
    }
    else {
      // flag 오류처리
      alert("flag 오류입니다");
      useNavigation.navigate("K.W.I의 App");
    }
  }

  const randerItem = ({ item }) => {
    return (
      <SafeAreaView style={styles.container1}>

        <StatusBar style="auto" />

        <TouchableOpacity style={styles.Big}
          onPress={async () => {
            console.log('das2 : ' + item.contentid.toString())
            await AsyncStorage.setItem('contentid', item.contentid.toString());
            await AsyncStorage.setItem('contenttypeid', item.contenttypeid.toString());
            navigation.navigate("여행지정보 페이지");
            
          }}>
          <View style={styles.imageview}>
            <Image source={{ uri: item.firstimage }}
              style={{ resizeMode: "stretch", height: "100%" , width: "100%", borderRadius: 10 }}
            />
          </View>
          <View style={styles.textview}>
            <Text style={styles.text}>
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>)
  }


  return ready ? <Loading /> : (
    <View style={styles.container}>

      <View style={styles.showarea}>
        <Text>현재 설정된 위치</Text>
        <Text>{area_num}</Text>
      </View>

      <View style={styles.header}>
        <Text>{topWord}</Text>
      </View>
      <FlatGrid
        style={styles.gridView}
        spacing={25}
        data={array}
        renderItem={randerItem}
      >
      </FlatGrid>
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container1:{
    height:220,
    width : winwidth,
  
  },
  imageview:{ 
    // flex:1,
    heigth: "100%" ,
    width: "100%" ,

  },
  textview:{
    alignItems: "center",
    heigth: "50%" ,
    width: "100%" ,
    // flex:1,
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  showarea: {
    marginTop: 8,
    marginBottom: 8,
    alignItems: "center",

  },
  header: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 40,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderColor: "gray",
    backgroundColor: "white"

  },
  Big: {
    marginBottom:38,
    alignItems: "center",
    // height:125,
    // width :125,
    flex:1,
    // width : winwidth,
    alignItems: "center",
  },

  text: {
    //fontFamily:'NanumGothicCoding_400Regular',
    fontSize: 15,
    color: "black",
    borderTopWidth: 0,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "NEXONLIGHT",
  }
});