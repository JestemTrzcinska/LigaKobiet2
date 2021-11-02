import React from 'react';
import { Image, Text, View, StyleSheet, Row } from 'react-native';
import Containter from '../Container';

import { news } from '../hardCodingDb/news';

export const News = ({ navigation, route }) => {
  return (
    <Containter>
      <View style={styles.view}>
        {news.map((item) => {
          return (
            <View key={item.index} style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text>{item.title}</Text>
            </View>
          );
        })}
      </View>
    </Containter>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'red',
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  image: { width: 100, height: 100 },
});
