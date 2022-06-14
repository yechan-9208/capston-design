import React ,{useState} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font';


export default function Loading(){
    const [isReady, setlsReady] = useState(false);
    const onFinish = () => setlsReady(true);
    const startLoading = async () => {
        await new Promise((resolve) => setTimeout(resolve,1000))
    };
    if (!isReady){
        return(
            <AppLoading
            startAsync={startLoading}
            
            onFinish={onFinish}
            onError={console.error}/>
        )
        }
    return(
    <View style = {styles.container}><Text style={styles.title}>준비중입니다...</Text></View>)
}


const styles = StyleSheet.create({
    container : {
        //앱의 배경색
        flex : 1,
        justifyContent : 'center',
        alignItems: 'center',
        backgroundColor: '#fdc453',
    },
    title : {
        fontSize:20,
        fontWeight:'700' 
    }
})
