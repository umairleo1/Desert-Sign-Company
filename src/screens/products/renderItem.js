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
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch, connect} from 'react-redux';
import URL from '../../utils/url_path';

const renderItem = item => {
  const [isImageLoaded, setisImageLoaded] = React.useState();

  // console.log(URL.IMAGE_URL + item?.item.image, 'iamgeURl');
  return (
    <TouchableWithoutFeedback>
      <View style={{}}>
        <View style={styles.container}>
          {/* <ScrollView> */}

          <View style={styles.imageContainer}>
            <Image
              style={{height: 102, width: '100%', borderRadius: 10}}
              source={{
                uri: URL.IMAGE_URL + item?.item?.image,
              }}
              defaultSource={require('../../../assets/noImage.png')}
              onLoadStart={() => setisImageLoaded(false)}
              onLoadEnd={() => setisImageLoaded(true)}
              resizeMode="cover"
            />
            <ActivityIndicator
              style={{
                display: isImageLoaded ? 'none' : 'flex',
                position: 'absolute',
              }}
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
    justifyContent: 'center',
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

export default renderItem;
