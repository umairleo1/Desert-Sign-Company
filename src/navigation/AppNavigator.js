// import 'react-native-gesture-handler';
// import * as React from 'react';
// import {View, StyleSheet, Text, Button} from 'react-native';
// import {
//   NavigationContainer,
//   useNavigation,
//   useTheme,
// } from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {themeLight} from '../../config/theme';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {DrawerContent} from './DrawerContent';
// // //Home screens
// // import HomeScreen from '../screens/homeScreen/Home';
// // import Maps from '../screens/maps/Maps';
// // import Order from '../screens/orders/index';
// // import OrderDetails from '../screens/orders/OrderDetails';
// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// function Settings() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Settings</Text>
//     </View>
//   );
// }

// // const drawerNavigator = () => (
// //   <Drawer.Navigator initialRouteName="Home">
// //     <Drawer.Screen name="Home" component={HomeScreen} />
// //     <Drawer.Screen name="Settings" component={Settings} />
// //   </Drawer.Navigator>
// // );

// // const orderStack = () => (
// //   <Stack.Navigator
// //     screenOptions={{
// //       headerShown: false,
// //       detachPreviousScreen: false,
// //     }}>
// //     {/* <Stack.Screen name="Settings" component={Settings} /> */}
// //     <Stack.Screen name="Orders" component={Order} />
// //     <Stack.Screen name="OrderDetails" component={OrderDetails} />
// //   </Stack.Navigator>
// // );

// const homeStack = () => (
//   <Stack.Navigator
//     // initialRouteName="ProfitHero"
//     screenOptions={{
//       headerShown: false,
//       detachPreviousScreen: false,
//     }}>
//     <Stack.Screen name="HomeScreen" component={Settings} />
//   </Stack.Navigator>
// );
// const Navigator = () => {
//   return (
//     <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
//       {/* <Drawer.Screen name="drawerNavigator" component={drawerNavigator} /> */}
//       <Drawer.Screen name="HomeStack" component={homeStack} />
//       {/* <Drawer.Screen name="orderStack" component={orderStack} /> */}
//     </Drawer.Navigator>
//   );
// };

// export default function Appnavigator() {
//   return (
//     <NavigationContainer theme={themeLight}>
//       <Navigator />
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({});

import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
