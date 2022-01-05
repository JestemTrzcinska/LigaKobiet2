import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Containter from './Container';
import { TextButtonNav } from './consts/Buttons';
import { menu } from './consts/strings';
import { AuthContext } from './AuthContext';

export const HomeScreen = ({ navigation }) => {
  const [isLogged, setIsLogged] = useState(true);
  const { auth } = useContext(AuthContext);

  console.log(auth);

  return (
    <Containter>
      <View style={styles.options}>
        <TextButtonNav style={styles.optionButton} text={menu.schedule} dir={menu.schedule} navigation={navigation} />
        <TextButtonNav style={styles.optionButton} text={menu.news} dir={menu.news} navigation={navigation} />
        <TextButtonNav style={styles.optionButton} text={menu.stats} dir={menu.stats} navigation={navigation} />
        {auth?.token ? (
          <TextButtonNav style={styles.optionButton} text={menu.profile} dir={menu.profile} navigation={navigation} />
        ) : (
          <TextButtonNav style={styles.optionButton} text={menu.login} dir={menu.login} navigation={navigation} />
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
