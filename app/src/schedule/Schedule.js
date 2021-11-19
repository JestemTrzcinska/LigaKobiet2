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

const getMonthFormat = (monthNumber) => {
  return monthNumber.toString().length === 1 ? `0${monthNumber + 1}` : monthNumber + 1;
};

const ekstraliga = { key: 'Ekstraliga', color: 'chartreuse' };
const liga1 = { key: '1 liga', color: 'red' };
const liga2 = { key: '2 liga', color: 'white' };
const liga3 = { key: '3 liga zachodniopomorska', color: 'blue' };

const markedDates = {};

const returnRightFormatDate = (date) => {
  const day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate();
  const month = getMonthFormat(date.getMonth());
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

// set dots in calendar
const applyDotsByMonth = (lastDayOfMonth) => {
  var date = new Date(lastDayOfMonth);
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const thisMonthGames = games.filter((item) => {
    if (new Date(item.date) > firstDay && new Date(item.date) < lastDay) {
      return item;
    }
  });

  thisMonthGames.map((item) => {
    const rightFormatDate = returnRightFormatDate(new Date(item.date));

    // check if in the markedDates is already the date that the game(item) is
    if (markedDates[rightFormatDate]) {
      const allLeaguesInMarkedDate = Object.entries(markedDates[rightFormatDate].dots).map((item) => {
        return item[1].key;
      });
      // check if there is not the wanted league
      if (!allLeaguesInMarkedDate.includes(item.league)) {
        // if there is not, add league dot to the marked day
        switch (item.league) {
          case 'Ekstraliga':
            markedDates[rightFormatDate].dots.push(ekstraliga);
            break;
          case '1 liga':
            markedDates[rightFormatDate].dots.push(liga1);
            break;
          case '2 liga':
            markedDates[rightFormatDate].dots.push(liga2);
            break;
          case '3 liga zachodniopomorska':
            markedDates[rightFormatDate].dots.push(liga3);
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
          markedDates[rightFormatDate] = { dots: [ekstraliga] };
          break;
        case '1 liga':
          markedDates[rightFormatDate] = { dots: [liga1] };
          break;
        case '2 liga':
          markedDates[rightFormatDate] = { dots: [liga2] };
          break;
        case '3 liga zachodniopomorska':
          markedDates[rightFormatDate] = { dots: [liga3] };
          break;
        default:
          break;
      }
    }
  });
};

const options = { day: 'numeric', month: 'long', year: 'numeric' };

export const Schedule = ({ navigation, route }) => {
  const [daySelected, setDaySelected] = useState(new Date());
  const [lastDayOfMonth, setLastDayOfMonth] = useState(new Date());

  return (
    <Containter>
      {applyDotsByMonth(lastDayOfMonth)}
      <Calendar
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          dayTextColor: 'white',
          textDisabledColor: '#999',
          monthTextColor: 'white',
          todayTextColor: 'black',
        }}
        style={styles.calendar}
        onDayPress={(day) => {
          setDaySelected(day.dateString);
        }}
        onMonthChange={(month) => {
          setLastDayOfMonth(month.dateString);
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
