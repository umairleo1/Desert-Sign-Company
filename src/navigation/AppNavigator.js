import 'react-native-gesture-handler';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import {themeLight} from '../../config/theme';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './DrawerContent';

import Profile from '../screens/profile';
import UpdatePassword from '../screens/profile/UpdatePassword';

import Home from '../screens/Home';
import Notifications from '../screens/Home/Notifications';
import Search from '../screens/Home/Search';

import Order from '../screens/order/index';
import UpdateConsignment from '../screens/order/updateConsignment';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const homeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="ConsignmentDetails" component={Order} />
    <Stack.Screen name="UpdateConsignment" component={UpdateConsignment} />
    <Stack.Screen name="Notification" component={Notifications} />
    <Stack.Screen name="Search" component={Search} />
  </Stack.Navigator>
);

const consignmentStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="ConsignmentDetails" component={Order} />
    <Stack.Screen name="UpdateConsignment" component={UpdateConsignment} />
    <Stack.Screen name="Notification" component={Notifications} />
    <Stack.Screen name="Search" component={Search} />
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

const Navigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={'homeStack'}
      screenOptions={{headerShown: false}}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="homeStack" component={homeStack} />
      <Drawer.Screen name="consignmentStack" component={consignmentStack} />
      <Drawer.Screen name="profileStack" component={profileStack} />
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
