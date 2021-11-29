import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useIsFocused} from '@react-navigation/native';
import {useTheme, useNavigation} from '@react-navigation/native';

export default function orderDetailsCard(item) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  // console.log('xxxx ', item.item.product);
  return (
    <View style={{}}>
      {isFocused && (
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      )}
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={{height: 102, width: '100%', borderRadius: 10}}
            source={{
              uri: 'https://media.pakprice.pk//test/tdT1cKbjNy8NBZJdI06z8rZD80siDDeRAEFCyRrI.png',
            }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.title}>{item.item.product.name}</Text>
            <Text style={[styles.descriptionText]}>
              {item.item.product.description}
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={[styles.descriptionText, {fontWeight: '300'}]}>
              AED {item.item.price}{' '}
            </Text>
            <Text style={[styles.descriptionText, {fontWeight: '300'}]}>
              x {item.item.quantity}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  imageContainer: {
    width: '28%',
    alignItems: 'center',
    // height: 102,
    justifyContent: 'center',
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
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'SourceSansPro-Regular',
  },
  descriptionText: {
    fontFamily: 'SourceSansPro-Regular',
    fontWeight: '400',
    fontSize: 14,
    color: 'gray',
    marginTop: 10,
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
