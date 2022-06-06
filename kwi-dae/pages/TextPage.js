
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//후기작성페이지
import favicon from "../assets/IU.jpg"
import favicon1 from "../assets/교통대학교.jpg"

export default function TextPage() {
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

    const { width, height } = Dimensions.get('window')

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <StatusBar style="auto" />

            <View style={styles.header}>
                <Text style={styles.title}>~사진의 후기작성하기</Text>
            </View>
            <View style={styles.container1}>
                <Image source={favicon}
                    style={{
                        width: 250, resizeMode: "stretch", height: 200
                    }}
                />
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

            <View>
                <TouchableOpacity style={{}}
                    onPress={() => {
                        navigation.navigate("후기작성 페이지")
                    }}>
                    <Text style={styles.finish}>
                        작성완료
                    </Text>
                </TouchableOpacity>
            </View>

        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1

    },
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        borderBottomWidth: 2,
        borderColor: "white",
    },
    title: {
        fontSize: 44,
        fontWeight: "600",
        color: "black",

    },
    container1: {
        flex: 1,
        alignItems: "center",
    },
    container2: {
        flex: 1,
        backgroundColor: "white",
        margin: 20,

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
        width: 500,
        height: 500,
        marginTop: 0, // 검색창 위치
        // paddingVertical: 200, //검색창 크기
        paddingHorizontal: 0, // 안에 입력하세요 위치
        borderRadius: 0, //원형
        textAlignVertical: 'top',//paddingVertical로 쓰지말고 width height로 쓰니까 먹힘
    },

    finish: {
        marginRight: 20,
        fontSize: 30,
        textAlign: 'right',
        borderWidth: 1,
        borderColor: 'blue',
        marginLeft: 280,
    }
});