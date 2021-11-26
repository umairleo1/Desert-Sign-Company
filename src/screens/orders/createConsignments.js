import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  StatusBar,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  useNavigation,
  useRoute,
  useTheme,
  useIsFocused,
} from '@react-navigation/native';
import SecondaryHeader from '../../common/SecondaryHeader';
import {FlatList} from 'react-native-gesture-handler';
import AuthContext from '../../utils/authContext';
import LottieView from 'lottie-react-native';
import VehiclesRadio from './vehiclesRadio';
import ActivityIndicator from '../../common/ActivityIndicator';
import {makeConsignment} from '../../service/app.service';

export default function createConsignments() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const {colors} = useTheme();
  const route = useRoute();
  const authContext = React.useContext(AuthContext);
  const {height, width} = useWindowDimensions();
  const [refreshing, setRefreshing] = React.useState(false);
  const [vehicles, setVehicles] = React.useState(route.params.vehicles);
  const [selectedVehicle, setSelectedVehicle] = React.useState({});
  const [ordersId, setOrdersId] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    authContext.ordersConsignments.map(item => ordersId.push(item._id));
    console.log('orders id ', ordersId);
    return () => {
      console.log('returned');
    };
  }, []);
  const render = ({item}) => {
    return (
      <VehiclesRadio
        setSelectedVehicle={setSelectedVehicle}
        selectedVehicle={selectedVehicle}
        item={item}
      />
    );
  };

  const handleCreateConsignment = async () => {
    try {
      setIsLoading(true);
      const result = await makeConsignment({
        orders: ordersId,
        vehicle: selectedVehicle._id,
        status: 'Ready',
      });
      authContext.setOrdersConsignments([]);
      authContext.setCheck(0);
      route.params.placedOrders.splice(0, route.params.placedOrders.length);
      route.params.inProgressOrders.splice(
        0,
        route.params.inProgressOrders.length,
      );
      route.params.dispatchedOrders.splice(
        0,
        route.params.dispatchedOrders.length,
      );
      route.params.deliveredOrders.splice(
        0,
        route.params.deliveredOrders.length,
      );
      route.params.vehicles.splice(0, route.params.vehicles.length);
      console.log('xxx create consignments ', result.data);
      route.params.setReload(!route.params.reLoad);
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
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
    <SafeAreaView style={{paddingHorizontal: 15, flex: 1}}>
      <ActivityIndicator visible={isLoading} />
      {isFocused && (
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      )}
      <View style={{paddingVertical: 10}}>
        <SecondaryHeader title="Select Vehicles" />
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={vehicles}
          renderItem={render}
          ItemSeparatorComponent={itemSeperator}
          ListEmptyComponent={EmptyListMessage}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        {selectedVehicle._id && (
          <View style={{zIndex: -1, width: '100%'}}>
            <Button
              color={colors.button}
              onPress={() => handleCreateConsignment()}
              style={styles.button}
              labelStyle={{color: colors.background}}
              mode="contained"
              // disabled={loading}
            >
              Create Consignment
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 2,
    marginTop: 5,
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
