import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Animated,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Dimensions,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import {StackRouter} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

let openDetailNum = 0;
let stuNum;
let datestr;
let oldseat = [];
let oldtime = [];
let olddata = [];
let total_reserve_num;
let violationPoint;

export default class SwitchButton extends Component {
  static propTypes = {
    onValueChange: PropTypes.func,
  };

  static defaultProps = {
    onValueChange: () => null,
  };

  static navigationOptions = {
    headerTransparent: true,
    title: '',
  };

  constructor(props) {
    super();

    //20200222 -> 2020/02/22
    function toDate(str) {
      str =
        str[0] +
        str[1] +
        str[2] +
        str[3] +
        '/' +
        str[4] +
        str[5] +
        '/' +
        str[6] +
        str[7];
      return str;
    }

    stuNum = props.navigation.getParam('stuNum');
    let record_len = props.navigation.getParam('record_len');
    //違規點數
    AsyncStorage.getItem('violationPoint').then(value => {
      violationPoint = JSON.parse(value);
    });
    if (violationPoint == null) {
      violationPoint = 0;
    }

    let db = firebase.database();
    let tmp_date,
      tmp_date_len,
      tmp_date_fin,
      tmp_seat_len,
      tmp_seat,
      tmp_seat_fin,
      tmp_time;
    let obj;
    let itemRef = db.ref(`/user/${stuNum}/reserve`);
    if (record_len != 0) {
      itemRef.once('value', snapshot => {
        let arr = snapshot.val();

        tmp_date_len = Object.keys(arr).length;
        //run one person each day
        let push_date_arr = []; //暫放的arry
        let push_time_arr = [];
        let push_seat_arr = [];
        let num = 0; //放list的key

        for (let i = 0; i < tmp_date_len; i++) {
          tmp_date = Object.keys(arr)[i]; //date 20200222

          tmp_seat = Object.values(arr)[i];
          tmp_seat_len = Object.values(tmp_seat)[1].length; //一天幾次預約
          //run one day each reserve

          let time_str;

          for (let j = 0; j < tmp_seat_len; j++) {
            tmp_time = Object.values(tmp_seat)[0]; //time inf0
            tmp_seat_fin = Object.values(tmp_seat)[1][j]; //seat info

            tmp_date_fin = toDate(tmp_date);
            time_str = tmp_time[j * 2] + '-' + tmp_time[j * 2 + 1];
            obj = tmp_date_fin;

            num++;
            //console.log(typeof(num));
            push_date_arr.push({name: obj, key: `${num}`});
            push_time_arr.push({name: time_str});
            push_seat_arr.push({name: tmp_seat_fin});
          }
          this.setState({
            detailDate: push_date_arr,
            detailTime: push_time_arr,
            detailSeat: push_seat_arr,
          });
        }
        // console.log(this.state.detailDate);
        // console.log(this.state.detailTime);
        // console.log(this.state.detailSeat);
      });
    }

    this.state = {
      activeSwitch: 1,
      sbWidth: 300,
      sbHeight: 50,
      direction: 'ltr',
      record_num: record_len,
      offsetX: new Animated.Value(0),
      position: 'center', //center
      openModal: false,
      detailDate: [],
      detailSeat: [],
      detailTime: [],
      openDoubleCheck: false,
      checkDateBefore: true,
      openDetailList: true,
    };

    this._switchDirection = this._switchDirection.bind(this);
  }

  fetchdata(stuNum){
    let database = firebase.database();
    database.ref(`/user/${stuNum}`).once('value', function(snapshot){
    let tmp = snapshot.child('violation').val();
      if(tmp != null){
        olddata = tmp;
        }
      });
      //console.log(stuNum);
      //setTimeout(handledata, 1000);
  }

