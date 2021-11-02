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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
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
  bottomText: {
    color: 'white',
  },
});

export const placeholderColor = 'white';
