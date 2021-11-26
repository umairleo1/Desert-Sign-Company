import {useTheme, useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector, useDispatch, connect} from 'react-redux';

import Orders from '../../../assets/svgs/Orders';
import Check from '../../../assets/svgs/Check';

const renderItem = item => {
  const navigation = useNavigation();
  // console.log('consignment details ', item);
  const [checkBox, setCheckbox] = React.useState(false);
  return (
    // <TouchableOpacity>
    <View style={styles.card}>
      <View style={styles.logoView}>
        <View style={styles.circle}>
          <Orders />
        </View>
      </View>
      <View style={styles.contentView}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ConsignmentOrderDetails', {order: item.item})
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
            {item?.item.total}
          </Text>
          <Text
            style={{
              fontFamily: 'SourceSansPro-Regular',
              fontSize: 14,
              fontWeight: '600',
              color: '#0B0287',
            }}>
            {item?.item.time}
          </Text>
        </TouchableOpacity>
      </View>
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
    width: '80%',
    height: '100%',
    paddingLeft: 10,
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
});

export default renderItem;
