import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import AppIcon from '../../../assets/svgs/AppIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Button, ActivityIndicator} from 'react-native-paper';
import {showMessage, hideMessage} from 'react-native-flash-message';

import {verifyOTP, resendOTP} from '../../service/auth.service';
import authStorage from '../../utils/authStorage';
import AuthContext from '../../utils/authContext';

export default function Otp() {
  const [otp, setOtp] = React.useState('');
  const [id, setId] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [loadingResend, setLoadingResend] = React.useState(false);
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
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault(); // Prevent default action
      unsubscribe(); // Unsubscribe the event on first call to prevent infinite loop
      navigation.navigate('Login'); // Navigate to your desired screen
    });
  });
  const hadleVerify = async () => {
    try {
      setLoading(true);
      const result = await verifyOTP(otp, id);
      // console.log(result);
      if (result.status == 200) {
        authStorage.setIsVerified('true');
        context.setIsverified('true');
        // authStorage.setIsVerified('true');
        setLoading(false);
        showMessage({
          message: 'Verified',
          type: 'success',
        });
        // navigation.navigate('Login');
      }
    } catch (e) {
      // console.log(e);
      setLoading(false);
      showMessage({
        message: e.errMsg,
        type: 'warning',
      });
    }
  };
  const resend = async () => {
    try {
      setLoadingResend(true);
      console.log(id, 'here is id');
      const result = await resendOTP(id);
      setLoadingResend(false);
      // console.log(result, 'fuckoff');
      showMessage({
        message: result.message,
        type: 'success',
      });

      // console.log(result);
    } catch (e) {
      setLoadingResend(false);
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
      <Text
        style={{
          fontSize: 16,
          marginTop: 15,
          fontWeight: '400',
        }}>
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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{zIndex: -1, width: '100%'}}>
          <Button
            color={colors.button}
            onPress={() => hadleVerify()}
            style={styles.button}
            labelStyle={{color: colors.background}}
            mode="contained"
            disabled={loading}>
            submit
          </Button>
          {loading && (
            <ActivityIndicator
              animating={true}
              color={'white'}
              style={{position: 'absolute', top: 35, left: 100}}
            />
          )}
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <View style={{zIndex: -1, width: '100%'}}>
          <Button
            uppercase={false}
            disabled={loading}
            onPress={() => resend()}
            color={colors.signupButton}>
            Resend OTP
          </Button>
          {loadingResend && (
            <ActivityIndicator
              animating={true}
              color={'black'}
              style={{position: 'absolute', top: 8, left: 80}}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 40,
    height: 45,
    borderRadius: 10,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
    borderRadius: 10,
  },

  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderBottomWidth: 1,
    color: '#000',
    borderRadius: 10,
  },

  underlineStyleHighLighted: {
    borderColor: '#7EC043',
  },
  title: {
    fontSize: 32,
    marginTop: 15,
  },
  button: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
});
