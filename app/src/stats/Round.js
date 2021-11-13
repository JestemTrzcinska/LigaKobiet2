import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { styles } from './stats.style';

import { games } from '../hardCodingDb/games';

export const Round = ({ league, season, round, last = false }) => {
  return (
    <View>
      {last ? <Text>Ostatnia ({round}.) kolejka</Text> : <Text>{round}. kolejka</Text>}
      <FlatList
        data={games
          .filter((item) => {
            return item.league == league && item.season == season && item.round == round;
          })
          .sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
          })}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.table} key={index}>
              <TextName styles={styles.name}>{item.home}</TextName>
              <Text style={styles.score}>
                {item.scoreHome} : {item.scoreAway}
              </Text>
              <TextName styles={styles.name}>{item.away}</TextName>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => index}
      />
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
