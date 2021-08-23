import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginPage from './src/screen/LoginScreen';
import SignUpPage from './src/screen/SignUpScreen';
import HomePage from './src/screen/HomeScreen';
import QRScanner from './src/screen/QRScanner';
import ReserveScreen from './src/screen/ReserveScreen';
import SeatStatusScreen from './src/screen/SeatStatusScreen';
import SwitchButton from './src/screen/SliderScreen';
import CheckInSuccess from './src/screen/CheckInSuccess';
import RuleScreen from './src/screen/RuleScreen';
import HalfTimeRest from './src/screen/HalfTimeRest';
import SelectSeat from './src/screen/SelectSeatScreen';
import Welcome from './src/screen/Welcome';
import Reserve_nextPage from './src/screen/Reserve_nextPage_0313';

const RootStack = createStackNavigator(
  {
    Login: {
      screen: LoginPage,
    },
    SignUp: {
      screen: SignUpPage,
    },
    Home: {
      screen: HomePage,
    },
    CheckIn: {
      screen: QRScanner,
    },
    Reserve: {
      screen: ReserveScreen,
      params: {},
    },
    SelectSeat: {
      screen: SelectSeat,
    },
    SeatStatus: {
      screen: SeatStatusScreen,
    },
    Slider: {
      screen: SwitchButton,
    },
    CheckInSuccess: {
      screen: CheckInSuccess,
    },
    Rule: {
      screen: RuleScreen,
    },
    HalfTime: {
      screen: HalfTimeRest,
    },
    Welcome: {
      screen: Welcome,
    },
    Reserve_nextPage: {
      screen: Reserve_nextPage,
    },
  },
  {
    initialRouteName: 'Welcome',
  },
);

export default createAppContainer(RootStack);
