import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text } from 'react-native';
import Containter from '../Container';

export const NewsItem = ({ route }) => {
  const { index, title, description, image } = route.params.item;
  return (
    <Containter>
      <ScrollView style={styles.view}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </ScrollView>
    </Containter>
  );
};

const styles = StyleSheet.create({
  view: {
    marginTop: 10,
  },
  image: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    alignItems: 'center',
  },
  title: {
    marginVertical: 10,
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    // position: 'absolute',
    // bottom: 0, // for image with title
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    color: 'black',
    textAlign: 'justify',
  },
});
