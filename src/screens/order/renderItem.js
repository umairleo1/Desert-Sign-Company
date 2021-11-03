import {useTheme, useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector, useDispatch, connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';

import {deleteItem, setSavedItem} from '../../store/reducers/savedItem';

const renderItem = item => {
  const {colors} = useTheme();
  const [isSave, setIsSave] = React.useState(false);
  const [savedID, setSavedID] = React.useState();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const savedItem = useSelector(state => state.savedItem.data);
  const date = moment(item?.item?.createdAt);

  return (
    <TouchableWithoutFeedback>
      <View style={styles.descriptionContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{backgroundColor: colors.button, borderRadius: 5}}>
            <Text style={([styles.title], {color: 'white', padding: 5})}>
              {item?.item?.orderId}
            </Text>
          </View>

          <Text>$ {item?.item?.total}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {<Text style={styles.title}>{date.format('MMMM-DD-YYYY')}</Text>}

          <Text style={{fontSize: 15, color: 'orange', fontWeight: '600'}}>
            In Progress
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  descriptionContainer: {
    // backgroundColor: 'red',
    height: 120,
    borderWidth: 0.5,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    // elevation: 1,

    borderRadius: 10,
    borderColor: 'gray',
    padding: 10,
    justifyContent: 'space-between',
    marginBottom: 7,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default renderItem;
