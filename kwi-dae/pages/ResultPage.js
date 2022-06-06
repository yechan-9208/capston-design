import { Navigation } from '../navigation/StackNavigator';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, ScrollView, StatusBar, Dimensions, TouchableOpacity, transform, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatGrid } from 'react-native-super-grid';
/*import {useFonts} from 'expo-font'
import { 
    NanumGothicCoding_400Regular,
    NanumGothicCoding_700Bold 
  } from '@expo-google-fonts/nanum-gothic-coding';
import AppLoading from 'expo-app-loading';
*/
import Loading from '../components/Loading';
import axios from 'axios';


//여행지 결과 페이지

var array = [];
var topWord = "";
  
export default function ResultPage({navigation,content}) {
    /*let[fontsLoaded,error]=useFonts({
        NanumGothicCoding_400Regular,
        NanumGothicCoding_700Bold 
    });

    if(!fontsLoaded){
        return <AppLoading/>
    }
    */
    const [ready, setready] = useState(true);
    const [items, setitem] = useState();
    

    useEffect(() => {
        async function uEffect(){
            await resultReq();
          }
        uEffect();
        
    },[])



    const resultReq = async () => {
        array = [];
        var flag = await AsyncStorage.getItem('flag');

        if (flag == "1") {
            // keyword 통신
            await AsyncStorage.removeItem('flag');
            topWord = '';

            var keyword = await AsyncStorage.getItem('keyword');
            topWord = "'"+ keyword + "' 에 대한 검색 결과";

            var result = await axios.get('http://13.125.236.240:3003/Search', {
                params: {
                    keyword: keyword
                }
            });
            await AsyncStorage.removeItem('keyword');

            for (var i = 0; i<result.data.result.length ; i++) {
                array.push({ title : result.data.result[i].title, firstimage : result.data.result[i].firstimage
                            , contentid : result.data.result[i].contentid, contenttypeid : result.data.result[i].contenttypeid });
                }

            

            setready(false);
        }
        else if (flag == "2") {
            // category 통신
            await AsyncStorage.removeItem('flag');
            topWord = '';
            var cat = await AsyncStorage.getItem('cat');

            switch(cat){
                case '0':
                topWord = '축제'
                break;
                case '1':
                topWord = '공연'
                break;
                case '2':
                topWord = '자연 관광지'
                break;
                case '3':
                topWord = '전시회'
                break;
                case '4':
                topWord = '계곡, 폭포'
                break;
                case '5':
                topWord = '식물원'
                break;
                default :
                topWord = '오류'
                break;
            }

            var result = await axios.get('http://13.125.236.240:3003/category', {
                params: {
                    catCode: cat
                }
            });
            await AsyncStorage.removeItem('cat');
            

            for (var i = 0; i<result.data.result.length ; i++) {
                array.push({ title : result.data.result[i].title, firstimage : result.data.result[i].firstimage
                            , contentid : result.data.result[i].contentid, contenttypeid : result.data.result[i].contenttypeid });
                }
            
            setready(false);
        }
        else {
            // flag 오류처리
            alert("flag 오류입니다");
            useNavigation.navigate("K.W.I의 App");
        }
    }

    const randerItem = ({ item }) => {
        return(
        <View style={styles.container}>
            <StatusBar style="auto" />

                <TouchableOpacity style={styles.Big}
                onPress={async ()=>{ 
                    await AsyncStorage.removeItem('contentid');
                    await AsyncStorage.removeItem('contenttypeid');
                    await AsyncStorage.setItem('contentid', item.contentid.toString());
                    await AsyncStorage.setItem('contenttypeid', item.contenttypeid.toString());
                    navigation.navigate("여행지정보 페이지")}}>
                    <Image source={{ uri: item.firstimage }}
                        style={{width: 180, resizeMode: "stretch", height: 200 ,borderRadius:10}}
                    />
                <Text style={styles.text}>
                    {item.title}
                </Text>
                </TouchableOpacity>
                </View>)
    }
        

    return ready ? <Loading /> : (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>{topWord}</Text>
            </View>
            <FlatGrid
                spacing={20}
                data={array}
                renderItem={randerItem}
            >
            </FlatGrid>
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
    },
    header: {
        height: 120,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 40,
        borderTopWidth: 10,
        borderBottomWidth: 10,
        borderColor: "gray",
        backgroundColor:"white"

    },
    Big: {
        alignItems:"center",
 
    },

    text: {
        //fontFamily:'NanumGothicCoding_400Regular',
        fontSize: 15,
        color: "black",
        borderTopWidth:0,
        marginTop:10,
        marginBottom:10,
    }
});