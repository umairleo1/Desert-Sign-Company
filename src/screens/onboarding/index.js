import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, Text, View, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from 'react-native-paper';
import PushNotification, {Importance} from 'react-native-push-notification';
import LottieView from 'lottie-react-native';

import AppIcon from '../../../assets/svgs/AppIcon';
import Delivery from '../../../assets/svgs/Delivery';

export default function index() {
  const {colors} = useTheme();
  const navigation = useNavigation();
  React.useEffect(() => {
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
  const ExampleSend = () => {
    PushNotification.localNotification({
      channelId: 'channel-id',
      foreground: false,
      userInteraction: true,
      autoCancel: true,
      // bigText: 'notification.data.body',
      title: 'Desert Sign',
      message: 'hello Jummah Mubarak',
      // subText: 'notification.data.body',
      // actions: '["Yes", "No"]',
    });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
      }}>
      {/* <ScrollView> */}
      <View style={{paddingVertical: 10}}>
        <AppIcon />
      </View>
      {/* <View
        style={{
          marginTop: 10,
          alignItems: 'center',
        }}> */}
      {/* <Delivery /> */}
      <View
        style={{
          height: 300,
        }}>
        <LottieView
          source={require('../../../assets/10526-forklift.json')}
          autoPlay
          loop
        />
      </View>
      {/* </View> */}
      <View style={{marginTop: 10}}>
        <Text style={[styles.heading, {color: colors.secondary}]}>
          Welcome to
        </Text>
        <Text style={[styles.heading, {color: colors.secondary}]}>
          Desert sign
        </Text>
      </View>
      <View style={{width: '70%', marginTop: 5}}>
        <Text style={[styles.description, {color: '#000000'}]}>
          Improve your productivity and save more time by on boarding all
          consignments
        </Text>
      </View>
      <Button
        color={colors.button}
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
        labelStyle={{color: colors.background}}
        mode="contained">
        Sign in
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 32,
    fontWeight: '700',
  },
  description: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'justify',
  },
  button: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,

    elevation: 0,
    marginTop: 40,
    padding: 10,
    borderRadius: 10,
  },
  lottie: {
    height: 100,
    width: 100,
  },
});
