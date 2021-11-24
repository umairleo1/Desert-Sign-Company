import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Check from '../../../assets/svgs/Check';

import Vehicle from '../../../assets/svgs/Vehicle';

const VehiclesRadio = ({item, setSelectedVehicle, selectedVehicle}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedVehicle(item);
      }}>
      <View style={styles.card}>
        <View style={styles.logoView}>
          <View style={styles.circle}>
            <Vehicle />
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
            Reg No. {item.registrationNumber}
          </Text>
          <Text
            style={{
              fontFamily: 'SourceSansPro-Regular',
              fontSize: 14,
              fontWeight: '400',
              color: '#6B7280',
              paddingBottom: 5,
            }}>
            {item.make}
          </Text>
          <Text
            style={{
              fontFamily: 'SourceSansPro-Regular',
              fontSize: 14,
              fontWeight: '600',
              color: '#0B0287',
            }}>
            Available
          </Text>
        </View>
        <View style={styles.checkView}>
          {selectedVehicle._id === item._id && (
            <Check color={'#7EC043'} width={18} height={18} />
          )}
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
    width: '60%',
    height: '100%',
    paddingLeft: 10,
  },
  checkView: {
    width: '20%',
    // height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingLeft: 10,
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
});

export default VehiclesRadio;
