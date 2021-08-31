import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {showMessage, hideMessage} from 'react-native-flash-message';
import jwtDecode from 'jwt-decode';

import AppIcon from '../../../svgs/AppIcon';
import {signup, valideteUserName} from '../../service/auth.service';
import AuthContext from '../../utils/authContext';
import authStorage from '../../utils/authStorage';
import react from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function index() {
  const [enableShift, setEnableShift] = React.useState(false);
  const [isAvailable, setIsAvailable] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  const {colors} = useTheme();
  const navigation = useNavigation();
  const context = React.useContext(AuthContext);

  // const DismissKeyboard = () => (
  //   <TouchableWithoutFeedback
  //     onPress={() => Keyboard.dismiss()}></TouchableWithoutFeedback>
  // );

  const validateNmae = async text => {
    // console.log('here is user name ', text);
    setUserName(userName => text);

    // setUserName(async val => {
    //   try {
    //     const result = await valideteUserName(val);
    //     // console.log(result, 'xxx');
    //     setIsAvailable(false);
    //   } catch (error) {
    //     error.errMsg == 'User Name Not exists!' ? setIsAvailable(true) : null;
    //   }
    //   console.log('val', val);
    //   console.log('usrnameeee', userName);
    //   return val;
    // });

    try {
      const result = await valideteUserName(text);
      // console.log(result, 'xxx');
      setIsAvailable(false);
    } catch (error) {
      error.errMsg == 'User Name Not exists!' ? setIsAvailable(true) : null;
    }
    setUserName(val => {
      return val;
    });
  };
  React.useEffect(() => {
    // validateNmae();

    userName.length < 1 ? setIsAvailable('') : null;
  }, [userName, isAvailable]);

  //functions
  const handleSignup = async () => {
    try {
      const result = await signup(
        userName,
        fullName,
        email,
        phoneNumber,
        password,
        value,
        'fcm9987',
        '1234',
      );
      if (result?.status === 200) {
        console.log(result.data.token, 'token after sign up');
        authStorage.storeUserid(result?.data?._id);
        const token = jwtDecode(result?.data?.token);
        console.log(result.data.token, 'token after sign up after decode');
        context.setUser(token);

        authStorage.storeToken(token);
        showMessage({
          message: result.message,
          type: 'success',
        });
        navigation.navigate('Otp');
      }
    } catch (err) {
      console.warn(err);
      showMessage({
        message: err.errMsg,
        type: 'warning',
      });
    }

    // console.log('res', result);
    // const result = await LoginService.login(userName, password);
    // if (!result.ok)
    // return console.log(result.data.data.token);
    // const token = jwtDecode(result?.data?.token);
    // authContext.setUser(token);
    // authstorage.storeToken(result?.data?.token);
  };

  return (
    <SafeAreaView style={{paddingHorizontal: 10}} edges={['top', 'left']}>
      {/* <ScrollView onPress={() => Keyboard.dismiss()}> */}
      <KeyboardAvoidingView
        keyboardShouldPersistTaps={true}
        enabled={enableShift}
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
        <View style={{paddingVertical: 5}}>
          <AppIcon />
        </View>
        <Text style={[styles.title, {color: colors.secondary}]}>Sign up</Text>
        {/* <DismissKeyboard> */}
        <View style={styles.testHolder}>
          <Text style={{fontSize: 13}}>Full Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setFullName(text)}
            value={fullName}
            placeholder="Enter your full name"
            onFocus={() => setEnableShift(false)}
            placeholderTextColor={'gray'}
          />
        </View>
        <View style={styles.testHolder}>
          <Text style={{fontSize: 13}}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="Enter your email address"
            onFocus={() => setEnableShift(false)}
            placeholderTextColor={'gray'}
          />
        </View>
        <View style={[styles.testHolder]}>
          <Text style={{fontSize: 13}}>User Name</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={[styles.input, {flex: 1}]}
              onChangeText={text => validateNmae(text)}
              value={userName}
              placeholder="Enter your username"
              onFocus={() => setEnableShift(false)}
              placeholderTextColor={'gray'}
            />
            {isAvailable === true && (
              <Ionicons
                style={{
                  position: 'absolute',
                  left: '90%',
                  top: 15,
                  fontSize: 18,
                  color: 'green',
                }}
                name="checkmark-circle-outline"
              />
            )}
            {isAvailable === false && (
              <Entypo
                style={{
                  position: 'absolute',
                  left: '90%',
                  top: 15,
                  fontSize: 18,
                  color: 'red',
                }}
                name="circle-with-cross"
              />
            )}
          </View>
        </View>
        <View style={styles.testHolder}>
          <Text style={{fontSize: 13}}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setPassword(text)}
            value={password}
            placeholder="Enter your password"
            secureTextEntry={true}
            onFocus={() => setEnableShift(true)}
            placeholderTextColor={'gray'}
          />
        </View>
        <View style={styles.testHolder}>
          <Text style={{fontSize: 13}}>Phone Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setPhoneNumber(text)}
            value={phoneNumber}
            placeholder="Phone number"
            keyboardType="numeric"
            placeholderTextColor={'gray'}
            onFocus={() => setEnableShift(true)}
          />
        </View>
        <View style={styles.testHolder}>
          <Text style={{fontSize: 13}}>Location</Text>
          <View
            style={{
              marginHorizontal: 6,
              marginVertical: 5,
              // borderRadius: 10,
              // zIndex: 5,
              // paddingBottom: 50,
            }}>
            <DropDownPicker
              style={{height: 40}}
              labelStyle={{}}
              // maxHeight={80}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Select Location"
              placeholderStyle={{color: '#9CA3AF'}}
              // textStyle={{color: 'gray'}}
              // labelProps={{fontWeight: 'red'}}
            />
          </View>
        </View>
        {/* </DismissKeyboard> */}

        <Button
          color={colors.button}
          onPress={() => handleSignup()}
          style={{marginTop: 10, padding: 10, borderRadius: 10}}
          labelStyle={{color: colors.background}}
          mode="contained">
          Sign up
        </Button>
        <View style={styles.createAccount}>
          <Text>Already have an account?</Text>
          <Button
            style={{}}
            onPress={() => navigation.navigate('Login')}
            color={colors.signupButton}>
            Sign in
          </Button>
        </View>
      </KeyboardAvoidingView>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    // marginTop: 2,
  },
  input: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  testHolder: {
    marginTop: 3,
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
    // marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
