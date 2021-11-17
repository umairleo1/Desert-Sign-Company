import {themeLight} from '../config/theme';
import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
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

      <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.55)"
        source={require('../../assets/loader.json')}
        animationStyle={styles.lottie}
        speed={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overLay: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    // height: '100%',
    // width: '100%',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  lottie: {
    height: 100,
    width: 100,
  },
});
