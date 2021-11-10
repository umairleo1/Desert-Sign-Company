import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme, useNavigation, useRoute} from '@react-navigation/native';
import {Button, ActivityIndicator} from 'react-native-paper';

import Dots from '../../../assets/svgs/Dots';
import SecondaryHeader from '../../common/SecondaryHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

export default function updateConsignment() {
  const route = useRoute();
  const {colors} = useTheme();

  const [isFocus, setIsFoucus] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [consignmentName, setConsignmentName] = React.useState('');
  const [shippingAddress, setShippingAddress] = React.useState('');
  const [driversName, setDriversName] = React.useState('');
  const [vehicleNoPlate, setVehicleNoPlate] = React.useState('');

  const handleonFocus = id => {
    switch (id) {
      case '1':
        setIsFoucus('1');

        break;
      case '2':
        setIsFoucus('2');
        break;
      case '3':
        setIsFoucus('3');
        break;
      case '4':
        setIsFoucus('4');
        break;
      default:
      // code block
    }
  };

  const handleUpdate = () => {
    setLoading(true);
    setLoading(false);
  };

  return (
    <SafeAreaView style={{paddingHorizontal: 15, flex: 1}}>
      <SecondaryHeader
        title={'Update Consignment Number'}
        consignmentNumber={route?.params?.consignmentNumber}
      />
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        style={{flex: 1, paddingTop: 10}}
        showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.testHolder}>
            <Text style={styles.textInputTitle}>Consignment Name</Text>
            <TextInput
              style={[isFocus == '1' ? styles.focusInput : styles.input]}
              onChangeText={text => setConsignmentName(text)}
              value={consignmentName}
              placeholder="Enter your consignment name"
              onFocus={() => handleonFocus('1')}
              placeholderTextColor={'gray'}
              onBlur={() => setIsFoucus(false)}
            />
          </View>
          <View style={styles.testHolder}>
            <Text style={styles.textInputTitle}>Shipping Address</Text>
            <TextInput
              style={[isFocus == '2' ? styles.focusInput : styles.input]}
              onChangeText={text => setShippingAddress(text)}
              value={shippingAddress}
              placeholder="Enter shipping address"
              onFocus={() => handleonFocus('2')}
              placeholderTextColor={'gray'}
              onBlur={() => setIsFoucus(false)}
            />
          </View>
          <View style={styles.testHolder}>
            <Text style={styles.textInputTitle}>Driver's Name</Text>
            <TextInput
              style={[isFocus == '3' ? styles.focusInput : styles.input]}
              onChangeText={text => setDriversName(text)}
              value={driversName}
              placeholder="Enter driver name"
              onFocus={() => handleonFocus('3')}
              placeholderTextColor={'gray'}
              onBlur={() => setIsFoucus(false)}
            />
          </View>
          <View style={styles.testHolder}>
            <Text style={styles.textInputTitle}>Vehicle Number Plate</Text>
            <TextInput
              style={[isFocus == '4' ? styles.focusInput : styles.input]}
              onChangeText={text => setVehicleNoPlate(text)}
              value={vehicleNoPlate}
              placeholder="Enter vehicle number plate"
              onFocus={() => handleonFocus('4')}
              placeholderTextColor={'gray'}
              onBlur={() => setIsFoucus(false)}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={{zIndex: -1, width: '100%', marginBottom: 5}}>
        <Button
          color={colors.button}
          onPress={() => handleUpdate()}
          style={styles.button}
          labelStyle={{color: colors.background}}
          mode="contained"
          disabled={loading}>
          UPDATE
        </Button>
      </View>
      {loading && (
        <ActivityIndicator
          animating={true}
          color={'white'}
          style={{position: 'absolute', top: 15, left: 100}}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  textInputTitle: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 16,
    fontWeight: '600',
    color: '#060F2F',
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
