import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from 'react-native-paper';

import AppIcon from '../../../assets/svgs/AppIcon';

export default function index() {
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{paddingHorizontal: 10}} edges={['top', 'left']}>
      <AppIcon />
      <Text style={[styles.title, {color: colors.secondary}]}>
        Create Password?
      </Text>
      <Text style={{fontSize: 16, marginVertical: 10}}>
        To continue on Desert Sign, you must create a password.
      </Text>
      <View style={styles.testHolder}>
        <Text style={{fontSize: 16}}>Password</Text>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="Enter your new password"
          //   keyboardType="numeric"
          placeholderTextColor="gray"
        />
      </View>
      <View style={styles.testHolder}>
        <Text style={{fontSize: 16}}>Confirm Password</Text>

        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="Confirm your Password"
          //   keyboardType="numeric"
          placeholderTextColor="gray"
        />
      </View>

      <Button
        color={colors.button}
        onPress={() => navigation.navigate('Login')}
        style={{marginTop: 20, padding: 10}}
        labelStyle={{color: colors.background}}
        mode="contained">
        save
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    marginTop: 15,
  },
  input: {
    height: 50,
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
