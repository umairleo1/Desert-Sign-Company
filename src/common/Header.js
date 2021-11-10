import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import NotificationIcon from '../../assets/svgs/Notification';
import DrawerMenu from '../../assets/svgs/DrawerMenu';
import SearchIcon from '../../assets/svgs/Search';
import {useNavigation, useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Header(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          width: 30,
          height: 25,
          justifyContent: 'center',
        }}
        onPress={() => navigation.toggleDrawer()}>
        <DrawerMenu />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: 'SourceSansPro-Regular',
          fontSize: 18,
          fontWeight: '600',
          color: '#1F2937',
          left: 15,
        }}>
        {props.title}
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
