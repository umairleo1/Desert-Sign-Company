import {useTheme} from '@react-navigation/native';
import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import RenderItem from './renderItem';
import mockData from '../../../mock/data.json';

export default function Services() {
  const {colors} = useTheme();
  const render = ({item}) => {
    return <RenderItem item={item} />;
  };
  const itemSeperator = () => {
    return (
      <View
        style={[
          // styles.divider,
          {backgroundColor: colors.divider, marginVertical: 10, height: 1},
        ]}
      />
    );
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.featureView}>
        <Text style={[{color: colors.primary}, styles.coreFeature]}>
          Core Features
        </Text>
        {/* <Text style={[styles.seeMore, {color: 'gray'}]}>see more</Text> */}
      </View>
      <View style={[styles.divider, {backgroundColor: colors.divider}]} />
      <View style={{marginTop: 10, flex: 1}}>
        {/* <ScrollView> */}
        {/* <FlatList
          data={mockData.data}
          renderItem={render}
          ItemSeparatorComponent={itemSeperator}
        /> */}
        {/* <View style={{height: 20}} /> */}
        {/* </ScrollView> */}
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
