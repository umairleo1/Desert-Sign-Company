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
  Dimensions,
  Keyboard,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, ActivityIndicator} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {showMessage, hideMessage} from 'react-native-flash-message';
import jwtDecode from 'jwt-decode';
import Icon from 'react-native-vector-icons/Ionicons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import AppIcon from '../../../assets/svgs/AppIcon';
import {signup, valideteUserName} from '../../service/auth.service';
import AuthContext from '../../utils/authContext';
import authStorage from '../../utils/authStorage';
import react from 'react';

export default function index() {
  const [secure, setSecure] = React.useState(true);
  const [emptyFullNmae, setEmptyName] = React.useState(false);
  const [emptyuserName, setEmptyUserName] = React.useState(false);
  const [emptyMail, setEmptyMail] = React.useState(false);
  const [emptyPass, setEmptyPass] = React.useState(false);
  const [emptyConfrom, setEmptyConform] = React.useState(false);
  const [emptyPhoneNum, setEmptyPhoneNum] = React.useState(false);
  const [emptyCompanyNmae, setEmptyCompanyName] = React.useState(false);
  const [emptyLocation, setEmptyLocation] = React.useState(false);
  const [secure2, setSecure2] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [enableShift, setEnableShift] = React.useState(false);
  const [isAvailable, setIsAvailable] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isFocus, setIsFoucus] = React.useState('');
  const [matchPassword, setMatchPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [companyName, setCompanyName] = React.useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Lahore', value: 'lahore'},
    {label: 'Krachi', value: 'krachi'},
    {label: 'Dubai', value: 'dubai'},
    {label: 'NEWYORK', value: 'newyork'},
  ]);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState('l');
  const [items1, setItems1] = useState([
    {label: 'Pakitan', value: 'pakistan'},
    {label: 'Uk', value: 'uk'},
    {label: 'USA', value: 'usa'},
    {label: 'UAE', value: 'uae'},
  ]);
  const {colors} = useTheme();
  const navigation = useNavigation();
  const context = React.useContext(AuthContext);

  const height = Dimensions.get('window').height;

  // const DismissKeyboard = () => (
  //   <TouchableWithoutFeedback
  //     onPress={() => Keyboard.dismiss()}></TouchableWithoutFeedback>
  // );
  const verifyConfirmPass = () => {
    if (confirmPassword != password) {
      setMatchPassword(true);
    } else {
      setMatchPassword(false);
    }
  };

  const validateNmae = async text => {
    // console.log('here is user name ', text);
    setUserName(userName => text);

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
    userName.length < 1 ? setIsAvailable('') : null;
  }, [userName, isAvailable, matchPassword]);

  //functions
  const handleSignup = async () => {
    if (fullName == '') {
      setEmptyName(true);
    }
    if (email == '') {
      setEmptyMail(true);
    }
    if (userName == '') {
      setEmptyUserName(true);
    }
    if (password == '') {
      setEmptyPass(true);
    }
    //  else if(confirmPassword==''){setEmptyConform(true)}
    if (phoneNumber == '') {
      setEmptyPhoneNum(true);
    }
    if (companyName == '') {
      setEmptyCompanyName(true);
    }
    if (value == null) {
      setEmptyLocation(true);
    } else if (matchPassword == true) {
      showMessage({
        message: 'Password do not match',
        type: 'warning',
      });
    }
    if (
      fullName != '' &&
      email != '' &&
      userName != '' &&
      password != '' &&
      companyName != '' &&
      value != null
    )
      try {
        setLoading(true);
        const result = await signup(
          userName,
          fullName,
          email,
          phoneNumber,
          password,
          value,
          'fcm9987',
          '1234',
          'value1',
          'Android',
          companyName,
        );
        if (result?.status === 200) {
          // console.log(result.data.token, 'token after sign up');
          authStorage.storeUserid(result?.data?._id);
          const token = jwtDecode(result?.data?.token);
          // console.log(result.data.token, 'token after sign up after decode');
          context.setUser(token);

          authStorage.storeToken(result?.data?.token);
          showMessage({
            message: result.message,
            type: 'success',
          });
          setLoading(false);
          setFullName('');
          setEmail('');
          setUserName('');
          setPassword('');
          setConfirmPassword('');
          setPhoneNumber('');
          setValue('');
          setCompanyName('');
          setValue1('');
          navigation.navigate('Otp');
        }
      } catch (err) {
        console.warn(err);
        showMessage({
          message: err.errMsg,
          type: 'warning',
        });
        setLoading(false);
      }
  };
  const handleonFocus = id => {
    switch (id) {
      case '1':
        setEnableShift(false);
        setIsFoucus('1');
        setEmptyName(false);

        break;
      case '2':
        setEnableShift(false);
        setIsFoucus('2');
        setEmptyMail(false);
        break;
      case '3':
        setEnableShift(false);
        setIsFoucus('3');
        setEmptyUserName(false);
        break;
      case '4':
        // setEnableShift(true);
        setIsFoucus('4');
        setEmptyPass(false);
        break;
      case '5':
        // setEnableShift(true);
        setIsFoucus('5');
        break;
      case '6':
        // setEnableShift(true);
        setIsFoucus('6');
        setEmptyPhoneNum(false);
        break;
      case '7':
        setIsFoucus('7');
        // setEmptyCompanyName(false);
        break;
      case '8':
        setIsFoucus('8');
        setEmptyCompanyName(false);

        setEnableShift(true);
        break;
      case '9':
        setIsFoucus('9');
        setEmptyLocation(false);
        setEnableShift(true);
        break;
      default:
      // code block
    }
  };
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <SafeAreaView
      style={{paddingHorizontal: 15, maxHeight: height, flex: 1}}
      edges={['top', 'left']}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <View style={{paddingVertical: 5}}>
            <AppIcon />
          </View>

          <Text style={[styles.title, {color: colors.secondary}]}>Sign up</Text>
        </View>
      </TouchableWithoutFeedback>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}>
        <KeyboardAwareScrollView
          style={{paddingBottom: 10}}
          keyboardShouldPersistTaps={'handled'}
          extraScrollHeight={175}
          // keyboardShouldPersistTaps={'always'}
          // enabled={enableShift}
          // keyboardVerticalOffset={40}
          // keyboardVerticalOffset={keyboardVerticalOffset}
          // behavior={Platform.OS === 'ios' ? 'position' : 'position'}
        >
          {/* <DismissKeyboard> */}
          {/* <ScrollView
          keyboardShouldPersistTaps={'handled'}
          // style={{flex: 1}}
          showsVerticalScrollIndicator={false}> */}
          <View style={styles.testHolder}>
            <Text style={{fontSize: 16}}>Full Name</Text>
            <TextInput
              style={[isFocus == '1' ? styles.focusInput : styles.input]}
              onChangeText={text => setFullName(text)}
              value={fullName}
              placeholder="Enter your full name"
              onFocus={() => handleonFocus('1')}
              placeholderTextColor={'gray'}
              onBlur={() => setIsFoucus(false)}
            />
            {emptyFullNmae && (
              <Text style={{color: 'red', padding: 5, paddingTop: 0}}>
                Name is required
              </Text>
            )}
          </View>
          <View style={styles.testHolder}>
            <Text style={{fontSize: 16}}>Email</Text>
            <TextInput
              style={[isFocus == '2' ? styles.focusInput : styles.input]}
              onChangeText={text => setEmail(text)}
              value={email}
              placeholder="Enter your email address"
              onFocus={() => handleonFocus('2')}
              placeholderTextColor={'gray'}
              autoCapitalize="none"
            />
            {emptyMail && (
              <Text style={{color: 'red', padding: 5, paddingTop: 0}}>
                Email is required
              </Text>
            )}
          </View>
          <View style={[styles.testHolder]}>
            <Text style={{fontSize: 16}}>User Name</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={[
                  isFocus == '3' ? styles.focusInput : styles.input,
                  {flex: 1},
                ]}
                onChangeText={text => validateNmae(text)}
                value={userName}
                placeholder="Enter your username"
                onFocus={() => handleonFocus('3')}
                placeholderTextColor={'gray'}
              />
              {isAvailable === true && (
                <Ionicons
                  style={{
                    position: 'absolute',
                    left: '90%',
                    top: 23,
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
                    top: 23,
                    fontSize: 18,
                    color: 'red',
                  }}
                  name="circle-with-cross"
                />
              )}
            </View>
            {emptyuserName && (
              <Text style={{color: 'red', padding: 5, paddingTop: 0}}>
                User Name is required
              </Text>
            )}
          </View>
          <View style={styles.testHolder}>
            <Text style={{fontSize: 16}}>Password</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                autoCapitalize="none"
                style={[
                  isFocus == '4' ? styles.focusInput : styles.input,
                  {flex: 1},
                ]}
                onChangeText={text => setPassword(text)}
                value={password}
                placeholder="Enter your password"
                secureTextEntry={secure}
                onFocus={() => handleonFocus('4')}
                placeholderTextColor={'gray'}
              />
              <Icon
                onPress={() => (secure ? setSecure(false) : setSecure(true))}
                style={{position: 'absolute', right: 15, fontSize: 20}}
                name={secure ? 'eye-off-outline' : 'eye-outline'}
              />
            </View>
            {emptyPass && (
              <Text style={{color: 'red', padding: 5, paddingTop: 0}}>
                Password is required
              </Text>
            )}
          </View>
          <View style={styles.testHolder}>
            <Text style={{fontSize: 16}}>Confirm Password</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                autoCapitalize="none"
                style={[
                  isFocus == '5' ? styles.focusInput : styles.input,
                  {flex: 1},
                ]}
                onChangeText={text => setConfirmPassword(text)}
                value={confirmPassword}
                placeholder="Renter Your Password"
                secureTextEntry={secure2}
                onFocus={() => handleonFocus('5')}
                placeholderTextColor={'gray'}
                onBlur={() => verifyConfirmPass()}
              />
              <Icon
                onPress={() => (secure2 ? setSecure2(false) : setSecure2(true))}
                style={{position: 'absolute', right: 15, fontSize: 20}}
                name={secure2 ? 'eye-off-outline' : 'eye-outline'}
              />
            </View>
            {matchPassword && (
              <Text style={{color: 'red', padding: 5, paddingTop: 0}}>
                Password do not match
              </Text>
            )}
          </View>
          <View style={styles.testHolder}>
            <Text style={{fontSize: 16}}>Phone Number</Text>
            <TextInput
              style={[isFocus == '6' ? styles.focusInput : styles.input]}
              onChangeText={text => setPhoneNumber(text)}
              value={phoneNumber}
              placeholder="Phone number"
              keyboardType="numeric"
              placeholderTextColor={'gray'}
              onFocus={() => handleonFocus('6')}
            />
            {emptyPhoneNum && (
              <Text style={{color: 'red', padding: 5, paddingTop: 0}}>
                Phone Number is required
              </Text>
            )}
          </View>
          <View style={styles.testHolder}>
            <Text style={{fontSize: 16}}>Company Name</Text>
            <TextInput
              style={[isFocus == '8' ? styles.focusInput : styles.input]}
              onChangeText={text => setCompanyName(text)}
              value={companyName}
              placeholder="Company Name"
              placeholderTextColor={'gray'}
              onFocus={() => handleonFocus('8')}
            />
            {emptyCompanyNmae && (
              <Text style={{color: 'red', padding: 5, paddingTop: 0}}>
                Company Name is required
              </Text>
            )}
          </View>
          <View style={[styles.testHolder]}>
            <Text style={{fontSize: 16}}>Location</Text>
            <View
              style={{
                marginHorizontal: 4,
                marginVertical: 5,
                // marginBottom: 8,
              }}>
              {/* <DropDownPicker
              style={[
                isFocus == '7'
                  ? {borderColor: '#7EC043', height: 45}
                  : {height: 45},
              ]}
              labelStyle={{}}
              open={open}
              value={value}
              items={items}
              zIndex={5000}
              zIndexInverse={4000}
              dropDownDirection={'TOP'}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Select Location"
              placeholderStyle={{color: 'gray'}}
              onPress={() => handleonFocus('7')}
              onClose={() => setIsFoucus('')}
              dropDownContainerStyle={[
                isFocus == '7'
                  ? {borderColor: '#7EC043'}
                  : {borderColor: '#000'},
              ]}
            /> */}

              <GooglePlacesAutocomplete
                styles={{
                  listView: {},
                  textInput: {
                    borderColor: isFocus == '9' ? colors.secondary : null,
                    borderWidth: 1,
                  },
                }}
                textInputProps={{
                  textAlign: 'left',
                  onFocus: () => handleonFocus('9'),
                }}
                placeholder={'Location'}
                onPress={(data, details = null) => {
                  // handleonFocus('3');

                  console.log(data, details, 'here is');
                  setValue(data?.description);
                  setIsFoucus(false);
                  // handleonFocus('3');
                }}
                query={{
                  key: 'AIzaSyDDANw8GBVlla0rxNNegrBFhxjQizW6ZjE',
                  language: 'en',
                }}
              />
              {/* </ScrollView> */}
              {emptyLocation && (
                <Text style={{color: 'red', padding: 5, marginTop: 15}}>
                  Location is required
                </Text>
              )}
            </View>
          </View>
          {/* <View style={styles.testHolder}>
          <Text style={{fontSize: 16}}>Country</Text>
          <View
            style={{
              marginHorizontal: 4,
              marginVertical: 5,
            }}>
            <DropDownPicker
              style={[
                isFocus == '9'
                  ? {borderColor: '#7EC043', height: 45}
                  : {height: 45},
              ]}
              labelStyle={{}}
              // maxHeight={80}
              open={open1}
              value={value1}
              items={items1}
              zIndex={6000}
              zIndexInverse={5000}
              setOpen={setOpen1}
              setValue={setValue1}
              setItems={setItems1}
              placeholder="Select Countary"
              placeholderStyle={{color: 'gray'}}
              onPress={() => handleonFocus('9')}
              onClose={() => setIsFoucus('')}
              dropDownContainerStyle={[
                isFocus == '9'
                  ? {borderColor: '#7EC043'}
                  : {borderColor: '#000'},
              ]}
            />
          </View>
        </View> */}
          {/* </ScrollView> */}
        </KeyboardAwareScrollView>
      </ScrollView>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            zIndex: -1,
            height: 110,
            // justifyContent: 'center',

            width: '100%',
          }}>
          <View style={{zIndex: -1, width: '100%'}}>
            <Button
              color={colors.button}
              onPress={() => handleSignup()}
              style={styles.button}
              labelStyle={{color: colors.background}}
              mode="contained"
              disabled={loading}>
              Sign up
            </Button>
          </View>
          {loading && (
            <ActivityIndicator
              animating={true}
              color={'white'}
              style={{position: 'absolute', top: 15, left: 100}}
            />
          )}
          <View style={styles.createAccount}>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: 'gray',
                fontFamily: 'SourceSansPro-Regular',
                fontSize: 15,
              }}>
              Already have an account?
            </Text>
            <Button
              uppercase={false}
              style={{textDecorationLine: 'underline'}}
              onPress={() => navigation.navigate('Login')}
              color={colors.signupButton}>
              Sign in
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginVertical: 10,
  },
  input: {
    height: 45,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  focusInput: {
    borderColor: '#7EC043',
    height: 45,
    marginVertical: 10,
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
    // paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },

  button: {
    // marginTop: 20,
    padding: 10,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    // width: '100%',
  },
});
