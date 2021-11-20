import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import Containter from '../Container';

import { TextButton } from '../consts/Buttons';
import { TextInputWhite, TextWhite } from '../consts/Text';
import { buttons, profile } from '../consts/strings';

import { profileDB } from '../hardCodingDb/profile';

import { styles } from './Profile.style';

export const EditProfile = ({ navigation, route }) => {
  const [favTeam, setFavTeam] = useState(profileDB.favTeam); // profile.favTeam
  const [city, setCity] = useState(profileDB.city);
  const [about, setAbout] = useState(profileDB.about);

  return (
    <Containter>
      <View style={styles.top}>
        <TextWhite style={[styles.title, styles.titleEdit]}>{profile.favTeam}</TextWhite>
        <TextInputWhite
          style={styles.input}
          onChangeText={setFavTeam}
          value={favTeam}
          placeholder={profile.favTeam}
          multiline={true}
        />
        <TextWhite style={[styles.title, styles.titleEdit]}>{profile.city}</TextWhite>
        <TextInputWhite
          style={styles.input}
          onChangeText={setCity}
          value={city}
          placeholder={profile.city}
          multiline={true}
        />
        <TextWhite style={[styles.title, styles.titleEdit]}>{profile.about}</TextWhite>
        <TextInputWhite
          style={styles.input}
          onChangeText={setAbout}
          value={about}
          placeholder={profile.about}
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
