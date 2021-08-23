import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Picker from 'react-native-picker';
import {ScrollView} from 'react-native-gesture-handler';
import firebase from 'react-native-firebase';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Reserve_nextPage = ({navigation}) => {
  const stuNum = navigation.getParam('stuNum');
  const selectDate = navigation.getParam('selectDate');
  const selectFloor = navigation.getParam('selectFloor');

  const [valueTable, TableChange] = useState('選桌號');
  const [valueSeat, SeatChange] = useState('選座位');
  const [reserveSuccess, openSuccess] = useState(false);
  const [openBtn, handleOpenBtn] = useState(false);

  let [showbtn_fin, handleshowbtn_fin] = useState([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ]);
  let [pressdown8, handlepressdown8] = useState(0);
  let [pressdown9, handlepressdown9] = useState(0);
  let [pressdown10, handlepressdown10] = useState(0);
  let [pressdown11, handlepressdown11] = useState(0);
  let [pressdown12, handlepressdown12] = useState(0);
  let [pressdown13, handlepressdown13] = useState(0);
  let [pressdown14, handlepressdown14] = useState(0);
  let [pressdown15, handlepressdown15] = useState(0);
  let [pressdown16, handlepressdown16] = useState(0);
  let [pressdown17, handlepressdown17] = useState(0);
  let [pressdown18, handlepressdown18] = useState(0);
  let [pressdown19, handlepressdown19] = useState(0);
  let [pressdown20, handlepressdown20] = useState(0);
  let [pressdown21, handlepressdown21] = useState(0);

  let showbtn = [];
  let test = [];
  let oldseat = [];
  let oldtime = [];
  let path, reserve_date;
  path = valueTable + '-' + valueSeat;
  //A-1-1 -> seat_A-1-1
  path = 'seat_' + path;
  let tmp_path = [
    'seat_A-1-1',
    'seat_A-1-2',
    'seat_A-1-3',
    'seat_A-1-4',
    'seat_A-2-1',
    'seat_A-2-2',
    'seat_A-2-3',
    'seat_A-2-4',
    'seat_A-3-1',
    'seat_A-3-2',
    'seat_A-3-3',
    'seat_A-3-4',
    'seat_A-4-1',
    'seat_A-4-2',
    'seat_A-4-3',
    'seat_A-4-4',
    'seat_A-5-1',
    'seat_A-5-2',
    'seat_A-5-3',
    'seat_A-5-4',
  ];

  //2020/03/14 -> 20200314
  reserve_date =
    selectDate[0][0] +
    selectDate[0][1] +
    selectDate[0][2] +
    selectDate[0][3] +
    selectDate[0][5] +
    selectDate[0][6] +
    selectDate[0][8] +
    selectDate[0][9];
  //console.log(reserve_date);

  let db = firebase.database();
  for (let j = 0; j < tmp_path.length; j++) {
    let itemRef = db.ref(`/seat/${tmp_path[j]}/seat_reserve`); //撈取資料的路徑
    let status = [];
    itemRef.once('value', snapshot => {
      async function a() {
        function b() {
          {
            for (let i = 8; i < 22; i++) {
              let data = snapshot.child(`${i}/${reserve_date}/stuNum`).val();
              status.push(data);
              showbtn.push(status);
            }
          }
        }
        await b();
        //console.log(status);
        test.push(status);
        //console.log(test);
      }
      a();
    });
  }

  let itemRef = firebase
    .database()
    .ref(`/user/${stuNum}/reserve/${reserve_date}/seatID`);
  itemRef.once('value', snapshot => {
    let k = snapshot.val();
    oldseat = k;
    //console.log(k);
  });

  let itemRef2 = firebase
    .database()
    .ref(`/user/${stuNum}/reserve/${reserve_date}/time`);
  itemRef2.once('value', snapshot => {
    let t = snapshot.val();
    oldtime = t;
    //console.log(t);
  });

  function _createSeatData() {
    let seat = ['1', '2', '3', '4'];
    return seat;
  }

  function _showSeatPicker() {
    Picker.init({
      flex: 2,
      flexDirection: 'row',
      pickerData: _createSeatData(),
      pickerBg: [232, 232, 232, 1],
      pickerFontSize: 20,
      pickerFontColor: [0, 0, 0, 1],
      pickerCancelBtnText: '',
      pickerConfirmBtnText: '確認',
      pickerConfirmBtnColor: [0, 0, 0, 1],
      pickerToolBarFontSize: 18,
      pickerTitleText: '',
      onPickerConfirm: pickedValue => {
        SeatChange(pickedValue);
      },
      onPickerSelect: pickedValue => {
        SeatChange(pickedValue);
      },
    });
    Picker.show();
  }

  function _createTableData() {
    let floor = ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'];
    return floor;
  }

  function _showTablePicker() {
    Picker.init({
      flex: 2,
      flexDirection: 'row',
      pickerData: _createTableData(),
      pickerBg: [232, 232, 232, 1],
      pickerFontSize: 20,
      pickerFontColor: [0, 0, 0, 1],
      pickerCancelBtnText: '',
      pickerConfirmBtnText: '確認',
      pickerConfirmBtnColor: [0, 0, 0, 1],
      pickerToolBarFontSize: 18,
      pickerTitleText: '',
      onPickerConfirm: pickedValue => {
        TableChange(pickedValue);
      },
      onPickerSelect: pickedValue => {
        TableChange(pickedValue);
      },
    });
    Picker.show();
  }

  //重整btns 全設為0
  function resetbtns() {
    handlepressdown8(0);
    handlepressdown9(0);
    handlepressdown10(0);
    handlepressdown11(0);
    handlepressdown12(0);
    handlepressdown13(0);
    handlepressdown14(0);
    handlepressdown15(0);
    handlepressdown16(0);
    handlepressdown17(0);
    handlepressdown18(0);
    handlepressdown19(0);
    handlepressdown20(0);
    handlepressdown21(0);
  }

  function showstatus() {
    //which table
    let tal, sea, i, j;
    let floor = ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'];
    let seat = ['1', '2', '3', '4'];
    for (i = 0; i < floor.length; i++) {
      if (valueTable == floor[i]) tal = i;
    }
    //which seat
    for (j = 0; j < seat.length; j++) {
      if (valueSeat == seat[j]) sea = j;
    }

    //test存放著選擇日期的所有座位
    //藉由計算index 選出正確的value並放回showbtn_fin
    let index = 4 * tal + sea;
    //console.log(test);
    //console.log(index);
    handleshowbtn_fin(test[index]);
    console.log(showbtn_fin);
    console.log(test[index]);
  }

  //預約並更新firebase
  function checkandreserve() {
    //reserve_date      選擇日期 ex: 20200314
    //path              選擇位置 ex: seat_A-1-1
    //pressdown8..21    if value = 1 代表要預約8點
    //stuNum            學號 ex: 1063317

    //寫回seat
    let tmp = [
      pressdown8,
      pressdown9,
      pressdown10,
      pressdown11,
      pressdown12,
      pressdown13,
      pressdown14,
      pressdown15,
      pressdown16,
      pressdown17,
      pressdown18,
      pressdown19,
      pressdown20,
      pressdown21,
    ];

    for (let i = 0; i < tmp.length; i++) {
      if (tmp[i] != 0) {
        firebase
          .database()
          .ref(`/seat/${path}/seat_reserve/${i + 8}/${reserve_date}`)
          .update({
            stuNum: stuNum,
          });
      }
    }
    //寫回user

    //先記錄開始和結束時間
    let start, end;
    for (let i = 0; i < tmp.length - 1; i++) {
      if (tmp[0] != 0 && tmp[1] != 0) start = 8;
      else if (tmp[i] == 0 && tmp[i + 1] != 0) start = i + 9;

      if (tmp[tmp.length - 1] != 0 && tmp[tmp.length - 2] != 0) end = 22;
      else if (tmp[i] == 0 && tmp[i - 1] != 0) end = i + 8;
    }
    //console.log("start : "+start +"  "+"end : "+end);
    console.log(oldseat);
    //let tmp_d = oldseat;
    let tmp_d;
    if (oldseat == null) tmp_d = [];
    else tmp_d = oldseat;

    //let tmp_t = oldtime;
    //let tmp_d = oldseat;
    let tmp_t;
    if (oldtime == null) tmp_t = [];
    else tmp_t = oldtime;

    tmp_d.push(path);
    tmp_t.push(start.toString());
    tmp_t.push(end.toString());
    console.log(oldtime);
    // firebase.database().ref(`/user/${stuNum}/reserve/${reserve_date}/seatID`).set({
    //   tmp_d,
    // })
    firebase
      .database()
      .ref(`/user/${stuNum}/reserve/${reserve_date}`)
      .set({
        seatID: tmp_d,
        time: tmp_t,
      });
  }

  return (
    <ImageBackground
      source={require('./../../img/bk1.png')}
      style={{position: 'relative', width: '100%', height: '100%'}}>
      <View style={styles.Back_view_1}>
        <View style={styles.middle_block}>
          <Image
            source={require('./../../img/corner_a.png')}
            style={styles.ImageStyle}
          />
        </View>
      </View>

      <View style={styles.Back_view_2}>
        <View style={styles.middle_block}>
          <View style={styles.select_view}>
            <TouchableHighlight
              underlayColor={null}
              style={styles.selectBtn}
              onPress={() => {
                _showTablePicker();
              }}>
              <View style={styles.select_sphere}>
                <Text style={styles.select_text}>{valueTable}</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={null}
              style={styles.selectBtn}
              onPress={() => {
                _showSeatPicker();
              }}>
              <View style={styles.select_sphere_2}>
                <Text style={styles.select_text}>{valueSeat}</Text>
              </View>
            </TouchableHighlight>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                //未選擇table,seat前 按go沒反應
                if (valueTable != '選桌號' && valueSeat != '選座位') {
                  handleOpenBtn(true);
                  resetbtns();
                  showstatus();
                }
              }}>
              <Text style={styles.buttonText}> Go </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttombtn_view}>
            {/* time buttons */}
            <ScrollView>
            {openBtn?(
              <View style={styles.btns}>
                {!showbtn_fin[0] ? (
                  <TouchableHighlight
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                      marginRight: 5,
                      width: 300 / 3,
                      height: 40,
                      backgroundColor: pressdown8 ? '#D89279' : '#fff',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 2,
                      borderColor: '#114662',
                      borderRadius: 20,
                    }}
                    onPress={() => {
                      handlepressdown8(!pressdown8);
                      //console.log(pressdown8);
                    }}>
                    <Text style={styles.select_text_btn}>08:00</Text>
                  </TouchableHighlight>
                ) : null}
                {!showbtn_fin[1] ? (
                  <TouchableHighlight
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                      marginRight: 5,
                      width: 300 / 3,
                      height: 40,
                      backgroundColor: pressdown9 ? '#D89279' : '#fff',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 2,
                      borderColor: '#114662',
                      borderRadius: 20,
                    }}
                    onPress={() => {
                      handlepressdown9(!pressdown9);
                    }}>
                    <Text style={styles.select_text_btn}>09:00</Text>
                  </TouchableHighlight>
                ) : null}
                {!showbtn_fin[2] ? (
                  <TouchableHighlight
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                      marginRight: 5,
                      width: 300 / 3,
                      height: 40,
                      backgroundColor: pressdown10 ? '#D89279' : '#fff',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 2,
                      borderColor: '#114662',
                      borderRadius: 20,
                    }}
                    onPress={() => {
                      handlepressdown10(!pressdown10);
                    }}>
                    <Text style={styles.select_text_btn}>10:00</Text>
                  </TouchableHighlight>
                ) : null}
                {!showbtn_fin[3] ? (
                  <TouchableHighlight
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                      marginRight: 5,
                      width: 300 / 3,
                      height: 40,
                      backgroundColor: pressdown11 ? '#D89279' : '#fff',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 2,
                      borderColor: '#114662',
                      borderRadius: 20,
                    }}
                    onPress={() => {
                      handlepressdown11(!pressdown11);
                    }}>
                    <Text style={styles.select_text_btn}>11:00</Text>
                  </TouchableHighlight>
                ) : null}
                {!showbtn_fin[4] ? (
                  <TouchableHighlight
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                      marginRight: 5,
                      width: 300 / 3,
                      height: 40,
                      backgroundColor: pressdown12 ? '#D89279' : '#fff',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 2,
                      borderColor: '#114662',
                      borderRadius: 20,
                    }}
                    onPress={() => {
                      handlepressdown12(!pressdown12);
                    }}>
                    <Text style={styles.select_text_btn}>12:00</Text>
                  </TouchableHighlight>
                ) : null}
                {!showbtn_fin[5] ? (
                  <TouchableHighlight
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                      marginRight: 5,
                      width: 300 / 3,
                      height: 40,
                      backgroundColor: pressdown13 ? '#D89279' : '#fff',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 2,
                      borderColor: '#114662',
                      borderRadius: 20,
                    }}
                    onPress={() => {
                      handlepressdown13(!pressdown13);
                    }}>
                    <Text style={styles.select_text_btn}>13:00</Text>
                  </TouchableHighlight>
                ) : null}
                {!showbtn_fin[6] ? (
                  <TouchableHighlight
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                      marginRight: 5,
                      width: 300 / 3,
                      height: 40,
                      backgroundColor: pressdown14 ? '#D89279' : '#fff',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 2,
                      borderColor: '#114662',
                      borderRadius: 20,
                    }}
                    onPress={() => {
                      handlepressdown14(!pressdown14);
                    }}>
                    <Text style={styles.select_text_btn}>14:00</Text>
                  </TouchableHighlight>
                ) : null}
                {!showbtn_fin[7] ? (
                  <TouchableHighlight
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                      marginRight: 5,
                      width: 300 / 3,
                      height: 40,
                      backgroundColor: pressdown15 ? '#D89279' : '#fff',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 2,
                      borderColor: '#114662',
                      borderRadius: 20,
                    }}
                    onPress={() => {
                      handlepressdown15(!pressdown15);
                    }}>
                    <Text style={styles.select_text_btn}>15:00</Text>
                  </TouchableHighlight>
                ) : null}
                {!showbtn_fin[8] ? (
                  <TouchableHighlight
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                      marginRight: 5,
                      width: 300 / 3,
                      height: 40,
                      backgroundColor: pressdown16 ? '#D89279' : '#fff',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 2,
                      borderColor: '#114662',
                      borderRadius: 20,
                    }}
                    onPress={() => {
                      handlepressdown16(!pressdown16);
                    }}>
                    <Text style={styles.select_text_btn}>16:00</Text>
                  </TouchableHighlight>
                ) : null}
                {!showbtn_fin[9] ? (
                  <TouchableHighlight
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                      marginRight: 5,
                      width: 300 / 3,
                      height: 40,
                      backgroundColor: pressdown17 ? '#D89279' : '#fff',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 2,
                      borderColor: '#114662',
                      borderRadius: 20,
                    }}
                    onPress={() => {
                      handlepressdown17(!pressdown17);
                    }}>
                    <Text style={styles.select_text_btn}>17:00</Text>
                  </TouchableHighlight>
                ) : null}
                {!showbtn_fin[10] ? (
                  <TouchableHighlight
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                      marginRight: 5,
                      width: 300 / 3,
                      height: 40,
                      backgroundColor: pressdown18 ? '#D89279' : '#fff',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 2,
                      borderColor: '#114662',
                      borderRadius: 20,
                    }}
                    onPress={() => {
                      handlepressdown18(!pressdown18);
                    }}>
                    <Text style={styles.select_text_btn}>18:00</Text>
                  </TouchableHighlight>
                ) : null}
                {!showbtn_fin[11] ? (
                  <TouchableHighlight
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                      marginRight: 5,
                      width: 300 / 3,
                      height: 40,
                      backgroundColor: pressdown19 ? '#D89279' : '#fff',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 2,
                      borderColor: '#114662',
                      borderRadius: 20,
                    }}
                    onPress={() => {
                      handlepressdown19(!pressdown19);
                    }}>
                    <Text style={styles.select_text_btn}>19:00</Text>
                  </TouchableHighlight>
                ) : null}
                {!showbtn_fin[12] ? (
                  <TouchableHighlight
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                      marginRight: 5,
                      width: 300 / 3,
                      height: 40,
                      backgroundColor: pressdown20 ? '#D89279' : '#fff',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 2,
                      borderColor: '#114662',
                      borderRadius: 20,
                    }}
                    onPress={() => {
                      handlepressdown20(!pressdown20);
                    }}>
                    <Text style={styles.select_text_btn}>20:00</Text>
                  </TouchableHighlight>
                ) : null}
                {!showbtn_fin[13] ? (
                  <TouchableHighlight
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                      marginRight: 5,
                      width: 300 / 3,
                      height: 40,
                      backgroundColor: pressdown21 ? '#D89279' : '#fff',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 2,
                      borderColor: '#114662',
                      borderRadius: 20,
                    }}
                    onPress={() => {
                      handlepressdown21(!pressdown21);
                    }}>
                    <Text style={styles.select_text_btn}>21:00</Text>
                  </TouchableHighlight>
                ) : null}
              </View>
            ): null}  
            </ScrollView>
          </View>
        </View>
      </View>
      <View style={styles.bottomBtn_view}>
        <TouchableHighlight
          underlayColor={null}
          style={styles.bottomBtn}
          onPress={() => {
            checkandreserve();
            openSuccess(true);
            //navigation.replace('Home');
          }}>
          <Image
            source={require('./../../img/ReserveButton.png')}
            style={styles.ImageLeaveStyle}
          />
        </TouchableHighlight>
      </View>

      {reserveSuccess ? (
          <View style={styles.detail_view}>
            <View style={styles.doubleCheckContainer}>
              <View style={styles.doubleCheckcontainer}>
                <View style={styles.doubleCheckItem}>
                  <Text style={{fontSize: 25, color: '#32617B'}}>
                    預約成功
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
                    onPress={() => navigation.replace('Home')}>
                    <View style={styles.ModalCancelBtn}>
                      <Text style={{fontSize: 20, color: '#EAD8BB'}}>回首頁</Text>
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
Reserve_nextPage.navigationOptions = {
  headerTransparent: true,
  title: '',
};

const styles = StyleSheet.create({
  ImageStyle: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: -30,
    width: 400,
    height: 200,
    //resizeMode: 'stretch',
  },
  BottomBlockStyle: {
    flex: 6,
    alignContent: 'center',
    height: 600,
    width: 400,
  },
  Back_view_1: {
    flex: 2,
    width: 370,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 20,
    marginRight: 20,
    marginTop: 75,
    backgroundColor: '#D89279',
    borderRadius: 20,
  },
  middle_block: {
    flex: 1,
    width: 340,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 15,
    marginBottom: 15,
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  Back_view_2: {
    flex: 3,
    width: 370,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: '#D89279',
    borderRadius: 20,
  },
  buttombtn_view: {
    flex: 6,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    //backgroundColor: '#DDDDDD',
    //marginTop: 0,
    //marginHorizontal: 15,
  },
  //------------------------------------
  select_sphere: {
    marginTop: 10,
    width: 90,
    height: 40,
    backgroundColor: '#114662',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  select_sphere_2: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    width: 100,
    height: 40,
    backgroundColor: '#114662',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  select_sphere_3: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    width: 300 / 3,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#114662',
    borderRadius: 20,
  },
  select_sphere_4: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    width: 300 / 3,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#114662',
    borderRadius: 20,
  },
  select_sphere_5: {
    width: 300 / 3 - 4,
    height: 40 - 4,
    backgroundColor: '#DDD',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  select_view: {
    flex: 1,
    flexDirection: 'row',
    width: 340,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 5,
  },
  select_text: {
    color: '#fff',
    fontSize: 20,
    letterSpacing: 2,
  },
  select_text_btn: {
    color: '#114662',
    fontSize: 20,
    letterSpacing: 2,
    //backgroundColor:'#fff'
  },
  button: {
    height: 40,
    padding: 11,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginRight: -15,
    backgroundColor: '#EAD8BB',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btns: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 340,
    paddingLeft: 5,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingBottom : 10,
    // borderBottomColor : '#DDDDDD',
    // borderBottomWidth : 5,
  },
  // -------------------------------
  buttonText: {
    color: '#114662',
    fontSize: 20,
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
export default Reserve_nextPage;
