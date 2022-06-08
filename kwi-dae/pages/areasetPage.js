import * as Location from "expo-location";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, StatusBar, TouchableOpacity, Dimensions, Button } from 'react-native';
//이렇게 상단에 가져와 사용할 이미지를 불러옵니다

import data from './data.json';

// const inHeight = Dimensions.get('window').height;
const inWidth = Dimensions.get('window').width;

var state = {
  data: '2',
};



//후기페이지
const AreasetPage = (onPress) => {


  // console.log(data.seoul);
  const [area, setArea] = useState('');
  const [indata, setIndata] = useState([]);


  var seoul = () => {
    console.log(1);
    setIndata(data.seoul)
    setCity('서울')
  }
  var game = () => {
    console.log(2);
    setIndata(data.game)
    setCity('경기')
  }

  var areabtn = (content) => {
    console.log(content);
    state.data=content;
    console.log(state.data);
    setCity(content);
  }

  console.log(data.areadata);

  console.log(data.areadata);
  data.areadata=1;



  const [city, setCity] = useState("현재위치");
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);

  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    // console.log(location,latitude,longitude);

    setCity(location[0].city);
    state.local = city
    console.log(state.local)
    console.log("위도")
    console.log(latitude)
    console.log("경도")
    console.log(longitude)
  };

  useEffect(() => {
    setArea(data.seoul)
    // ask();
  }, [])





  return (
    <View style={styles.container}>

      <View style={styles.container01}>
        <View style={styles.container1}>

          <View style={styles.container11}>
            <Text>시/도</Text>
          </View>

          <View style={styles.container12}>
            <View style={styles.button}>
              <Text>{city}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={ask}>
              <Text>현재위치 저장하기</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.button} onPress={seoul}>
              <Text>서울</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={game}>
              <Text>경기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={ask}>
              <Text>현재위치 불러오기</Text>
            </TouchableOpacity>
            <View flex={5}></View>
          </View>
        </View>
        <View style={styles.container2}>
          {/* <ScrollView horizontal={true} > */}
          <View style={styles.container11}>
            <Text>시/군/구</Text>
          </View>
          <View style={styles.container12}>
          <ScrollView>
            <View style={styles.both}>
              <View style={styles.both1}>
      
                {
                  indata.map((content, i) => {
                    if (i % 2 == 0) {
                      return (
                        <TouchableOpacity style={styles.button2} onPress={()=>{areabtn(content)}} key={i}>
                          <Text>{content}</Text>
                        </TouchableOpacity>
                      )
                    }
                  })
                }
              </View>
              <View style={styles.both1}>
                {
                  indata.map((content, i) => {
                    if (i % 2 != 0) {
                      return (
                        <TouchableOpacity style={styles.button2} onPress={()=>{areabtn(content)}} key={i}>
                          <Text>{content}</Text>
                        </TouchableOpacity>

                      )
                    }
                  })
                }
              </View>
            </View>
          </ScrollView>
          </View>
        
          
          </View>

      </View>
    </View>
  );
};


export default AreasetPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },
  container11: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderWidth:1
  },
  container12: {
    flex: 10,
    borderWidth:1
  },
  container01: {
    flexDirection: 'row',
    flex: 10,
  },
  container1: {
    flex: 2,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    borderWidth:1
  },
  container2: {
    flex: 10,
  },
  // container2: {
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  button2: {
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  both: {
    flex: 1,
    flexDirection: 'row'
  },
  both1: {
    flex: 1,
  }
});