  showModal(thiskey) {
    this.setState({openModal: true});
    openDetailNum = thiskey - 1;
    //先將日期從/轉成- 如果有0要消掉
    let selectDate =
      this.state.detailDate[openDetailNum].name[0] +
      this.state.detailDate[openDetailNum].name[1] +
      this.state.detailDate[openDetailNum].name[2] +
      this.state.detailDate[openDetailNum].name[3] +
      '-' +
      this.state.detailDate[openDetailNum].name[5] +
      this.state.detailDate[openDetailNum].name[6] +
      '-' +
      this.state.detailDate[openDetailNum].name[8] +
      this.state.detailDate[openDetailNum].name[9];

    selectDate = new Date(selectDate);
    let currentDate = new Date();
    // let currentDateString =
    //   currentDate.getFullYear() +
    //   '-' +
    //   (currentDate.getMonth() + 1) +
    //   '-' +
    //   currentDate.getDate();

    if (selectDate.valueOf() < currentDate.valueOf()) {
      this.setState({checkDateBefore: false});
    } else {
      this.setState({checkDateBefore: true});
    }
    // this.setState({
    //   openModal: true,
    //   openDetailNum: thiskey - 1,
    // });
    // console.log(this.state.detailDate[openDetailNum]);
    // console.log(this.state.openModal);
    // console.log(this.state.openDetailNum);
  }

  _switchDirection(direction) {
    let dir = 'row';

    if (direction === 'rtl') {
      dir = 'row-reverse';
    } else {
      dir = 'row';
    }
    return dir;
  }

  _switchThump(direction) {
    const {onValueChange, disabled} = this.props;
    let dirsign = 1;
    if (direction === 'rtl') {
      dirsign = -1;
    } else {
      dirsign = 1;
    }

    if (this.state.activeSwitch === 1) {
      this.setState({activeSwitch: 2}, () =>
        onValueChange(this.state.activeSwitch),
      );

      Animated.timing(this.state.offsetX, {
        toValue:
          ((this.props.switchWidth || this.state.sbWidth) / 2 - 6) * dirsign,
        duration: this.props.switchSpeedChange || 100,
      }).start();
    } else {
      this.setState({activeSwitch: 1}, () =>
        onValueChange(this.state.activeSwitch),
      );
      Animated.timing(this.state.offsetX, {
        toValue: 0,
        duration: this.props.switchSpeedChange || 100,
      }).start();
    }
  }
  //先撈資料
  catchData() {
    datestr =
      this.state.detailDate[openDetailNum].name[0] +
      this.state.detailDate[openDetailNum].name[1] +
      this.state.detailDate[openDetailNum].name[2] +
      this.state.detailDate[openDetailNum].name[3] +
      this.state.detailDate[openDetailNum].name[5] +
      this.state.detailDate[openDetailNum].name[6] +
      this.state.detailDate[openDetailNum].name[8] +
      this.state.detailDate[openDetailNum].name[9];
    //撈seatID下來
    let itemRef = firebase
      .database()
      .ref(`user/${stuNum}/reserve/${datestr}/seatID`);
    itemRef.once('value', snapshot => {
      let k = snapshot.val();
      oldseat = k;
      //console.log(k);
    });
    //撈time下來
    let itemRef2 = firebase
      .database()
      .ref(`user/${stuNum}/reserve/${datestr}/time`);
    itemRef2.once('value', snapshot => {
      let t = snapshot.val();
      oldtime = t;
      //console.log(t);
    });
  }

  //刪除資料
  cancelReserve() {
    //刪除seat的資料
    let db = firebase.database();

    let startTime =
      this.state.detailTime[openDetailNum].name[1] == '-'
        ? this.state.detailTime[openDetailNum].name[0]
        : this.state.detailTime[openDetailNum].name[0] +
          this.state.detailTime[openDetailNum].name[1];
    let endTime;
    if (
      this.state.detailTime[openDetailNum].name[1] == '-' &&
      this.state.detailTime[openDetailNum].name[2] == 9
    ) {
      //這是在做刪除8-9的這個情況
      endTime = 9;
    } else if (this.state.detailTime[openDetailNum].name[1] == '-') {
      //這是在做刪除8或9開始的狀況
      endTime =
        this.state.detailTime[openDetailNum].name[2] +
        this.state.detailTime[openDetailNum].name[3];
    } else {
      //這是在做刪除10點以後的狀況
      endTime =
        this.state.detailTime[openDetailNum].name[3] +
        this.state.detailTime[openDetailNum].name[4];
    }
    //----------------------------------
    // console.log(datestr);
    // console.log(startTime);
    // console.log(endTime);
    // console.log(this.state.detailSeat[openDetailNum].name);
    let ref = db.ref(
      `seat/${this.state.detailSeat[openDetailNum].name}/seat_reserve`,
    );
    //刪除seat資料
    for (let i = parseInt(startTime); i <= parseInt(endTime); i++) {
      ref
        .child(`${i}`)
        .child(`${datestr}`)
        .remove();
    }

    //--------------------------------------------------------------------
    //刪除user

    //處理要刪的資料
    for (let i = 0; i < oldseat.length; i++) {
      if (
        this.state.detailSeat[openDetailNum].name == oldseat[i] &&
        startTime == oldtime[i * 2] &&
        endTime == oldtime[i * 2 + 1]
      ) {
        //console.log('i am in');
        let itemRef3 = firebase
          .database()
          .ref(`user/${stuNum}/reserve/${datestr}`);
        for (let j = i; j < oldseat.length - 1; j++) {
          oldseat[j] = oldseat[j + 1];
          oldtime[j * 2] = oldtime[j * 2 + 2];
          oldtime[j * 2 + 1] = oldtime[j * 2 + 3];
        }
        for (let k = i + 1; k < oldseat.length; k++) {
          oldseat.pop();
          oldtime.pop();
          oldtime.pop();
        }
        itemRef3.set({
          seatID: oldseat,
          time: oldtime,
        });
      }
    }

    //--------------------------------------------------------------------
    //關閉頁面
    this.setState({openDoubleCheck: false, openModal: false});
    //資料數量減一
    this.changeRecordLength();
    //刪除該項目
    this.deleteDetail();
  }

  

