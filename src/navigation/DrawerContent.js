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

import AwesomeAlert from 'react-native-awesome-alerts';
import FeatherIcon from 'react-native-vector-icons/Feather';

import AuthContext from '../utils/authContext';
import {useNavigation, useTheme} from '@react-navigation/native';

import URL from '../utils/url_path';
import {getUser} from '../service/app.service';
import authStorage from '../utils/authStorage';
import OrderIcon from '../../assets/svgs/OrderIcon';
import TermsIcon from '../../assets/svgs/TermsIcon';
import Privacy from '../../assets/svgs/privacy';

export function DrawerContent(props) {
  const navigation = useNavigation();
  const {colors} = useTheme();

  const [showAlertSignOut, setShowAlertSignOut] = React.useState(false);
  const context = React.useContext(AuthContext);

  React.useEffect(() => {
    storeProfile();
  }, []);

  const storeProfile = async () => {
    const id = await authStorage.getUserid();
    try {
      const data = await getUser(id);
      context.setProfile(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const signOut = () => {
    authStorage.removeValue();
    context.setUser('');
    context.setUserID('');
    context.setIsverified('false');
  };

  const handlePress = async url => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
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
      }}>
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

      <View
        style={{
          height: '70%',
          justifyContent: 'space-between',
        }}>
        <View>
          <Drawer.Section style={styles.section}>
            <DrawerItem
              labelStyle={{color: colors.placeholder}}
              icon={({color, size}) => <OrderIcon />}
              label="Orders"
              onPress={() => navigation.navigate('ordersStack')}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.section}>
            <DrawerItem
              labelStyle={{color: colors.placeholder}}
              icon={({color, size}) => <TermsIcon />}
              label="Consignments"
              onPress={() => navigation.navigate('consignmentStack')}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.section}>
            <DrawerItem
              labelStyle={{color: colors.placeholder}}
              icon={({color, size}) => <OrderIcon />}
              label="Products"
              onPress={() => navigation.navigate('productsStack')}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.section}>
            <DrawerItem
              labelStyle={{color: colors.placeholder}}
              icon={({color, size}) => <Privacy />}
              label="Vehicles"
              onPress={() => navigation.navigate('vehiclesStack')}
            />
          </Drawer.Section>
        </View>

        <View style={{marginBottom: 20}}>
          <Button onPress={() => setShowAlertSignOut(true)} color="#FF523F">
            Sign out
          </Button>
          <View style={{position: 'absolute', left: 70, top: 5}}>
            <FeatherIcon
              name="log-out"
              style={{color: '#FF523F', fontSize: 25}}
            />
          </View>
        </View>
      </View>
      <AwesomeAlert
        show={showAlertSignOut}
        showProgress={false}
        title="Sign out"
        message="Are you sure you want to Sign out?"
        closeOnTouchOutside={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No"
        confirmText="Yes"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => setShowAlertSignOut(false)}
        onConfirmPressed={signOut}
        contentContainerStyle={{
          borderRadius: 20,
          width: '100%',
          paddingHorizontal: 0,
        }}
        titleStyle={{
          fontFamily: 'SourceSansPro-Regular',
          fontSize: 16,
          color: '#3D3D3D',
          opacity: 0.5,
        }}
        messageStyle={{
          fontFamily: 'SourceSansPro-Regular',
          fontSize: 14,
          color: '#3D3D3D',
          opacity: 1,
        }}
        cancelButtonStyle={{
          height: 34,
          width: 109,
          alignItems: 'center',
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: '#FF523F',
        }}
        cancelButtonTextStyle={{color: '#FF523F'}}
        confirmButtonStyle={{
          height: 34,
          width: 109,
          alignItems: 'center',
          backgroundColor: '#FF523F',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
});
