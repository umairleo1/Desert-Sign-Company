import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  StatusBar,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch, connect} from 'react-redux';

import AuthContext from '../../utils/authContext';
import ActivityIndicator from '../../common/ActivityIndicator';

import Header from '../../common/Header';
import Placed from './Placed';
import InProgress from './Inprogress';
import Dispatched from './Dispatched';
import Delivered from './Delivered';
import {getAllOrders, getAllVehicles} from '../../service/app.service';
import CreateConsignments from './createConsignments';

export default function index() {
  const layout = useWindowDimensions();
  const {colors} = useTheme();
  const isFocused = useIsFocused();
  const authContext = React.useContext(AuthContext);

  const statusbarWhite = () => {
    return <StatusBar barStyle="dark-content" backgroundColor="white" />;
  };

  const [count, setCount] = React.useState(0);
  const savedItem = useSelector(state => state.savedItem.data);
  const [isLoading, setIsLoading] = React.useState(false);
  const [placedOrders, setPlacedOrders] = React.useState([]);
  const [inProgressOrders, setInProgressOrders] = React.useState([]);
  const [dispatchedOrders, setDispatchedOrders] = React.useState([]);
  const [deliveredOrders, setDeliveredOrders] = React.useState([]);
  const [vehicles, setVehicles] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [reload, setReload] = React.useState(false);
  // var index = 0;
  const [routes] = React.useState([
    {key: 'first', title: 'Placed'},
    {key: 'second', title: 'In Progress'},
    {key: 'third', title: 'Dispatched'},
    {key: 'four', title: 'Delivered'},
  ]);

  React.useEffect(() => {
    // console.log('Orders');
    allOrders();
    allVehicles();
  }, [reload]);

  const allVehicles = async () => {
    try {
      setIsLoading(true);
      const result = await getAllVehicles();
      setVehicles(result.data);
      // setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const allOrders = async () => {
    try {
      setIsLoading(true);
      const result = await getAllOrders();
      // console.log('all orders ', result.data.rejected);
      result.data.map(item => {
        if (item.status === 'Placed' || item.status === 'Returned') {
          placedOrders.push(item);
        } else if (item.status === 'InProgress' || item.status === 'Ready') {
          inProgressOrders.push(item);
        } else if (item.status === 'Dispatched') {
          dispatchedOrders.push(item);
        } else if (item.status === 'Delivered') {
          deliveredOrders.push(item);
        }
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return (
          <Placed
            reLoad={reload}
            setReload={setReload}
            vehicles={vehicles}
            orders={placedOrders}
            inProgressOrders={inProgressOrders}
            dispatchedOrders={dispatchedOrders}
            deliveredOrders={deliveredOrders}
          />
        );
      case 'second':
        return (
          <InProgress
            reLoad={reload}
            setReload={setReload}
            orders={inProgressOrders}
            placedOrders={placedOrders}
            dispatchedOrders={dispatchedOrders}
            deliveredOrders={deliveredOrders}
            vehicles={vehicles}
          />
        );
      case 'third':
        return (
          <Dispatched
            reLoad={reload}
            setReload={setReload}
            orders={dispatchedOrders}
            inProgressOrders={inProgressOrders}
            placedOrders={placedOrders}
            deliveredOrders={deliveredOrders}
            vehicles={vehicles}
          />
        );
      case 'four':
        return (
          <Delivered
            reLoad={reload}
            setReload={setReload}
            orders={deliveredOrders}
            inProgressOrders={inProgressOrders}
            dispatchedOrders={dispatchedOrders}
            placedOrders={placedOrders}
            vehicles={vehicles}
          />
        );
      default:
        return null;
    }
  };
  const renderHeader = props => <TabBar style={{elevation: 0}} {...props} />;

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.primary}}
      style={{backgroundColor: '#fff', elevation: 0}}
      labelStyle={{
        color: 'gray',
        fontSize: 10,
        fontFamily: 'SourceSansPro-Regular',
        fontWeight: '400',
      }}
      activeColor={colors.primary}
    />
  );

  return (
    <SafeAreaView style={{paddingHorizontal: 15, flex: 1}}>
      {isFocused && (
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      )}
      <ActivityIndicator visible={isLoading} />
      <View style={{paddingVertical: 10}}>
        <Header title="Orders" />
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        // onIndexChange={val => (index = val)}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
        style={{marginBottom: 5}}
        // renderHeader={renderHeader}
      />
    </SafeAreaView>
    // </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    // paddingTop: Constants.statusBarHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
});
