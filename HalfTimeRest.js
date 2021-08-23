import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

let date = new Date(Date.now());
let year = date.getFullYear();
let day = date.getDate(); 
let month = date.getMonth() + 1;
//let hour = date.getHours();

if(month < 10)
month = "0" + month.toString();
if(day < 10)
day = "0" + day.toString();

//ex: 20200321
let fulldate = year.toString()+month.toString()+day.toString();

const BackImage = require('../../img/checkinback.jpg');

const HalfTimeRest = ({navigation}) => {
  const stuNum = navigation.getParam('stuNum');

  const [firstTime, handlefirstTime] = useState(true);
  const [mins, setMins] = useState();
  const [secs, setSecs] = useState();
  const [buffermins, setbufferMins] = useState();
  const [buffersecs, setbufferSecs] = useState();

  useEffect(() => {
    if (firstTime) {
      AsyncStorage.getItem('setTimermin').then(value => {
        setMins(JSON.parse(value));
      });
      AsyncStorage.getItem('setTimersec').then(value => {
        setSecs(JSON.parse(value));
      });
      AsyncStorage.getItem('setbufferTimermin').then(value => {
        setbufferMins(JSON.parse(value));
      });
      AsyncStorage.getItem('setbufferTimersec').then(value => {
        setbufferSecs(JSON.parse(value));
      });
      handlefirstTime(false);
    }

    let olddata = [];
              //先抓取舊資料
              
  function fetchdata(stuNum){
    let database = firebase.database();
    database.ref(`/user/${stuNum}`).once('value', function(snapshot){
    let tmp = snapshot.child('violation').val();
      if(tmp != null){
        olddata = tmp;
        }
        });
      //console.log(stuNum);
      setTimeout(handledata, 1000);
  }
  let newdata = [];
      //把舊資料跟新資料一起update to firebase
      function handledata(){
      //console.log(olddata);
      newdata = olddata;
      //console.log(newdata);
      newdata.push(fulldate);
      firebase.database().ref(`/user/${stuNum}`).update({
      violation : newdata,
    });
  }

    const timerId = setInterval(() => {
      if (secs <= 0) {
        if (mins <= 0) {
          if (buffersecs <= 0) {
            if (buffermins <= 0) {

              fetchdata(stuNum);

              // end count
              clearInterval(timerId);
              //console.log('end');
              AsyncStorage.getItem('violationPoint').then(value => {
                let tmp = JSON.parse(value);
                if (tmp == null) {
                  tmp = 1;
                } else {
                  tmp += 1;
                }
                AsyncStorage.setItem('violationPoint', JSON.stringify(tmp));
              });
              navigation.replace('Home', {stuNum: stuNum});
            } else {
              setbufferMins(bm => bm - 1);
              setbufferSecs(59);
            }
          } else setbufferSecs(bs => bs - 1);
        } else {
          setMins(m => m - 1);
          setSecs(59);
        }
      } else setSecs(s => s - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [secs, mins, buffersecs, buffermins]);

  return (
    <ImageBackground
      source={BackImage}
      style={styles.container}
      imageStyle={{resizeMode: 'stretch'}}>
      <View style={styles.main_view}>
        <View style={styles.maintitle_view}>
          <Text style={{fontSize: 30, color: '#D89279'}}>中場休息</Text>
        </View>
        <View style={styles.subtitle_view}>{/* No Subtitle */}</View>
        <View style={styles.show_view}>
          <View style={styles.mainTime_view}>
            <Text style={styles.mainTimeText}>
              {mins < 10 && 0}
              {mins}:{secs < 10 && 0}
              {secs}
            </Text>
          </View>
          <View style={styles.subTime_view}>
            <Text style={styles.subTimeText}>
              緩衝 {buffermins < 10 && 0}
              {buffermins}:{buffersecs < 10 && 0}
              {buffersecs}
            </Text>
          </View>
        </View>
        <View style={styles.bottomBtn_view}>
          <View style={{flex: 1}}></View>
          <View style={styles.reuseBtn_view}>
            <TouchableHighlight
              underlayColor={null}
              onPress={() => {
                AsyncStorage.setItem('setTimermin', JSON.stringify(mins));
                AsyncStorage.setItem('setTimersec', JSON.stringify(secs));
                AsyncStorage.setItem(
                  'setbufferTimermin',
                  JSON.stringify(buffermins),
                );
                AsyncStorage.setItem(
                  'setbufferTimersec',
                  JSON.stringify(buffersecs),
                );
                navigation.replace('Home', {stuNum: stuNum});
              }}>
              <View style={styles.reuseBtn}>
                <Text style={{fontSize: 25, color: '#113662'}}>恢復使用</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={{flex: 3}}></View>
        </View>
      </View>
    </ImageBackground>
  );
};

HalfTimeRest.navigationOptions = {
  headerTransparent: true,
  title: '',
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  main_view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'center',
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
  show_view: {
    flex: 5,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTime_view: {
    flex: 1,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  subTime_view: {
    flex: 1,
    width: 200,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomBtn_view: {
    flex: 5,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reuseBtn_view: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //--------------------------------------------
  mainTimeText: {
    fontSize: 65,
    color: '#EAD8BB',
  },
  subTimeText: {
    fontSize: 25,
    color: '#EAD8BB',
  },
  reuseBtn: {
    width: 200,
    height: 65,
    borderRadius: 50,
    backgroundColor: '#D89279',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HalfTimeRest;
