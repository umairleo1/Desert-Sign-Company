import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';
import AnimatedLoader from 'react-native-animated-loader';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import RenderItem from './renderItem';
import mockData from '../../../mock/data.json';
import {getFeaturedProducts} from '../../service/app.service';

export default function Dispatch(props) {
  const isFocused = useIsFocused();
  const {colors} = useTheme();
  const {height, width} = useWindowDimensions();

  const [products, setProducts] = React.useState(props.consignment);
  const [refreshing, setRefreshing] = React.useState(false);
  const savedItem = useSelector(state => state.savedItem.data);
  const [activityIndicatore, setActivityIndicator] = React.useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      props.consignment.splice(0, props.consignment.length);
      props.readyConsignments.splice(0, props.readyConsignments.length);
      props.returnedConsignments.splice(0, props.returnedConsignments.length);
      props.setReload(!props.reLoad);
      setRefreshing(false);
    } catch (e) {
      setRefreshing(false);
      console.warn(e);
    }
  };

  const render = ({item}) => {
    return <RenderItem item={item} />;
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
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

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
      {activityIndicatore && (
        <View>
          <AnimatedLoader
            visible={activityIndicatore}
            overlayColor="rgba(255,255,255,0.55)"
            source={require('../../../assets/loader.json')}
            animationStyle={styles.lottie}
            speed={1}></AnimatedLoader>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  lottie: {
    height: 100,
    width: 100,
  },
});
