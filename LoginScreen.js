import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import firebase from 'react-native-firebase';

const ImageBack = require('./../../img/bkgif.gif');
//const ImageBack = require('./../../img/loginback.png');
const logoImage = require('../../img/logo.png');
const logoTitle = require('../../img/logoTitle.png');

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LoginPage = ({navigation}) => {
  const [valueStuNum, handleStuNumChange] = useState('');
  const [valuePwd, handlePwdChange] = useState('');
  const [showErrorText, handleShowError] = useState('');
  const secondTextInput = useRef();

  useEffect(() => {
    AsyncStorage.getItem('LoginAccount').then(value => {
      if (value != null) {
        AsyncStorage.setItem('LoginAccount', value);
        navigation.replace('Home', {
          stuNum: value,
        });
      }
    });
  }, []);

  function onSignIn() {
    //check input box is filled
    if (valueStuNum == '') {
      handleShowError('學號/帳號未填寫');
    } else if (valuePwd == '') {
      handleShowError('密碼未填寫');
    } else {
      let db = firebase.database();
      let itemRef = db.ref(`/user/${valueStuNum}`); //撈取資料的路徑
      itemRef.once('value', snapshot => {
        //獲取該帳號底下的pwd欄位資料
        let pwd = snapshot.child('pwd').val();

        //判斷與輸入的密碼是否相符
        if (valuePwd == pwd) {
          //clear all input box
          clearPage();
          AsyncStorage.setItem('LoginAccount', valueStuNum);
          navigation.replace('Home', {
            stuNum: valueStuNum,
          });
        } else {
          handleShowError('帳號或密碼錯誤');
        }
      });
    }
  }

  function clearPage() {
    handlePwdChange('');
    handleStuNumChange('');
    handleShowError('');
  }

  /* create default seat id */
  // let db = firebase.database();
  // for (let j = 1; j <= 5; j++) {
  //   for (let k = 1; k <= 4; k++) {
  //     let ref = db.ref(`seat/seat_A-${j}-${k}`);
  //     //確認資料是否存在
  //     ref.once('value', snapshot => {
  //       for (let i = 8; i <= 21; i++) {
  //         ref
  //           .child('seat_reserve')
  //           .child(`${i}`)
  //           .child('20200317')
  //           .set({
  //             stuNum: 17,
  //           });
  //       }
  //     });
  //   }
  // }
  /* create default seat id */

  function portallogin() {
    let url = 'https://portalx.yzu.edu.tw/PortalSocialVB/Login.aspx';
    let id = 's1063317';
    let pw = 'Yuanchen88328';

    var model = {
      Txt_UserID: 's1062041',
      Txt_Password: 'jamie40802',
    };
    var json = {
      json: JSON.stringify({
        Txt_UserID: 's1062041',
        Txt_Password: 'jamie40802',
      }),
      delay: 5,
    };
    // let formData = new FormData();
    // formData.append('Txt_UserID', 's1062041');
    // formData.append('Txt_Password', 'jamie40802');

    fetch(url, {
      //mode: 'cors',
      method: 'post',
      // headers 加入 json 格式

      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        //'content-type': 'text/html; charset=utf-8',
      },

      body: json,
      //body: formData,
      //body: JSON.stringify(model),
      //body: Txt_UserID=${id}&Txt_Password=${pw}
      // body 將 json 轉字串送出
      //body:JSON.stringify({
      // Txt_UserID: 's1063317',
      //  Txt_Password: 'Yuanchen88328',
      //})
    })
      .then(response => {
        //console.log(response);
        return response.url;
      })
      .then(jsonData => {
        console.log(jsonData);
      })
      .catch(err => {
        console.log('錯誤:', err);
      });
  }

  return (
    <ScrollView style={{width: width, height: height}}>
      <ImageBackground
        source={ImageBack}
        style={{width: width, height: height}}>
        <View style={LoginPageStyles.main_view}>
          <View style={LoginPageStyles.logo_view}>
            <Image source={logoImage} style={LoginPageStyles.logo} />
          </View>
          <View style={LoginPageStyles.title_view}>
            <Image source={logoTitle} style={LoginPageStyles.title} />
          </View>
          <View style={LoginPageStyles.otherBack_view}>
            <View style={LoginPageStyles.textInputBox_view}>
              <View style={LoginPageStyles.textinput_view}>
                <TextInput
                  placeholder="學號/帳號(測試帳號:22)"
                  style={LoginPageStyles.textInput}
                  onChangeText={text => handleStuNumChange(text)}
                  value={valueStuNum}
                  //按下完成會到下一個textinput框
                  onSubmitEditing={() => {
                    secondTextInput.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>
              <View style={LoginPageStyles.textinput_view2}>
                <TextInput
                  ref={secondTextInput}
                  placeholder="密碼(測試密碼:22)"
                  style={LoginPageStyles.textInput}
                  secureTextEntry={true}
                  onChangeText={text => handlePwdChange(text)}
                  value={valuePwd}
                  //按下完成會到登入按鈕
                  onSubmitEditing={() => {
                    onSignIn();
                  }}
                />
                {showErrorText ? (
                  <Text style={LoginPageStyles.errorText}>{showErrorText}</Text>
                ) : null}
              </View>
            </View>
            <View style={LoginPageStyles.go_view}>
              <View style={LoginPageStyles.signup_view}>
                <TouchableHighlight
                  style={LoginPageStyles.btnSignUp}
                  onPress={() => {
                    clearPage();
                    navigation.navigate('SignUp');
                  }}
                  //onPress={() => props.navigation.navigate('SignUp')}
                  underlayColor={null}>
                  <View style={LoginPageStyles.btnSignUpText}>
                    <Text style={{color: '#114662', fontSize: 15}}>
                      外校生註冊
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={LoginPageStyles.login_view}>
                <TouchableHighlight
                  underlayColor={null}
                  style={LoginPageStyles.btnLogin}
                  onPress={() => {
                    onSignIn();
                    //portallogin();
                  }}>
                  <View style={LoginPageStyles.btnLoginText}>
                    <Text style={{color: '#114662', fontSize: 20}}>登入</Text>
                    <Text style={{color: '#114662', fontSize: 20}}>></Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
          <View style={{flex: 3}}></View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

LoginPage.navigationOptions = {
  headerTransparent: true,
  title: '',
  headerLeft: () => (visible = null),
};

const LoginPageStyles = StyleSheet.create({
  //------------------View---------------------
  main_view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  logo_view: {
    flex: 4,
    width: 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title_view: {
    flex: 3,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherBack_view: {
    flex: 6,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D89279',
    borderRadius: 30,
  },
  textInputBox_view: {
    flex: 5,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  textinput_view: {
    flex: 1,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  textinput_view2: {
    flex: 1,
    width: 300,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  go_view: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  signup_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login_view: {
    flex: 1,
    width: 300,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  //--------------------------------------
  logo: {
    width: 130,
    height: 100,
  },
  title: {
    height: 60,
    width: 180,
  },
  textInput: {
    height: 40,
    width: 230,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: '#EAD8BB',
    textAlign: 'left',
    paddingLeft: 10,
  },
  errorText: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 35,
    color: '#CC413D',
    fontSize: 15,
  },
  btnSignUp: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btnSignUpText: {
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLogin: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btnLoginText: {
    width: 150,
    height: 50,
    backgroundColor: '#EEBC5F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default LoginPage;
