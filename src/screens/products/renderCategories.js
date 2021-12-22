import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import URL from '../../utils/url_path';
import AuthContext from '../../utils/authContext';

export default function RenderCategory(item) {
  const navigation = useNavigation();
  const authContext = React.useContext(AuthContext);
  const data = item?.item;
  // const [isImageLoaded, setisImageLoaded] = React.useState();
  // console.log(authContext.userid, 'ghghrth');
  return (
    <View
      style={{
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('CategoryProduct', {data: data})}>
        <ImageBackground
          style={{
            height: 150,
            width: 150,
            opacity: 0.9,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          imageStyle={{borderRadius: 12}}
          source={{
            uri: URL.IMAGE_URL + data?.categoryImage,
          }}
          defaultSource={require('../.././../assets/noImage.png')}
          // onLoadStart={() => setisImageLoaded(false)}
          // onLoadEnd={() => setisImageLoaded(true)}
        >
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
      </TouchableOpacity>
      {/* <ActivityIndicator
        style={{
          display: isImageLoaded ? 'none' : 'flex',
          position: 'absolute',
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({});
