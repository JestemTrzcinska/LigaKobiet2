import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { game } from '../consts/strings';
import { TextName, TextWhite } from '../consts/Text';

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
              navigation.navigate(game.game, { item, name: item.league });
            }}>
            <TextName style={styles.name}>{item.home}</TextName>
            <TextWhite style={styles.score}>
              {item.isFinished ? item.scoreHome : '-'} : {item.isFinished ? item.scoreAway : '-'}
            </TextWhite>
            <TextName style={styles.name}>{item.away}</TextName>
            <TextWhite style={styles.date}>{item.date.split(' ')[1]}</TextWhite>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
