import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from 'react-native-paper';
import {showMessage, hideMessage} from 'react-native-flash-message';

import AppIcon from '../../../svgs/AppIcon';
import {verifyOTP, resendOTP, forgetPassword} from '../../service/auth.service';
import authStorage from '../../utils/authStorage';
import AuthContext from '../../utils/authContext';

export default function index() {
  const [email, setEmail] = React.useState();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const context = React.useContext(AuthContext);
  const forgotPass = async () => {
    try {
      const result = await forgetPassword(email);
      console.log(result.data._id, 'forgot pass');
      const id = result?.data?._id;
      authStorage.storeUserid(id);
      context.setUserID(id);
      authStorage.storeToken(result?.data?.token);
      context.setUser(result?.data?.token);

      showMessage({
        message: result.message,
        type: 'success',
      });
      navigation.navigate('ForgotOtp');

      // console.log(result);
    } catch (e) {
      showMessage({
        message: e.errMsg,
        type: 'info',
      });
    }
  };

  return (
    <SafeAreaView style={{paddingHorizontal: 10}} edges={['top', 'left']}>
      <View style={{paddingVertical: 10}}>
        <AppIcon />
      </View>
      <Text style={[styles.title, {color: colors.secondary}]}>
        Forgot Password
      </Text>
      <View style={styles.testHolder}>
        <Text style={{fontSize: 16}}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="Enter your email address"
          //   keyboardType="numeric"
          placeholderTextColor={'gray'}
        />
      </View>

      <Button
        color={colors.button}
        onPress={() => forgotPass()}
        style={{marginTop: 20, padding: 10}}
        labelStyle={{color: colors.background}}
        mode="contained">
        Send OTP
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    marginTop: 15,
  },
  input: {
    height: 40,
    margin: 12,
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
});
