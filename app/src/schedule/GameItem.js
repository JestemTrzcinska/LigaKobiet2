import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { game } from '../consts/strings';
import { TextName, TextWhite } from '../consts/Text';

import { styles } from './schedule.style';

export const GameItem = ({ items, navigation }) => {
  return (
    <View>
      {items.map((item2, index2) => {
        return (
          <TouchableOpacity
            style={styles.games}
            key={index2}
            onPress={() => {
              navigation.navigate(game.game, { item2, name: item2.league });
            }}>
            <TextName style={styles.name}>{item2.home}</TextName>
            <TextWhite style={styles.score}>
              {item2.isFinished ? item2.scoreHome : '-'} : {item2.isFinished ? item2.scoreAway : '-'}
            </TextWhite>
            <TextName style={styles.name}>{item2.away}</TextName>
            <TextWhite style={styles.date}>{item2.date.split(' ')[1]}</TextWhite>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
