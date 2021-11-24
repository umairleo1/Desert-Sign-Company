import * as React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import {useNavigation, useTheme} from '@react-navigation/native';

import Header from '../../common/Header';
import RenderItem from './renderItem';
import {FlatList} from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import ActivityIndicator from '../../common/ActivityIndicator';
import {getAllVehicles} from '../../service/app.service';

export default function index() {
  const {colors} = useTheme();
  const isFocused = useIsFocused();
  const {height, width} = useWindowDimensions();

  const [vehicles, setVehicles] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    getVehicles();
  }, []);

  const getVehicles = async () => {
    try {
      setIsLoading(true);
      const result = await getAllVehicles();
      // console.log('all vehicles ', result.data);
      setVehicles(result.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(eror);
    }
  };

  const render = ({item}) => {
    return <RenderItem item={item} />;
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
      {isFocused && (
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      )}
      <ActivityIndicator visible={isLoading} />
      <View style={{paddingVertical: 10, flex: 1}}>
        <Header title="Vehicles" />
        <View
          style={[
            styles.divider,
            {backgroundColor: colors.divider, marginTop: 10, marginBottom: 10},
          ]}
        />
        <FlatList
          keyExtractor={item => item?._id}
          data={vehicles}
          renderItem={render}
          ItemSeparatorComponent={itemSeperator}
          ListEmptyComponent={EmptyListMessage}
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
});
