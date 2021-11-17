import {useTheme, useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector, useDispatch, connect} from 'react-redux';
import AuthContext from '../../utils/authContext';

import Orders from '../../../assets/svgs/Orders';
import Check from '../../../assets/svgs/Check';

const renderItem = item => {
  const navigation = useNavigation();
  const authContext = React.useContext(AuthContext);

  const [checkBox, setCheckbox] = React.useState(false);

  const handleCheckBox = () => {
    if (checkBox) {
      setCheckbox(!checkBox);
      authContext.ordersConsignments.length != 0 &&
        // authContext.ordersConsignments.pop(item.item),
        authContext.ordersConsignments.splice(
          authContext.ordersConsignments.indexOf(item.item),
          1,
        ),
        authContext.setCheck(authContext.check - 1);
    } else {
      setCheckbox(!checkBox);
      authContext.ordersConsignments.push(item.item);
      authContext.setCheck(authContext.check + 1);
    }
  };
  return (
    // <TouchableOpacity>
    <View style={styles.card}>
      <View style={styles.logoView}>
        <View style={styles.circle}>
          <Orders />
        </View>
      </View>
      <View style={[styles.contentView, {width: item.type ? '70%' : '100%'}]}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('OrderDetails', {order: item.item})
          }>
          <Text
            style={{
              fontFamily: 'SourceSansPro-Regular',
              fontSize: 15,
              fontWeight: '600',
              color: '#060F2F',
              paddingVertical: 5,
            }}>
            {item?.item.orderId}
          </Text>
          <Text
            style={{
              fontFamily: 'SourceSansPro-Regular',
              fontSize: 14,
              fontWeight: '400',
              color: '#6B7280',
              paddingBottom: 5,
            }}>
            AED {item?.item.total}
          </Text>
          <Text
            style={{
              fontFamily: 'SourceSansPro-Regular',
              fontSize: 14,
              fontWeight: '600',
              color: '#0B0287',
            }}>
            {/* {item?.item.date} */}
            25 NOV 2021
          </Text>
        </TouchableOpacity>
      </View>
      {item.type && (
        <View style={styles.checkBoxView}>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'center',
            }}
            onPress={() => handleCheckBox()}>
            <View
              style={[
                styles.checkBox,
                {
                  backgroundColor: checkBox ? '#1FA1DA' : '#fff',
                  borderColor: checkBox ? '#fff' : '#3D3D3D90',
                },
              ]}>
              {checkBox && <Check />}
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>

    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 5,
    // backgroundColor: 'red',
  },
  logoView: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    paddingVertical: 5,
  },
  contentView: {
    height: '100%',
    paddingLeft: 10,
    // backgroundColor: 'red',
  },
  circle: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: '#1FA1DA',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3D3D3D',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  checkBoxView: {
    height: '100%',
    width: '10%',
    // backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBox: {
    height: 15,
    width: 15,
    borderWidth: 0.5,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default renderItem;
