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
import consignments from '../screens/consignments';
import Notifications from '../screens/consignments/Notifications';
import Search from '../screens/consignments/Search';
import ConsignmentDetails from '../screens/order/index';
import UpdateConsignment from '../screens/order/updateConsignment';
import Orders from '../screens/orders/index';
import orderDetails from '../screens/orders/orderDetails';
import Vehicles from '../screens/vehicles/index';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ordersStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Orders" component={Orders} />
    <Stack.Screen name="OrderDetails" component={orderDetails} />
    <Stack.Screen name="Notification" component={Notifications} />
    <Stack.Screen name="Search" component={Search} />
  </Stack.Navigator>
);

const consignmentStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Consignments" component={consignments} />
    <Stack.Screen name="ConsignmentDetails" component={ConsignmentDetails} />
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

const vehiclesStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Vehicles" component={Vehicles} />
    <Stack.Screen name="Notification" component={Notifications} />
    <Stack.Screen name="Search" component={Search} />
  </Stack.Navigator>
);

const Navigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={'ordersStack'}
      screenOptions={{headerShown: false}}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="ordersStack" component={ordersStack} />
      <Drawer.Screen name="consignmentStack" component={consignmentStack} />
      <Drawer.Screen name="profileStack" component={profileStack} />
      <Drawer.Screen name="vehiclesStack" component={vehiclesStack} />
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
