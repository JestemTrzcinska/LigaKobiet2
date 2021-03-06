import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Containter from '../Container';
import { TextButton } from '../consts/Buttons';
import { TextWhite } from '../consts/Text';
import { Table } from './Table';
import { Round } from './Round';
import { Queens } from './Queens';

import { styles } from './stats.style';

import { getGames, getLeagues, getSeasons } from '../actions';

export const Stats = ({ navigation, route }) => {
  const [selectedValue, setSelectedValue] = useState('Ekstraliga');
  const [selectedSeason, setSelectedSeason] = useState('2021/2022');

  const [games, setGames] = useState();
  const [leagues, setLeagues] = useState();
  const [seasons, setSeasons] = useState();

  useEffect(async () => {
    setGames(await getGames());
    setLeagues(await getLeagues());
    setSeasons(await getSeasons());
  }, [getGames, getLeagues, getSeasons]);

  const rigthLeagueAndSeasonFinishedGames = games?.filter((item) => {
    return item.league.name == selectedValue && item.season.name == selectedSeason && item.isFinished == true;
  });

  const rigthLeagueAndSeason = games?.filter((item) => {
    return item.league.name == selectedValue && item.season.name == selectedSeason;
  });

  const lastFinishedRound = Math.max.apply(
    Math,
    rigthLeagueAndSeasonFinishedGames?.map(function (o) {
      return o.round;
    }),
  );

  const lastRound = Math.max.apply(
    Math,
    rigthLeagueAndSeason?.map(function (o) {
      return o.round;
    }),
  );

  const [selectedRound, setSelectedRound] = useState(lastFinishedRound > -1 ? lastFinishedRound : 1);

  return (
    <Containter>
      <ScrollView nestedScrollEnabled scrollEnabled>
        <View style={styles.top}>
          <Picker selectedValue={selectedValue} style={styles.league} onValueChange={setSelectedValue} mode="dropdown">
            {leagues?.map((league, index) => {
              return <Picker.Item color="white" label={league.name} value={league.name} key={index} />;
            })}
          </Picker>

          <Picker selectedValue={selectedSeason} style={styles.season} onValueChange={setSelectedSeason}>
            {seasons?.map((item, index) => {
              return <Picker.Item color="white" label={item.name} value={item.name} key={index} />;
            })}
          </Picker>
        </View>

        <>
          <Table rigthLeagueAndSeason={rigthLeagueAndSeason} />
          <Round
            navigation={navigation}
            rigthLeagueAndSeason={rigthLeagueAndSeason}
            round={lastFinishedRound > -1 ? lastFinishedRound : 1}
            last={true}
          />

          <View style={styles.buttonsRound}>
            <>
              <TextWhite style={styles.text}>{selectedRound}. kolejka</TextWhite>
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
            </>
          </View>
          <Round
            navigation={navigation}
            rigthLeagueAndSeason={rigthLeagueAndSeason}
            round={selectedRound ? selectedRound : lastFinishedRound}
          />
          <Queens rigthLeagueAndSeason={rigthLeagueAndSeason} />
        </>
      </ScrollView>
    </Containter>
  );
};
