import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const SelectSeat = ({navigation}) => {
  //const stuNum = navigation.getParam('stuNum');
  const stuNum = 88;
  const selectDate = navigation.getParam('selectDate');
  const selectStart = navigation.getParam('selectStart');
  const selectEnd = navigation.getParam('selectEnd');
  const selectFloor = navigation.getParam('selectFloor');

  const seatID = 'seat_01'; //到時候在這一頁選擇位置後再傳進來這個變數裡面

  return (
    <View style={styles.container}>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default SelectSeat;
