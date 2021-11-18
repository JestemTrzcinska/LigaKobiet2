import { StyleSheet } from 'react-native';

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
    color: 'white',
  },
  item: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  score: {
    color: 'white',
    flex: 2,
  },
  date: {
    flex: 3,
    color: 'white',
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
    color: 'white',
    fontSize: 25,
  },
  text: {
    color: 'white',
  },
});
