import { Navigation } from '../navigation/StackNavigator';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, ScrollView, StatusBar, TouchableOpacity, transform, Button } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import favicon from "../assets/IU.jpg"
import favicon1 from "../assets/교통대학교.jpg"
// import ReloadIcon from './ReloadIcon';

import { useIsFocused } from '@react-navigation/native';

import Loading from '../components/Loading';
import axios from 'axios';

var conid;
var array = [];
//후기커뮤니티 페이지 

export default function CommunityPage({ navigation }) {

  const isFocused = useIsFocused();
    
  // const get_Ready =() =>{
  //   getReady(!ready)
  // }

    const [working, setWorking] = useState(true);
    const 내후기보기 = () => setWorking(false);
    const 후기작성 = () => setWorking(true);

    const [ready, setready] = useState(true);
    const [ready2, setready2] = useState(true);
    const [getarray, setgetarray] = useState(['']);
  

  

    useEffect(() => {
        async function uEffect() {
            await myreviewReq();
    
        }    

        uEffect();
    },[isFocused])

    

    const myreviewReq = async () => {
        id = await AsyncStorage.getItem('id');
        array = [];
        var data = await axios.get('http://13.125.236.240:3003/review', {
            params: {
                r_num : 0,
                type : 3,
                contentid : 0,
                id : id
            }
        });
    
        
        if(data.data.result !=null){
            setready2(false);
            for (var i = 0; i < data.data.result.length; i++) {
                array.push({
                    title: data.data.result[i].title, content: data.data.result[i].content
                    , img: data.data.result[i].img, id: data.data.result[i].id , r_num: data.data.result[i].r_num
                });
            }
        }
        else{
            array = [{title : null}];
        }
        
        setready(false);
      
        setgetarray(array)

     
    }

    
    const deleteButton = async(rnum)=>{


        await axios({
            method: "post",
            url: "http://13.125.236.240:3003/deleteReview",
            data: { rnum : rnum },
        })
        .then(function (response) {
              
            console.log(response.data);
            if(response.inSuccess){
              console.log("삭제 성공");
            }
            else if (response.data.inSuccess == false){
              alert("삭제 실패");
              return 0;
            }
          })
          .catch(function (response) {
            alert("서버 통신 오류");
            console.log(response);
      });

      await myreviewReq();

    


    }


    const renderItem = ({ item }) => {
        return (
            <View style={styles.large}>
            <TouchableOpacity
            style={{}}
            onPress={async () => {
                await AsyncStorage.setItem("r_num", item.r_num.toString());
                navigation.navigate("후기 페이지");
            }}>
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

                    <Image source={{uri:'http://13.125.236.240:3003/'+item.img}}
                        style={{width: 100, resizeMode: "stretch", height: 100, borderRadius: 10 }}
                    />
                </View>
            </View>
            </TouchableOpacity>
            <View><Text></Text></View>
            <TouchableOpacity
                 onPress={async () => {
                    deleteButton(item.r_num);
                    // <ReloadIcon load={load}/>
                }}>
                   
                <View style={{backgroundColor:"#e9e9e9",
                fontSize:24,
                borderWidth:3,
                borderRadius:10,
                marginLeft:300,
                alignItems:"center",
                marginBottom:10,}}>
                    <Text>후기 삭제</Text>
                </View>
            </TouchableOpacity>
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
            data={getarray}
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
    // delete:{

    //     backgroundColor:"#e9e9e9",
    //     fontSize:24,
    //     borderWidth:3,
    //     borderRadius:10,
    //     marginLeft:300,
    //     alignItems:"center",
    //     marginBottom:10,

    // },
    // large:{
    //     flex:1,
    //     marginBottom:30,

});