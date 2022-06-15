import { Navigation } from '../navigation/StackNavigator';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, ScrollView, StatusBar, TouchableOpacity, transform, Button } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import favicon from "../assets/IU.jpg"
import favicon1 from "../assets/교통대학교.jpg"

import { useIsFocused } from '@react-navigation/native';

import Loading from '../components/Loading';
import axios from 'axios';

var conid;
var array = [];
//후기커뮤니티 페이지 



export default function CommunityPage({ navigation }) {

  const isFocused = useIsFocused();

  const main = 'https://firebasestorage.googleapis.com/v0/b/sparta-image.appspot.com/o/lecture%2Fmain.png?alt=media&token=8e5eb78d-19ee-4359-9209-347d125b322c'

  var count = 0;

  const [working, setWorking] = useState(true);
  const 내후기보기 = () => setWorking(false);
  const 후기작성 = () => setWorking(true);


  const [getarray, setgetarray] = useState(['']);
  const [ready, setready] = useState(true);
  const [ready2, setready2] = useState(true);

  useEffect(() => {
    async function uEffect() {
            await reviewReq();

    }
    tab();
    uEffect();
  }, [isFocused])

  const reviewReq = async () => {
    conid = await AsyncStorage.getItem('contentid');
    array = [];
    var data = await axios.get('http://13.125.236.240:3003/review', {
      params: {
        contentid: conid,
        type: 1,
        r_num: 0,
        id: 0
      }
    });

    if (data.data.result != null) {
      setready2(false);
      for (var i = 0; i < data.data.result.length; i++) {
        array.push({
          title: data.data.result[i].title, content: data.data.result[i].content
          , img: data.data.result[i].img, id: data.data.result[i].id, r_num: data.data.result[i].r_num
        });
      }
    }
    else {
      array = [{ title: null }];
    }
    setgetarray(array)
 
    setready(false);


  }


  const tab = ()=>{
      navigation.addListener("tabPress",async (e)=>{
          await AsyncStorage.setItem('conid',conid);
      })
  }


  const renderItem = ({ item }) => {
    return (

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

            <Image source={{ uri: 'http://13.125.236.240:3003/' + item.img }}
              style={{ width: 100, resizeMode: "stretch", height: 100, borderRadius: 10 }}
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const noRender = () => {
    return (
      <View style={styles.container}>
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
    backgroundColor: '#e9e9e9',
  },
  box: {
    flex: 1,
    marginTop: 1,
    marginBottom: 1,
    borderRadius: 5,
    backgroundColor: "#ffffff"

  },
  id: {
    fontSize: 20,
    borderBottomColor: '#e9e9e9',
    borderBottomWidth: 1,
    padding: 10,

  },
  title: {
    fontSize: 20,
    borderBottomColor: '#e9e9e9',
    borderBottomWidth: 1,
    padding: 10,
  },
  content: {
    fontSize: 15,
    borderBottomColor: '#e9e9e9',
    borderBottomWidth: 1,
    padding: 10,
  },
});