import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Image, ScrollView, Button, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;


export default function LogInScreen({ navigation }) {

  const [errortext, setErrortext] = useState('아이디와 비밀번호를 입력해주세요.');
  const [inScs,setinScs] = useState(false);
  const secondRef = useRef();
  const [inputs, setInputs] = useState({
    id: '',
    password: ''
  });

  const { id, password } = inputs;

  const onChange =  (keyvalue, e) => {
    const { text } = e.nativeEvent
    
    if(regExp.test(text)){
      if(keyvalue == 'id'){
        onReset(1);
      }
      else if(keyvalue == 'password'){
        onReset(2);
      }
      
      setErrortext('특수문자는 사용할 수 없습니다.');

    }
    else{
      setInputs({
        ...inputs,
        
        [keyvalue]: text
      });

    }
  };

  const onReset = (type) => {
    if(type == 1){
      setInputs({
        id: '',
        password : password
      }) 
    } 
    else if(type == 2){
      setInputs({
        id : id,
        password: ''
      })
    }
    else{
      setInputs({
        id: '',
        password: '',
      })
    }
  };

  const buttonLogin = async()=>{

    var data = await axios.post('http://13.125.236.240:3003/login',{ id : id , pw : password});
   console.log(data.data)
    
    if(data.data.inSuccess == false){
      onReset();
      if(data.data.code == 402){
        setErrortext('아이디가 형식에 맞지 않습니다.');
      }
      else if (data.data.code == 406){
        setErrortext(data.data.message);
      }
      else if (data.data.code == 407){
        setErrortext(data.data.message);
      }
    }
    else if(data.data.inSuccess == true){
      await AsyncStorage.setItem('id',data.data.result[0].id);
      await AsyncStorage.setItem('nickname',data.data.result[0].nickname);
      await navigation.navigate("K.W.I의 App");
    }
    
  }
  
 

  return (
    <SafeAreaView style={styles1.container}>
      <View style={styles1.title}>
        <Text style={styles1.titleText}>로그인</Text>
      </View>
      <View style={styles1.form}>
        <View style={styles1.inputWrapper}>
          <Text style={styles1.label}>아이디</Text>
          <TextInput
            placeholder="아이디"
            onChange={(e) => onChange("id", e)}
            value={id}
            onSubmitEditing={() => secondRef.current.focus()}
            style={styles1.textInput}
          />
        </View>
        <View style={styles1.inputWrapper}>
          <Text style={styles1.label}>비밀번호</Text>
          <TextInput
            placeholder="비밀번호"
            onChange={(e) => onChange("password", e)}
            value={password}
            ref={secondRef}
            secureTextEntry
            style={styles1.textInput}
          />
          <Text>{errortext}</Text>
        </View>
        <View style={styles1.buttons}>
          <TouchableOpacity
            style={styles1.button}
            onPress={async () => {
              await buttonLogin();
              // await navigation.navigate("K.W.I의 App");
              
              
              }}>
            <Text style={styles1.buttonText}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles1.button1}

            onPress={async () => await navigation.navigate("AuthScreen")}>

            <Text style={styles1.buttonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    width: "100%",
    height: "15%",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 30,
  },
  form: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrapper: {
    width: "100%",
    paddingBottom: 20,
  },
  label: {
    fontSize: 20,
    paddingBottom: 6,
  },
  textInput: {
    width: "100%",
    height: 35,
    backgroundColor: "#d9d9d9",
    borderRadius: 5,
  },
  buttons: {
    width: "100%",
    height: 45,
    flexDirection: "row",
    justifyContent: "space-around",
    //backgroundColor: "pink",
  },
  button: {
    width: "30%",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button1: {
    width: "30%",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
  },
});