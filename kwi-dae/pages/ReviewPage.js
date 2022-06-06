import React from 'react';
import { StyleSheet, Text, View, Image , ScrollView, TextInput,  StatusBar} from 'react-native';
import { Navigation } from '@react-navigation/native';
//이렇게 상단에 가져와 사용할 이미지를 불러옵니다


import favicon from "../assets/IU.jpg"
//후기페이지
export default function ReviewPage(content,navigation) {
return (
    <ScrollView style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>입력받은 후기제목</Text>
        <View style={styles.container1}>
        <Image source={favicon}
                    style={{
                        width: 250, resizeMode: "stretch", height: 200
                    }}
                />
                </View>
        <View style={styles.container2}>
            <Text>입력받은 후기내용</Text>
        </View>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title:{
        fontSize:44,
        fontWeight:"600",
        color:"black",
        borderTopWidth:3,
        borderBottomWidth:3,
    },
    container1:{
        flex:1,
        borderBottomWidth:5,
        alignItems:"center",
    },
    container2:{
        flex:1,
    },
});
