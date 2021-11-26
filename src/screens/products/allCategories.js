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
import {useIsFocused} from '@react-navigation/native';
import RenderItem from './renderCategories';
import mockData from '../../../mock/data.json';
import {AllCategories, AllProducts} from '../../service/app.service';
import LottieView from 'lottie-react-native';
import ActivityIndicator from '../../common/ActivityIndicator';

export default function allCategories() {
  const {colors} = useTheme();
  const isFocused = useIsFocused();
  const {height, width} = useWindowDimensions();
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [categries, setCategries] = React.useState([{id: 1}]);

  const render = ({item}) => {
    return <RenderItem item={item} />;
  };

  React.useEffect(() => {
    getAllCategries();
  }, []);

  const getAllCategries = async () => {
    try {
      setIsLoading(true);
      const result = await AllCategories();
      setCategries(result.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleRefresh = async () => {
    categries.splice(0, categries.length);
    try {
      setIsLoading(true);
      const result = await AllCategories();
      setCategries(result.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      handleRefresh();
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
      <ActivityIndicator visible={isLoading} />
      <View style={{marginTop: 10, flex: 1}}>
        <FlatList
          // keyExtractor={item => item?._id}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={categries}
          renderItem={render}
          //   ItemSeparatorComponent={itemSeperator}
          ListEmptyComponent={EmptyListMessage}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
