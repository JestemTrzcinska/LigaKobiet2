import React from 'react';
import { View } from 'react-native';
import { TextWhite } from '../consts/Text';

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
      <TextWhite style={styles.text}>{single.queens}</TextWhite>
      {summaryArray
        .sort((a, b) => {
          return b.goals - a.goals;
        })
        .slice(0, 5)
        .map((item, index) => {
          return (
            <View style={styles.table} key={index}>
              <TextWhite style={styles.item}>{index + 1}. </TextWhite>
              <TextWhite style={styles.name} numberOfLines={1}>
                {item.name}
              </TextWhite>
              <TextWhite style={styles.name} numberOfLines={1}>
                {item.club}
              </TextWhite>
              <TextWhite style={styles.item}>{item.goals}</TextWhite>
            </View>
          );
        })}
    </View>
  );
};
