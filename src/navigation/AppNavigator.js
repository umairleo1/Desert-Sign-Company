import 'react-native-gesture-handler';
import * as React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {themeLight} from '../../config/theme';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './DrawerContent';

import Profile from '../screens/profile';
import UpdatePassword from '../screens/profile/UpdatePassword';

import Home from '../screens/Home';
import Description from '../screens/Home/Description';
import ShippingCart from '../screens/Home/ShippingCart';
import ConfirmOrder from '../screens/Home/ConfirmOrder';
import Summary from '../screens/Home/Summary';
import Notifications from '../screens/Home/Notifications';
import Search from '../screens/Home/Search';
import DetailedImage from '../screens/Home/DetailedImage';

import Saved from '../screens/savedItem/';

import Order from '../screens/order';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
    </View>
  );
}

// const drawerNavigator = () => (
//   <Drawer.Navigator initialRouteName="Home">
//     <Drawer.Screen name="Home" component={HomeScreen} />
//     <Drawer.Screen name="Settings" component={Settings} />
//   </Drawer.Navigator>
// );

// const orderStack = () => (
//   <Stack.Navigator
//     screenOptions={{
//       headerShown: false,
//       detachPreviousScreen: false,
//     }}>
//     {/* <Stack.Screen name="Settings" component={Settings} /> */}
//     <Stack.Screen name="Orders" component={Order} />
//     <Stack.Screen name="OrderDetails" component={OrderDetails} />
//   </Stack.Navigator>
// );

const orderStack = () => (
  <Stack.Navigator
    // initialRouteName="ProfitHero"
    screenOptions={{
      headerShown: false,
      // detachPreviousScreen: false,
    }}>
    <Stack.Screen name="Order" component={Order} />
  </Stack.Navigator>
);

const profileStack = () => (
  <Stack.Navigator
    // initialRouteName="ProfitHero"
    screenOptions={{
      headerShown: false,
      // detachPreviousScreen: false,
    }}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
  </Stack.Navigator>
);
const savedStack = () => (
  <Stack.Navigator
    // initialRouteName="ProfitHero"
    screenOptions={{
      headerShown: false,
      // detachPreviousScreen: false,
    }}>
    <Stack.Screen name="Saved" component={Saved} />
    <Stack.Screen name="Description" component={Description} />
    {/* <Stack.Screen name="UpdatePassword" component={UpdatePassword} /> */}
  </Stack.Navigator>
);
const homeStack = () => (
  <Stack.Navigator
    // initialRouteName="ProfitHero"
    screenOptions={{
      headerShown: false,
      // detachPreviousScreen: false,
    }}>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{unmountOnBlur: true}}
    />
    <Stack.Screen name="Description" component={Description} />
    <Stack.Screen name="ShippingCart" component={ShippingCart} />
    <Stack.Screen name="ConfirmOredr" component={ConfirmOrder} />
    <Stack.Screen
      name="Summary"
      component={Summary}
      options={{gestureEnabled: false}}
    />
    <Stack.Screen name="Notification" component={Notifications} />
    <Stack.Screen name="Search" component={Search} />
    <Stack.Screen name="DetailedImage" component={DetailedImage} />
  </Stack.Navigator>
);
const Navigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={'homeStack'}
      screenOptions={{headerShown: false}}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="homeStack" component={homeStack} />
      <Drawer.Screen name="profileStack" component={profileStack} />
      <Drawer.Screen name="savedStack" component={savedStack} />
      <Drawer.Screen name="orderStack" component={orderStack} />
    </Drawer.Navigator>
  );
};

export default function Appnavigator() {
  return (
    <NavigationContainer theme={themeLight}>
      <Navigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

// import {createStackNavigator} from '@react-navigation/stack';
// import React from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import {
//   NavigationContainer,
//   useNavigation,
//   useTheme,
// } from '@react-navigation/native';
// import {themeLight} from '../../config/theme';

// import Profile from '../screens/profile';
// import UpdatePassword from '../screens/profile/UpdatePassword';
// import DrawerContent from './DrawerContent';

// const Stack = createStackNavigator();
// const profileStack = () => (
//   <Stack.Navigator
//     screenOptions={{
//       // headerStyle: {backgroundColor: 'tomato'},
//       // headerTintColor: 'white',
//       headerShown: false,
//       // detachPreviousScreen: false,
//     }}>
//     <Stack.Screen name="Profile" component={Profile} />
//     <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
//   </Stack.Navigator>
// );
// const StackNavigator = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         // headerStyle: {backgroundColor: 'tomato'},
//         // headerTintColor: 'white',
//         headerShown: false,
//         // detachPreviousScreen: false,
//       }}>
//       <Stack.Screen name="profileStack" component={profileStack} />
//     </Stack.Navigator>
//   );
// };

// export default function AuthNavigator() {
//   return (
//     <NavigationContainer theme={themeLight}>
//       <StackNavigator />
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({});

// import * as React from 'react';
// import {Button, View} from 'react-native';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {NavigationContainer} from '@react-navigation/native';

// function HomeScreen({navigation}) {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Button
//         onPress={() => navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     </View>
//   );
// }

// function NotificationsScreen({navigation}) {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }

// const Drawer = createDrawerNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="Home" component={HomeScreen} />
//         <Drawer.Screen name="Notifications" component={NotificationsScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }
