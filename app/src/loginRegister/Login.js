import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Alert, View } from 'react-native';
import { placeholder, buttons, menu } from '../consts/strings';
import { TextButton } from '../consts/Buttons';

import { styles, placeholderColor } from './loginRegister.style';

export const Login = ({ navigation, route }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  // let dataToSend = { email, password };

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.top}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder={placeholder.email}
          placeholderTextColor={placeholderColor}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          // onChangeText={(text) => onChangePassword(text)}
          value={password}
          placeholder={placeholder.password}
          placeholderTextColor={placeholderColor}
        />
        <TextButton
          style={styles}
          onPress={() => {
            Alert.alert('Simple Button pressed');
          }}
          text={buttons.submit}
        />
      </View>
      <View style={styles.bottom}>
        <Text>Nie posiadasz jeszcze konta?</Text>

        <TextButton
          style={styles}
          onPress={() => {
            navigation.navigate(menu.register);
          }}
          text={buttons.create}
        />
      </View>
    </SafeAreaView>
  );
};
