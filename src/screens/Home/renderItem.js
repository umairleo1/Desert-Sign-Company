import {useTheme, useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector, useDispatch, connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';

import {deleteItem, setSavedItem} from '../../store/reducers/savedItem';
import URL from '../../utils/url_path';

const renderItem = item => {
  const {colors} = useTheme();
  const [isSave, setIsSave] = React.useState(false);
  const [savedID, setSavedID] = React.useState();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const savedItem = useSelector(state => state.savedItem.data);

  const handleSave = id => {
    const found = savedItem.findIndex(val => val?._id == id);

    if (found < 0) {
      dispatch(setSavedItem(item.item));
    } else if (found >= 0) {
      dispatch(deleteItem(id));
    }
  };

  const getName = () => {
    let arr = [];

    for (let i = 0; i < savedItem.length; i++) {
      if (savedItem[i]._id == item.item._id) {
        arr.push(item.item._id);
      }
    }
    setSavedID(arr);
  };

  useEffect(() => {
    getName();
  }, [savedItem]);
  // console.log(URL.IMAGE_URL + item?.item.image, 'iamgeURl');
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('homeStack', {
          screen: 'Description',
          params: {
            data: item.item,
            saved: savedID?.includes(item?.item?._id)
              ? 'ios-bookmark'
              : 'ios-bookmark-outline',
          },
        })
      }>
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

              <Ionicons
                onPress={() => handleSave(item?.item?._id)}
                style={styles.icon}
                name={
                  // getName()
                  // console.log(elemant, 'eeee');

                  savedID?.includes(item?.item?._id)
                    ? 'ios-bookmark'
                    : 'ios-bookmark-outline'
                }
              />
            </View>
          </View>
          {/* </ScrollView> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: '28%',
    alignItems: 'center',

    height: 102,
    // backgroundColor: 'red',
  },
  contentContainer: {
    width: '70%',

    flexDirection: 'row',
  },
  descriptionContainer: {
    width: '80%',
    marginLeft: 8,
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
});

export default renderItem;
