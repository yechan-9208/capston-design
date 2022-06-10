// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// import MainPage from '../pages/MainPage';
// import SearchPage from '../pages/SearchPage';


// const Tab = () => {
//   return (
//       <Tab.Navigator
//           screenOptions={{ headerShown: false }}>
//           <Tab.Screen name="메인 페이지" 
//           component={MainPage}
//           // children={()=> <MainPage/> }
//               options={{
//                   tabBarIcon: ({ focused }) => (
//                       <Ionicons
//                           name="home-sharp"
//                           style={{ color: focused ? "#00B386" : "#404040" }} 
//                           // 앞에가 눌린색깔 뒤에가 안눌렸을때
//                           size={30} />)
//               }}></Tab.Screen>

//           <Tab.Screen name="검색" component={SearchPage}
//               options={{
//                   tabBarIcon: ({ focused }) => (
//                       <FontAwesome5
//                           name="search"
//                           style={{ color: focused ? "#00B386" : "#404040" }}
//                           size={30} />)
//               }}></Tab.Screen>
//       </Tab.Navigator>
//   )
// }
// export default Tab;