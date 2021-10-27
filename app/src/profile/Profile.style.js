import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginHorizontal: 20,
  },
  top: {
    flex: 6,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    padding: 10,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  input: {
    height: 40,
    marginHorizontal: 10,
    borderWidth: 1,
    padding: 10,
    paddingTop: 10,
  },
  biggerInput: {
    height: 100,
    paddingTop: 10,
  },
  button: {
    padding: 5,
    alignSelf: 'center',
    fontSize: 25,
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
  },
});

export const placeholderColor = 'white';
