import {useNavigation, useTheme} from '@react-navigation/native';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TextInput,
  Keyboard,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  //   SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {ActivityIndicator, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AnimatedLoader from 'react-native-animated-loader';
import Icon from 'react-native-vector-icons/AntDesign';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {getUser, updateUser} from '../../service/app.service';
import authStorage from '../../utils/authStorage';
import URL from '../../utils/url_path';
import AuthContext from '../../utils/authContext';

export default function index() {
  const {height, width} = useWindowDimensions();
  const [listShow, setListShow] = React.useState();
  const [enableShift, setEnableShift] = React.useState(false);
  const [location, setLocation] = React.useState();
  const [image, setImage] = React.useState();
  const [user, setUser] = React.useState();
  const [isFocus, setIsFoucus] = React.useState('');
  const [editImage, setEditImage] = React.useState(false);
  const [editedImage, setEditedImage] = React.useState({});
  const [activityIndicatore, setActivityIndicator] = React.useState(false);
  const [userId, setUserId] = React.useState();
  const [editedNumber, setEditedNumber] = React.useState('');
  const [editedLocation, setEditedLocation] = React.useState();
  const [editedName, setEditedName] = React.useState('');
  const [isEdit, setisEdit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [compnayName, setComoanyName] = React.useState();
  const [editedCompnayName, setEditedComoanyName] = React.useState();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const [items, setItems] = React.useState([
    {label: 'Lahore', value: 'lahore'},
    {label: 'Krachi', value: 'krachi'},
  ]);
  const ref = React.useRef();
  const context = React.useContext(AuthContext);
  const val = ref.current?.isFocused();
  // const setVal = ref?.current?.setAddressText('hello')
  // console.log(val, 'value');
  // setIsFocused(val);

  const handleEdit = () => {
    isEdit ? setisEdit(false) : setisEdit(true);
    setValue(user?.data?.location);
    setEditedName(user?.data?.fullName);
    setEditedNumber(user?.data?.phoneNumber);
    setLocation(user?.data?.location);
    setComoanyName(user?.data?.companyName);
    ref.current?.setAddressText('hello');
  };

  const {colors} = useTheme();
  const handleonFocus = id => {
    switch (id) {
      case '1':
        setIsFoucus('1');

        break;
      case '2':
        setIsFoucus('2');
        // setEnableShift(true);
        break;
      case '3':
        setIsFoucus('3');
        // setEnableShift(true);
        // setListShow(true);

        break;
      case '4':
        setIsFoucus('4');
        setEnableShift(true);

        break;

      default:
        // code block
        setEnableShift(false);
    }
  };
  const storeUser = async () => {
    const token = await authStorage.getToken();
    const id = await authStorage.getUserid();

    setUserId(id);
    try {
      setActivityIndicator(true);
      const data = await getUser(id);
      // console.log(data.data);
      setUser(data);
      context.setProfile(data.data);
      console.log(data.data);
      setActivityIndicator(false);
    } catch (e) {
      console.log(e);
      setActivityIndicator(false);
    }
  };
  console.log(user?.data?.profilePhoto, 'imageUrl');
  React.useEffect(() => {
    storeUser();
    isEdit ? ref.current?.setAddressText(user?.data?.location) : null;

    return function cleanUp() {
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />;
    };
  }, [editImage, isEdit, val]);
  let formData = new FormData();
  const handleUpdate = async () => {
    try {
      setLoading(true);
      formData.append('fullName', editedName);
      formData.append('phoneNumber', editedNumber);
      formData.append('location', location);
      formData.append('companyName', compnayName);
      console.log(compnayName, 'fuck');
      // ? console.log(' added')
      image
        ? formData.append('profilePhoto', editedImage)
        : // console.log('not added');
          formData.append('profilePhoto', 'null');
      !image
        ? formData.append('profilePhotoOld', user?.data?.profilePhoto)
        : formData.append('profilePhotoOld', 'null');
      formData.append('companyName', compnayName);

      const response = await updateUser(userId, formData);
      showMessage({
        message: response.message,
        type: 'success',
      });
      setisEdit(false);
      setEditImage(false);

      console.log(response);
      setLoading(false);
    } catch (e) {
      console.warn(e);
      setLoading(false);
    }
  };
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      {/* <KeyboardAwareScrollView
      style={{flex: 1}}
      keyboardShouldPersistTaps={true}
      enabled={enableShift}
      behavior={Platform.OS === 'ios' ? 'position' : null}
      > */}
      {/* <View style={{flex: 2}}> */}

      <StatusBar
        backgroundColor={colors.profileBcackGround}
        barStyle="light-content"
      />

      <View
        style={{
          height: '35%',
          alignItems: 'center',
        }}>
        <View
          style={[
            styles.background,
            {backgroundColor: colors.profileBcackGround},
          ]}>
          <View style={styles.iconSection}>
            <Icon
              onPress={() => navigation.goBack()}
              style={{
                fontSize: 25,
                color: 'white',
                marginTop: 40,
                marginLeft: 20,
              }}
              name={'arrowleft'}
            />
          </View>
        </View>
        <View
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.imageBackground}>
            <Image
              style={[styles.image, isEdit ? {opacity: 0.5} : null]}
              source={{
                uri: editImage
                  ? image
                  : URL.IMAGE_URL + user?.data?.profilePhoto,
              }}
            />
            {isEdit && (
              <Ionicons
                onPress={() =>
                  launchImageLibrary({mediaType: 'photo'}, i => {
                    setEditImage(true);
                    if (i.didCancel) {
                      setImage(URL.IMAGE_URL + user?.data?.profilePhoto);
                      console.log('User cancelled image picker');
                    } else if (i.errorCode) {
                      console.log('ImagePicker Error: ', i.errorCode);
                    } else {
                      // console.log(i?.assets[0]);
                      const uri = i?.assets[0];
                      // console.log(uri?.fileName, 'fuck');
                      const photo = {
                        uri: uri?.uri,
                        type: uri?.type,
                        name: uri?.fileName,
                      };
                      setImage(uri?.uri);
                      // console.log('photo', photo.name);
                      setEditedImage(photo);
                    }
                  })
                }
                name="eye-outline"
                style={{
                  fontSize: 40,
                  position: 'absolute',
                  color: 'white',
                }}
              />
            )}
          </View>
        </View>
      </View>
      {/* </View> */}
      {/* <ScrollView style={{}}> */}
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        extraScrollHeight={175}>
        <View
          style={{
            paddingHorizontal: 15,
            // backgroundColor: 'yellow',
            // height: height,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',

              marginTop: 35,
            }}>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {isEdit === false && (
                <Text
                  style={[
                    styles.userName,
                    {
                      color: colors.profileBcackGround,
                    },
                  ]}>
                  {user?.data?.fullName}
                </Text>
              )}
              {isEdit === true && (
                <View style={{width: '50%', height: 40}}>
                  <TextInput
                    placeholder="Full Name"
                    value={editedName}
                    onChangeText={text => setEditedName(text)}
                    onFocus={() => handleonFocus('1')}
                    style={[isFocus == '1' ? styles.focusInput : styles.input]}
                    // onBlur={() => setisEdit(false)}
                  />
                </View>
              )}
              <FeatherIcon
                name="edit"
                onPress={() => handleEdit()}
                style={[styles.icon, {color: colors.profileBcackGround}]}
              />
            </View>
          </View>

          <View
            style={[
              styles.field,
              {
                // marginTop: 5,
                alignItems: 'center',
              },
            ]}>
            <Text style={[styles.values, {color: colors.profileBcackGround}]}>
              Phone Number
            </Text>
            {isEdit === false && (
              <Text style={[styles.values, {color: 'gray'}]}>
                {user?.data?.phoneNumber}
              </Text>
            )}
            {isEdit === true && (
              <View style={{marginTop: 5, height: 45}}>
                <TextInput
                  placeholder="Phone Number"
                  keyboardType={'phone-pad'}
                  onChangeText={text => setEditedNumber(text)}
                  value={editedNumber}
                  onFocus={() => handleonFocus('2')}
                  style={[isFocus == '2' ? styles.focusInput : styles.input]}
                />
              </View>
            )}
          </View>

          <View style={styles.field}>
            <Text style={[styles.values, {color: colors.profileBcackGround}]}>
              Password
            </Text>
            <View style={styles.field}>
              <Text style={[styles.values, {color: 'gray'}]}>xxxxxxxx</Text>

              <Text
                onPress={() => navigation.navigate('UpdatePassword')}
                style={[
                  styles.values,
                  {
                    color: colors.profileBcackGround,
                    marginLeft: 10,
                    fontWeight: '400',
                  },
                ]}>
                (Change)
              </Text>
            </View>
          </View>

          {/* <View style={[styles.field, {alignItems: 'center'}]}>
            <Text style={[styles.values, {color: colors.profileBcackGround}]}>
              Location
            </Text>
            {isEdit === false && (
              <Text style={[{color: 'gray'}]}>{user?.data?.location}</Text>
            )}
            {isEdit === true && (
              <View
                style={{
                  width: '50%',
                }}>
                <ScrollView style={{height: 70}}>
                  <TouchableWithoutFeedback
                    style={{}}
                    onPress={() => ref.current?.focus()}>
                    <GooglePlacesAutocomplete
                      // autoFillOnNotFound={true}
                      ref={ref}
                      styles={{
                        container: {height: 70},
                        listView: {zIndex: 1},

                        textInput: {
                          borderBottomColor:
                            isFocus == '3' ? colors.secondary : null,
                          borderBottomWidth: 1,
                        },
                      }}
                      textInputProps={{
                        textAlign: 'left',
                        placeholderTextColor: 'black',
                        onFocus: () => handleonFocus('3'),
                      }}
                      onPress={(data, details = null) => {
                        setLocation(data?.description);
                        setListShow(false);
                      }}
                      keepResultsAfterBlur={listShow}
                      query={{
                        key: 'AIzaSyDDANw8GBVlla0rxNNegrBFhxjQizW6ZjE',
                        language: 'en',
                      }}
                    />
                  </TouchableWithoutFeedback>
                </ScrollView>
              </View>
            )}
          </View> */}
          <View
            style={[
              styles.field,
              {
                marginTop: 5,
                alignItems: 'center',
              },
            ]}>
            <Text style={[styles.values, {color: colors.profileBcackGround}]}>
              Company Name
            </Text>
            {isEdit === false && (
              <Text style={[styles.values, {color: 'gray'}]}>
                {user?.data?.companyName}
              </Text>
            )}
            {isEdit === true && (
              <View style={{height: 45}}>
                <TextInput
                  placeholder="Company Name"
                  onChangeText={text => setComoanyName(text)}
                  value={compnayName}
                  onFocus={() => handleonFocus('4')}
                  style={[isFocus == '4' ? styles.focusInput : styles.input]}
                />
              </View>
            )}
          </View>
          <View
            style={[
              styles.field,
              {
                alignItems: 'flex-start',
                // minHeight: 50,
                // backgroundColor: 'red',
              },
            ]}>
            {/* <View> */}
            <Text style={[styles.values, {color: colors.profileBcackGround}]}>
              Location
            </Text>
            {/* </View> */}
            <View
              style={{
                flexShrink: 1,
                justifyContent: 'center',
                // backgroundColor: 'red',
                // width: '50%',
                paddingTop: 14,
              }}>
              {isEdit === false && (
                <Text style={[{color: 'gray', textAlign: 'right'}]}>
                  {user?.data?.location}
                </Text>
              )}
            </View>
            {isEdit === true && (
              <View style={{width: '50%'}}>
                <ScrollView
                  style={{width: '100%'}}
                  keyboardShouldPersistTaps={'handled'}>
                  <TouchableWithoutFeedback
                    style={{}}
                    onPress={() => ref.current?.focus()}>
                    <GooglePlacesAutocomplete
                      // autoFillOnNotFound={true}
                      ref={ref}
                      styles={{
                        container: {width: '100%'},
                        // listView: {zIndex: -1},

                        textInput: {
                          borderBottomColor:
                            isFocus == '3' ? colors.secondary : null,
                          borderBottomWidth: 1,
                        },
                      }}
                      textInputProps={{
                        textAlign: 'left',
                        placeholderTextColor: 'black',
                        onFocus: () => handleonFocus('3'),
                      }}
                      onPress={(data, details = null) => {
                        console.log(data);
                        setLocation(data?.description);
                        // Keyboard.dismiss();
                        // setListShow(false);
                      }}
                      // keepResultsAfterBlur={listShow}
                      query={{
                        key: 'AIzaSyDDANw8GBVlla0rxNNegrBFhxjQizW6ZjE',
                        language: 'en',
                      }}
                    />
                  </TouchableWithoutFeedback>
                </ScrollView>
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              // marginBottom: 5,
            }}>
            <View
              style={{
                zIndex: -1,
                width: '100%',
                marginTop: isEdit === true ? 15 : 50,
              }}>
              <Button
                color={colors.button}
                onPress={() => handleUpdate()}
                style={styles.button}
                labelStyle={{color: colors.background}}
                mode="contained"
                disabled={loading || !isEdit}>
                Update
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
          {activityIndicatore && (
            <View style={{}}>
              <AnimatedLoader
                visible={activityIndicatore}
                overlayColor="rgba(255,255,255,0.55)"
                source={require('../../../assets/loader.json')}
                animationStyle={styles.lottie}
                speed={1}></AnimatedLoader>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>

      {/* scrool */}
      {/* </ScrollView> */}
      {/* </View> */}
      {/* </KeyboardAwareScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    height: '85%',
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginLeft: 10,
    fontSize: 20,
  },
  values: {
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 15,
    // backgroundColor: 'yellow',
  },
  field: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 5,
  },
  button: {
    marginTop: 3,
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
  imageBackground: {
    height: 120,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',

    // position: 'absolute',
    // bottom: 30,
    // top: '55%',
    borderRadius: 60,
    // left: '33%',
    borderColor: 'white',
    borderWidth: 3,
    marginBottom: 20,
    position: 'absolute',
    // shadowOffset: {width: 10, height: 10},
    // shadowColor: '#000',
    shadowOpacity: 1,
    // elevation: 10,
    backgroundColor: '#000',
  },
  focusInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#7EC043',
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  image: {
    height: 115,
    width: 115,
    resizeMode: 'cover',
    borderRadius: 60,
  },
  lottie: {
    height: 100,
    width: 100,
  },
});
