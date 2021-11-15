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

import Header from '../../common/Header';
import Placed from './Placed';
import InProgress from './Inprogress';
import Dispatched from './Dispatched';
import Delivered from './Delivered';

export default function index() {
  const layout = useWindowDimensions();
  const {colors} = useTheme();
  const isFocused = useIsFocused();

  const statusbarWhite = () => {
    return <StatusBar barStyle="dark-content" backgroundColor="white" />;
  };

  const [count, setCount] = React.useState(0);
  const savedItem = useSelector(state => state.savedItem.data);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Placed'},
    {key: 'second', title: 'In Progress'},
    {key: 'third', title: 'Dispatched'},
    {key: 'four', title: 'Delivered'},
  ]);

  const renderScene = SceneMap({
    first: Placed,
    second: InProgress,
    third: Dispatched,
    four: Delivered,
  });
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
