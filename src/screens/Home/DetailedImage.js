import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Entypo from 'react-native-vector-icons/Entypo';
import URL from '../../utils/url_path';

export default function DetailedImage() {
  const navigation = useNavigation();
  const route = useRoute();
  // console.log(route.params.image, 'img');
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
        opacity: 0.8,
        paddingHorizontal: 15,
      }}>
      <View style={{marginTop: 15}}>
        <Entypo
          onPress={() => navigation.goBack()}
          style={{color: 'white', fontSize: 40}}
          name="cross"
        />
      </View>
      <View>
        <Image
          style={{height: '90%', width: '100%', borderRadius: 10}}
          source={{
            uri: route.params.image
              ? URL.IMAGE_URL + route.params.image
              : 'https://media.pakprice.pk//test/tdT1cKbjNy8NBZJdI06z8rZD80siDDeRAEFCyRrI.png',
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
