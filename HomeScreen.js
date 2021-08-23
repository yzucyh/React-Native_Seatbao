import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableHighlight,
  Image,
  ImageBackground,
  Alert,
  Animated,
} from 'react-native';
import { NavigationEvents } from "react-navigation";

import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const FadeInView = (props) => {
  const [fadeAnim] = useState(new Animated.Value(0))  

  React.useEffect(() => {
    Animated.timing(                  
      fadeAnim,                       
      {
        toValue: 0.95,     // 透明度在這邊設置                  
        duration: 1000,  //調出現的速度            
      },
    ).start();                        
  }, []);
  return (
    <Animated.View                
      style={{
        ...props.style,
        opacity: fadeAnim,       
    }}>
      {props.children}
    </Animated.View>
  );
}

let total_reserve_num;

const HomePage = ({navigation}) => {
  let stuNum;
  // const stuNum = navigation.getParam('stuNum');
  const [statusss,handlestatusss] = useState(0);
  AsyncStorage.getItem('LoginAccount').then(value => {
    if (value != null) {
      //console.log('my stuNum: ' + value);
      stuNum = value;
    }
  });

  const [openSidemenu, SidemenuChange] = useState(false);

  setTimeout(function() {
    //獲取預約次數傳給slider page
    //降低延遲速度
    total_reserve_num = 0; //存放總預約次數

    let db = firebase.database();
    let itemRef = db.ref(`/user/${stuNum}/reserve`);
    let record_len, record_date, record_len_date, tmp;
    itemRef.once('value', snapshot => {
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
        //console.log(total_reserve_num);
      }
    });
  }, 1000);

  return (
    <ImageBackground
      source={require('./../../img/bk1.png')}
      style={{position: 'relative', width: '100%', height: '100%'}}>
      <View>
      <TouchableHighlight
          underlayColor={null}
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={() => SidemenuChange(!openSidemenu)}>
          <Image
            source={require('./../../img/dotdot.png')}
            style={{
              width: 40,
              height: 35,              
              marginTop: 10,
              marginLeft: 348,
            }}
          />
          </TouchableHighlight>
      </View>
      <View style={styles.main_view}>
        <View style={styles.maintitle_view}>
          <Image
            source={require('../../img/logoTitle.png')}
            style={{width: 130, height: 35, marginLeft: -10}}
          />
        </View>
        <View style={styles.subtitle_view}>
          <Text style={{fontSize: 18, color: '#EAD8BB'}}>一目了然有無空位</Text>
          <Text style={{fontSize: 18, color: '#EAD8BB'}}>
            不再等到心累 解決佔位問題 杜絕佔位
          </Text>
        </View>

        <View style={styles.btnback_view}>
          <TouchableHighlight
            underlayColor={null}
            style={styles.btn}
            onPress={() => navigation.navigate('Reserve', {stuNum: stuNum})}>
            <Image
              source={require('./../../img/reservation.png')}
              style={styles.ImageIconStyle}
            />
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={null}
            style={styles.btn}
            onPress={() => navigation.navigate('CheckIn', {stuNum: stuNum})}>
            <Image
              source={require('./../../img/checkin.png')}
              style={styles.ImageIconStyle}
            />
          </TouchableHighlight>
        </View>

        <View style={styles.btnback_view}>
          <TouchableHighlight
            underlayColor={null}
            style={styles.btn}
            onPress={() =>
              navigation.navigate('Slider', {
                stuNum: stuNum,
                record_len: total_reserve_num,
              })
            }>
            <Image
              source={require('./../../img/person.png')}
              style={styles.ImageIconStyle}
            />
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={null}
            style={styles.btn}
            onPress={() => navigation.navigate('SeatStatus', {stuNum: stuNum})}>
            <Image
              source={require('./../../img/seatStatus.png')}
              style={styles.ImageIconStyle}
            />
          </TouchableHighlight>
        </View>

        <View style={styles.bottomBtn_view}>
          <TouchableHighlight
            underlayColor={null}
            style={styles.bottomBtn}
            onPress={() => {
              if(statusss == 1){
                handlestatusss(0);
                AsyncStorage.removeItem('using');
                //update firebase
                
                AsyncStorage.getItem('GseatID').then(value => {
                  let db = firebase.database();
                  let ref = db.ref(`/seat/${value}`);
                  ref.once('value', snapshot => {
                        ref.update({status : 0});  
                })
                });

                AsyncStorage.removeItem('GseatID');
              }
              else if(statusss == 0){
                AsyncStorage.removeItem('LoginAccount');
                navigation.replace('Login');
              }
              
              // AsyncStorage.removeItem('using').then(value => {
              //   console.log("status : " + statusss);
              //   if(statusss == '1'){
              //     console.log("3333333");
              //     navigation.replace('Login');
              //   }
              //   if(statusss == '0'){
              //     console.log("444444");
              //     handlestatusss('1');
              //     //更新firebase
              //     let db = firebase();
              //     let ref = db.ref(`/seat/${seatID}`);
              //     ref.once('value', snapshot => {
              //       ref.update({status : 0});  
              //     })
              //   }
              // });
            }
          }
            // onPress={() => props.navigation.navigate("Home")}
          >

            <Image
              source={statusss ? (require('./../../img/leave.png')) : (require('./../../img/logout.png'))}
              style={styles.ImageLeaveStyle}
            />
          </TouchableHighlight>
        </View>
      </View>
      <NavigationEvents onDidFocus={() => 
        {
          total_reserve_num = 0; //存放總預約次數

          let db = firebase.database();
          let itemRef = db.ref(`/user/${stuNum}/reserve`);
          let record_len, record_date, record_len_date, tmp;
          itemRef.once('value', snapshot => {
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
              //console.log(total_reserve_num);
            }
          });
          AsyncStorage.getItem('using').then(value => {
          if (value == '1') {
             handlestatusss(1);//leave
          }
          else if (value != '1') {
             handlestatusss(0);//logout
          }
          console.log(statusss + "home");
        }) 
        }
      }/>
      {openSidemenu ? (
        <FadeInView style={styles.Sidebar_view}>
          <View style={{position:'absolute',top:5, justifyContent:'center', alignItems:'center'}}>
          <Image
              source={require('./../../img/logo.png')}
              style={{width:120, height: 120, marginBottom: 20}}
            />
            <TouchableHighlight underlayColor={null} style={styles.SideBar_align}
              onPress={() =>navigation.navigate('HomeScreen')}>
              <Text style={styles.SideBar_text}>首頁</Text>
            </TouchableHighlight>
            <View style={styles.line}/>

            <TouchableHighlight underlayColor={null} style={styles.SideBar_align}
              onPress={() =>navigation.navigate('Reserve', {stuNum: stuNum})}>
              <Text style={styles.SideBar_text}>預約</Text>
            </TouchableHighlight>
            <View style={styles.line}/>

            <TouchableHighlight underlayColor={null} style={styles.SideBar_align}
              onPress={() => navigation.navigate('CheckIn', {stuNum: stuNum})}>
              <Text style={styles.SideBar_text}>報到</Text>
            </TouchableHighlight>
            <View style={styles.line}/>

            <TouchableHighlight underlayColor={null} style={styles.SideBar_align}
              onPress={() => navigation.navigate('SeatStatus', {stuNum: stuNum})}>
              <Text style={styles.SideBar_text}>座位狀況</Text>
            </TouchableHighlight>
            <View style={styles.line}/>

            <TouchableHighlight underlayColor={null} style={styles.SideBar_align}
              onPress={() => navigation.navigate('Slider',{record_len: total_reserve_num,stuNum: stuNum})}>
              <Text style={styles.SideBar_text}>個人</Text>
            </TouchableHighlight>
            <View style={styles.line}/>

            <TouchableHighlight underlayColor={null} style={styles.SideBar_align}
              onPress={() => navigation.navigate('Rule')}>
              <Text style={styles.SideBar_text}>規則</Text>
            </TouchableHighlight>
            <View style={styles.line}/>

            <TouchableHighlight underlayColor={null} style={styles.SideBar_align}
              onPress={() => navigation.navigate('HalfTime')}>
              <Text style={styles.SideBar_text}>中場休息</Text>
            </TouchableHighlight>
            <View style={styles.line}/>
            
            
          </View>
        </FadeInView>
      ) : null}

    </ImageBackground>
  );
};
HomePage.navigationOptions = {
  headerTransparent: true,
  title: '',
  headerLeft: () => (visible = null),
};

const styles = StyleSheet.create({
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
    marginBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  subtitle_view: {
    flex: 2,
    width: 300,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  btnback_view: {
    flex: 3,
    width: 310,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomBtn_view: {
    flex: 2,
    width: 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  ImageIconStyle: {
    height: 150,
    width: 150,
    // resizeMode: 'stretch',
  },
  ImageLeaveStyle: {
    height: 100,
    width: 230,
    resizeMode: 'stretch',
  },
  //-------------------------------
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBtn: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  Sidebar_view: {
    position:'absolute',
    left: 205,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 50,
    width: width/2,
    height: height-75,
    backgroundColor: '#EAD8BB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  SideBar_text:
  {
    color: '#114662',
    fontSize:25, 
    justifyContent:'center', 
    alignItems:'center',
  },
  SideBar_align:
  {
    justifyContent:'center',
    alignItems:'center',
  },
  line:
  {
    marginTop:5,
    marginBottom: 20,
    borderRadius:10,
    width: 140,
    height:2, 
    backgroundColor:'#114662',
  }
});

export default HomePage;