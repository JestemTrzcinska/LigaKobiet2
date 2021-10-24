import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextButton } from './consts/Buttons';
import { menu } from './consts/Strings';

export const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.options}>
        <TextButton style={styles} text={menu.schedule} dir={menu.schedule} navigation={navigation} />
        <TextButton style={styles} text={menu.news} dir={menu.news} navigation={navigation} />
        <TextButton style={styles} text={menu.stats} dir={menu.stats} navigation={navigation} />
        <TextButton style={styles} text={menu.loginRegister} dir={menu.loginRegister} navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  options: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButton: {
    fontSize: 35,
    padding: 40,
  },
});
