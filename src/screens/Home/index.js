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

import Header from './Header';
import Product from './Product';
import AllProduct from './AllProduct';
import Services from './Services';

export default function index() {
  const layout = useWindowDimensions();
  const {colors} = useTheme();
  const isFocused = useIsFocused();
  const [count, setCount] = React.useState(0);
  const savedItem = useSelector(state => state.savedItem.data);
  const statusbarWhite = () => {
    return <StatusBar barStyle="dark-content" backgroundColor="white" />;
  };
  // React.useEffect(() => statusbarWhite(), []);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Featured Product'},
    {key: 'second', title: 'All Products'},
    {key: 'third', title: 'All Services'},
  ]);

  const renderScene = SceneMap({
    first: Product,
    second: AllProduct,
    third: Services,
  });
  const renderHeader = props => <TabBar style={{elevation: 0}} {...props} />;

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.primary}}
      style={{backgroundColor: 'white', elevation: 0}}
      labelStyle={{color: 'gray', fontSize: 10}}
      activeColor={colors.primary}
    />
  );

  return (
    // <>
    //   <StatusBar barStyle="dark-content" backgroundColor="white" />
    <SafeAreaView style={{paddingHorizontal: 15, flex: 1}}>
      {isFocused && (
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      )}
      <View style={{paddingVertical: 10}}>
        <Header />
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
        // renderHeader={renderHeader}
      />
    </SafeAreaView>
    // </>
  );
}

const styles = StyleSheet.create({});
