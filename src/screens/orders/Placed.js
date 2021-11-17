import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import {Button} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import RenderItem from './renderItem';
import AuthContext from '../../utils/authContext';
import LottieView from 'lottie-react-native';

export default function Placed(props) {
  const {colors} = useTheme();
  const isFocused = useIsFocused();
  const {height, width} = useWindowDimensions();

  const authContext = React.useContext(AuthContext);
  const [products, setProducts] = React.useState(props.orders);
  const [refreshing, setRefreshing] = React.useState(false);
  const [ordersConsignments, setRerender] = React.useState(
    authContext.ordersConsignments,
  );
  const [loading, setLoading] = React.useState(false);

  const handleConsignment = () => {
    setLoading(true);
    console.log('xx ', ordersConsignments);
    setLoading(false);
  };

  const render = ({item}) => {
    return <RenderItem item={item} type="placed" />;
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
    <View style={{flex: 1}}>
      {/* <View style={[styles.divider, {backgroundColor: colors.divider}]} /> */}
      <View style={{marginTop: 10, flex: 1}}>
        {/* <ScrollView>*/}
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
        {authContext.check > 0 && (
          <View style={{zIndex: -1, width: '100%'}}>
            <Button
              color={colors.button}
              onPress={() => handleConsignment()}
              style={styles.button}
              labelStyle={{color: colors.background}}
              mode="contained"
              disabled={loading}>
              Make Consignment
            </Button>
          </View>
        )}
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
