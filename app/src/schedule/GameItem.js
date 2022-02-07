import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { game } from '../consts/Strings';
import { TextName, TextWhite } from '../consts/Text';
import { score } from '../game/Game';

import { styles } from './schedule.style';

export const GameItem = ({ items, navigation }) => {
  return (
    <View>
      {items.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.games}
            key={index}
            onPress={() => {
              navigation.navigate(game.game, { item, name: item.league.name });
            }}>
            <TextName style={styles.name}>{item.home.name}</TextName>
            <TextWhite style={styles.score}>
              {item.isFinished ? score(item.goals, true) : '-'} : {item.isFinished ? score(item.goals, false) : '-'}
            </TextWhite>
            <TextName style={styles.name}>{item.away.name}</TextName>
            <TextWhite style={styles.date}>{item.date.split(' ')[1]}</TextWhite>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
