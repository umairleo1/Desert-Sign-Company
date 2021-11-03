import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  useWindowDimensions,
  StatusBar,
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

export default function index() {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [data, setData] = React.useState([]);
  const isFocused = useIsFocused();
  const savedItem = useSelector(state => state.savedItem.data);
  //   setData(savedItem);
  //   console.log(savedItem);
  React.useEffect(() => {}, [isFocused]);

  const renderEmptyComponent = () => {
    const {height, width} = useWindowDimensions();
    return (
      <View
        style={{
          height: height - 100,
        }}>
        <LottieView
          source={require('../../../assets/empty.json')}
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
          {backgroundColor: colors.divider, marginVertical: 10, height: 1},
        ]}
      />
    );
  };
  return (
    <SafeAreaView style={{paddingHorizontal: 15}}>
      {isFocused && (
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      )}
      <SecondaryHeader title={'Saved Items'} iconName={'arrowleft'} />

      <View style={{marginTop: 10}}>
        <FlatList
          keyExtractor={item => item._id}
          data={savedItem}
          renderItem={render}
          ItemSeparatorComponent={itemSeperator}
          ListEmptyComponent={renderEmptyComponent}
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
