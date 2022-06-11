import React from 'react';
import { StatusBar} from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabNavigator from './navigation/StackNavigator';
import {View} from 'react-native';



//import CommunitiyPage from './pages/CommunityPage';
//import MainPage from './pages/MainPage';
//import AboutPage from './pages/AboutPage';
//import TextPage from './pages/TextPage';
//import BannerPage from './pages/BannerPage';
//import ReviewPage from './pages/ReviewPage';

/*
import SearchBar from './pages/SearchBar';
import List from './pages/List';
import Home from './pages/Home';
import ReviewPage from './pages/ReviewPage';
import TestPage from './pages/TestPage';
*/

// const Tab = createBottomTabNavigator();

export default function App(){
  return(


    <NavigationContainer>
      <StackNavigator/>
      </NavigationContainer>
);
}
  //return(<CommunitiyPage/>)
  //return(<MainPage/>)
  //return(<AboutPage/>)
  //return(<TextPage/>)
  //return(<BannerPage/>)
  //return(<ReviewPage/>)

/*
  return(<SearchBar/>)
  return(<Home/>)
  return(<List/>)
  return(<TestPage/>)
  */
