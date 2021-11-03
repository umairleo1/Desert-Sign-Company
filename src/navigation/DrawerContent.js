import React, {useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';
import {Button, Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

import AuthContext from '../utils/authContext';
import {useNavigation, useTheme} from '@react-navigation/native';

import URL from '../utils/url_path';
import {getUser} from '../service/app.service';
import authStorage from '../utils/authStorage';
import OrderIcon from '../../assets/svgs/OrderIcon';
import TermsIcon from '../../assets/svgs/TermsIcon';

export function DrawerContent(props) {
  const [data, setData] = React.useState();
  // const [profile, setProfile] = React.useState();
  const context = React.useContext(AuthContext);

  const storeProfile = async () => {
    const id = await authStorage.getUserid();

    try {
      const data = await getUser(id);

      context.setProfile(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    storeProfile();
  }, []);

  const navigation = useNavigation();

  const signOut = () => {
    authStorage.removeValue();
    context.setUser('');

    context.setUserID('');
    context.setIsverified('false');
  };
  const {colors} = useTheme();

  const handlePress = async url => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        // justifyContent: 'space-between',
      }}>
      {/* <View> */}
      {/* <StatusBar backgroundColor={colors.profileBcackGround} /> */}
      <View
        style={{
          height: '30%',
          justifyContent: 'center',
          backgroundColor: colors.profileBcackGround,
        }}>
        <View style={styles.imageBackground}>
          <Image
            style={{
              height: 60,
              width: 60,
              resizeMode: 'cover',
              borderRadius: 45,
            }}
            source={{uri: URL.IMAGE_URL + context?.profile?.profilePhoto}}
          />
        </View>
        <View style={{marginLeft: 20}}>
          <Text style={styles.user}>{context?.profile?.fullName}</Text>
          <Text
            onPress={() =>
              navigation.navigate('profileStack', {screen: 'profile'})
            }
            style={styles.profile}>
            View profile
          </Text>
        </View>
      </View>
      {/* <DrawerContentScrollView style={{height: 200}} {...props}> */}
      <View
        style={{
          height: '70%',
          // backgroundColor: 'pink',
          justifyContent: 'space-between',
        }}>
        <View style={{}}>
          <Drawer.Section style={styles.section}>
            <DrawerItem
              labelStyle={{color: colors.placeholder}}
              icon={({color, size}) => <OrderIcon />}
              label="My Orders"
              onPress={() =>
                navigation.navigate('orderStack', {screen: 'Order'})
              }
            />
          </Drawer.Section>
          <Drawer.Section style={styles.section}>
            <DrawerItem
              labelStyle={{color: colors.placeholder}}
              icon={({color, size}) => (
                <Icon
                  name="cart-outline"
                  color={colors.placeholder}
                  size={size}
                />
              )}
              label="My Cart"
              onPress={() =>
                navigation.navigate('homeStack', {screen: 'ShippingCart'})
              }
            />
          </Drawer.Section>
          <Drawer.Section style={styles.section}>
            <DrawerItem
              labelStyle={{color: colors.placeholder}}
              icon={({color, size}) => (
                <SimpleLineIcons
                  name="handbag"
                  color={colors.placeholder}
                  size={size}
                />
              )}
              onPress={() =>
                navigation.navigate('savedStack', {screen: 'Saved'})
              }
              label="Saved Items"
            />
          </Drawer.Section>
          <Drawer.Section style={styles.section}>
            <DrawerItem
              labelStyle={{color: colors.placeholder}}
              icon={({color, size}) => (
                <Icon
                  name="help-circle-outline"
                  color={colors.placeholder}
                  size={size}
                />
              )}
              label="Help and Support"
              // onPress={() => {props.navigation.navigate('SupportScreen')}}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.section}>
            <DrawerItem
              labelStyle={{color: colors.placeholder}}
              icon={({color, size}) => (
                // <Icon
                //   name="account-check-outline"
                //   color={colors.placeholder}
                //   size={size}
                // />
                <TermsIcon />
              )}
              label="Terms and Condition"
              onPress={() => handlePress('https://google.com')}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.section}>
            <DrawerItem
              labelStyle={{color: colors.placeholder}}
              icon={({color, size}) => (
                <Icon
                  name="content-copy"
                  color={colors.placeholder}
                  size={size}
                />
              )}
              label="Privcy and Policy"
              // onPress={() => {props.navigation.navigate('SupportScreen')}}
            />
          </Drawer.Section>
          {/* <View style={{backgroundColor: 'yellow'}}>
          <Button onPress={() => signOut()} color="red">
            Sign out
          </Button>
          <View style={{position: 'absolute', left: 70, top: 5}}>
            <FeatherIcon
              name="log-out"
              // onPress={() => signOut()}
              style={{color: 'red', fontSize: 25}}
            />
          </View>
        </View> */}
        </View>
        {/* </View> */}
        <View style={{marginBottom: 10}}>
          <Button onPress={() => signOut()} color="red">
            Sign out
          </Button>
          <View style={{position: 'absolute', left: 70, top: 5}}>
            <FeatherIcon
              name="log-out"
              // onPress={() => signOut()}
              style={{color: 'red', fontSize: 25}}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    // flex: 1,
    // marginTop: -5,
  },

  imageBackground: {
    height: 64,
    width: 64,
    marginTop: 40,
    marginLeft: 20,

    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',

    borderColor: 'white',
    borderWidth: 3,
    // backgroundColor: 'reds',
  },
  user: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
    marginVertical: 8,
  },
  profile: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    // marginTop: 3,
  },
  section: {
    // height: 50,
  },
});
