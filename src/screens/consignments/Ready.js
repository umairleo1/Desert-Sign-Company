import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import RenderItem from './renderItem';
import mockData from '../../../mock/data.json';
import {getProducts} from '../../service/app.service';

export default function Ready() {
  const {colors} = useTheme();
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);
  const [consignments, setConsignments] = React.useState([
    {
      id: 1,
      consignmentNo: 'ED123553DD4335',
      driverName: 'Amir',
      shippingStatus: 'Ready',
    },
    {
      id: 2,
      consignmentNo: 'ABC423444V4445',
      driverName: 'Adnan',
      shippingStatus: 'Ready',
    },
    {
      id: 3,
      consignmentNo: 'VBD335VV665556',
      driverName: 'Talha',
      shippingStatus: 'Ready',
    },
    {
      id: 4,
      consignmentNo: 'ASOH676BB55555',
      driverName: 'Ahmed',
      shippingStatus: 'Ready',
    },
  ]);

  const render = ({item}) => {
    return <RenderItem item={item} />;
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      setRefreshing(false);
    } catch (e) {
      setRefreshing(false);
      console.warn(e);
    }
  };

  const itemSeperator = () => {
    return (
      <View
        style={[
          {backgroundColor: colors.divider, marginVertical: 10, height: 1},
        ]}
      />
    );
  };
  return (
    <View style={{flex: 1}}>
      <View style={[styles.divider, {backgroundColor: colors.divider}]} />
      <View style={{marginTop: 10, flex: 1}}>
        <FlatList
          keyExtractor={item => item?.id}
          data={consignments}
          renderItem={render}
          ItemSeparatorComponent={itemSeperator}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  featureView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  coreFeature: {
    fontSize: 16,
    fontWeight: '600',
  },
  seeMore: {
    fontSize: 14,
    fontWeight: '400',
  },
  divider: {
    height: 2,
    marginTop: 5,
  },
});
