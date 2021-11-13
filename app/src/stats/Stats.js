import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Containter from '../Container';
import { Table } from './Table';
import { Round } from './Round';

import { styles } from './stats.style';

import { leagues, seasons } from '../hardCodingDb/leagues';
import { games } from '../hardCodingDb/games';
import { single } from '../consts/strings';
import { TextButton } from '../consts/Buttons';

export const Stats = ({ navigation, route }) => {
  const [selectedValue, setSelectedValue] = useState('Ekstraliga');
  const [selectedSeason, setSelectedSeason] = useState('2020/2021');
  const [selectedLastRound, setSelectedLastRound] = useState(null);
  const [selectedRound, setSelectedRound] = useState(null);

  const rigthLeagueAndSeasonFinishedGames = games.filter((item) => {
    return item.league == selectedValue && item.season == selectedSeason && item.isFinished == true;
  });

  const lastRound = Math.max.apply(
    Math,
    rigthLeagueAndSeasonFinishedGames.map(function (o) {
      return o.round;
    }),
  );

  return (
    <Containter>
      {selectedLastRound ? null : setSelectedLastRound(lastRound)}
      {selectedLastRound ? null : lastRound == 1 ? setSelectedRound(lastRound) : setSelectedRound(lastRound - 1)}

      <View style={styles.top}>
        <Picker
          selectedValue={selectedValue}
          style={styles.league}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          mode="dropdown">
          {leagues.map((league, index) => {
            return <Picker.Item label={league.name} value={league.name} key={index} />;
          })}
        </Picker>

        <Picker
          selectedValue={selectedSeason}
          style={styles.season}
          onValueChange={(itemValue, itemIndex) => setSelectedSeason(itemValue)}>
          {seasons.map((item, index) => {
            return <Picker.Item label={item.date} value={item.date} key={index} />;
          })}
        </Picker>
      </View>

      {lastRound > -1 ? (
        <View>
          <Table league={selectedValue} season={selectedSeason} />
          <Round league={selectedValue} season={selectedSeason} round={lastRound} last={true} />

          <View style={styles.buttonsRound}>
            <TextButton
              text="<"
              onPress={() => {
                if (selectedRound > 1) setSelectedRound(selectedRound - 1);
              }}
              style={styles}
            />

            <TextButton
              text=">"
              onPress={() => {
                if (selectedRound < lastRound) setSelectedRound(selectedRound + 1);
              }}
              style={styles}
            />
          </View>
          <Round league={selectedValue} season={selectedSeason} round={selectedRound} />
        </View>
      ) : (
        <Text>{single.noData}</Text>
      )}
    </Containter>
  );
};
