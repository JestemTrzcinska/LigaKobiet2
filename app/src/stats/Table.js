import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './stats.style';

import { table } from '../hardCodingDb/table';
import { TextWhite } from '../consts/Text';

export const Table = ({ league, season }) => {
  const currentTable = table
    .filter((item) => {
      return item.league == league && item.season == season;
    })
    .sort(function (a, b) {
      return b.points - a.points;
    });

  return (
    <View style={styles.nextTable}>
      <TextWhite style={styles.text}>Tabela</TextWhite>
      <View style={styles.table}>
        <TextWhite style={styles.item}>Lp</TextWhite>
        <TextWhite style={styles.name}>Team</TextWhite>
        <TextWhite style={styles.item}>M</TextWhite>
        <TextWhite style={styles.item}>W</TextWhite>
        <TextWhite style={styles.item}>R</TextWhite>
        <TextWhite style={styles.item}>P</TextWhite>
        <TextWhite style={styles.item}>B</TextWhite>
        <TextWhite style={styles.item}>pkt</TextWhite>
      </View>

      {currentTable.map((item, index) => {
        return (
          <View style={styles.table} key={index}>
            <TextWhite style={styles.item}>{index + 1}</TextWhite>
            <TextWhite style={styles.name}>{item.name}</TextWhite>
            <TextWhite style={styles.item}>{item.gamesPlayed}</TextWhite>
            <TextWhite style={styles.item}>{item.won}</TextWhite>
            <TextWhite style={styles.item}>{item.draw}</TextWhite>
            <TextWhite style={styles.item}>{item.lost}</TextWhite>
            <TextWhite style={styles.item}>
              {item.goalScored}:{item.goalLost}
            </TextWhite>
            <TextWhite style={styles.item}>{item.points}</TextWhite>
          </View>
        );
      })}
    </View>
  );
};
