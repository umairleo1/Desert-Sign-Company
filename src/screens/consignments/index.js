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
import {getAllConsignments} from '../../service/app.service';
import {useSelector, useDispatch, connect} from 'react-redux';
import ActivityIndicator from '../../common/ActivityIndicator';

import Header from '../../common/Header';
import Ready from './Ready';
import Dispatch from './Dispatch';
import Returned from './Returned';

export default function index() {
  const layout = useWindowDimensions();
  const {colors} = useTheme();
  const isFocused = useIsFocused();

  const statusbarWhite = () => {
    return <StatusBar barStyle="dark-content" backgroundColor="white" />;
  };

  const [count, setCount] = React.useState(0);
  const savedItem = useSelector(state => state.savedItem.data);
  const [isLoading, setIsLoading] = React.useState(false);
  const [readyConsignments, setReadyConsignments] = React.useState([]);
  const [dispatchedConsignments, setDispatchedConsignments] = React.useState(
    [],
  );
  const [returnedConsignments, setReturnedConsignments] = React.useState([]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Ready'},
    {key: 'second', title: 'Dispatch'},
    {key: 'third', title: 'Returned'},
  ]);

  React.useEffect(() => {
    console.log('Consignments');
    getConsignments();
  }, []);

  const getConsignments = async () => {
    try {
      setIsLoading(true);
      const result = await getAllConsignments();
      console.log('all consignments ', result.data);
      result.data.map(item => {
        if (item.status === 'Ready') {
          readyConsignments.push(item);
        } else if (item.status === 'Dispatched') {
          dispatchedConsignments.push(item);
        } else if (item.status === 'Returned') {
          returnedConsignments.push(item);
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
        return <Ready consignment={readyConsignments} />;
      case 'second':
        return <Dispatch consignment={dispatchedConsignments} />;
      case 'third':
        return <Returned consignment={returnedConsignments} />;
      default:
        return null;
    }
  };

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
        <Header title="Consignments" />
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
