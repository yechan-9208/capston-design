import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
//이렇게 상단에 가져와 사용할 이미지를 불러옵니다

import data from './data.json';

// const inHeight = Dimensions.get('window').height;
const inWidth = Dimensions.get('window').width;

//후기페이지
const Filtercom = (onPress) => {
  
let areadata = data.seoul;

  const [area, setArea] = useState('');
  const seoul = ()=> setArea('서울');
  const game = ()=> setArea('경기');
  


  useEffect(() => {
    async function uEffect() {
    }
    uEffect();

  }, [])

  const pressbtn = (btn) =>{
    if(btn == 'seoul')
      setArea(area)
  }



  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <TouchableOpacity style={styles.button} onPress={()=>{pressbtn('seoul')}}>
          <Text>서울</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}onPress={()=>{pressbtn('game')}}>
          <Text>경기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <ScrollView horizontal={true} >
          {
            areadata.map((content, i) => {
              return (
                  <TouchableOpacity style={styles.button2} onPress={onPress} key={i}>
                    <Text>{content}</Text>
                  </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
    </View>
  );
};


export default Filtercom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: inWidth,
    // marginTop: 20,
    // padding: 20,
    backgroundColor: 'white',
  },
  container1: {
    flexDirection: 'row',
    flex: 1,

  },
  button: {
    flex: 1,
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderRadius: 100,
  },
  container2: {
    flexDirection: 'row',
    flex: 2,
  },
  button2: {
    flex: 1,
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    padding: 10,
    borderRadius: 100,
  },
});

