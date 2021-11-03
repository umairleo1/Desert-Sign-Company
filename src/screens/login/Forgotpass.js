import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, TextInput, Keyboard} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, ActivityIndicator} from 'react-native-paper';
import {showMessage, hideMessage} from 'react-native-flash-message';

import AppIcon from '../../../assets/svgs/AppIcon';
import {verifyOTP, resendOTP, forgetPassword} from '../../service/auth.service';
import authStorage from '../../utils/authStorage';
import AuthContext from '../../utils/authContext';

export default function index() {
  const [email, setEmail] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [isFocus, setIsFoucus] = React.useState(false);
  const {colors} = useTheme();
  const navigation = useNavigation();
  const context = React.useContext(AuthContext);
  const forgotPass = async () => {
    try {
      setLoading(true);
      const result = await forgetPassword(email);
      console.log(result.data._id, 'forgot pass');
      const id = result?.data?._id;
      authStorage.storeUserid(id);
      context.setUserID(id);
      authStorage.storeToken(result?.data?.token);
      context.setUser(result?.data?.token);
      setLoading(false);

      showMessage({
        message: result.message,
        type: 'success',
      });
      navigation.navigate('ForgotOtp');

      // console.log(result);
    } catch (e) {
      setLoading(false);
      if (email == undefined || email == '') {
        showMessage({
          message: 'Email field must not be empty',
          type: 'warning',
        });
      } else {
        showMessage({
          message: e.errMsg,
          type: 'info',
        });
      }
    }
  };

  return (
    <SafeAreaView style={{paddingHorizontal: 15}} edges={['top', 'left']}>
      <View onPress={() => Keyboard.dismiss()}>
        <View style={{paddingVertical: 10}}>
          <AppIcon />
        </View>
        <Text style={[styles.title, {color: colors.secondary}]}>
          Forgot Password
        </Text>
        <View style={styles.testHolder}>
          <Text style={{fontSize: 16}}>Email</Text>
          <TextInput
            style={[isFocus ? styles.focusInput : styles.input]}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="Enter your email address"
            //   keyboardType="numeric"
            placeholderTextColor={'gray'}
            onFocus={() => setIsFoucus(true)}
            onBlur={() => setIsFoucus(false)}
            autoCapitalize="none"
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{zIndex: -1, width: '100%'}}>
            <Button
              color={colors.button}
              onPress={() => forgotPass()}
              style={styles.button}
              labelStyle={{color: colors.background}}
              mode="contained"
              disabled={loading}>
              Send OTP
            </Button>
            {loading && (
              <ActivityIndicator
                animating={true}
                color={'white'}
                style={{position: 'absolute', top: 35, left: 90}}
              />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    marginTop: 15,
  },
  input: {
    height: 45,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  testHolder: {
    marginTop: 10,
  },
  remember: {
    marginTop: 10,
    flexDirection: 'row',
    // backgroundColor: 'yellow',
    alignItems: 'center',
    paddingBottom: 12,
  },
  createAccount: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusInput: {
    borderColor: '#7EC043',
    height: 45,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});