  changeRecordLength() {
    total_reserve_num = 0; //存放總預約次數

    let db = firebase.database();
    let itemRef4 = db.ref(`/user/${stuNum}/reserve`);
    let record_len, record_date, record_len_date, tmp;
    itemRef4.once('value', snapshot => {
      let arr = snapshot.val();
      //console.log(arr);
      if (arr != null) {
        record_date = Object.keys(arr); //哪幾天有紀錄 非總次數
        record_len_date = record_date.length;
        for (let i = 0; i < record_len_date; i++) {
          tmp = Object.values(arr)[i]; //index 值為第幾天的資料
          record_len = Object.values(tmp)[1]; //index=0: time index=1: seat_0x
          total_reserve_num += record_len.length;
        }
        console.log(total_reserve_num);
      }
      this.setState({record_num: total_reserve_num});
    });
  }

  deleteDetail() {
    let tmparray = [];
    for (let i = 0, j = 1; i < this.state.detailDate.length; i++) {
      if (i != openDetailNum) {
        tmparray.push({name: this.state.detailDate[i].name, key: `${j}`});
        j++;
      }
    }
    this.setState({detailDate: tmparray});
  }

  render() {

    this.fetchdata(stuNum);
    //    console.log(stuNum);
    //function nowstate(props) {
    if (this.state.activeSwitch == 1) {
    } //預約次數
    if (this.state.activeSwitch == 2) {
      //record_num = 88;
    } //記點次數
    //return
    //}
    //nowstate();
    return (
      <ImageBackground
        source={require('./../../img/bk1.png')}
        style={{width: width, height: height}}>
        <View style={styles.main_view}>
          <View style={styles.title_view}>
            <Text style={styles.titleText}>個人資料</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.toggle_view}>
              <TouchableHighlight
                underlayColor={null}
                activeOpacity={1}
                onPress={() => {
                  this.setState({openDetailList: !this.state.openDetailList});
                  this._switchThump(
                    this.props.switchdirection || this.state.direction,
                  );
                }}>
                <View
                  style={[
                    {
                      width: this.props.switchWidth || this.state.sbWidth,
                      height: this.props.switchHeight || this.state.sbHeight,
                      borderRadius:
                        this.props.switchBorderRadius !== undefined
                          ? this.props.switchBorderRadius
                          : this.state.sbHeight / 2,
                      borderWidth: 1,
                      borderColor: this.props.switchBorderColor || '#EAD8BB',
                      backgroundColor:
                        this.props.switchBackgroundColor || '#EAD8BB',
                    },
                  ]}>
                  <View
                    style={[
                      {
                        flexDirection: this._switchDirection(
                          this.props.switchdirection || this.state.direction,
                        ),
                      },
                    ]}>
                    <Animated.View
                      style={{transform: [{translateX: this.state.offsetX}]}}>
                      <View
                        style={[
                          switchStyles.wayBtnActive,
                          {
                            width:
                              this.props.switchWidth / 2 ||
                              this.state.sbWidth / 2,
                            height:
                              this.props.switchHeight - 6 ||
                              this.state.sbHeight - 6,
                            borderRadius:
                              this.props.switchBorderRadius !== undefined
                                ? this.props.switchBorderRadius
                                : this.state.sbHeight / 2,
                            borderColor: this.props.btnBorderColor || '#32617B',
                            backgroundColor:
                              this.props.btnBackgroundColor || '#32617B',
                          },
                        ]}
                      />
                    </Animated.View>

                    <View
                      style={[
                        switchStyles.textPos,
                        {
                          width:
                            this.props.switchWidth / 2 ||
                            this.state.sbWidth / 2,
                          height:
                            this.props.switchHeight - 6 ||
                            this.state.sbHeight - 6,
                          left: 0,
                        },
                      ]}>
                      <Text
                        style={[
                          this.state.activeSwitch === 1
                            ? {
                                color: this.props.activeFontColor || '#EAD8BB',
                                fontSize: this.props.fontSize || 20,
                              }
                            : {color: this.props.fontColor || '#EAD8BB'},
                        ]}>
                        {this.props.text1 || '預約紀錄'}
                      </Text>
                    </View>

                    <View
                      style={[
                        switchStyles.textPos,
                        {
                          width:
                            this.props.switchWidth / 2 ||
                            this.state.sbWidth / 2,
                          height:
                            this.props.switchHeight - 6 ||
                            this.state.sbHeight - 6,
                          right: 0,
                        },
                      ]}>
                      <Text
                        style={[
                          this.state.activeSwitch === 2
                            ? {
                                color: this.props.activeFontColor || '#EAD8BB',
                                fontSize: this.props.fontSize || 20,
                              }
                            : {color: this.props.fontColor || '#EAD8BB'},
                        ]}>
                        {this.props.text2 || '計點紀錄'}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.show_view}>
              {this.props.children}
              {this.state.openDetailList ? (
                <View style={styles.count_view}>
                  <Text style={styles.text}>{this.state.record_num}次</Text>
                </View>
              ) : (
                <View style={styles.count_view}>
                  <Text style={styles.text}>{
                  //violationPoint
                  olddata.length
                  }次</Text>
                </View>
              )}

