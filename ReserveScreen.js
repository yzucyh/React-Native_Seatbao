import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
  Button,
  Image,
} from 'react-native';
import Picker from 'react-native-picker';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const BackImage = require('../../img/reserveback.jpg');
const options = ['B1', '1F', '2F'];

const ReserveScreen = ({navigation}) => {
  const stuNum = navigation.getParam('stuNum');

  const [valueDate, dateChange] = useState('請選擇日期');
  const [valueStartTime, timeStartChange] = useState('開始');
  const [valueEndTime, timeEndChange] = useState('結束');
  const [valueFloor, floorChange] = useState('請選擇樓層');
  const [openMap, mapChange] = useState(false);

  function _createDateData() {
    let NowDate = new Date();
    // console.log(NowDate.getDate());

    let date = [];
    let countday = 0;
    while (countday < 7) {
      let dateToString =
        NowDate.getFullYear() +
        '/' +
        (NowDate.getMonth() + 1 < 10 ? 0 : null) +
        (NowDate.getMonth() + 1) +
        '/' +
        NowDate.getDate();
      date.push(dateToString);
      NowDate.setDate(NowDate.getDate() + 1);
      countday++;
    }

    return date;
  }
  function _showDatePicker() {
    Picker.init({
      pickerData: _createDateData(),
      pickerBg: [232, 232, 232, 1],
      pickerFontSize: 20,
      pickerFontColor: [0, 0, 0, 1],
      pickerCancelBtnText: '',
      pickerConfirmBtnText: '確認',
      pickerConfirmBtnColor: [0, 0, 0, 1],
      pickerToolBarFontSize: 18,
      pickerTitleText: '',
      onPickerConfirm: pickedValue => {
        dateChange(pickedValue);
      },
      // PickerCancel: pickedValue => {
      //   dateChange(pickedValue);
      // },
      onPickerSelect: pickedValue => {
        dateChange(pickedValue);
      },
    });
    Picker.show();
  }

  // function _createTimeData() {
  //   let NowDate = new Date();
  //   let time = [];
  //   let NowHour = NowDate.getHours();
  //   if (NowHour < 8 || NowHour > 20) {
  //     NowHour = 8;
  //   }
  //   for (let firstHour = NowHour; firstHour < 21; firstHour++) {
  //     let firstItem = [];
  //     for (let secondHour = firstHour + 1; secondHour < 22; secondHour++) {
  //       firstItem.push(secondHour);
  //     }
  //     let _first = {};
  //     _first[firstHour] = firstItem;
  //     time.push(_first);
  //   }
  //   return time;
  // }
  // function _showTimePicker() {
  //   Picker.init({
  //     pickerData: _createTimeData(),
  //     pickerBg: [232, 232, 232, 1],
  //     pickerFontSize: 20,
  //     pickerFontColor: [0, 0, 0, 1],
  //     pickerCancelBtnText: '',
  //     pickerConfirmBtnText: '確認',
  //     pickerConfirmBtnColor: [0, 0, 0, 1],
  //     pickerToolBarFontSize: 18,
  //     pickerTitleText: '',
  //     onPickerConfirm: pickedValue => {
  //       timeStartChange(pickedValue[0]);
  //       timeEndChange(pickedValue[1]);
  //     },
  //     // PickerCancel: pickedValue => {
  //     //   dateChange(pickedValue);
  //     // },
  //     onPickerSelect: pickedValue => {
  //       timeStartChange(pickedValue[0]);
  //       timeEndChange(pickedValue[1]);
  //     },
  //   });
  //   Picker.show();
  // }
  function _createFloorData() {
    let floor = ['1F A區'];
    return floor;
  }
  function _showFloorPicker() {
    Picker.init({
      pickerData: _createFloorData(),
      pickerBg: [232, 232, 232, 1],
      pickerFontSize: 20,
      pickerFontColor: [0, 0, 0, 1],
      pickerCancelBtnText: '',
      pickerConfirmBtnText: '確認',
      pickerConfirmBtnColor: [0, 0, 0, 1],
      pickerToolBarFontSize: 18,
      pickerTitleText: '',
      onPickerConfirm: pickedValue => {
        floorChange(pickedValue);
      },
      // PickerCancel: pickedValue => {
      //   dateChange(pickedValue);
      // },
      onPickerSelect: pickedValue => {
        floorChange(pickedValue);
      },
    });
    Picker.show();
  }

  return (
    <ImageBackground
      source={BackImage}
      style={styles.container}
      imageStyle={{resizeMode: 'stretch'}}>
      <View style={styles.main_view}>
        <View style={styles.title_view}>
          <Text style={styles.title}>預約</Text>
        </View>
        <View style={styles.content_view}>
          <View style={styles.lebel_view}>
            <Text style={styles.label}>日期</Text>
          </View>
          <View style={styles.select_view}>
            <TouchableHighlight
              underlayColor={null}
              style={styles.selectBtn}
              onPress={() => {
                _showDatePicker();
              }}>
              <View style={styles.select_sphere}>
                <Text style={styles.select_text}>{valueDate}</Text>
              </View>
            </TouchableHighlight>
          </View>
          {/* <View style={styles.lebel_view}>
          <Text style={styles.label}>時間</Text>
        </View>
        <View style={styles.select_view}>
          <TouchableHighlight
            underlayColor={null}
            style={styles.selectBtn}
            onPress={() => {
              _showTimePicker();
            }}>
            <View style={styles.select_sphere}>
              <Text style={styles.select_text}>
                {valueStartTime} - {valueEndTime}
              </Text>
            </View>
          </TouchableHighlight>
        </View> */}
          <View style={styles.lebel_view}>
            <Text style={styles.label}>樓層</Text>
          </View>
          <View style={styles.select_view}>
            <TouchableHighlight
              underlayColor={null}
              style={styles.selectBtn}
              onPress={() => {
                _showFloorPicker();
              }}>
              <View style={styles.select_sphere}>
                <Text style={styles.select_text}>{valueFloor}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={{flex: 3}}></View>
        </View>

        <View style={styles.bottomBtn_view}>
          <TouchableHighlight
            underlayColor={null}
            style={styles.bottomBtn}
            onPress={() =>
              navigation.navigate('Reserve_nextPage', {
                stuNum: stuNum,
                selectDate: valueDate,
                selectFloor: valueFloor,
              })
            }>
            <Image
              source={require('./../../img/nextPageBtn.png')}
              style={styles.ImageLeaveStyle}
            />
          </TouchableHighlight>
        </View>
      </View>

      <View style={styles.position_view}>
        <TouchableHighlight
          underlayColor={null}
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={() => mapChange(!openMap)}>
          <Image
            source={require('./../../img/position.png')}
            style={{
              width: 45,
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </TouchableHighlight>
      </View>

      {openMap ? (
        <View style={styles.map_view}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('./../../img/position_map.png')}
              style={{
                width: 370,
                justifyContent: 'center',
                alignItems: 'center',
                transform: [{scale: 1}],
              }}
              resizeMode="contain"
            />
          </View>
        </View>
      ) : null}
    </ImageBackground>
  );
};

ReserveScreen.navigationOptions = {
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
  title_view: {
    flex: 4,
    width: 300,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  content_view: {
    flex: 7,
    width: 300,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  lebel_view: {
    flex: 1,
    paddingLeft: 30,
    width: 300,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  select_view: {
    flex: 2,
    width: 300,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  bottomBtn_view: {
    flex: 6,
    width: 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  //------------------------------------
  title: {
    fontSize: 30,
    color: '#D89279',
  },
  label: {
    fontSize: 20,
    color: '#EAD8BB',
  },
  select_sphere: {
    width: 300,
    height: 70,
    backgroundColor: '#D89279',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  select_text: {
    fontSize: 20,
    letterSpacing: 3,
  },
  bottomBtn: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  ImageLeaveStyle: {
    height: 100,
    width: 230,
    resizeMode: 'stretch',
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
  //----------------------------------------
  map_view: {
    position: 'absolute',
    bottom: 170,
    left: 10,
    width: width - 20,
    height: 350,
    backgroundColor: '#D89279',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default ReserveScreen;
