import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import Containter from '../Container';

import { TextButton } from '../consts/Buttons';
import { TextInputWhite, TextWhite } from '../consts/Text';
import { buttons, profile, menu } from '../consts/strings';

import { styles } from './Profile.style';
import { addProfile, getUsersProfile } from '../actions';
import { AuthContext } from '../AuthContext';

export const EditProfile = ({ navigation, route }) => {
  const { auth } = useContext(AuthContext);
  const [state, setstate] = useState();
  const [favTeam, setFavTeam] = useState(state?.favClub);
  const [city, setCity] = useState();
  const [about, setAbout] = useState();

  useEffect(async () => {
    const profileFromDB = await getUsersProfile(auth.token);
    setstate(profileFromDB);
    if (profileFromDB) {
      setFavTeam(profileFromDB.favClub);
      setCity(profileFromDB.city);
      setAbout(profileFromDB.about);
    }
  }, [getUsersProfile]);

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
          onPress={async () => {
            await addProfile({ favTeam, city, about }, auth.token);
            navigation.goBack(menu.profile);
          }}
          text={buttons.submit}
        />
      </View>
    </Containter>
  );
};
