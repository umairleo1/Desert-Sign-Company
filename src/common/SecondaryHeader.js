import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import ArrowRight from '../../assets/svgs/ArrowRight';

export default function SecondaryHeader(props) {
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.header, {borderBottomColor: colors.headerBottom}]}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.iconSection}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowRight />
          </TouchableOpacity>
        </View>
        <View style={styles.headingSection}>
          <Text style={styles.heading}>{props?.title}</Text>
          {props.consignmentNumber && (
            <Text
              style={{
                fontFamily: 'Proxima Nova Font',
                fontSize: 11,
                color: 'grey',
              }}>
              #{props?.consignmentNumber}
            </Text>
          )}
        </View>
      </View>
      <View style={{position: 'absolute', right: 5}}>
        <TouchableOpacity
          style={styles.popUpMenuIcon}
          onPress={() => props.setShowPopup(!props.showPopup)}>
          {props.iconName}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Proxima Nova Font',
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
  },
  headingSection: {
    width: '80%',
    marginLeft: 10,
    justifyContent: 'center',
  },
  iconSection: {
    width: '8%',
    justifyContent: 'center',
    // backgroundColor: 'red',
    // marginLeft: -10,
    // paddingLeft: 10,
  },
  header: {
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  popUpMenuIcon: {
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
});
