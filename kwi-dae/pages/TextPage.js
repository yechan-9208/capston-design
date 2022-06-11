
import React, { useState, useRef , useEffect } from 'react';
import { StyleSheet, Platform,Text, View, TextInput, Image, ScrollView, Button,TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//후기작성페이지

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TextPage({navigation}) {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
    
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [16 ,9], // 이미지 비율 설정하는거
        quality: 1,     //1로하면 가장 높은 품질 업로드
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
      console.log(image);
    };

    useEffect(()=>{
        const uEffect = async()=>{
            tabEvent();
        }
        uEffect();
    });

    const secondRef = useRef();
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    });

    const { name, nickname } = inputs;

    const onChange = (keyvalue, e) => {
        const { text } = e.nativeEvent
        setInputs({
            ...inputs,
            [keyvalue]: text
        });
    };

    const onReset = () => {
        setInputs({
            name: '',
            nickname: '',
        })
    };

    const tabEvent = ()=>{
        navigation.addListener("tabPress",async (e)=>{
            conid = await AsyncStorage.getItem('conid')
            
        })
    }

    
    return (
        <KeyboardAwareScrollView style={styles.container}>
            <StatusBar style="auto" />

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
                    onChange={(e) => onChange("name", e)}
                    value={name}
                    onSubmitEditing={() => secondRef.current.focus()}
                    placeholder={"제목을 입력하세요"}
                />
                <Text>내용</Text>
                
                <TextInput
                    style={styles.input}
                    onChange={(e) => onChange("nickname", e)}
                    value={nickname}
                    onSubmitEditing={onReset}
                    ref={secondRef}
                    multiline={true}
                    placeholder={"내용을 입력하세요"}
                />

                <Text>name: {name}, nickname: {nickname}</Text>
               
            </View>

            <View style={styles.container3}>

                <View>
                <Button style ={styles.button}
                title="사진 올리기" onPress={pickImage} />

                </View>
                <View>
                <TouchableOpacity style={{}}
                    onPress={() => {
                        navigation.navigate("후기 페이지")
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

