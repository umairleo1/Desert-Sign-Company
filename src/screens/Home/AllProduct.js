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

export default function FeaturedProduct() {
  const {colors} = useTheme();
  const isFocused = useIsFocused();
  const [products, setProducts] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const render = ({item}) => {
    return <RenderItem item={item} />;
  };
  React.useEffect(async () => {
    // setActivityIndicator(true);
    const data = await getProducts();
    setProducts(data.data);
    // console.log('products');
    // setActivityIndicator(false);
  }, [isFocused]);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const data = await getProducts();

      setProducts(data.data);
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
        {/* <ScrollView>*/}
        <FlatList
          data={products}
          renderItem={render}
          ItemSeparatorComponent={itemSeperator}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
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
