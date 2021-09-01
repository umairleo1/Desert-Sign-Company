import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AuthNavigator from './src/navigation/AuthNavigator';
import AuthContext from './src/utils/authContext';
import {useNavigation, useTheme} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import AppNavigator from './src/navigation/AppNavigator';

import authStorage from './src/utils/authStorage';
import {Button} from 'react-native-paper';
// import Appnavigator from './src/navigation/AppNavigator';

export default function App() {
  // const context = React.useContext(AuthContext);
  const signout = () => {
    authStorage.removeValue();
    setUser('');
    setUserID('');
    setIsverified('false');
  };
  const restoreUser = async () => {
    const userToken = await authStorage.getToken();
    const verified = await authStorage.getIsVerified();
    const id = await authStorage.getUserid();
    console.log(verified, id, user, '===========');
    setIsverified(verified);
    if (userToken) setUser(userToken);
    // setFlag(true);
    // console.log('fuck', {user});
  };
  const [user, setUser] = React.useState();
  const [isVerified, setIsverified] = React.useState();
  const [userid, setUserID] = React.useState();
  useEffect(() => {
    SplashScreen.hide();

    setUser();
    console.log('userrrr,', user);
    restoreUser();
  }, []);
  const {colors} = useTheme();
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        style={{backgroundColor: colors.background}}
      />
      <AuthContext.Provider
        value={{
          user,
          setUser,
          userid,
          setUserID,
          isVerified,
          setIsverified,
        }}>
        {user && isVerified == 'true' ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <Text>Desert Sign</Text>
            <Button
              color={'red'}
              onPress={() => signout()}
              style={{marginTop: 20, padding: 10, borderRadius: 10}}
              labelStyle={{color: colors.background}}
              mode="contained">
              signOut
            </Button>
          </View>
        ) : (
          // <AppNavigator />
          <AuthNavigator />
        )}
      </AuthContext.Provider>
      {/* {console.log('user', user)} */}
      <FlashMessage position="top" />
    </>
  );
}

const styles = StyleSheet.create({});
