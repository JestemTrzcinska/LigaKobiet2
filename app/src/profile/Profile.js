import React from 'react';
import { View } from 'react-native';
import Containter from '../Container';

import { TextButton } from '../consts/Buttons';
import { TextWhite } from '../consts/Text';
import { buttons, profile, menu } from '../consts/strings';

import { profileDB } from '../hardCodingDb/profile';

import { styles } from './Profile.style';

export const Profile = ({ navigation }) => {
  return (
    <Containter>
      <View style={styles.top}>
        <TextWhite style={styles.title}>{profile.favTeam}</TextWhite>
        <TextWhite style={styles.text}>{profileDB.favTeam}</TextWhite>
        <TextWhite style={styles.title}>{profile.city}</TextWhite>
        <TextWhite style={styles.text}>{profileDB.city}</TextWhite>
        <TextWhite style={styles.title}>{profile.about}</TextWhite>
        <TextWhite style={styles.text}>{profileDB.about}</TextWhite>
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
    </Containter>
  );
};
