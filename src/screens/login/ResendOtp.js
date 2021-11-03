import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import AppIcon from '../../../assets/svgs/AppIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Button, ActivityIndicator} from 'react-native-paper';
import {showMessage, hideMessage} from 'react-native-flash-message';

import {
  verifyOTP,
  resendOTPReset,
  updatePassword,
} from '../../service/auth.service';
import authStorage from '../../utils/authStorage';

export default function Otp() {
  const [otp, setOtp] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [id, setId] = React.useState();
  const [password, setPassword] = useState();
  const [matchPassword, setMatchPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = useState();
  const [isFocus, setIsFoucus] = React.useState('');
  const {colors} = useTheme();
  const navigation = useNavigation();
  const verifyConfirmPass = () => {
    if (confirmPassword != password) {
      setMatchPassword(true);
    } else {
      setMatchPassword(false);
    }
  };
  const getID = async () => {
    const id_ = await authStorage.getUserid();
    // console.log(id_), 'idddd';
    setId(id_);
  };
  React.useEffect(() => {
    // const id = authStorage.getUserid()
    getID();
  });
  const hadleVerify = async () => {
    try {
      setLoading(true);
      const result = await updatePassword(otp, id, password);
      console.log(result);
      if (result.status == 200) {
        showMessage({
          message: 'Password Updated',
          type: 'success',
        });
        setLoading(false);
        navigation.navigate('Login');
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
      const result = await resendOTPReset(id);
      showMessage({
        message: result.message,
        type: 'success',
      });

      //   console.log(result);
    } catch (e) {
      showMessage({
        message: e.errMsg,
        type: 'info',
      });
    }
  };
  const handleonFocus = id => {
    switch (id) {
      case '1':
        // setEnableShift(false);
        setIsFoucus('1');

        break;
      case '2':
        // setEnableShift(false);
        setIsFoucus('2');
        break;

      default:
      // code block
    }
  };
  return (
    <SafeAreaView style={{paddingHorizontal: 15}}>
      <View style={{paddingVertical: 10}}>
        <AppIcon />
      </View>

      <Text style={[styles.title, {color: colors.secondary}]}>
        Create password
      </Text>
      <Text style={{fontSize: 16}}>
        To continue on Desert Sign, you must create a password.
      </Text>
      <Text style={{fontSize: 16, marginTop: 20}}>OTP</Text>
      <View style={{alignItems: 'center'}}>
        <OTPInputView
          style={{width: '80%', height: 70}}
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
      <View style={styles.testHolder}>
        <Text style={{fontSize: 16}}>Password</Text>
        <TextInput
          style={[isFocus == '1' ? styles.focusInput : styles.input]}
          onChangeText={text => setPassword(text)}
          value={password}
          placeholder="Enter your new password"
          //   keyboardType="numeric"
          placeholderTextColor="gray"
          secureTextEntry={true}
          onFocus={() => handleonFocus('1')}
        />
      </View>
      <View style={styles.testHolder}>
        <Text style={{fontSize: 16}}>Confirm Password</Text>

        <TextInput
          style={[isFocus == '2' ? styles.focusInput : styles.input]}
          onChangeText={text => {
            setConfirmPassword(text);
          }}
          value={confirmPassword}
          placeholder="Confirm your Password"
          //   keyboardType="numeric"
          placeholderTextColor="gray"
          secureTextEntry={true}
          onFocus={() => handleonFocus('2')}
          onBlur={() => verifyConfirmPass()}
        />

        {matchPassword && (
          <Text style={{color: 'red', padding: 5, paddingTop: 0}}>
            Password not match
          </Text>
        )}
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <View style={{zIndex: -1, width: '100%'}}>
          <Button
            color={colors.button}
            onPress={() => hadleVerify()}
            style={styles.button}
            labelStyle={{color: colors.background}}
            mode="contained">
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
    width: 40,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 1,
    borderBottomWidth: 1,
    color: '#000',
  },

  underlineStyleHighLighted: {
    borderColor: '#7EC043',
  },
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
