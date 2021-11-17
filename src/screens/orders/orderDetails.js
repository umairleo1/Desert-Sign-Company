import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  RefreshControl,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useTheme, useRoute} from '@react-navigation/native';

import SecondaryHeader from '../../common/SecondaryHeader';
import RenderOrderDetails from './orderDetailsCard';

export default function orderDetails() {
  const isFocused = useIsFocused();
  const {colors} = useTheme();
  const route = useRoute();

  const [refreshing, setRefreshing] = React.useState(false);
  const [orders, setOrders] = React.useState([
    {
      id: 1,
      name: 'QN85A Neo QLED 4K Smart TV',
      description: 'Evolution of Neo QLED comes with Quantum Matrix Technology',
      price: '5,413',
    },
    {
      id: 2,
      name: 'LG G1 65 inch 4K Smart OLED TV ',
      description:
        'The next-generation OLED panel, combined with the computational power of the Alpha 9 Gen 4 processor',
      price: '2,399',
    },
  ]);

  const render = ({item}) => {
    return <RenderOrderDetails item={item} />;
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      // const data = await getProducts();

      // setProducts(data.data);
      setRefreshing(false);
    } catch (e) {
      setRefreshing(false);
      console.warn(e);
    }
  };
  const listFooterComponrnt = () => (
    <>
      <View
        style={[
          styles.divider,
          {backgroundColor: colors.divider, marginBottom: 10},
        ]}
      />
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <View style={{width: '50%', justifyContent: 'center'}}>
          <Text style={styles.formLeftText}>Company Name</Text>
        </View>
        <View style={{width: '50%', flexDirection: 'row-reverse'}}>
          <Text style={styles.formRightText}>Al Jalil Developers</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <View style={{width: '50%', justifyContent: 'center'}}>
          <Text style={styles.formLeftText}>Shipping Address</Text>
        </View>
        <View style={{width: '50%', flexDirection: 'row-reverse'}}>
          <Text style={styles.formRightText}>
            H#22, Main boulevard, Newyork
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <View style={{width: '50%', justifyContent: 'center'}}>
          <Text style={styles.formLeftText}>Tax</Text>
        </View>
        <View style={{width: '50%', flexDirection: 'row-reverse'}}>
          <Text style={styles.formRightText}>AED 20</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <View style={{width: '50%', justifyContent: 'center'}}>
          <Text style={styles.formLeftText}>Summary</Text>
        </View>
        <View style={{width: '50%', flexDirection: 'row-reverse'}}>
          <Text style={styles.formRightText}>AED 40</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <View style={{width: '50%', justifyContent: 'center'}}>
          <Text style={styles.formLeftText}>Total Price</Text>
        </View>
        <View style={{width: '50%', flexDirection: 'row-reverse'}}>
          <Text
            style={[styles.formRightText, {fontSize: 16, fontWeight: '600'}]}>
            AED 1440
          </Text>
        </View>
      </View>
    </>
  );

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
    <SafeAreaView style={{paddingHorizontal: 15, flex: 1}}>
      {isFocused && (
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      )}
      <View style={{paddingVertical: 10, flex: 1}}>
        <SecondaryHeader
          title="Order Details"
          orderNo={route.params.order.orderId}
        />
        <FlatList
          keyExtractor={item => item?.id}
          data={orders}
          renderItem={render}
          ItemSeparatorComponent={itemSeperator}
          ListFooterComponent={listFooterComponrnt}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 2,
    marginTop: 5,
  },
  formLeftText: {
    color: '#1F2937',
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'justify',
  },

  formRightText: {
    color: '#1F2937',
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 14,
    // fontWeight: '400',
    // textAlign: 'justify',
  },
});
