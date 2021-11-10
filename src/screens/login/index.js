import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from 'react-native-paper';
import CheckBox from 'react-native-check-box';
import jwtDecode from 'jwt-decode';
import {showMessage, hideMessage} from 'react-native-flash-message';

import AppIcon from '../../../assets/svgs/AppIcon';
import {logIn} from '../../service/auth.service';
import authStorage from '../../utils/authStorage';
import AuthContext from '../../utils/authContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function index() {
  const [email, setEmail] = React.useState('');
  const [isFocus, setIsFoucus] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [secure, setSecure] = React.useState(true);
  const {colors} = useTheme();
  const navigation = useNavigation();
  const context = React.useContext(AuthContext);

  const handleLogIn = async () => {
    try {
      setLoading(true);
      Keyboard.dismiss();
      const result = await logIn(email, password, '3232', 'Customer');
      // console.log('response    == ', result);

      if (result.message === 'You are not verified.') {
        authStorage.storeUserid(result?.data?._id);
        navigation.navigate('Otp');
        setLoading(false);
        setPassword('');
        setEmail('');
      } else {
        authStorage.storeToken(result?.data?.token);
        const token = jwtDecode(result?.data?.token);
        context.setUser(token);
        context.setIsverified('true');
        authStorage.setIsVerified('true');
        authStorage.storeUserid(result?.data?._id);
        showMessage({
          message: result.message,
          type: 'success',
        });
        setPassword('');
        setEmail('');
        setLoading(false);
      }
    } catch (e) {
      showMessage({
        message: e.errMsg,
        type: 'warning',
      });
      setLoading(false);
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
    <SafeAreaView style={{paddingHorizontal: 15}} edges={['top', 'left']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            <View style={{paddingTop: 10}}>
              <AppIcon />
            </View>
            <Text style={[styles.title, {color: colors.secondary}]}>Login</Text>
            <View style={styles.testHolder}>
              <Text style={{fontSize: 16}}>User Name</Text>
              <TextInput
                style={[isFocus == '1' ? styles.focusInput : styles.input]}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder="Enter your User Name"
                //   keyboardType="numeric"
                placeholderTextColor={'gray'}
                onFocus={() => handleonFocus('1')}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.testHolder}>
              <Text style={{fontSize: 16}}>Password</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                  autoCapitalize="none"
                  style={[
                    isFocus == '2' ? styles.focusInput : styles.input,
                    {flex: 1},
                  ]}
                  onChangeText={text => {
                    setPassword(text);
                  }}
                  value={password}
                  placeholder="Enter your password"
                  //   keyboardType="numeric"
                  placeholderTextColor={'gray'}
                  onFocus={() => handleonFocus('2')}
                  onBlur={() => setIsFoucus(false)}
                  secureTextEntry={secure}
                />
                <Icon
                  onPress={() => (secure ? setSecure(false) : setSecure(true))}
                  style={{position: 'absolute', right: 15, fontSize: 20}}
                  name={secure ? 'eye-off-outline' : 'eye-outline'}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                //   backgroundColor: 'red',
              }}>
              {/* <View style={styles.remember}> */}
              {/* <Checkbox status="checked" /> */}
              {/* <View>
              <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={() => {
                  toggleCheckBox
                    ? setToggleCheckBox(false)
                    : setToggleCheckBox(true);
                }}
                isChecked={toggleCheckBox}
                // leftText={'CheckBox'}
                checkBoxColor={'white'}
                checkedCheckBoxColor={'black'}
                uncheckedCheckBoxColor={'black'}
              />
            </View> */}
              {/* <Text style={{marginRight: 5}}>Remember me</Text> */}
              {/* </View> */}
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',

                  width: '100%',
                }}>
                <Text
                  style={[{color: colors.signupButton}, styles.buttonText]}
                  onPress={() => navigation.navigate('ForgotPass')}>
                  Forgot password?
                </Text>
              </View> */}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{zIndex: -1, width: '100%'}}>
                <Button
                  color={colors.button}
                  onPress={() => handleLogIn()}
                  style={styles.button}
                  labelStyle={{color: colors.background}}
                  mode="contained"
                  disabled={loading}>
                  Sign in
                </Button>
              </View>
              {loading && (
                <ActivityIndicator
                  animating={true}
                  color={'white'}
                  style={{position: 'absolute', top: 35, left: 100}}
                />
              )}
            </View>

            {/* <View style={styles.createAccount}>
              <Text style={{color: 'gray', fontSize: 15}}>
                Dont have an account?
              </Text>
              <Text
                onPress={() => navigation.navigate('SignUp')}
                style={[
                  {color: colors.signupButton, marginLeft: 15, fontSize: 15},
                  styles.buttonText,
                ]}>
                Create account
              </Text>
            </View> */}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    marginVertical: 10,
    fontWeight: '700',
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
  buttonText: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,

    elevation: 0,
    // width: '100%',
  },
});
