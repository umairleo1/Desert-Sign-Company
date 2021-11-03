import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import SecondaryHeader from '../../common/SecondaryHeader';
import ReanderCartItem from './renderCartItem';
import mockData from '../../../mock/data.json';
import {useNavigation, useTheme} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Button} from 'react-native-paper';
import LottieView from 'lottie-react-native';
export default function ShippingCart() {
  const [count, setCount] = React.useState(0);
  const reduData = useSelector(state => state.cart.data);
  const isFocused = useIsFocused();
  React.useEffect(() => {}, [isFocused]);
  // console.log(reduData, 'ccccccccckkkkk');

  const {colors} = useTheme();
  const navigation = useNavigation();

  const renderEmptyComponent = () => {
    const {height, width} = useWindowDimensions();
    return (
      <View
        style={{
          height: height - 100,
        }}>
        <LottieView
          source={require('../../../assets/emptycart.json')}
          autoPlay
          loop
        />
      </View>
    );
  };

  const render = ({item}) => {
    return <ReanderCartItem item={item} />;
  };
  const footer = () => {
    return (
      <View style={{marginBottom: 10}}>
        {reduData.length > 0 && (
          <Button
            onPress={() => navigation.navigate('ConfirmOredr')}
            labelStyle={{color: colors.background}}
            color={colors.button}
            style={styles.button}
            mode="contained">
            Continue
          </Button>
        )}
      </View>
    );
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
    <SafeAreaView style={{flex: 1, paddingHorizontal: 15}}>
      {isFocused && (
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      )}
      {/* <ScrollView> */}
      <SecondaryHeader title={'Shipping Cart'} iconName={'arrowleft'} />
      {/* <ScrollView style={{flex: 1, backgroundColor: 'red'}}> */}
      <View style={{marginTop: 10, flex: 1}}>
        <FlatList
          data={reduData}
          renderItem={render}
          ItemSeparatorComponent={itemSeperator}
          ListFooterComponent={footer}
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>
      {/* <View style={{marginBottom: 20}}>
        <Button
          onPress={() => navigation.navigate('ConfirmOredr')}
          labelStyle={{color: colors.background}}
          color={colors.button}
          style={styles.button}
          mode="contained">
          Continue
        </Button>
      </View> */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: 'row',

    // borderWidth: 1,
    paddingVertical: 20,
    marginTop: 10,
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  roundButton: {
    borderWidth: 1,
    height: 25,
    width: 25,
    borderRadius: 12,
  },
  remove: {
    color: 'red',
    marginRight: 10,
  },
  button: {
    // marginTop: 20,
    padding: 10,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,

    elevation: 0,
    // width: '100%',
  },
});
