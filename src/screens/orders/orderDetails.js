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
import StepIndicator from 'react-native-step-indicator';
import SecondaryHeader from '../../common/SecondaryHeader';
import RenderOrderDetails from './orderDetailsCard';

export default function orderDetails() {
  const isFocused = useIsFocused();
  const {colors} = useTheme();
  const route = useRoute();
  // console.log('xxx ', route.params.order.products[0].price);
  const [refreshing, setRefreshing] = React.useState(false);
  const [orders, setOrders] = React.useState(route.params.order.products);
  const [currentPosition, setCurrentPosition] = React.useState(1);
  const labels = ['Placed', 'In Progress', 'Dispatched', 'Delivered'];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#1FA1DA',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#1FA1DA',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#1FA1DA',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#1FA1DA',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#1FA1DA',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#1FA1DA',
  };

  React.useEffect(() => {
    if (route.params.order.status === 'Placed') {
      setCurrentPosition(0);
    } else if (route.params.order.status === 'InProgress') {
      setCurrentPosition(1);
    } else if (route.params.order.status === 'Dispatched') {
      setCurrentPosition(2);
    } else if (route.params.order.status === 'Delivered') {
      setCurrentPosition(3);
    }
  }, []);

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
          <Text style={styles.formRightText}>
            {route.params.order.customer.companyName}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <View style={{width: '50%', justifyContent: 'center'}}>
          <Text style={styles.formLeftText}>Shipping Address</Text>
        </View>
        <View style={{width: '50%', flexDirection: 'row-reverse'}}>
          <Text style={styles.formRightText}>
            {route.params.order.shippingAddress}
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
          <Text style={styles.formLeftText}>Price</Text>
        </View>
        <View style={{width: '50%', flexDirection: 'row-reverse'}}>
          <Text style={styles.formRightText}>{route.params.order.total}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <View style={{width: '50%', justifyContent: 'center'}}>
          <Text style={styles.formLeftText}>Total Price</Text>
        </View>
        <View style={{width: '50%', flexDirection: 'row-reverse'}}>
          <Text
            style={[styles.formRightText, {fontSize: 16, fontWeight: '600'}]}>
            AED {route.params.order.total + 60}
          </Text>
        </View>
      </View>
    </>
  );

  const listHeaderComponrnt = () => (
    <View style={{marginTop: 10}}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        labels={labels}
        stepCount={4}
      />
      <View
        style={[
          styles.divider,
          {backgroundColor: colors.divider, marginBottom: 10},
        ]}
      />
    </View>
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
          ListHeaderComponent={listHeaderComponrnt}
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
