import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, Text, View, Alert} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AuthNavigator from './src/navigation/AuthNavigator';
import AuthContext from './src/utils/authContext';
import {useNavigation, useTheme} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import authStorage from './src/utils/authStorage';
import {Button} from 'react-native-paper';
import {getUser} from './src/service/app.service';
import configureStore from './src/store/configureStore';
// import Appnavigator from './src/navigation/AppNavigator';

export default function App() {
  const [user, setUser] = React.useState();
  const [isVerified, setIsverified] = React.useState();
  const [userid, setUserID] = React.useState();
  const [profile, setProfile] = React.useState();
  const {store, persistor} = configureStore();
  const [fcmNotification, setFcmNotification] = React.useState();
  const [ordersConsignments, setOrdersConsignments] = React.useState([]);
  const [check, setCheck] = React.useState(0);
  const [updateOrder, setUpdateOrder] = React.useState([]);

  const centralized = {
    user,
    setUser,
    userid,
    setUserID,
    isVerified,
    setIsverified,
    profile,
    setProfile,
    ordersConsignments,
    setOrdersConsignments,
    check,
    setCheck,
    updateOrder,
  };

  //configure push notification

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);

      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);

      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });
  //here ends

  const storeProfile = async () => {
    const id = await authStorage.getUserid();

    try {
      const data = await getUser(id);

      setProfile(data.data);
      // console.log(data, 'userData in App.js');
    } catch (e) {
      console.log(e);
    }
  };

  const signout = () => {
    authStorage.removeValue();
    setUser('');
    setUserID('');
    setIsverified('false');
  };
  const restoreUser = async () => {
    const userToken = await authStorage.getToken();

    const verified = await authStorage.getIsVerified();
    const id = await authStorage.getUserid();
    setUserID(id);
    setIsverified(verified);
    if (userToken) setUser(userToken);
  };

  useEffect(() => {
    SplashScreen.hide();

    PushNotification.createChannel(
      {
        channelId: 'channel-id', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );

    setUser();

    restoreUser();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const title = remoteMessage.notification?.title;
      // const channelId = message?.NOTIFICATION?.channelId;
      const msg = remoteMessage.notification?.body;
      console.log(remoteMessage, 'here is notofication');
      PushNotification.localNotification({
        channelId: 'channel-id',
        foreground: false,
        userInteraction: true,
        autoCancel: true,
        // bigText: 'notification.data.body',
        title: title,
        message: msg,
        // subText: 'notification.data.body',
        // actions: '["Yes", "No"]',
      });
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
    // storeProfile();
  }, []);
  const {colors} = useTheme();
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <AuthContext.Provider value={centralized}>
        <Provider store={store}>
          {user && isVerified == 'true' ? <AppNavigator /> : <AuthNavigator />}
        </Provider>
      </AuthContext.Provider>

      <FlashMessage position="top" />
    </>
  );
}

const styles = StyleSheet.create({});
