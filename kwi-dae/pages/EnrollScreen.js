

import axios from 'axios';
import { StateContext } from 'navigation';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, TouchableOpacity, } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

export default function EnrollScreen({ navigation }) {

  const [errtext,errtextSet] = useState('');
  
  const Enroll = async () => {
    
    if (id == '' || name == ''|| nickname == '' || password == '' || repassword == '') {
      errtextSet('공백이 존재합니다.');
      onReset();
      return false;
    }
    else if (password != repassword){
      errtextSet('비밀번호와 비밀번호 확인이 서로 일치하지 않습니다.');
      onReset();
      return false;
    }
    // 특문 처리

    

    var data = await axios.post('http://13.125.236.240:3003/insertUser',{id:id,pw:password,name:name,nickname:nickname})

    if (data.data.code == 403){
      errtextSet('아이디 혹은 비밀번호에 허용되지 않은 특수문자가 포함되어있습니다.');
      onReset();
    }
    else if (data.data.code == 404){
      errtextSet('중복된 ID가 존재합니다.');
      onReset();
    }
    else if( data.data.code == 200){
      
      alert('회원가입 완료');

      await navigation.navigate("AuthScreen");
    }

  };


  const secondRef = useRef();
  const thirdRef = useRef();
  const fourthRef = useRef();
  const fifthhRef = useRef();
  const [inputs, setInputs] = useState({
    id: '',
    name: '',
    nickname: '',
    password: '',
    repassword: '',
  });

  const { id, name, nickname,password, repassword } = inputs;
  const onChange =  (keyvalue, e) => {
    const { text } = e.nativeEvent
    
    if(regExp.test(text)){
      if(keyvalue == 'id'){
        onReset(1);
      }
      else if(keyvalue == 'name'){
        onReset(2);
      }
      
      else if(keyvalue == 'nickname'){
        onReset(3);
      }
      else if(keyvalue == 'password'){
        onReset(4);
      }
      else if(keyvalue == 'repassword'){
        onReset(5);
      }
      errtextSet('특수문자는 사용할 수 없습니다.');

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
        name:name ,
        nickname:nickname,
        password : password,
        repassword:repassword,
      }) 
    } 
    else if(type == 2){
      setInputs({
        id: id,
        name:'' ,
        nickname:nickname,
        password : password,
        repassword:repassword,
      }) 
    } 
    else if(type == 3){
      setInputs({
        id: id,
        name:name ,
        nickname:'',
        password : password,
        repassword:repassword,
      }) 
    } 
    else if(type == 4){
      setInputs({
        id: id,
        name:name ,
        nickname:nickname,
        password : '',
        repassword:repassword,
      }) 
    } 
    else if(type == 5){
      setInputs({
        id: id,
        name:name ,
        nickname:nickname,
        password : password,
        repassword: '',
      }) 
    } 
    else{
      setInputs({
        id: '',
        name: '',
        nickname:'',
        password: '',
        repassword: '',
      })

    }

    
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>회원가입</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>아이디</Text>
          <TextInput
            placeholder="아이디"
            onChange={(e) => onChange("id", e)}
            value={id}
            onSubmitEditing={() => secondRef.current.focus()}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>이름</Text>
          <TextInput
            placeholder="이름"
            onChange={(e) => onChange("name", e)}
            value={name}
            onSubmitEditing={() => thirdRef.current.focus()}
            ref={secondRef}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>닉네임</Text>
          <TextInput
            placeholder="닉네임"
            onChange={(e) => onChange("nickname", e)}
            value={nickname}
            onSubmitEditing={() => fourthRef.current.focus()}
            ref={thirdRef}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            placeholder="비밀번호"
            value={password}
            onChange={(e) => onChange("password", e)}
            onSubmitEditing={() => fifthhRef.current.focus()}
            ref={fourthRef}
            secureTextEntry
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>비밀번호 확인</Text>
          <TextInput
            placeholder="비밀번호 확인"
            onChange={(e) => onChange("repassword", e)}
            value={repassword}
            onSubmitEditing={(onReset) => fifthhRef.current.focus()}
            ref={fifthhRef}
            secureTextEntry
            style={styles.textInput}
          />
          <Text>{errtext}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => { Enroll() }}>
            <Text style={styles.buttonText}>회원가입</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => await navigation.navigate("AuthScreen")}>
            {/* // onPress={() =>  save()} */}

            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "white"
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
  },
  button: {
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