import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const BackImage = require('../../img/checkinback.jpg');

const CheckInSuccess = ({navigation}) => {
  const stuNum = navigation.getParam('stuNum');
  let seatID = [];
  seatID = navigation.getParam('seatID');
  AsyncStorage.setItem('GseatID', seatID);

  const [openHalfTime, handleOpenAlert] = useState(false);

  const date = new Date(Date.now());
  const year = date.getFullYear();
  const day = date.getDate();
  const month = date.getMonth() + 1; //1月是0
  const weeknum = date.getDay(); //0 禮拜日
  let hour = date.getHours();
  hour = hour + ':00';
  seatID = seatID[5] + seatID[6] + seatID[7] + seatID[8] + seatID[9];
  let today;
  if (weeknum == 0) today = '日';
  else if (weeknum == 1) today = '一';
  else if (weeknum == 2) today = '二';
  else if (weeknum == 3) today = '三';
  else if (weeknum == 4) today = '四';
  else if (weeknum == 5) today = '五';
  else if (weeknum == 6) today = '六';
  const fulldate = year + '/' + month + '/' + day + ' (' + today + ')';
  console.log(weeknum);
  useEffect(() => {
    AsyncStorage.setItem('setTimermin', JSON.stringify(30));
    AsyncStorage.setItem('setTimersec', JSON.stringify(0));
    AsyncStorage.setItem('setbufferTimermin', JSON.stringify(10));
    AsyncStorage.setItem('setbufferTimersec', JSON.stringify(0));
  }, []);

  return (
    <ImageBackground
      source={BackImage}
      style={styles.container}
      imageStyle={{resizeMode: 'stretch'}}>
      <View style={styles.main_view}>
        <View style={styles.maintitle_view}>
          <Text style={{fontSize: 30, color: '#D89279'}}>報到成功</Text>
        </View>
        <View style={styles.subtitle_view}>{/* No Subtitle */}</View>
        <View style={styles.show_view}>
          <View style={styles.showTitle_view}>
            <Text style={styles.showText}>使用資訊</Text>
          </View>
          <View style={styles.showContent_view}>
            <Text style={styles.showText}>{fulldate}</Text>
            <Text style={styles.showText}>{hour}</Text>
            <Text style={styles.showText}>預約座位 {seatID}</Text>
          </View>
        </View>
        <View style={styles.bottomBtn_view}>
          <View style={{flex: 1}}></View>
          <View style={styles.ruleBtn_view}>
            <TouchableHighlight
              underlayColor={null}
              onPress={() => navigation.replace('Home', {stuNum: stuNum})}>
              <View style={styles.ruleBtn}>
                <Text style={{fontSize: 25, color: '#113662'}}>回首頁</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.restBtn_view}>
            <TouchableHighlight
              underlayColor={null}
              onPress={() => handleOpenAlert(true)}>
              <View style={styles.restBtn}>
                <Text style={{fontSize: 25, color: '#EAD8BB'}}>中場休息</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={{flex: 1}}></View>
        </View>
      </View>

      <View style={styles.alert_view}>
        <Modal visible={openHalfTime} transparent={true} animationType={'fade'}>
          <View style={styles.ModalouterContainer}>
            <View style={styles.Modalcontainer}>
              <View style={styles.Modaltitle_view}>
                <Text style={{fontSize: 25, color: '#113662'}}>中場休息</Text>
              </View>
              <View style={styles.Modalcontent_view}>
                <Text style={{fontSize: 20, color: '#113662'}}>
                  一次可休息30分鐘,並在時間截止後有10分鐘緩衝時間恢復使用狀態,僅可使
                  用一次。若超時將會被記錄違規一次,超時並遲遲未歸者,系統會通報櫃檯並
                  請工讀生將座位物品暫時放置於櫃檯,並取消當次使用權利。
                </Text>
              </View>
              <View style={styles.Modalbtn_view}>
                <TouchableHighlight
                  underlayColor={null}
                  onPress={() => {
                    handleOpenAlert(false);
                    navigation.replace('HalfTime', {stuNum: stuNum});
                  }}>
                  <View style={styles.ModalBtn}>
                    <Text style={{fontSize: 25, color: '#EAD8BB'}}>確認</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={null}
                  onPress={() => handleOpenAlert(false)}>
                  <View style={styles.ModalBtn}>
                    <Text style={{fontSize: 25, color: '#EAD8BB'}}>返回</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.position_view}>
        <TouchableHighlight
          underlayColor={null}
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={() => navigation.navigate('Rule')}>
          <View style={styles.newBtn}>
            <Text style={{fontSize: 20, color: '#113662', fontWeight: '600'}}>
              ?
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </ImageBackground>
  );
};

CheckInSuccess.navigationOptions = {
  headerTransparent: true,
  headerLeft: () => (visible = null),
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
    backgroundColor: '#EAD8BB',
    borderRadius: 20,
  },
  showTitle_view: {
    flex: 1,
    width: 200,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  showContent_view: {
    flex: 2,
    width: 200,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingBottom: 20,
  },
  bottomBtn_view: {
    flex: 5,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ruleBtn_view: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  restBtn_view: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  alert_view: {
    position: 'absolute',
    top: 150,
    left: 30,
  },
  //--------------------------------------------
  showText: {
    fontSize: 25,
    color: '#114662',
  },
  ruleBtn: {
    width: 200,
    height: 65,
    borderRadius: 50,
    backgroundColor: '#D89279',
    justifyContent: 'center',
    alignItems: 'center',
  },
  restBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  //-------------------------------------
  position_view: {
    position: 'absolute',
    bottom: 40,
    left: 30,
    width: 50,
    height: 50,
    backgroundColor: '#D89279',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newBtn: {
    width: 50,
    height: 50,
    backgroundColor: '#D89279',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //--------------------------------
  //Modal
  ModalouterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000088',
  },
  Modalcontainer: {
    height: 400, //660
    width: 350, //410
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAD8BB',
    borderRadius: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  Modaltitle_view: {
    flex: 2,
    width: 300,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  Modalcontent_view: {
    flex: 5,
    width: 300,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  Modalbtn_view: {
    flex: 2,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  ModalBtn: {
    width: 120,
    height: 50,
    backgroundColor: '#113662',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CheckInSuccess;
