import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
  },
  league: {
    width: 200,
  },
  season: {
    width: 120,
  },
  table: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 6,
  },
  item: {
    flex: 1,
    textAlign: 'center',
  },
  score: {
    flex: 2,
  },
  date: {
    flex: 4,
  },
  nextTable: {
    paddingBottom: 50,
  },
  lastTable: {
    paddingTop: 50,
  },
  buttonsRound: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    fontSize: 25,
  },
});
