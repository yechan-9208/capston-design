import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
//이렇게 상단에 가져와 사용할 이미지를 불러옵니다

import data from './data.json';

// const inHeight = Dimensions.get('window').height;
const inWidth = Dimensions.get('window').width;

var state ={
  data : ''
};


//후기페이지
const AreasetPage = (onPress) => {

 
  // console.log(data.seoul);
  const [area, setArea] = useState('');
  const [indata, setIndata] = useState([]);

   var seoul = () => {
     console.log(1);
     setIndata(data.seoul)
   }
   var game = () => {
    console.log(2);
     setIndata(data.game)
   }

   var areabtn = (content) =>{
    console.log(3);
    // setArea(content);
    // state.data = area;
    // console.log(state.data);
  }


  useEffect(() => {
    setArea(data.seoul)
  }, [])





  return (
    <View style={styles.container}>
      <View style={styles.container1}>

        <TouchableOpacity style={styles.button} onPress={seoul}>
          <Text>서울</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={game}>
          <Text>경기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        {/* <ScrollView horizontal={true} > */}
        <ScrollView>
          <View style={styles.both}>
            <View style={styles.both1}>
              {
                indata.map((content, i) => {
                  if (i % 2 == 0) {
                    return (
                      <TouchableOpacity style={styles.button2} onPress={areabtn(content)} key={i}>
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
                      <TouchableOpacity style={styles.button2} onPress={areabtn(content)} key={i}>
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
  );
};


export default AreasetPage;

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
    flex: 2,

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
    flex: 10,
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
  both: {
    flex: 1,
    flexDirection: 'row'
  },
  both1: {
    flex: 1,
  }
});

