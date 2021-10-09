import * as React from 'react';
import { View } from 'react-native';
import { TextButton } from './consts/Buttons';
import { menu } from './consts/Strings';

export const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <TextButton text={menu.schedule} dir={menu.schedule} navigation={navigation} />
      <TextButton text={menu.stats} dir={menu.stats} navigation={navigation} />
      <TextButton text={menu.news} dir={menu.news} navigation={navigation} />
      <TextButton text={menu.loginRegister} dir={menu.loginRegister} navigation={navigation} />
    </View>
  );
};
