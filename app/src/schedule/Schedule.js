import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Containter from '../Container';
import { Calendar } from 'react-native-calendars';
import { TextName } from '../consts/Text';

import { styles } from './schedule.style';

import { games } from '../hardCodingDb/games';

const showDayGame = (date) => {
  return games.filter((item) => {
    return new Date(item.date).toDateString() == new Date(date).toDateString();
  });
};

const ekstraliga = { key: 'Ekstraliga', color: 'chartreuse' };
const liga1 = { key: '1 liga', color: 'red' };
const liga2 = { key: '2 liga', color: 'gold' };
const liga3 = { key: '3 liga zachodniopomorska', color: 'black' };

const markedDates = {};

const returnRigthFormatDate = (date) => {
  return `${date.getFullYear()}-${
    date.getMonth().toString().length === 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-${date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate()}`;
};

// set dots in calendar
games.map((item) => {
  const rigthFormatDate = returnRigthFormatDate(new Date(item.date));

  // check if in the markedDates is already the date that the game(item) is
  if (markedDates[rigthFormatDate]) {
    const allLeaguesInMarkedDate = Object.entries(markedDates[rigthFormatDate].dots).map((item) => {
      return item[1].key;
    });
    // check if there is not the wanted league
    if (!allLeaguesInMarkedDate.includes(item.league)) {
      // if there is not, add league dot to the marked day
      switch (item.league) {
        case 'Ekstraliga':
          markedDates[rigthFormatDate].dots.push(ekstraliga);
          break;
        case '1 liga':
          markedDates[rigthFormatDate].dots.push(liga1);
          break;
        case '2 liga':
          markedDates[rigthFormatDate].dots.push(liga2);
          break;
        case '3 liga zachodniopomorska':
          markedDates[rigthFormatDate].dots.push(liga3);
          break;
        default:
          break;
      }
    }
  }

  // if in the markedDates is not the date, add it with right league
  else {
    switch (item.league) {
      case 'Ekstraliga':
        markedDates[rigthFormatDate] = { dots: [ekstraliga] };
        break;
      case '1 liga':
        markedDates[rigthFormatDate] = { dots: [liga1] };
        break;
      case '2 liga':
        markedDates[rigthFormatDate] = { dots: [liga2] };
        break;
      case '3 liga zachodniopomorska':
        markedDates[rigthFormatDate] = { dots: [liga3] };
        break;
      default:
        break;
    }
  }
});

const options = { day: 'numeric', month: 'long', year: 'numeric' };

export const Schedule = ({ navigation, route }) => {
  const [daySelected, setDaySelected] = useState(new Date());

  return (
    <Containter>
      <Calendar
        style={styles.calendar}
        onDayPress={(day) => {
          setDaySelected(day.dateString);
        }}
        onDayLongPress={(day) => {
          console.log('selected day', day);
        }}
        onMonthChange={(month) => {
          console.log('month changed', month);
        }}
        firstDay={1}
        disableAllTouchEventsForDisabledDays={true}
        enableSwipeMonths={true}
        markingType={'multi-dot'}
        markedDates={markedDates}
      />

      <Text style={styles.info}>{new Date(daySelected).toLocaleDateString('pl', options)}</Text>
      {showDayGame(daySelected).map((item, index) => {
        return (
          <View style={styles.top} key={index}>
            <TextName styles={styles.league}>{item.league}</TextName>
            <TextName styles={styles.name}>{item.home}</TextName>
            <Text style={styles.score}>
              {item.isFinished ? item.scoreHome : '-'} : {item.isFinished ? item.scoreAway : '-'}
            </Text>
            <TextName styles={styles.name}>{item.away}</TextName>
          </View>
        );
      })}
    </Containter>
  );
};
