import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  view: {
    paddingTop: 50,
    flexDirection: 'row',
  },
  card: {
    flexDirection: 'column',
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
  },
  name: {
    flex: 1,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    paddingBottom: 5,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  date: {
    alignItems: 'center',
  },
  infoWrap: {
    paddingTop: 50,
  },
  info: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
