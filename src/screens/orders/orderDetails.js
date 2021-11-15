import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useTheme, useRoute} from '@react-navigation/native';

import SecondaryHeader from '../../common/SecondaryHeader';

export default function orderDetails() {
  const isFocused = useIsFocused();
  const {colors} = useTheme();
  const route = useRoute();
  return (
    <SafeAreaView style={{paddingHorizontal: 15, flex: 1}}>
      {isFocused && (
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      )}
      <View style={{paddingVertical: 10}}>
        <SecondaryHeader
          title="Order Details"
          orderNo={route.params.order.orderNo}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 2,
    marginTop: 5,
  },
});
