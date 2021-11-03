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
} from 'react-native';
import LottieView from 'lottie-react-native';
import AnimatedLoader from 'react-native-animated-loader';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import RenderItem from './renderItem';
import mockData from '../../../mock/data.json';
import {getFeaturedProducts} from '../../service/app.service';

export default function Product() {
  const [products, setProducts] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const savedItem = useSelector(state => state.savedItem.data);
  const [activityIndicatore, setActivityIndicator] = React.useState(false);
  const isFocused = useIsFocused();
  // setSavedItemsLength(savedItem.length);
  React.useEffect(async () => {
    setActivityIndicator(true);
    const data = await getFeaturedProducts();
    setProducts(data.data);
    // console.log('products');
    setActivityIndicator(false);
  }, [isFocused]);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const data = await getFeaturedProducts();
      setProducts(data.data);
      setRefreshing(false);
    } catch (e) {
      setRefreshing(false);
      console.warn(e);
    }
  };

  const {colors} = useTheme();
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
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.featureView}>
        <Text style={[{color: colors.primary}, styles.coreFeature]}>
          Core Features
        </Text>
        {/* <Text style={[styles.seeMore, {color: 'gray'}]}>see more</Text> */}
      </View>
      <View style={[styles.divider, {backgroundColor: colors.divider}]} />
      <View style={{marginTop: 10, flex: 1}}>
        <FlatList
          keyExtractor={item => item?._id}
          data={products}
          renderItem={render}
          ItemSeparatorComponent={itemSeperator}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      {activityIndicatore && (
        <View style={{}}>
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
  lottie: {
    height: 100,
    width: 100,
  },
});