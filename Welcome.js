import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';

const ImageBack = require('./../../img/welcome.gif');

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Welcome = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView style={{width: width, height: height}}>
      <ImageBackground
        source={ImageBack}
        style={{width: width, height: height}}></ImageBackground>
    </ScrollView>
  );
};

Welcome.navigationOptions = {
  headerTransparent: true,
  title: '',
};

export default Welcome;
