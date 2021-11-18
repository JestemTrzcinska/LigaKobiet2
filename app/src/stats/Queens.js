import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './stats.style';

import { goals } from '../hardCodingDb/goals';
import { single } from '../consts/strings';

export const Queens = ({ league, season }) => {
  const currentGoals = goals.filter((item) => {
    return item.league == league && item.season == season;
  });

  const summaryArray = [];
  let i = {};
  currentGoals.forEach((item) => {
    if (summaryArray.some((e) => e.name === item.name)) {
      i.goals += item.goals;
    } else {
      i = {};
      i.name = item.name;
      i.club = item.club;
      i.goals = item.goals;
      summaryArray.push(i);
    }
  });

  return (
    <View style={styles.lastTable}>
      <Text style={styles.text}>{single.queens}</Text>
      {summaryArray
        .sort((a, b) => {
          return b.goals - a.goals;
        })
        .slice(0, 5)
        .map((item, index) => {
          return (
            <View style={styles.table} key={index}>
              <Text styles={styles.item}>{index + 1}. </Text>
              <TextName styles={styles.name}>{item.name}</TextName>
              <TextName styles={styles.name}>{item.club}</TextName>
              <Text styles={styles.item}>{item.goals}</Text>
            </View>
          );
        })}
    </View>
  );
};

const TextName = ({ children, styles }) => {
  return (
    <Text style={styles} numberOfLines={1}>
      {children}
    </Text>
  );
};
