import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { TextName, TextWhite } from '../consts/Text';

import { styles } from './stats.style';

import { game, single } from '../consts/strings';
import { getGames } from '../actions';
import { optionsDate } from '../consts/options';
import { score } from '../game/Game';

export const Round = ({ navigation, league, season, round, last = false }) => {
  const [games, setGames] = useState();

  useEffect(async () => {
    setGames(await getGames());
  }, [getGames]);

  const currentGames = games
    ?.filter((item) => {
      return item.league.name == league && item.season.name == season && item.round == round;
    })
    .sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

  return (
    <View>
      {last ? <TextWhite style={styles.text}>Ostatnia ({round}.) kolejka</TextWhite> : null}
      {currentGames?.length > 0 ? (
        currentGames?.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.table}
              key={index}
              onPress={() => {
                navigation.navigate(game.game, { item, name: item.league.name });
              }}>
              <TextName styles={styles.name}>{item.home.name}</TextName>
              <TextWhite style={styles.score}>
                {item.isFinished ? `${score(item.goals, true)} : ${score(item.goals, false)}` : '- : -'}
              </TextWhite>
              <TextName styles={styles.name}>{item.away.name}</TextName>
              <TextWhite style={styles.date}>{new Date(item.date).toLocaleString('pl', optionsDate)}</TextWhite>
            </TouchableOpacity>
          );
        })
      ) : (
        <TextWhite>{single.noData}</TextWhite>
      )}
    </View>
  );
};
