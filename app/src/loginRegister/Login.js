import React, { useContext, useState } from 'react';
import { Alert, View } from 'react-native';

import Containter from '../Container';
import { AuthContext } from '../AuthContext';

import { TextButton } from '../consts/Buttons';
import { TextInputWhite, TextWhite } from '../consts/Text';
import { placeholder, buttons, menu } from '../consts/strings';

import { styles } from './loginRegister.style';
import { loginUser } from '../actions';

export const Login = ({ navigation }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const { setAuth } = useContext(AuthContext);

  onSubmit = async () => {
    try {
      const user = await loginUser({
        email,
        password,
      });

      await setAuth(user);
      navigation.navigate(menu.title);
    } catch (error) {
      error.map((i) => {
        Alert.alert(i.msg);
      });
    }
  };

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
          value={password}
          placeholder={placeholder.password}
          secure={true}
        />
        <TextButton style={styles} onPress={onSubmit} text={buttons.submit} />
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
