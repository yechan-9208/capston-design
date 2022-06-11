import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { StyleSheet, StatusBar, Text, View, Button, TextInput,Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loading from '../components/Loading';
import * as Font from "expo-font";

var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
export default function SearchPage({ navigation, route }) {

  const onChangeText = (payload) => {
    if (regExp.test(payload)) {
      alert('특수문자 ㄴㄴ')
      return 0;
    }
    setText(payload);

  }
  const [text, setText] = useState("");
  const [ready,setready] = useState(true);
  const { width, height } = Dimensions.get('window');
 
  
  useEffect(() =>{
    async function uEffect(){
        await Font.loadAsync({
            NEXONBOLD : require('../assets/fonts/NEXONLv1GothicBold.ttf'),
            NEXONLIGHT : require('../assets/fonts/NEXONLv1GothicLight.ttf'),
            NEXONREGULAR : require('../assets/fonts/NEXONLv1GothicRegular.ttf'),
         });
         setready(false);
        }
        uEffect();
      }
    )
      

  return ready ? <Loading/> :  (
    <KeyboardAwareScrollView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.container1}>
        <Text style={styles.title}>
          ""에대한 여행지 검색
        </Text>
      </View>

      <View style={styles.container2}>
        <TextInput
          onChangeText={onChangeText}
          value={text}
          style={styles.input}
          placeholder={"입력하세요"}
          keyboardType="default"

        />
        <Button
          onPress={async () => {
            if
              (text == "") {
              alert('공백은 사용하지 못합니다.')
            }
            else {
              await AsyncStorage.setItem('flag', '1');
              await AsyncStorage.setItem('keyword', text);
              navigation.navigate("여행지결과 페이지")
            }
          }
          }
          title="검색"
          color="black"

        />
        </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  title: {
    marginLeft: 100,
    fontSize: 25,
    fontFamily:"NEXONBOLD",
  },
  container1: {
    justifyContent: "center",
    height: 200,
  },
  container2: {
    marginLeft: 50,
    flex: 1,
    flexDirection: "row",
  },
  input: {
    marginTop: 0, // 검색창 위치
    // paddingVertical: 5, //검색창 크기
    paddingHorizontal: 20, // 안에 입력하세요 위치
    borderRadius: 0, //원형
    borderWidth:2,
    width:300,
    backgroundColor: "#d9d9d9",

  },
  input2:{
    backgroundColor:"blue"
  },
  input3:{
    backgroundColor:"orange",
  },
});
