
import React, { useState, useRef , useEffect } from 'react';
import { StyleSheet, Platform,Text, View, TextInput, Image, ScrollView, Button,TouchableOpacity, StatusBar, Dimensions, RefreshControlBase } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//후기작성페이지

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

var formData;
var regExp = /'|;|--|,/g


export default function TextPage({navigation}) {
    const [image, setImage] = useState(null);
    const [ready,setready] =useState(true);
    const [type,settype] =useState(0);

    useEffect(()=>{
        const uEffect = async()=>{
            tabEvent();
        }
        uEffect();
        setready(false);
    });

    const pickImage = async () => {
      
      let result = await ImagePicker.launchImageLibraryAsync({
    
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [16 ,9], // 이미지 비율 설정하는거
        quality: 1,     //1로하면 가장 높은 품질 업로드
      });
      console.log(result.uri);
  
        const localUri = result.uri;
        const filename = localUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename ?? '');
        const type = match? `image/${match[1]}` : `image`;
        formData = new FormData();
        formData.append('image',{ uri : localUri , name : filename, type});
            
        
        
      settype(0);

      if (!result.cancelled) {
        setImage(result.uri);
        settype(1);
      }

    };

    const reviewInsert = async ()=>{

        if(title.trim().length == 0){
            alert("제목을 입력해주세요.");
            return false;
        }
        else if(content.trim().length == 0){
            alert("내용을 입력해주세요.");
            return false;
        }

        if(regExp.test(title)){
            alert("제목에 허용되지 않은 특수문자가 포함되어 있습니다. (--,;)");
            return false;
        }
        else if(regExp.test(content)){
            alert("제목에 허용되지 않은 특수문자가 포함되어 있습니다. (--,;)");
            return false;
        }

        setready(true);

        var img = null;
        var id = await AsyncStorage.getItem('id');
        var conid = await AsyncStorage.getItem('contentid');
        console.log("das :"+ conid)

        if(type == 1){
            await axios({
                method: "post",
                url: "http://13.125.236.240:3003/upload",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
              })
                .then(function (response) {
                  
                  console.log(response.data);
                  
                  img = response.data.result;
                  
                  if (response.inSuccess == false){
                    alert(response.message);
                    return 0;
                  }
    
                })
                .catch(function (response) {
                  alert("서버 통신 오류1");
                  console.log(response);
                  return 0;
            });
        }
        else{
            img = null;
        }

        await axios({
            method: "post",
            url: "http://13.125.236.240:3003/insertReview",
            data: { title : title, content : content, img : img , id : id, contentid : conid },
          })
            .then(function (response) {
              
              console.log(response.data);
              if(response.inSuccess){
                
              }
              else if (response.data.inSuccess == false){
                alert(response.message);
                console.log(title);
                console.log(content);
                console.log(img);
                console.log(id);
                console.log(conid);
                return 0;
              }

            })
            .catch(function (response) {
              alert("서버 통신 오류2");
              console.log(response);
        });

        onReset();

        setready(false);


        
    }

    

    const secondRef = useRef();
    const [inputs, setInputs] = useState({
        title: '',
        content: '',
    });

    

    const { title, content } = inputs;

    const onChange = (keyvalue, e) => {
        const { text } = e.nativeEvent
        setInputs({
            ...inputs,
            [keyvalue]: text
        });
    };

    const onReset = () => {
        setInputs({
            title: '',
            content: '',
        })
    };

    const tabEvent = ()=>{
        navigation.addListener("tabPress",async (e)=>{
            conid = await AsyncStorage.getItem('conid')
            
        })
    }

    
    return ready ? <Loading/>: (
        <KeyboardAwareScrollView style={styles.container}>
            <StatusBar stylnae="auto" />

            <View style={styles.header}>
                <Text style={styles.title}> 후기 작성</Text>
            </View>
            <View style={styles.container1}>

            {image && <Image source={{ uri: image }} style={{ width: 275, height: 200}} />}

            </View>
            <View style={styles.container2}>
                <Text>제목</Text>
                <TextInput
                    style={styles.input0}
                    onChange={(e) => onChange("title", e)}
                    value={title}
                    onSubmitEditing={() => secondRef.current.focus()}
                    placeholder={"제목을 입력하세요"}
                />
                <Text>내용</Text>
                
                <TextInput
                    style={styles.input}
                    onChange={(e) => onChange("content", e)}
                    value={content}
                    onSubmitEditing={onReset}
                    ref={secondRef}
                    multiline={true}
                    placeholder={"내용을 입력하세요"}
                />

                <Text></Text>
               
            </View>

            <View style={styles.container3}>

                <View>
                <Button style ={styles.button}
                title="사진 올리기" onPress={pickImage} />

                </View>
                <View>
                <TouchableOpacity style={{}}
                    onPress={async () => {
                        await navigation.goBack();
                        await reviewInsert();
                    }}>
                    <Text style={styles.finish}>
                        작성완료
                    </Text>
                </TouchableOpacity>
                </View>
            </View>

        </KeyboardAwareScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white",

    },
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        borderBottomWidth: 5,
        borderColor: "#e9e9e9",
    },
    title: {
        fontSize: 44,
        fontWeight: "600",
        color: "black",

    },
    container1: {
        flex: 1,
        alignItems: "center",
        borderBottomWidth: 5,
        borderColor: "#e9e9e9",

    },
    container2: {
        flex: 1,
        backgroundColor: "white",
        borderWidth:5,
        borderColor:"#e9e9e9",
        borderRadius:20,        
        padding:20,
        marginLeft:20,
        marginRight:20,
        marginTop:20,
    },
    input0: {
        backgroundColor: "white",
        marginTop: 0, // 검색창 위치
        paddingVertical: 10, //검색창 크기
        paddingHorizontal: 0, // 안에 입력하세요 위치
        borderRadius: 0, //원형


    },
    input: {
        backgroundColor: "white",
        width: 200,
        height: 500,
        marginTop: 0, // 검색창 위치
        // paddingVertical: 200, //검색창 크기
        paddingHorizontal: 0, // 안에 입력하세요 위치
        borderRadius: 0, //원형
        textAlignVertical: 'top',//paddingVertical로 쓰지말고 width height로 쓰니까 먹힘
    },

    finish: {
        fontSize: 30,
        borderWidth: 1,
        borderColor: 'black',
    },
    button:{
        
    },
    container3:{
        flexDirection:"row",
        justifyContent:"space-between",
        padding:20,
    }
});
