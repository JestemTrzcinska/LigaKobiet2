import React from 'react';
import { Text, View } from 'react-native';
import { TextName } from '../consts/Text';

import { styles } from './stats.style';

import { games } from '../hardCodingDb/games';
import { single } from '../consts/strings';

export const Round = ({ league, season, round, last = false }) => {
  const currentGames = games
    .filter((item) => {
      return item.league == league && item.season == season && item.round == round;
    })
    .sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

  return (
    <View>
      {last ? <Text style={styles.text}>Ostatnia ({round}.) kolejka</Text> : null}
      {currentGames.length > 0 ? (
        currentGames.map((item, index) => {
          return (
            <View style={styles.table} key={index}>
              <TextName styles={styles.name}>{item.home}</TextName>
              {item.isFinished ? (
                <Text style={styles.score}>
                  {item.scoreHome} : {item.scoreAway}
                </Text>
              ) : (
                <Text style={styles.score}>- : -</Text>
              )}
              <TextName styles={styles.name}>{item.away}</TextName>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          );
        })
      ) : (
        <Text style={styles.text}>{single.noData}</Text>
      )}
    </View>
  );
};
