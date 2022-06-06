import { Navigation } from '../navigation/StackNavigator';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, ScrollView, StatusBar, TouchableOpacity, transform, Button } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import favicon from "../assets/IU.jpg"
import favicon1 from "../assets/교통대학교.jpg"

import Loading from '../components/Loading';
import axios from 'axios';

var conid;
var array = [];
//후기커뮤니티 페이지 

export default function CommunityPage({ navigation }) {
    const main = 'https://firebasestorage.googleapis.com/v0/b/sparta-image.appspot.com/o/lecture%2Fmain.png?alt=media&token=8e5eb78d-19ee-4359-9209-347d125b322c'


    const [working, setWorking] = useState(true);
    const 내후기보기 = () => setWorking(false);
    const 후기작성 = () => setWorking(true);

    const [ready, setready] = useState(true);
    const [ready2, setready2] = useState(true);
    useEffect(() => {
        async function uEffect() {
            await reviewReq();
        }
        uEffect();

    },[])

    const reviewReq = async () => {
        conid = await AsyncStorage.getItem('contentid');
        await AsyncStorage.removeItem('contentid');
        array = [];
        var data = await axios.get('http://13.125.236.240:3003/review', {
            params: {
                contentid: conid
            }
        });
        console.log(data.data.result);
        if(data.data.result !=null){
            setready2(false);
            for (var i = 0; i < data.data.result.length; i++) {
                array.push({
                    title: data.data.result[i].title, content: data.data.result[i].content
                    , img: data.data.result[i].img, id: data.data.result[i].id
                });
            }
        }
        else{
            array = [{title : null}];
        }

        setready(false);
    }


    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.box}>

                    <Text style={styles.id}>
                        {item.id}님
                        
                    </Text>
                    <Text style={styles.title}>
                        {item.title}
                    </Text>
                    <Text style={styles.content}>
                        {item.content}
                    </Text>

                    <Image source={favicon}
                        style={{width: 100, resizeMode: "stretch", height: 100, borderRadius: 10 }}
                    />
                </View>
            </View>
            )
        }
    const noRender = ()=>{
        return (
            <View style = {styles.container}>
                <StatusBar style="auto" />
                <View style={styles.box}>
                    <Text>
                        후기 정보가 없습니다.
                    </Text>
                </View>
            </View>
        )
    }

    return ready ? <Loading /> : (
        <View style={styles.container}>
        <FlatGrid
            itemDimension={400}
            data={array}
            style={styles.gridView}
            spacing={10}
            renderItem={ready2 ? noRender : renderItem}
        >
            </FlatGrid>
            </View>
    
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#e9e9e9',
    },
    box:{
        flex:1,
        marginTop:1,
        marginBottom:1,
        borderRadius:5,
        backgroundColor:"#ffffff"

    },
    id:{
        fontSize:20,
        borderBottomColor:'#e9e9e9',
        borderBottomWidth:1,
        padding:10,

    },
    title:{
        fontSize:20,
        borderBottomColor:'#e9e9e9',
        borderBottomWidth:1,
        padding:10,
    },
    content:{
        fontSize:15,
        borderBottomColor:'#e9e9e9',
        borderBottomWidth:1,
        padding:10,
    },
});