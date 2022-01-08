import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TextWhite } from '../consts/Text';

import { styles } from './stats.style';

import { single } from '../consts/strings';
import { getGames } from '../actions';

export const Queens = ({ rigthLeagueAndSeason }) => {
  const [games, setGames] = useState();

  useEffect(async () => {
    setGames(await getGames());
  }, [getGames]);

  const currentGoals = rigthLeagueAndSeason?.map((item) => {
    return {
      home: item.home.name,
      away: item.away.name,
      goals: item.goals,
      league: item.league.name,
      season: item.season.name,
    };
  });

  const summaryArray = [];
  let i = {};
  currentGoals?.forEach((item) => {
    Array.from(item.goals).forEach((goal) => {
      if (summaryArray.some((e) => e.firstName === goal.shotBy.firstName && e.lastName === goal.shotBy.lastName)) {
        i.goals += goal.amount;
      } else {
        i = {};
        i.firstName = goal.shotBy.firstName;
        i.lastName = goal.shotBy.lastName;

        goal.shotBy.clubs.map((clubItem) => {
          if (clubItem.league.name === item.league && clubItem.season.name === item.season) {
            if (clubItem.club.name === item.home) i.club = item.home;
            else i.club = item.away;
          }
        });

        i.goals = goal.amount;
        summaryArray.push(i);
      }
    });
  });

  return (
    <View style={styles.lastTable}>
      <TextWhite style={styles.text}>{single.queens}</TextWhite>
      {summaryArray.length > 0 ? (
        summaryArray
          .sort((a, b) => {
            return b.goals - a.goals;
          })
          .slice(0, 5)
          .map((item, index) => {
            return (
              <View style={styles.table} key={index}>
                <TextWhite style={styles.item}>{index + 1}. </TextWhite>
                <TextWhite style={styles.name} numberOfLines={1}>
                  {item.firstName} {item.lastName}
                </TextWhite>
                <TextWhite style={styles.name} numberOfLines={1}>
                  {item.club}
                </TextWhite>
                <TextWhite style={styles.item}>{item.goals}</TextWhite>
              </View>
            );
          })
      ) : (
        <TextWhite>{single.noData}</TextWhite>
      )}
    </View>
  );
};
