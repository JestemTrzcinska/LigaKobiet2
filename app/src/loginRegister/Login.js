import React, { useState } from 'react';
import { Text, TextInput, Alert, View } from 'react-native';
import Containter from '../Container';
import { TextButton } from '../consts/Buttons';
import { styles, placeholderColor } from './loginRegister.style';
import { placeholder, buttons, menu } from '../consts/strings';

export const Login = ({ navigation }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  // let dataToSend = { email, password };

  return (
    <Containter>
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
        <Text style={styles.bottomText}>{buttons.dontHaveAnAccount}</Text>

        <TextButton
          style={styles}
          onPress={() => {
            navigation.navigate(menu.register);
          }}
          text={buttons.create}
        />
      </View>
    </Containter>
  );
};
