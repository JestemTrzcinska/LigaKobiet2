import React, { useState } from 'react';
import { Text, TextInput, Alert, View } from 'react-native';
import Containter from '../Container';
import { TextButton } from '../consts/Buttons';
import { styles, placeholderColor } from './loginRegister.style';
import { placeholder, buttons, menu } from '../consts/strings';

export const Register = ({ navigation, route }) => {
  const [firstName, onChangeFirstName] = useState('');
  const [lastName, onChangeLastName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [password2, onChangePassword2] = useState('');

  return (
    <Containter>
      <View style={styles.top}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeFirstName}
          value={firstName}
          placeholder={placeholder.firstName}
          placeholderTextColor={placeholderColor}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeLastName}
          value={lastName}
          placeholder={placeholder.lastName}
          placeholderTextColor={placeholderColor}
        />
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
          value={password}
          placeholder={placeholder.password}
          placeholderTextColor={placeholderColor}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword2}
          value={password2}
          placeholder={placeholder.password2}
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
        <Text style={styles.bottomText}>{buttons.alreadyHaveAnAccount}</Text>

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