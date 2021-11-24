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
import {useIsFocused} from '@react-navigation/native';
import RenderItem from './renderItem';
import LottieView from 'lottie-react-native';

export default function InProgress(props) {
  const {colors} = useTheme();
  const isFocused = useIsFocused();
  const {height, width} = useWindowDimensions();

  const [products, setProducts] = React.useState(props.orders);
  const [refreshing, setRefreshing] = React.useState(false);
  const render = ({item}) => {
    return <RenderItem item={item} />;
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      props.orders.splice(0, props.orders.length);
      props.placedOrders.splice(0, props.placedOrders.length);
      props.dispatchedOrders.splice(0, props.dispatchedOrders.length);
      props.deliveredOrders.splice(0, props.deliveredOrders.length);
      props.vehicles.splice(0, props.vehicles.length);
      props.setReload(!props.reLoad);
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
  return (
    <View style={{flex: 1}}>
      {/* <View style={[styles.divider, {backgroundColor: colors.divider}]} /> */}
      <View style={{marginTop: 10, flex: 1}}>
        {/* <ScrollView>*/}
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
