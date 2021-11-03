import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute, useTheme, useNavigation} from '@react-navigation/native';
import SecondaryHeader from '../../common/SecondaryHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import {Button} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {setCartItems, updateCount} from '../../store/reducers/cart';
import CartIcon from '../../../assets/svgs/CartIcon';
import {showMessage} from 'react-native-flash-message';
import {useIsFocused} from '@react-navigation/native';
import URL from '../../utils/url_path';

export default function Description() {
  const [count, setCount] = React.useState(1);
  const isFocused = useIsFocused();
  const route = useRoute();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const descriptionData = route.params.data;
  const iconName = route.params.saved;
  const reduData = useSelector(state => state.cart.data);
  // console.log(descriptionData?.sizeChartImage, 'lll');

  const handleAddtoCart = () => {
    let tempObject = descriptionData;
    // console.log(tempObject, 'temp');
    let found = reduData.findIndex(val => val._id == descriptionData?._id);
    // console.log(found, 'on add');
    if (found === -1) {
      tempObject['count'] = count;
      dispatch(setCartItems(tempObject));
    } else {
      let obj = {};
      obj['id'] = descriptionData?._id;
      obj['count'] = count;
      dispatch(updateCount(obj));
    }
    showMessage({
      message: 'Your Item has been successfully added to cart',
      type: 'success',
    });
  };

  // const reduData = useSelector(state => state.cart.data);
  // console.log(reduData.length);
  const totalIteminCart = reduData.length;

  const handleDecriment = () => {
    if (count == 1) return;
    else {
      setCount(count - 1);
    }
  };
  const handleIncriment = () => {
    console.log('before', count);
    setCount(count + 1);
  };
  return (
    <SafeAreaView style={{paddingHorizontal: 15, flex: 1}}>
      {isFocused && (
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      )}
      <View>
        <View style={[styles.header, {borderBottomColor: colors.headerBottom}]}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.iconSection}>
              <Icon
                onPress={() => navigation.goBack()}
                style={{fontSize: 25}}
                name={'arrowleft'}
              />
            </View>
            <View style={styles.headingSection}>
              <Text
                style={[styles.heading, {color: colors.profileBcackGround}]}>
                {descriptionData?.name}
              </Text>
              <View style={{alignItems: 'flex-end', marginRight: 5}}>
                <Text
                  style={{
                    fontSize: 12,
                    marginRight: 8,
                    color: colors.button,
                    position: 'absolute',
                    top: 8,
                    right: 1,
                  }}>
                  {totalIteminCart}
                </Text>

                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate('ShippingCart');
                    setCount(1);
                  }}>
                  <Image
                    style={{height: 25, width: 25}}
                    resizeMode="contain"
                    source={require('../../../assets/shopping-bag.png')}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={{marginBottom: 10}}>
        <View style={styles.descriptionHeading}>
          <Text style={styles.heading}>Description:</Text>
          <Ionicons
            // onPress={() => (isSave ? setIsSave(false) : setIsSave(true))}
            style={styles.icon}
            name={iconName}
          />
        </View>
        <Text style={styles.descriptionTet}>
          {descriptionData?.description}
        </Text>
        <View style={styles.descriptionHeading}>
          <Text style={styles.heading}>Price</Text>
          <Text>$ {descriptionData?.price}</Text>
        </View>
        <View style={styles.image}>
          <Image
            style={{height: 400, borderRadius: 10}}
            resizeMode="contain"
            source={{
              uri: descriptionData?.image
                ? URL.IMAGE_URL + descriptionData?.image
                : 'https://media.pakprice.pk//test/tdT1cKbjNy8NBZJdI06z8rZD80siDDeRAEFCyRrI.png',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'red',
            // alignItems: 'center',
          }}>
          {/* <View style={{}}> */}
          <View
            style={{
              height: 100,
              width: 100,
              opacity: 0.9,
              borderRadius: 10,
              backgroundColor: '#000',
            }}>
            {/* <Foundation style={{}} name="arrows-alt" /> */}
            <Image
              resizeMode="cover"
              style={{height: 100, width: 100, borderRadius: 10}}
              source={{
                uri: descriptionData?.sizeChartImage
                  ? URL.IMAGE_URL + descriptionData?.sizeChartImage
                  : 'https://media.pakprice.pk//test/tdT1cKbjNy8NBZJdI06z8rZD80siDDeRAEFCyRrI.png',
              }}
            />
            <Foundation
              style={{
                position: 'absolute',
                top: '35%',
                left: '35%',
                fontSize: 30,
                color: 'white',
              }}
              onPress={() =>
                navigation.navigate('DetailedImage', {
                  image: descriptionData?.sizeChartImage,
                })
              }
              name="arrows-out"
            />
            {/* </View> */}
          </View>
          <View style={{marginTop: 30, marginLeft: 20}}>
            <Text style={{fontSize: 14, fontWeight: '600', color: 'gray'}}>
              Width: {descriptionData?.standardSizeWidth[0]}m,{' '}
              {descriptionData?.standardSizeWidth[1]}m,{' '}
              {descriptionData?.standardSizeWidth[2]}m
            </Text>
            <Text style={{fontSize: 14, fontWeight: '600', color: 'gray'}}>
              Length: {descriptionData?.standardSizeLength} m
            </Text>
          </View>
        </View>
        {/* <View>
          <Text style={{fontWeight: '400', fontSize: 14, color: 'gray'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            scelerisque egestas diam tellus volutpat ut.
          </Text>
        </View> */}
        <View
          style={[
            styles.quantityContainer,
            {borderColor: colors.headerBottom},
          ]}>
          <Text style={{fontSize: 14, fontWeight: '600', marginLeft: 10}}>
            Quantity
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: 100,
              justifyContent: 'space-around',
            }}>
            {/* <View style={styles.roundButton}></View> */}
            <EvilIcons
              onPress={() => handleDecriment()}
              style={{fontSize: 30}}
              name="minus"
            />
            <View style={{width: 30, alignItems: 'center'}}>
              <Text> {count}</Text>
            </View>
            {/* <View style={styles.roundButton}> */}
            <EvilIcons
              style={{fontSize: 30}}
              name="plus"
              onPress={() => handleIncriment()}
            />
            {/* </View> */}
          </View>
        </View>
        {/* <View style={styles.buttonContainer}>
          <Button
            onPress={() => handleAddtoCart()}
            labelStyle={{color: colors.button}}
            style={[styles.button]}
            mode="outlined">
            Add to cart
          </Button>
          <View style={{width: '48%'}}>

            <Text
              style={{
                position: 'absolute',
                color: 'white',
                right: 5,

              }}>
              10
            </Text>

            <Button
              onPress={() => navigation.navigate('ShippingCart')}
              labelStyle={{color: colors.background}}
              color={colors.button}
              style={{padding: 10, borderRadius: 10, elevation: 0, zIndex: -1}}
              mode="contained">
              View Cart
            </Button>
          </View>
        </View>   */}
      </ScrollView>
      <View style={{paddingBottom: 5}}>
        <Button
          onPress={() => handleAddtoCart()}
          labelStyle={{color: 'white'}}
          style={[styles.button]}
          color={colors.button}
          mode="contained">
          Add to cart
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  descriptionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {fontSize: 25, marginBottom: 15},
  descriptionTet: {
    fontWeight: '400',
    fontSize: 14,
    color: 'gray',
  },
  image: {
    height: 407,
    // backgroundColor: 'red',
    // alignItems: 'center',
    // justifyContent: 'center',

    width: '100%',
    marginTop: 10,
    borderRadius: 40,
    // backgroundColor: 'red',
  },
  button: {padding: 10, borderRadius: 10, elevation: 0},
  quantityContainer: {
    flexDirection: 'row',

    borderWidth: 1,
    paddingVertical: 20,
    marginTop: 10,
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  roundButton: {
    borderWidth: 1,
    height: 25,
    width: 25,
    borderRadius: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingBottom: 20,
    marginTop: 15,
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
  },
  headingSection: {
    width: '90%',
    marginLeft: 10,
    justifyContent: 'space-between',
    // backgroundColor: 'red',

    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSection: {
    width: '8%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  header: {
    height: 50,

    justifyContent: 'center',
    borderBottomWidth: 1,
  },
});
