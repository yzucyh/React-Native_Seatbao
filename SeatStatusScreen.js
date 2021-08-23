import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import firebase from 'react-native-firebase';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class SeatStatus extends Component {
  static navigationOptions = {
    headerTransparent: true,
    title: '',
  };
  constructor() {
    super();

    this.state = {
      tmparray: [],
    };
  }

  async componentDidMount() {
    try {
      await firebase
        .database()
        .ref('/seat')
        .once('value', snapshot => {
          for (let i = 1; i <= 5; i++) {
            for (let j = 1; j <= 4; j++) {
              this.setState({
                tmparray: [
                  ...this.state.tmparray,
                  snapshot
                    .child(`seat_A-${i}-${j}`)
                    .child('status')
                    .val() == 0
                    ? 'green'
                    : 'red',
                ],
              });
            }
          }
        });
      //console.log(this.state.tmparray);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.main_view}>
        <ReactNativeZoomableView
          maxZoom={1.5}
          minZoom={0.5}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}
          style={styles.zoom_view}>
          <ImageBackground
            source={require('./../../img/location_1f.png')}
            style={{
              position: 'absolute',
              top: height / 4,
              width: width,
              height: height / 2,
              alignSelf: 'center',
            }}>
            {/* -------------------------------------------------- */}
            {/* seat_A-1-1 */}
            <View
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                backgroundColor: this.state.tmparray[0],
                top: height / 2.71,
                left: width / 1.585,
              }}
            />
            {/* seat_A-1-2 */}
            <View
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                backgroundColor: this.state.tmparray[1],
                top: height / 2.63,
                left: width / 1.585,
              }}
            />
            {/* seat_A-1-3 */}
            <View
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                backgroundColor: this.state.tmparray[2],
                top: height / 2.71,
                left: width / 1.545,
              }}
            />
            {/* seat_A-1-4 */}
            <View
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                backgroundColor: this.state.tmparray[3],
                top: height / 2.63,
                left: width / 1.545,
              }}
            />
            {/* -------------------------------------------------- */}
            {/* seat_A-2-1 */}
            <View
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                backgroundColor: this.state.tmparray[4],
                top: height / 2.71,
                left: width / 1.485,
              }}
            />
            {/* seat_A-2-2 */}
            <View
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                backgroundColor: this.state.tmparray[5],
                top: height / 2.63,
                left: width / 1.485,
              }}
            />
            {/* seat_A-2-3 */}
            <View
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                backgroundColor: this.state.tmparray[6],
                top: height / 2.71,
                left: width / 1.45,
              }}
            />
            {/* seat_A-2-4 */}
            <View
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                backgroundColor: this.state.tmparray[7],
                top: height / 2.63,
                left: width / 1.45,
              }}
            />
            {/* -------------------------------------------------- */}
            {/* seat_A-3-1 */}
            <View
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                backgroundColor: this.state.tmparray[8],
                top: height / 2.71,
                left: width / 1.4,
              }}
            />
            {/* seat_A-3-2 */}
            <View
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                backgroundColor: this.state.tmparray[9],
                top: height / 2.63,
                left: width / 1.4,
              }}
            />
            {/* seat_A-3-3 */}
            <View
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                backgroundColor: this.state.tmparray[10],
                top: height / 2.71,
                left: width / 1.37,
              }}
            />
            {/* seat_A-3-4 */}
            <View
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                backgroundColor: this.state.tmparray[11],
                top: height / 2.63,
                left: width / 1.37,
              }}
            />
            {/* -------------------------------------------------- */}
            {/* seat_A-4-1 */}
            <View
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                backgroundColor: this.state.tmparray[12],
                top: height / 2.71,
                left: width / 1.325,
              }}
            />
            {/* seat_A-4-2 */}
            <View
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                backgroundColor: this.state.tmparray[13],
                top: height / 2.63,
                left: width / 1.325,
              }}
            />
            {/* seat_A-4-3 */}
            <View
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                backgroundColor: this.state.tmparray[14],
                top: height / 2.71,
                left: width / 1.296,
              }}
            />
            {/* seat_A-4-4 */}
            <View
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                backgroundColor: this.state.tmparray[15],
                top: height / 2.63,
                left: width / 1.296,
              }}
            />
            {/* -------------------------------------------------- */}
            {/* seat_A-5-1 */}
            <View
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                backgroundColor: this.state.tmparray[16],
                top: height / 2.71,
                left: width / 1.255,
              }}
            />
            {/* seat_A-5-2 */}
            <View
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                backgroundColor: this.state.tmparray[17],
                top: height / 2.63,
                left: width / 1.255,
              }}
            />
            {/* seat_A-5-3 */}
            <View
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                backgroundColor: this.state.tmparray[18],
                top: height / 2.71,
                left: width / 1.23,
              }}
            />
            {/* seat_A-5-4 */}
            <View
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                backgroundColor: this.state.tmparray[19],
                top: height / 2.63,
                left: width / 1.23,
              }}
            />
          </ImageBackground>
        </ReactNativeZoomableView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  zoom_view: {
    flex: 1,
    width: width,
    height: height,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
