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

import ActivityIndicator from '../../common/ActivityIndicator';

import Header from '../../common/Header';
import FeaturedProducts from './fetaturedProducts';
import AllProducts from './allProducts';
import AllCategories from './allCategories';

export default function index() {
  const layout = useWindowDimensions();
  const {colors} = useTheme();
  const isFocused = useIsFocused();

  const statusbarWhite = () => {
    return <StatusBar barStyle="dark-content" backgroundColor="white" />;
  };

  const [isLoading, setIsLoading] = React.useState(false);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Featured Product'},
    {key: 'second', title: 'All Products'},
    {key: 'third', title: 'All Categories'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <FeaturedProducts />;
      case 'second':
        return <AllProducts />;
      case 'third':
        return <AllCategories />;
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
        <Header title="Products" />
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
