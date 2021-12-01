import {useTheme, useNavigation} from '@react-navigation/native';
import {set} from 'immer/dist/internal';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  useWindowDimensions,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {getSpecificProduct} from '../../service/app.service';
import RenderSearch from './renderSearch';

export default function Search() {
  const [products, setProducts] = React.useState();
  const [found, setFound] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [isFocus, setIsFocus] = React.useState(false);
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {height, width} = useWindowDimensions();

  React.useEffect(() => {
    products?.length <= 0 ? setFound(false) : setFound(true);
    // search == '' ? setFound(false) : setFound(true);
  }, [products, found]);

  const handleSearch = async val => {
    setSearch(val);
    try {
      const data = await getSpecificProduct(val);
      // console.log('xxx search ', data.data);
      data.data ? setProducts(data?.data) : setFound(false);
    } catch (e) {
      console.warn(e);
    }
    // setSearch(val);
  };

  const render = ({item}) => {
    return <RenderSearch item={item} />;
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

  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'bottom', 'left', 'top']}>
      {/* <View onPress={() => Keyboard.dismiss()} style={{}}> */}
      <View style={[styles.header, {borderBottomColor: colors.headerBottom}]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.iconSection}>
            <Icon
              onPress={() => navigation.goBack()}
              style={{fontSize: 25}}
              name={'arrowleft'}
            />
          </View>

          <View style={{width: '80%'}}>
            <TextInput
              style={[isFocus ? styles.focusInput : styles.input]}
              onChangeText={text => {
                handleSearch(text);
              }}
              value={search}
              placeholder="Search here"
              placeholderTextColor={'gray'}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            />
            <Icon
              // onPress={() => handleSearch(search)}
              style={{position: 'absolute', right: 15, fontSize: 20, top: 20}}
              name={'search1'}
            />
          </View>
        </View>
      </View>
      {products && (
        <View style={{margin: 10}}>
          <FlatList
            keyExtractor={item => item?._id}
            data={products}
            renderItem={render}
            ItemSeparatorComponent={itemSeperator}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
          />
        </View>
      )}
      {found == false && (
        <View
          style={{
            height: height - 200,
          }}>
          <LottieView
            source={require('../../../assets/empty.json')}
            autoPlay
            loop
          />
        </View>
      )}
      {/* </View> */}
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
  iconSection: {width: '15%', alignItems: 'center'},
  header: {
    height: 80,
    justifyContent: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  focusInput: {
    borderColor: '#7EC043',
    // height: 45,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  input: {
    height: 45,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: 'gray',
  },
});
