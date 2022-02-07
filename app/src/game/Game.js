import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { TextWhite } from '../consts/Text';
import Container from '../Container';
import { optionsFull } from '../consts/options';
import { game } from '../consts/Strings';

import { styles } from './game.style';

export const score = (goals, isHome) => {
  const g = goals.filter((item) => {
    return item.goalForTeamHome === isHome;
  });

  const y = g.map((item) => {
    return item.amount;
  });

  if (y.length == 1) return y[0];
  else if (y.length == 0) return 0;
  else {
    const z = y.reduce((acc, def) => {
      return acc + def;
    }, 0);
    return z;
  }
};

const goalForWho = (goals) => {
  const home = [];
  const away = [];

  goals.map((goal) => {
    if (goal.goalForTeamHome) home.push(goal);
    else away.push(goal);
  });
  return [home, away];
};

export const Game = ({ route }) => {
  const { home, away, date, round, league, season, isFinished, goals } = route.params.item;

  const scoreHome = score(goals, true);
  const scoreAway = score(goals, false);

  const goalsArray = goalForWho(goals);

  const goalsHome = goalsArray[0];
  const goalsAway = goalsArray[1];

  return (
    <Container>
      <ScrollView>
        <View style={styles.view}>
          <View style={styles.card}>
            <Image source={{ uri: home.logo }} style={styles.image} />
            <TextWhite style={styles.name}>{home.name}</TextWhite>
          </View>

          <View style={styles.card}>
            {isFinished ? (
              <>
                <TextWhite style={styles.text}>{game.end}</TextWhite>
                <TextWhite style={styles.score}>
                  {scoreHome} : {scoreAway}
                </TextWhite>
              </>
            ) : (
              <TextWhite style={styles.text}>{game.isNotFinished}</TextWhite>
            )}
          </View>

          <View style={styles.card}>
            <Image source={{ uri: away.logo }} style={styles.image} />
            <TextWhite style={styles.name}>{away.name}</TextWhite>
          </View>
        </View>

        <View style={styles.date}>
          <TextWhite>{new Date(date.split(' ')[0]).toLocaleDateString('pl', optionsFull)}</TextWhite>
          <TextWhite>{date.split(' ')[1]}</TextWhite>
        </View>

        <View style={styles.infoWrap}>
          <TextWhite style={styles.info}>
            {league.name} {season.name}
          </TextWhite>

          <TextWhite style={styles.info}>
            {game.round} {round}
          </TextWhite>
        </View>

        <View style={styles.infoWrap}>
          {isFinished ? (
            <>
              {goals.length > 0 ? (
                <>
                  <TextWhite style={styles.info}>{game.info}</TextWhite>
                  <TextWhite style={styles.scored}>{game.scored}</TextWhite>
                  <View style={styles.goals}>
                    <View style={styles.goalsHome}>
                      {goalsHome.map((goal, index) => {
                        return (
                          <TextWhite key={index}>
                            {goal.amount} - {goal.shotBy.firstName} {goal.shotBy.lastName}
                          </TextWhite>
                        );
                      })}
                    </View>
                    <View style={styles.goalsHome}>
                      {goalsAway.map((goal, index) => {
                        return (
                          <TextWhite key={index}>
                            {goal.amount} - {goal.shotBy.firstName} {goal.shotBy.lastName}
                          </TextWhite>
                        );
                      })}
                    </View>
                  </View>
                </>
              ) : (
                <TextWhite style={styles.info}>{game.noInfo}</TextWhite>
              )}
            </>
          ) : (
            <TextWhite style={styles.info}>{game.afterFinish}</TextWhite>
          )}
        </View>
      </ScrollView>
    </Container>
  );
};
