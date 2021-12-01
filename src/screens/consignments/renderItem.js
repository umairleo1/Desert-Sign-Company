import {useTheme, useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector, useDispatch, connect} from 'react-redux';

import Clock from '../../../assets/svgs/Clock';
import moment from 'moment';

const renderItem = item => {
  const {colors} = useTheme();
  const [isSave, setIsSave] = React.useState(false);
  const [savedID, setSavedID] = React.useState();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ConsignmentDetails', {
          consignment: item.item,
          status: item.status,
          ready: item.ready,
          dispatched: item.dispatched,
          returned: item.returned,
          setReload: item.setReload,
          reLoad: item.reLoad,
        })
      }>
      <View style={styles.card}>
        <View style={styles.logoView}>
          <View style={styles.circle}>
            <Clock />
          </View>
        </View>
        <View style={styles.contentView}>
          <Text
            style={{
              fontFamily: 'SourceSansPro-Regular',
              fontSize: 15,
              fontWeight: '600',
              color: '#060F2F',
              paddingVertical: 5,
            }}>
            #{item?.item.consignmentNo}
          </Text>
          <Text
            style={{
              fontFamily: 'SourceSansPro-Regular',
              fontSize: 14,
              fontWeight: '400',
              color: '#6B7280',
              paddingBottom: 5,
            }}>
            {/* {item?.item.driverName} */}
            Driver Name: Amir
          </Text>
          <Text
            style={{
              fontFamily: 'SourceSansPro-Regular',
              fontSize: 14,
              fontWeight: '600',
              color: '#0B0287',
            }}>
            Vehicle: {item?.item?.vehicle?.registrationNumber}
          </Text>
          <Text
            style={{
              fontFamily: 'SourceSansPro-Regular',
              fontSize: 14,
              fontWeight: '600',
              color: '#0B0287',
            }}>
            {moment(item?.item.createdAt).format('DD/MM/YYYY')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    // height: 100,
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
