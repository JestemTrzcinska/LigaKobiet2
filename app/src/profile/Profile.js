import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { TextButton } from '../consts/Buttons';
import { buttons, profile, menu } from '../consts/strings';

import { profileDB } from '../hardCodingDb/profile';

import { styles } from './Profile.style';

export const Profile = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.top}>
        <Text style={styles.text}>
          {profile.favTeam} {profileDB.favTeam}
        </Text>
        <Text style={styles.text}>
          {profile.city} {profileDB.city}
        </Text>
        <Text style={styles.text}>
          {profile.about} {profileDB.about}
        </Text>
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
    </SafeAreaView>
  );
};
