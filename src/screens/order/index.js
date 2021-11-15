import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  useWindowDimensions,
  StatusBar,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AnimatedLoader from 'react-native-animated-loader';
import {useSelector, useDispatch} from 'react-redux';
import {useTheme, useNavigation, useRoute} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';

import SecondaryHeader from '../../common/SecondaryHeader';
import Dots from '../../../assets/svgs/Dots';
import StepIndicator from 'react-native-step-indicator';
import RenderItem from '../consignments/DetailedOrderRender';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

export default function index() {
  const navigation = useNavigation();
  const route = useRoute();
  const {colors} = useTheme();

  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);
  const [currentPosition, setCurrentPosition] = React.useState(1);

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
  const [orders, setOrders] = React.useState([
    {
      id: 1,
      orderNo: 'ED123553DD4335',
      orderPrice: 'AED 123',
      date: 'Nov 12 2021',
    },
    {
      id: 2,
      orderNo: 'ABC423444V4445',
      orderPrice: 'AED 989',
      date: 'Nov 12 2021',
    },
    {
      id: 3,
      orderNo: 'VBD335VV665556',
      orderPrice: 'AED 143',
      date: 'Nov 12 2021',
    },
    {
      id: 4,
      orderNo: 'ASOH676BB55555',
      orderPrice: 'AED 453',
      date: 'Nov 12 2021',
    },
  ]);

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

  return (
    <SafeAreaView style={{paddingHorizontal: 15, flex: 1}}>
      {isFocused && (
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      )}
      <SecondaryHeader
        title={'Consignment Number'}
        iconName={<Dots />}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
        consignmentNumber={route?.params?.consignment?.consignmentNo}
      />

      <View style={{flex: 1}}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={() => setShowPopup(false)}>
            <Text style={styles.heading}>
              Awaiting: Your Consignment is about to get Ready
            </Text>
            <Text style={styles.subHeadingText}>
              We are waiting for the Consignment to get Ready. Please contact
              customer support if you have any query or problem regarding this
              consignment.
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
            <View style={{flexDirection: 'row', marginBottom: 5}}>
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
                  style={[
                    styles.formRightText,
                    {fontSize: 16, fontWeight: '600'},
                  ]}>
                  AED 1440
                </Text>
              </View>
            </View>
            <View style={[styles.divider, {backgroundColor: colors.divider}]} />

            <FlatList
              keyExtractor={item => item?.id}
              data={orders}
              renderItem={render}
              ItemSeparatorComponent={itemSeperator}
              // refreshControl={
              //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              // }
            />
          </TouchableWithoutFeedback>
        </ScrollView>
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
    top: 60,
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
  divider: {
    height: 2,
    marginTop: 5,
  },
});
