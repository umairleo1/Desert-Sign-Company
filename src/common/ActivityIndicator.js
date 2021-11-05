import {themeLight} from '../config/theme';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {
//   BallIndicator,
//   BarIndicator,
//   DotIndicator,
//   MaterialIndicator,
//   PacmanIndicator,
//   PulseIndicator,
//   SkypeIndicator,
//   UIActivityIndicator,
//   WaveIndicator,
// } from 'react-native-indicators';

export default function ActivityIndicator({visible = false}) {
  // const {colors} = useTheme();
  if (!visible) return null;
  return (
    <View style={styles.overLay}>
      {/* <DotIndicator color={themeLight.colors.primary} size={30} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  overLay: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    height: '100%',
    width: '100%',
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
