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
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch, connect} from 'react-redux';
import URL from '../../utils/url_path';

const renderSearch = item => {
  const {colors} = useTheme();
  const [isSave, setIsSave] = React.useState(false);
  const [savedID, setSavedID] = React.useState();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // console.log(URL.IMAGE_URL + item?.item.image, 'iamgeURl');
  return (
    <TouchableOpacity>
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
              resizeMode="cover"
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
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  fontFamily: 'SourceSansPro-Regular',
                  fontStyle: 'normal',
                }}>
                AED {item.item.price}
              </Text>
            </View>
          </View>
          {/* </ScrollView> */}
        </View>
      </View>
    </TouchableOpacity>
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
    width: '75%',
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
    fontFamily: 'SourceSansPro-Regular',
    fontStyle: 'normal',
    lineHeight: 22,
  },
  descriptionText: {
    fontWeight: '400',
    fontSize: 15,
    color: 'gray',
    fontFamily: 'SourceSansPro-Regular',
    lineHeight: 22,
    marginTop: 5,
  },
});

export default renderSearch;
