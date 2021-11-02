import React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
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
              <Text numberOfLines={4} style={styles.title}>
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
    marginTop: 10,
  },
  card: {
    width: Dimensions.get('window').width - 40,
    height: 110,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    position: 'absolute',
    right: 0,
    width: Dimensions.get('window').width - 40 - 105,
  },
});
