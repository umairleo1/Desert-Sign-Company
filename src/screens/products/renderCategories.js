import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import URL from '../../utils/url_path';

export default function RenderCategory(item) {
  const navigation = useNavigation();
  const data = item?.item;
  //   console.log(data, 'ghghrth');
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CategoryProduct', {data: data})}>
      <View style={{marginBottom: 5}}>
        <ImageBackground
          style={{
            height: 150,
            width: 150,
            opacity: 0.9,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth: 0.2,
            // borderRadius: 10,
            // overflow: 'hidden',
          }}
          imageStyle={{borderRadius: 12}}
          source={{
            uri: data?.categoryImage
              ? URL.IMAGE_URL + data?.categoryImage
              : 'https://media.pakprice.pk//test/tdT1cKbjNy8NBZJdI06z8rZD80siDDeRAEFCyRrI.png',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            {data?.name}
          </Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
