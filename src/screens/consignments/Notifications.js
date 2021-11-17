import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import SecondaryHeader from '../../common/SecondaryHeader';
import {useTheme} from '@react-navigation/native';

export default function Notifications() {
  const data = [1, 2, 3];
  const {colors} = useTheme();

  const [refreshing, setRefreshing] = React.useState(false);

  const renderNotification = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          //   marginTop: 10,
        }}>
        <Image
          style={{height: 44, width: 44, borderRadius: 22}}
          source={require('../../../assets/images.jpg')}
        />
        <View style={{width: '70%'}}>
          <Text
            style={[styles.notifivationTet, {color: colors.descriptionText}]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            scelerisque egestas diam tellus volutpat ut.
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={[styles.notifivationTet, {color: colors.descriptionText}]}>
            12:15
          </Text>
          <Text
            style={[styles.notifivationTet, {color: colors.descriptionText}]}>
            pm
          </Text>
        </View>
      </View>
    );
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      // const data = await getProducts();

      // setProducts(data.data);
      setRefreshing(false);
    } catch (e) {
      setRefreshing(false);
      console.warn(e);
    }
  };
  const itemSeperator = () => {
    return (
      <View
        style={[
          // styles.divider,
          {backgroundColor: colors.divider, marginVertical: 10, height: 1},
        ]}
      />
    );
  };

  return (
    <SafeAreaView style={{marginHorizontal: 15, flex: 1}}>
      <SecondaryHeader title={'Notifications'} />
      <View style={styles.notificationBar}>
        <Text style={styles.notificationTitle}>Recent Notifications</Text>
        <EvilIcons style={styles.Icon} name="bell" />
      </View>
      <View style={[styles.divider, {backgroundColor: colors.divider}]} />
      <View style={{marginTop: 20, flex: 1}}>
        <FlatList
          ItemSeparatorComponent={itemSeperator}
          data={data}
          renderItem={renderNotification}
          ItemSeparatorComponent={itemSeperator}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  notificationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  Icon: {
    fontSize: 30,
  },
  divider: {
    height: 2,
    marginTop: 10,
  },
  notifivationTet: {
    fontSize: 14,
    fontWeight: '400',
  },
});
