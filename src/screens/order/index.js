import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  useWindowDimensions,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AnimatedLoader from 'react-native-animated-loader';
import {useSelector, useDispatch} from 'react-redux';
import {useTheme, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import LottieView from 'lottie-react-native';
import {useIsFocused} from '@react-navigation/native';

import SecondaryHeader from '../../common/SecondaryHeader';
import RenderItem from './renderItem';
import mockData from '../../../mock/data.json';
import authStorage from '../../utils/authStorage';
import {getOrderHistory} from '../../service/app.service';

export default function index() {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [data, setData] = React.useState();
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);
  const savedItem = useSelector(state => state.savedItem.data);

  useEffect(async () => {
    try {
      const id = await authStorage.getUserid();
      const result = await getOrderHistory(id);
      setData(result?.data);
    } catch (e) {
      console.warn(e);
    }
  });

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const id = await authStorage.getUserid();
      const result = await getOrderHistory(id);
      setData(result?.data);
      setRefreshing(false);
    } catch (e) {
      setRefreshing(false);
      console.warn(e);
    }
  };

  //   setData(savedItem);
  // console.log(mockData, 'dataa');

  const renderEmptyComponent = () => {
    const {height, width} = useWindowDimensions();
    return (
      <View
        style={{
          height: height - 100,
        }}>
        <LottieView
          source={require('../../../assets/unsave.json')}
          autoPlay
          loop
        />
      </View>
    );
  };

  const render = ({item}) => {
    return <RenderItem item={item} />;
  };
  const itemSeperator = () => {
    return (
      <View
        style={[
          // styles.divider,
          {marginVertical: 6, height: 1},
        ]}
      />
    );
  };
  return (
    <SafeAreaView style={{paddingHorizontal: 15, flex: 1}}>
      {isFocused && (
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      )}
      <SecondaryHeader title={'Orders'} iconName={'arrowleft'} />

      <View style={{marginTop: 10, flex: 1}}>
        <FlatList
          //   keyExtractor={item => item.id}
          data={data}
          renderItem={render}
          ItemSeparatorComponent={itemSeperator}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          //   ListEmptyComponent={renderEmptyComponent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: '600',
  },
  headingSection: {
    width: '80%',
    marginLeft: 10,
    justifyContent: 'center',
  },
  iconSection: {width: '8%', alignItems: 'flex-start'},
  header: {
    height: 50,

    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  lottie: {
    height: 100,
    width: 100,
  },
});
