import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import AppIcon from '../../../svgs/AppIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import {showMessage, hideMessage} from 'react-native-flash-message';

import {verifyOTP, resendOTP} from '../../service/auth.service';
import authStorage from '../../utils/authStorage';
import AuthContext from '../../utils/authContext';

export default function Otp() {
  const [otp, setOtp] = React.useState('');
  const [id, setId] = React.useState();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const context = React.useContext(AuthContext);
  const getID = async () => {
    const id_ = await authStorage.getUserid();
    setId(id_);
  };
  React.useEffect(() => {
    // const id = authStorage.getUserid()
    getID();
  });
  const hadleVerify = async () => {
    try {
      const result = await verifyOTP(otp, id);
      // console.log(result);
      if (result.status == 200) {
        authStorage.setIsVerified('true');
        context.setIsverified('true');
        // authStorage.setIsVerified('true');
        showMessage({
          message: 'Verified',
          type: 'success',
        });
        // navigation.navigate('Login');
      }
    } catch (e) {
      console.log(e);
      showMessage({
        message: e.errMsg,
        type: 'warning',
      });
    }
  };
  const resend = async () => {
    try {
      const result = await resendOTP(id);
      // console.log(result, 'fuckoff');
      showMessage({
        message: result.message,
        type: 'success',
      });

      // console.log(result);
    } catch (e) {
      showMessage({
        message: e.errMsg,
        type: 'info',
      });
    }
  };
  return (
    <SafeAreaView style={{paddingHorizontal: 10}}>
      <View style={{paddingVertical: 10}}>
        <AppIcon />
      </View>

      <Text style={[styles.title, {color: colors.secondary}]}>Confirm OTP</Text>
      <Text style={{fontSize: 16}}>
        Please confirm your OTP passcode to continue
      </Text>
      <View style={{alignItems: 'center'}}>
        <OTPInputView
          style={{width: '80%', height: 200}}
          pinCount={4}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            setOtp(code);
          }}
        />
      </View>
      <Button
        color={colors.button}
        onPress={() => hadleVerify()}
        style={{marginTop: 20, padding: 10}}
        labelStyle={{color: colors.background}}
        mode="contained">
        submit
      </Button>
      <View style={{marginTop: 10}}>
        <Button onPress={() => resend()} color={colors.signupButton}>
          Resend OTP
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 1,
    borderBottomWidth: 1,
    color: '#000',
  },

  underlineStyleHighLighted: {
    borderColor: '#000',
  },
  title: {
    fontSize: 32,
    marginTop: 15,
  },
});
