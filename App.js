import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import moment from 'moment';

export default function App() {
  {/*
  componentDidMount()
  {
    SplashScreen.hide();
  }
  */}

  return (
     <AppContainer />
  );
}

// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
//
// import AddUserScreen from './screens/AddUserScreen';
// import UserScreen from './screens/UserScreen';
// import UserDetailScreen from './screens/UserDetailScreen';
// import HomeScreen from '.screens/Home/HomeScreen';
// const Stack = createStackNavigator();
//
// function MyStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName='Home'
//       screenOptions={{
//           headerStyle: {
//             backgroundColor: '#62A12B',
//           },
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//         }}
//       >
//       <Stack.Screen
//         name="AddUserScreen"
//         component={AddUserScreen}
//         options={{ title: 'Add User' }}
//       />
//       <Stack.Screen
//         name="UserScreen"
//         component={UserScreen}
//         options={{ title: 'Users List' }}
//       />
//       <Stack.Screen
//         name="UserDetailScreen"
//         component={UserDetailScreen}
//         options={{ title: 'User Detail' }}
//       />
//     </Stack.Navigator>
//   );
// }
//
// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyStack />
//     </NavigationContainer>
//   );
// }
