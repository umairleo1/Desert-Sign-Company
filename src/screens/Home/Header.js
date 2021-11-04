import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import NotificationIcon from '../../../assets/svgs/Notification';
import DrawerMenu from '../../../assets/svgs/DrawerMenu';
import SearchIcon from '../../../assets/svgs/Search';
import {useNavigation, useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Header() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <DrawerMenu />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: 'Proxima Nova Font',
          fontSize: 18,
          fontWeight: '600',
          color: '#1F2937',
          left: 15,
        }}>
        Shipments
      </Text>
      <View style={{flexDirection: 'row', position: 'absolute', right: 0}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={{marginRight: 15}}>
          <SearchIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <NotificationIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
});
