import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { styles } from './stats.style';

import { TextWhite } from '../consts/Text';
import { score } from '../game/Game';
import { single } from '../consts/strings';

export const Table = ({ rigthLeagueAndSeason }) => {
  // const [table, setTable] = useState(null);

  // useEffect(() => {
  //   console.log('yhtgrfe');
  //   console.log(rigthLeagueAndSeason);
  //   console.log();
  //   const y = currentTable();
  //   console.log(y);
  //   if (rigthLeagueAndSeason) setTable();
  // }, []);

  const addToTable = (table, team) => {
    table[team] = {
      gamesPlayed: 0,
      won: 0,
      draw: 0,
      lost: 0,
      goalsScored: 0,
      goalsLost: 0,
      points: 0,
    };
  };

  const increasePlayed = (table, teams) => {
    teams.forEach((team) => table[team].gamesPlayed++);
  };

  const setResults = (table, match, homeGoals, awayGoals) => {
    const { home, away } = match;

    if (homeGoals > awayGoals) {
      table[home.name].won++;
      table[home.name].points += 3;
      table[away.name].lost++;
    } else if (homeGoals < awayGoals) {
      table[away.name].won++;
      table[away.name].points += 3;
      table[home.name].lost++;
    } else {
      table[home.name].draw++;
      table[home.name].points++;
      table[away.name].draw++;
      table[away.name].points++;
    }
  };

  const setGoals = (table, team, scored, against) => {
    table[team].goalsScored += scored;
    table[team].goalsLost += against;
  };

  const currentTable = () => {
    const table = {};

    const y = rigthLeagueAndSeason
      ?.filter((item) => {
        return item.isFinished;
      })
      .map((game) => {
        const homeClub = game.home.name;
        const awayClub = game.away.name;

        const homeGoals = score(game.goals, true);
        const awayGoals = score(game.goals, false);

        if (!table[homeClub]) addToTable(table, homeClub);
        if (!table[awayClub]) addToTable(table, awayClub);

        increasePlayed(table, [homeClub, awayClub]);
        setResults(table, game, homeGoals, awayGoals);

        setGoals(table, homeClub, homeGoals, awayGoals);
        setGoals(table, awayClub, awayGoals, homeGoals);
        return table;
      });
    return y;
  };

  const table = currentTable();

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
        <TextWhite style={styles.item2}>B</TextWhite>
        <TextWhite style={styles.item}>pkt</TextWhite>
      </View>
      {table?.length > 0 ? (
        Object.entries(table[0])
          .sort(([, a], [, b]) => b.points - a.points)
          .map(([k, v], i) => {
            return (
              <View style={styles.table} key={i}>
                <TextWhite style={styles.item}>{i + 1}</TextWhite>
                <TextWhite style={styles.name} numberOfLines={1}>
                  {k}
                </TextWhite>
                <TextWhite style={styles.item}>{v.gamesPlayed}</TextWhite>
                <TextWhite style={styles.item}>{v.won}</TextWhite>
                <TextWhite style={styles.item}>{v.draw}</TextWhite>
                <TextWhite style={styles.item}>{v.lost}</TextWhite>
                <TextWhite style={styles.item2}>
                  {v.goalsScored}:{v.goalsLost}
                </TextWhite>
                <TextWhite style={styles.item}>{v.points}</TextWhite>
              </View>
            );
          })
      ) : (
        <TextWhite>{single.noData}</TextWhite>
      )}
    </View>
  );
};
