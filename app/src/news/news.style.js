import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  view: {
    marginTop: 10,
  },
  wrap: {
    flexDirection: 'row',
    // backgroundColor: '#3D2C8D',
    marginVertical: 10,
    borderRadius: 20,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    height: 100,
    borderRadius: 15,
    flex: 2,
    margin: 4,
  },
  texts: {
    flex: 2,
    flexWrap: 'nowrap',
    margin: 6,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
  },
  text: { flex: 2 },
  imageItem: {
    height: 200,
    alignItems: 'center',
  },
  titleItem: {
    marginVertical: 20,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'justify',
  },
});
