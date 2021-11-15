import * as React from 'react';
import {StyleSheet, View, StatusBar, RefreshControl} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import {useNavigation, useTheme} from '@react-navigation/native';

import Header from '../../common/Header';
import RenderItem from './renderItem';
import {FlatList} from 'react-native-gesture-handler';

export default function index() {
  const {colors} = useTheme();
  const isFocused = useIsFocused();

  const [vehicles, setVehicles] = React.useState([
    {
      id: 1,
      name: 'Toyota',
      regNo: 'F 6578',
      status: 'Available',
    },
    {
      id: 2,
      name: 'Honda',
      regNo: 'A 005',
      status: 'Available',
    },
    {
      id: 3,
      name: 'Toyota',
      regNo: 'F 000',
      status: 'Available',
    },
    {
      id: 4,
      name: 'Honda',
      regNo: 'A 9234',
      status: 'Available',
    },
  ]);
  const [refreshing, setRefreshing] = React.useState(false);

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
  return (
    <SafeAreaView style={{paddingHorizontal: 15, flex: 1}}>
      {isFocused && (
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      )}
      <View style={{paddingVertical: 10, flex: 1}}>
        <Header title="Vehicles" />
        <View
          style={[
            styles.divider,
            {backgroundColor: colors.divider, marginTop: 10, marginBottom: 10},
          ]}
        />
        <FlatList
          keyExtractor={item => item?.id}
          data={vehicles}
          renderItem={render}
          ItemSeparatorComponent={itemSeperator}
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
