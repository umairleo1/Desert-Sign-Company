import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';

import SecondaryHeader from '../../common/SecondaryHeader';
import {giveOrder} from '../../service/app.service';
import authStorage from '../../utils/authStorage';
import {emptyCart} from '../../store/reducers/cart';

export default function ConfirmOrder() {
  const isFocused = useIsFocused();
  const [consignmentName, setConsignmentName] = useState('');
  const [shippingAddress, setShippingAddres] = useState('');
  const [driverName, setDriverName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = useState();
  const [isFocus, setIsFoucus] = useState('');
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  // setData(cart);

  // console.log('cart,', cart.data);
  const {colors} = useTheme();
  const navigation = useNavigation();
  const order = async () => {
    const id = await authStorage.getUserid();
    if (consignmentName && shippingAddress) {
      try {
        let arr = [];
        // let obj = {};
        cart?.data?.map(item => {
          let obj = {};
          obj['product'] = item?._id;
          obj['quantity'] = item?.count;
          obj['price'] = item?.price;
          arr.push(obj);
          // console.log(item, 'tt');
        });
        // arr.push(obj);
        setLoading(true);

        const result = await giveOrder(
          'pending',
          consignmentName,
          shippingAddress,
          arr,
          id,
          'now',
        );

        if (result?.status == 200) {
          navigation.navigate('Summary', {
            orderId: result?.data?.orderId,
            price: result?.data?.total,
          });
          setLoading(false);
          dispatch(emptyCart());
          // console.log('true');
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    } else {
      showMessage({
        message: 'All fields must be filled',
        type: 'warning',
      });
    }
  };
  const totalPrice = () => {
    let price = 0;
    cart?.data?.map(item => {
      // console.log(item.count, 'total');
      price = price + item?.price * item?.count;
    });
    // console.log(price, 'total');
    return price;
  };
  useEffect(() => {
    totalPrice();
    // order();
  }, []);

  const handleonFocus = id => {
    switch (id) {
      case '1':
        // setEnableShift(false);
        setIsFoucus('1');

        break;
      case '2':
        // setEnableShift(false);
        setIsFoucus('2');
        break;
      case '3':
        // setEnableShift(false);
        setIsFoucus('3');
        break;
      case '4':
        // setEnableShift(true);
        setIsFoucus('4');
        break;

      default:
      // code block
    }
  };

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 15,
        flex: 1,
      }}>
      {isFocused && (
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      )}
      <SecondaryHeader title={'Confirm Order'} iconName={'arrowleft'} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            justifyContent: 'space-between',

            flex: 1,
          }}>
          <View style={{marginTop: 15}}>
            <View style={styles.testHolder}>
              <Text style={{fontSize: 16}}>Consignment Name</Text>
              <TextInput
                style={[isFocus == '1' ? styles.focusInput : styles.input]}
                onChangeText={text => setConsignmentName(text)}
                value={consignmentName}
                placeholder="Enter Consignment Name"
                onFocus={() => handleonFocus('1')}
                placeholderTextColor={'gray'}
                onBlur={() => setIsFoucus(false)}
              />
            </View>
            <View style={styles.testHolder}>
              <Text style={{fontSize: 16}}>Shipping Address</Text>
              <TextInput
                style={[isFocus == '2' ? styles.focusInput : styles.input]}
                onChangeText={text => setShippingAddres(text)}
                value={shippingAddress}
                placeholder="Enter Shipping Address"
                onFocus={() => handleonFocus('2')}
                placeholderTextColor={'gray'}
                autoCapitalize="none"
              />
            </View>
            {/* <View style={styles.testHolder}>
            <Text style={{fontSize: 16}}>Driver Name</Text>
            <TextInput
              style={[isFocus == '3' ? styles.focusInput : styles.input]}
              onChangeText={text => setDriverName(text)}
              value={driverName}
              placeholder="Enter Driver Name"
              onFocus={() => handleonFocus('3')}
              placeholderTextColor={'gray'}
              onBlur={() => setIsFoucus(false)}
            />
          </View>
          <View style={styles.testHolder}>
            <Text style={{fontSize: 16}}>Vehicle Number Plate</Text>
            <TextInput
              style={[isFocus == '4' ? styles.focusInput : styles.input]}
              onChangeText={text => setVehicleNumber(text)}
              value={vehicleNumber}
              placeholder="Enter Vehicle Number Plate"
              onFocus={() => handleonFocus('4')}
              placeholderTextColor={'gray'}
              autoCapitalize="none"
            />
          </View> */}
            {/* <View style={styles.priceContainer}>
          <Text style={{fontWeight: '600', fontSize: 15}}>Total Price</Text>
          <Text style={{fontSize: 20, fontWeight: '600'}}>$ 1440</Text>
        </View> */}
          </View>
          <View style={{marginBottom: 15}}>
            <View style={styles.priceContainer}>
              <Text style={{fontWeight: '600', fontSize: 15}}>Total Price</Text>
              <Text style={{fontSize: 20, fontWeight: '600'}}>
                $ {totalPrice()}
              </Text>
            </View>
            <View style={{zIndex: -1, width: '100%'}}>
              <Button
                disabled={loading}
                onPress={() => order()}
                labelStyle={{color: colors.background}}
                color={colors.button}
                style={styles.button}
                mode="contained">
                Confirm
              </Button>
            </View>
            {loading && (
              <ActivityIndicator
                animating={true}
                color={'white'}
                style={{position: 'absolute', top: 55, left: 100}}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  testHolder: {
    marginTop: 3,
  },
  focusInput: {
    borderColor: '#7EC043',
    height: 45,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    // marginTop: 20,
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
  input: {
    height: 45,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});
