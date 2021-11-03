import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import AppIconSmall from '../../../assets/svgs/AppIconSmall';
import {useNavigation, useTheme} from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Icon
          onPress={() => navigation.toggleDrawer()}
          style={styles.icon}
          name="menu"
        />
      </View>
      <View>
        <AppIconSmall />
      </View>
      <View style={{flexDirection: 'row'}}>
        <EvilIcons
          onPress={() => navigation.navigate('Search')}
          style={[styles.searchIcon, {marginRight: 10}]}
          name="search"
        />
        <EvilIcons
          onPress={() => navigation.navigate('Notification')}
          style={styles.searchIcon}
          name="bell"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 30,
  },
  searchIcon: {
    fontSize: 30,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
});
