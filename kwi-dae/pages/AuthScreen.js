// import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Image, TouchableOpacity, StatusBar, Button, Dimensions, Text } from 'react-native';





export default function AuthScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <View style={styles.box1}>
                <Text style={styles.title}>
                    여행지 추천!!
                </Text>
            </View>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.signInButton} 
                onPress={async ()=>{
                await navigation.navigate("LogInScreen")}}>
                    <Text style={styles.signInButtonText}>회원가입</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signUpButton} 
                onPress={async ()=>{
                    await navigation.navigate("EnrollScreen")}}>
                    <Text style={styles.signUpButtonText}>로그인</Text>
                </TouchableOpacity>
            </View>
        </View>




    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    box1: {
        width: "100%",
        height: "55%",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 55,
        fontWeight: "bold",
        width: "100%",
        height: "55%",
        textAlign:"center",
        justifyContent: "center"
    },
    buttonWrapper: {
        width: "100%",
        height: "45%",
        alignItems: "center",
        paddingTop: 90,
    },
    signInButton: {
        backgroundColor: "black",
        width: "40%",
        alignItems: "center",
        borderRadius: 15,
        borderWidth: 1,
        padding: 10,
        margin: 10,
    },
    signUpButton: {
        width: "40%",
        alignItems: "center",
        borderRadius: 15,
        borderWidth: 1,
        padding: 10,
        margin: 10,
    },
    signInButtonText: {
        color: "white",
        fontSize: 25,
    },
    signUpButtonText: {
        fontSize: 25,
    }

});