import {themeLight} from '../config/theme';
import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

export default function ActivityIndicator({visible = false}) {
  const {colors} = useTheme();
  if (!visible) return null;
  return (
    <View style={styles.overLay}>
      <DotIndicator color={colors.secondary} size={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  overLay: {
    position: 'absolute',
    backgroundColor: '#ffffff70',
    // backgroundColor: 'red',
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  lottie: {
    height: 100,
    width: 100,
  },
});
