import React from 'react';
import {StyleSheet, Text, View, TextInput, Keyboard} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SecondaryHeader from '../../common/SecondaryHeader';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {upDatePassword} from '../../service/app.service';
import authStorage from '../../utils/authStorage';
import AuthContext from '../../utils/authContext';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default function UpdatePassword() {
  const {colors} = useTheme();
  const [userId, setUserId] = React.useState();
  const [secure, setSecure] = React.useState(true);
  const [secure2, setSecure2] = React.useState(true);
  const [secure3, setSecure3] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [oldPassword, setOldPassword] = React.useState('');
  const [isFocus, setIsFoucus] = React.useState('');
  const [matchPassword, setMatchPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const context = React.useContext(AuthContext);

  React.useEffect(async () => {
    const id = await authStorage.getUserid();
    setUserId(id);
    const token = await authStorage.getToken();
    // console.log(id, token, 'id and token');
  }, []);
  const signOut = () => {
    authStorage.removeValue();
    context.setUser('');

    context.setUserID('');
    context.setIsverified('false');
  };

  const handleChangePassword = async () => {
    try {
      if (confirmPassword == password) {
        setLoading(true);
        const result = await upDatePassword(userId, oldPassword, password);
        console.log(result);
        showMessage({
          message: result.message,
          type: 'success',
        });
        setLoading(false);
        signOut();
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      showMessage({
        message: e.errMsg,
        type: 'warning',
      });
    }
  };

  const verifyConfirmPass = () => {
    if (confirmPassword != password) {
      setMatchPassword(true);
    } else {
      setMatchPassword(false);
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
      case '3':
        // setEnableShift(true);
        setIsFoucus('3');
        break;

      default:
      // code block
    }
  };
  return (
    <SafeAreaView edges={['top']} style={{paddingHorizontal: 15}}>
      {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View> */}
      <SecondaryHeader iconName={'arrowleft'} title={'Update Password'} />
      <View style={{marginVertical: 20}}>
        <Text style={[styles.title, {color: colors.secondary}]}>
          Update Password?
        </Text>
      </View>
      <Text style={{fontSize: 16, marginBottom: 20}}>
        Are your sure you want to update your password? Make sure your password
        is Secure and protective
      </Text>
      {/* </View>
      </TouchableWithoutFeedback> */}
      <View style={styles.testHolder}>
        <Text style={{fontSize: 16}}>Old Password</Text>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TextInput
            autoCapitalize="none"
            style={[
              isFocus == '1' ? styles.focusInput : styles.input,
              {flex: 1},
            ]}
            onChangeText={text => setOldPassword(text)}
            value={oldPassword}
            placeholder="Enter your old password"
            secureTextEntry={secure}
            onFocus={() => handleonFocus('1')}
            placeholderTextColor={'gray'}
          />
          <Icon
            onPress={() => (secure ? setSecure(false) : setSecure(true))}
            style={{position: 'absolute', right: 15, fontSize: 20}}
            name={secure ? 'eye-off-outline' : 'eye-outline'}
          />
        </View>
      </View>
      <View style={styles.testHolder}>
        <Text style={{fontSize: 16}}>Password</Text>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TextInput
            autoCapitalize="none"
            style={[
              isFocus == '2' ? styles.focusInput : styles.input,
              {flex: 1},
            ]}
            onChangeText={text => setPassword(text)}
            value={password}
            placeholder="Enter your new password"
            secureTextEntry={secure2}
            onFocus={() => handleonFocus('2')}
            placeholderTextColor={'gray'}
          />
          <Icon
            onPress={() => (secure2 ? setSecure2(false) : setSecure2(true))}
            style={{position: 'absolute', right: 15, fontSize: 20}}
            name={secure2 ? 'eye-off-outline' : 'eye-outline'}
          />
        </View>
      </View>
      <View style={styles.testHolder}>
        <Text style={{fontSize: 16}}>Confirm Password</Text>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TextInput
            autoCapitalize="none"
            style={[
              isFocus == '3' ? styles.focusInput : styles.input,
              {flex: 1},
            ]}
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
            placeholder="Renter Your Password"
            secureTextEntry={secure3}
            onFocus={() => handleonFocus('3')}
            placeholderTextColor={'gray'}
            onBlur={() => verifyConfirmPass()}
          />
          <Icon
            onPress={() => (secure3 ? setSecure3(false) : setSecure3(true))}
            style={{position: 'absolute', right: 15, fontSize: 20}}
            name={secure3 ? 'eye-off-outline' : 'eye-outline'}
          />
        </View>
        {matchPassword && (
          <Text style={{color: 'red', padding: 5, paddingTop: 0}}>
            Password do not match
          </Text>
        )}
      </View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
        <View style={{zIndex: -1, width: '100%', marginTop: 15}}>
          <Button
            color={colors.button}
            onPress={() => handleChangePassword()}
            style={styles.button}
            labelStyle={{color: colors.background}}
            mode="contained"
            disabled={loading}>
            Update
          </Button>
        </View>
        {loading && (
          <ActivityIndicator
            animating={true}
            color={'white'}
            style={{position: 'absolute', top: 50, left: 100}}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    height: 45,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  testHolder: {
    marginTop: 3,
  },
  focusInput: {
    borderColor: '#7EC043',
    height: 45,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  input: {
    height: 45,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
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
    // width: '100%',
  },
});
