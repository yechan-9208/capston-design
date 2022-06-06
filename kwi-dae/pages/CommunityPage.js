import { Navigation } from '../navigation/StackNavigator';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, ScrollView, StatusBar, TouchableOpacity, transform, Button } from 'react-native';
import favicon from "../assets/IU.jpg"
import favicon1 from "../assets/교통대학교.jpg"
import favicon2 from "../assets/공원아이콘최종.png"
//후기커뮤니티 페이지 

export default function CommunityPage({ navigation }) {
    const main = 'https://firebasestorage.googleapis.com/v0/b/sparta-image.appspot.com/o/lecture%2Fmain.png?alt=media&token=8e5eb78d-19ee-4359-9209-347d125b322c'


    const [working, setWorking] = useState(true);
    const 내후기보기 = () => setWorking(false);
    const 후기작성 = () => setWorking(true);
    return (
        <ScrollView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.containerOne}>
                <Text style={styles.title}>

                    후기
                </Text>
            </View>

            <View style={styles.box5}>
                <View style={styles.img}>
                    <Image source={{ uri: main }} style={{ width: 250, height: 200, resizeMode: "stretch" }} />
                </View>
                <View style={styles.text}>
                    <Text>후기내용 데이터 받아와야함 </Text>
                </View>
            </View>

            <View style={styles.box5}>
                <View style={styles.img}>
                    <Image source={favicon} style={{ width: 250, height: 200, resizeMode: "stretch" }} />
                </View>
                <View style={styles.text}>
                    <Text>후기내용</Text>
                </View>
            </View>

            <View style={styles.box5}>
                <View style={styles.img}>
                    <Image source={favicon1} style={{ width: 250, height: 200, resizeMode: "stretch" }} />
                </View>
                <View style={styles.text}>
                    <Text>후기내용</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={{}}
                    onPress={() => { navigation.navigate("후기작성 페이지") }}>
                    <Text style={styles.btnText}>후기작성</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("K.W.I의 App") }}>
                    <Text style={styles.btnText}>내후기보기</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 10,
        backgroundColor: 'white',

    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: 'red',
        textAlign: "center"
    },
    containerOne: {
        flex: 0.6,
        justifyContent: "center",
        alignContent: "center",
        borderBottomWidth: 4,
    },
    box5:{
        flex:1,
        flexDirection:"row",
    },
    footer: {
        flexDirection: 'row',  //  좌우로 설정
        justifyContent: "space-between", // 중간 띄우기
        backgroundColor: "white",
    }
})