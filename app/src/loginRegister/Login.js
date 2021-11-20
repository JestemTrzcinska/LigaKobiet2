import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import Containter from '../Container';
import { TextButton } from '../consts/Buttons';
import { TextInputWhite, TextWhite } from '../consts/Text';
import { styles } from './loginRegister.style';
import { placeholder, buttons, menu } from '../consts/strings';

export const Login = ({ navigation }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  // let dataToSend = { email, password };

  return (
    <Containter>
      <View style={styles.top}>
        <TextInputWhite
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder={placeholder.email}
        />
        <TextInputWhite
          style={styles.input}
          onChangeText={onChangePassword}
          // onChangeText={(text) => onChangePassword(text)}
          value={password}
          placeholder={placeholder.password}
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
        <TextWhite style={styles.bottomText}>{buttons.dontHaveAnAccount}</TextWhite>

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
