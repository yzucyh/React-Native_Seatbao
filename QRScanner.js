import React,{useState} from 'react';

import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  ImageBackground,
  Button,
  TouchableHighlight,
} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import QRCodeScanner from 'react-native-qrcode-scanner';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const BackImage = require('./../../img/checkinback.jpg');

const QRScanner = ({navigation}) => {
  const stuNum = navigation.getParam('stuNum');
  const [cantuse, handlecantuse] = useState(false);
  const [notexist, handlenotexist] = useState(false);

  function onSuccess(e) {
    //let seatID = 'seat_A-1-1'; //到時候把這個改成QRCode讀到的資料
    let seatID = e.data;
    console.log(e.data);
    let db = firebase.database();
    let ref = db.ref(`/seat/${seatID}`);
    ref.once('value', snapshot => {
      if (snapshot.exists()) {
        let itemRef = ref.child('status');
        itemRef.once('value', snapshot => {
          
          if (snapshot.val() == 0) {
            ref.update({
              status: 1,
            });

            AsyncStorage.getItem('using').then(value => {
              if (value != '1') {
                AsyncStorage.setItem('using', '1');
              }
            });

            navigation.replace('CheckInSuccess', {stuNum: stuNum,seatID : seatID});
          } else {
            handlecantuse(true);
          }
        });
      } else {
        handlenotexist(true);
      }
    });
  }

  return (
    <ImageBackground
      source={BackImage}
      style={styles.container}
      imageStyle={{resizeMode: 'stretch'}}>
      <View style={styles.main_view}>
        <View style={styles.maintitle_view}>
          <Text style={{fontSize: 30, color: '#D89279'}}>報到</Text>
        </View>
        <View style={styles.subtitle_view}>
          <Text style={{fontSize: 18, color: '#EAD8BB', paddingTop: 25}}>
            請掃描座位上QRcode以完成報到
          </Text>
        </View>
        <View style={styles.scanner_view}>
          <QRCodeScanner
            onRead={onSuccess}
            showMarker={true}
            containerStyle={styles.cameraContainer}
            cameraStyle={styles.cameraStyle}
            reactivate={true}
          />
        </View>
        {/* <Button title="Press Me" onPress={() => onSuccess()} /> */}
        <View style={{flex: 4}}></View>
      </View>
      {cantuse ? (
          <View style={styles.detail_view}>
            <View style={styles.doubleCheckContainer}>
              <View style={styles.doubleCheckcontainer}>
                <View style={styles.doubleCheckItem}>
                  <Text style={{fontSize: 25, color: '#32617B'}}>
                    此座位不能使用
                  </Text>
                </View>
                <View
                  style={
                    (styles.doubleCheckItem,
                    {
                      width: 250,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    })
                  }>
                  <TouchableHighlight
                    underlayColor={null}
                    onPress={() => handlecantuse(false)}>
                    <View style={styles.ModalCancelBtn}>
                      <Text style={{fontSize: 20, color: '#EAD8BB'}}>返回</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={styles.doubleCheckback}></View>
            </View>
          </View>
        ) : null}

        {notexist ? (
          <View style={styles.detail_view}>
            <View style={styles.doubleCheckContainer}>
              <View style={styles.doubleCheckcontainer}>
                <View style={styles.doubleCheckItem}>
                  <Text style={{fontSize: 25, color: '#32617B'}}>
                    此座位ID不存在
                  </Text>
                </View>
                <View
                  style={
                    (styles.doubleCheckItem,
                    {
                      width: 250,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    })
                  }>
                  <TouchableHighlight
                    underlayColor={null}
                    onPress={() => handlenotexist(false)}>
                    <View style={styles.ModalCancelBtn}>
                      <Text style={{fontSize: 20, color: '#EAD8BB'}}>返回</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={styles.doubleCheckback}></View>
            </View>
          </View>
        ) : null}
    </ImageBackground>
  );
};

QRScanner.navigationOptions = {
  headerTransparent: true,
  title: '',
};

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
  },
  main_view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'center',
  },
  maintitle_view: {
    flex: 2,
    width: 300,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  subtitle_view: {
    flex: 2,
    width: 300,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  scanner_view: {
    flex: 6,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#32617B',
    borderRadius: 20,
  },
  //-------------------------------------
  cameraContainer: {},
  cameraStyle: {
    width: 250,
    height: 250,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  //-----------------------------------------
  //modal
  detail_view: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  ModalCancelBtn: {
    width: 100,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#D7423E',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doubleCheckContainer: {
    width: width,
    height: height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doubleCheckcontainer: {
    height: 300, //660
    width: 350, //410
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAD8BB',
    borderRadius: 20,
    paddingTop: 20,
    paddingBottom: 30,
    position: 'absolute',
    zIndex: 2,
  },
  doubleCheckItem: {
    flex: 1,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doubleCheckBtn: {
    width: 100,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#32617B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doubleCheckCancelBtn: {
    width: 100,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#D7423E',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doubleCheckback: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#114662',
    opacity: 0.7,
    zIndex: 1,
  },
});

export default QRScanner;
