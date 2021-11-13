import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Containter from './Container';
import { TextButtonNav } from './consts/Buttons';
import { menu } from './consts/strings';

export const HomeScreen = ({ navigation }) => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <Containter>
      <View style={styles.options}>
        <TextButtonNav style={styles} text={menu.schedule} dir={menu.schedule} navigation={navigation} />
        <TextButtonNav style={styles} text={menu.news} dir={menu.news} navigation={navigation} />
        <TextButtonNav style={styles} text={menu.stats} dir={menu.stats} navigation={navigation} />
        {isLogged ? (
          <TextButtonNav style={styles} text={menu.profile} dir={menu.profile} navigation={navigation} />
        ) : (
          <TextButtonNav style={styles} text={menu.login} dir={menu.login} navigation={navigation} />
        )}
      </View>
    </Containter>
  );
};

const styles = StyleSheet.create({
  options: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  optionButton: {
    fontSize: 35,
  },
});