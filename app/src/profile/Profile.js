import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import Containter from '../Container';
import { AuthContext } from '../AuthContext';

import { TextButton } from '../consts/Buttons';
import { TextWhite } from '../consts/Text';
import { buttons, profile, menu } from '../consts/strings';

import { styles } from './Profile.style';
import { getUsersProfile } from '../actions';

export const Profile = ({ navigation }) => {
  const { auth } = useContext(AuthContext);
  const [state, setstate] = useState();

  useEffect(async () => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setstate(await getUsersProfile(auth.token));
    });

    return unsubscribe;
  }, [getUsersProfile, navigation]);

  return (
    <Containter>
      {state ? (
        <>
          <View style={styles.top}>
            <TextWhite style={styles.title}>{profile.favTeam}</TextWhite>
            <TextWhite style={styles.text}>{state.favClub?.name}</TextWhite>
            <TextWhite style={styles.title}>{profile.city}</TextWhite>
            <TextWhite style={styles.text}>{state.city}</TextWhite>
            <TextWhite style={styles.title}>{profile.about}</TextWhite>
            <TextWhite style={styles.text}>{state.about}</TextWhite>
          </View>
          <View style={styles.bottom}>
            <TextButton
              style={styles}
              onPress={() => {
                navigation.navigate(menu.editProfile);
              }}
              text={buttons.edit}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.top}>
            <TextWhite style={styles.title}>{profile.noProfile}</TextWhite>
          </View>
          <View style={styles.bottom}>
            <TextButton
              style={styles}
              onPress={() => {
                navigation.navigate(menu.createProfile);
              }}
              text={profile.createProfil}
            />
          </View>
        </>
      )}
    </Containter>
  );
};
