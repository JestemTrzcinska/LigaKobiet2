import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Containter from '../Container';
import { Calendar } from 'react-native-calendars';
import { GameItem } from './GameItem';
import { TextName, TextWhite } from '../consts/Text';

import { styles } from './schedule.style';
import { optionsLong } from '../consts/options';
import { single } from '../consts/strings';

import { getGames } from '../actions';

const showDayGame = (games, date) => {
  return Object.values(
    games
      // only the ones that are today
      .filter((item) => {
        return new Date(item.date).toDateString() == new Date(date).toDateString();
      })
      // sort by date
      .sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      })
      // sort by league
      .reduce((acc, item) => {
        if (!acc[item.league.name])
          acc[item.league.name] = {
            league: item.league.name,
            items: [],
          };
        acc[item.league.name].items.push(item);
        return acc;
      }, {}),
  );
};

const getMonthFormat = (monthNumber) => {
  const number = monthNumber + 1;
  return number.toString().length === 1 ? `0${monthNumber + 1}` : monthNumber + 1;
};

const ekstraliga = { key: 'Ekstraliga', color: 'chartreuse' };
const liga1 = { key: '1 liga', color: 'red' };
const liga2 = { key: '2 liga', color: 'white' };
const liga3 = { key: '3 liga zachodniopomorska', color: 'blue' };

const markedDates = {};

// right format for markedDate
const returnRightFormatDate = (date) => {
  const day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate();
  const month = getMonthFormat(date.getMonth());
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

// set dots in calendar - 3 month at a time
const applyDotsByMonth = (games, date) => {
  var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);

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
      if (!allLeaguesInMarkedDate.includes(item.league.name)) {
        // if there is not, add league dot to the marked day
        switch (item.league.name) {
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
      switch (item.league.name) {
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

const calendarTheme = {
  backgroundColor: 'transparent',
  calendarBackground: 'transparent',
  dayTextColor: 'white',
  textDisabledColor: '#999',
  monthTextColor: 'white',
  todayTextColor: 'black',
  arrowColor: '#1C0C5B',
};

export const Schedule = ({ navigation, route }) => {
  const [games, setGames] = useState();
  const [daySelected, setDaySelected] = useState(new Date());

  useEffect(async () => {
    setGames(await getGames());
  }, [getGames]);

  if (games) applyDotsByMonth(games, new Date());

  return (
    <Containter>
      {games ? (
        <>
          <Calendar
            theme={calendarTheme}
            style={styles.calendar}
            onDayPress={(day) => {
              setDaySelected(new Date(day.dateString));
            }}
            onLongPress={(day) => {
              setDaySelected(new Date(day.dateString));
            }}
            onMonthChange={(month) => {
              applyDotsByMonth(games, new Date(month.dateString));
            }}
            firstDay={1}
            disableAllTouchEventsForDisabledDays={true}
            enableSwipeMonths={true}
            markingType={'multi-dot'}
            markedDates={markedDates}
          />

          <TextWhite style={styles.info}>{daySelected.toLocaleDateString('pl', optionsLong)}</TextWhite>
          {showDayGame(games, daySelected).length > 0 ? (
            showDayGame(games, daySelected).map((item, index) => {
              return (
                <View style={styles.top} key={index}>
                  <TextName style={styles.league}>{item.league}</TextName>
                  <GameItem items={item.items} navigation={navigation} />
                </View>
              );
            })
          ) : (
            <TextWhite>{single.noGames}</TextWhite>
          )}
        </>
      ) : null}
    </Containter>
  );
};
