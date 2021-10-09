import * as React from 'react';
import { View } from 'react-native';
import { TextButton } from './consts/Buttons';

export const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <TextButton text="Harmonogram" dir="Harmonogram" navigation={navigation} />
      <TextButton text="Statystyki" dir="Statystyki" navigation={navigation} />
      <TextButton text="Aktualności" dir="Aktualności" navigation={navigation} />
      <TextButton text="Login/Rejestracja" dir="Login Rejestracja" navigation={navigation} />
    </View>
  );
};
