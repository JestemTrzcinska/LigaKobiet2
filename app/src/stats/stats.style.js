import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
  },
  league: {
    width: 180,
  },
  season: {
    width: 180,
  },
  table: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 6,
  },
  score: {
    flex: 2,
    textAlign: 'center',
  },
  date: {
    flex: 3,
    textAlign: 'center',
  },
  item: {
    flex: 1,
    textAlign: 'center',
  },
  item2: {
    flex: 2,
    textAlign: 'center',
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
    fontSize: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 5,
  },
  roundName: {
    flex: 4,
  },
});
