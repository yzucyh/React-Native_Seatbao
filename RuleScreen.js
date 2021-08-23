import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ImageBack = require('./../../img/bk1.png');

const RuleScreen = ({navigation}) => {
  return (
    <ImageBackground source={ImageBack} style={styles.container}>
      <View style={styles.main_view}>
        <View style={{flex: 1}}></View>
        <View style={styles.scrollBack_view}>
          <View style={styles.title_view}>
            <Text style={{fontSize: 25, color: '#114662'}}>規則</Text>
          </View>
          <View style={styles.scroll_view}>
            <ScrollView style={styles.scrollview}>
              <Text style={styles.text}>
                在預約時間10分鐘內，需掃描座位上之QR碼，完成報到手續，否
                則將會被系統紀錄1次違規，且取消該使用者之預約時段，若多次
                違規則予以停權一周。完成報到後若有暫時離開之需要，系統將
                給予15分鐘的緩衝，他人查看系統就會得知該位置尚在使用的資訊。
              </Text>
            </ScrollView>
          </View>
          <View style={styles.backBtn_view}>
            <TouchableHighlight
              underlayColor={null}
              onPress={() => navigation.goBack()}>
              <View style={styles.backBtn}>
                <Text style={{fontSize: 20, color: '#EAD8BB'}}>返回</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{flex: 1}}></View>
      </View>
    </ImageBackground>
  );
};

RuleScreen.navigationOptions = {
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
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  scrollBack_view: {
    flex: 2,
    width: 300,
    height: 300,
    backgroundColor: '#D89279',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title_view: {
    flex: 1,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  scroll_view: {
    flex: 6,
    width: 250,
    height: 200,
    backgroundColor: '#EAD8BB',
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
  },
  backBtn_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //------------------------------
  text: {
    fontSize: 20,
    color: '#114662',
  },
  scrollview: {
    marginHorizontal: 10,
  },
  backBtn: {
    width: 80,
    height: 30,
    backgroundColor: '#114662',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});

export default RuleScreen;
