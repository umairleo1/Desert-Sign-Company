import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
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
import {TouchableHighlight} from 'react-native-gesture-handler';
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
  const [marked, setMarked] = React.useState(false);
  const [fcmToken, setFcmToken] = React.useState('');

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
    marked,
    setMarked,
    fcmToken,
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
    setUser();
    restoreUser();
    // notification();
    // checkPermission();
    // storeProfile();
    requestUserPermission();
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
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
          console.log('TOKEN:', token);
          // setDeviceType(capitalizeFirstLetter(token?.os));
          // console.log(deviceType);
          setFcmToken(token?.token);
        },

        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
          console.log('NOTIFICATION:', notification);

          PushNotification.localNotification({
            channelId: 'channel-id',
            foreground: false,
            userInteraction: true,
            autoCancel: true,
            // bigText: 'notification.data.body',
            title: notification.title,
            message: notification.message,
            // subText: 'notification.data.body',
            // actions: '["Yes", "No"]',
          });
          // (required) Called when a remote is received or opened, or local notification is opened
          notification.finish(PushNotificationIOS.FetchResult.NoData);
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
          // console.log('ACTION:', notification.action);
          // console.log('NOTIFICATION:', notification);
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
    }
  }

  // const notification = () => {
  //   PushNotification.configure({
  //     onNotification: function (notification) {
  //       console.log('NOTIFICATION:', notification);
  //       {
  //         Platform.OS === 'android' &&
  //           PushNotification.localNotification({
  //             channelId: 'channel-id',
  //             foreground: true,
  //             userInteraction: false,
  //             autoCancel: true,
  //             // title: notification.data.title,
  //             // message: notification.data.body,
  //             title: notification.title,
  //             message: notification.message,
  //           });
  //       }
  //       // (required) Called when a remote is received or opened, or local notification is opened
  //       notification.finish(PushNotificationIOS.FetchResult.NoData);
  //     },

  //     onAction: function (notification) {
  //       console.log('ACTION:', notification.action);
  //       console.log('NOTIFICATION:', notification);
  //     },

  //     onRegistrationError: function (err) {
  //       console.error(err.message, err);
  //     },

  //     permissions: {
  //       alert: true,
  //       badge: true,
  //       sound: true,
  //     },

  //     popInitialNotification: true,
  //     requestPermissions: true,
  //   });
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   });
  // };

  // const checkPermission = async () => {
  //   const enable = await messaging().requestPermission();
  //   if (enable) {
  //     getToken();
  //   } else {
  //     requestPermission();
  //   }
  // };

  // const getToken = async () => {
  //   let storageFcmToken = await authStorage.getFcmToken();
  //   if (!storageFcmToken) {
  //     const fcmToken = await messaging().getToken();
  //     await authStorage.storeFcmToken(fcmToken);
  //     setFcmToken(fcmToken);
  //     console.log('Check Device FCM Token ', fcmToken);
  //   } else {
  //     setFcmToken(storageFcmToken);
  //     console.log('Stored Device fcm token', storageFcmToken);
  //   }
  // };
  // const requestPermission = async () => {
  //   try {
  //     if (Platform.OS === 'ios') {
  //       await messaging().registerDeviceForRemoteMessages();
  //     }
  //     await messaging().requestPermission();
  //     //user has permission
  //     getToken();
  //   } catch (error) {
  //     //user has rejected permission
  //     console.log('Request permission rejected ', error);
  //   }
  // };

  // PushNotification.createChannel(
  //   {
  //     channelId: 'channel-id',
  //     channelName: 'My channel',
  //     channelDescription: 'A channel to categorise your notifications',
  //     playSound: true,
  //     soundName: 'default',
  //     importance: 4,
  //     vibrate: true,
  //     vibration: 300,
  //     playSound: true,
  //   },
  //   created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  // );

  const ExampleSend = () => {
    PushNotification.localNotification({
      channelId: 'channel-id',
      foreground: false,
      userInteraction: true,
      autoCancel: true,
      // bigText: 'notification.data.body',
      title: 'Desert Sign',
      message: 'hello welcome to jamanji',
      // subText: 'notification.data.body',
      // actions: '["Yes", "No"]',
    });
    // PushNotificationIOS.addNotificationRequest({
    //   id: 'channel-id',
    //   title: 'Notification',
    // });
  };
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <TouchableOpacity onPress={() => ExampleSend()}>
        <View style={{height: 80, backgroundColor: 'red'}}>
          <Text>notification</Text>
        </View>
      </TouchableOpacity>
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
