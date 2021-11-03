import React, {useEffect} from 'react';
import {StyleSheet, Text, View, BackHandler, ToastAndroid} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import SecondaryHeader from '../../common/SecondaryHeader';
import SummaryIcon from '../../../assets/svgs/Summary';
import {useTheme, useRoute} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import {StackActions, useNavigation} from '@react-navigation/native';

export default function Summary() {
  const route = useRoute();
  const navigation = useNavigation();
  // console.log(route.params.price, 'id');
  const orderId = route?.params?.orderId;
  const price = route?.params?.price;
  const {colors} = useTheme();
  function handleBackButton() {
    // ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);
  return (
    <SafeAreaView style={{paddingHorizontal: 15, flex: 1}}>
      <SecondaryHeader title={'Summary'} iconName={''} />
      <View
        style={{
          justifyContent: 'space-between',

          flex: 1,
        }}>
        <View style={{}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
              // backgroundColor: 'red',
              // height: 300,
            }}>
            <SummaryIcon />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{fontSize: 15, fontWeight: '600', textAlign: 'center'}}>
              Your Consignment against Order{orderId} has been booked
              succesfully.
            </Text>
          </View>
          <View style={{marginTop: 10}}>
            <View style={styles.itemContainer}>
              <Text>Shipping Address</Text>
              {/* <View> */}
              <Text style={{textAlign: 'center'}}>
                H#22, Main boulevard, Newyork
              </Text>
              {/* </View> */}
            </View>
            <View style={styles.itemContainer}>
              <Text>Tax</Text>
              <Text style={[styles.values, {color: colors.priceColor}]}>
                {' '}
                $ 20
              </Text>
            </View>
            <View style={styles.itemContainer}>
              <Text>Summary</Text>
              <Text style={[styles.values, {color: colors.priceColor}]}>
                {' '}
                $ 40
              </Text>
            </View>
            <View style={styles.itemContainer}>
              <Text>Total price</Text>
              <Text style={[{fontWeight: '600', fontSize: 16}]}>
                {' '}
                $ {price}
              </Text>
            </View>
          </View>
        </View>
        <View style={{marginBottom: 10}}>
          <Button
            onPress={() => navigation.dispatch(StackActions.popToTop())}
            mode="contained"
            labelStyle={{color: colors.background}}
            color={colors.button}
            style={styles.button}>
            Continue to home
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  values: {
    fontWeight: '400',
    fontSize: 15,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    // width: '100%',
  },
});
