import React, { useContext, useState } from 'react';
import { Alert, View } from 'react-native';
import Containter from '../Container';
import { AuthContext } from '../AuthContext';

import { TextButton } from '../consts/Buttons';
import { TextInputWhite, TextWhite } from '../consts/Text';

import { styles } from './loginRegister.style';
import { placeholder, buttons, menu } from '../consts/strings';
import { registerUser } from '../actions';

export const Register = ({ navigation }) => {
  const [firstName, onChangeFirstName] = useState('');
  const [lastName, onChangeLastName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [password2, onChangePassword2] = useState('');

  const { setAuth } = useContext(AuthContext);

  onSubmit = async () => {
    try {
      const user = await registerUser({
        firstName,
        lastName,
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
          onChangeText={onChangeFirstName}
          value={firstName}
          placeholder={placeholder.firstName}
        />
        <TextInputWhite
          style={styles.input}
          onChangeText={onChangeLastName}
          value={lastName}
          placeholder={placeholder.lastName}
        />
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
        />
        <TextInputWhite
          style={styles.input}
          onChangeText={onChangePassword2}
          value={password2}
          placeholder={placeholder.password2}
        />
        <TextButton style={styles} onPress={onSubmit} text={buttons.submit} />
      </View>
      <View style={styles.bottom}>
        <TextWhite style={styles.bottomText}>{buttons.alreadyHaveAnAccount}</TextWhite>

        <TextButton
          style={styles}
          onPress={() => {
            navigation.navigate(menu.login);
          }}
          text={buttons.login}
        />
      </View>
    </Containter>
  );
};
