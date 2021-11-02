import React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Containter from '../Container';

import { single } from '../consts/strings';

import { news } from '../hardCodingDb/news';

export const News = ({ navigation, route }) => {
  return (
    <Containter>
      <View style={styles.view}>
        {news.map((item) => {
          return (
            <TouchableOpacity
              key={item.index}
              style={styles.card}
              onPress={() => {
                navigation.navigate(single.newsItem, { item });
              }}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text numberOfLines={1} style={styles.title}>
                {item.title}
              </Text>
            </TouchableOpacity>
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
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
