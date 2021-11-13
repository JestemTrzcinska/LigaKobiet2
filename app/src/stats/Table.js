import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { styles } from './stats.style';

import { table } from '../hardCodingDb/table';

export const Table = ({ league, season }) => {
  const currentTable = table.filter((item) => {
    return item.league == league && item.season == season;
  });

  return (
    <View>
      <Text>
        Tabela {league} {season}
      </Text>
      <View style={styles.table}>
        <Text style={styles.item}>Lp</Text>
        <Text style={styles.name}>Team</Text>
        <Text style={styles.item}>M</Text>
        <Text style={styles.item}>W</Text>
        <Text style={styles.item}>R</Text>
        <Text style={styles.item}>P</Text>
        <Text style={styles.item}>B</Text>
        <Text style={styles.item}>pkt</Text>
      </View>

      <FlatList
        data={currentTable.sort(function (a, b) {
          return b.points - a.points;
        })}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.table} key={index}>
              <Text style={styles.item}>{index + 1}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.item}>{item.gamesPlayed}</Text>
              <Text style={styles.item}>{item.won}</Text>
              <Text style={styles.item}>{item.draw}</Text>
              <Text style={styles.item}>{item.lost}</Text>
              <Text style={styles.item}>
                {item.goalScored}:{item.goalLost}
              </Text>
              <Text style={styles.item}>{item.points}</Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => index}
        scrollEnabled={false}
      />
    </View>
  );
};
