import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from 'react-native-paper';
import CheckBox from 'react-native-check-box';
import jwtDecode from 'jwt-decode';
import {showMessage, hideMessage} from 'react-native-flash-message';

import AppIcon from '../../../svgs/AppIcon';
import {logIn} from '../../service/auth.service';
import authStorage from '../../utils/authStorage';
import AuthContext from '../../utils/authContext';
import Otp from './Otp';

export default function index() {
  const [toggleCheckBox, setToggleCheckBox] = React.useState(true);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const context = React.useContext(AuthContext);
  const handleLogIn = async () => {
    try {
      const result = await logIn(email, password, '3232', 'Customer');
      console.log('res', result.status);

      toggleCheckBox ? authStorage.storeToken(result?.data?.token) : null;
      const token = jwtDecode(result?.data?.token);
      context.setUser(token);
      context.setIsverified('true');
      authStorage.setIsVerified('true');
      showMessage({
        message: result.message,
        type: 'success',
      });
    } catch (e) {
      e.errMsg === 'You are not verified.' ? navigation.navigate('Otp') : null;
      showMessage({
        message: e.errMsg,
        type: 'warning',
      });
    }
  };
  return (
    <SafeAreaView style={{paddingHorizontal: 10}} edges={['top', 'left']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{paddingTop: 10}}>
          <AppIcon />
        </View>
        <Text style={[styles.title, {color: colors.secondary}]}>Login</Text>
        <View style={styles.testHolder}>
          <Text style={{fontSize: 13}}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="Enter your email address"
            //   keyboardType="numeric"
            placeholderTextColor={'gray'}
          />
        </View>
        <View style={styles.testHolder}>
          <Text style={{fontSize: 13}}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setPassword(text);
            }}
            value={password}
            placeholder="Enter your password"
            //   keyboardType="numeric"
            pplaceholderTextColor={'gray'}
            secureTextEntry={true}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            //   backgroundColor: 'red',
          }}>
          <View style={styles.remember}>
            {/* <Checkbox status="checked" /> */}
            <View>
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
            </View>
            <Text style={{marginRight: 5}}>Remember me</Text>
          </View>
          <View>
            <Button
              color={colors.signupButton}
              onPress={() => navigation.navigate('ForgotPass')}>
              Forgot password?
            </Button>
          </View>
        </View>
        <Button
          color={colors.button}
          onPress={() => handleLogIn()}
          style={{marginTop: 20, padding: 10, borderRadius: 10}}
          labelStyle={{color: colors.background}}
          mode="contained">
          Sign in
        </Button>
        <View style={styles.createAccount}>
          <Text>Dont have an account?</Text>
          <Button
            onPress={() => navigation.navigate('SignUp')}
            color={colors.signupButton}>
            Create account
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    marginTop: 5,
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
