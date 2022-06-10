import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TextInput, Button, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function LogInScreen({ navigation }) {
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
            value={""}
            onChangeText={""}
            style={styles1.textInput}
          />
        </View>
        <View style={styles1.inputWrapper}>
          <Text style={styles1.label}>비밀번호</Text>
          <TextInput
            placeholder="비밀번호"
            value={""}
            onChangeText={""}
            secureTextEntry
            style={styles1.textInput}
          />
        </View>
        <View style={styles1.buttons}>
          <TouchableOpacity
            style={styles1.button}
            onPress={async () => await navigation.navigate("K.W.I의 App")}>
            <Text style={styles1.buttonText}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles1.button1}
            onPress={async () => await navigation.navigate("AuthScreen")}
          >
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