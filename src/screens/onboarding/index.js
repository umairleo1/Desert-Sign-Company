import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from 'react-native-paper';

import AppIcon from '../../../svgs/AppIcon';
import Delivery from '../../../svgs/Delivery';

export default function index() {
  const {colors} = useTheme();
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
      }}>
      <ScrollView>
        <View style={{paddingVertical: 10}}>
          <AppIcon />
        </View>
        <View
          style={{
            marginTop: 10,
            alignItems: 'center',
          }}>
          <Delivery />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={[styles.heading, {color: colors.secondary}]}>
            Welcome to
          </Text>
          <Text style={[styles.heading, {color: colors.secondary}]}>
            Desert sign
          </Text>
        </View>
        <View style={{width: '70%', marginTop: 5}}>
          <Text style={styles.description}>
            Improve your productivity and save more time by on boarding all
            consignments
          </Text>
        </View>
        <Button
          color={colors.button}
          onPress={() => navigation.navigate('Login')}
          style={{marginTop: 40, padding: 10, borderRadius: 10}}
          labelStyle={{color: colors.background}}
          mode="contained">
          Sign in
        </Button>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          <Text>Don't have an account?</Text>
          <Button
            onPress={() => navigation.navigate('SignUp')}
            color={colors.signupButton}>
            Create account
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 32,
  },
  description: {
    fontSize: 18,
    // fontWeight: 'normal',
    // fontFamily: 'Proxima Nova Alt Condensed Light',
  },
});
