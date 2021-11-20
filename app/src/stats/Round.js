import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { TextName, TextWhite } from '../consts/Text';

import { styles } from './stats.style';

import { games } from '../hardCodingDb/games';
import { game, single } from '../consts/strings';

export const Round = ({ navigation, league, season, round, last = false }) => {
  const currentGames = games
    .filter((item) => {
      return item.league == league && item.season == season && item.round == round;
    })
    .sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

  return (
    <View>
      {last ? <TextWhite style={styles.text}>Ostatnia ({round}.) kolejka</TextWhite> : null}
      {currentGames.length > 0 ? (
        currentGames.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.table}
              key={index}
              onPress={() => {
                navigation.navigate(game.game, { item, name: item.league });
              }}>
              <TextName styles={styles.name}>{item.home}</TextName>
              <TextWhite style={styles.score}>
                {item.isFinished ? `${item.scoreHome} : ${item.scoreAway}` : '- : -'}
              </TextWhite>
              <TextName styles={styles.name}>{item.away}</TextName>
              <TextWhite style={styles.date}>{item.date}</TextWhite>
            </TouchableOpacity>
          );
        })
      ) : (
        <TextWhite>{single.noData}</TextWhite>
      )}
    </View>
  );
};
