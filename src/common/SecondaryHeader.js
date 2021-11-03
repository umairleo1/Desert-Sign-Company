import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function SecondaryHeader(props) {
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.header, {borderBottomColor: colors.headerBottom}]}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.iconSection}>
          <Icon
            onPress={() => navigation.goBack()}
            style={{fontSize: 25}}
            name={props?.iconName}
          />
        </View>
        <View style={styles.headingSection}>
          <Text style={[styles.heading, {color: colors.profileBcackGround}]}>
            {props?.title}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: '600',
  },
  headingSection: {
    width: '80%',
    marginLeft: 10,
    justifyContent: 'center',
  },
  iconSection: {width: '8%', alignItems: 'flex-start'},
  header: {
    height: 50,

    justifyContent: 'center',
    borderBottomWidth: 1,
  },
});
