import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import SecondaryHeader from '../../common/SecondaryHeader';
import {useTheme, useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import RenderItem from './renderItem';

export default function categoryProduct() {
  const colors = useTheme();
  const route = useRoute();
  const {height, width} = useWindowDimensions();
  const [refreshing, setRefreshing] = React.useState(false);
  // console.log('fuck ', route.params.data);
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
  const render = ({item}) => {
    return <RenderItem item={item} />;
  };

  return (
    <SafeAreaView style={{marginHorizontal: 15, flex: 1}}>
      <SecondaryHeader title={route.params.data.name} />

      <View style={[styles.divider, {backgroundColor: colors.divider}]} />
      <View style={{marginTop: 20, flex: 1}}>
        <FlatList
          ItemSeparatorComponent={itemSeperator}
          data={[route.params.data.product]}
          renderItem={render}
          ItemSeparatorComponent={itemSeperator}
          // ListEmptyComponent={EmptyListMessage}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  notificationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  Icon: {
    fontSize: 30,
  },
  divider: {
    height: 2,
    marginTop: 10,
  },
  notifivationTet: {
    fontSize: 14,
    fontWeight: '400',
  },
});