              {this.state.openDetailList ? (
                <View style={styles.list_view}>
                  <SafeAreaView>
                    <FlatList
                      style={{
                        top: 40,
                        width: 300,
                        height: 300,
                        borderRadius: 20,
                        backgroundColor: '#EAD8BB',
                        paddingTop: 20,
                        paddingLeft: 20,
                        paddingRight: 20,
                      }}
                      data={this.state.detailDate}
                      renderItem={({item}) => {
                        return (
                          <View key={item.key} style={styles.item}>
                            <Text
                              style={{
                                fontSize: 25,
                                letterSpacing: 2,
                                color: '#32617B',
                                alignItems: 'center',
                              }}>
                              {item.name}
                            </Text>

                            <TouchableOpacity
                              onPress={() => this.showModal(item.key)}>
                              <View style={styles.itembtn}>
                                <Text style={{fontSize: 20, color: '#EAD8BB'}}>
                                  詳細
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    />
                  </SafeAreaView>
                </View>
              ) : null}
            </View>

            <View style={{flex: 2}} />
          </View>
        </View>

        {this.state.openModal ? (
          <View style={styles.detail_view}>
            <View style={styles.ModalouterContainer}>
              <View style={styles.Modalcontainer}>
                <View style={styles.ModalItem}>
                  <Text
                    style={{fontSize: 30, color: '#114662', letterSpacing: 5}}>
                    {/* 預約-座位日期 */}
                    {this.state.detailDate[openDetailNum].name}
                  </Text>
                </View>
                <View style={styles.ModalItem}>
                  {/* 預約-座位區域 */}
                  <Text style={{fontSize: 30, color: '#114662'}}>1F A區</Text>
                </View>
                <View style={styles.ModalItem}>
                  <Text style={{fontSize: 30, color: '#114662'}}>
                    {/* 預約-座位資訊 */}
                    {this.state.detailSeat[openDetailNum].name[5] +
                      this.state.detailSeat[openDetailNum].name[6] +
                      this.state.detailSeat[openDetailNum].name[7] +
                      this.state.detailSeat[openDetailNum].name[8] +
                      this.state.detailSeat[openDetailNum].name[9]}
                  </Text>
                </View>
                <View style={styles.ModalItem}>
                  <Text style={{fontSize: 30, color: '#32617B'}}>
                    {/* 16-21 */}
                    {/* 8-10 */}
                    {/* 預約-座位時間 */}
                    {(this.state.detailTime[openDetailNum].name[1] == '-'
                      ? 0
                      : this.state.detailTime[openDetailNum].name[0]) +
                      (this.state.detailTime[openDetailNum].name[1] == '-'
                        ? this.state.detailTime[openDetailNum].name[0]
                        : this.state.detailTime[openDetailNum].name[1]) +
                      ':00 - ' +
                      (this.state.detailTime[openDetailNum].name[1] == '-'
                        ? this.state.detailTime[openDetailNum].name[2]
                        : this.state.detailTime[openDetailNum].name[3]) +
                      (this.state.detailTime[openDetailNum].name[1] == '-'
                        ? this.state.detailTime[openDetailNum].name[3]
                        : this.state.detailTime[openDetailNum].name[4]) +
                      ':00'}
                  </Text>
                </View>
                <View
                  style={
                    (styles.ModalItem,
                    {
                      width: 250,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    })
                  }>
                  {this.state.checkDateBefore ? (
                    <TouchableHighlight
                      underlayColor={null}
                      onPress={() => {
                        this.catchData();
                        this.setState({
                          openModal: false,
                          openDoubleCheck: true,
                        });
                      }}>
                      <View style={styles.ModalCancelBtn}>
                        <Text style={{fontSize: 20, color: '#EAD8BB'}}>
                          取消預約
                        </Text>
                      </View>
                    </TouchableHighlight>
                  ) : null}
                  <TouchableHighlight
                    underlayColor={null}
                    onPress={() => {
                      this.setState({openModal: false});
                    }}>
                    <View style={styles.ModalBtn}>
                      <Text style={{fontSize: 20, color: '#EAD8BB'}}>返回</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={styles.modalback}></View>
            </View>
          </View>
        ) : null}

        {this.state.openDoubleCheck ? (
          <View style={styles.detail_view}>
            <View style={styles.doubleCheckContainer}>
              <View style={styles.doubleCheckcontainer}>
                <View style={styles.doubleCheckItem}>
                  <Text style={{fontSize: 25, color: '#32617B'}}>
                    確定要取消預約嗎 ？
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
                    onPress={() => this.cancelReserve()}>
                    <View style={styles.ModalCancelBtn}>
                      <Text style={{fontSize: 20, color: '#EAD8BB'}}>確定</Text>
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor={null}
                    onPress={() => {
                      this.setState({openModal: true, openDoubleCheck: false});
                    }}>
                    <View style={styles.doubleCheckBtn}>
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
  }
}

const switchStyles = StyleSheet.create({
  // for switch button
  textPos: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rtl: {
    flexDirection: 'row-reverse',
  },
  ltr: {
    flexDirection: 'row',
  },
  wayBtnActive: {
    borderWidth: 1,
    marginTop: 2,
    marginRight: 2,
    marginLeft: 2,
  },
});

const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggle_view: {
    flex: 2,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  show_view: {
    flex: 5.25,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count_view: {
    flex: 1,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list_view: {
    flex: 20,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail_view: {
    position: 'absolute',
    top: 150,
    left: 30,
  },
  //for list and title
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start', //space-between 用來調scrollview 文字的位置 可設為center
    alignItems: 'center',
    paddingBottom: 10,
    paddingLeft: 15,
    marginBottom: 15,
    borderColor: '#000',
    borderBottomWidth: 2, //底線
    borderBottomColor: '#32617B', //底線
    fontSize: 30, //好像沒用
  },
  itembtn: {
    width: 60,
    height: 30,
    marginLeft: 20,
    backgroundColor: '#32617B',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_view: {
    flex: 1,
    width: 300,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  titleText: {
    fontSize: 30,
    //fontWeight: 'bold',
    color: '#D89279',
  },
  text: {
    fontSize: 40,
    //fontWeight: 'bold',
    color: '#EAD8BB',
    alignItems: 'center',
  },
  detail_view: {
    position: 'absolute',
    top: 150,
    left: 30,
  },
  //--------------------------------
  //Modal
  detail_view: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  ModalouterContainer: {
    width: width,
    height: height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    position: 'absolute',
    zIndex: 2,
  },
  ModalItem: {
    flex: 1,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalBtn: {
    width: 100,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#32617B',
    justifyContent: 'center',
    alignItems: 'center',
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
  modalback: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#114662',
    opacity: 0.7,
    zIndex: 1,
  },
  //--------------------------------
  //doubleCheck
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
