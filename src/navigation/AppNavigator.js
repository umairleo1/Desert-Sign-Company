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

import Order from '../screens/order/index';
import UpdateConsignment from '../screens/order/updateConsignment';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
    </View>
  );
}

const consignmentStack = () => (
  <Stack.Navigator
    // initialRouteName="ProfitHero"
    screenOptions={{
      headerShown: false,
      // detachPreviousScreen: false,
    }}>
    <Stack.Screen name="ConsignmentDetails" component={Order} />
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
      // options={{unmountOnBlur: true}}
    />
    <Stack.Screen name="ConsignmentDetails" component={Order} />
    <Stack.Screen name="UpdateConsignment" component={UpdateConsignment} />
    <Stack.Screen name="Notification" component={Notifications} />
    <Stack.Screen name="Search" component={Search} />

    {/* <Stack.Screen name="Description" component={Description} />
    <Stack.Screen name="ShippingCart" component={ShippingCart} />
    <Stack.Screen name="ConfirmOredr" component={ConfirmOrder} />
    <Stack.Screen
      name="Summary"
      component={Summary}
      options={{gestureEnabled: false}}
    />
    <Stack.Screen name="DetailedImage" component={DetailedImage} /> */}
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
      {/* <Drawer.Screen name="savedStack" component={savedStack} />
      <Drawer.Screen name="consignmentStack" component={consignmentStack} /> */}
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
