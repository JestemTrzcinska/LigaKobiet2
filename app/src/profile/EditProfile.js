import React, { useState } from 'react';
import { Alert, Text, View, TextInput } from 'react-native';
import Containter from '../Container';

import { TextButton } from '../consts/Buttons';
import { buttons, profile } from '../consts/strings';

import { profileDB } from '../hardCodingDb/profile';

import { styles, placeholderColor } from './Profile.style';

export const EditProfile = ({ navigation, route }) => {
  const [favTeam, setFavTeam] = useState(profileDB.favTeam); // profile.favTeam
  const [city, setCity] = useState(profileDB.city);
  const [about, setAbout] = useState(profileDB.about);

  return (
    <Containter>
      <View style={styles.top}>
        <Text style={styles.text}>{profile.favTeam}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setFavTeam}
          value={favTeam}
          placeholder={profile.favTeam}
          placeholderTextColor={placeholderColor}
          multiline={true}
        />
        <Text style={styles.text}>{profile.city}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCity}
          value={city}
          placeholder={profile.city}
          placeholderTextColor={placeholderColor}
          multiline={true}
        />
        <Text style={styles.text}>{profile.about}</Text>
        <TextInput
          style={[styles.input, styles.biggerInput]}
          onChangeText={setAbout}
          value={about}
          placeholder={profile.about}
          placeholderTextColor={placeholderColor}
          multiline={true}
        />
      </View>
      <View style={styles.bottom}>
        <TextButton
          style={styles}
          onPress={() => {
            Alert.alert('submited');
          }}
          text={buttons.submit}
        />
      </View>
    </Containter>
  );
};
