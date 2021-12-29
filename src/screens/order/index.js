import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  RefreshControl,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme, useNavigation, useRoute} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import AuthContext from '../../utils/authContext';
import {showMessage, hideMessage} from 'react-native-flash-message';

import SecondaryHeader from '../../common/SecondaryHeader';
import Dots from '../../../assets/svgs/Dots';
import StepIndicator from 'react-native-step-indicator';
import RenderItem from '../consignments/DetailedOrderRender';
import ActivityIndicator from '../../common/ActivityIndicator';
import {
  UpdateConsignment,
  UpdateConsignmentStatus,
} from '../../service/app.service';

export default function index() {
  const navigation = useNavigation();
  const route = useRoute();
  const {colors} = useTheme();

  const isFocused = useIsFocused();
  const authContext = React.useContext(AuthContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);
  const [currentPosition, setCurrentPosition] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [xx, setXX] = React.useState(false);

  const labels = ['Ready', 'Dispatch', 'Delivered'];
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
  const [orders, setOrders] = React.useState(route.params.consignment.orders);
  // console.log('xxx yyyyy ', route.params.consignment._id);
  useEffect(() => {
    if (route.params.consignment.status === 'Ready') {
      setCurrentPosition(0);
    } else if (route.params.consignment.status === 'Dispatched') {
      setCurrentPosition(1);
    } else if (route.params.consignment.status === 'Delivered') {
      setCurrentPosition(2);
    }
    return () => {
      authContext.updateOrder.splice(0, authContext.updateOrder.length);
      authContext.setMarked(false);
    };
  }, []);

  const handleUpdate = () => {
    authContext.setMarked(true);
  };
  const handleDone = async () => {
    let orders = [];
    if (authContext.updateOrder.length <= 0) {
      showMessage({
        message: 'You must select atleast one order',
        type: 'warning',
        floating: true,
      });
    } else {
      authContext.updateOrder.map(item => {
        orders.push(item._id);
      });
      try {
        setIsLoading(true);
        const result = await UpdateConsignment(
          route.params.consignment._id,
          orders,
        );
        // console.log('update consignment ', result, orders);
        route.params.ready.splice(0, route.params.ready.length);
        route.params.dispatched.splice(0, route.params.dispatched.length);
        route.params.returned.splice(0, route.params.returned.length);
        route.params.setReload(!route.params.reLoad);
        navigation.goBack();
        showMessage({
          message: 'Consignment successfuly delivered',
          type: 'success',
          floating: true,
        });
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  const markedDispatch = async () => {
    try {
      setIsLoading(true);
      const result = await UpdateConsignmentStatus(
        route.params.consignment._id,
        'Dispatched',
      );
      route.params.ready.splice(0, route.params.ready.length);
      route.params.dispatched.splice(0, route.params.dispatched.length);
      route.params.returned.splice(0, route.params.returned.length);
      route.params.setReload(!route.params.reLoad);
      navigation.goBack();
      showMessage({
        message: 'Consignment successfuly updated',
        type: 'success',
        floating: true,
      });
    } catch (e) {
      setIsLoading(false);
      console.warn(e);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      // const id = await authStorage.getUserid();
      // const result = await getOrderHistory(id);
      // setData(result?.data);

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
          // styles.divider,
          {backgroundColor: colors.divider, marginVertical: 10, height: 1},
        ]}
      />
    );
  };

  const listHeaderComponrnt = () => (
    <>
      <Text style={styles.heading}>
        Awaiting: Your Consignment is about to get Ready
      </Text>
      <Text style={styles.subHeadingText}>
        We are waiting for the Consignment to get Ready. Please contact customer
        support if you have any query or problem regarding this consignment.
      </Text>

      <View style={{marginTop: 10}}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          stepCount={3}
        />
      </View>
      <View style={{alignItems: 'center', marginVertical: 10}}>
        <Text style={[styles.subHeadingText, {color: '#060F2F'}]}>
          Consignment under progress
        </Text>
      </View>
      <Text style={styles.subHeadingText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
        scelerisque egestas diam tellus volutpat ut.
      </Text>
      <View style={{flexDirection: 'row', marginVertical: 5}}>
        <View style={{width: '50%', justifyContent: 'center'}}>
          <Text style={styles.formLeftText}>Driver's Name</Text>
        </View>
        <View style={{width: '50%', flexDirection: 'row-reverse'}}>
          <Text style={styles.formRightText}>
            {route?.params?.consignment?.driverName}
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
      <View style={[styles.divider, {backgroundColor: colors.divider}]} />
    </>
  );

  return (
    <SafeAreaView style={{paddingHorizontal: 15, flex: 1}}>
      {isFocused && (
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      )}
      <SecondaryHeader
        title={'Consignment Number'}
        // iconName={<Dots />}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
        consignmentNumber={route?.params?.consignment?.consignmentNo}
      />

      <View onPress={() => setShowPopup(false)} style={{flex: 1}}>
        <ActivityIndicator visible={isLoading} />
        <TouchableWithoutFeedback
          style={{flex: 1}}
          onPress={() => setShowPopup(false)}>
          <FlatList
            keyExtractor={item => item?._id}
            data={orders}
            renderItem={render}
            ListHeaderComponent={listHeaderComponrnt}
            ItemSeparatorComponent={itemSeperator}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </TouchableWithoutFeedback>
        {route.params.status === 'dispatch' && (
          <View style={{zIndex: -1, width: '100%', marginBottom: 2}}>
            <Button
              // disabled={
              //   authContext.marked && authContext.updateOrder.length <= 0
              //     ? true
              //     : false
              // }
              color={colors.button}
              onPress={() =>
                authContext.marked ? handleDone() : handleUpdate()
              }
              style={styles.button}
              labelStyle={{color: colors.background}}
              mode="contained"
              // disabled={
              //   authContext.marked
              //     ? authContext.updateOrder.length <= 0
              //       ? true
              //       : false
              //     : false
              // }
            >
              {authContext.marked ? 'Done' : 'Marked as complete'}
            </Button>
          </View>
        )}
        {route.params.status === 'ready' && (
          <View style={{zIndex: -1, width: '100%'}}>
            <Button
              color={colors.button}
              onPress={() => markedDispatch()}
              style={styles.button}
              labelStyle={{color: colors.background}}
              mode="contained"
              // disabled={loading}
            >
              marked as dispatch
            </Button>
          </View>
        )}
      </View>

      {showPopup && (
        <View style={styles.popup}>
          <TouchableOpacity onPress={() => setShowPopup(!showPopup)}>
            <Text style={styles.popupText}>Share</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            onPress={() => {
              setShowPopup(!showPopup),
                navigation.navigate('UpdateConsignment', {
                  consignmentNumber: route?.params?.consignment?.consignmentNo,
                });
            }}>
            <Text style={styles.popupText}>Update</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={() => setShowPopup(!showPopup)}>
            <Text style={styles.popupText}>Move to “Shipped”</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 16,
    fontWeight: '600',
    color: '#060F2F',
    marginVertical: 15,
    lineHeight: 22,
    // textAlign: 'center',
  },
  subHeadingText: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 14,
    // fontWeight: '400',
    color: '#6B7280',
    lineHeight: 22,
    textAlign: 'justify',
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
  popup: {
    padding: 10,
    width: 160,
    height: 115,
    backgroundColor: '#fff',
    position: 'absolute',
    top: Platform.OS == 'ios' ? 85 : 60,
    right: 20,
    borderRadius: 10,
    shadowColor: '#3D3D3D',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  divider: {
    borderWidth: 0.5,
    borderColor: '#E5E7EB',
    marginVertical: 10,
  },
  popupText: {
    textAlign: 'center',
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 14,
    // fontWeight: '400',
    color: '#060F2F',
  },
  button: {
    // marginTop: 20,
    padding: 10,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    // width: '100%',
  },
});
