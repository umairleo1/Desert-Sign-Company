// import {createNativeStackNavigator} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {themeLight} from '../../config/theme';

import Login from '../screens/login';
import Onboarding from '../screens/onboarding';
import SignUp from '../screens/signUp';
import ForgotPass from '../screens/login/Forgotpass';
import Createpass from '../screens/login/Createpassword';
import Otp from '../screens/login/Otp';
import ForgotOtp from '../screens/login/ResendOtp';
const Stack = createStackNavigator();
const authenticationStack = () => (
  <Stack.Navigator
    initialRouteName="Onboarding"
    screenOptions={{
      // headerStyle: {backgroundColor: 'tomato'},
      // headerTintColor: 'white',
      headerShown: false,
      // detachPreviousScreen: false,
    }}>
    <Stack.Screen name="Onboarding" component={Onboarding} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="ForgotPass" component={ForgotPass} />
    <Stack.Screen name="Createpass" component={Createpass} />
    <Stack.Screen name="Otp" component={Otp} />
    <Stack.Screen name="ForgotOtp" component={ForgotOtp} />
  </Stack.Navigator>
);
const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: {backgroundColor: 'tomato'},
        // headerTintColor: 'white',
        headerShown: false,
        // detachPreviousScreen: false,
      }}>
      <Stack.Screen
        name="authenticationStack"
        component={authenticationStack}
      />
    </Stack.Navigator>
  );
};

export default function AuthNavigator() {
  return (
    <NavigationContainer theme={themeLight}>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
