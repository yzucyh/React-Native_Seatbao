import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ImageBackground,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import firebase from 'react-native-firebase';

const ImageBack = require('./../../img/loginback.png');

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignUpPage = ({navigation}) => {
  const [valueName, handleNameChange] = useState('');
  const [valueStuNum, handleStuNumChange] = useState('');
  const [valuePwd, handlePwdChange] = useState('');
  const [valuePwdCheck, handlePwdCheckChange] = useState('');
  const [showErrorText, handleShowError] = useState(''); //顯示錯誤資訊

  function onButtonPress() {
    //check each inputbox is filled
    if (valueName == '') {
      handleShowError('名字未填寫');
    } else if (valueStuNum == '') {
      handleShowError('學號/帳號未填寫');
    } else if (valuePwd == '') {
      handleShowError('密碼未填寫');
    } else if (valuePwdCheck == '') {
      handleShowError('確定密碼未填寫');
    } else {
      //bind firebase and check data
      let db = firebase.database();
      let ref = db.ref(`user/${valueStuNum}`);
      //確認資料是否存在
      ref.once('value', snapshot => {
        //如果不存在就創建
        if (!snapshot.exists()) {
          //確定密碼,密碼是否一致
          if (valuePwd != valuePwdCheck) {
            handleShowError('確認密碼不一致');
          } else {
            ref.set({
              name: `${valueName}`,
              account: `${valueStuNum}`,
              pwd: `${valuePwd}`,
            });
            navigation.navigate('Login');
          }
        } else {
          //if StuNum is existed
          handleShowError('帳號已存在');
        }
      });
    }
  }

  return (
    <ScrollView style={{width: width, height: height}}>
      <ImageBackground
        source={ImageBack}
        style={{width: width, height: height}}>
        <View style={styles.main_view}>
          <View style={styles.titleback_view}>
            <Text style={styles.title_text}>外校生註冊</Text>
          </View>
          <View style={styles.bottomback_view}>
            <View style={styles.textInputBox_view}>
              <View style={styles.input_view}>
                <TextInput
                  placeholder="姓名"
                  style={styles.textinput}
                  onChangeText={text => handleNameChange(text)}
                  value={valueName}
                />
              </View>
              <View style={styles.input_view}>
                <TextInput
                  placeholder="學號/帳號"
                  style={styles.textinput}
                  onChangeText={text => handleStuNumChange(text)}
                  value={valueStuNum}
                />
              </View>
              <View style={styles.input_view}>
                <TextInput
                  placeholder="密碼"
                  style={styles.textinput}
                  secureTextEntry={true}
                  onChangeText={text => handlePwdChange(text)}
                  value={valuePwd}
                />
              </View>
              <View style={styles.input_view}>
                <TextInput
                  placeholder="確認密碼"
                  style={styles.textinput}
                  secureTextEntry={true}
                  onChangeText={text => handlePwdCheckChange(text)}
                  value={valuePwdCheck}
                />
              </View>
              {showErrorText ? (
                <Text style={styles.errorText}>{showErrorText}</Text>
              ) : null}
            </View>

            <View style={styles.go_view}>
              <View style={styles.login_view}>
                <TouchableHighlight
                  style={styles.btnLogin}
                  onPress={() => navigation.navigate('Login')}
                  underlayColor={null}>
                  <View style={styles.btnLoginText}>
                    <Text style={{color: '#114662', fontSize: 15}}>
                      已經有帳號？
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.SignIn_view}>
                <TouchableHighlight
                  style={styles.btnSignIn}
                  onPress={() => {
                    onButtonPress();
                  }}
                  underlayColor={null}>
                  <View style={styles.btnSingInText}>
                    <Text style={{color: '#114662', fontSize: 20}}>註冊</Text>
                    <Text style={{color: '#114662', fontSize: 20}}>></Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
          <View style={{flex: 1}}></View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

SignUpPage.navigationOptions = {
  headerTransparent: true,
  title: '',
};

const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  titleback_view: {
    flex: 2,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomback_view: {
    flex: 4,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D89279',
    borderRadius: 30,
    paddingTop: 20,
  },
  go_view: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textInputBox_view: {
    flex: 4,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_view: {
    flex: 1,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SignIn_view: {
    flex: 1,
    width: 300,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  //------------------------------
  main_title: {
    fontSize: 30,
  },
  title_text: {
    fontSize: 35,
    color: '#D89279',
  },
  textinput: {
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
    marginLeft: 35,
    color: '#CC413D',
    fontSize: 15,
  },
  btnLogin: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btnLoginText: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSignIn: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btnSingInText: {
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

export default SignUpPage;
