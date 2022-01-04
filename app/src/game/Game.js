import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { TextWhite } from '../consts/Text';
import Container from '../Container';
import { optionsFull } from '../consts/options';
import { game } from '../consts/strings';

import { styles } from './game.style';

const score = (goals, isHome) => {
  return goals
    .filter((item) => {
      return item.goalForTeamHome === isHome;
    })
    .map((item) => {
      return item.amount;
    })
    .reduce((acc, item) => {
      return acc + item.score;
    });
};

export const Game = ({ route }) => {
  const { home, away, date, round, league, season, isFinished, goals } = route.params.item;

  const scoreHome = score(goals, true);
  const scoreAway = score(goals, false);

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
                <TextWhite style={styles.text}>Koniec meczu</TextWhite>
                <TextWhite style={styles.score}>
                  {scoreHome} : {scoreAway}
                </TextWhite>
              </>
            ) : (
              <TextWhite style={styles.text}>Mecz odbędzie się</TextWhite>
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
          {isFinished ? (
            <>
              <TextWhite style={styles.info}>{game.info}</TextWhite>
              <TextWhite>{game.scored}</TextWhite>
            </>
          ) : (
            <TextWhite style={styles.info}>{game.afterFinish}</TextWhite>
          )}
        </View>
      </ScrollView>
    </Container>
  );
};
