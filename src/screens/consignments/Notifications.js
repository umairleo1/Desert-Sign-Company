import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import SecondaryHeader from '../../common/SecondaryHeader';
import {useTheme} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import ActivityIndicator from '../../common/ActivityIndicator';
import {AllNotifications} from '../../service/app.service';
import AuthContext from '../../utils/authContext';
import authStorage from '../../utils/authStorage';
import URL from '../../utils/url_path';
import moment from 'moment';

export default function Notifications() {
  const {colors} = useTheme();
  const {height, width} = useWindowDimensions();
  const [refreshing, setRefreshing] = React.useState(false);
  const [notification, setNotification] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(false);
  const authContext = React.useContext(AuthContext);
  const [image, setImage] = React.useState('');

  React.useEffect(async () => {
    getAllNotifications();
  }, []);

  const getAllNotifications = async () => {
    try {
      setIsloading(true);
      const result = await AllNotifications(authContext.userid);
      // console.log('notifications ', result.data);
      setNotification(result.data[0]?.notifications.reverse());
      setImage(result.data[0]?.customer.profilePhoto);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };

  const handleRefresh = async () => {
    notification.splice(0, notification.length);
    try {
      setIsloading(true);
      const result = await AllNotifications(authContext.userid);
      // console.log('notification ', result.data);
      setNotification(result.data[0]?.notifications.reverse());
      setImage(result.data[0]?.customer.profilePhoto);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };

  const renderNotification = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          //   marginTop: 10,
          width: '100%',
        }}>
        <View style={{width: '20%'}}>
          <Image
            style={{height: 44, width: 44, borderRadius: 22}}
            // source={require('../../../assets/images.jpg')}
            source={{
              uri: image
                ? URL.IMAGE_URL + image
                : 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
            }}
          />
        </View>
        <View style={{width: '60%'}}>
          <Text
            style={[styles.notifivationTet, {color: '#3D3D3D', fontSize: 15}]}>
            {item.title}
          </Text>
          <Text
            style={[styles.notifivationTet, {color: colors.descriptionText}]}>
            {item.body}
          </Text>
        </View>
        <View style={{width: '20%', alignItems: 'center'}}>
          <Text
            style={[
              styles.notifivationTet,
              {color: colors.descriptionText, textAlign: 'center'},
            ]}>
            {moment(item.createdAt).format('ddd, h:mm A')}
          </Text>
          {/* <Text
            style={[styles.notifivationTet, {color: colors.descriptionText}]}>
            pm
          </Text> */}
        </View>
      </View>
    );
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      // const data = await getProducts();
      handleRefresh();
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
  const EmptyListMessage = () => {
    return (
      <View
        style={{
          height: height - 300,
        }}>
        <LottieView
          source={require('../../../assets/empty.json')}
          autoPlay
          loop
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{marginHorizontal: 15, flex: 1}}>
      <ActivityIndicator visible={isLoading} />
      <SecondaryHeader title={'Notifications'} />
      <View style={styles.notificationBar}>
        <Text style={styles.notificationTitle}>Recent Notifications</Text>
        <EvilIcons style={styles.Icon} name="bell" />
      </View>
      <View style={[styles.divider, {backgroundColor: colors.divider}]} />
      <View style={{marginTop: 20, flex: 1}}>
        <FlatList
          ItemSeparatorComponent={itemSeperator}
          data={notification}
          renderItem={renderNotification}
          ItemSeparatorComponent={itemSeperator}
          ListEmptyComponent={EmptyListMessage}
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
