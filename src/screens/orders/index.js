import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  StatusBar,
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
import {getAllOrders} from '../../service/app.service';

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
  const [index, setIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [placedOrders, setPlacedOrders] = React.useState([]);
  const [inProgressOrders, setInProgressOrders] = React.useState([]);
  const [dispatchedOrders, setDispatchedOrders] = React.useState([]);
  const [deliveredOrders, setDeliveredOrders] = React.useState([]);

  const [routes] = React.useState([
    {key: 'first', title: 'Placed'},
    {key: 'second', title: 'In Progress'},
    {key: 'third', title: 'Dispatched'},
    {key: 'four', title: 'Delivered'},
  ]);

  // const renderScene = SceneMap({
  //   first: Placed,
  //   second: InProgress,
  //   third: Dispatched,
  //   four: Delivered,
  // });

  React.useEffect(() => {
    console.log('Orders');
    allOrders();
  }, []);

  const allOrders = async () => {
    try {
      setIsLoading(true);
      const result = await getAllOrders();
      // console.log('all orders ', result.data.rejected);
      result.data.rejected.map(item => {
        if (item.status === 'pending') {
          placedOrders.push(item);
        } else if (item.status === 'InProgress') {
          placedOrders.push(item);
        } else if (item.status === 'Dispatched') {
          placedOrders.push(item);
        } else if (item.status === 'Delivered') {
          placedOrders.push(item);
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
        return <Placed orders={placedOrders} />;
      case 'second':
        return <InProgress orders={inProgressOrders} />;
      case 'third':
        return <Dispatched orders={dispatchedOrders} />;
      case 'four':
        return <Delivered orders={deliveredOrders} />;
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

const styles = StyleSheet.create({});
