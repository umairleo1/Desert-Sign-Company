import {useTheme, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useSelector, useDispatch} from 'react-redux';

import {
  incrimentQuantity,
  decrimentQuantity,
  deleteItem,
} from '../../store/reducers/cart';
import URL from '../../utils/url_path';

const renderItem = item => {
  const [count, setCount] = React.useState(0);
  const {colors} = useTheme();
  const [isSave, setIsSave] = React.useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // console.log(item.item, 'dataaa');
  return (
    <TouchableWithoutFeedback
    //   onPress={() =>
    //     navigation.navigate('homeStack', {
    //       screen: 'Description',
    //       params: {data: item.item},
    //     })
    //   }
    >
      <View style={{}}>
        <View style={styles.container}>
          {/* <ScrollView> */}
          <View style={styles.imageContainer}>
            <Image
              style={{height: 102, width: '100%', borderRadius: 10}}
              source={{
                uri: item?.item?.image
                  ? URL.IMAGE_URL + item?.item?.image
                  : 'https://media.pakprice.pk//test/tdT1cKbjNy8NBZJdI06z8rZD80siDDeRAEFCyRrI.png',
              }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.title}>{item?.item?.name}</Text>
              <Text style={[styles.descriptionText]}>
                {item?.item?.description}
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <Text>$ {item.item.price}</Text>
              {/* <Ionicons
                onPress={() => (isSave ? setIsSave(false) : setIsSave(true))}
                style={styles.icon}
                name={isSave ? 'ios-bookmark' : 'ios-bookmark-outline'}
              /> */}
            </View>
          </View>
          {/* </ScrollView> */}
        </View>
        <View
          style={[
            styles.quantityContainer,
            // {borderColor: colors.headerBottom},
          ]}>
          <Text style={{fontSize: 14, fontWeight: '600', marginLeft: 10}}>
            Quantity
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: 150,
              marginRight: 15,
              justifyContent: 'space-around',
            }}>
            <Text
              style={styles.remove}
              onPress={() => dispatch(deleteItem(item?.item?._id))}>
              Remove
            </Text>
            <EvilIcons
              onPress={() => dispatch(decrimentQuantity(item?.item?._id))}
              style={{fontSize: 30}}
              name="minus"
            />
            <View style={{width: 30, alignItems: 'center'}}>
              <Text> {item?.item?.count}</Text>
            </View>
            {/* <View style={styles.roundButton}> */}
            <EvilIcons
              style={{fontSize: 30}}
              name="plus"
              onPress={() => dispatch(incrimentQuantity(item?.item?._id))}
            />
            {/* </View> */}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  imageContainer: {
    // backgroundColor: 'red',
    width: '28%',
    alignItems: 'center',
    height: 102,
  },
  contentContainer: {
    width: '70%',
    // backgroundColor: 'yellow',
    flexDirection: 'row',
  },
  descriptionContainer: {
    width: '80%',
    marginLeft: 8,
    // backgroundColor: 'green',
  },
  icon: {fontSize: 25, marginBottom: 15},
  priceContainer: {
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  descriptionText: {
    fontWeight: '400',
    fontSize: 15,
    color: 'gray',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',

    // borderWidth: 1,
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
  remove: {
    color: 'red',
    marginRight: 10,
  },
});
export default renderItem;
