import * as Location from "expo-location";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, StatusBar, TouchableOpacity, Dimensions, Button } from 'react-native';
//이렇게 상단에 가져와 사용할 이미지를 불러옵니다

import data from './data.json';


import favicon1 from '../assets/서울.png';
import favicon2 from '../assets/경기.png';

// const inHeight = Dimensions.get('window').height;
const inWidth = Dimensions.get('window').width;

var state = {
  data: '',
};



//후기페이지
const AreasetPage = ({ area, getData, area_num, getData_num}) => {


  const onClick = () => {
    // console.log(city);
    getData(city);
    getData_num(state.data[0]);
    console.log(city);
  }

  // console.log(data.seoul);
  const [indata, setIndata] = useState([]);
  const [indata2, setIndata2] = useState([]);
  const [city, setCity] = useState([""]);
  const [city2, setCity2] = useState([""]);
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);

  var seoul = async () => {
    console.log(1);
    setIndata(data.seoul)
    setIndata2(data.seoul_num)
    setCity2(['서울'])

    console.log(state.data);
  }
  var game = async () => {
    console.log(2);
    setIndata(data.game)
    setIndata2(data.game_num)

    setCity2(['경기'])

    console.log(state.data);
  }

  var areabtn = (content,i) => {
    setCity(indata[i]);
    console.log(indata[i]);
    state.data = content;
    console.log(state.data[0]);
  }




  // const ask = async () => {
  //   const { granted } = await Location.requestForegroundPermissionsAsync();
  //   if (!granted) {
  //     setOk(false);
  //   }
  //   const {
  //     coords: { latitude, longitude },
  //   } = await Location.getCurrentPositionAsync({ accuracy: 5 });
  //   const location = await Location.reverseGeocodeAsync(
  //     { latitude, longitude },
  //     { useGoogleMaps: false }
  //   );
  //   // console.log(location,latitude,longitude);

  //   setCity(location[0].city);
  //   state.local = city
  //   console.log(state.local)
  //   console.log("위도")
  //   console.log(latitude)
  //   console.log("경도")
  //   console.log(longitude)
  // };

  useEffect(() => {
  
  }, [city])





  return (
    <View style={styles.container}>

      <View style={styles.container01}>
        <View style={styles.container1}>

          <View style={styles.container11}>
            <Text>시/도</Text>
          </View>

          <View style={styles.container12}>

         
            <TouchableOpacity style={styles.button} onPress={seoul}>
              <Text>서울</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={game}>
              <Text>경기</Text>
            </TouchableOpacity>


            <View flex={5}></View>

          </View>
        </View>

        <View style={styles.container2}>
          {/* <ScrollView horizontal={true} > */}
          <View style={styles.container11_1}>

            <View style={styles.buttonin1}>
              <Text>시/군/구</Text>
            </View>

            <View style={styles.buttonin2}>
              <Text>설정한 위치</Text>
                <Text>{state.data[0]}</Text>
            </View>

          </View>
          <View style={styles.container12}>
          <View style={styles.imageview}>
            {
            (()=> {
            if (city2=="서울") return (<Image style={styles.image} source={favicon1} />);
            if (city2=="경기") return (<Image style={styles.image} source={favicon2} />);
            if (city2=="") return (<Text></Text>);
            })()
            }


            </View>
            <ScrollView style={styles.scroll}>
              <View style={styles.both}>
                <View style={styles.both1}>

                  {
                    indata2.map((content, i) => {
                      if (i % 2 == 0) {
                        return (
                          <TouchableOpacity style={styles.button2} onPress={() => { areabtn(content,i) }} key={i}>
                            <Text>{content}</Text>
                          </TouchableOpacity>
                        )
                      }
                    })
                  }
                </View>
                <View style={styles.both1}>
                  {
                    indata2.map((content, i) => {
                      if (i % 2 != 0) {
                        return (
                          <TouchableOpacity style={styles.button2} onPress={() => { areabtn(content,i) }} key={i}>
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

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.setbutton} onPress={onClick}>
          <Text>현재위치 저장하기</Text>
        </TouchableOpacity>
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
  bottom: {
    flex: 1,
  },
  scroll:{
    margin:20,
    flex:3,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode :"stretch"
  },
  imageview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding:8,
  },
  container11: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderWidth: 1
  },
  container11_1: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    flexDirection: 'row',
  },
  container12: {
    flex: 10,
    borderWidth: 1
    
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
    borderWidth: 1,
    margin:8,
    borderRadius:10
  },
  buttonin1: {
    justifyContent: "center",
    alignItems: "center",
    flex: 3,

  },
  buttonin2: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#e9e9e9',
    flex: 1,

  },
  setbutton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#e9e9e9',
    borderWidth: 1
  },

  container2: {
    flex: 10,
  },

  button2: {
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius:10,
    margin:8
  },
  both: {
    flex: 1,
    flexDirection: 'row'
  },
  both1: {
    flex: 1,

  }
});