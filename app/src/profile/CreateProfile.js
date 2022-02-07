import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Containter from '../Container';
import { AuthContext } from '../AuthContext';

import { TextButton } from '../consts/Buttons';
import { TextInputWhite, TextWhite } from '../consts/Text';
import { buttons, profile, menu } from '../consts/Strings';
import { addProfile, getClubs } from '../actions';

import { styles } from './Profile.style';

export const CreateProfile = ({ navigation, route }) => {
  // Profile
  const { auth } = useContext(AuthContext);

  const [favTeam, setFavTeam] = useState();
  const [city, setCity] = useState();
  const [about, setAbout] = useState();

  // Clubs
  const [clubs, setclubs] = useState();

  useEffect(async () => {
    setclubs(await getClubs());
  }, [getClubs]);

  return (
    <Containter>
      <View style={styles.top}>
        <TextWhite style={[styles.title, styles.titleEdit]}>{profile.favTeam}</TextWhite>
        <Picker
          selectedValue={favTeam}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => {
            setFavTeam(itemValue);
          }}
          mode="dropdown">
          {clubs?.map((club, index) => {
            return <Picker.Item color="white" label={club.name} value={club.name} key={index} />;
          })}
        </Picker>

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
          onPress={async () => {
            await addProfile({ favClub: favTeam, city, about }, auth.token);
            navigation.goBack(menu.profile);
          }}
          text={buttons.submit}
        />
      </View>
    </Containter>
  );
};
