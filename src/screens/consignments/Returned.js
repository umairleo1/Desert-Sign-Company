import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import RenderItem from './renderItem';
import mockData from '../../../mock/data.json';
import LottieView from 'lottie-react-native';

export default function Returned(props) {
  const {colors} = useTheme();
  const {height, width} = useWindowDimensions();

  const [products, setProducts] = React.useState(props.consignment);
  const [refreshing, setRefreshing] = React.useState(false);
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
  const EmptyListMessage = () => {
    return (
      <View
        style={{
          height: height - 300,
        }}>
        <LottieView
          source={require('../../../assets/empty.json')}
          autoPlay
          loop
        />
      </View>
    );
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      props.consignment.splice(0, props.consignment.length);
      props.readyConsignments.splice(0, props.readyConsignments.length);
      props.dispatchedConsignments.splice(
        0,
        props.dispatchedConsignments.length,
      );
      props.setReload(!props.reLoad);
      setRefreshing(false);
    } catch (e) {
      setRefreshing(false);
      console.warn(e);
    }
  };
  return (
    <View style={{flex: 1}}>
      {/* <View style={[styles.divider, {backgroundColor: colors.divider}]} /> */}
      <View style={{marginTop: 10, flex: 1}}>
        <FlatList
          keyExtractor={item => item?._id}
          data={products}
          renderItem={render}
          ItemSeparatorComponent={itemSeperator}
          ListEmptyComponent={EmptyListMessage}
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
