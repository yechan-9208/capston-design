import * as Location from "expo-location";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, StatusBar, TouchableOpacity, Dimensions, Button, Alert } from 'react-native';
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
const AreasetPage = ({ area, getData, area_num, getData_num }) => {


  const onClick = () => {
    // console.log(city);
    getData(city);
    getData_num(state.data[0]);
    console.log(city);
    Alert.alert(
      "지역저장",
      '지역을 ['+state.data[0]+']로  저장하였습니다. ',
      [
          {text: 'OK', onPress: () => console.log('OK Pressed') },
      ]
    );
  }

  // console.log(data.seoul);
  const [indata, setIndata] = useState([]);
  const [indata2, setIndata2] = useState([]);
  const [city, setCity] = useState([""]);
  const [city2, setCity2] = useState([""]);
  const [ready1, setReady1] = useState("");
  const [ready2, setReady2] = useState("");

  var seoul = async () => {
    console.log(1);
    setIndata(data.seoul)
    setIndata2(data.seoul_num)
    setCity2(['서울'])
    setReady1("서울")

    console.log(state.data);
  }
  var game = async () => {
    console.log(2);
    setIndata(data.game)
    setIndata2(data.game_num)
    setReady1("경기")
    setCity2(['경기'])

    console.log(state.data);
  }

  var areabtn = (content, i) => {
    setCity(indata[i]);
    console.log(indata[i]);
    state.data = content;
    console.log(content);
    console.log(state.data[0]);
    setReady2(state.data[0])
  }




  useEffect(() => {

  })





  return (
    <View style={styles.container}>

      <View style={styles.container01}>
        <View style={styles.container1}>

          <View style={styles.container11}>
            <Text>시/도</Text>
          </View>

          <View style={styles.container12}>

            {ready1 == "서울"
              ?
              <TouchableOpacity style={styles.rdybutton} onPress={seoul}>
                <Text>서울</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={styles.button} onPress={seoul}>
                <Text>서울</Text>
              </TouchableOpacity>}

            {ready1 == "경기"
              ?
              <TouchableOpacity style={styles.rdybutton} onPress={game}>
                <Text>경기</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={styles.button} onPress={game}>
                <Text>경기</Text>
              </TouchableOpacity>}


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
                (() => {
                  if (city2 == "서울") return (<Image style={styles.image} source={favicon1} />);
                  if (city2 == "경기") return (<Image style={styles.image} source={favicon2} />);
                  if (city2 == "") return (<Text></Text>);
                })()
              }


            </View>
            <ScrollView style={styles.scroll}>
              <View style={styles.both}>
                <View style={styles.both1}>

                  {
                    indata2.map((content, i) => {
                      if (i % 2 == 0) {
                        if (ready2 == content[0])
                          return (
                            <TouchableOpacity style={styles.rdybutton2} onPress={() => { areabtn(content, i) }} key={i}>
                              <Text>{content}</Text>
                            </TouchableOpacity>)
                        else
                          return (
                            <TouchableOpacity style={styles.button2} onPress={() => { areabtn(content, i) }} key={i}>
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
                        if (ready2 == content[0])
                        return (
                          <TouchableOpacity style={styles.rdybutton2} onPress={() => { areabtn(content, i) }} key={i}>
                            <Text>{content}</Text>
                          </TouchableOpacity>)
                      else
                        return (
                          <TouchableOpacity style={styles.button2} onPress={() => { areabtn(content, i) }} key={i}>
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
    // backgroundColor:"blue",
    backgroundColor: "#e9e9e9",
  },
  bottom: {
    flex: 1,
  },
  scroll: {
    flex: 3,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch"
  },
  imageview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    marginBottom: 20
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
    backgroundColor: "white",
    marginBottom: 10

  },
  container11_1: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "white",
    marginBottom: 10
  },
  container12: {
    flex: 10,

    marginLeft: 6
  },
  container01: {
    flexDirection: 'row',
    flex: 10,
  },
  container1: {
    flex: 2,
  },
  rdybutton: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'white',
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    margin: 3,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
    // borderWidth: 1,
    borderRadius: 10,
    margin: 3,
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
    backgroundColor: 'white',
    borderRadius: 10,
  },

  container2: {
    flex: 10,
  },

  button2: {
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    margin: 3
  },
  rdybutton2: {
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    margin: 3,
    borderWidth: 1,
  },
  both: {
    flex: 1,
    flexDirection: 'row'
  },
  both1: {
    flex: 1,

  }
});